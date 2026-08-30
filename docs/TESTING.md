# Testing and QA

## Automated checks

`npm run check` runs:

1. ESLint across client, server, shared code, and tests.
2. Vitest unit and integrity tests.
3. A full client production build.
4. A plain-JavaScript server compilation.

The unit suite covers:

- Three authored cases with four unique claims each.
- Fixture evidence for all 48 claim/move combinations.
- Answer-key removal from the public API shape.
- Suspicion-state derivation.
- Correct and incorrect scoring.
- Agent JSON parsing.
- Mechanical rejection of citations not returned by Parallel.
- A scripted model running through the real Google ADK `Runner` and real Parallel `FunctionTool` wrapper.
- Fixture evidence dates that never exceed the declared case research cutoff.

`npm run test:e2e` starts the fixture application and runs Chromium tests at desktop and Pixel 7 dimensions. It covers:

- Case briefing and start transition.
- All four investigation moves.
- Evidence pinning and token spending.
- External source link behavior.
- Correct accusation and receipt.
- Complete traversal of all three cases.
- Incorrect accusation and receipt.
- Mobile accusation usability.
- WCAG A/AA scans for the briefing and board on desktop and mobile.
- Audio initialization only after explicit consent.
- Audible confirmation and a successful investigation with sound enabled.
- Persistent selected-claim styling while switching suspects.
- Campaign score accumulation and Start Over reset behavior.

## Manual browser QA completed

On August 28, 2026 the local app was inspected at 375×812, 768×1024, 1280×720, and 1280×900.

Verified:

- No horizontal overflow.
- Claim and move hierarchy remains legible at each size.
- Evidence tray moves below the board on narrow layouts.
- Case transition returns to the top of the page.
- Investigation and verdict requests return successfully.
- Initial load has no console warnings or errors.
- Tone.js loads only after audio consent.
- Semantic audio events display synchronized captions even while muted.
- Reduced-motion CSS disables the projector sweep and transitions.

## Production performance baseline

Measured locally against the compiled production server on August 28, 2026:

- TTFB: 4 ms.
- First contentful paint: 116 ms.
- DOM complete: 48 ms.
- Initial requests: 8.
- Initial transfer: 138,300 bytes.
- Initial JavaScript transfer: 66,408 bytes.
- Initial CSS transfer: 6,817 bytes.
- No console errors.

These localhost numbers are a regression baseline, not a claim about deployed network performance.

`scripts/check-bundle.mjs` enforces raw production budgets during `npm run check`:

- Initial JavaScript: at most 240 KiB.
- Initial CSS: at most 32 KiB.
- Largest lazy JavaScript chunk: at most 380 KiB.
- Total JavaScript: at most 650 KiB.

## Source-link audit

After `npm run build`, run:

```bash
node --input-type=module <<'NODE'
import { cases } from './dist-server/shared/cases.js';

const urls = [...new Set(
  cases.flatMap((caseFile) =>
    Object.values(caseFile.fixtureEvidence).flat().map((evidence) => evidence.url),
  ),
)];

for (const url of urls) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
    headers: { 'user-agent': 'Mozilla/5.0 RumorRoomCitationCheck/1.0' },
  });
  console.log(response.status, url);
  await response.body?.cancel();
}
NODE
```

The August 28 audit returned HTTP 200 for all 22 unique URLs.

## Production guard check

This command must fail before listening:

```bash
APP_ENV=production INVESTIGATION_MODE=fixture NODE_ENV=production \
  node dist-server/server/index.js
```

## Live integration acceptance test

Completed locally on August 28, 2026:

1. `/api/health` reported `gemini-parallel` and `ready: true`.
2. One decisive live move ran successfully in each authored case.
3. Each answer matched the intended contradiction within its research cutoff.
4. Every visible receipt URL appeared in the corresponding Parallel result allowlist.
5. Every surfaced live URL returned HTTP 200.
6. The full Zelda browser path reached the correct receipt with no console errors.

See `docs/LIVE_VALIDATION.md` for search IDs, effective queries, and results. The remaining acceptance test is repeating the browser path on the deployed Cloud Run URL.
