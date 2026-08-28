# The Rumor Room — Game and Experience Design

**Status:** Approved direction; implementation not started
**Track:** Parallel
**Format:** Four-to-six-minute web investigation game

## 1. Product thesis

If the answer can be stored in a static trivia database, Parallel is decorative.

The Rumor Room makes fresh, traceable web evidence the substance of the game. The player is not asked to remember which actor appeared in which movie. They are asked to investigate plausible claims, distinguish independent confirmation from repetition, identify stale information, and decide when the evidence supports an accusation.

## 2. Player fantasy

The player is the last intelligence analyst in a studio newsroom before a story, announcement, or production decision goes public.

Four claims sit under the lamps. Most contain some truth. One cannot survive serious scrutiny. The player has limited time and a limited research budget to expose it.

The emotional arc is:

1. Curiosity: all four claims appear plausible.
2. Suspicion: weak provenance and contradictions begin to appear.
3. Pressure: research tokens run low while uncertainty remains.
4. Commitment: the player makes an accusation.
5. Satisfaction: the evidence receipt reconstructs the complete source trail.

## 3. Core loop

1. **Open the case:** receive a concise scenario and four claim cards.
2. **Choose a suspect:** decide which claim deserves investigation.
3. **Play a research move:** spend one token on a structured investigation card.
4. **Search the live web:** Parallel returns sources, excerpts, dates, and provenance.
5. **Update the board:** evidence is physically attached to a claim and changes its visual confidence.
6. **Repeat:** continue until confident or out of tokens.
7. **Accuse:** identify the unsupported claim.
8. **Reveal:** compare the player's reasoning with the verified evidence bundle.
9. **Score:** reward correctness, efficiency, evidence quality, and detection of circular sourcing.

## 4. Investigation cards

### Trace It

Find the earliest discoverable source for a claim. Useful for exposing stories that all originate from one anonymous or low-authority post.

### Second Source

Search for genuinely independent corroboration. Rewritten articles that point back to the same source do not count as independent.

### Studio Line

Prioritize official statements from studios, productions, festivals, representatives, unions, or other directly responsible organizations.

### Fresh Cut

Search only for information published after the claim appeared. Useful for finding corrections, denials, changed dates, and superseding announcements.

### Possible wildcard: Read the Fine Print

Extract the fuller context behind one source to determine whether its headline or excerpt overstates what the article actually says. This should only enter the MVP if the four-card loop feels too predictable.

## 5. Parallel's role

Parallel is the evidence engine, not a decorative lookup service.

### During case preparation

- Search for a bounded set of related entertainment claims.
- Establish a canonical evidence bundle for each claim.
- Verify that the intended unsupported claim has a defensible answer.
- Record source dates, provenance, and relationships between repeated reports.

### During gameplay

- Every investigation card sends a natural-language objective and targeted search queries to Parallel Search.
- Results return as source slips containing title, publisher, date, excerpt, and URL.
- Source policy can prioritize authoritative domains or exclude known low-quality sources when a case requires it.
- Freshness controls support recent or changing cases.
- Extract may retrieve fuller page context when an excerpt is insufficient.

### Stretch use

Parallel Monitor can power living cases that update when a casting announcement, release date, festival selection, or production status changes. It is deliberately outside the MVP.

## 6. Case design

Each case contains:

- A short studio or newsroom scenario.
- Four claims that are similar enough to create uncertainty.
- One intended unsupported or materially misleading claim.
- A verified evidence bundle.
- Expected findings for each investigation card.
- A reveal explanation that distinguishes absence of evidence from evidence of absence.

The initial release should contain three authored cases:

1. **Circular sourcing:** many articles repeat one unverified origin.
2. **Stale information:** a formerly accurate claim has been superseded.
3. **Headline distortion:** the source exists, but the claim overstates what it says.

Avoid cases involving private individuals, harmful allegations, or claims where being wrong could create reputational harm. Prefer fictional framing around carefully selected public entertainment information.

## 7. Scoring

- Correct accusation: primary score.
- Unused research tokens: efficiency bonus.
- Independent-source discovery: evidence bonus.
- Circular-source detection: provenance bonus.
- Accusing without sufficient evidence: confidence penalty, even if lucky.

The game should not reward raw search volume. The ideal player asks the question most likely to divide the remaining possibilities.

## 8. Visual system

### Direction

A 1950s newsroom crossed with a modern intelligence lab. Avoid generic sepia detective cosplay and avoid the literal red-string conspiracy board.

### Materials

- Charcoal felt investigation surface.
- Smoked glass and dark metal framing.
- Cream evidence paper held by nickel clips.
- Red grease-pencil marks for suspicion and accusation.
- A focused tungsten lamp surrounded by near-black space.

### Palette

- Dark room: `#090A0C`
- Investigation board: `#181A1E`
- Evidence paper: `#D7CEB8`
- Tungsten light: `#D69A45`
- Accusation red: `#9E3030`
- Verification green: `#617568`

### Typography

- Case titles and labels: Archivo Narrow or a similar condensed bureaucratic sans.
- Narrative and case introductions: Newsreader or a restrained editorial serif.
- Sources, timestamps, and evidence metadata: IBM Plex Mono.

### Signature interaction

Every Parallel search activates a projector-like beam that sweeps across the board. New evidence emerges into the light and is pinned beneath the relevant claim. Strong evidence sharpens and brightens a card; weak or circular evidence leaves it flickering and unstable.

Confirmed claims gradually recede into shadow. Suspicious claims remain under the lamp.

## 9. Primary board

```text
┌ CASE 014: THE VANISHING LEAD ───── 4 RESEARCH TOKENS ┐
│                                                       │
│  [CLAIM A]       [CLAIM B]       [CLAIM C] [CLAIM D] │
│      │                │                         │      │
│  evidence         evidence                  evidence   │
│  evidence                                   evidence   │
│                                                       │
│  INVESTIGATION CARDS             EVIDENCE TRAY        │
│  [Trace It] [Second Source]       excerpts + dates     │
│  [Studio Line] [Fresh Cut]        source provenance    │
│                                                       │
│                       [ ACCUSE THIS CLAIM ]            │
└───────────────────────────────────────────────────────┘
```

The board must feel like a physical case being assembled, not a search-results dashboard wearing noir colors.

## 10. Music direction

Use sparse electro-noir rather than a looping jazz pastiche.

### Musical ingredients

- Tempo between 58 and 64 BPM.
- Restrained upright-bass pulses.
- Brushed-snare heartbeat.
- Isolated muted-piano minor ninths.
- Occasional vibraphone notes.
- Projector hum, tape noise, and distant newsroom room tone.
- Minimal melody so the player can concentrate.

The acoustic elements establish noir. Subtle processing and mechanical rhythm connect the setting to an AI intelligence system.

The score can be generated and scheduled in the browser with Tone.js. Borrow the production discipline learned from Composer Muse, but create all music, code, and assets specifically for this project.

## 11. Semantic sound design

Sound communicates evidence quality and game state:

- **Search launched:** film reel catches and begins spinning.
- **Strong evidence:** two clean vibraphone notes resolve downward.
- **Weak evidence:** an unresolved muted-piano interval.
- **Circular sourcing:** the same click returns through a short echo.
- **Official confirmation:** a heavy file drawer closes.
- **Claim eliminated:** a grease-pencil scrape crosses paper.
- **Accusation:** the score stops completely before a physical rubber-stamp impact.
- **Correct verdict:** the projector stabilizes and the bass resolves without a triumphant fanfare.
- **Incorrect verdict:** tape slows, the bulb flickers, and only room tone remains.

Provide a global mute control, visible captions for meaningful audio cues, and reduced-motion support. The game must remain fully playable without sound.

## 12. MVP boundaries

### In scope

- One polished four-claim game loop.
- Four investigation cards.
- Three authored cases.
- Runtime Parallel Search with visible citations.
- Gemini and Google Cloud Agent Builder orchestration.
- One coherent responsive board layout.
- One original adaptive electro-noir soundscape.
- Evidence receipt and scoring.
- Hosted web experience and public repository.

### Out of scope

- Accounts and persistent identity.
- Multiplayer or live competition.
- Global leaderboard.
- Voice acting.
- Endless procedural case generation.
- Free-form chat as the primary interaction.
- Parallel Monitor integration.
- User-submitted allegations or unrestricted rumor searches.
- Multiple musical themes or cosmetic skins.

## 13. Stretch sequence

Only after the complete MVP works:

1. Add the Read the Fine Print wildcard.
2. Add a daily seeded case.
3. Add a Monitor-powered breaking case.
4. Add a second agent investigator whose strategy the player can challenge.
5. Add shareable evidence receipts.

## 14. Development sequence

The product may be designed and implemented locally before cloud integration, but the mandatory runtime path must remain an explicit completion gate.

1. Build the full board interaction against deterministic evidence fixtures.
2. Establish a narrow investigation interface that accepts a claim and research move and returns structured evidence.
3. Implement that interface with Gemini on Google Cloud Agent Builder or Google ADK/Agent Engine.
4. Connect the Gemini agent to Parallel Search at runtime.
5. Demonstrate cited Parallel evidence changing the board in the hosted application.

Do not introduce a temporary OpenAI, Anthropic, or other non-Google AI runtime. Fixture mode exists to support product development, not to bypass the final architecture.

## 15. Success criteria

The design succeeds when:

- A new player understands the accusation goal within twenty seconds.
- Parallel visibly changes the evidence board during every research move.
- The player makes at least one meaningful strategic choice per token.
- The result cannot be achieved through media recall alone.
- A complete round finishes in under six minutes.
- The three-minute submission video can show the full emotional arc from case opening through evidence receipt.
