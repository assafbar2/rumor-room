import type {
  CaseFile,
  InvestigationRequest,
  InvestigationResponse,
  RuntimeStatus,
  VerdictRequest,
  VerdictResponse,
} from '../../shared/types';

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getCases: () => requestJson<Array<Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'>>>('/api/cases'),
  getRuntime: () => requestJson<RuntimeStatus>('/api/health'),
  investigate: (request: InvestigationRequest) =>
    requestJson<InvestigationResponse>('/api/investigate', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  verdict: (request: VerdictRequest) =>
    requestJson<VerdictResponse>('/api/verdict', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
};
