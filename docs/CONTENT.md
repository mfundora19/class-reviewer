# Adding Certifications & Content

Certifications and study material are registered in
[`certifications/_manifest.js`](../certifications/_manifest.js). Content files
are plain JavaScript that self-register — no build step is required.

## Adding a certification

1. Add a `certs` entry with an `id`, `name`, and optional `color`.
2. Create its content files under `certifications/<id>/`.
3. List each content file's path in `files`.

```js
window.ReviewApp.content.setManifest({
  certs: [
    { id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" }
  ],
  files: [
    "network-plus/questions/ch01-networking-fundamentals.js",
    "network-plus/flashcards/ch01-networking-fundamentals.js",
    "network-plus/labs/ch01-networking-labs.js",
    "network-plus/notes/ch01-networking-notes.js"
  ]
});
```

After editing, click the reload button in the top bar (or **Settings → Reload**).
The new certification appears automatically in the **Current certification**
picker and works with all certification-scoped views and global search.

## Supported content

- **Questions** — multiple choice, multi-select, true/false, fill-in, and generic matching questions (including legacy command matching).
- **Flashcards** — front/back cards with tags.
- **Labs** — hands-on scenarios with objectives, hints, and solutions.
- **Notes** — markdown notes grouped by chapter.

## Content structure

```text
certifications/
├── _manifest.js
├── linux-plus/
│   ├── questions/
│   ├── flashcards/
│   ├── labs/
│   └── notes/
└── network-plus/
    ├── questions/
    ├── flashcards/
    ├── labs/
    └── notes/
```

## Example registration

```js
window.ReviewApp.content.register({
  type: "questions",
  cert: "linux-plus",           // must match a certs[].id in the manifest
  chapter: "Ch 02 · Working with Files",
  items: [
    {
      q: "Which command prints the current working directory?",
      type: "mcq",
      options: ["pwd", "cd", "ls", "cwd"],
      answer: 0,
      explain: "pwd = print working directory.",
      tags: ["paths", "navigation"]
    }
  ]
});
```

## Full schemas & generation

Matching questions can pair any coherent item group from the notes with its meaning, definition, purpose, behavior, or other natural counterpart; they are not limited to commands and flags.

For complete field-by-field schemas for questions, flashcards, labs, and notes,
see **[CONTENT_FORMAT.md](./CONTENT_FORMAT.md)**.

To generate content from your own notes, copy a ready-to-use prompt from
**[material-generator.md](./prompts/material-generator.md)**.
