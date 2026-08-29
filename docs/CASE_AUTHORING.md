# Case Authoring Guide

## Case quality bar

A Rumor Room case is not four trivia questions. It is one controlled deduction problem with four plausible claims and a specific research lesson.

Every case must include:

- A short newsroom scenario.
- Exactly four related claims.
- Exactly one unsupported or materially misleading claim within the declared temporal frame.
- Expected evidence for all four research moves against all four claims.
- A reveal that distinguishes absence of evidence from evidence of absence.
- Public, low-risk subject matter with traceable sources.

## Preferred mechanics

### Circular sourcing

Many articles repeat one report. The important evidence is the relationship between sources, not the number of search results.

### Stale information

The claim was once accurate but a later primary source superseded it. The old source should remain credible enough to create genuine uncertainty.

### Headline distortion

The source exists, but the claim promotes possibility to confirmation, interest to attachment, or one production role to another.

## Claim writing rules

- Keep all four statements similar in specificity and tone.
- Avoid giveaway wording such as “rumored” on only one card.
- Avoid claims a film fan can solve from memory alone.
- Prefer exact dates, titles, roles, or announcement status.
- Avoid private people, personal allegations, crimes, health, relationships, or claims that could cause reputational harm.
- State a historical cutoff when a case could later change.

## Evidence rules

Each `claimId:move` pair needs at least one deterministic fixture slip. A slip contains:

- Source title, publisher, publication date, and URL.
- A concise excerpt explaining the useful fact.
- `stance`: supports, contradicts, or uncertain.
- `quality`: official, independent, secondary, or circular.
- A provenance explanation.
- Whether the source is genuinely independent.

Fixture text should model the answer a high-quality live investigation is expected to produce; it should not pretend to be a verbatim quotation.

## Verification checklist

1. Open every source URL.
2. Confirm the source supports the fixture description.
3. Confirm only one claim fails within the case dateline.
4. Play the case using each research move first.
5. Check that at least two strategies can solve it, but not through obvious wording.
6. Ask whether the reveal teaches a transferable research lesson.
7. Re-run tests and browser QA.
