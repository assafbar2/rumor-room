import type { CaseFile } from '../types.js';
import { buildEvidence } from './build.js';
import {
  beatlesOfficial,
  deathStrandingA24,
  deathStrandingDirector,
  supermanAnnouncement,
  supermanProduction,
  zeldaDirector,
} from './sources.js';

export const caseDirectorsCut: CaseFile = {
  id: 'directors-cut',
  caseNumber: '041',
  title: 'The Director’s Cut',
  dateline: 'Los Angeles / Tokyo / London — April 8, 2025',
  researchCutoff: '2025-04-08',
  mechanic: 'headline-distortion',
  briefing:
    'Four adaptation memos name a famous director. Three describe the actual job. One promotes a producer into the director’s chair.',
  mission: 'Read past the headline and identify the claim that overstates the source.',
  claims: [
    {
      id: 'kojima',
      label: 'Claim A',
      statement: 'Hideo Kojima will direct A24’s live-action Death Stranding film.',
      context: 'The game creator is closely involved with the adaptation.',
    },
    {
      id: 'gunn',
      label: 'Claim B',
      statement: 'James Gunn will direct DC Studios’ new Superman film.',
      context: 'A studio chief also taking the writer-director role.',
    },
    {
      id: 'wesball',
      label: 'Claim C',
      statement: 'Wes Ball will direct Nintendo and Sony’s live-action Legend of Zelda film.',
      context: 'A game adaptation produced with Nintendo leadership.',
    },
    {
      id: 'mendes',
      label: 'Claim D',
      statement: 'Sam Mendes will direct Sony’s four-film Beatles project.',
      context: 'One theatrical story from each band member’s perspective.',
    },
  ],
  unsupportedClaimId: 'kojima',
  reveal:
    'Kojima Productions is deeply involved, but involvement is not direction. A24’s project hired Michael Sarnoski to direct, while Hideo Kojima serves as a producer. The headline promoted the most famous name into the wrong credit.',
  verificationNote:
    'This case rewards extracting the exact role stated by primary and later sources instead of pattern-matching on the best-known creator.',
  fixtureEvidence: buildEvidence('directors-cut', {
    kojima: {
      trace: [
        {
          ...deathStrandingA24,
          excerpt: 'A24’s partnership announcement says Hideo Kojima will produce the adaptation; it does not name him as director.',
          stance: 'contradicts',
          quality: 'official',
          provenance: 'Primary announcement with the exact credited role.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...deathStrandingDirector,
          excerpt: 'Independent trade reporting names Michael Sarnoski as director and Kojima as producer.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'Trade confirmation with distinct role attribution.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...deathStrandingA24,
          excerpt: 'The studio partnership identifies Kojima as producer, not director.',
          stance: 'contradicts',
          quality: 'official',
          provenance: 'Direct A24 statement.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...deathStrandingDirector,
          excerpt: 'The later April 2025 director announcement assigns the job to Michael Sarnoski.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'Later reporting resolves the role left open in the initial announcement.',
          isIndependent: true,
        },
      ],
    },
    gunn: {
      trace: [
        {
          ...supermanAnnouncement,
          excerpt: 'DC’s March 2023 press release states that James Gunn will direct from his own screenplay.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary platform feature.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...supermanProduction,
          excerpt: 'A later DC production update independently repeats that Superman is written and directed by Gunn.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Later official production milestone.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...supermanAnnouncement,
          excerpt: 'DC Studios’ own release assigns directing duties to Gunn.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct studio confirmation.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...supermanProduction,
          excerpt: 'The February 2024 start-of-production update continues to credit Gunn as writer-director.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Later official update before the case cutoff.',
          isIndependent: true,
        },
      ],
    },
    wesball: {
      trace: [
        {
          ...zeldaDirector,
          excerpt: 'Nintendo’s film notice names Wes Ball as director of the live-action adaptation.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary rights-holder announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...zeldaDirector,
          title: 'Sony and Nintendo Set Zelda Film Team',
          publisher: 'Sony Pictures',
          excerpt: 'Sony’s production information matches Nintendo’s Wes Ball credit.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Distributor corroboration.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...zeldaDirector,
          excerpt: 'Nintendo explicitly states that Wes Ball directs.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct corporate release.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...zeldaDirector,
          excerpt: 'The March 2025 release update retains Wes Ball as director.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Fresh project update.',
          isIndependent: true,
        },
      ],
    },
    mendes: {
      trace: [
        {
          ...beatlesOfficial,
          excerpt: 'The original project release states Sam Mendes will direct all four films.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary studio announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...beatlesOfficial,
          title: 'Sam Mendes to Direct Four Films About The Beatles',
          publisher: 'The Beatles',
          url: 'https://www.thebeatles.com/beatles-four-film-cinematic-event-0',
          excerpt: 'The rights-holder’s official site independently confirms Mendes as director.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Rights-holder corroboration.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...beatlesOfficial,
          excerpt: 'Sony’s release names Mendes as director, not merely producer.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct studio language.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...beatlesOfficial,
          title: 'The Beatles — A Four-Film Cinematic Event',
          publishedAt: '2025-03-31',
          url: 'https://www.thebeatles.com/beatles-four-film-cinematic-event-0',
          excerpt: 'The CinemaCon cast announcement continues to identify Mendes as director of the event films.',
          stance: 'supports',
          quality: 'independent',
          provenance: 'Later public presentation preserves the directing credit.',
          isIndependent: true,
        },
      ],
    },
  }),
};
