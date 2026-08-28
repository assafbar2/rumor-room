# The Rumor Room

**Working title:** a noir web-investigation game where players expose the unsupported claim before the story goes public.

The project is being designed for the [Agentic Cinema: The Blockbuster Hackathon](https://agentic-cinema.devpost.com/) in the Parallel partner track.

## Core idea

Four plausible entertainment-industry claims appear as suspects on an investigation board. The player has a limited number of research moves. Each move calls Parallel Search at runtime and adds traceable evidence to the board. The player must decide which claim is confirmed, outdated, misleading, or unsupported.

The challenge is not remembering movie trivia. It is investigating efficiently, recognizing circular sourcing, and deciding when the available evidence is strong enough to make an accusation.

## Current status

Design only. No implementation has started.

- [Full game and experience design](docs/design/2026-08-28-rumor-room-design.md)
- [Product decisions](docs/DECISIONS.md)
- [Cross-laptop handoff](HANDOFF.md)

## Hackathon constraints

- Build a new project rather than extending an existing game.
- Use Gemini and Google Cloud Agent Builder for the agent experience.
- Use Parallel Search at runtime, not only during development.
- Do not use other AI models, AI APIs, or agent frameworks.
- Deliver a hosted web experience, public source repository, and three-minute demo.
