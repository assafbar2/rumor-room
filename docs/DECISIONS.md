# Product Decisions

## 2026-08-28 — Develop locally, integrate mandatory Google runtime later

### Decision

Design and build the game experience locally with Codex and ordinary non-AI web tooling. Start with the noir board, deterministic case fixtures, interaction loop, music, and semantic sound design.

Integrate the hackathon-mandated Google runtime after the game shell is coherent:

1. Replace fixture investigation responses with a Gemini agent built on Google Cloud Agent Builder or Google ADK/Agent Engine.
2. Connect that agent to Parallel Search at runtime.
3. Return cited evidence from Parallel to the existing board interaction.
4. Verify the hosted submission contains no non-Google AI runtime dependencies.

### Rationale

- The game experience can be designed and tested without waiting for cloud setup.
- A deterministic shell makes it easier to distinguish product problems from integration problems.
- The Google and Parallel boundary remains explicit rather than spreading provider-specific code throughout the interface.

### Guardrails

- Google integration is deferred, not optional.
- Do not add temporary OpenAI, Anthropic, or other non-Google AI runtime calls.
- Complete an end-to-end Gemini → Parallel → cited evidence path before treating the core game as finished.
- Keep API keys and Google Cloud credentials outside Git.
