import type {
  CaseFile,
  EvidenceQuality,
  EvidenceSlip,
  EvidenceStance,
  ResearchMove,
} from './types.js';

interface EvidenceSeed {
  title: string;
  publisher: string;
  publishedAt: string;
  url: string;
  excerpt: string;
  stance: EvidenceStance;
  quality: EvidenceQuality;
  provenance: string;
  isIndependent: boolean;
}

type ClaimEvidence = Record<ResearchMove, EvidenceSeed[]>;

const evidenceKey = (claimId: string, move: ResearchMove) => `${claimId}:${move}`;

function buildEvidence(caseId: string, claims: Record<string, ClaimEvidence>) {
  return Object.fromEntries(
    Object.entries(claims).flatMap(([claimId, moves]) =>
      Object.entries(moves).map(([move, seeds]) => [
        evidenceKey(claimId, move as ResearchMove),
        seeds.map((seed, index): EvidenceSlip => ({
          ...seed,
          id: `${caseId}-${claimId}-${move}-${index + 1}`,
          claimId,
          move: move as ResearchMove,
        })),
      ]),
    ),
  );
}

const shrekCurrent = {
  title: 'Shrek 5 Official Teaser Trailer Releases',
  publisher: 'NBCUniversal',
  publishedAt: '2026-06-11',
  url: 'https://www.nbcuniversal.com/article/shrek-5-official-teaser-trailer-releases',
};

const zeldaOfficial = {
  title: 'Sony Pictures Entertainment Business Segment Presentation',
  publisher: 'Sony Group',
  publishedAt: '2025-05-14',
  url: 'https://www.sony.com/en/SonyInfo/IR/library/presen/business_segment_meeting/pdf/2025/GNS_E.pdf',
};

const spiderVerseOfficial = {
  title: 'Spider-Man: Beyond the Spider-Verse',
  publisher: 'Sony Pictures Animation',
  publishedAt: '2026-04-02',
  url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
};

const narniaOfficial = {
  title: 'Narnia: The Magician’s Nephew Will Roar to Life with Global Eventized Release in 2027',
  publisher: 'Netflix Tudum',
  publishedAt: '2026-06-16',
  url: 'https://www.netflix.com/tudum/articles/narnia-release-date',
};

const beatlesOfficial = {
  title: 'Sam Mendes, Neal Street Productions and Sony Pictures Entertainment Announce Landmark Beatles Feature Film Project',
  publisher: 'The Beatles / Apple Corps',
  publishedAt: '2024-02-20',
  url: 'https://www.thebeatles.com/sam-mendes-neal-street-productions-make-landmark-beatles-biopic-project-sony-pictures-entertainment',
};

const wakeUpOfficial = {
  title: 'Wake Up Dead Man: A Knives Out Mystery — Everything You Need to Know',
  publisher: 'Netflix Tudum',
  publishedAt: '2024-05-24',
  url: 'https://www.netflix.com/tudum/articles/wake-up-dead-man-knives-out-mystery-cast-release-date-plot',
};

const deathStrandingA24 = {
  title: 'Kojima Productions and A24 Team Up to Adapt Death Stranding',
  publisher: 'Kojima Productions',
  publishedAt: '2023-12-14',
  url: 'https://www.kojimaproductions.jp/en/A24-announcement',
};

const deathStrandingDirector = {
  title: 'A24’s Death Stranding Movie Enlists Director Michael Sarnoski',
  publisher: 'TheWrap',
  publishedAt: '2025-04-07',
  url: 'https://www.thewrap.com/death-stranding-movie-director-michael-sarnoski/',
};

const shrekAnnouncement = {
  title: 'Shrek 5 Cast Announcement',
  publisher: 'DreamWorks Animation',
  publishedAt: '2024-07-09',
  url: 'https://www.youtube.com/watch?v=KbiwL74KyJQ',
};

const supermanAnnouncement = {
  title: 'James Gunn to Helm Warner Bros. Pictures’ Superman: Legacy',
  publisher: 'DC',
  publishedAt: '2023-03-15',
  url: 'https://www.dc.com/blog/2023/03/15/james-gunn-to-helm-warner-bros-pictures-hugely-anticipated-big-screen-epic-superman-legacy',
};

const supermanProduction = {
  title: 'James Gunn’s Superman Movie Starts Production',
  publisher: 'DC',
  publishedAt: '2024-02-29',
  url: 'https://www.dc.com/blog/2024/02/29/james-gunn-s-superman-movie-starts-production',
};

const zeldaDirector = {
  title: 'Development of a Live-Action Film of The Legend of Zelda to Start',
  publisher: 'Nintendo',
  publishedAt: '2023-11-08',
  url: 'https://www.nintendo.co.jp/corporate/release/en/2023/231108.html',
};

const zeldaCurrent = {
  title: 'The Live-Action Zelda Movie Has a New Worldwide Release Date',
  publisher: 'Nintendo Life',
  publishedAt: '2026-05-14',
  url: 'https://www.nintendolife.com/news/2026/05/the-live-action-zelda-movie-has-a-new-worldwide-release-date',
};

const caseDeadlineShift: CaseFile = {
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

const caseEchoChamber: CaseFile = {
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

const caseDirectorsCut: CaseFile = {
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
