# Product Decisions

## 2026-08-28 — Resolve MVP open decisions

### Decision

- Keep the name **The Rumor Room**.
- Use a controlled mix: one current-date case and two explicitly dated historical cases.
- Ask the player only to accuse the unsupported claim; the board derives provisional state for every claim from collected evidence.
- Exclude free-text investigation from the MVP. Four structured moves create strategy, predictable latency, safer queries, and a stronger demo.
- Ship exactly three authored launch cases: stale information, circular sourcing, and headline distortion.

## 2026-08-28 — Use one TypeScript application on Cloud Run

### Decision

Use React/Vite for the client and Express for the server in one TypeScript repository. Compile the server to JavaScript and serve both layers from one Cloud Run container.

Use Google ADK's TypeScript package with Gemini 3.7 Flash on Vertex AI. Expose Parallel Search through an ADK `FunctionTool` using Parallel's official TypeScript SDK.

### Guardrails

- The live agent receives only authored public claims and fixed move objectives.
- Every visible live citation must be present in the Parallel tool response.
- Production must fail closed when live mode is not configured.
- The Parallel API key remains server-side and is supplied through Secret Manager.

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
