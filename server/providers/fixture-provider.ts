import { getFixtureEvidence } from '../../shared/cases.js';
import type { InvestigationRequest, InvestigationResponse } from '../../shared/types.js';

export async function investigateWithFixtures(
  request: InvestigationRequest,
): Promise<InvestigationResponse> {
  await new Promise((resolve) => setTimeout(resolve, 650));
  const evidence = getFixtureEvidence(request.caseId, request.claimId, request.move);

  return {
    evidence,
    analysis: evidence.some((slip) => slip.stance === 'contradicts')
      ? 'The search found material tension with the claim. Check the source date and exact role language.'
      : evidence.some((slip) => slip.quality === 'circular')
        ? 'Several reports collapse into the same origin. Volume is disguising a lack of independence.'
        : 'The evidence currently supports the claim through a traceable source path.',
    provider: 'fixture',
  };
}
