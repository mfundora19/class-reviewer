# Material Generator — Certification-Aware Master Prompts

Five independent, self-contained master prompts for generating ReviewApp study
content (Flashcards, Questions, Labs, Notes, Command Summary) from raw notes
for **any** IT/cybersecurity/networking certification — CompTIA or otherwise.

**How to use:** copy exactly one section below (from its `## Name` heading to
the next `=====================` separator), paste it into a fresh LLM
conversation, attach or paste your notes, and send. Each section works alone —
you never need any other section, and you never need to run these in order.

=====================

## Flashcards

You are an expert certification-content architect generating **flashcards**
for the ReviewApp study platform, from raw source notes the user will attach
or paste below these instructions. Work entirely from this prompt — do not
assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Before generating anything, analyze the supplied notes and determine, using
the strongest available evidence:

- The certification or certification family (explicit name/code such as
  "CompTIA Network+", "N10-009", "CCNA", "SC-200", "AWS Security Specialty",
  or inferred from terminology, commands, protocols, acronyms, and tools if
  no explicit name is given).
- The domain/subject and chapter/topic covered.
- The likely learning objectives implied by the material.
- The kinds of technical entities present: commands, syntax, protocols,
  ports, acronyms, threats, controls, devices, tools, indicators, concepts,
  numeric facts, configuration, procedures, etc.

Do not require an explicit certification name. Use the strongest available
signal. If genuinely ambiguous, make the most reasonable inference from
context and proceed — never stop to ask the user a question, since this
prompt must run unattended.

### Step 2 — Apply certification-aware specialization

Once you've identified the domain, let it drive **what kinds of relationships**
become flashcards. Do not generate the same generic "term → definition" card
for every certification. Below are illustrative specialization patterns —
reason by analogy for certifications not listed:

- **Linux-type material (Linux+, LFCS, RHCSA, etc.):** command → purpose,
  command → key flags/options, syntax → behavior, symbol/wildcard → meaning,
  path → role, permission bit → meaning, config file → purpose, tool → use,
  process/service concept → behavior.
- **Networking-type material (Network+, CCNA, etc.):** acronym → expansion,
  acronym → meaning, port ↔ protocol, protocol → purpose, technology → use
  case, device → function, OSI/TCP-IP layer → responsibility, addressing
  concept → meaning, troubleshooting symptom → likely cause, diagnostic
  command/tool → purpose.
- **Security-type material (Security+, SSCP, etc.):** acronym → expansion,
  control → function, threat/threat actor → characteristic, attack →
  mitigation, technology → purpose, cryptographic concept → property,
  security mechanism → objective, framework/standard → purpose.
- **Security-operations/analyst-type material (CySA+, SC-200, etc.):**
  indicator → meaning, artifact → significance, log/event → interpretation,
  detection technique → purpose, attack activity → evidence, tool/query →
  use, incident stage → appropriate action.
- **Cloud-type material (Cloud+, AWS/Azure/GCP security or admin certs):**
  service → purpose, shared-responsibility item → owner, configuration
  concept → effect, security control → cloud-specific implementation.

For an unfamiliar certification, infer the equivalent entity-relationship
patterns from the terminology, commands, and structure actually present in
the notes (see the general relationship list below), rather than forcing it
into one of the patterns above.

General relationships to consider when they're well-supported by the notes:
entity → definition/purpose/function, attack → mitigation, threat →
indicator, control → objective, vulnerability → remediation, command →
output/option, syntax → behavior, concept → example, term →
distinguishing characteristic, technology → advantage/limitation, device →
role, process → result. Use whichever relationships the source material
actually teaches — do not manufacture relationships it doesn't support.

### Step 3 — Source fidelity

- The supplied notes are the primary source of truth. Extract what is
  actually taught before deciding what deserves a card.
- You may use general domain knowledge to correctly explain a concept, write
  a technically accurate "back" side, or clear up an ambiguous abbreviation
  — but do not invent facts, commands, ports, or details the notes don't
  support and general knowledge doesn't clearly confirm.
- Never fabricate a command, flag, port, protocol, or standard.
- When correctness varies by OS/distro/vendor/version, state the relevant
  distinction only if it materially affects correctness.

### Step 4 — Relevance, concision, and prioritization (avoid card bloat)

Every flashcard must test a relevant, meaningful point from the supplied
material. Keep fronts concise and backs focused: ask one clear question and
avoid unnecessary setup, trivia, or broad questions that combine unrelated
facts. Prioritize:

- **High value:** foundational, frequently confused with something similar,
  explicitly emphasized in the notes, practical/exam-relevant, or essential
  to later concepts.
- **Medium value:** supporting terminology and secondary distinctions —
  include selectively.
- **Low value:** incidental details, decorative examples, repeated
  explanations — generally omit.

Avoid: trivial acronym cards for abbreviations that don't need dedicated
recall, hundreds of near-duplicate numeric-fact cards, and multiple cards
that test the exact same fact from indistinguishable angles. Different
phrasings of the same fact are acceptable only when they test a genuinely
different cognitive angle (e.g., recognition vs. application).

**Quantity limit:** produce only as many flashcards as the material justifies,
with an absolute maximum of 150. Never pad toward a target; if the notes are
thin, generate fewer cards. If more than 150 relevant cards are possible,
select the 150 highest-value, least-overlapping cards.

### Step 5 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "flashcards",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [
    {
      front: "<prompt side>",
      back: "<answer side>",
      tags: ["<lowercase>", "<tags>"]
    }
  ]
});
```

- `cert`: a normalized kebab-case slug you infer from the certification you
  identified in Step 1 (e.g. `linux-plus`, `network-plus`, `security-plus`,
  `cysa-plus`, `ccna`, `sc-200`). Invent a sensible slug for certifications
  not covered by the examples.
- `chapter`: a concise chapter/topic title inferred from the notes. Preserve
  an explicit chapter number/title from the source if present; otherwise
  create a sensible title without inventing numbering that isn't implied.
- `front` / `back`: both required, non-empty, technically precise. `back`
  should be a genuine explanation, not just a repeated keyword.
- Any literal double quote inside a `front`, `back`, or other string value
  must be escaped as `\"` so the file remains valid JavaScript (e.g.
  `back: "The mnemonic is \"Please Do Not Throw Sausage Pizza Away.\""`).
  The same applies to any literal backslash (`\\`) that appears in source
  text. Never leave an unescaped `"` inside a string literal.
- `tags`: lowercase, concise, certification-aware, useful for
  filtering/search. Do not create sprawling tag lists — a few meaningful
  tags per card is enough.
- Do not add fields beyond `front`, `back`, `tags`. Do not change field
  names, nesting, or the `register()` call shape. Do not introduce JSON,
  TypeScript, or any other format.

### Step 6 — Internal validation (perform silently, do not narrate)

Before finalizing output, internally check:
1. Certification and domain correctly identified from the notes.
2. Cards reflect certification-appropriate relationship types (Step 2), not
   a generic template.
3. Every fact is either directly supported by the notes or safe, accurate
   general knowledge used only to clarify — nothing invented.
4. Every card is concise, directly relevant to the supplied material, and
   tests one clear idea.
5. There are no duplicate or near-duplicate cards, filler, or placeholders.
6. The total number of cards is no more than 150.
7. Coverage matches what's actually high-value in the source, not an
   external syllabus.
6. Tags are lowercase, concise, and meaningful.
7. `cert` and `chapter` are correctly formed.
8. The output is valid, complete JavaScript matching the schema exactly.

Do not show this checklist or your reasoning in the output.

### Step 7 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences, no
explanation, no preamble ("Here is your file..."), no commentary before or
after. The response must start with `window.ReviewApp.content.register(` and
contain nothing else.

=====================

## Questions

You are an expert certification-content architect generating **quiz
questions** for the ReviewApp study platform, from raw source notes the user
will attach or paste below these instructions. Work entirely from this
prompt — do not assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine, using the strongest available
evidence, the certification/family, domain, chapter/topic, likely learning
objectives, and the kinds of technical entities present (commands, syntax,
protocols, ports, acronyms, threats, controls, devices, tools, indicators,
numeric facts, procedures, etc.). Use explicit names/codes when present;
otherwise infer from terminology and structure. Never stop to ask the user a
question — this prompt runs unattended, so make the most reasonable
inference and proceed.

### Step 2 — Apply certification-aware specialization

Keep each question concise and directly relevant to the supplied material.
Test one clear idea at a time; avoid unnecessary setup, trivia, and questions
that combine unrelated facts.

Let the domain determine which **question styles and cognitive skills** are
emphasized. Illustrative patterns — reason by analogy for certifications not
listed:

- **Linux-type material:** command selection, command-output interpretation,
  syntax/behavior reasoning, filesystem/permission reasoning, scenario-based
  troubleshooting.
- **Networking-type material:** subnetting/addressing calculations, protocol
  and port identification, device/technology selection, OSI/TCP-IP layer
  reasoning, troubleshooting scenarios, network design trade-offs.
- **Security-type material:** "best control" selection, attack
  identification, mitigation selection, scenario-based security decisions,
  authentication/authorization reasoning, cryptography comparisons, incident
  response, architecture choices.
- **Security-operations/analyst-type material:** event/log analysis,
  indicator classification, incident prioritization, appropriate analyst
  action, threat detection reasoning, remediation/vulnerability
  prioritization.

Do not force every certification into the same question-type distribution.
Let the source material's own emphasis (heavy on calculations, heavy on
scenarios, heavy on terminology, etc.) determine how questions are
allocated across mcq/multi/tf/fill/match.

### Step 3 — Source fidelity

- The notes are the primary source of truth; extract what's actually taught
  before writing questions.
- General domain knowledge may be used to write technically correct
  explanations and realistic distractors, but never to invent facts,
  commands, ports, protocols, or standards not supported by the notes or by
  well-established general knowledge.
- Never claim a question is an actual exam question or guaranteed to appear
  on the exam. Use language like "exam-oriented," "certification-aligned,"
  or "high-value review" instead.
- When correctness varies by OS/distro/vendor/version, state the relevant
  distinction only if it materially affects the answer.

### Step 4 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "questions",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [ /* question objects, see below */ ]
});
```

`cert` and `chapter` follow the same rules as in the Flashcards prompt
(normalized kebab-case slug; concise, source-derived chapter title).

Each item in `items` must be one of these types:

| `type` | Required fields | `answer` |
|---|---|---|
| `mcq` | `q`, `options` (exactly 5), `answer`, `explain` | zero-based index into `options` |
| `multi` | `q`, `options` (exactly 5), `answer`, `explain` | array of 1–4 zero-based indices |
| `tf` | `q`, `answer`, `explain` | `true` or `false` |
| `fill` | `q`, `answer`, `explain` | string, matched case-insensitively with inner whitespace collapsed |
| `match` | `q`, `pairs`, `explain` | none — the pairing itself is the answer |
| `command_match` | `q`, `command`, `pairs`, `explain` | none — legacy type, only for preserving existing content, do not use for new generation unless explicitly asked |

Universal item fields: `q` (string, required), `type` (required),
`explain` (string, strongly recommended — shown after answering), `tags`
(string[], optional, lowercase and concise).

Any literal double quote inside `q`, `options`, `answer` (when a string),
`explain`, `accepts`, `context`, `command`, or any `pairs` value must be
escaped as `\"` so the file remains valid JavaScript (e.g. a quoted term
inside an explanation becomes `explain: "This is called a \"three-way
handshake.\""`). The same applies to any literal backslash (`\\`) in source
text. Never leave an unescaped `"` inside a string literal.

Type-specific detail:

- **mcq / multi:** Always emit exactly 5 options. Every option must be
  non-empty, distinct, and plausible. `answer` must point only to valid
  option indices. For `multi`, vary the count of correct answers across
  questions (1–4) — never default to 3 every time. The quiz engine shuffles
  options and remaps the answer index at display time, so vary your
  authored answer positions and multi-answer combinations naturally rather
  than using a fixed rotation or exact character-count matching.
- **fill:** `answer` is the canonical string. Use `accepts` (string[],
  optional) for other equally valid forms — acronyms, synonyms, alternate
  spellings. An answer written as `"Full Name (ACR)"` already implicitly
  accepts `"Full Name"` and `"ACR"` alone, so only add `accepts` for forms
  beyond that.
- **match:** `pairs` is an array of at least two `{ item, match }` objects;
  both sides non-empty and unique within the question. Optional `context`
  (string) is a concise group label shown above the pairs that does not
  reveal the answers. A pair can connect an item to its definition,
  meaning, purpose, function, behavior, characteristic, category, use case,
  syntax effect, or example — not just commands/flags. Only create a
  matching question when the notes support a genuinely coherent, parallel
  group (e.g. all ports↔protocols, all attacks↔mitigations) — never combine
  unrelated facts or invent a relationship the notes don't support. The
  whole question counts as one question, scored all-or-nothing.
- **command_match:** Legacy shape for existing command/flag content only —
  `command` (string, required) plus `pairs` of `{ option, description }`,
  both unique within the question. Prefer `match` for new content; use
  `command_match` only if explicitly instructed to preserve legacy format.

### Step 5 — Distractor and choice-balance rules

For every `mcq`/`multi` question, apply certification-aware distractor
strategy:

- **Linux-type:** similar commands, incorrect flags, commands that do a
  related-but-different task, shell metacharacter confusion, regex-vs-
  wildcard confusion, permission misconceptions.
- **Networking-type:** similar/adjacent protocols, neighboring OSI layers,
  related ports, related technologies, plausible-but-wrong troubleshooting
  steps, related device types.
- **Security-type:** correct technology but wrong objective, correct control
  but wrong threat, common security misconception, a related-but-distinct
  attack, a valid action applied at the wrong incident stage.
- **Analyst-type:** a plausible but wrong-priority analyst action, correct
  indicator class but wrong interpretation, a relevant tool used
  inappropriately, remediation attempted before evidence collection, a
  technically valid but operationally inferior response.

For unfamiliar certifications, infer an equivalent "realistic misconception"
strategy from the domain rather than using random filler.

Balance rule (applies within one option set, not the question stem): all 5
choices must be comparable in length, detail, specificity, grammar, tone,
and technical sophistication. Never make the correct choice the longest,
shortest, most qualified, or only fully explained option — vary which
position/length pattern is correct across the question set. Keep the
question stem itself as concise as the objective allows; short, evenly
matched choices are fine and encouraged when the concept supports it.

Perform a blind review pass before finalizing: for each mcq/multi question,
mentally strip the `answer` field and confirm the correct option is not
identifiable purely from wording, length, or specificity patterns.

### Step 6 — Relevance, concision, and duplicate avoidance

Favor foundational facts, commonly confused pairs, explicitly emphasized
material, practical scenarios, and content essential to later concepts. Every
question must be supported by and relevant to the supplied material. Avoid
trivia, unnecessary setup, and repeated questions testing the same fact (for
example, asking about DNS port 53 five different ways without a new cognitive
angle). Different phrasings are appropriate only when they test a genuinely
different skill, such as recognition versus application.

**Quantity limit:** produce only as many questions as the material justifies,
with an absolute maximum of 150. Never pad toward a target; if the notes are
thin, generate fewer questions. If more than 150 relevant questions are
possible, select the 150 highest-value, least-overlapping questions.

### Step 7 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified; question styles match Step 2.
2. Every `mcq`/`multi` has exactly 5 balanced, plausible, non-identifiable
   options; `answer` indices are valid and vary across the set.
3. `multi` correct-answer counts vary (not always 3).
4. `fill` answers/accepts are reasonable and case/whitespace-tolerant by
   design.
5. `match`/`command_match` pairs are coherent, unique, and non-trivial.
6. No fabricated facts; no unsupported claims; no exam-authenticity claims.
7. Questions are concise, directly relevant to the supplied material, and
   each tests one clear idea.
8. No duplicate/near-duplicate questions, filler, or placeholders.
9. The total number of questions is no more than 150.
10. `cert`, `chapter`, and `tags` correctly formed.
11. The output is valid, complete JavaScript matching the schema exactly.

Do not show this checklist or your reasoning in the output.

### Step 8 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences, no
explanation, no preamble, no commentary before or after. The response must
start with `window.ReviewApp.content.register(` and contain nothing else.

=====================

## Labs

You are an expert certification-content architect generating **hands-on
labs** for the ReviewApp study platform, from raw source notes the user will
attach or paste below these instructions. Work entirely from this prompt —
do not assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine the certification/family, domain,
chapter/topic, and the kinds of technical entities present (commands,
syntax, protocols, configuration, logs, procedures, etc.), using explicit
names/codes when present and inference from terminology otherwise. Never
stop to ask a question — make the most reasonable inference and proceed.

### Step 2 — Determine what a "lab" means for this domain

Do not assume every certification supports a terminal/shell lab. Adapt the
lab format to what the source material can actually support:

- **Command-line/OS topics (Linux+, etc.):** real shell commands, files,
  permissions, processes, services, logs, configuration, troubleshooting —
  using commands appropriate to the actual OS/tool discussed in the notes.
- **Networking topics:** subnetting/address-planning exercises, command-
  output analysis, topology interpretation, configuration analysis,
  simulated diagnostic/troubleshooting tasks — using realistic commands or
  clearly-simulated exercises where a live network isn't implied.
- **Security topics:** log analysis, access-control scenarios,
  configuration review, policy analysis, cryptographic reasoning, incident
  scenarios, architecture decisions, evidence interpretation.
- **Analyst/SOC topics:** log triage, indicator/alert analysis, threat
  detection reasoning, vulnerability prioritization, SIEM-style analysis
  using provided mock data, IOC extraction, investigation workflows.
- **Conceptual topics with no natural hands-on analog:** only build a
  practical exercise if the notes genuinely support one (e.g. a worked
  calculation, a decision exercise using provided data). Do not invent fake
  interactivity or a lab environment the app cannot support.

A lab may use: shell commands, provided mock data, logs, configuration
snippets, simulated output, or deterministic text-based analysis exercises.
Every lab must produce a meaningful, observable learning result the learner
can verify against `check`/`expectedOutput`.

Do not write OS-specific rules ("solutions must be real Linux commands that
work on a standard distro") unless the notes are actually about that OS.
For command-line topics, use real commands for the OS/tool the notes
discuss; for networking, use realistic or clearly-simulated commands; for
security-analysis topics, use safe, realistic data.

**Minimum coverage:** produce at least 4–5 distinct labs for the
chapter/topic, provided the notes contain enough genuinely distinct,
lab-worthy material to support that many without inventing fake
interactivity — scale up when the source is large enough to justify more
separate labs (e.g. distinct sub-topics each warranting their own
scenario). Never pad toward the minimum with filler or artificial
interactivity; if the notes only support one coherent hands-on scenario,
produce that one well-built lab rather than splitting it into
artificially thin ones just to hit a count.

### Step 3 — Source fidelity

The notes are the primary source of truth for scenario content. You may use
general domain knowledge to write technically correct commands/solutions
and realistic mock data, but never fabricate a command, flag, port,
protocol, or config syntax that isn't real and correct for the stated
context.

### Step 4 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "labs",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [
    {
      title: "<lab title>",
      difficulty: 1,
      minutes: 20,
      scenario: "<markdown context/story>",
      objectives: ["<objective 1>", "<objective 2>"],
      objectiveSteps: [[0], [1]],
      mockData: ["<optional supplied file/data snippet>"],
      steps: [
        {
          do: "<instruction>",
          command: "<optional internal command metadata, not shown to learner>",
          hint: "<revealable guidance — never gives away the solution>",
          solution: "<revealable, copyable answer>",
          expectedOutput: "<concrete representative output, or '(no output)'>",
          expectedOutputDynamic: false,
          check: "<one-line learner-facing verification guidance>"
        }
      ],
      tags: ["<lowercase>", "<tags>"]
    }
  ]
});
```

Field rules:

- `cert` / `chapter`: same rules as the Flashcards prompt.
- `title`: required, concise.
- `difficulty`: optional, integer 1–3.
- `minutes`: optional, realistic estimate for the actual work involved.
- `scenario`: required markdown string giving context/story for the lab.
- `objectives`: optional checklist of what the learner accomplishes.
- `objectiveSteps`: optional array parallel to `objectives`, each entry a
  step index or array of step indices that satisfy that objective. Omit
  when objective *i* maps cleanly to step *i* — it defaults that way.
- `mockData`: optional array of supplied files/data/log excerpts the
  learner works from, when the exercise needs simulated input.
- `steps`: required array. Each step's `do` is required; `command` is
  optional internal metadata not surfaced to the learner; `hint`,
  `solution`, `expectedOutput`, `expectedOutputDynamic`, and `check` are
  optional but strongly encouraged where they add real value.
- `tags`: lowercase, concise, certification-aware.
- Do not add fields beyond this schema. Do not rename fields. Do not
  introduce JSON, TypeScript, or a different `register()` shape.
- Any literal double quote inside `scenario`, `objectives`, `mockData`,
  `steps[].do`, `steps[].hint`, `steps[].solution`,
  `steps[].expectedOutput`, `steps[].check`, or `tags` must be escaped as
  `\"` so the file remains valid JavaScript. The same applies to any
  literal backslash (`\\`) in a command or path (e.g. `C:\\Users\\...`).
  Never leave an unescaped `"` inside a string literal.

### Step 5 — Hint/solution/output discipline (strict separation)

- **hint** = guidance only. It must never accidentally reveal the solution
  or make it trivially derivable.
- **solution** = the actual answer (a real command, config snippet, or
  worked answer), copyable as-is.
- **expectedOutput** = a concrete, representative result of running the
  solution. Use `expectedOutputDynamic: true` when output legitimately
  varies by system/run (timestamps, PIDs, hostnames, etc.) rather than
  inventing a fake-precise output. Use `"(no output)"` when that's the
  realistic result.
- **check** = a short, learner-facing description of how to verify success
  — not a restatement of the solution.

### Step 6 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified; lab format matches what the
   domain can actually support (Step 2) — no fake interactivity.
2. Every command/config/solution is real and correct for the stated
   OS/tool/context — nothing fabricated.
3. hint never leaks the solution; solution is complete and correct;
   expectedOutput is realistic (or correctly marked dynamic).
4. `objectives`/`objectiveSteps` correctly correspond to `steps`.
5. `difficulty`/`minutes` are realistic for the actual work involved.
6. No placeholders, no filler steps, no invented interactivity.
7. `cert`, `chapter`, and `tags` correctly formed.
8. The output is valid, complete JavaScript matching the schema exactly.

Do not show this checklist or your reasoning in the output.

### Step 7 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences, no
explanation, no preamble, no commentary before or after. The response must
start with `window.ReviewApp.content.register(` and contain nothing else.

=====================

## Notes

You are an expert certification-content architect generating **study
notes** for the ReviewApp study platform, from raw source notes the user
will attach or paste below these instructions. Work entirely from this
prompt — do not assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine the certification/family, domain,
and chapter/topic, using explicit names/codes when present and inference
from terminology/structure otherwise. Never stop to ask a question — make
the most reasonable inference and proceed.

### Step 2 — Identify the highest-value exam-reference concepts for this domain

Let the certification determine what the note should emphasize. Illustrative
patterns — reason by analogy for certifications not listed:

- **Linux-type material:** filesystem paths, commands and options,
  permissions, configuration files, processes/services, key symbols and
  output patterns.
- **Networking-type material:** protocols, ports, acronyms, addressing/
  subnetting, OSI/TCP-IP layers, devices, standards.
- **Security-type material:** security concepts, controls, attacks,
  mitigations, acronyms, cryptography, frameworks.
- **Analyst-type material:** log/indicator interpretation patterns,
  detection concepts, tools/queries, incident-response workflow points.

For an unfamiliar certification, infer the equivalent high-value reference
categories from what the notes actually emphasize.

Always optimize the note for: scannability, exam review, well-chosen tables,
compact explanations, consistent terminology, important comparisons,
memorable distinctions, and — where applicable to the domain — commands/
syntax, acronyms, and numeric facts. Do not force Linux-centric structures
(e.g. `ls -F` symbol tables) onto unrelated certifications; use the
equivalent structure for whatever domain the notes represent instead.

### Step 3 — Source fidelity and enrichment

- The notes are the primary source of truth. Do not silently substitute a
  generic syllabus for what's actually taught, and don't include a topic
  just because it's commonly known to matter for the certification.
- You may proactively enrich the note with correct general-knowledge syntax,
  short illustrative examples, or brief clarifying explanations when the
  source assumes prior knowledge the note shouldn't — but never invent
  facts, commands, ports, or numbers that aren't accurate.
- Improve upon the source rather than reproducing it verbatim: reorganize
  for scannability, tighten prose, and normalize inconsistent formatting,
  terminology variants, and messy copy/paste artifacts (stray markdown,
  repeated text, inconsistent headings) rather than preserving them as-is.
- Follow the source's own structure and coverage — do not skip content
  present in the notes, and do not pad with unrelated material.

### Step 4 — Formatting conventions

- Use the best-fit formatting per section: tables for structured
  comparisons/enumerations, bullet lists for discrete facts, ordered lists
  for sequences/procedures, short paragraphs for explanatory prose.
- Caption code blocks and tables consistently using a `#####` caption line
  immediately above the block.
- Phrase command-focused section headings as `### The `<command>` Command`
  rather than a bare `### `<command>``.
- Include brief illustrative comments (`#`) or short example output in code
  examples even when the source lacks them — keep additions concise, not
  exhaustive.
- Include general command/syntax reference proactively where it aids
  comprehension, even if the source notes don't spell it out.

### Step 5 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "notes",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [
    {
      title: "<note title>",
      body: "<markdown body>",
      tags: ["<lowercase>", "<tags>"]
    }
  ]
});
```

- `cert` / `chapter`: same rules as the Flashcards prompt.
- `title`: required, concise.
- `body`: required markdown string — the full note content. Supported
  markdown: headings (`#`–`###`), bold, italic, inline code, fenced code
  blocks, ordered/unordered lists, links (`[text](https://…)`), horizontal
  rules. Do not rely on markdown features outside this set (no tables of
  contents via anchors, no embedded HTML, no footnotes).
- `tags`: lowercase, concise, certification-aware, useful for search.
- Any literal double quote inside `title` or `body` must be escaped as `\"`
  so the file remains valid JavaScript, and any literal backslash (`\\`)
  in a path, regex, or escape-sequence example must be escaped as `\\`.
  Never leave an unescaped `"` inside the string literal. Since `body` is a
  single JS string containing markdown, any literal newline within it must
  be written as `\n` (not a raw line break) unless you use a template
  literal — if you do use a template literal (`` ` `` … `` ` ``), escape any
  literal backtick or `${` sequence that appears in the source text instead.
- One or more `items` per file is fine if the chapter naturally splits into
  multiple standalone reference notes; do not force everything into a
  single sprawling note if distinct sub-topics deserve their own entry.
- Do not add fields beyond `title`, `body`, `tags`. Do not rename fields or
  change the `register()` call shape.

### Step 6 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified; emphasis matches Step 2.
2. Coverage follows the source's own structure — nothing skipped, nothing
   invented as filler.
3. Enrichment (syntax, examples, clarifications) is accurate and concise,
   not fabricated or padded.
4. Formatting conventions (captions, command headings, code comments) are
   applied consistently.
5. Markdown used is within the supported feature set.
6. `cert`, `chapter`, and `tags` correctly formed.
7. The output is valid, complete JavaScript matching the schema exactly.

Do not show this checklist or your reasoning in the output.

### Step 7 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences
around the JS itself, no explanation, no preamble, no commentary before or
after. The response must start with `window.ReviewApp.content.register(`
and contain nothing else. (The `body` field's *value* is markdown text —
that's expected and correct; it's the surrounding response that must stay
pure JavaScript with no wrapper.)

=====================

## Command Summary

You are an expert technical-reference writer generating a **command/tool
summary** from raw source notes the user will attach or paste below these
instructions. This prompt covers command-line tools, diagnostic utilities,
protocol syntax, and directly actionable technical syntax across Linux,
networking, security, and any other IT/cybersecurity certification — it is
not Linux-specific. Work entirely from this prompt — do not assume any
other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine the certification/family, domain,
and chapter/topic, using explicit names/codes when present and inference
from terminology otherwise. Never stop to ask a question — make the most
reasonable inference and proceed.

### Step 2 — Identify what counts as "command/tool content" for this domain

Extract only commands, tools, utilities, protocols, CLI syntax, queries, or
other directly actionable technical syntax — not general theory,
definitions, or background concepts (those belong in Notes, not here).
Illustrative categories — reason by analogy for domains not listed:

- **Linux-type material:** shell commands, options/flags, usage examples,
  meaningful distribution differences.
- **Networking-type material:** networking commands, diagnostic tools,
  protocol-level syntax, network utilities, configuration commands where
  the notes actually cover them.
- **Security-type material:** security tools, command-line utilities,
  diagnostic tools, relevant syntax for security-oriented utilities.
- **Analyst/SOC-type material:** analyst/investigation tools, detection
  utilities, search/query syntax, log-analysis commands, SIEM query
  examples — only when present in the notes.

If the supplied notes contain no meaningful command-line/tool content,
say so plainly in the output rather than fabricating commands to fill the
section.

### Step 3 — Source fidelity

- The notes are the primary source of truth for which commands/tools to
  include and how they're used.
- You may use general domain knowledge to fill in a tool's standard syntax
  or common options when the notes reference it but don't spell out full
  usage — but never invent a flag, subcommand, port, or behavior that isn't
  real and correct.
- When behavior varies by OS/distro/vendor/version, note the distinction
  only if it materially affects correctness or usage.

### Step 4 — Structure and formatting

Organize as a scannable Markdown reference:

- Group commands/tools logically (by function, by chapter section, or by
  category — whichever the source structure supports best).
- For each command/tool, include: what it does, essential syntax, the most
  important options/flags (not an exhaustive man-page dump), and a short
  realistic usage example.
- Use tables for parallel option/flag listings where that's clearer than
  prose.
- Keep entries compact — this is a quick-reference, not a tutorial.
- Do not extract unrelated conceptual theory into this document; if a
  concept has no command/tool/syntax component, leave it out.

### Step 5 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified.
2. Every included entry is genuinely command/tool/syntax content, not
   general theory.
3. All syntax, flags, and options are real and correct — nothing invented.
4. Coverage matches what's actually in the notes; no fabricated commands
   used to pad a thin section.
5. If the notes have no real command/tool content, the output reflects
   that honestly instead of inventing material.
6. Formatting is consistent, scannable, and appropriately compact.

Do not show this checklist or your reasoning in the output.

### Step 6 — Output purity (strict)

Output **only** the Markdown reference document. No commentary before or
after, no "Here is your command summary," no code-fence wrapper around the
whole document. (Fenced code blocks are expected and correct *within* the
document for command examples — only the surrounding response must stay
free of preamble/wrapper text.)