# Production Deployment Report

## Summary

| Field | Result |
| --- | --- |
| Date | August 29, 2026 |
| Google Cloud project | `direct-subject-497307-p8` |
| Region | `us-central1` |
| Cloud Build ID | `91a4bb72-66fc-4099-a0de-0c252de81d88` |
| Cloud Run service | `rumor-room` |
| Revision | `rumor-room-00001-vl8` |
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

Cloud Build completed successfully in 2 minutes 45 seconds. The Docker build:

- Installed from `package-lock.json`.
- Reported zero npm vulnerabilities.
- Compiled the React client and Node server.
- Produced the expected split initial/audio bundles.
- Pushed image digest `sha256:18872baeb73f895f621917f512e83c5c710a005b94de52284049da94ca1e7a60`.

Cloud Run created revision `rumor-room-00001-vl8` and routed 100% of traffic to it.

## Production verification

### Health and security

- `/api/health` returned `mode: live`, `provider: gemini-parallel`, and `ready: true`.
- The root page returned HTTP 200 over HTTP/2.
- CSP, frame denial, content-type protection, referrer policy, and permissions policy headers were present.
- Cloud Run used the dedicated runtime service account.

### Live browser verdict

The public site completed the Zelda `Fresh Cut` path:

- Status badge: **Parallel live wire**.
- Token count: 4 → 3.
- Claim state: **High suspicion**.
- Live publishers: Nintendo, Polygon, and Deadline.
- Verdict: **You stopped the bad story.**
- Score: 1,675.
- Browser console errors: 0.
- Investigation response: HTTP 200 in 16.44 seconds.
- Verdict response: HTTP 200 in 0.01 seconds.

### Cloud Run evidence

Cloud Run structured logs recorded Parallel search ID `search_3d599cd77091c8c1baa344deb90fad3d` with:

1. `Legend Zelda April 30 2027 Nintendo`
2. `Zelda movie May 7 date changed`
3. `Miyamoto Zelda worldwide release April 30`

The log recorded six Parallel results, the `2024-08-28` freshness floor, and Gemini 3.7 Flash as the consuming model.

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

- Commit the completed project after explicit approval.
- Push to GitHub after separate explicit approval.
- Record the three-minute demo and add its public URL to the submission.
