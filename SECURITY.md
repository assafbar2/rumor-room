# Security Policy

## Secrets

Never commit API keys, Google Cloud credentials, service-account files, tokens, or personal data. Local secrets belong in `.env`, which is ignored. Production secrets belong in Google Secret Manager.

## Runtime boundaries

- The browser never receives the Parallel key or Google credentials.
- The browser never receives case answer keys.
- User requests are limited to authored case IDs, claim IDs, and fixed research moves; there is no unrestricted rumor-search input.
- Agent output is parsed with Zod.
- Source excerpts are explicitly treated as untrusted evidence rather than instructions.
- Only HTTP and HTTPS evidence URLs are accepted.
- Evidence URLs must match URLs returned by the same Parallel tool call.
- Verdict evidence is scoped to the player's random session ID and case.
- Production refuses fixture mode.
- Investigation requests are rate-limited.
- Responses include a restrictive Content Security Policy and common browser security headers.
- The CSP permits `blob:` only for `worker-src`, which Tone.js requires for browser audio; scripts, frames, and network requests remain same-origin restricted.

## Reporting a vulnerability

Open a private GitHub security advisory for the repository rather than a public issue. Include reproduction steps, affected files or endpoints, and any suggested mitigation. Do not include real credentials in the report.

## Supported version

The current `main` branch is the supported hackathon build.
