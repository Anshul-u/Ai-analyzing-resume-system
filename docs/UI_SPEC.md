# UI/UX Specification — "The Career Instrument"

**Design Identity:** Editorial-brutalist, high-craft developer tool aesthetic inspired by Kott Studio (kott.studio).  
**Tone & Style:** Precision-engineered, monochrome, high-density metric layouts, hairline grid borders, monospaced indices, and editorial section headers.

---

## 1. Design System Tokens & Foundations

### 1.1 Color Palette
* **Background Canvas:** Obsidian Dark Charcoal (`#0A0A0A` / `bg-neutral-950`)
* **Card & Surface Background:** Dark Graphite (`#121212` / `bg-neutral-900`)
* **Primary Text:** Bone White (`#EDEDED` / `text-neutral-100`)
* **Secondary Text:** Muted Slate (`#A3A3A3` / `text-neutral-400`)
* **Subtle Grid & Borders:** Hairline Neutral (`#1E1E1E` / `border-neutral-800` / `1px solid #1E1E1E`)
* **Monochrome Accents & Pills:**
  - Positive / Matched: Dark Emerald Tint (`border-emerald-500/30 text-emerald-400 bg-emerald-950/20`)
  - Missing / Action Required: Muted Crimson / Amber (`border-amber-500/30 text-amber-400 bg-amber-950/20`)
  - Neutral Tag: Monospace slate pill (`border-neutral-800 text-neutral-400 bg-neutral-900`)

### 1.2 Typography & Fonts
* **Primary UI Font:** `Geist Sans` or `Inter` (sans-serif) for clean readability in labels and bodies.
* **Metric & Index Font:** `Geist Mono` or `JetBrains Mono` (monospace) for all indices, section counters, percentages, code blocks, skill status tags, and score meters.
* **Section Indexing Pattern:** All major headers use uppercase editorial indexing:
  - `01 — INPUT STREAM`
  - `02 — SYNTHESIS OUTPUT`
  - `03 — SKILL MATRIX`
  - `04 — SCORING BREAKDOWN`
  - `05 — EXECUTION ROADMAP`

### 1.3 Iconography & Animations
* **Icons:** `lucide-react` with thin `strokeWidth={1.5}`.
* **Transitions:** `framer-motion` spring & fade reveals (`initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}`).

---

## 2. Page Structure & Component Blueprints

### 2.1 Top Navigation Header Bar
```text
+---------------------------------------------------------------------------------------------------+
|  [ analyzer ® ]     01/analyzer    02/skill-gap    03/roadmap    04/history      [ 🟢 ENGINE_READY ] |
+---------------------------------------------------------------------------------------------------+
```
- Brand logo in lowercase monospace (`analyzer ®`).
- Monospace links with numbered indexes (`01/`, `02/`, `03/`, `04/`).
- Real-time engine health status pill (`🟢 ENGINE_READY` or `⚡ PARSING_ACTIVE`).

### 2.2 Dual Ingestion Workbench (`01 — INPUT STREAM`)
- Two-column split layout with `1px border-neutral-800` divider.
- **Left Column `[ 01/RESUME_PARSER ]`:**
  - Drag-and-drop file ingestion area with dashed hairline border (`border-dashed border-neutral-800`).
  - Active hover state: Inverted high-contrast border.
  - Interactive status pill displaying parsing state (`[ ATS_PARSED ]`, `[ 01/RESUME ]`).
- **Right Column `[ 02/JOB_REQUIREMENTS ]`:**
  - High-density monospace textarea for job title & job description.
  - Character counter & payload validation tag.
- **Action Trigger:** Full-width high-contrast CTA button (`[ ⚡ RUN SYNTHESIS & ANALYSIS ]`).

### 2.3 Synthesis Output & Metrics Dashboard (`02 — SYNTHESIS OUTPUT`)
- High-density metric cards grid:
  - **Match Score:** Huge monospace percentage (e.g. `84%`) with match status (`[ STRONG_ALIGNMENT ]`).
  - **Skill Ratio:** `18 / 24` skills matched.
  - **Missing Core Competencies:** Counter pill (`6 SKILLS NEEDED`).

### 2.4 Skill Matrix (`03 — SKILL MATRIX`)
- Grid of outlined monospace badges:
  - Matched items: `[ ✓ React.js ]`, `[ ✓ TypeScript ]`, `[ ✓ Node.js ]`
  - Missing items: `[ ✗ Docker ]`, `[ ✗ Kubernetes ]`, `[ ✗ Terraform ]`
- Filter controls: `[ ALL ]`, `[ MATCHED ]`, `[ MISSING ]`.

### 2.5 Custom Scoring Breakdown (`04 — SCORING BREAKDOWN`)
- Minimalist hairline progress bars displaying formula components:
  - `[01] SKILLS OVERLAP     [==================--------] 40% (Score: 36/40)`
  - `[02] EXPERIENCE LEVEL   [==========================] 25% (Score: 22/25)`
  - `[03] KEYWORD DENSITY    [============--------------] 15% (Score: 11/15)`
  - `[04] EDUCATION MATCH    [==========================] 10% (Score: 10/10)`
  - `[05] PROJECT RELEVANCE  [=================---------] 10% (Score: 07/10)`

### 2.6 Execution Roadmap (`05 — EXECUTION ROADMAP`)
- Timeline steps formatted as interactive checklists:
  - `[ 01 / WEEKS 01–02 ]` — Containerization & Orchestration (`Docker`, `Docker Compose`)
  - `[ 02 / WEEKS 03–04 ]` — Infrastructure as Code (`Terraform`, `AWS S3`)
  - Action items rendered as checked / unchecked code items (`[x] Master Dockerfile multi-stage builds`).
