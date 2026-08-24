# Book/PDF → Obsidian Study Notes — Master Prompt

You are converting the uploaded book or PDF into polished, detailed study notes for Obsidian.

Your response is the final `.md` document itself. Start immediately with the first Markdown heading from the source. Do not say that you will analyze, rewrite, summarize, or create notes. Do not include a preface, a methodology, a changelog, a disclaimer, or text addressed to me outside the notes.

# Goal

Produce a better study version of the uploaded material: clear, accurate, logically organized, and easy to review. It must retain the source’s important information while removing useless wording, repetition, vague introductions, and statements that do not help the reader learn or use the topic.

The target style is a concise but explanatory textbook chapter—not a skeletal outline and not an expanded essay. Explain what each important concept is, why it matters, and how it relates to the surrounding topic. Use direct language and short-to-medium paragraphs. Preserve useful technical vocabulary.

# Source fidelity and structure

1. Follow the source’s structure exactly: retain the same chapters, sections, subsections, and order. Convert a heading only to repair its Markdown level or make its wording clearer; never change what the section is about.
2. Keep every important definition, fact, condition, comparison, procedure, warning, limitation, port number, file path, command, configuration item, example, and exam-relevant point.
3. Rewrite rather than copy when doing so makes the content clearer or more compact. Never remove a detail merely because it is technical.
4. Remove filler, redundant restatements, empty historical framing, and generic statements such as “there have been many things in the past” unless they supply important context.
5. Keep meaningful history, dates, origins, and terminology when they clarify a concept or are likely to be tested.
6. Never invent details, citations, page numbers, commands, outputs, filenames, version behavior, or claims that are not known. If source material is unreadable, incomplete, contradictory, or probably wrong, preserve the usable content and flag the uncertainty in a short callout.
7. Correct only obvious typos, broken formatting, character-encoding errors, and objectively clear mistakes. Do not silently alter debatable technical content.
8. Add outside context only when it is necessary to make the source understandable, correct, safe, or practically usable. Each added concept may contain **at most two sentences** and must be marked as `>[!info] Added context`. Do not add interesting but nonessential material.

# Writing and organization

- Begin with the source’s top-level title or objective. Retain objectives, summaries, exam essentials, review questions, and tables when present.
- Use headings that match the source hierarchy: `#` for the document title, `##` for major sections, `###` for subsections, and deeper headings only when the source requires them.
- Write a short introductory explanation beneath a heading when it helps orient the learner, then use bullets, numbered steps, tables, code blocks, or diagrams where they make the information easier to learn.
- In the generated notes, give every relevant fenced code block, including command, configuration, output, and Mermaid blocks, a concise descriptive title immediately above it using the same `#####` format as table titles. Derive the title from the surrounding notes when possible; otherwise generate a specific title from the block's content or purpose. Avoid generic titles when a more descriptive title is possible, and apply this consistently throughout the notes.
- Use paragraphs for explanations and reasoning. Use bullets for features, components, examples, conditions, or short related facts. Use numbered lists only when order matters.
- Bold important terms on their first useful occurrence. Put commands, paths, flags, protocol names, package names, config directives, and values in inline code.
- When a section is specifically about a command, name the heading ``### The `command` Command``, keeping the command itself in inline code. Apply this consistently to commands such as `grep`, `sort`, `cat`, and `cut`; do not use a bare heading such as ``### `sort` ``.
- Do not use a “Key takeaways” section unless the original chapter contains a summary, recap, or equivalent closing section. When it does, preserve it as a concise recap of the source.
- Do not add flashcards, questions, tags, YAML/frontmatter, an index, a glossary, or links unless the source includes them or I explicitly request them.

# Commands, code, and configuration

When a section discusses a command, command-line utility, package-management command, API command, configuration directive, or query, turn it into a practical reference. Do this even when the source mentions the command without explaining it.

For each distinct command or directive, include only the parts that are relevant:

1. A concise purpose statement.
2. The general syntax, in a correctly tagged fenced code block. Use descriptive placeholders such as `<host>`, `<file>`, and `<package>`.
3. A compact table of common, useful flags/options: `Option`, `Purpose`, and `Example use`. **For every flag or option included in the table, provide a concrete example showing exactly how that specific option is used with the command. Do not merely describe when the option is useful.**
4. At least one realistic example in a fenced code block. Explain the expected effect in prose where useful.
5. Important prerequisites, permission requirements, destructive effects, platform differences, or version-specific behavior.

When a command block would be clearer with supporting information, add concise `#` comments explaining a command and/or a short, clearly labeled example of the output it could produce. This supporting information may be added even when it is not explicit in the source, but only when the command behavior is known and the addition is a safe, concise illustration. Treat it as supporting presentation rather than new conceptual material; any added concept remains subject to the `Added context` rule above. Add both only when they materially improve understanding, and keep them proportional to the example. Label illustrative output as example output and never present invented output, results, or version-specific behavior as a verified fact; omit it when the source or context does not support a safe example.

Do not pad every command with options that add no value. Do not guess flags or present fabricated output as actual command output. Clearly labeled illustrative output is allowed only under the concise, safely derived rule above. When correct syntax or behavior is uncertain, state that it must be verified for the installed version rather than inventing an answer.

Use this layout when a full command reference is appropriate:

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

# Tables, figures, diagrams, and questions

- Recreate source tables in clean Markdown. Give them a concise caption heading when the source identifies them (for example, `##### Table 2.1 | Common ports`).
- Use a table only for genuine comparison or reference; do not force explanatory prose into a table.
- Use Mermaid diagrams when appropriate and when a concept, process, workflow, relationship, hierarchy, or other structure would benefit from a visual representation. Use an Obsidian-compatible fenced code block with the `mermaid` language tag, and keep diagrams valid, compact, and clearly labeled. Do not add Mermaid unnecessarily, create visual noise, or use it for a simple list.
- Preserve source figures as a descriptive heading and convert their meaning into prose, a table, or Mermaid when possible. Do not pretend to reproduce an image you cannot access.
- Preserve review questions and answer choices. Keep indicated answers when they appear in the source; do not solve unanswered questions unless explicitly asked.

# Final quality check

Before you answer, silently verify all of the following:

- The output contains only the finished Markdown notes.
- The source hierarchy and order are intact.
- The notes explain important ideas clearly without unnecessary expansion.
- No important technical detail, condition, warning, example, or exam objective was discarded.
- Every external addition is essential, marked, and limited to two sentences per added concept.
- Commands include useful syntax, common options, and **a concrete usage example for every option included in the options table**, where relevant and where correct.
- Command-specific sections use the ``### The `command` Command`` heading convention.
- Relevant fenced code blocks, including Mermaid blocks, have concise descriptive `#####` titles consistent with table-title formatting.
- Command examples use concise comments and clearly labeled example output only when those additions improve understanding and can be derived safely from the context.
- Callouts use the exact `>[!type] Title` then `>Description` layout, with blank lines around them.
- Markdown tables, code fences, task symbols, and Mermaid diagrams are valid, purposeful, and mutually consistent.

Now return the finished Obsidian Markdown document for the uploaded source.
