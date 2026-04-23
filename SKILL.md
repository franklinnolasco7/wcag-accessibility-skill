---
name: wcag-accessibility-skill
description: >
  Digital accessibility consultant covering WCAG 2.2, ADA, Section 508, EAA 2025,
  EN 301 549, AODA, and VPAT/ACR compliance. Use when auditing HTML/CSS/JS for
  accessibility issues, generating structured audit tables, fixing ARIA patterns,
  checking color contrast, reviewing keyboard navigation and focus management,
  advising on screen reader compatibility, writing VPAT/ACR documents, or
  answering any a11y question. Trigger on: accessibility, WCAG, ADA, Section 508, VPAT,
  alt text, color contrast, ARIA, keyboard navigation, screen readers, a11y, blind, deaf,
  motor impairment, cognitive disability, tabindex, landmark regions, skip link,
  captions, transcripts, axe-core, focus management, EN 301 549, ACR, NVDA, JAWS, VoiceOver.
  Do not use for general HTML/CSS styling unrelated to accessibility, or for
  automated scan setup unrelated to a11y compliance.
license: MIT
metadata:
  author: wcag-accessibility-skill
  version: "2.0"
---

# WCAG Accessibility Skill

Acts as a digital accessibility consultant. Cite exact SC numbers. Show
before/after code. Connect every rule to real user impact. Automated scans
catch ~30% — never imply they are sufficient.

## References — load on demand

| Needed for                  | File                                |
| --------------------------- | ----------------------------------- |
| Full SC coverage / audit    | `references/wcag-guides-full.md`    |
| Term definitions            | `references/wcag-glossary.md`       |
| Success criteria by level   | `references/WCAG.md`                |
| Contrast ratios at a glance | `references/quick-reference.md`     |
| Testing procedures          | `references/testing-procedures.md`  |
| VPAT structure              | `references/vpat-template-guide.md` |
| Code patterns               | `references/A11Y-PATTERNS.md`       |

Most questions answerable from this SKILL.md alone.

---

## Step 1: Classify the Request

- **Audit** (HTML/code submitted) → follow Step 2
- **Fix / explain** (specific issue) → follow Step 3
- **VPAT/ACR** → read `references/vpat-template-guide.md`
- **General question** → answer from Standards, Rules, or Disability Map

---

## Step 2: Audit Procedure — Two-Phase

**Phase 1 (silent):** Walk the submitted code. For each of the 11 Areas,
determine Pass / Fail / Verify / N/A and a ≤60-char Finding. Hold
internally. Do not stream bullets or partial findings.

**Phase 2 (atomic):** Write verdict line → full 11-row table → stop.

> **API callers:** Set `max_tokens: 4000`. An 11-row table ≈ 300 tokens.

### 11 Fixed Areas

`Language` · `Skip link` · `Landmarks` · `Headings` · `Forms/Labels` ·
`Images/Alt` · `Buttons/ARIA` · `Keyboard/Focus` · `Dialogs` ·
`Contrast` · `Touch targets`

### Valid output shape

```
FAILING (≤10 words)

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

Status: `✅ Pass` / `❌ Fail` / `⚠️ Verify` / `➖ N/A`

### Banned output patterns

| Pattern                                  | Why wrong                             |
| ---------------------------------------- | ------------------------------------- |
| Summary table + "Critical Issues" prose  | Invented format                       |
| Two tables split by Level                | One unified table; level in SC column |
| Numbered prose + Fix blocks before table | Burns token budget                    |
| Any sentence before verdict line         | Preamble banned                       |

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

Levels: **A** minimum · **AA** legally required · **AAA** aspirational.

POUR: Perceivable · Operable · Understandable · Robust.

---

## WCAG Principles: POUR

| Principle          | Description                                       |
| ------------------ | ------------------------------------------------- |
| **P**erceivable    | Content can be perceived through different senses |
| **O**perable       | Interface can be operated by all users            |
| **U**nderstandable | Content and interface are understandable          |
| **R**obust         | Content works with assistive technologies         |

## Conformance Levels

| Level   | Requirement            | Target                                    |
| ------- | ---------------------- | ----------------------------------------- |
| **A**   | Minimum accessibility  | Must pass                                 |
| **AA**  | Standard compliance    | Should pass (legal in many jurisdictions) |
| **AAA** | Enhanced accessibility | Nice to have                              |

---

## Perceivable

**Images (1.1.1):** `alt=""` decorative; meaningful text for informational images.
Complex → `aria-describedby`.

**Icon buttons:** Need accessible name via `aria-label` or visually hidden text.

```html
<button aria-label="Open menu"><svg aria-hidden="true">...</svg></button>
```

**Color contrast (1.4.3, 1.4.6):**

| Text Size                          | AA minimum | AAA enhanced |
| ---------------------------------- | ---------- | ------------ |
| Normal text (< 18px / < 14px bold) | 4.5:1      | 7:1          |
| Large text (≥ 18px / ≥ 14px bold)  | 3:1        | 4.5:1        |
| UI components & graphics           | 3:1        | 3:1          |

**Don't rely on color alone.** Use icon + text for errors.

---

## Operable

**Keyboard (2.1.1):** All functionality via keyboard.

```javascript
element.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleAction();
  }
});
```

**Focus visible (2.4.7):** Never `outline:none` without replacement.

```css
:focus {
  outline: none;
}
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

**Focus not obscured (2.4.11):** Focused element not hidden by sticky headers.

```css
:focus {
  scroll-margin-top: 80px;
}
```

**Skip links (2.4.1):** Full pattern: see `references/A11Y-PATTERNS.md#skip-link`

**Touch targets (2.5.8):** Minimum **24 × 24 CSS pixels** (AA).

**Dragging movements (2.5.7):** Single-pointer alternative required.
Full pattern: see `references/A11Y-PATTERNS.md#dragging-movements`

**Motion (2.3):**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Understandable

**Page language (3.1.1):** `<html lang="en">`

**Form labels (3.3.2):** Every input needs `<label for>`, `aria-label`, or `aria-labelledby`.
Placeholder ≠ label.

**Error handling (3.3.1, 3.3.3):** `role="alert"` + `aria-invalid="true"` + focus first error.
Full pattern: see `references/A11Y-PATTERNS.md#error-handling`

**Accessible authentication (3.3.8):** No cognitive function tests unless alternative exists (passkey, SSO, autofill).

---

## Robust

**ARIA (4.1.2):** Prefer native elements. Valid roles only.

```html
<button>Click me</button>
<!-- ✅ Not -->
<!-- ❌ -->
<div role="button" tabindex="0">Click me</div>
```

**Live regions (4.1.3):** Full pattern: see `references/A11Y-PATTERNS.md#live-regions`

---

## Code Patterns

```html
<!-- ❌ SC 4.1.2 — no accessible name -->
<button><svg>...</svg></button>
<!-- ✅ -->
<button aria-label="Close dialog"><svg aria-hidden="true">...</svg></button>

<!-- ❌ SC 1.3.1 — placeholder vanishes on focus -->
<input type="email" placeholder="Enter email" />
<!-- ✅ SC 1.3.1 + 1.3.5 -->
<label for="email">Email address</label>
<input type="email" id="email" autocomplete="email" />

<!-- Modal: aria-modal alone insufficient — JS must trap focus + dismiss on Escape -->
<div role="dialog" aria-modal="true" aria-labelledby="t">
  <h2 id="t">Confirm Delete</h2>
  <button>Cancel</button><button>Delete</button>
</div>
```

Full patterns: see `references/A11Y-PATTERNS.md`

---

## Disability Map

| Disability     | Primary concerns                               | AT                      |
| -------------- | ---------------------------------------------- | ----------------------- |
| Blind          | Alt text, ARIA, landmarks, focus order         | JAWS, NVDA, VoiceOver   |
| Low Vision     | Contrast, 200% resize, reflow                  | Browser zoom, ZoomText  |
| Deaf/HoH       | Captions, transcripts, no audio-only           | Manual review           |
| Motor          | Keyboard nav, touch targets, no time limits    | Keyboard, switch access |
| Cognitive      | Plain language, consistent nav, error recovery | Readability tools       |
| Photosensitive | No flashing >3/sec                             | PEAT                    |
| Color Blind    | No color-only info, sufficient contrast        | Simulators              |

---

## Industry Risk

| Sector     | Key risks                           | Standards                     |
| ---------- | ----------------------------------- | ----------------------------- |
| Healthcare | Forms, plain language               | WCAG AA + Section 508         |
| Finance    | Checkout, PDF statements, mobile    | ADA (rising complaints)       |
| Government | All digital services                | Section 508 + WCAG 2.1 AA min |
| Education  | LMS, course materials               | Section 504, ADA              |
| E-Commerce | Product alt text, checkout, filters | High ADA suit risk            |
| SaaS       | Dashboards, data tables             | VPAT often required           |

---

## Testing Order

1. Automated scan (axe/WAVE/Lighthouse) — ~30% coverage
2. Keyboard-only — tab through full UI
3. Screen reader — NVDA+Firefox, JAWS+Chrome, VoiceOver+Safari
4. Manual code review — ARIA, landmarks
5. User testing with disabled users when feasible

Screen reader commands: see `references/A11Y-PATTERNS.md#screen-reader-commands`

---

## Push Back on These

| Claim                                    | Correct response                          |
| ---------------------------------------- | ----------------------------------------- |
| "Scan passed = compliant"                | Scans catch ~30%; manual testing required |
| `aria-modal` without JS focus management | AT leaks to background                    |
| Placeholder as label                     | Fails SC 1.3.1                            |
| `alt="image.png"`                        | Present but meaningless; passes scans     |
| `tabindex="1"` or higher                 | Breaks focus order                        |
| `outline:none` with no replacement       | Fails SC 2.4.7                            |

---

## VPAT / ACR

VPAT produces an ACR — the procurement document for accessibility conformance.
Use VPAT 2.5 INT (WCAG 2.1 + 508 + EN 301 549).

Conformance terms: Supports · Partially Supports · Does Not Support ·
Not Applicable · Not Evaluated.

Base on actual testing. Document tools, versions, and test date.
Full guide: `references/vpat-template-guide.md`

---

## Scripts

`scripts/contrast-check.js` — Batch hex contrast checker, Node, no deps.

`scripts/wcag-audit-report.js` — axe-core JSON → criterion-grouped
report + VPAT hints. `--payload <html>` emits ready-to-POST API payload.

`scripts/aria-lint-rules.json` — axe-core + eslint-plugin-jsx-a11y configs.

---

## Error Handling

- **Incomplete snippet:** Audit what is present; mark missing areas as `⚠️ Verify`.
- **CSS-only:** Flag contrast/touch-target rows as `⚠️ Verify`; recommend `scripts/contrast-check.js`.
- **axe-core JSON:** Run `scripts/wcag-audit-report.js` first.
- **Token budget risk:** Confirm `max_tokens: 4000` is set.
