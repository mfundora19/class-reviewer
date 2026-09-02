# Book/PDF → Obsidian Study Notes — Master Prompt (v2)

You are converting the uploaded book or PDF chapter into polished, detailed study notes for Obsidian.

Your response is the final `.md` document itself. Start immediately with the first Markdown heading required by the rules below. Do not say that you will analyze, rewrite, summarize, or create notes. Do not include a preface, a methodology, a changelog, a disclaimer, or text addressed to me outside the notes.

# Goal

Produce a better study version of the uploaded material: clear, accurate, logically organized, and easy to review. It must retain the source's important information while removing useless wording, repetition, vague introductions, and statements that do not help the reader learn or use the topic.

The target style is a concise but explanatory textbook chapter — not a skeletal outline and not an expanded essay. Explain what each important concept is, why it matters, and how it relates to the surrounding topic. Use direct language and short-to-medium paragraphs. Preserve useful technical vocabulary.

# Source fidelity and content

1. Follow the source's structure exactly: retain the same chapters, sections, subsections, and order. Convert a heading only to repair its Markdown level or make its wording clearer; never change what the section is about.
2. Keep every important definition, fact, condition, comparison, procedure, warning, limitation, port number, file path, command, configuration item, example, and exam-relevant point.
3. Rewrite rather than copy when doing so makes the content clearer or more compact. Never remove a detail merely because it is technical.
4. Remove filler, redundant restatements, empty historical framing, and generic statements such as "there have been many things in the past" unless they supply important context.
5. Keep meaningful history, dates, origins, and terminology when they clarify a concept or are likely to be tested.
6. Never invent details, citations, page numbers, commands, outputs, filenames, version behavior, or claims that are not known. If source material is unreadable, incomplete, contradictory, or probably wrong, preserve the usable content and flag the uncertainty with a `>[!missing]` callout.
7. Correct only obvious typos, broken formatting, character-encoding errors, and objectively clear mistakes. Do not silently alter debatable technical content.
8. Add outside context only when it is necessary to make the source understandable, correct, safe, or practically usable. Each added concept may contain **at most two sentences** and must be marked as `>[!info] Added context`. Do not add interesting but nonessential material.

# Document and heading structure (strict)

Heading levels are assigned by these rules, applied in order, with **no skipped levels** anywhere in the document:

1. **Chapter/document title — `#`.** Use `#` only if the source names an explicit chapter or document title. If the source's first real content is an objectives list, a numbered heading, or any heading that is not a title, do **not** invent a title — start the document directly at that heading's correct level (normally `##`).
2. **Objectives section — `##`, always first when the source has one.** Render each objective as its own bullet, in this exact form: `- **<objective code>**: <objective text>` (bold code, colon, then the objective text essentially verbatim from the source). Do not turn objectives into a table or a numbered list.
3. **Orientation/framing prose — no heading.** If the source has scene-setting paragraphs before the first true topical subsection (commonly right after the objectives list), keep them as plain paragraphs with no heading of their own. Do not invent an "Introduction" or "Overview" heading for this material.
4. **Major topic sections — `##`.** One `##` per major topic the source treats as a top-level division (e.g., a section title in the source's own table of contents).
5. **Subsections and command blocks — exactly one level deeper than their immediate parent heading, never more.**
   - If a command, utility, or directive is discussed directly under a `##` section, its heading is `###`.
   - If the source first groups several related commands/topics under a named subtopic (itself `###`), each individual command inside that subtopic is `####`.
   - Never jump from `##` straight to `####`. This rule overrides any visual habit of putting all commands at the same fixed level — the level is determined by nesting depth, not by convention.
6. **Command-heading naming.** Use ``### The `command` Command`` (or `####`, per rule 5) whenever the heading is about a single command-line utility, keeping the command itself in inline code — e.g. ``### The `grep` Command``. Apply this to every command discussed as its own subsection (`grep`, `sort`, `cut`, `sed`, `awk`, etc.), including full-screen editors, phrased as ``### The `<name>` Editor`` (e.g. ``### The `nano` Editor``, ``### The `vim` Editor``) for consistency with the command-heading pattern. Never use a bare heading such as ``### `sort` `` or `### nano editor`.
7. **Closing sections — `#`.** If the source includes closing material such as a chapter summary or an "Exam Essentials"–style review, render each as a top-level `#` heading (e.g. `# Summary`, `# Exam Essentials`), regardless of whether a `#` title exists elsewhere in the document. These sections are structurally equal in weight to the chapter itself, not subordinate to the body's `##` sections. Use the source's own name for these sections when it differs (e.g. "Chapter Review," "Key Takeaways").
8. Do not create additional top-level (`#`) sections beyond a chapter title (if present) and these closing sections.

# Writing and organization

- Write a short introductory explanation beneath a heading when it helps orient the learner, then use bullets, numbered steps, tables, code blocks, or diagrams where they make the information easier to learn.
- Use paragraphs for explanations and reasoning. Use bullets for features, components, examples, conditions, or short related facts. Use numbered lists only when order matters.
- Bold important terms on their first useful occurrence. Put commands, paths, flags, protocol names, package names, config directives, and values in inline code.
- Do not use a "Key takeaways" section unless the original chapter contains a summary, recap, or equivalent closing section (see rule 7 above). When it does, preserve it as a concise recap of the source.
- Do not add flashcards, questions, tags, or YAML/frontmatter unless the source includes them or I explicitly request them.

# Wiki-links (Obsidian `[[...]]`)

Use wiki-links narrowly and only in these two cases:

1. **Same-document cross-references** — link to another heading within the same note when it materially helps the reader jump to related content already covered here, using `[[#Heading Name]]`. Only link headings that actually exist in this document.
2. **Companion-note stubs** — when a topic is substantial enough that it would reasonably deserve its own separate Obsidian note (e.g., a full command reference already covered as its own note in this vault, or a natural companion topic like a dedicated guide), you may add a single forward-reference stub such as `* [*] Also check [[<Note Title>]]`. Use this sparingly — at most once or twice per chapter — and only for genuinely note-worthy companion topics, not for every command mentioned.

Do not add any other links (external URLs, index links, glossary links) unless the source includes them or I explicitly request them.

# Commands, code, and configuration

When a section discusses a command, command-line utility, package-management command, API command, configuration directive, or query, turn it into a practical reference. Do this even when the source mentions the command without explaining it.

For each distinct command or directive, include only the parts that are relevant:

1. A concise purpose statement.
2. The general syntax, in a correctly tagged fenced code block, captioned per the "Code block captions" rule below. Use descriptive placeholders such as `<host>`, `<file>`, and `<package>`.
3. A compact table of common, useful flags/options: `Option`, `Purpose`, and `Example use`. **For every flag or option included in the table, provide a concrete example showing exactly how that specific option is used with the command. Do not merely describe when the option is useful.**
4. At least one realistic example in a fenced code block, captioned per the rule below. Explain the expected effect in prose where useful.
5. Important prerequisites, permission requirements, destructive effects, platform differences, or version-specific behavior.

When a command block would be clearer with supporting information, add concise `#` comments explaining a command and/or a short, clearly labeled example of the output it could produce. This supporting information may be added even when it is not explicit in the source, but only when the command behavior is known and the addition is a safe, concise illustration. Treat it as supporting presentation rather than new conceptual material; any added concept remains subject to the `Added context` rule above. Add both only when they materially improve understanding, and keep them proportional to the example. Label illustrative output as example output and never present invented output, results, or version-specific behavior as a verified fact; omit it when the source or context does not support a safe example.

Do not pad every command with options that add no value. Do not guess flags or present fabricated output as actual command output. Clearly labeled illustrative output is allowed only under the concise, safely derived rule above. When correct syntax or behavior is uncertain, state that it must be verified for the installed version rather than inventing an answer.

Use this layout when a full command reference is appropriate (heading level per the "Document and heading structure" rules above):

### The `<command>` Command

Brief purpose statement.

##### General `<command>` Syntax

```bash
command [options] <required-argument> [optional-argument]
```

##### Common `<command>` Options

| Option            | Purpose               | Example use                    |
| ----------------- | --------------------- | ------------------------------ |
| `-x`, `--example` | What the option does. | `command --example value`      |

##### Example: Using `<command>`

```bash
# Briefly explain the command when useful.
command --example value

# Example output:
# concise illustrative output
```

# Code block captions (mandatory, deterministic)

Give **every** relevant fenced code block — command, configuration, output, and Mermaid — a `#####` caption immediately above it, with no exceptions. Choose the caption using this fixed mapping so the wording stays predictable across chapters:

- General syntax block → `##### General `<command>` Syntax`
- First example for a command → `##### Example: Using `<command>``
- Additional examples for the same command → `##### Example: <short, specific description of what this example does>` (never a bare "Example 2" — always describe the scenario)
- A worked multi-step walkthrough spanning several commands → `##### Example: <short description of the scenario>`
- Any other illustrative or supporting code block → derive a specific, descriptive title from its content or purpose; never leave a code block uncaptioned and never reuse a generic caption like "Example" alone.

# Tables, figures, diagrams, and questions

- Recreate source tables in clean Markdown.
- **Caption tables by their provenance:**
  - If the source book presents the table as one of its own numbered figures/tables, caption it `##### Table <chapter>.<number> | <caption>`, preserving the source's numbering.
  - If the table is constructed or reformatted by you from the source's running text (i.e., the source did not present it as a numbered table), caption it `##### Common `<command>` Options` (or an equally descriptive, non-numbered title such as `##### Summary of <topic> Operators`). Never invent a fake "Table N.M" number for a table that wasn't numbered in the source.
  - Every table gets a caption — do not leave any table uncaptioned.
- Use a table only for genuine comparison or reference; do not force explanatory prose into a table.
- Use Mermaid diagrams when appropriate and when a concept, process, workflow, relationship, hierarchy, or other structure would benefit from a visual representation. Use an Obsidian-compatible fenced code block with the `mermaid` language tag, captioned per the code-block-caption rule, and keep diagrams valid, compact, and clearly labeled. Do not add Mermaid unnecessarily, create visual noise, or use it for a simple list.
- Preserve source figures as a descriptive heading and convert their meaning into prose, a table, or Mermaid when possible. Do not pretend to reproduce an image you cannot access.
- Preserve review questions and answer choices. Keep indicated answers when they appear in the source; do not solve unanswered questions unless explicitly asked.

# Obsidian callouts and task symbols

Use callouts sparingly and only when they improve learning. Use this exact, Obsidian-compatible layout. The title is on the first line; the callout content starts on the next line. Keep a blank line before and after each callout.

```md
>[!note] Title
>Description
```

For multi-line content, prefix **every** content line with `>`:

```md
>[!warning] Security implication
>First point.
>
>Second point.
```

Choose callout types by meaning:

- `>[!note]` — key context, a definition, or an important relationship.
- `>[!info]` — helpful factual context. Use the title `Added context` for any information added beyond the source.
- `>[!tip]` — practical usage, memory aid, or exam tip.
- `>[!important]` — a central rule or must-remember idea.
- `>[!warning]`, `>[!caution]`, or `>[!danger]` — risk, security concern, destructive action, limitation, or common mistake.
- `>[!example]` — a concrete illustration or worked scenario.
- `>[!missing]` — unavailable, unreadable, contradictory, or unresolved source material.

Use supported task symbols only when they carry real study meaning, never as decoration:

- `- [i]` for a useful fact.
- `- [!]` for a must-remember point.
- `- [*]` for a high-value insight.
- `- [?]` for an unresolved detail that needs verification.
- `- [p]` for good practices, ideas or points.

# Final quality check

Before you answer, silently verify all of the following:

- The output contains only the finished Markdown notes.
- The source hierarchy and order are intact, and no heading level was skipped anywhere (rule: subsections are always exactly one level deeper than their parent — see "Document and heading structure").
- A `#` heading appears only for a genuine source title (if present) and for closing sections (Summary / Exam Essentials / equivalent) — nowhere else.
- The Objectives section, if present, is first, is `##`, and uses the `- **<code>**: <text>` bullet form.
- Any orientation prose before the first topical subsection has no invented heading.
- Every command/editor subsection uses the ``### The `<name>` Command`` / ``### The `<name>` Editor`` naming pattern at the correct nesting level.
- Every fenced code block (syntax, example, output, Mermaid) has a `#####` caption chosen per the fixed mapping — none are left uncaptioned.
- Every table has a `#####` caption; numbered "Table N.M" captions are used only for tables the source itself numbered, never invented.
- Commands include useful syntax, common options, and **a concrete usage example for every option included in the options table**, where relevant and where correct.
- Wiki-links, if any, are limited to same-document `[[#Heading]]` cross-references and occasional, genuinely warranted companion-note stubs — nothing else.
- The notes explain important ideas clearly without unnecessary expansion.
- No important technical detail, condition, warning, example, or exam objective was discarded.
- Every external addition is essential, marked `>[!info] Added context`, and limited to two sentences per added concept.
- Callouts use the exact `>[!type] Title` then `>Description` layout, with blank lines around them.
- Markdown tables, code fences, task symbols, and Mermaid diagrams are valid, purposeful, and mutually consistent.

Now return the finished Obsidian Markdown document for the uploaded source.
