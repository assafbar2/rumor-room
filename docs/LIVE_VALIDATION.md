# Live Gemini + Parallel Validation

Validated locally on August 28, 2026 using:

- Google ADK 2.0.
- Gemini 3.7 Flash through Google Cloud's Gemini Enterprise Agent Platform configuration.
- Parallel Search through the official `parallel-web` TypeScript SDK.
- The billing-enabled Google Cloud hackathon project selected through Application Default Credentials.
- The `Rumor Room` Parallel organization and its server-side API key.

No API key, OAuth code, access token, or credential file is recorded in this repository.

## Case 014 — Zelda / Fresh Cut

Parallel search ID: `search_714f7e26b14cc6ce64aded2d5f8f9dd8`

Authored adversarial queries:

1. `Legend Zelda April 30 2027 Nintendo`
2. `Zelda movie May 7 date changed`
3. `Miyamoto Zelda worldwide release April 30`

Live result:

- Nintendo's verified account explicitly says the date moved from May 7 to April 30, 2027.
- Polygon and Deadline independently report the same correction.
- Gemini classifies the claim as contradicted and the Nintendo receipt as official.

The complete browser flow displayed **Parallel live search**, spent one research turn, pinned three live receipts, changed Claim B to **High suspicion**, produced a correct verdict, and scored 1,675. The browser console remained error-free.

## Case 027 — Barbie / Studio Line

Parallel search ID: `search_72d1bc94c4a49a246fe0d4d624225ac2`

Authored adversarial queries:

1. `motionpictures.org Barbie sequel no legitimacy`
2. `Barbie sequel Warner representative inaccurate`
3. `Gerwig Baumbach representative no legitimacy`

Live result:

- The Hollywood Reporter result records the official pushback.
- The Motion Picture Association page carries the direct representative denials.
- Gemini classifies the December 2024 “officially in development” claim as contradicted within the historical cutoff.

## Case 041 — Death Stranding / Fresh Cut

Parallel search ID: `search_0344fc178655ceefd672fb6ba9b51864`

Authored adversarial queries:

1. `Death Stranding director announced April 2025`
2. `Michael Sarnoski Death Stranding film`
3. A Gemini-generated role clarification query.

Live result:

- Deadline names Michael Sarnoski as writer-director on April 7, 2025.
- A second source carries Kojima's statement that he will not direct.
- Gemini classifies the Hideo Kojima directing claim as contradicted before the April 8 cutoff.

## Trust-boundary evidence

For every run:

1. Google ADK emitted a model request.
2. The `parallel_search` `FunctionTool` logged a Parallel search ID, objective, effective query set, and result count.
3. Gemini produced structured evidence after the tool response.
4. The server discarded any citation URL not present in that exact Parallel result set.
5. Every surfaced live URL was opened successfully and returned HTTP 200 during validation.

## Remaining validation

## Production validation

The same Zelda browser path passed on the public Cloud Run deployment on August 29, 2026.

- Public URL: `https://rumor-room-dpq2d26l7q-uc.a.run.app`
- Revision: `rumor-room-00002-zhf`
- Production Parallel search ID: `search_61781428203e8b8f6b87da4af008f540`
- Investigation latency observed during final recording: 15.5–23.1 seconds
- Correct verdict score: 1,675
- Console errors: 0
- WCAG A/AA violations: 0 on desktop and mobile
- Sound-on searches: verified non-blocking in production

See `docs/DEPLOYMENT_REPORT.md` for build, runtime, performance, and log evidence.
