---
name: wcag-accessibility-skill
description: >
  Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to
  "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support",
  "keyboard navigation", "make accessible", "add alt text", or "fix contrast". Trigger on:
  accessibility, WCAG, ADA, Section 508, VPAT, alt text, color contrast, ARIA,
  keyboard navigation, screen readers, a11y, blind, deaf, motor impairment, cognitive
  disability, tabindex, landmark regions, skip link, captions, transcripts,
  axe-core, focus management, NVDA, JAWS, VoiceOver.
  Do not use for general HTML/CSS styling unrelated to accessibility.
license: MIT
metadata:
  author: wcag-accessibility-skill
  version: "2.2"
---

# Accessibility (a11y)

Comprehensive WCAG 2.2 guidelines. Make content usable by everyone.

## References — load on demand

| Needed for         | File                                |
| ------------------ | ----------------------------------- |
| Success criteria   | `references/WCAG.md`                |
| Code patterns      | `references/A11Y-PATTERNS.md`       |
| Full SC coverage   | `references/wcag-guides-full.md`    |
| Term definitions   | `references/wcag-glossary.md`       |
| Contrast ratios    | `references/quick-reference.md`     |
| Testing procedures | `references/testing-procedures.md`  |
| VPAT structure     | `references/vpat-template-guide.md` |

---

## WCAG Principles: POUR

| Principle          | Description               |
| ------------------ | ------------------------- |
| **P**erceivable    | Content can be perceived  |
| **O**operable      | Interface can be operated |
| **U**nderstandable | Content is understandable |
| **R**obust         | Works with AT             |

## Conformance Levels

| Level   | Requirement                            |
| ------- | -------------------------------------- |
| **A**   | Minimum (must pass)                    |
| **AA**  | Standard (legal in many jurisdictions) |
| **AAA** | Enhanced (nice to have)                |

---

## Perceivable

### Text Alternatives (1.1)

```html
<img src="chart.png" alt="Q3 sales showing 40% increase" />
<!-- ✅ descriptive -->
<img src="decorative.png" alt="" role="presentation" />
<!-- ✅ decorative -->
<button aria-label="Open menu"><svg aria-hidden="true">...</svg></button>
<!-- ✅ icon button -->
```

**Visually hidden class:**

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Color Contrast (1.4.3, 1.4.6)

| Text Size            | AA    | AAA   |
| -------------------- | ----- | ----- |
| Normal text (< 18px) | 4.5:1 | 7:1   |
| Large text (≥ 18px)  | 3:1   | 4.5:1 |
| UI components        | 3:1   | 3:1   |

### Media (1.2)

```html
<video controls>
  <source src="video.mp4" />
  <track
    kind="captions"
    src="captions.vtt"
    srclang="en"
    label="English"
    default
  />
</video>
<details>
  <summary>Transcript</summary>
  <p>Full text...</p>
</details>
```

---

## Operable

### Keyboard (2.1)

```javascript
element.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    action();
  }
});
```

### Focus Visible (2.4.7)

```css
:focus {
  outline: none;
}
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

### Focus Not Obscured (2.4.11)

```css
:focus {
  scroll-margin-top: 80px;
}
```

### Skip Links (2.4.1)

Full pattern: see `references/A11Y-PATTERNS.md#skip-link`

### Target Size (2.5.8)

Minimum **24 × 24 CSS pixels** (AA).

```css
button,
[role="button"] {
  min-width: 24px;
  min-height: 24px;
}
```

### Motion (2.3)

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Understandable

### Page Language (3.1.1)

`<html lang="en">`

### Form Labels (3.3.2)

```html
<label for="email">Email</label> <input id="email" autocomplete="email" />
```

Placeholder ≠ label.

### Error Handling (3.3.1, 3.3.3)

```html
<input aria-invalid="true" aria-describedby="error" />
<p id="error" role="alert">Please enter a valid email</p>
```

### Accessible Authentication (3.3.8)

```html
<input autocomplete="current-password" /> <button>Sign in with passkey</button>
```

---

## Robust

### ARIA (4.1.2)

**Prefer native elements:**

```html
<button>Click</button>
<!-- ✅ -->
<div role="button">Click</div>
<!-- ❌ -->
```

### Live Regions (4.1.3)

```html
<div aria-live="polite">Saving...</div>
```

---

## Testing

```bash
npx lighthouse https://example.com --only-categories=accessibility
axe https://example.com
```

Manual: keyboard nav, screen reader, 200% zoom, high contrast, reduced motion.

Screen reader commands: see `references/A11Y-PATTERNS.md#screen-reader-commands`

---

## Common Issues

### Critical

1. Missing form labels
2. Missing image alt text
3. Insufficient color contrast
4. Keyboard traps
5. No focus indicators

### Serious

1. Missing page language
2. Missing headings
3. Non-descriptive link text
4. Auto-playing media
5. Missing skip links

### Moderate

1. Missing ARIA labels
2. Inconsistent nav
3. Missing error messages
4. Timing without controls
5. Missing landmarks

---

## Push Back

| Claim                     | Response           |
| ------------------------- | ------------------ |
| "Scan passed = compliant" | Scans catch ~30%   |
| Placeholder as label      | Fails SC 1.3.1     |
| `alt="image.png"`         | Meaningless        |
| `tabindex="1"`            | Breaks focus order |
| `outline:none`            | Fails SC 2.4.7     |

---

## VPAT / ACR

VPAT produces ACR — procurement document. Use VPAT 2.5 INT (WCAG 2.1 + 508 + EN 301 549).

Terms: Supports · Partially Supports · Does Not Support · Not Applicable · Not Evaluated.

Full guide: `references/vpat-template-guide.md`

---

## Scripts

`scripts/contrast-check.js` — Batch hex contrast checker.
`scripts/wcag-audit-report.js` — axe-core JSON → grouped WCAG report.
`scripts/aria-lint-rules.json` — axe-core + eslint configs.
