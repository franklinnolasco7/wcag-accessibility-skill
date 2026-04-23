# WCAG 2.2 Guides — Full Reference

> Source: https://www.adacompliancepros.com/wcag-guides  
> 91 guides organized by disability area and conformance level

## When to load this file

Load when the user asks about a specific criterion by number, requests a full audit
checklist, or needs coverage of a category not answered by SKILL.md alone (e.g.,
"all ARIA rules", "every Level A form issue", "what does 1.2.x cover").

Do not load for general questions — SKILL.md covers the common cases.

Each entry includes: topic, disability areas affected, level, and key implementation notes.

---

## Level A Guides (Minimum — Must Pass)

### ARIA & Roles

| # | Topic | Disability |
|---|---|---|
| 1 | Role="text" must not contain focusable elements | Blind, Mobility |
| 5 | ARIA attributes must use valid names and values | Blind |
| 6 | ARIA tooltip needs an accessible name | Blind |
| 7 | Valid ARIA role values are required | Blind |
| 8 | ARIA roles require correct parent roles | Blind |
| 9 | ARIA required owned elements require child roles | Blind |
| 10 | ARIA widget roles required attributes | Blind |
| 11 | Prohibited ARIA attributes must not be used for roles | Blind |
| 12 | ARIA progressbar needs accessible name | Blind |
| 13 | ARIA meter needs accessible names | Blind |
| 14 | ARIA inputs need accessible names | Blind |
| 15 | Aria-hidden elements must not contain focusable content | Blind, Mobility |
| 16 | Avoid aria-hidden on the document body element | Blind |
| 17 | Deprecated ARIA roles must not be used | Blind |
| 18 | ARIA attributes must match role specs | Blind |
| 19 | ARIA links, buttons, and menu items need accessible name | Blind |
| 20 | ARIA attributes must match role rules | Blind |
| 24 | ARIA toggle fields must have names | Blind |
| 29 | ARIA attribute values must be valid | Blind |
| 33 | Aria-braillelabel and brailleroledescription must be paired | Blind |
| 58 | ARIA dialog accessible name required | Blind |
| 59 | ARIA role values must be valid and never abstract | Blind |

**Key implementation pattern:**
```html
<!-- Every custom widget must have role + name + required state/properties -->
<div role="checkbox" aria-checked="false" aria-label="Subscribe to newsletter" tabindex="0">
  Subscribe
</div>
```

### Landmarks & Page Structure

| # | Topic | Disability |
|---|---|---|
| 22 | Complementary landmark at top level | Blind |
| 26 | Heading order must be hierarchical | Blind |
| 27 | Banner landmark must be top-level | Blind |
| 32 | Main landmark must be unique per page | Blind, Cognitive |
| 43 | Contentinfo landmark must be top-level | Blind |
| 53 | Landmarks: contain all page content | Blind |
| 55 | Unique landmark role/name combinations | Blind, Cognitive |
| 56 | Single banner landmark per page only | Blind |
| 57 | H1 heading must lead main content | Blind |
| 61 | Main landmark must be top-level only | Blind |

**Correct landmark structure:**
```html
<body>
  <header><!-- banner --></header>
  <nav><!-- navigation --></nav>
  <main>
    <h1>Page Title</h1>
    <!-- all primary content -->
  </main>
  <aside><!-- complementary --></aside>
  <footer><!-- contentinfo --></footer>
</body>
```

### Images & Alt Text

| # | Topic | Disability |
|---|---|---|
| 36 | Server-side image maps are not allowed | Blind |
| 37 | Alt text must not duplicate link text | Blind |
| 38 | Images need alt text or be decorative | Blind |

**Decision tree for alt text:**
- Is the image purely decorative? → `alt=""`
- Does the image convey information? → describe the *meaning*, not appearance
- Is the image a link/button? → describe the *destination/action*
- Is it a complex chart/diagram? → use `aria-describedby` with extended description

### Forms

| # | Topic | Disability |
|---|---|---|
| 39 | Avoid multiple labels on form fields | Blind |

### Tables

| # | Topic | Disability |
|---|---|---|
| 30 | Table headers must link to data cells | Blind |
| 41 | Correct scope attribute on tables | Blind |
| 48 | Table headers must have visible text | Blind |
| 54 | Table caption and summary cannot match | Blind, Hearing |

### Navigation & Keyboard

| # | Topic | Disability |
|---|---|---|
| 23 | Tabindex over 0 breaks logical focus | Mobility |
| 35 | Links with same accessible name must match purpose | Blind, Cognitive |
| 42 | Nested interactive controls must not include focusable items | Mobility |
| 62 | Distinguish links from surrounding text, not color alone | Blind, Cognitive |

### Language

| # | Topic | Disability |
|---|---|---|
| 44 | Valid lang attribute language codes | Blind |
| 45 | HTML lang and xml:lang must match | Blind |
| 51 | Lang attribute must have a valid value | Blind |
| 52 | HTML lang attribute needed on pages | Blind |

### IDs & Uniqueness

| # | Topic | Disability |
|---|---|---|
| 31 | Unique ID values for ARIA and labels | Blind, Cognitive |

### Frames

| # | Topic | Disability |
|---|---|---|
| 46 | Iframe titles must be unique and clear | Blind, Cognitive |
| 49 | Iframes focusable content must not use tabindex=-1 | Blind, Mobility |

### Lists

| # | Topic | Disability |
|---|---|---|
| 40 | Lists must contain only li elements | Blind |
| 60 | Definition lists must contain ordered dt then dd elements | Blind |

### Content & Media

| # | Topic | Disability |
|---|---|---|
| 2 | User-scalable=no must not disable zoom | Blind, Mobility |
| 3 | Meta refresh must not auto-refresh under 20 hours | Cognitive |
| 4 | Remove blinking and flashing content | Blind, Cognitive |
| 28 | Autoplay audio longer than 3s needs accessible controls | Hearing |

---

## Level AA Guides (Industry Standard — Legally Required)

| # | Topic | Disability |
|---|---|---|
| 21 | Buttons must have discernible text | Blind |
| 25 | Autocomplete must match input purpose | Cognitive |
| 34 | Touch target size and spacing rules (min 24×24px) | Mobility, Cognitive |
| 47 | Text color contrast must meet WCAG AA (4.5:1) | Blind |
| 50 | Input buttons require discernible text | Blind |
| [AA] | Resize Text — Text resizable to 200% without loss of content | Low Vision |
| [AA] | Images of Text — Text in images avoided except logos | Blind, Low Vision |
| [AA] | Reflow — Content reflows at 320px width (no horiz. scroll) | Low Vision |
| [AA] | Non-text Contrast — UI components 3:1 contrast | Low Vision |
| [AA] | Text Spacing — Supports overriding text spacing properties | Cognitive, Low Vision |
| [AA] | Content on Hover/Focus — Hoverable, dismissable, persistent | Low Vision |
| [AA] | Focus Appearance — Focus indicator meets minimum size/contrast | All |

### Contrast Ratios Quick Reference

| Content Type | Minimum Ratio | Level |
|---|---|---|
| Normal text (<18pt or <14pt bold) | 4.5:1 | AA |
| Large text (≥18pt or ≥14pt bold) | 3:1 | AA |
| UI components (buttons, inputs borders) | 3:1 | AA |
| Graphical objects (icons, charts) | 3:1 | AA |
| Normal text | 7:1 | AAA |
| Large text | 4.5:1 | AAA |

---

## Level AAA Guides (Aspirational — Not Required for AA Compliance)

| Topic | Disability |
|---|---|
| Sign Language (Prerecorded) | Deaf |
| Extended Audio Description | Blind |
| Media Alternative (Prerecorded) | Blind, Deaf |
| No Background Audio | Hearing |
| Low or No Background Audio | Hearing |
| Visual Presentation (text blocks max 80 chars, selectable colors) | Cognitive, Low Vision |
| Images of Text (No Exception) | Blind |
| Reflow at 320px (stricter) | Low Vision |
| Contrast (Enhanced) 7:1 | Blind |
| Text Spacing (stricter) | Cognitive |
| Interruptions controllable | Cognitive |
| No Timing (no time limits at all) | Cognitive, Mobility |
| Keyboard No Exception | Mobility |
| Location (breadcrumbs etc.) | Cognitive |
| Link Purpose (Link Only) | Blind |
| Section Headings | Blind, Cognitive |
| Unusual Words (glossary) | Cognitive |
| Reading Level | Cognitive |
| Pronunciation | Blind |
| Error Prevention (Legal/Financial) | Cognitive |
| Help (consistent) | Cognitive |
| Touch Target 44×44px | Mobility |

---

## Disability Area Quick Filter

### Blind
Criteria: 1.1.1, 1.2.x, 1.3.x, 2.4.x, 4.1.x, all ARIA rules, landmark rules, heading rules

### Low Vision  
Criteria: 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 1.4.13, 2.4.11, 2.4.12

### Deaf / Hard of Hearing
Criteria: 1.2.1, 1.2.2, 1.2.3, 1.2.5 (audio descriptions), 1.4.2

### Motor / Mobility
Criteria: 2.1.x (keyboard), 2.4.3 (focus order), 2.4.7 (focus visible), 2.5.x (input modalities), 2.5.5, 2.5.8

### Cognitive
Criteria: 1.3.5, 1.4.12, 2.2.x, 3.1.x, 3.2.x, 3.3.x, 2.4.5, 2.4.6

### Photosensitivity
Criteria: 2.3.1 (Three Flashes), 2.3.2 (Three Flashes — AAA)

---

## Testing Notes Per Category

### ARIA Testing
1. Use axe DevTools — catches ~80% of ARIA errors automatically
2. Test with NVDA+Firefox: navigate by heading (H key), landmark (D key), form (F key)
3. Verify interactive widget keyboard behavior matches WAI-ARIA Authoring Practices

### Color Contrast Testing  
1. Use WebAIM Contrast Checker for spot checks
2. Use automated browser extension for page-wide scan
3. Always verify text on gradient or image backgrounds manually

### Keyboard Testing Protocol
1. Open page, disconnect mouse
2. Tab through all interactive elements — verify each is reachable
3. Verify Enter/Space activate buttons; Enter activates links
4. Verify Escape closes modals/dropdowns
5. Verify arrow keys work inside composite widgets (menus, tabs, sliders)
6. Verify focus never disappears or gets trapped

### Screen Reader Testing Protocol (NVDA + Firefox)
1. NVDA+F7 — Elements List (check headings structure)
2. NVDA+Space — Browse/Forms mode toggle
3. Navigate by landmark (D), heading (H), link (K)
4. Tab through form — verify all labels announced
5. Open modal — verify focus moves inside, trapped, announced as dialog
6. Check live regions (ARIA live) announce dynamic content changes
