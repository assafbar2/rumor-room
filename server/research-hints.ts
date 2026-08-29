import type { ResearchMove } from '../shared/types.js';

interface ClaimResearchHints {
  core: string[];
  trace?: string[];
  studio?: string[];
  fresh?: string[];
}

const hints: Record<string, ClaimResearchHints> = {
  'deadline-shift:shrek': {
    core: ['Shrek 5 June 30 2027 DreamWorks', 'Shrek 5 release date official'],
    fresh: ['Shrek 5 release date changed 2027', 'Shrek 5 June 30 2027 latest'],
  },
  'deadline-shift:zelda': {
    core: ['Legend Zelda movie release date Nintendo', 'Zelda live action film Sony schedule'],
    fresh: [
      'Legend Zelda April 30 2027 Nintendo',
      'Zelda movie May 7 date changed',
      'Miyamoto Zelda worldwide release April 30',
    ],
  },
  'deadline-shift:spiderverse': {
    core: ['Beyond Spider-Verse June 18 2027 Sony', 'Beyond Spider-Verse release date official'],
    fresh: ['Beyond Spider-Verse release date changed', 'Beyond Spider-Verse latest Sony schedule'],
  },
  'deadline-shift:narnia': {
    core: ['Narnia February 12 2027 Netflix', 'Magicians Nephew theatrical release Netflix'],
    fresh: ['Narnia release date changed 2027 Netflix', 'Magicians Nephew latest theatrical date'],
  },
  'echo-chamber:barbie': {
    core: ['Barbie sequel Gerwig Baumbach reps deny', 'Barbie 2 no legitimacy reporting Warner'],
    trace: ['Barbie sequel early stages original report', 'Barbie 2 December 2024 source'],
    studio: [
      'motionpictures.org Barbie sequel no legitimacy',
      'Barbie sequel Warner representative inaccurate',
      'Gerwig Baumbach representative no legitimacy',
    ],
    fresh: ['Barbie sequel report denied December 2024', 'Barbie 2 reps deny early stages'],
  },
  'echo-chamber:knivesout': {
    core: ['Wake Up Dead Man title Netflix', 'Knives Out 3 title official'],
  },
  'echo-chamber:shrek-announcement': {
    core: ['Shrek 5 original cast DreamWorks announcement', 'Shrek 5 Mike Myers Cameron Diaz official'],
  },
  'echo-chamber:beatles': {
    core: ['Sam Mendes four Beatles films official', 'Beatles cinematic event Sony announcement'],
  },
  'directors-cut:kojima': {
    core: ['Death Stranding film Michael Sarnoski director', 'Hideo Kojima producer Death Stranding A24'],
    studio: ['Kojima Productions A24 Death Stranding film role', 'Death Stranding movie director A24'],
    fresh: ['Death Stranding director announced April 2025', 'Michael Sarnoski Death Stranding film'],
  },
  'directors-cut:gunn': {
    core: ['James Gunn Superman director DC official', 'Superman production James Gunn writer director'],
  },
  'directors-cut:wesball': {
    core: ['Wes Ball Zelda film director Nintendo', 'Legend Zelda live action director official'],
  },
  'directors-cut:mendes': {
    core: ['Sam Mendes Beatles films director official', 'Beatles four film event Sony Mendes'],
  },
};

export function getResearchHints(caseId: string, claimId: string, move: ResearchMove) {
  const claimHints = hints[`${caseId}:${claimId}`];
  if (!claimHints) return [];

  if (move === 'trace') {
    return claimHints.trace ?? claimHints.core.map((query) => `${query} original announcement`);
  }
  if (move === 'studio-line') {
    return claimHints.studio ?? claimHints.core.map((query) => `${query} studio official`);
  }
  if (move === 'fresh-cut') {
    return claimHints.fresh ?? claimHints.core.map((query) => `${query} changed updated latest`);
  }
  return claimHints.core;
}
