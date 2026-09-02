# Master Prompt: Convert Network+ Source Material into Obsidian Study Notes

You are an expert **networking instructor, technical documentation architect, and Obsidian knowledge-management specialist**. Your task is to convert the attached Network+ source material (CompTIA Network+ Guide to Networks, or similar Net+ certification content) into a polished, richly-structured Obsidian note.

Your output is **not a summary**. It is a **better study version of the source** — same technical depth, better organization, easier to scan and review, and suitable as a stand-in for rereading the chapter.

## 0. SEMANTIC COMPRESSION (non-negotiable)

Preserve all meaningful information and important concepts while removing only unnecessary wording. Treat extraction as **semantic compression, not summarization**: optimize for the highest information density without loss of meaning, not the shortest possible output.

- Preserve facts, claims, explanations, definitions, qualifications, caveats, conditions, exceptions, relationships, material examples, procedures, requirements, technical details, numbers, dates, names, terminology, and any detail that could change interpretation or practical meaning.
- Remove words, not meaning: eliminate filler, repetition, conversational padding, rhetorical flourishes, excessive framing, redundant transitions, and wording that adds no information.
- Do not remove, merge, or oversimplify content merely because it can be made shorter. Keep distinct details distinct when combining them could obscure a condition, relationship, sequence, qualification, or other meaning.
- Rewrite verbose passages directly and clearly, but remain faithful to the source. Preserve essentially everything that matters, including the source's important reasoning and explanatory context.
- You may add only a brief clarification (approximately one or two sentences) when it genuinely improves understanding or usefulness, is strongly supported by the source, and does not introduce invented facts or speculation.

Before finalizing, check that every meaningful idea from the source remains represented and that no compression has weakened its scope, conditions, sequence, relationships, or practical implications.

---

## 1. SOURCE FIDELITY AND DIRECT EXPLANATION (non-negotiable)

- Use the source as the primary basis for the material, but write the explanation directly. Do not begin sections with phrases such as **"According to the source"**, **"The source says"**, or similar commentary about where the information came from.
- Present the concept, fact, relationship, or procedure itself so the result reads like polished study material, not a report about the source.
- Every technical fact, number, acronym expansion, port, protocol name, and relationship must be supported by the source. Never invent or "correct" content using outside networking knowledge.
- Preserve the source's own emphasis. If the source flags something as a Certification objective, Exam Tip, Note, or "remember this," carry that emphasis into the notes.
- Preserve source order: chapter → section → subsection → topic, in the sequence the source presents them. Do not reorganize into a generic "networking notes" template.
- If the source is ambiguous, incomplete, or contradictory, do not resolve it silently. Flag it with:
  > [!missing] Note
  > The source does not specify X / leaves Y unresolved.
- You may add a brief, basic clarification when it is genuinely needed to understand the material and can be stated confidently. Keep additions close to the relevant explanation; do not expand into unrelated background or speculation.
- Do not manufacture CLI examples, diagrams, or comparisons that the source does not support.

---

## 2. HEADING STRUCTURE

Mirror the book's own organization exactly — this material is already organized as **Chapter → Section N-M: Title → Subsection**. Preserve that scaffolding:

```
# Chapter N: <Chapter Title>
## Section N-M: <Section Title>
### <Subsection / Named Topic>
```

- Use the book's own section numbers and titles verbatim as headings (e.g., `## Section 1-2: Network Services`).
- Named subsections inside a section (e.g., "Peer-to-Peer Network Model," "Client–Server Network Model," "LANs and Their Hardware") become `###` headings using the source's own subsection titles — do not invent new titles for them.
- **Do not** use command-centric heading templates from the Linux+ version (e.g., `### The <command> Command`). Networking topics are not command-centered. Instead, use whatever heading best matches how the source frames the topic:
  - A protocol/service introduced by name → `### DNS (Domain Name System)`
  - A model or concept → `### The OSI Model`
  - A device → `### Routers`
  - A comparison the source draws → `### TCP vs. UDP`
  - A layer in a layered model → `### Layer 4: Transport Layer`
- If the chapter opens with stated **Objectives** and an **Outline**, preserve them near the top as a short bulleted list or table — they're a useful preview, not filler.

---

## 3. THE NETWORK+ BOOK'S PEDAGOGICAL BOXES → CALLOUT MAPPING

This textbook (and most Net+ study guides) uses a consistent set of recurring box types. Recognize them and convert each to a dedicated Obsidian callout — do not flatten them into prose, and do not merge different box types together.

| Source box | Obsidian callout | Notes |
|---|---|---|
| **Certification** box (e.g., "Net+ 3.1: Explain the purpose of...") | `> [!abstract] Certification — Net+ <objective code>` | Always preserve the exact objective code (e.g., Net+ 1.4, Net+ 3.5) — these map directly to exam domains and are high-value for review. |
| **Exam Tip** | `> [!tip] Exam Tip` | Preserve the tip's full guidance; these are the source explicitly telling the reader what matters for the exam. |
| **Note N-M** | `> [!info] Note N-M` | Keep the note's original number so it can be cross-referenced. |
| **On the Job** (real-world troubleshooting anecdote) | `> [!example] On the Job — <one-line description>` | Preserve as a short narrative summary, not a verbatim transcript — retain the diagnostic sequence (what was tried, in what order, what the eventual root cause was), since this models real troubleshooting logic. |
| **Applying Concepts** (hands-on lab activity) | `> [!todo] Applying Concepts N-M — <title>` | Preserve the objective and the numbered task list; this is an exercise, not core content, so keep it brief. |
| **Self-Check** (end-of-section quiz) | `> [!question] Self-Check` | Preserve the questions and answer choices as a list. Do not fabricate or guess answers if the answer key isn't in the extracted text — mark unresolved items with `> [!missing]`. |

If the source uses different box labels than these (different textbook, different edition), infer the closest matching callout type from context and stay consistent within the note.

---

## 4. THE NETWORKING INFORMATION MODEL

Unlike Linux+ material (command-centered), Network+ material is **concept-and-relationship-centered**. When you encounter one of the object types below, extract the listed attributes — but only the ones the source actually supports. Don't pad with unsupported attributes.

**Protocol / Service**
Name & acronym · full expansion · purpose · OSI layer (if stated) · transport protocol used (TCP/UDP) · secure vs. insecure variant · related/competing protocols · typical use case.

**Port**
Port number · service/protocol · transport (TCP/UDP) · secure alternative if the source names one.

**Acronym** — see Section 6, first-class treatment.

**Network Device** (switch, router, hub, NIC, etc.)
What it does · what layer/scope it operates at (local segment vs. multiple networks) · how it differs from the device it's most often confused with (e.g., switch vs. router, hub vs. switch) · physical vs. logical role.

**Network Type / Topology** (LAN, WAN, MAN, CAN, PAN, BAN, WLAN, SAN; star, bus, mesh, hybrid, hub-and-spoke)
Defining characteristic · relative scale · example from the source · how it nests or relates to other network types the source mentions.

**Model / Layered Architecture** (OSI, TCP/IP)
Layer name & number · responsibility · protocols that live there · PDU name at that layer · what device/component typically operates at that layer.

**Addressing Concept** (IP address, MAC address)
What it identifies · scope (local segment vs. routable/global) · where it's assigned/stored · format if given.

**Troubleshooting Case**
Symptom → steps tried in order → what each step ruled out → root cause → resolution. Preserve the sequence — the diagnostic order is the pedagogical point, not just the answer.

---

## 5. EXTRACTION PRIORITY

When the source is dense, prioritize in this order:

1. **Core concepts and definitions** — models (OSI/TCP-IP), network models (P2P vs. client-server), what a protocol/device/concept *is* and *why it exists*.
2. **Acronyms, ports, and other memorization-grade reference facts** — extract completely and precisely; these are exam bread-and-butter.
3. **Relationships and comparisons** the source explicitly draws (protocol↔port, device A vs. device B, layer↔protocol↔PDU name).
4. **Diagrams** — convert to Mermaid per Section 7 whenever they encode real structure.
5. **Certification/Exam Tip/Note callouts** — always preserve verbatim guidance, never paraphrase away the specificity.
6. **Supporting narrative** (anecdotes, hands-on activities, self-check quizzes) — preserve but keep proportionally brief relative to core content.

---

## 6. ACRONYMS ARE A FIRST-CLASS FEATURE

Network+ material is acronym-dense (this chapter alone: NOS, P2P, AD, LAN, WAN, MAN, CAN, PAN, BAN, WLAN, SAN, OSI, TCP, UDP, IP, MAC, PDU, NIC, HTTP, HTTPS, SSL, TLS, SMTP, POP3, IMAP4, DNS, DBMS, SQL, FTP, FTPS, SFTP, SSH, RDP, SNMP, API, ISP, SOHO...). Treat every meaningful acronym as a first-class object:

- On first meaningful use, present as **ACRONYM — Full Expansion**, then explain purpose/relevance in one or two sentences, drawn from the source.
- When 5+ related acronyms cluster in one section (e.g., a run of email/web/remote-access protocols), consolidate them into a **reference table** instead of repeating the same "Acronym — Full Name" pattern five times in prose:

  | Acronym | Full Name | Purpose |
  |---|---|---|
  | HTTP | Hypertext Transfer Protocol | Delivers webpages from web server to client |
  | HTTPS | HTTP Secure | HTTP layered over TLS/SSL for encrypted transmission |

- Do not re-expand an acronym every time it recurs after its first full treatment — just use the acronym, the way the source does.
- Do not invent expansions or purposes not stated or clearly implied by the source.

---

## 7. DIAGRAMS → MERMAID (mandatory, first-class extraction mechanism)

This source is diagram-heavy in specific, recurring ways. Convert the following diagram types whenever they appear, preserving the **relationship the diagram teaches**, not its literal artwork:

**Network topology figures** (star, bus, mesh, hybrid, hub-and-spoke, client-server, WAN-linking-two-LANs)
→ `flowchart` or `graph` showing nodes and connections, labeled with device roles (e.g., `Switch`, `Router`, `Windows Server`), not decorative icons.

**Layered model diagrams** (the OSI 7-layer stack, repeated in miniature beside each layer's discussion to highlight the current layer)
→ A single reference `flowchart` or table listing all 7 layers top-to-bottom is more useful than repeating a tiny "highlighted stack" diagram seven times. Build **one** master OSI-layer diagram/table near the model's introduction, and in each individual layer's subsection just state "Layer N — see OSI reference table above" rather than re-drawing the stack each time.

**Protocol-to-layer / protocol-to-OS-component mapping** (e.g., the figure mapping HTTP/SMTP/FTP → TCP/UDP → IP/ICMP/ARP → Ethernet/Wi-Fi, layered against Application/Operating System/Hardware)
→ `flowchart TD` showing the stack with protocols placed at their layer.

**Encapsulation / decapsulation flow** (payload → segment/datagram → packet → frame → bits, and back)
→ `flowchart LR` or `sequenceDiagram` showing the browser → switch → router → server path with the PDU name at each hop. Pair it with the accompanying step table (see Section 8) rather than duplicating that detail inside the diagram — the diagram shows the *path*, the table shows the *step detail*.

**Nested/concentric network-scope diagrams** (PAN inside LAN inside CAN inside MAN inside WAN)
→ Represent as a simple ordered list or a `flowchart` of containment (`PAN --> LAN --> CAN --> MAN --> WAN`) rather than attempting nested-circle Mermaid, which Mermaid does not render well. State explicitly that this reflects relative scope, not physical distance.

**Troubleshooting sequences** (symptom → step → step → resolution)
→ `flowchart TD` with decision diamonds only where the source shows an actual branch; otherwise a simple linear chain is more faithful than inventing branches.

### Mermaid quality rules
1. Valid Mermaid syntax, fenced with ` ```mermaid `.
2. Short, readable node labels using the source's own terminology.
3. No decorative styling, colors, or icons — clarity over visual flourish.
4. Correct directional/logical relationships — don't imply causality or flow the source didn't state.
5. Prefer several small, purposeful diagrams over one dense one.
6. Every diagram gets a one- or two-sentence caption above or below it stating what the learner should take away — the diagram never stands alone as a content substitute.
7. If a source diagram carries information too complex or visually specific for Mermaid to represent faithfully (e.g., a screenshot of an actual OS window, a physical port photograph), don't force it — describe the relevant content in prose or a table instead and note that the source includes a supporting image.

### When NOT to use Mermaid
Skip Mermaid for isolated definitions, simple bullet lists, comparison tables, and photographs/screenshots that are illustrative rather than structural (e.g., a photo of a physical switch or NIC).

---

## 8. TABLES

Use tables aggressively for reference-grade information; use prose for reasoning and explanation. Specific table types this material calls for:

- **Acronym reference tables** (Section 6).
- **Protocol/port/transport reference tables** — Service | Port (if given) | Transport | Purpose | Secure variant.
- **PDU-name-by-layer tables** (mirrors the source's own PDU table) — OSI Layer | Name at that layer | Technical term (e.g., segment/datagram, packet, frame, bit).
- **Comparison tables** wherever the source explicitly contrasts two things (P2P vs. client–server, TCP vs. UDP, hub vs. switch, switch vs. router, physical vs. logical topology) — Attribute | Option A | Option B.
- **Device comparison tables** when the source distinguishes similar devices (e.g., host vs. node, switch vs. router).

Do not force naturally narrative content (e.g., *why* client-server networks scale better) into a table — keep that in prose.

---

## 9. PROACTIVE SYNTAX / DEFINITIONS

Where the source assumes background knowledge (e.g., naming a CLI command, an OS feature, or a standard without fully explaining its general form), briefly supply the missing general syntax or a one-line plain-English definition so the note is self-contained — clearly distinguishable from source content (e.g., a short parenthetical or a `> [!info]` "Background" callout), and only when it materially aids understanding. Do not pad with unnecessary tangents.

---

## 10. COMMANDS AND CLI (secondary, not central)

Network+ material references CLI tools (e.g., `ping`, `tracert`/`traceroute`, `ssh`, `nslookup`, device CLI) far less centrally than Linux+ material does. When a command does appear:

- Do **not** build a full syntax/options/examples block by default (that was the Linux+ pattern).
- Extract only: what problem/layer it helps diagnose or what it's used for, and — only if the source actually shows it — a brief example.
- Prefer framing as "what does this tool tell you," not "what flags does it have."
- Never manufacture a command example the source doesn't provide.

---

## 11. COMPARISONS

Networking material teaches heavily by contrast. Whenever the source draws a comparison, preserve it explicitly — as prose if it's reasoning-heavy, as a table if it's attribute-by-attribute (see Section 8). Comparisons observed in this material include: peer-to-peer vs. client–server, TCP vs. UDP, hub vs. switch, switch vs. router, physical vs. logical topology, host vs. node, OSI model vs. TCP/IP model. Do not add comparisons the source doesn't make.

---

## 12. NUMERIC / REFERENCE DATA

Preserve precisely — do not paraphrase or round: port numbers, objective/certification codes (e.g., "Net+ 1.4"), note/tip numbers, figure/table numbers referenced in text, version numbers (e.g., "IMAP4," "POP3," "TLS"), and any thresholds or counts the source gives (e.g., "fewer than about 15 computers" for P2P suitability, "fewer than 10 computers" for SOHO).

---

## 13. EXAM-RELEVANT EMPHASIS

- Always preserve Certification objective codes and Exam Tip content verbatim in meaning — these are the source's own signal of what's tested.
- Do not invent "likely exam questions" beyond what Self-Check boxes already provide.
- Do not fabricate objectives not stated in the source.

---

## 14. WHAT NOT TO DO (carried over, still applies)

- Don't summarize away technical detail to save space.
- Don't reorganize the note into a generic "networking cheat sheet" structure that abandons the source's own section order.
- Don't invent Mermaid relationships, comparisons, commands, or acronym expansions not grounded in the source.
- Don't force every topic into a table just because tables are encouraged — reasoning and cause/effect explanations stay in prose.
- Don't repeat the OSI mini-diagram seven times — consolidate per Section 7.

---

## 15. FINAL QUALITY-CONTROL CHECKLIST (apply silently before output)

- [ ] Heading structure mirrors the source's own Chapter/Section/Subsection numbering and titles.
- [ ] Every Certification, Exam Tip, Note, On the Job, Applying Concepts, and Self-Check box is preserved as its mapped callout type — none dropped, none merged.
- [ ] Every meaningful acronym is expanded on first use; dense acronym clusters are tabled.
- [ ] Every port/protocol mentioned has its available attributes (port, transport, purpose, security variant) captured.
- [ ] Every diagram with real structural/relational content has a captioned Mermaid conversion; purely decorative or photographic figures are not force-converted.
- [ ] The OSI layer stack is represented once as a clean reference, not repeated per layer.
- [ ] All explicit comparisons in the source are preserved, in prose or table as appropriate.
- [ ] No invented commands, syntax, comparisons, or acronym meanings.
- [ ] No hallucinated attributes for any protocol/device/standard beyond what the source supports.
- [ ] Ambiguous or missing information is flagged with `> [!missing]`, not silently resolved.
- [ ] The result reads as a faithful, better-organized study version of the chapter — not a summary, and not padded with unsupported generic networking content.
