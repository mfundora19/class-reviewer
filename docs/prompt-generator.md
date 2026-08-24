# AI Prompt Generator

Ready-to-use prompts for turning your own study notes into ReviewApp content
with an AI assistant. Each prompt is **copy-and-paste**: drop in your unit
notes and send it — the AI replies with a complete `.js` file.

## How to use

1. Copy one prompt below.
2. Replace the `PASTE YOUR UNIT NOTES HERE` placeholder with your full notes.
3. Send it to the AI.
4. Save the reply as a `.js` file under the matching folder, e.g.
   `certifications/linux-plus/questions/ch02-working-with-files.js`.
5. Add that path to `certifications/_manifest.js` → `files`.
6. Open ReviewApp and hit **Reload**.

---

## Flashcards

> You are generating CompTIA Linux+ flashcards for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "flashcards",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [ /* array of card objects */ ]
> });
> ```
>
> CARD SCHEMA (every item):
> ```js
> {
>   front: "Concise prompt / term / question (one line preferred)",
>   back: "Clear answer or short explanation (1–3 sentences max)",
>   tags: ["tag1", "tag2"]
> }
> ```
>
> CONTENT REQUIREMENTS:
> - Produce a minimum of 70 cards covering the entire unit notes below.
> - Create more flashcards if the content contains enough important information.
> - Prioritize complete coverage of the material over reaching a specific number.
> - Fronts should be short (term, command, “What does X do?”, “Symbol for …”).
> - Backs must be accurate and useful for active recall.
> - COMMAND OPTIONS — group a command's options into ONE flashcard per command whenever possible. Front: the command, with a short label (e.g. “ls — Important options”), so the command stays visible on the front. Back: the option → description relationships, one per line (e.g. “-a → show all entries”). If the full set cannot reasonably fit or read well on one card, split it into AT MOST TWO cards for that command, grouping related options logically (e.g. display options vs. sorting/recursive options). NEVER create one flashcard per option for a multi-option command. This grouping rule applies ONLY to command-option information; all other flashcards follow the normal rules above.
> - Prioritize: key commands, metacharacters, file-type symbols, ls options, regex vs shell wildcards, vi basics, FHS-related path facts from the notes.
> - Tags: short lowercase keywords (e.g. ls, wildcards, grep, vi, file-types).
> - No duplicates. No fluff. No placeholders.
> - Chapter title: invent a concise title that matches the notes.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Questions

> You are generating CompTIA Linux+ practice questions for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "questions",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [ /* array of question objects */ ]
> });
> ```
>
> QUESTION SCHEMA (every item must follow this):
> ```js
> {
>   q: "Clear, exam-style question text",
>   type: "mcq" | "multi" | "tf" | "fill" | "match" | "command_match",
>   options: ["A", "B", "C", "D", "E"],   // exactly 5 options for mcq and multi only
>   answer: <see below>,
>   accepts: ["alternate accepted answer", "ACR"],   // optional, fill only — extra legitimate equivalents
>   explain: "1–3 sentences explaining why the answer is correct and why common wrong answers fail",
>   tags: ["tag1", "tag2"]
> }
> ```
>
> QUESTION STEM STYLE (strict):
> - Every `q` must stand alone and ask the learning objective directly, as it would appear on an exam.
> - Never refer to the source material in the question stem. Do not write phrases such as “according to the notes,” “in the notes,” “based on the notes,” “from the notes,” or “as described/highlighted/mentioned/stated in the notes.”
> - Rewrite source-framed wording as a direct question: use “Which command…?”, “What does…?”, “How does…?”, or “Which statement…?” instead.
> - Keep source references, if genuinely useful, out of `q`; the answer and explanation should explain the concept itself rather than test whether it appeared in the supplied notes.
>
> ANSWER FORMATS:
> - mcq:   zero-based index (e.g. 0) — exactly 1 correct choice
> - multi: array of 1–4 zero-based indices (e.g. [0, 2]) — independently choose a varied, aleatory correct-choice count of 1, 2, 3, or 4 for each question; never choose 0 or all 5, and always leave at least one plausible distractor
> - tf:    true or false
> - fill:  string — matched case-insensitively with inner whitespace collapsed; a parenthetical acronym in the answer (e.g. "Certificate Authority (CA)") also accepts the full name alone and the acronym alone; put extra legitimate equivalents in the optional `accepts` array
> - match: no answer field — the pairs array IS the answer (see below)
> - command_match: legacy command/flag alias; use `match` for all newly generated matching questions
>
> ANSWER-CHOICE QUALITY / BALANCED ANSWER CHOICES (strict):
> - Treat every option set as a balanced set of answers: the correct answer must not systematically be the longest or shortest choice, and no option should carry a meaningful writing-style or formatting advantage.
> - Build the question around one precise learning objective and determine the factual answer before drafting the choices. Each `mcq` must have exactly one defensible correct interpretation; each `multi` must have exactly the choices listed in `answer` as correct.
> - Make every choice independently plausible: use common misconceptions, closely related concepts, similar terminology, or reasonable but incorrect interpretations. A distractor may be a real concept that does not answer this particular question, but it must not be random filler, an absurdity, a vague placeholder, or an obviously unrelated category.
> - Treat literal shell syntax and punctuation-only choices as visible answer text: wrap symbols such as `*`, `?`, `~`, `[ ]`, `{ }`, `()`, `|`, and `>>` in inline code backticks rather than leaving them as formatting-like Markdown punctuation.
> - Keep choices comparable in natural length, detail, specificity, grammar, tone, technical sophistication, sentence structure, formatting, and degree of certainty. Natural variation is good; do not force identical character counts or awkwardly pad an option.
> - **Balance the options, not the question stem:** question text should be as concise as the learning objective allows. Do not make every question long, add unnecessary scenario detail, or pad the stem or explanation just to make the choices feel balanced. The length check applies within one option set, not across questions; short, direct questions with short, similarly sized choices are preferred when appropriate.
> - **Do not make the correct answer the longest, most detailed, most qualified, most specific, or most technically worded choice. Do not make it the shortest choice either.** Distractors need enough detail to be credible, and necessary detail must not be removed from a distractor merely to make the correct answer stand out.
> - Never add an explanation, definition, example, parenthetical, expanded acronym, extra qualifier, second clause, or more polished wording only to the correct choice. If one option needs that context for accuracy, give comparable context to the other options or rewrite the item.
> - Avoid wording clues: do not copy a unique phrase from the question into only the correct choice; do not make the correct choice the only grammatical or grammatically complete sentence, definition, positive/negative statement, acronym expansion, parenthetical, example, or professionally phrased option. Paraphrase the question's key wording where reasonable and make all options read as if written by the same author.
> - After drafting the options, perform a **blind clue review** without looking at `answer`: compare word/character length, qualifiers, punctuation, sentence completeness, vocabulary, specificity, examples, parentheticals, acronym treatment, and formatting. Rewrite any choice that would let a learner identify the answer without knowing the subject. Then verify that exactly the intended choice or choices remain factually correct and that no distractor is ambiguous.
> - For `multi`, apply these rules to every option individually. Correct choices must not collectively be longer, more technical, more confident, or more polished than incorrect choices. With 1, 2, 3, or 4 correct choices, keep the remaining distractors equally credible; do not use a conspicuously weak single distractor when four choices are correct, and do not make four obviously wrong choices when one is correct.
> - Distribute authored correct-answer indices across the full set instead of repeatedly putting them first or last. Vary multi-answer position combinations as well as the number of correct choices; independently randomize which A–E positions hold the correct choices after deciding the count. Do not use a rigid A/B/C/D/E rotation, and do not select positions based on option length or wording. The application also shuffles choices at quiz time, but source order must not contain a visible pattern.
> - Apply the same balance to every matching counterpart (including legacy command-matching descriptions): use parallel, independently plausible text with comparable specificity and grammar, and do not make the correct pair the only one with extra context.
>
> MATCHING QUESTIONS (match):
> A matching question tests a coherent set of relationships in the notes. It pairs each **item** with one natural **counterpart**: a definition, meaning, purpose, description, function, behavior, characteristic, category, use case, syntax effect, example, or other clearly supported information. It counts as ONE question no matter how many pairs it contains, and the whole question is correct only when every pair is matched correctly.
>
> Before deciding whether to create a matching question, analyze the notes in this order:
> 1. Identify groups of related entities and look for their corresponding information.
> 2. Decide whether each entity has one clear counterpart supported by the notes.
> 3. Prefer a coherent group of parallel facts over a collection of unrelated facts.
> 4. Create the question only when there are enough high-quality pairs to make matching educationally useful; otherwise create no matching question.
> 5. Extract both sides from the supplied notes and verify every relationship before writing the question.
>
> Look for relationships wherever they appear — tables, bullets, prose, definitions, lists, examples, headings, and explanations. Do not require labels such as `COMMAND`, `FLAG`, or `MEANING`, and do not assume a particular note format.
>
> Matching may cover commands and flags, but that is only one example. Other possible note-supported relationships include symbols → meanings, file extensions → file types, terms → definitions, protocols → purposes, tools → primary uses, signals → actions, syntax → effects, permissions → meanings, concepts → examples, technologies → characteristics, or any other naturally pairable group. This list is illustrative, not an allowlist; discover the relationship from the notes rather than selecting from hard-coded categories.
>
> Do not mix unrelated facts merely because they can be paired. For example, a wildcard group is coherent, while combining a wildcard, a protocol, a permission command, and a programming language is not. Do not invent a counterpart, fill gaps from outside knowledge, or turn a weak association into a pair. It is better to omit matching than to force an artificial or ambiguous question.
>
> Schema (in addition to q and explain):
> ```js
> {
>   q: "Match each Linux system component with its role.",
>   type: "match",
>   context: "Optional concise label for the related group",
>   pairs: [
>     { item: "Linux kernel", match: "Interfaces software with hardware" },
>     { item: "GNU utilities", match: "Provide command-line management programs" },
>     { item: "User interface", match: "Provides a graphical desktop or command-line shell" }
>   ],
>   explain: "Each pair connects a component named in the notes with its stated role.",
>   tags: ["linux-concepts", "components"]
> }
> ```
>
> Rules for `match`:
> - `pairs` must contain at least 2 meaningful pairs; usually prefer 3–6 parallel pairs when the notes support them. The two sides of every pair must be non-empty and unique within the question.
> - Use `item` for the entity or notation being tested and `match` for its counterpart. Do not add an `answer` field; the `pairs` array is the answer.
> - `context` is optional and should identify the group without revealing the pairings. Omit it when a label would make the question more obvious or is not supported by the notes.
> - Use only relationships supported by the supplied notes. Preserve the notes' intended scope and terminology; do not silently import facts from general knowledge to complete a set.
> - Make the items comparable in kind and the counterparts parallel in grammar, length, specificity, and technical detail. Avoid copied wording that makes one pairing obvious, answer text that appears inside its item, or a counterpart that is the only complete sentence.
> - Shuffle is handled by the application, but the source pairs must still form a clear, non-redundant educational group. Do not use matching for a single fact that belongs in an `mcq`, `fill`, or flashcard.
> - If no coherent candidate group meets these rules, do not generate a `match` question just to meet a quota.
>
> `command_match` compatibility:
> - Existing files may use `type: "command_match"`, `command`, and `{ option, description }` pairs. Keep that legacy shape valid when encountered, but do not limit new matching questions to commands and flags; use the generic `match` schema for new output.
>
> CONTENT REQUIREMENTS:
> - Produce a minimum of 70 questions covering the entire unit notes below.
> - Create more questions if the content contains enough important information.
> - Prioritize complete coverage of the material over reaching a specific number.
> - Mix types: roughly 40% mcq, 20% multi, 10% tf, 15% fill, and 15% match; include `match` questions when the notes contain strong coherent groups, but never force them or inflate the question count to add one.
> - Present EXACTLY 5 options for every mcq and multi question (no more, no fewer).
> - VARY THE NUMBER OF CORRECT ANSWERS in multi questions. For each question, randomly/aleatorily select the correct-choice count from 1, 2, 3, or 4 before drafting the options, then create exactly that many factually correct choices and the remaining incorrect choices. Never use 0 or 5 correct choices. Never default to 3, never give every multi question the same count, and never hardcode a repeating sequence; across a set, the count should be naturally unpredictable (e.g. 1 / 4 / 2 / 3 / 2 / 1 / 4).
> - Choose the correct-answer count that fits the question: one correct choice when only one answer is right, more when several distinct choices legitimately qualify (e.g. selecting multiple commands, options, or true statements). Do not add fake correct answers to reach a target count, do not pad with choices that are duplicates or near-duplicates, and do not write questions where it is unclear which choices should be correct.
> - Every multi question must include at least one plausible but incorrect distractor, at least one correct option, and the `answer` array must exactly match the correct options. Never use an answer array containing all five option indices, even when several choices are related. Reject/regenerate the item if semantic review finds zero or five correct options.
> - Before finalizing every `mcq` or `multi`, run the blind clue review in **ANSWER-CHOICE QUALITY** and revise any option that is conspicuously longer, shorter, more detailed, more technical, more qualified, more complete, or more polished than the others. Do not solve a length problem by degrading the correct answer; strengthen the distractors instead.
> - For `fill` answers, put the canonical answer in `answer` — answers are matched case-insensitively with whitespace collapsed, so do not rely on case or spacing to distinguish answers. When the answer has a standard acronym, write it in parentheses after the full name (e.g. `"Certificate Authority (CA)"`); the engine then accepts the full name, the acronym, and the parenthesized form. List any other genuinely equivalent forms (common synonyms, alternate spellings, full names of acronyms such as LAMP → `"Linux Apache MySQL PHP"`) in the optional `accepts` array. Never invent aliases, never add partial words or vague statements to `accepts`, and never treat substrings of the answer as valid — every accepted form must be a real, unambiguous equivalent of the canonical answer.
> - Questions must be technically accurate for CompTIA Linux+.
> - Prefer application and discrimination over pure recall (e.g. “which command…”, “what does this output mean…”, “given this scenario…”).
> - Cover the most important objectives and command tables in the notes.
> - Tags should be short lowercase keywords drawn from the topic (e.g. paths, wildcards, grep, vi, ls, regex).
> - No lorem ipsum. No placeholder text. No “TODO”.
> - Chapter title: invent a concise title that matches the notes (e.g. “Ch 02 · Working with Files”).
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Labs

> You are generating a CompTIA Linux+ hands-on lab for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "labs",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [
>     {
>       title: "Descriptive lab title",
>       difficulty: 1 | 2 | 3,
>       minutes: <number>,
>       scenario: "Markdown paragraph(s) setting context and goal",
>       objectives: ["Observable skill 1", "Observable skill 2", "..."],
>       mockData: [ // OPTIONAL — only when the learner consumes/analyzes pre-existing sample data
>         {
>           name: "Short human-readable label",
>           filename: "auth.log", // optional; the intended filename when the data is a file
>           description: "One line on what this data is and how to use it",
>           content: "Exact multiline sample content the learner copies; preserve every line break and whitespace character"
>         }
>       ],
>       steps: [
>         {
>           do: "What the student should do (clear instruction)",
>           command: "Internal exact command metadata for the step (required for command-based steps; never rendered in the learner UI; omit for non-command/manual steps)",
>           hint: "Specific conceptual guidance that points toward the approach without revealing the answer",
>           solution: "Exact command(s) or actions that solve the step (copy-pasteable)",
>           expectedOutput: "Concrete representative example of the output the learner should see in the View output modal; preserve line breaks and whitespace",
>           expectedOutputDynamic: false, // optional; set true when values or formatting vary by system/run
>           check: "One concise, single-line statement of what the learner should expect to see"
>         }
>       ],
>       tags: ["tag1", "tag2"]
>     }
>   ]
> });
> ```
>
> CONTENT REQUIREMENTS:
> - **Chapter count rule:** Chapter 1 has no mandatory five-lab minimum. Create only the number of meaningful, hands-on labs that its actual material supports; fewer than five is correct when five would require filler. Every chapter numbered 2 or later must contain at least five meaningful labs, with more when the chapter has substantially different lab-friendly material.
> - Before writing labs, inspect the chapter notes, existing labs, and the commands/concepts already taught. Review existing labs for gaps, weak validation, premature concepts, duplicate learning goals, and activities that are only research or theory; improve good labs rather than replacing them without reason.
> - Build broad chapter coverage. Every important lab-friendly concept should appear in at least one lab, and the collection should progress from foundational practice through integrated, chapter-faithful investigation. Never inflate the count with filler or repetitive exercises.
> - **Hands-on requirement:** every lab must require meaningful work on the computer and produce an observable result, such as running commands, creating or changing local artifacts, navigating, inspecting files or services, searching data, comparing output, or validating a concrete state. A lab whose primary activity is explaining, defining, researching, reading documentation, or answering theory questions is not valid.
> - Research may support a lab, but it cannot be the lab. For theory-only topics such as licensing, use a concrete local artifact and taught command workflow only when the chapter provides enough material to do so; otherwise keep the topic in notes, flashcards, or questions rather than inventing a research assignment.
> - Never require a command, option, syntax construct, tool, workflow, or concept that the learner has not already been taught in this chapter or is guaranteed to know at this point. Cybersecurity context may change the scenario and evidence, but it must not expand the technical scope.
> - Reusing a command or tool is allowed when the learning objective is different. Do not create multiple labs whose primary goal is essentially the same search, inspection, or configuration exercise.
> - Favor integrated labs that combine related chapter skills without becoming confusing. Use realistic light-to-moderate cybersecurity scenarios such as triage, artifact review, service exposure, evidence organization, or configuration review.
> - Every lab must be executable in sequence from its own setup. Keep paths, filenames, solutions, expected output, dynamic-output markers, and checks internally consistent and safe to run in a temporary, reversible workspace whenever possible.
> - `difficulty`: 1 = guided intro, 2 = intermediate, 3 = multi-skill/capstone. Assign it from the actual reasoning and integration required.
> - `minutes`: use an honest estimate; 15–40 is typical, with longer times only when the chapter content and workflow justify them.
> - 4–7 steps that build on each other and exercise the commands/concepts in the notes.
> - Scenario should feel realistic (junior sysadmin task, troubleshooting, exploration).
> - Solutions must be real Linux commands that work on a standard distro.
> - For every command-based step, include the exact command in the internal `command` field and a concrete representative result in `expectedOutput`; do not make the frontend infer output from `solution`. The `command` field is metadata for validation/content tooling, not learner-facing text.
> - Treat `expectedOutput` as the example the learner should see after selecting **View output**. Use realistic mock values even when the real result varies: write `Local Address:Port 192.0.2.10:119`, not `<port>` or another placeholder. Set `expectedOutputDynamic: true` when values or formatting can vary, but still provide concrete example values and use the one-line `check` to state what may vary.
> - For deterministic output, use the actual result when it is stable. For variable output, use a short, meaningful representative sample rather than a generic description, a truncation marker, or a fabricated success message.
> - If a command legitimately produces no output, set `expectedOutput` to `(no output)` rather than inventing a success message.
> - Preserve output line breaks, indentation, whitespace, symbols, and special characters in `expectedOutput`; multiline examples belong in the View output modal and must remain complete and unmodified.
> - `check` is the learner-facing Verify text. It must be one concise line describing what the learner should expect to see, not a procedure, command, multi-step instruction, or second output block. Do not repeat exact command syntax in `do`, `hint`, or `check`; the complete command belongs only in `solution` and the internal `command` metadata.
> - Non-command/manual steps may omit `command`, but should still provide `expectedOutput` when there is a meaningful observable result.
> - Cover the most lab-friendly parts of the notes (navigation, ls options, wildcards, viewing files, grep, basic vi).
> - Tags: short lowercase keywords.
> - Chapter title: invent a concise title that matches the notes.
> - Do not use placeholders or “TODO” in titles, scenarios, instructions, hints, solutions, checks, or other prose. In `expectedOutput`, never use angle-bracket placeholders, unresolved variables, or truncation markers; use concrete representative mock data instead. Literal symbols that are part of real command output are allowed. Use `expectedOutputDynamic: true` to mark variability, not to justify placeholder text.
>
> MOCK DATA RULES (strict — `mockData` is OPTIONAL at the lab level):
> - **Purpose:** `mockData` provides sample/test data the learner **consumes** (copies into a file, inspects, searches, or analyzes). It exists so the learner can focus on the lab's core skills without typing data that is only supporting material.
> - **Only add mockData when the learner consumes/analyzes pre-existing data** such as logs, configuration files, or records. Do not add mockData when creating the file or its content is itself a learning objective (e.g., the lab is teaching redirection, `touch`, or file creation).
> - **Before adding mockData, answer two questions internally:** ① "Is the learner supposed to create this data, or consume/analyze it?" ② "Would providing it remove a meaningful learning objective?" Only add mockData when the learner should consume it AND the core skill remains intact.
> - **MockData is never required** for a lab. If every file the learner works with is created through taught commands as part of the objectives, omit `mockData` entirely.
> - Each logical file or data unit is a separate item in the `mockData` array, with its own `filename`, `name`, `description`, and `content`.
> - `content` must be the exact payload the learner expects to see in the file — realistic, complete, self-contained, and matching the scenario, commands, and expected outputs (line numbers, patterns, filenames). Use literal newlines; never use `<placeholder>`, `TODO`, or truncation markers.
> - `filename` is **optional**. When the data represents a file, include it so the learner knows what to name it. Omit `filename` only when the data is generic terminal input not meant to be saved as a distinct file.
> - `description` should state in one line what the data is and how it relates to the steps.
> - Never introduce commands, concepts, flags, tools, or techniques outside the chapter through mockData content.
> - If the learner is supposed to practice creating the file (redirection with `>`, `printf`, `touch`, etc.), the creation step stays in the lab and uses the mockData content as its payload — the skill is still practiced, but the learner copies exact content instead of retyping error-prone log lines or configuration values.
>
> HINT / REVEAL ANSWER RULES (strict):
> - `hint` and `solution` have different responsibilities. The hint is guidance; the solution is the answer exposed by **Reveal Answer** (the app may label this **Reveal Solution**).
> - A hint should help the student reason about the current step by pointing toward the relevant concept, action, observation, relationship, or direction. Make it specific enough to reduce difficulty slightly and encourage investigation or experimentation.
> - A hint must stop short of solving the step. It must never state or closely paraphrase the required command, code, configuration, parameter, value, final action, required sequence, expected output, or result.
> - Do not put the exact answer in a hint using a different format, wording, placeholder, example, partial command, flag, path, filename, value, or sequence of actions. A hint must provide direction, not completion.
> - Do not give a complete procedure that makes the step mechanically solvable. Describe what to look for or how to reason, not every action to perform.
> - If mentioning a tool or technique is useful, describe its purpose or capability rather than naming the exact tool, option, argument, path, or syntax the student is expected to discover.
> - **Reveal Answer** is the only place allowed to provide the complete solution: the exact command, code, configuration, value, required action sequence, and explanation. `expectedOutput` is separate Verify metadata; the Verify row's output button opens it in a modal, but it must never replace `solution` or put solution steps in `hint`.
> - Before finalizing each step, compare its hint with its solution and remove any detail that would make Reveal Answer redundant. When in doubt, make the hint less specific rather than more revealing.
>
> VERIFY / EXPECTED OUTPUT RULES (strict):
> - Render exactly one compact `Verify` row at the bottom of each step. Do not render a separate `Expected Output` section, an inline output block, or a second Verify heading.
> - The Verify text (`check`) must be one concise line describing the expected result. The row should not contain a second explanation or a multiline output preview.
> - Keep `command`, `expectedOutput`, and `check` separate in the data model: `command` is internal metadata, `expectedOutput` is the concrete example opened by the modal, and `check` is the one-line learner-facing expectation.
> - Never render the `command` field in the learner UI. Do not repeat exact command syntax in `do`, `hint`, or `check`; the exact command may appear only in `solution`, which is shown through **Reveal solution**.
> - When a meaningful `expectedOutput` exists, place a compact **View output** button at the far right of the same Verify row. The button opens a modal containing the example output; multiline output must not expand inline.
> - The modal must contain the complete, unmodified example output, preserving line breaks, indentation, whitespace, symbols, and special characters. Never truncate the stored output to make it fit.
> - If the command legitimately produces no output, use `(no output)` and do not add an output button for it.
> - For dynamic output, use concrete mock values in `expectedOutput` and set `expectedOutputDynamic: true`; explain the variable portion or environment-dependent condition in the one-line `check`. Never use `<port>`, `<pid>`, `<value>`, or similar placeholders in the modal example.
> - Keep output data safe to render: it is plain text, not HTML, and must preserve formatting without executing embedded content.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Notes

> You are generating a compact study note for the offline ReviewApp tool (CompTIA Linux+).
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "notes",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [
>     {
>       title: "Clear note title",
>       body: "Markdown body (see allowed syntax below)",
>       tags: ["tag1", "tag2"]
>     }
>   ]
> });
> ```
>
> ALLOWED MARKDOWN in body:
> - Headings: # ## ###
> - Bold **text**, italic *text*
> - Inline code `like this`
> - Fenced code blocks ``` ... ```
> - Unordered lists (- or *) and ordered lists (1.)
> - Links [label](https://...)
> - Horizontal rules ---
>
> CONTENT REQUIREMENTS:
> - Produce 1 (or at most 2) dense, exam-oriented note(s) that reorganize the unit notes below into a clean reference.
> - Prefer tables and short command lists over long prose.
> - Include: key path concepts, file types + ls -F symbols, important ls options, wildcards vs regex, cat/head/tail/less, grep options, vi open/modes if present.
> - Keep it scannable — someone should be able to review in 5–8 minutes.
> - Tags: short lowercase keywords.
> - Chapter title: invent a concise title that matches the notes.
> - No fluff, no placeholders, no “TODO”.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Command Summary

> You are an expert technical documentation assistant specialized in Linux, networking, cybersecurity, and IT certifications (Linux+, Network+, Security+, etc.).
>
> I will provide you with raw study notes. Your job is to extract ONLY the commands, tools, utilities, protocols, and CLI syntax examples from my notes.
>
> Ignore:
> - General explanations
> - Theory paragraphs
> - Stories/examples that do not contain commands
> - Memorization tips
> - Exam objectives without commands
>
> For every command or tool you find, create a structured Markdown (.md) reference table.
>
> The table must contain these columns:
>
> | Command | Description | Options/Flags | Usage Example |
>
> Requirements:
>
> 1. Command:
> - Write the exact command name or syntax.
> - Include important syntax patterns if relevant.
> - Keep commands separated if multiple commands appear.
>
> 2. Description:
> - Give a short but accurate explanation of what the command does.
> - Explain its purpose in a Linux/networking/security administration context.
>
> 3. Options/Flags:
> - List the most important options, flags, switches, and arguments.
> - Format them clearly.
> - Include the purpose of each option.
> - If the command has no meaningful options, write "N/A".
>
> Example format:
> - `-a` → show all entries
> - `-n` → do not resolve hostnames
> - `-v` → verbose output
>
> 4. Usage Example:
> - Provide a realistic command example.
> - Include placeholders when needed.
> - Explain what the example accomplishes.
>
> Example:
> `grep -i "error" /var/log/syslog`
> → Searches the syslog file for "error" without case sensitivity.
>
> 5. Missing Information:
> If my notes mention a command but do not provide enough details:
> - Use your existing knowledge to complete the missing description, options, and examples.
> - Do not leave incomplete entries.
> - If you are unsure, clearly mark the information as "Verify".
>
> 6. Accuracy:
> - Prefer official Linux man-page behavior and commonly accepted industry usage.
> - Do not invent flags or syntax.
> - If a command differs between distributions (Ubuntu, Debian, RHEL, Fedora, etc.), mention the difference briefly.
>
> 7. Organization:
> Organize the final Markdown file by category when possible:
>
> ```text
> ## File Management Commands
> ## Networking Commands
> ## Process Management Commands
> ## User and Permission Commands
> ## Disk and Storage Commands
> ## Security Commands
> ## Package Management Commands
> ## Troubleshooting Commands
> ## Other Commands
> ```
>
> 8. Output Rules:
> - Output ONLY Markdown.
> - Do not include explanations before or after the table.
> - Do not summarize the notes.
> - Do not include non-command information.
> - Make the final output ready to save as a `.md` file.
>
> Here are my notes:
>
> [PASTE YOUR UNIT NOTES HERE]
