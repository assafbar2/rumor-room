# The Rumor Room — Handoff

## Summary

The Rumor Room is now a complete web game for the Agentic Cinema hackathon. Players receive four plausible entertainment claims and four research tokens, meaning four total research turns. They use structured investigation cards with saved evidence locally or Gemini + Google ADK + Parallel in live mode, build an evidence board, and accuse the unsupported claim.

The design intentionally avoids ordinary media trivia. Players are evaluated on investigation strategy, source provenance, freshness, and evidence quality rather than prior knowledge.

## Decisions made

- Enter the Parallel partner track.
- Working title: **The Rumor Room**.
- Use a 1950s newsroom crossed with a modern intelligence lab.
- Make the web itself the changing game board.
- Use four claims, four research tokens, one accusation, and one evidence receipt.
- Ship three carefully authored cases rather than an endless generator.
- Use sparse electro-noir music rather than a generic jazz or saxophone loop.
- Borrow interaction principles from Prime Suspects, Suspect Memories, Guess My Number, and Composer Muse, but do not reuse their code or assets.
- Build the deterministic game shell locally first, then replace fixture investigation responses with the mandatory Gemini, Google Cloud Agent Builder, and Parallel runtime path.

## MVP

1. Case introduction.
2. Four claim cards displayed as suspects.
3. Four investigation moves: Trace It, Second Source, Studio Line, and Fresh Cut.
4. Parallel Search results represented as dated, cited evidence slips.
5. Claim accusation and reveal.
6. Evidence receipt and score.
7. One complete electro-noir soundscape with semantic sound cues.

## Development sequence

1. Build the noir board, authored cases, investigation cards, scoring, and audio locally with deterministic fixture evidence.
2. Add a narrow provider boundary for investigation requests and evidence responses.
3. Implement the provider with Gemini on Google Cloud Agent Builder or Google ADK/Agent Engine.
4. Connect Parallel Search at runtime and render its cited evidence on the board.
5. Remove or disable fixture mode in the hosted submission path.

## Implementation status

Completed locally:

1. Responsive React investigation board and case briefing.
2. Three authored, source-audited cases.
3. Four research moves, evidence receipts, accusation, reveal, and scoring.
4. Adaptive electro-noir audio with consent-first loading.
5. Google ADK `LlmAgent` and Parallel `FunctionTool` provider.
6. Mechanical citation allowlisting, session-scoped evidence, rate limiting, and production fixture guard.
7. Unit, browser, mobile, build, audit, source-link, and production-startup validation.
8. Docker, Cloud Build, deployment, demo, and submission documentation.

## Remaining external gates

1. Upload the finished 176.1-second demo video and add its public URL to `docs/SUBMISSION.md`.

## Important constraints

- Parallel Search must be visible and essential during gameplay.
- Gemini and Google Cloud Agent Builder are the only AI layer.
- The repository must remain safe to publish publicly; never commit credentials.
- Require explicit approval before committing, pushing, deploying, or creating remote resources.

## Production

- URL: `https://rumor-room-dpq2d26l7q-uc.a.run.app`
- Revision: `rumor-room-00002-zhf`
- Status: live Gemini + Parallel path verified in-browser and in Cloud Run logs.
