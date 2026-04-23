# Task Prompts

Realistic accessibility tasks for qualitative skill review.

## Code Implementation Tasks

### Accessible Button Component
"Write a button component in React that has an icon but is accessible. Use an SVG for the icon."

**Expected**: Button with `aria-label` or accessible text, SVG with `aria-hidden="true"`. Should cite WCAG 2.1 SC 4.1.2 (Name, Role, Value).

### Form Field with Label
"Create an accessible email input field with a label and autocomplete attribute."

**Expected**: `<label for="...">` + `<input id="..." autocomplete="email">`. Should mention WCAG 1.3.1 (Info and Relationships) and 1.3.5 (Identify Input Purpose).

### Modal Dialog
"Build an accessible modal dialog that traps focus and closes on Escape."

**Expected**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap implementation, Escape key handler. Should cite WCAG 2.1 SC 2.1.2 (No Keyboard Trap) and SC 4.1.2. Should warn that `aria-modal` alone is insufficient — JS focus management is required.

### Data Table
"Mark up a data table with row and column headers."

**Expected**: `<th scope="col">` / `<th scope="row">`, `<caption>`, proper header-data cell association.

### Skip Link
"Add a skip navigation link that works."

**Expected**: First link in `<body>`, href targets main content, visible on focus. Should cite SC 2.4.1 (Bypass Blocks).

## Testing Tasks

### Keyboard Navigation Test
"Write a keyboard testing procedure for a navigation menu."

**Expected**: Tab through links, Enter/Space activate, Arrow keys for submenus, Escape closes, focus visible throughout.

### Screen Reader Test
"How do I test with NVDA?"

**Expected**: Steps to configure NVDA, navigate by headings, landmarks, form fields; check reading order, announced labels. Should reference `references/testing-procedures.md`.

### Color Contrast Test
"How do I test color contrast on my dark theme?"

**Expected**: DevTools accessibility panel, WebAIM contrast checker, explain 4.5:1 ratio for normal text. Should mention `scripts/contrast-check.js` for batch checking.

## Compliance Tasks

### VPAT Completion
"How do I complete a VPAT for my SaaS product?"

**Expected**: Explain VPAT structure, conformance levels, testing methodology documentation. Should reference `references/vpat-template-guide.md`.

### Section 508 Compliance
"What does Section 508 require for a federal government website?"

**Expected**: WCAG 2.0 AA minimum, specific provisions for ICT, procurement implications.

### WCAG 2.2 New Criteria
"What are the new success criteria in WCAG 2.2?"

**Expected**: 2.5.1, 2.5.5, 2.5.6, 2.5.7, 2.5.8 (Dragging Movements, Target Size, Concurrent Input Mechanisms, Pointer Gestures, Motion Actuation).

### EAA Deadline
"What is the European Accessibility Act deadline and who does it affect?"

**Expected**: June 28, 2025 compliance deadline. Applies to private sector companies selling in the EU. References EN 301 549. Should note EAA scope differs from Section 508.

## Troubleshooting Tasks

### Alt Text Review
"My alt text passes automated scans but screen readers say 'image'. What's wrong?"

**Expected**: Explain that scans check presence, not quality; alt text "image.png" is technically present but meaningless.

### Keyboard Trap
"My modal traps keyboard focus but I can't exit. Help."

**Expected**: Focus must return to triggering element on close; no keyboard trap allowed per SC 2.1.2.

### Mobile Accessibility
"Why does my touch target fail on mobile?"

**Expected**: Check 24×24 minimum, spacing between targets, touch action CSS properties. Should cite SC 2.5.8.

## Should Not Trigger (Negative Cases)

These prompts must not activate the skill — they are out of scope:

- "How do I set up a Docker container?"
- "Write a SQL query to join two tables."
- "What is the capital of France?"
- "How do I implement OAuth?"
- "Parse a JSON response from an API."
- "What is the best JavaScript framework for a dashboard?"

---

_Review criteria: Does the skill provide specific WCAG criterion numbers, actionable code, and honest limitations?_

## Failure Mode Tasks (Skill Must Push Back)

These prompts contain a wrong assumption the skill must correct, not just answer.

### Scan = compliant
"We ran Lighthouse and got 100 accessibility score. We're good to ship."

**Expected**: Explain that Lighthouse measures ~30% of WCAG criteria. A 100 Lighthouse
score means no detectable automated violations — not full compliance. Manual keyboard
testing and screen reader testing are still required. Should cite specific categories
automated tools miss (alt text quality, keyboard traps, screen reader UX).

### aria-modal is enough
"I added `aria-modal='true'` to my dialog. Is that all I need?"

**Expected**: No. `aria-modal` signals to AT that background content is inert, but
browser/AT support is inconsistent. JavaScript focus management is always required:
move focus into the dialog on open, trap it inside, return to trigger on close.
Should cite SC 2.1.2 (No Keyboard Trap) and SC 4.1.2.

### Placeholder as label
"I'm using placeholder text as the label for my inputs. Is that okay?"

**Expected**: No. Placeholder disappears on input, fails SC 1.3.1 (Info and Relationships),
and has poor contrast in most browser defaults. A persistent visible `<label>` is required.

### alt text presence = good alt text
"Our audit tool shows all images have alt text. We're compliant on 1.1.1."

**Expected**: Automated tools check that `alt` exists, not that it is meaningful.
`alt="image.png"` or `alt="photo"` passes the scan but fails a real audit.
Quality of alt text must be reviewed manually.

### tabindex for ordering
"I'm using tabindex values like 1, 2, 3 to control tab order on my page."

**Expected**: `tabindex` values above 0 override the natural DOM order globally,
creating unpredictable focus behavior and failing SC 2.4.3 (Focus Order). The correct
fix is to reorder elements in the DOM to match the intended visual/logical order.
