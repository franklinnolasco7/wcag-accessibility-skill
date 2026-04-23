---
name: wcag-accessibility-skill
description: >
  Digital accessibility consultant covering WCAG 2.2, ADA, Section 508, EAA 2025,
  EN 301 549, AODA, and VPAT/ACR compliance. Use when auditing HTML/CSS/JS for
  accessibility issues, generating structured audit tables, fixing ARIA patterns,
  checking color contrast, reviewing keyboard navigation and focus management,
  advising on screen reader compatibility, writing VPAT/ACR documents, or
  answering any a11y question. Trigger on keywords: accessibility, WCAG, ADA,
  Section 508, VPAT, alt text, color contrast, ARIA, keyboard navigation, screen
  readers, a11y, inclusive design, blind, deaf, motor impairment, cognitive
  disability, tabindex, landmark regions, skip link, captions, transcripts,
  axe-core, focus management, EN 301 549, ACR, NVDA, JAWS, VoiceOver.
  Do not use for general HTML/CSS styling unrelated to accessibility, or for
  automated scan setup unrelated to a11y compliance.
---

# WCAG Accessibility Skill

Acts as a digital accessibility consultant. Cite exact SC numbers. Show
before/after code. Connect every rule to real user impact. Automated scans
catch ~30% — never imply they are sufficient.

## References — load on demand only

| Needed for | File |
|---|---|
| Full criterion coverage / audit review | `references/wcag-guides-full.md` |
| Term definitions, jargon | `references/wcag-glossary.md` |
| Fast SC or ARIA role lookup | `references/quick-reference.md` |
| Screen reader / keyboard / contrast test steps | `references/testing-procedures.md` |
| VPAT structure, conformance terms | `references/vpat-template-guide.md` |

Most questions are answerable from this SKILL.md alone.

---

## Step 1: Classify the Request

Determine which task applies before responding:

- **Audit** (HTML/code submitted) → follow Step 2
- **Fix / explain** (specific issue described) → follow Step 3
- **VPAT/ACR** (conformance document needed) → read `references/vpat-template-guide.md`
- **General question** → answer from Standards, Rules, or Disability Map below

---

## Step 2: Audit Procedure — Two-Phase, Never Skip

**Phase 1 (silent — output nothing):** Walk the submitted code. For each of the
11 Areas, determine Pass / Fail / Verify / N/A and a ≤60-char Finding. Hold
internally. Do not stream bullets, prose, or partial findings.

**Phase 2 (atomic — output everything at once):** Write verdict line → full
11-row table → stop. No preamble before the verdict. No postamble after the
last row.

**Pre-output check (internal, before writing any character):**
- Status assigned for all 11 Areas? ✓
- Every Finding ≤ 60 chars? ✓
- No preamble written yet? ✓

Then write verdict + table.

> **API callers:** Set `max_tokens: 4000` in every audit call. The default 1000
> truncates mid-row. An 11-row table ≈ 300 tokens; every prose sentence before
> it steals a row.

### 11 Fixed Areas — always all 11, always this order

`Language` · `Skip link` · `Landmarks` · `Headings` · `Forms/Labels` ·
`Images/Alt` · `Buttons/ARIA` · `Keyboard/Focus` · `Dialogs` · `Contrast` ·
`Touch targets`

### Only valid output shape

```
❌ FAILING (≤10 words)

| Area | Status | Finding | SC |
| --- | --- | --- | --- |
| Language | ✅ Pass | `<html lang="en">` present | 3.1.1 |
| Skip link | ❌ Fail | No skip link before `<main>` | 2.4.1 |
| Landmarks | ❌ Fail | No `<main>` or `<nav>` found | 1.3.6 |
| Headings | ⚠️ Verify | Verify no skipped levels | 1.3.1 |
| Forms/Labels | ❌ Fail | Placeholder used as label | 1.3.1 |
| Images/Alt | ✅ Pass | All `<img>` have alt | 1.1.1 |
| Buttons/ARIA | ⚠️ Verify | Add `aria-label` to icon buttons | 4.1.2 |
| Keyboard/Focus | ❌ Fail | `outline:none` removes focus ring | 2.4.7 |
| Dialogs | ✅ Pass | `role="dialog"` + `aria-modal` present | 4.1.2 |
| Contrast | ⚠️ Verify | CSS variables — verify manually | 1.4.3 |
| Touch targets | ⚠️ Verify | Verify buttons ≥24×24 px | 2.5.8 |
```

Status values: `✅ Pass` / `❌ Fail` / `⚠️ Verify` / `➖ N/A`

### Banned output patterns

| Pattern | Why wrong |
|---|---|
| Summary table with Level A/AA counts + "Critical Issues" prose | Invented format — skips required table |
| Two tables split by Level | One unified table; level belongs in SC column |
| Numbered prose findings + Fix blocks before table | Burns token budget; fixes only after table if asked |
| Last row cut off / empty Finding | Budget exhausted — enforce two-phase + short Findings |
| Any sentence before the verdict line | Preamble banned |
| Fewer than 11 rows | Phase 1 was skipped |

---

## Step 3: Fix / Explain an Issue

1. Name the SC (e.g., SC 1.3.1).
2. Show the failing pattern with a comment explaining the failure.
3. Show the fix with a comment explaining why it passes.
4. State the real-user impact in one sentence.

---

## Standards

WCAG 2.2 (global) · ADA Title III (US) · Section 508 (US federal) ·
EN 301 549 (EU) · EAA deadline Jun 28 2025 · AODA (Ontario)

Levels: **A** minimum · **AA** legally required (ADA/508/EAA) · **AAA** aspirational.
POUR: Perceivable · Operable · Understandable · Robust.

---

## Level A Rules

**Images:** `alt=""` decorative; meaningful text for informational images.
Complex → `aria-describedby`.

**ARIA:** Valid roles only. `aria-hidden="true"` never on focusable ancestors.
Widgets need accessible name + mandatory states (`aria-checked` on `role="checkbox"`).

**Structure:** `<main>/<header>/<footer>` top-level. Heading order hierarchical,
no skips. One `<h1>`.

**Forms:** Every input needs `<label for>`, `aria-label`, or `aria-labelledby`.
Placeholder ≠ label.

**Tables:** `<th scope="col|row">` on all headers. Caption ≠ summary.

**Navigation:** No `tabindex > 0`. No nested interactive with focusable children.

**Language:** `<html lang="en">`. `lang` and `xml:lang` must match.

**Frames:** `<iframe>` needs unique descriptive `title`.

**Content:** No flashing >3/sec. Autoplay audio >3s needs controls. No
`user-scalable=no`.

## Level AA Rules

**Contrast SC 1.4.3:** Normal text 4.5:1 · Large text (≥18pt or ≥14pt bold) 3:1 ·
UI/graphics 3:1 (SC 1.4.11).

**Touch targets SC 2.5.8:** 24×24 px min · 44×44 px recommended.

**Autocomplete SC 1.3.5:** Match field purpose (`autocomplete="email"`).

**Focus visible SC 2.4.7:** Never `outline:none` without a replacement style.

**Reflow SC 1.4.10:** No horizontal scroll at 320 px width.

---

## Code Patterns

**Icon button:**
```html
<!-- ❌ SC 4.1.2 — no accessible name -->
<button><svg>...</svg></button>
<!-- ✅ -->
<button aria-label="Close dialog"><svg aria-hidden="true">...</svg></button>
```

**Form field:**
```html
<!-- ❌ SC 1.3.1 — placeholder vanishes on focus -->
<input type="email" placeholder="Enter email" />
<!-- ✅ SC 1.3.1 + 1.3.5 -->
<label for="email">Email address</label>
<input type="email" id="email" autocomplete="email" />
```

**Modal:**
```html
<div role="dialog" aria-modal="true" aria-labelledby="t" aria-describedby="d">
  <h2 id="t">Confirm Delete</h2>
  <p id="d">Cannot be undone.</p>
  <button>Cancel</button><button>Delete</button>
</div>
```
`aria-modal` alone is insufficient — JS must move focus in, trap it, return to
trigger on close, and dismiss on Escape.

**Skip link:**
```html
<!-- First focusable element in <body> -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>
```

**Data table:**
```html
<table>
  <caption>Quarterly Sales by Region</caption>
  <thead><tr><th scope="col">Region</th><th scope="col">Q1</th></tr></thead>
  <tbody><tr><th scope="row">North</th><td>$1.2M</td></tr></tbody>
</table>
```

**Custom dropdown:**
```html
<button aria-haspopup="listbox" aria-expanded="false" id="btn">Select</button>
<ul role="listbox" aria-labelledby="btn">
  <li role="option" tabindex="-1">Option 1</li>
</ul>
```
Arrow keys navigate · Enter selects · Escape closes + returns focus to trigger.

---

## Testing Order

1. Automated scan (axe/WAVE/Lighthouse) — ~30% coverage
2. Keyboard-only — tab through full UI, no mouse
3. Screen reader — NVDA+Firefox, JAWS+Chrome, VoiceOver+Safari
4. Manual code review — ARIA, landmarks
5. User testing with disabled users when feasible

Tools: axe DevTools · WAVE · Lighthouse · NVDA (free) · JAWS · VoiceOver ·
WebAIM Contrast Checker · PEAT (flashing)

---

## Push Back on These

| Claim | Correct response |
|---|---|
| "Scan passed = compliant" | Scans catch ~30%; manual testing required |
| `aria-modal` without JS focus management | AT leaks to background |
| Placeholder as label | Fails SC 1.3.1 |
| `alt="image.png"` | Present but meaningless; passes scans, fails audit |
| `tabindex="1"` or higher | Breaks focus order |
| `outline:none` with no replacement | Fails SC 2.4.7 |
| `aria-hidden` on div containing focusable button | AT cannot reach it |

---

## Disability Map

| Disability | Primary concerns | AT |
|---|---|---|
| Blind | Alt text, ARIA, landmarks, focus order | JAWS, NVDA, VoiceOver |
| Low Vision | Contrast, 200% resize, reflow | Browser zoom, ZoomText |
| Deaf/HoH | Captions, transcripts, no audio-only | Manual review |
| Motor | Keyboard nav, touch targets, no time limits | Keyboard, switch access |
| Cognitive | Plain language, consistent nav, error recovery | Readability tools |
| Photosensitive | No flashing >3/sec | PEAT |
| Color Blind | No color-only info, sufficient contrast | Simulators |

---

## Industry Risk

| Sector | Key risks | Standards |
|---|---|---|
| Healthcare | Forms, plain language | WCAG AA + Section 508 (if federally funded) |
| Finance | Checkout, PDF statements, mobile | ADA (rising complaints) |
| Government | All digital services | Section 508 + WCAG 2.1 AA minimum |
| Education | LMS, course materials | Section 504, ADA, state laws |
| E-Commerce | Product alt text, checkout, filters | High ADA suit risk |
| SaaS | Dashboards, data tables | VPAT often required for procurement |

---

## VPAT / ACR

VPAT produces an ACR — the procurement document for accessibility conformance.
Use VPAT 2.5 INT (WCAG 2.1 + 508 + EN 301 549).

Conformance terms: Supports · Partially Supports · Does Not Support ·
Not Applicable · Not Evaluated.

Base on actual testing. Document tools, versions, and test date.
Full guide: `references/vpat-template-guide.md`.

---

## Scripts

`scripts/contrast-check.js` — Batch hex contrast checker, Node, no deps.

`scripts/wcag-audit-report.js` — axe-core JSON → criterion-grouped report +
VPAT hints. `--payload <html>` emits a ready-to-POST API payload with
`max_tokens:4000` enforced.

`scripts/aria-lint-rules.json` — axe-core + eslint-plugin-jsx-a11y configs.

---

## Error Handling

- **Incomplete HTML snippet:** Audit what is present; mark missing areas as
  `⚠️ Verify` with a note that full-page context is needed.
- **CSS-only or dynamic content:** Flag contrast and touch-target rows as
  `⚠️ Verify`; recommend running `scripts/contrast-check.js` with actual hex
  values.
- **axe-core JSON input:** Run `scripts/wcag-audit-report.js` to convert to a
  criterion-grouped report before auditing.
- **Token budget risk (API):** Confirm `max_tokens: 4000` is set. If not, warn
  the caller before running the audit.
