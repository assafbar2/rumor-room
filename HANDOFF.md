# The Rumor Room — Handoff

## Summary

The Rumor Room is a short noir investigation game for the Agentic Cinema hackathon. Players receive four plausible entertainment claims and four research tokens. They use structured investigation cards to search the live web through Parallel, build an evidence board, and accuse the unsupported claim.

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

## Still to decide

1. Whether claims are entirely current, historical-with-current-sourcing, or a controlled mix.
2. The exact three launch cases.
3. Whether the player labels every claim or only identifies the unsupported claim.
4. Whether free-text investigation is excluded entirely or offered as one expensive wildcard move.
5. Final project name.

## Next session

Ask Codex:

> Read README.md, HANDOFF.md, and docs/design/2026-08-28-rumor-room-design.md. Continue the design discussion from the open decisions. Do not implement until the design is explicitly approved.

## Important constraints

- Parallel Search must be visible and essential during gameplay.
- Gemini and Google Cloud Agent Builder are the only AI layer.
- The repository must remain safe to publish publicly; never commit credentials.
- Require explicit approval before committing, pushing, deploying, or creating remote resources.
