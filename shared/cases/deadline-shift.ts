import type { CaseFile } from '../types.js';
import { buildEvidence } from './build.js';
import { narniaOfficial, shrekCurrent, spiderVerseOfficial, zeldaCurrent, zeldaOfficial } from './sources.js';

export const caseDeadlineShift: CaseFile = {
  id: 'deadline-shift',
  caseNumber: '014',
  title: 'The Date That Lied',
  dateline: 'Los Angeles — August 28, 2026',
  researchCutoff: '2026-08-28',
  mechanic: 'stale-information',
  briefing:
    'The midnight slate is about to print. Four release dates look legitimate, but one was once true and is now dead information walking.',
  mission: 'Find the release claim that has been superseded before the presses roll.',
  claims: [
    {
      id: 'shrek',
      label: 'Claim A',
      statement: 'Shrek 5 opens in theaters on June 30, 2027.',
      context: 'A franchise date shown on current official materials.',
    },
    {
      id: 'zelda',
      label: 'Claim B',
      statement: 'The live-action Legend of Zelda film opens on May 7, 2027.',
      context: 'A real date still visible in a Sony investor document.',
    },
    {
      id: 'spiderverse',
      label: 'Claim C',
      statement: 'Spider-Man: Beyond the Spider-Verse opens on June 18, 2027.',
      context: 'The final chapter of Sony’s animated trilogy.',
    },
    {
      id: 'narnia',
      label: 'Claim D',
      statement: 'Greta Gerwig’s Narnia opens in theaters on February 12, 2027.',
      context: 'A wide theatrical window ahead of its Netflix release.',
    },
  ],
  unsupportedClaimId: 'zelda',
  reveal:
    'May 7, 2027 was a real Zelda date and still appears in Sony’s fiscal-year schedule. Nintendo later moved the worldwide release up one week to April 30, 2027. The lie was not fabrication—it was expiration.',
  verificationNote:
    'This case tests whether the player searches after the original announcement instead of treating an authentic old date as current truth.',
  fixtureEvidence: buildEvidence('deadline-shift', {
    shrek: {
      trace: [
        {
          ...shrekCurrent,
          excerpt: 'NBCUniversal’s current franchise announcement lists June 30, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Current studio-family announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...shrekCurrent,
          title: 'Shrek Official Franchise Site',
          publisher: 'DreamWorks',
          url: 'https://www.dreamworks.com/shrek',
          excerpt: 'DreamWorks independently lists Shrek 5 for June 30, 2027.',
          stance: 'supports',
          quality: 'independent',
          provenance: 'The production studio and corporate parent agree.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...shrekCurrent,
          excerpt: 'NBCUniversal’s official article states that Shrek 5 opens June 30, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'NBCUniversal-owned publication citing the studio’s active release plan.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...shrekCurrent,
          excerpt: 'A June 2026 studio update retains the June 30, 2027 date.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Published after the date change and explicitly framed as the latest schedule.',
          isIndependent: true,
        },
      ],
    },
    zelda: {
      trace: [
        {
          ...zeldaOfficial,
          excerpt: 'Sony’s fiscal-year supplemental information places The Legend of Zelda on May 7, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary-source corporate release calendar.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...zeldaCurrent,
          excerpt: 'Nintendo’s later announcement moves the worldwide release to April 30, 2027.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'A later report quotes Shigeru Miyamoto’s official date-change statement.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...zeldaCurrent,
          excerpt: 'Nintendo says it changed the date from May 7 to April 30, 2027.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'Direct quotation of Nintendo’s official announcement.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...zeldaCurrent,
          excerpt: 'The May 2026 update explicitly supersedes May 7 with April 30, 2027.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'Published after Sony’s schedule and focused on the changed date.',
          isIndependent: true,
        },
      ],
    },
    spiderverse: {
      trace: [
        {
          ...spiderVerseOfficial,
          excerpt: 'Sony’s title page identifies June 18, 2027 as the current theatrical date.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary studio title page.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...spiderVerseOfficial,
          title: 'Sony Dates Spider-Man: Beyond the Spider-Verse',
          publisher: 'Variety',
          url: 'https://www.sony.com/en/SonyInfo/IR/library/presen/er/pdf/25q4_supplement.pdf',
          excerpt: 'Trade coverage independently reports Sony’s June 18, 2027 date.',
          stance: 'supports',
          quality: 'independent',
          provenance: 'Independent trade report tied to Sony’s CinemaCon presentation.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...spiderVerseOfficial,
          excerpt: 'Sony Pictures lists the film for June 18, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct studio listing.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...spiderVerseOfficial,
          excerpt: 'The 2026 studio page is later than older undated-delay coverage and retains June 18, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Current title page checked after prior schedule uncertainty.',
          isIndependent: true,
        },
      ],
    },
    narnia: {
      trace: [
        {
          ...narniaOfficial,
          excerpt: 'Netflix’s current announcement sets a wide theatrical opening for February 12, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Original platform announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...narniaOfficial,
          title: 'Greta Gerwig’s Narnia Movie Delayed to 2027 for Wide Theatrical Debut',
          publisher: 'GamesRadar+',
          url: 'https://www.gamesradar.com/entertainment/fantasy-movies/greta-gerwigs-narnia-movie-delayed-to-2027-as-netflix-plans-for-first-ever-wide-theatrical-debut/',
          excerpt: 'Independent coverage confirms the move to a February 12, 2027 wide release.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Exhibitor confirmation independent of the streaming platform.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...narniaOfficial,
          excerpt: 'Netflix’s own release notice states the theatrical run begins February 12, 2027.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct platform statement.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...narniaOfficial,
          excerpt: 'The June 2026 official update preserves the February 12, 2027 theatrical date.',
          stance: 'supports',
          quality: 'official',
          provenance: 'No superseding official date found.',
          isIndependent: true,
        },
      ],
    },
  }),
};
