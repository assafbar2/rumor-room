# Three-Minute Demo Script

## 0:00–0:20 — Hook

Show the case folder for **The Date That Lied**.

> “Most fact-checking games are trivia with a search box. The Rumor Room makes the changing web itself the board. Four claims look credible. One is expired information, and I have four moves to expose it.”

Open the case.

## 0:20–0:45 — Explain the decision

Point to the four claims and four research moves.

> “I am not asking Gemini for the answer. I choose which claim to investigate and what kind of research would divide the possibilities: trace the origin, demand an independent source, call the studio line, or search only for later information.”

Select the Zelda claim.

## 0:45–1:20 — Show the live integration

Play **Trace It** first.

> “Gemini turns my move into focused queries and calls Parallel Search at runtime. The first receipt is a real Sony investor document: May 7, 2027. That supports the claim, so the easy answer would be to clear it.”

Show the source URL and date.

## 1:20–1:50 — Reveal the investigative twist

Play **Fresh Cut**.

> “Now I search after that document. Parallel finds Nintendo's later announcement moving the worldwide release to April 30. The old source was authentic. It was also stale.”

Point to the changed suspicion state and the new receipt.

## 1:50–2:15 — Commit and score

Accuse the Zelda claim.

Let the audio stop before the stamp.

> “The receipt reconstructs the source trail and scores correctness, efficiency, independent evidence, and provenance—not raw search volume.”

## 2:15–2:40 — Architecture proof

Show the live status badge and a brief architecture slide or the README diagram.

> “The agent is built with Google ADK and Gemini 3.7 Flash on Vertex AI. Parallel is a required function tool. The server records the URLs returned by Parallel and rejects any citation Gemini did not actually see.”

## 2:40–3:00 — Breadth and close

Flash the other two case folders.

> “The three hand-designed cases teach three transferable skills: detecting outdated information, recognizing when many articles repeat one source, and spotting a headline that overstates its evidence. It works on desktop and mobile, with adaptive electro-noir audio, but remains fully playable muted. The Rumor Room turns agentic search into strategy.”

End on the evidence receipt and title.

## Recording checklist

- Use the deployed **Parallel live search** runtime, never saved test evidence.
- Pre-warm the Cloud Run service and test both searches immediately before recording.
- Keep the browser at 1280×900 or 1440×900.
- Turn sound on before the case opens.
- Ensure the source receipts are readable in the capture.
- Keep narration under the timestamps; do not spend time explaining implementation details until the architecture beat.
