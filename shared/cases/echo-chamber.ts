import type { CaseFile } from '../types.js';
import { buildEvidence } from './build.js';
import { beatlesOfficial, shrekAnnouncement, wakeUpOfficial } from './sources.js';

export const caseEchoChamber: CaseFile = {
  id: 'echo-chamber',
  caseNumber: '027',
  title: 'The Echo Chamber',
  dateline: 'New York — December 16, 2024',
  researchCutoff: '2024-12-16',
  mechanic: 'circular-sourcing',
  briefing:
    'Four “confirmed” productions crossed the culture desk. One has a stack of headlines but only a single heartbeat underneath them.',
  mission: 'Separate independent confirmation from repetition dressed as corroboration.',
  claims: [
    {
      id: 'barbie',
      label: 'Claim A',
      statement: 'A Barbie sequel is officially in early development with Greta Gerwig and Noah Baumbach.',
      context: 'The story appeared everywhere within hours.',
    },
    {
      id: 'knivesout',
      label: 'Claim B',
      statement: 'The third Benoit Blanc film is officially titled Wake Up Dead Man.',
      context: 'A title reveal tied to the franchise’s next case.',
    },
    {
      id: 'shrek-announcement',
      label: 'Claim C',
      statement: 'Universal has officially announced Shrek 5 with the original lead cast returning.',
      context: 'A studio franchise revival with a dated announcement.',
    },
    {
      id: 'beatles',
      label: 'Claim D',
      statement: 'Sony has officially announced four Beatles films directed by Sam Mendes.',
      context: 'A coordinated feature-film event told from four perspectives.',
    },
  ],
  unsupportedClaimId: 'barbie',
  reveal:
    'The Barbie sequel story multiplied, but the copies all led back to one report. Representatives for Gerwig and Baumbach then denied that the report was accurate. Headline count was not source count.',
  verificationNote:
    'This historical case is frozen to December 16, 2024 so later franchise developments cannot rewrite what was supportable that day.',
  fixtureEvidence: buildEvidence('echo-chamber', {
    barbie: {
      trace: [
        {
          title: 'Barbie 2 in Early Stages with Greta Gerwig and Noah Baumbach',
          publisher: 'The Hollywood Reporter',
          publishedAt: '2024-12-13',
          url: 'https://www.comingsoon.net/movies/news/1893652-barbie-2-reportedly-in-early-stages-of-development',
          excerpt: 'The wave of sequel stories traces to one unnamed-source report describing an early story idea.',
          stance: 'supports',
          quality: 'secondary',
          provenance: 'Single anonymous-source origin; no studio announcement attached.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          title: 'Barbie Sequel Reports Spread Across Entertainment Sites',
          publisher: 'Syndication Trace',
          publishedAt: '2024-12-13',
          url: 'https://www.motionpictures.org/2024/12/barbie-sequel-in-early-stages-while-greta-gerwig-and-noah-baumbach-hone-story-idea/',
          excerpt: 'Multiple follow-up articles cite the same Hollywood Reporter item and add no independent reporting.',
          stance: 'uncertain',
          quality: 'circular',
          provenance: 'Many URLs, one reporting chain.',
          isIndependent: false,
        },
      ],
      'studio-line': [
        {
          title: 'Barbie Sequel Report Draws Direct Denials',
          publisher: 'The Credits / Motion Picture Association',
          publishedAt: '2024-12-14',
          url: 'https://www.motionpictures.org/2024/12/barbie-sequel-in-early-stages-while-greta-gerwig-and-noah-baumbach-hone-story-idea/',
          excerpt: 'Representatives for both filmmakers said the report was not accurate; no Warner Bros. greenlight was announced.',
          stance: 'contradicts',
          quality: 'official',
          provenance: 'On-record response from the principals’ representatives.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          title: 'Barbie Sequel Report Draws Direct Denials',
          publisher: 'The Credits / Motion Picture Association',
          publishedAt: '2024-12-14',
          url: 'https://www.motionpictures.org/2024/12/barbie-sequel-in-early-stages-while-greta-gerwig-and-noah-baumbach-hone-story-idea/',
          excerpt: 'The later report contains direct denials that supersede the anonymous early-development claim.',
          stance: 'contradicts',
          quality: 'independent',
          provenance: 'Published after the originating story with direct responses.',
          isIndependent: true,
        },
      ],
    },
    knivesout: {
      trace: [
        {
          ...wakeUpOfficial,
          excerpt: 'Netflix’s title reveal names the third Benoit Blanc mystery Wake Up Dead Man.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Original platform announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...wakeUpOfficial,
          title: 'Rian Johnson Reveals Wake Up Dead Man Title',
          publisher: 'T-Street',
          excerpt: 'The filmmaker’s production channel independently matches Netflix’s title announcement.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Creator and distributor corroboration.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...wakeUpOfficial,
          excerpt: 'Netflix officially identifies the film as Wake Up Dead Man: A Knives Out Mystery.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct distributor statement.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...wakeUpOfficial,
          publishedAt: '2024-12-12',
          excerpt: 'Later cast and production updates continue using the same official title.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Fresh platform update retains the title.',
          isIndependent: true,
        },
      ],
    },
    'shrek-announcement': {
      trace: [
        {
          ...shrekAnnouncement,
          excerpt: 'Universal announced Shrek 5 and the return of Mike Myers, Eddie Murphy, and Cameron Diaz.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Studio-family announcement.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          title: 'Shrek 5: Mike Myers, Eddie Murphy and Cameron Diaz Returning',
          publisher: 'The Guardian',
          publishedAt: '2024-07-10',
          url: 'https://www.theguardian.com/film/article/2024/jul/10/shrek-5-announced-release-date-cast-2026-mike-myers-eddie-murphy',
          excerpt: 'Independent coverage confirms DreamWorks’ announcement and the returning core cast.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Production studio confirmation.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...shrekAnnouncement,
          excerpt: 'The studio announcement explicitly names the returning leads.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct studio-family source.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          title: 'Mike Myers, Eddie Murphy and Cameron Diaz to Star in Shrek 5',
          publisher: 'ABC News',
          publishedAt: '2024-07-10',
          url: 'https://abcnews.com/GMA/Culture/mike-myers-eddie-murphy-cameron-diaz-star-shrek/story?id=111792515',
          excerpt: 'The day-after report cites the Universal and DreamWorks release confirming the returning cast.',
          stance: 'supports',
          quality: 'independent',
          provenance: 'Later independent coverage tied to the studio release.',
          isIndependent: true,
        },
      ],
    },
    beatles: {
      trace: [
        {
          ...beatlesOfficial,
          excerpt: 'Sony’s original announcement describes four interconnected films, all directed by Sam Mendes.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Primary studio press release.',
          isIndependent: true,
        },
      ],
      'second-source': [
        {
          ...beatlesOfficial,
          title: 'The Beatles and Apple Corps Confirm Four-Film Event',
          publisher: 'The Beatles',
          url: 'https://www.thebeatles.com/beatles-four-film-cinematic-event-0',
          excerpt: 'The Beatles’ official site independently confirms Mendes and the four-film structure.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Rights-holder confirmation independent of Sony.',
          isIndependent: true,
        },
      ],
      'studio-line': [
        {
          ...beatlesOfficial,
          excerpt: 'Sony explicitly calls the project four theatrical feature films directed by Sam Mendes.',
          stance: 'supports',
          quality: 'official',
          provenance: 'Direct distributor statement.',
          isIndependent: true,
        },
      ],
      'fresh-cut': [
        {
          ...beatlesOfficial,
          title: '“Nothing Off Limits”: Sam Mendes to Direct Four Beatles Films',
          publisher: 'The Guardian',
          url: 'https://www.theguardian.com/film/2024/feb/20/beatles-films-sam-mendes-john-paul-george-ringo',
          excerpt: 'Independent reporting after the announcement confirms the four-film structure and Mendes’ directing role.',
          stance: 'supports',
          quality: 'independent',
          provenance: 'Independent coverage published after the primary announcement.',
          isIndependent: true,
        },
      ],
    },
  }),
};
