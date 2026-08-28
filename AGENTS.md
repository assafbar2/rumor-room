# Project Instructions

## Product

The Rumor Room is a noir investigation game for the Agentic Cinema hackathon's Parallel track.

Read these files before proposing or making changes:

- `HANDOFF.md`
- `docs/design/2026-08-28-rumor-room-design.md`

## Hard constraints

- This must be a newly created project, not an extension of an existing game.
- Use Gemini and Google Cloud Agent Builder for all AI behavior.
- Parallel Search must be called at runtime and visibly affect gameplay.
- Do not add OpenAI, Anthropic, or other AI models, AI APIs, or agent frameworks.
- Never commit API keys, cloud credentials, or personal data.
- Ask before committing or creating remote resources.
- Ask separately before pushing or deploying.

## Development sequence

- Build and validate the deterministic UI, case loop, music, and sound locally first.
- Keep investigation data behind a narrow interface so fixtures can later be replaced cleanly.
- Before the game is considered complete, replace fixtures with Gemini on Google Cloud Agent Builder or Google ADK/Agent Engine calling Parallel Search at runtime.
- Do not use non-Google AI APIs as temporary runtime substitutes.

## Design posture

- Prioritize investigation and deduction over media trivia.
- Preserve the noir newsroom and intelligence-lab direction.
- Keep the MVP playable in four to six minutes.
- Prefer a small number of authored, verifiable cases over unreliable procedural breadth.
