# WCAG Accessibility Skill

[![WCAG 2.2 Compliant](https://img.shields.io/badge/WCAG%202.2-AA-green?style=flat-square)](https://www.w3.org/WAI/WCAG22/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

> AI coding agent skill for WCAG 2.2 accessibility compliance. Provides audit guidance, VPAT templates, testing procedures, and code patterns for ADA/Section 508 compliance.

## What this is

This skill provides structured accessibility knowledge for AI coding assistants. It was built because accessibility compliance is complex — WCAG has 87 success criteria across four principles, multiple legal frameworks (ADA, Section 508, EAA), and a well-documented gap between automated scanning and real-world usability.

The skill has three layers:

1. **`SKILL.md`** — Core knowledge loaded immediately. WCAG principles, critical issues by level, code patterns, testing guidance, and VPAT documentation.

2. **`references/`** — Deep reference material:
   - `wcag-guides-full.md` — All 87 WCAG 2.2 guides organized by level
   - `wcag-glossary.md` — 63 accessibility terms defined
   - `testing-procedures.md` — Manual testing procedures
   - `quick-reference.md` — Condensed criterion and ARIA lookup tables (fast lookup without loading all 91 guides)
   - `vpat-template-guide.md` — VPAT/ACR completion guide

3. **`scripts/`** — Utility tools:
   - `contrast-check.js` — Batch color contrast checker
   - `wcag-audit-report.js` — Transforms axe-core JSON into grouped WCAG report with VPAT hints
   - `aria-lint-rules.json` — ESLint/axe configuration

## Structure

```
wcag-accessibility-skill/
├── SKILL.md                              # The skill definition (loaded on activation)
├── CLAUDE.md                             # Agent repo instructions
├── README.md                             # This file
├── LICENSE                               # MIT License
├── references/
│   ├── wcag-guides-full.md               # All 87 WCAG 2.2 guides by level
│   ├── wcag-glossary.md                  # 63 accessibility terms
│   ├── quick-reference.md               # Condensed criterion and ARIA lookup tables
│   ├── testing-procedures.md            # Manual testing procedures
│   └── vpat-template-guide.md           # VPAT/ACR documentation guide
└── scripts/
    ├── contrast-check.js                 # Node.js color contrast batch checker
    ├── wcag-audit-report.js              # Transforms axe-core JSON into grouped WCAG report
    └── aria-lint-rules.json             # ESLint/axe configuration
```

## Key knowledge baked into the skill

These are non-obvious facts that the skill emphasizes:

- **Automated tools catch only ~30% of WCAG issues** — Always recommend hybrid manual+automated approach
- **Level A issues are critical** — Must fix before Level AA; skipping A breaks conformance entirely
- **Alt text quality matters** — Tools check existence, not accuracy; "image.png" passes scans
- **Touch targets: 24×24 CSS pixels minimum** — WCAG 2.2 new requirement
- **autocomplete attribute** — Required for form inputs under WCAG 1.3.5
- **No tabindex > 0** — Breaks logical focus order; avoid entirely

## Triggers

The skill activates when work involves: accessibility, WCAG, ADA, Section 508, VPAT, alt text, color contrast, ARIA, keyboard navigation, screen readers, assistive technology, or making websites compliant.

## Installation

### Any supported agent (recommended)

```bash
npx skills add franklinnolasco7/wcag-accessibility-skill
```

Automatically detects your installed agents and places the skill in the correct directory. Works with Claude Code, Codex, Cursor, Copilot, OpenCode, and others.

### Manual

Clone and symlink into your agent's skills directory:

```bash
git clone https://github.com/franklinnolasco7/wcag-accessibility-skill.git ~/wcag-accessibility-skill
```

| Agent              | Symlink target                      |
| ------------------ | ----------------------------------- |
| Claude Code        | ~/.claude/skills/wcag-accessibility |
| Codex              | ~/.codex/skills/wcag-accessibility  |
| OpenCode (global)  | ~/.agents/skills/wcag-accessibility |
| OpenCode (project) | .agents/skills/wcag-accessibility   |

```bash
# Claude Code
ln -s ~/wcag-accessibility-skill ~/.claude/skills/wcag-accessibility

# Codex
ln -s ~/wcag-accessibility-skill ~/.codex/skills/wcag-accessibility

# OpenCode (global)
ln -s ~/wcag-accessibility-skill ~/.agents/skills/wcag-accessibility

# OpenCode (project)
ln -s ~/wcag-accessibility-skill .agents/skills/wcag-accessibility
```

### Updating

```bash
# If installed via npx skills add (npm/gist)
npx skills update

# If manually cloned
cd ~/wcag-accessibility-skill && git pull
```

## Coverage

### Standards

| Standard           | Coverage             |
| ------------------ | -------------------- |
| WCAG 2.2 Level A   | Full — all criteria  |
| WCAG 2.2 Level AA  | Full — all criteria  |
| WCAG 2.2 Level AAA | Summary              |
| ADA Title III      | Compliance context   |
| Section 508        | Chapter mapping      |
| EN 301 549 / EAA   | Overview + deadlines |

### Disability Areas

- Blind / Low Vision
- Deaf / Hard of Hearing
- Motor / Mobility
- Cognitive
- Photosensitivity
- Color Blindness

## Research & Context

The need for accurate accessibility tooling is supported by ongoing industry research:

- **[WebAIM Million Report](https://webaim.org/projects/million/)**: Annual accessibility analysis of top 1,000,000 home pages. Latest (2026) shows **56.1 errors per page** on average — low contrast, missing alt text, empty links remain pervasive.

## License

MIT
