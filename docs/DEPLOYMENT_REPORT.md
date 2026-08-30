# Production Deployment Report

## Summary

| Field | Result |
| --- | --- |
| Date | August 29, 2026 |
| Google Cloud project | `direct-subject-497307-p8` |
| Region | `us-central1` |
| Cloud Build ID | `b4ed86b4-c6fc-4709-b6dc-5a844a7e8d8f` |
| Cloud Run service | `rumor-room` |
| Revision | `rumor-room-00002-zhf` |
| Traffic | 100% |
| Runtime identity | `rumor-room-runtime` service account |
| Public URL | `https://rumor-room-dpq2d26l7q-uc.a.run.app` |
| Verdict | Deployed and verified |

## Provisioned resources

- Dedicated Artifact Registry Docker repository: `rumor-room`.
- Dedicated runtime service account: `rumor-room-runtime`.
- Secret Manager secret: `parallel-api-key`.
- Public Cloud Run service with zero minimum instances and five maximum instances.
- Immutable container image tagged with the Cloud Build ID.

The runtime identity has Vertex AI User, log writer, and secret accessor permissions. The Cloud Build identity can write the image, deploy Cloud Run, and act as the runtime identity.

## Deployment result

The current Cloud Build completed successfully in 2 minutes 42 seconds. The Docker build:

- Installed from `package-lock.json`.
- Reported zero npm vulnerabilities.
- Compiled the React client and Node server.
- Produced the expected split initial/audio bundles.
- Pushed image digest `sha256:d415b57baf14a8eb84129dfe549bc5faba2ea57e1240e9751f888d4305b27013`.

Cloud Run created revision `rumor-room-00002-zhf` and routed 100% of traffic to it. This revision includes the sound-on critical-path fix: audio cues can never delay or block research requests.

## Production verification

### Health and security

- `/api/health` returned `mode: live`, `provider: gemini-parallel`, and `ready: true`.
- The root page returned HTTP 200 over HTTP/2.
- CSP, frame denial, content-type protection, referrer policy, and permissions policy headers were present.
- Cloud Run used the dedicated runtime service account.

### Live browser verdict

The public site completed the Zelda `Fresh Cut` path:

- Status badge: **Parallel live search**.
- Token count: 4 → 3.
- Claim state: **High suspicion**.
- Live publishers: Nintendo, Polygon, and Deadline.
- Verdict: **You stopped the bad story.**
- Score: 1,675.
- Browser console errors: 0.
- Investigation responses: HTTP 200 in 15.5–23.1 seconds during the final multi-case recording.
- Verdict response: HTTP 200 in 0.01 seconds.

### Cloud Run evidence

Cloud Run structured logs recorded the final Zelda `Fresh Cut` Parallel search ID `search_61781428203e8b8f6b87da4af008f540` with:

1. `Legend Zelda April 30 2027 Nintendo`
2. `Zelda movie May 7 date changed`
3. `Miyamoto Zelda worldwide release April 30`

The log recorded six Parallel results, the `2024-08-28` freshness floor, and Gemini 3.7 Flash as the consuming model. The final demo recording also logged the supporting Zelda trace, Barbie studio-line, and Death Stranding fresh-cut searches.

### Performance

A fresh Chromium context measured:

- TTFB: 65 ms.
- First contentful paint: 364 ms.
- DOM complete: 291 ms.
- Initial requests: 8.
- Initial transfer: 138,305 bytes.

### Accessibility

Remote Axe scans found zero WCAG A/AA violations on both the briefing and investigation board at desktop and Pixel 7 dimensions.

## Remaining release work

- Resolve the organizer eligibility issue described in the final project review.
- Replace public demo screenshots/video sources with a fictional or mock corpus if submitting under the organizer's published-material guidance.
- Publish the repository and compliant video only after those issues are resolved.

## Repository CI

GitHub Actions run `33245626106` validated audio-fix commit `8cf635b`:

- Clean dependency install.
- Zero-vulnerability audit.
- Complete release gate.
- Production Docker image build.
- Chromium installation.
- Fourteen Playwright browser tests.

The workflow uses the current Node 24-compatible `actions/checkout@v7` and `actions/setup-node@v7` releases.

## Demo Artifact

The final local submission video is `artifacts/rumor-room-demo.mp4`:

- Duration: 176.1 seconds.
- Resolution: 1440×900 at 30 fps.
- Video: H.264.
- Audio: normalized AAC voiceover.
- Decode check: clean.
- Content: three hand-designed cases, four real production Parallel searches, three correct verdict receipts, and the live-status badge.
