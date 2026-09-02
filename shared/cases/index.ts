import type { CaseFile, ResearchMove } from '../types.js';
import { evidenceKey } from './build.js';
import { caseDeadlineShift } from './deadline-shift.js';
import { caseDirectorsCut } from './directors-cut.js';
import { caseEchoChamber } from './echo-chamber.js';

export const cases: CaseFile[] = [caseDeadlineShift, caseEchoChamber, caseDirectorsCut];

export function getCase(caseId: string) {
  return cases.find((caseFile) => caseFile.id === caseId);
}

export function getFixtureEvidence(caseId: string, claimId: string, move: ResearchMove) {
  return getCase(caseId)?.fixtureEvidence[evidenceKey(claimId, move)] ?? [];
}

export function publicCase(caseFile: CaseFile): Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'> {
  return {
    id: caseFile.id,
    caseNumber: caseFile.caseNumber,
    title: caseFile.title,
    dateline: caseFile.dateline,
    researchCutoff: caseFile.researchCutoff,
    mechanic: caseFile.mechanic,
    briefing: caseFile.briefing,
    mission: caseFile.mission,
    claims: caseFile.claims,
    reveal: caseFile.reveal,
    verificationNote: caseFile.verificationNote,
  };
}
