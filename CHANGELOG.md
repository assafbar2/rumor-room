# Changelog

## 0.1.0 — Local release candidate

### Added

- Complete three-case Rumor Room campaign.
- Four strategic investigation moves, token economy, accusation, reveal, and evidence scoring.
- Responsive noir newsroom interface with physical claim cards and source receipts.
- Consent-first adaptive Tone.js score, semantic sound cues, and visible captions.
- Fixture provider covering all 48 claim/move combinations.
- Google ADK `LlmAgent` integration with Parallel Search as a runtime `FunctionTool`.
- Mechanical citation allowlisting, temporal research cutoffs, session-scoped evidence, and rate limiting.
- Cloud Run container, Cloud Build pipeline, Secret Manager integration, and dedicated runtime identity.
- CI, bundle budgets, runtime-policy checks, deployment-config checks, production smoke checks, unit tests, Playwright campaign tests, mobile tests, and WCAG A/AA scans.
- Complete architecture, case research, authoring, testing, deployment, demo, security, contribution, and submission documentation.

### Fixed

- Audio cues now run off the critical request path, so sound initialization can never delay or block an investigation.
- Playwright explicitly forces fixture mode, keeping deterministic CI isolated from local live credentials.

### External release gates

- Record and publish the three-minute demo.
- Commit and push after separate explicit approval.

### Validated

- Google user authentication, Application Default Credentials, billing, and Gemini Enterprise configuration.
- `Rumor Room` Parallel organization with signup credits and a server-side API key.
- Three credentialed Gemini → ADK → Parallel investigations matching all authored answer keys.
- Full live browser investigation and correct verdict with no console errors.
- Public Cloud Run deployment with production live-search logs, performance baseline, and remote accessibility verification.
