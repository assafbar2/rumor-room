# Architecture

## Design goals

The architecture protects the core product claim: every hosted investigation must use Gemini on Google ADK and must call Parallel Search at runtime. At the same time, the game shell remains deterministic enough to design and test without spending external API credits.

## System map

```mermaid
sequenceDiagram
    participant Player
    participant React as React board
    participant API as Express API
    participant Gemini as Google ADK / Gemini
    participant Parallel as Parallel Search

    Player->>React: Select claim + research move
    React->>API: POST /api/investigate
    API->>Gemini: Bounded case, claim, move objective
    Gemini->>Parallel: parallel_search objective + 2–3 queries
    Parallel-->>Gemini: Search ID, dated URLs, excerpts
    Gemini-->>API: Structured analysis + evidence slips
    API->>API: Zod validation + Parallel URL allowlist
    API-->>React: Cited evidence bundle
    React->>React: Pin slips, update suspicion, spend token
    Player->>React: Accuse selected claim
    React->>API: POST /api/verdict
    API->>API: Session-scoped evidence scoring
    API-->>React: Reveal + evidence receipt
```

## Client

The React client is a stateful game interface rather than a chat surface.

- `src/hooks/useRumorRoom.ts` owns the case phase, token budget, selected claim, evidence ledger, verdict, runtime badge, and audio preference.
- `src/components/Board.tsx` composes the claim board, research moves, evidence tray, and accusation control.
- `src/lib/game.ts` derives suspicion labels from the quality and stance of collected evidence.
- `src/lib/audio.ts` lazy-loads Tone.js after a user gesture and produces the adaptive score and semantic cues.
- Semantic cues also emit a visible, polite live-region caption so evidence feedback is available while muted.
- `src/lib/api.ts` is the only client transport boundary.

The client receives public case framing but never receives `unsupportedClaimId` or fixture evidence.

## Server

The Express server exposes four same-origin endpoints:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Reports fixture/live provider readiness. |
| `GET /api/cases` | Returns public case data with answer keys removed. |
| `POST /api/investigate` | Runs one bounded research move. |
| `POST /api/verdict` | Scores one accusation using session-owned evidence. |

Requests are schema-validated with Zod, limited to 32 KB, and protected by a small in-memory investigation rate limit. Security headers and a restrictive Content Security Policy are applied to every response.

## Investigation provider boundary

Both providers return the same `InvestigationResponse` shape from `shared/types.ts`.

### Fixture provider

`server/providers/fixture-provider.ts` returns authored evidence from `shared/cases/` (one file per case, shared official sources in `sources.ts`). It exists for deterministic UX work, tests, demos without credentials, and failure isolation.

Fixture mode is not permitted in production. `server/config.ts` throws during startup when `APP_ENV=production` and `INVESTIGATION_MODE` is not `live`.

### Live provider

`server/providers/live-provider.ts` creates:

1. A Google ADK `FunctionTool` named `parallel_search`.
2. A Google ADK `LlmAgent` running Gemini 3.7 Flash on Vertex AI.
3. An ephemeral ADK `Runner` invocation for the selected case and move.

Gemini must call the Parallel tool exactly once. The tool uses Parallel's official TypeScript SDK and requests live, date-aware excerpts. Gemini then classifies a compact evidence bundle by stance, quality, independence, and provenance.

Every case also supplies an ISO research cutoff. Gemini is instructed to judge the claim within that time boundary and ignore later developments, which keeps historical cases fair and reproducible.

### Query composition: Gemini leads, the case file covers

Gemini writes the research objective and two to three search queries for every move. `server/research-hints.ts` adds two to three case-authored coverage queries per claim and move. `mergeSearchQueries()` in `live-provider.ts` sends Gemini's queries first, then appends the coverage queries, de-duplicates, and caps the list at five. Parallel's API recommends two to three queries but accepts more; the cap keeps Gemini's full query set intact and leaves room for two authored ones.

The coverage queries exist because every case is historical with a fixed research cutoff, and the three cases were source-audited before shipping. The author already knows a specific correction, denial, or credit exists on the record; the coverage query makes sure Parallel's retrieval sees that neighbourhood of the web on every run, so a round never comes back empty because Gemini phrased a query differently. Some coverage queries are pointed — the Barbie Studio Line move includes `Gerwig Baumbach representative no legitimacy` — and that is disclosed here rather than buried.

What stays with Gemini and Parallel:

- Gemini decides the objective and its own queries; the coverage queries never displace them.
- Parallel performs the live retrieval. A coverage query cannot produce a source that is not on the web.
- Gemini reads and classifies whatever comes back — stance, quality, independence, provenance.
- Every URL on the board must be present in the runtime Parallel response (see the citation trust boundary below).

Both query sets are written to the structured `parallel_search_completed` log entry as `agentQueries` and `coverageQueries`, so anyone reading Cloud Run logs can see exactly which queries came from the model and which from the case file. A future version with generated or daily cases would ship without coverage queries and rely on Gemini alone.

## Citation trust boundary

The agent instruction says never to invent citations, but instructions alone are not a security boundary.

The Parallel tool records every URL it returned. After Gemini responds, the server:

1. Parses and validates the JSON shape.
2. Discards every evidence item whose URL was not in that tool response.
3. Fails the investigation if no tool-grounded citations remain.

This makes the visible receipt mechanically traceable to the runtime Parallel call.

## Session and scoring integrity

The browser creates a random UUID for each play session. Evidence returned by `/api/investigate` is recorded in a bounded, session-specific server ledger. `/api/verdict` only scores submitted evidence IDs that belong to the same session and case.

The scoring model rewards:

- Correct accusation with material evidence.
- Unused research turns.
- Independent sources for the accused claim.
- Detection of circular sourcing.

## Production topology

The production image contains:

- Static Vite output in `dist/`.
- Compiled Node server output in `dist-server/`.
- Production-only dependencies.

Cloud Run serves the client and API from one origin. The runtime service account calls Vertex AI. The Parallel API key is mounted from Secret Manager. No browser-visible key or cloud credential is used.

### Session state and instance count

Player sessions are short (one case lasts four to six minutes) and hold at most forty evidence slips, so the evidence ledger and the investigation rate limit are kept in process memory rather than in a database. This keeps the verdict path at a few milliseconds and the deployment to one container with no external state dependency.

The trade-off is that the ledger is per instance. `cloudbuild.yaml` deploys with `--max-instances=1` so every request in a session reaches the same process. One instance is sized for the expected load: concurrency 40 with latency dominated by the Gemini and Parallel round trip, not by CPU.

A future version that needs horizontal scale would move the ledger to Firestore or Memorystore keyed by session ID and raise the instance cap; nothing else in the request path would change.

## Failure behavior

- Failed searches do not spend a research turn.
- Invalid agent JSON produces a generic 502 response and no evidence.
- Hallucinated citations are discarded.
- Missing live credentials mark the runtime unhealthy.
- Production fixture configuration refuses to boot.
- The game remains fully playable without audio and with reduced motion.
