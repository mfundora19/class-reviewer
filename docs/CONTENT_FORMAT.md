# ReviewApp Content Format

This document describes the schemas used by the content currently shipped in ReviewApp. Linux+ content is stored as classic JavaScript files that self-register via `window.ReviewApp.content.register(...)`; JSON is supported only when using Settings → Deep-scan folder. The checked-in Linux+ files are not JSON files.

---

## Manifest (`certifications/_manifest.js`)

```js
window.ReviewApp.content.setManifest({
  certs: [
    { id: "linux-plus", name: "CompTIA Linux+", color: "#ffb454" },
    { id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" }
  ],
  files: [
    "linux-plus/questions/ch01-filesystem.js",
    "linux-plus/flashcards/ch01-filesystem.js",
    "linux-plus/labs/ch03-permissions.js",
    "linux-plus/notes/ch01-notes.js",
    "network-plus/questions/ch01-networking-fundamentals.js"
  ]
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `certs` | array | yes | List of certification objects |
| `certs[].id` | string | yes | Stable ID used in content files |
| `certs[].name` | string | yes | Display name |
| `certs[].color` | string | no | Hex accent color for UI |
| `files` | array of strings | yes | Paths relative to `certifications/` |

When you add a new content file, append its path to `files` and click **Reload** in the app (or use Settings → Reload).

---

## Questions

```js
window.ReviewApp.content.register({
  type: "questions",
  cert: "linux-plus",
  chapter: "Ch 01 · Filesystem Hierarchy",
  items: [
    {
      q: "Which directory contains regular users' home folders?",
      type: "mcq",
      options: ["/home", "/etc", "/var", "/boot"],
      answer: 0,
      explain: "/home holds user directories; /root is the superuser's home.",
      tags: ["filesystem", "paths"]
    }
  ]
});
```

### Top-level fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"questions"` | yes | Content type |
| `cert` | string | yes | Must match a `certs[].id` in the manifest |
| `chapter` | string | yes | Chapter label shown in UI |
| `items` | array | yes | Question objects |

### Item fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `q` | string | yes | Question text |
| `type` | `"mcq"` \| `"multi"` \| `"tf"` \| `"fill"` \| `"match"` \| `"command_match"` | yes | Question format; `command_match` is retained for legacy content |
| `options` | string[] | mcq/multi | Answer choices |
| `answer` | number \| number[] \| boolean \| string | yes (except `match`/`command_match`) | Correct answer (see below) |
| `accepts` | string[] | no | fill only — extra equally-valid forms (acronyms, synonyms, spellings) accepted alongside `answer` |
| `context` | string | no | Optional label for the coherent group being matched (`match` only) |
| `command` | string | command_match | Legacy command context for existing command/flag matching questions |
| `pairs` | array | match/command_match | Item/counterpart pairs (see below) |
| `explain` | string | recommended | Shown after answering |
| `tags` | string[] | no | Used for theme attack & stats |

### Answer formats by type

| Type | `answer` value |
|------|----------------|
| `mcq` | Zero-based index into `options` (e.g. `0`) |
| `multi` | Array of 1–4 zero-based indices (e.g. `[0, 2]`); the correct-choice count should vary across questions and never default to 3 |
| `tf` | `true` or `false` |
| `fill` | String; matched case-insensitively with inner whitespace collapsed. An answer written as `"Full Name (ACR)"` also accepts `"Full Name"` alone and `"ACR"` alone. Extra legitimate equivalents go in `accepts` |
| `match` | No `answer` field — the correct matching **is** the `pairs` array |
| `command_match` | No `answer` field — legacy command matching; the correct matching **is** the `pairs` array |

### Choice-authoring guidance

The AI prompt generator emits exactly five options for every `mcq` and `multi` question. Legacy content may contain four or another supported option count, but every option must be non-empty, distinct, and plausible; `answer` must point only to valid options. The generator's balance review requires choices to be comparable in length, detail, specificity, grammar, tone, and technical sophistication, without making the correct choice the longest, shortest, most qualified, or only fully explained option. Distractors should represent realistic misconceptions or closely related concepts rather than random filler. This balance applies within one option set, not to the question stem: question text should remain as concise as the objective allows, and short questions with short, similarly sized choices are valid and encouraged when appropriate.

The quiz engine shuffles `mcq` and `multi` options before displaying them and remaps the stored answer index, so the authored index is not a fixed learner-facing A/B/C/D position. Authors should still vary source answer indices and multi-answer combinations because source files, exports, and review workflows can expose authored order. Use natural variation rather than a rigid position rotation or exact character counts.

### Matching questions (`match`)

A matching question pairs each item with one supported counterpart from a coherent group in the notes. The counterpart can be a definition, meaning, purpose, function, behavior, characteristic, category, use case, syntax effect, example, or another natural relationship. The optional context is shown above the pairs; items and counterparts are shuffled in the quiz UI.

```js
{
  q: "Match each Linux system component with its role.",
  type: "match",
  context: "Linux system components",
  pairs: [
    { item: "Linux kernel", match: "Interfaces software with hardware" },
    { item: "GNU utilities", match: "Provide command-line management programs" },
    { item: "User interface", match: "Provides a graphical desktop or command-line shell" }
  ],
  explain: "Each pair connects a component named in the notes with its stated role.",
  tags: ["linux-concepts", "components"]
}
```

- `pairs` (required): at least two `{ item, match }` objects. Both sides must be non-empty and unique within the question. The engine drops malformed or duplicate pairs; fewer than two valid pairs make the question unavailable instead of crashing.
- `context` (optional): a concise group label that does not reveal the answers.
- A `match` question counts as **one** question for scoring and statistics, no matter how many pairs it contains.
- The whole question is correct only if **every** item is matched to its counterpart (same all-or-nothing rule as `multi`).
- Use matching only for coherent, parallel groups supported by the notes. Do not combine unrelated facts or invent missing relationships.

### Legacy command matching (`command_match`)

Existing content may use the older command-specific shape. It remains supported for compatibility, but new generated content should use generic `match` unless preserving an existing file:

```js
{
  q: "Match the ls options with their descriptions.",
  type: "command_match",
  command: "ls",
  pairs: [
    { option: "-a", description: "Show hidden files" },
    { option: "-l", description: "Use long listing format" },
    { option: "-h", description: "Show human-readable sizes" }
  ],
  explain: "These options modify how ls displays directory contents.",
  tags: ["ls", "options"]
}
```

- `command` is required for the legacy type, and each pair must have unique `option` and `description` strings.
- The runtime normalizes legacy `{ option, description }` pairs to the generic matching model internally.

---

## Flashcards

```js
window.ReviewApp.content.register({
  type: "flashcards",
  cert: "linux-plus",
  chapter: "Ch 01 · Filesystem Hierarchy",
  items: [
    {
      front: "What does the FHS stand for?",
      back: "Filesystem Hierarchy Standard — …",
      tags: ["fhs", "filesystem"]
    }
  ]
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `front` | string | yes | Prompt side |
| `back` | string | yes | Answer side |
| `tags` | string[] | no | Filtering & search |

Leitner state (box 1–5, due dates) is stored in the local IndexedDB database and is independent of the content file.

---

## Labs

```js
window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 03 · Permissions",
  items: [
    {
      title: "File Permissions & Ownership Lab",
      difficulty: 2,
      minutes: 25,
      scenario: "Markdown description of the scenario…",
      objectives: [
        "Create a directory and set its owner and group",
        "Apply correct mode bits"
      ],
      // Optional: step indices per objective. Omitted → objective i ↔ step i.
      objectiveSteps: [[0], [1]],
      steps: [
        {
          do: "Create the project directory…",
          hint: "Use mkdir and touch.",
          solution: "sudo mkdir -p /srv/project",
          check: "ls -ld /srv/project shows the directory exists."
        }
      ],
      tags: ["permissions", "chmod"]
    }
  ]
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Lab title |
| `difficulty` | 1–3 | no | Shown as star chips |
| `minutes` | number | no | Estimated time |
| `scenario` | string (markdown) | yes | Context / story |
| `objectives` | string[] | no | Checklist items |
| `objectiveSteps` | (number\|number[])[] | no | Which step indices satisfy each objective (parallel to `objectives`). Defaults to objective *i* ↔ step *i* when omitted. Once all of an objective's steps are complete it is checked automatically, and checking an objective completes its steps. |
| `steps` | array | yes | Step objects |
| `steps[].do` | string | yes | Instruction |
| `steps[].command` | string | no | Internal command metadata for command-based steps; not shown in the learner UI |
| `steps[].hint` | string | no | Revealable hint |
| `steps[].solution` | string | no | Revealable solution (copyable) |
| `steps[].expectedOutput` | string | no | Concrete representative output shown by **View output**; use `(no output)` when appropriate |
| `steps[].expectedOutputDynamic` | boolean | no | Marks output whose values or formatting vary by system or run |
| `steps[].check` | string | no | One-line learner-facing verification guidance |
| `tags` | string[] | no | Filtering |

---

## Notes

```js
window.ReviewApp.content.register({
  type: "notes",
  cert: "linux-plus",
  chapter: "Ch 01 · Filesystem Hierarchy",
  items: [
    {
      title: "FHS Quick Reference",
      body: "## Heading\n\nMarkdown body…",
      tags: ["fhs", "reference"]
    }
  ]
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Note title |
| `body` | string (markdown) | yes | Full note content |
| `tags` | string[] | no | Search |

Supported markdown: headings (`#`–`###`), bold, italic, inline code, fenced code blocks, unordered/ordered lists, links (`[text](https://…)`), horizontal rules.

---

## Adding new content (checklist)

1. Create a `.js` file under the appropriate cert folder (`questions/`, `flashcards/`, `labs/`, or `notes/`).
2. Call `window.ReviewApp.content.register({ … })` with the correct `type` and `cert`.
3. Add the relative path to `certifications/_manifest.js` → `files`.
4. Open the app and click the **reload** button (top bar) or use Settings → Reload.
5. Confirm the toast shows the new counts.

Alternatively use **Settings → Deep-scan folder** to load files without editing the manifest (the optional refresh snapshot is cached in IndexedDB).

---

## JSON alternative

Deep-scan also accepts `.json` files with the same object shape as the argument to `register()`. This is an import alternative, not the format of the checked-in Linux+ banks:

```json
{
  "type": "questions",
  "cert": "linux-plus",
  "chapter": "Ch 02 · Working with Files",
  "items": [
    {
      "q": "Which command prints the current working directory?",
      "type": "mcq",
      "options": ["pwd", "cd", "ls", "cwd"],
      "answer": 0,
      "explain": "pwd prints the current working directory.",
      "tags": ["paths", "navigation"]
    }
  ]
}
```

JSON deep-scan payloads use the same fields described above. For labs, `mockData` is an optional array of supplied files or data, while command steps may include internal `command`, `expectedOutput`, and `expectedOutputDynamic` metadata. When loading the repository's normal manifest, use `.js` paths under `certifications/` and call **Reload** after changing them.
