import compression from 'compression';
import express from 'express';
import path from 'node:path';
import { z } from 'zod';
import { cases, getCase, publicCase } from '../shared/cases/index.js';
import { researchMoves } from '../shared/types.js';
import type { EvidenceSlip, InvestigationRequest, VerdictRequest } from '../shared/types.js';
import { config, liveRuntimeReady } from './config.js';
import { investigateWithFixtures } from './providers/fixture-provider.js';
import { investigateLive } from './providers/live-provider.js';
import { scoreVerdict } from './scoring.js';

const app = express();
const evidenceLedger = new Map<string, Map<string, { caseId: string; slip: EvidenceSlip }>>();
const requestWindows = new Map<string, { count: number; resetAt: number }>();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(compression());
app.use(express.json({ limit: '32kb' }));
app.use((_request, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
  next();
});

function investigateRateLimit(request: express.Request, response: express.Response, next: express.NextFunction) {
  const key = request.ip ?? 'unknown';
  const now = Date.now();
  const current = requestWindows.get(key);
  const windowState = !current || current.resetAt <= now ? { count: 0, resetAt: now + 60_000 } : current;
  windowState.count += 1;
  requestWindows.set(key, windowState);

  if (requestWindows.size > 1000) {
    for (const [ip, state] of requestWindows) {
      if (state.resetAt <= now) requestWindows.delete(ip);
      if (requestWindows.size <= 750) break;
    }
  }

  if (windowState.count > 24) {
    response.status(429).json({ error: 'The research desk is cooling down. Try again in a minute.' });
    return;
  }
  next();
}

function recordEvidence(sessionId: string, caseId: string, slips: EvidenceSlip[]) {
  const sessionLedger = evidenceLedger.get(sessionId) ?? new Map<string, { caseId: string; slip: EvidenceSlip }>();
  slips.forEach((slip) => sessionLedger.set(slip.id, { caseId, slip }));
  while (sessionLedger.size > 40) {
    const oldestKey = sessionLedger.keys().next().value as string | undefined;
    if (!oldestKey) break;
    sessionLedger.delete(oldestKey);
  }
  evidenceLedger.set(sessionId, sessionLedger);
  while (evidenceLedger.size > 500) {
    const oldestSession = evidenceLedger.keys().next().value as string | undefined;
    if (!oldestSession) break;
    evidenceLedger.delete(oldestSession);
  }
}

app.get('/api/health', (_request, response) => {
  response.json({
    mode: config.investigationMode,
    provider: config.investigationMode === 'live' ? 'gemini-parallel' : 'fixture',
    ready: config.investigationMode === 'fixture' || liveRuntimeReady(),
    message:
      config.investigationMode === 'live'
        ? liveRuntimeReady()
          ? 'Gemini investigator and Parallel Search are configured.'
          : 'Live runtime is selected but credentials are incomplete.'
        : 'Deterministic case evidence is active for local development.',
  });
});

app.get('/api/cases', (_request, response) => {
  response.json(cases.map(publicCase));
});

const investigationSchema = z.object({
  sessionId: z.string().uuid(),
  caseId: z.string().min(1),
  claimId: z.string().min(1),
  move: z.enum(researchMoves),
  previousEvidenceIds: z.array(z.string()).max(30),
});

app.post('/api/investigate', investigateRateLimit, async (request, response) => {
  const parsed = investigationSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: 'Invalid investigation request.' });
    return;
  }

  try {
    const result =
      config.investigationMode === 'live'
        ? await investigateLive(parsed.data as InvestigationRequest)
        : await investigateWithFixtures(parsed.data as InvestigationRequest);

    recordEvidence(parsed.data.sessionId, parsed.data.caseId, result.evidence);
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(502).json({
      error: 'The investigation desk could not complete this search.',
      detail: config.appEnv === 'development' && error instanceof Error ? error.message : undefined,
    });
  }
});

const verdictSchema = z.object({
  sessionId: z.string().uuid(),
  caseId: z.string().min(1),
  accusedClaimId: z.string().min(1),
  evidenceIds: z.array(z.string()).max(30),
  tokensRemaining: z.number().int().min(0).max(4),
});

app.post('/api/verdict', (request, response) => {
  const parsed = verdictSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: 'Invalid verdict request.' });
    return;
  }

  const verdictRequest = parsed.data as VerdictRequest;
  const caseFile = getCase(verdictRequest.caseId);
  if (!caseFile || !caseFile.claims.some((claim) => claim.id === verdictRequest.accusedClaimId)) {
    response.status(404).json({ error: 'Unknown case or claim.' });
    return;
  }

  const sessionLedger = evidenceLedger.get(verdictRequest.sessionId);
  const evidence = verdictRequest.evidenceIds.flatMap((id) => {
    const record = sessionLedger?.get(id);
    return record?.caseId === verdictRequest.caseId ? [record.slip] : [];
  });

  response.json({
    correct: caseFile.unsupportedClaimId === verdictRequest.accusedClaimId,
    unsupportedClaimId: caseFile.unsupportedClaimId,
    reveal: caseFile.reveal,
    verificationNote: caseFile.verificationNote,
    score: scoreVerdict(verdictRequest, evidence),
  });
});

if (config.nodeEnv === 'production') {
  const staticDirectory = path.resolve(process.cwd(), 'dist');
  const sendIndex = (_request: express.Request, response: express.Response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.sendFile(path.join(staticDirectory, 'index.html'));
  };

  app.get('/', sendIndex);
  app.use('/assets', express.static(path.join(staticDirectory, 'assets'), { maxAge: '1y', immutable: true }));
  app.use(express.static(staticDirectory, { index: false, maxAge: '1h' }));
  app.get('*path', sendIndex);
}

app.listen(config.port, () => {
  console.log(`Rumor Room desk listening on http://localhost:${config.port} (${config.investigationMode})`);
});
