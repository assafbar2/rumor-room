# Contributing

## Before changing the project

Read `AGENTS.md`, `HANDOFF.md`, and the approved design in `docs/design/2026-08-28-rumor-room-design.md`.

Hard constraints:

- Gemini and Google ADK/Google Cloud are the only AI layer.
- Parallel Search must run during hosted gameplay and visibly affect the board.
- Do not add another AI model, API, or agent framework.
- Do not commit credentials or personal data.
- Ask before committing, pushing, deploying, or creating remote resources.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

Use fixture mode for deterministic interface work. Use live mode only with server-side credentials.

## Pull-request checklist

- The change preserves the four-to-six-minute case loop.
- New case content follows `docs/CASE_AUTHORING.md`.
- No answer keys or credentials are exposed to the client.
- `npm run check` passes.
- `npm run test:e2e` passes when gameplay changes.
- Source URLs are opened and verified when case data changes.
- Documentation is updated for architecture or operational changes.
