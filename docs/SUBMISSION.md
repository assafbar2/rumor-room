# Devpost Submission Draft

## Project name

The Rumor Room

## Tagline

A noir investigation game where Gemini and Parallel turn the live web into the evidence board.

## Inspiration

Entertainment rumors are rarely cleanly true or false. A real announcement becomes stale, twenty articles repeat one anonymous source, or a headline promotes “interested” into “confirmed.” We wanted a game about the research judgment required to notice those differences—not a movie-trivia quiz with AI decoration.

## What it does

The player enters a studio newsroom with four plausible entertainment claims and four research tokens—meaning four total research turns. On each turn, they can select any claim and play one of four structured move types: Trace It, Second Source, Studio Line, or Fresh Cut.

Each move invokes a Gemini investigator built with Google ADK. Gemini calls Parallel Search at runtime, evaluates the returned sources for provenance, freshness, independence, and exact wording, then adds dated source receipts to the physical case board. The player accuses the unsupported claim and receives a scored evidence receipt explaining the complete source trail.

The launch build contains three hand-designed cases: one about outdated information, one about many articles repeating the same source, and one about a headline overstating what its source says.

## How we built it

- React 19 and TypeScript for the responsive investigation board.
- Express 5 for the same-origin game API.
- Google ADK 2.0 with Gemini 3.7 Flash on Vertex AI for the investigator.
- Parallel's official TypeScript SDK for runtime web search.
- Zod for request and agent-output validation.
- Tone.js for an original adaptive electro-noir score and semantic audio cues.
- Vitest and Playwright for unit, integrity, desktop, and mobile testing.
- Cloud Run, Artifact Registry, Cloud Build, and Secret Manager for hosting.

The live provider exposes Parallel as a Google ADK `FunctionTool`. Gemini must use that tool for every move. The server records the exact URLs returned by Parallel and discards any evidence item whose URL is not in that runtime response.

## Challenges

The central design challenge was making search strategic. A free-form chat box would reward query volume and make Parallel feel interchangeable. Limiting the player to four typed research moves creates meaningful opportunity cost and makes the quality of the question part of the game.

The engineering challenge was treating model output as untrusted. A prompt saying “do not invent citations” was not enough, so we implemented a mechanical citation allowlist tied to the actual Parallel tool call. We also separated saved test evidence from the live provider and made production refuse to start unless the live Gemini→Parallel path is enabled.

## Accomplishments

- Parallel visibly and materially changes the board on every research move.
- Cases cannot be solved reliably through entertainment recall alone.
- The UI feels like a physical newsroom case rather than a search dashboard.
- The original audio system communicates evidence quality while preserving silent play.
- The same experience works on desktop and mobile.
- The complete local build is linted, unit-tested, browser-tested, source-link audited, and packaged for Cloud Run.
- The credentialed Gemini → Google ADK → Parallel path has been validated across all three cases and through a complete live browser verdict.

## What we learned

Source provenance is a better game mechanic than fact retrieval. The most satisfying evidence is often not a new fact; it is discovering that five apparent confirmations are one report, or that a credible source is no longer current.

Agentic systems are also more convincing when the player controls the objective while the agent controls the research execution. That division makes the player feel responsible for the investigation rather than a spectator waiting for an answer.

## What's next

- A daily seeded case with a controlled verification window.
- Parallel Monitor for a breaking case whose evidence changes over time.
- Shareable evidence receipts.
- A second agent investigator whose strategy the player can challenge.

## Submission checklist

- Hosted URL: `https://rumor-room-dpq2d26l7q-uc.a.run.app`
- Public repository: `https://github.com/assafbar2/rumor-room`
- Demo video: `https://youtu.be/ovbrx_9RvN8` (179 seconds, captioned, recorded against production revision `rumor-room-00006-2tj`)
- Current production revision: `rumor-room-00006-2tj`
- License: MIT
- Partner track: Parallel
- Google Cloud proof: Cloud Run URL and Vertex AI runtime logs (`docs/internal/DEPLOYMENT_REPORT.md`)
- Parallel proof: live search IDs and cited receipt URLs in server logs (`docs/internal/LIVE_VALIDATION.md`)
