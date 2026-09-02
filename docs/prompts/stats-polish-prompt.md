# Stats UI Polish & Markdown Report — Detailed Prompt

A copy-and-paste specification for improving the **Stats** view and the
**Markdown report** in the offline ReviewApp study tool. Apply it with an AI
assistant, or follow it manually.

---

## Context

ReviewApp is a vanilla HTML/CSS/JS study app with a **dark, terminal-flavored
design system** (Monokai by default, with per-theme palettes). It has a global
motion language built on CSS variables: `--ease: cubic-bezier(0.22,1,0.36,1)`,
`--motion-fast: 130ms`, `--motion-normal: 220ms`, `--motion-slow: 320ms`, plus
shared keyframes `rise-in`, `fade-in`, `pop-in`, `bar-grow`. Animations must
always respect `App.core.motionEnabled()` in JS and the global
`html[data-motion="off"]` / `@media (prefers-reduced-motion: reduce)` rules in
CSS. The active Stats view is `viewStats` in `app/js/views.js` (registered for
`#/stats`); its styles live under `/* ── Statistics analytics center ── */` in
`app/css/styles.css`.

The goal is **professional and smooth, not flashy**: refine what exists, add
subtle micro-interactions and staggered reveals, and keep every change
visually consistent with the app's existing panels, mono labels, borders, and
accents.

---

## Part 1 — Stats UI polish

### 1.1 Section reveal (staggered entrance)
- Each `.stats-section` inside `.stats-body` should animate in with
  `rise-in var(--motion-slow) var(--ease) both`, with a small per-index delay
  cascade (e.g. `0ms`, `50ms`, `100ms` …) so sections appear one after another
  down the page.
- The same cascade should re-run when the analysis range changes (the body is
  rebuilt by `renderBody()`), giving a smooth crossfade instead of a hard swap.
- Keep delays short (≤ ~350ms total) so it never feels slow.

### 1.2 Metric tiles
- Slightly richer hover: lift `translateY(-2px)`, add a soft shadow
  (`var(--shadow-md)`), keep the accent top border, and add a faint
  background glow tinted by the tile's tone (`accent`/`positive`/`negative`).
- Ensure the value count-up (`animateMetric`) stays the only number animation;
  don't add scale/flicker to the whole tile.

### 1.3 Insight cards
- Stagger them in with `pop-in` (small delay per card, capped at ~4 cards).
- Hover: gentle `translateY(-1px)` + shadow; keep the colored left border and
  the circular icon. Give the icon a subtle `pop-in` on reveal.

### 1.4 Coverage ring
- Add a soft colored `drop-shadow` glow behind the ring matching
  `--stats-accent` (subtle, `0 0 ... color-mix(...)`).
- Animate the center percentage number with a count-up to the target value
  (respecting motion settings).

### 1.5 Line chart (performance over time)
- Add a subtle gradient **area fill** under the line (fades to transparent),
  tinted with the chart color, so the trend reads more professionally.
- Give the line a faint `drop-shadow` glow. Keep dots, gridlines, and axis
  labels as-is.

### 1.6 Donut (answer distribution)
- Animate the center percentage with a count-up to match the arc animation.
- Keep the arc stroke animation; optionally add a faint glow on the arc.

### 1.7 Horizontal bars & coverage bars
- Add a subtle glass sheen to the fill (a soft white-tinted gradient overlay)
  so bars look polished on every theme. Keep the width transition.

### 1.8 Chapter table
- Animate the expanding detail panel with a quick `fade-in`/`rise-in` when a
  row opens (CSS-only, using the `details[open]` state).
- Keep the rotating chevron and hover state.

### 1.9 Heatmap
- Animate cells with a quick `pop-in`/scale stagger (a few ms of delay per
  cell, capped) so the grid "draws itself" on load and on range change.
- Keep hover scale and the level color scale.

### 1.10 Toolbar range summary
- Next to the range select, show the **actual date range** of the selected
  period (e.g. `Jul 20 – Aug 17`), computed from the range. For "All time",
  show the first/last activity dates or "All recorded activity".
- Update it whenever the range changes.

### 1.11 Exam readiness
- Under the readiness strip, add a thin progress track showing average score
  vs. the pass threshold, so readiness is visually scannable.

### 1.12 Hygiene
- Every animation must be disabled by the existing global motion-off /
  reduced-motion rules. Prefer CSS animations driven by classes; use JS only
  for count-ups, per-element delays, and existing chart draws.
- Do not change layout/colors of other views; this is Stats-only.

---

## Part 2 — Detailed Markdown report

Replace the thin one-line report (currently built inline in the Stats export
row) with a **buildMarkdownReport(certId)** helper that produces a rich,
well-structured Markdown document. It must be robust when there is no data yet
(show `—` / "No data yet" instead of crashing).

Recommended structure:

1. **Title & metadata** — `# ReviewApp Progress Report`, certification name,
   generated timestamp, and the analysis period.
2. **Overview table** — overall accuracy, certification coverage, questions
   answered (+ unique), flashcard reviews (+ unique), labs completed, current
   streak, active study days, cards due.
3. **Chapter performance table** — chapter (number + title), questions, seen,
   coverage %, accuracy, flashcards, labs, status.
4. **Insights / next steps** — bullet list derived from the data: weakest
   chapter, strongest chapter, accuracy trend vs. previous period, flashcard
   Again-rate trend, exam readiness. Skip any insight that has no data.
5. **Weak areas** — top flashcard weak areas (tag, chapter, attempts, Again
   count/ratio, days since last seen).
6. **Exam history table** — date, score, correct/total, result (Pass/Fail).
   Omit entirely if none.
7. **Flashcard summary** — review events, unique cards, Again rate, first-try
   Next %, cards currently due.
8. **Labs progress** — completed/total plus per-chapter progress.
9. **Recent activity** — last 14 days: answers per day and accuracy (or a
   compact table).
10. **Footer** — "Generated by ReviewApp" and the app version.

Details:
- Use Markdown tables (`| a | b |`) and escape `|` inside cell text.
- Use the same numbers the Stats view shows (recompute from `App.store` /
  `App.content` inside the helper so it is self-contained and reusable).
- Wire the helper into both the active Stats export button and the legacy
  Stats view's export button for consistency.
- Filename stays `reviewapp-<certId>-statistics.md`.

---

## Definition of done

- Stats page animates smoothly on load and on range change, with staggered
  sections, polished tiles/cards/charts, and no motion when animations are off
  or reduced-motion is requested.
- All changes stay within the app's existing visual language (dark,
  terminal-flavored, mono labels, subtle glows).
- The exported Markdown report is a complete, readable snapshot of progress
  with tables and actionable insights.
- No regressions: syntax-check the JS, view the Stats page in the app, verify
  console has no errors.
