# WCAG 2.2 Quick Reference

A condensed lookup table for the most frequently cited success criteria.
For full criterion text and techniques, see the W3C specification at
https://www.w3.org/TR/WCAG22/

Load this file when a user needs a fast criterion lookup without the full
91-guide coverage in `wcag-guides-full.md`.

---

## Level A — Minimum Baseline

| SC     | Title                          | What Fails                                                 |
|--------|--------------------------------|------------------------------------------------------------|
| 1.1.1  | Non-text Content               | Images missing alt attribute or with meaningless alt text  |
| 1.3.1  | Info and Relationships         | Visual structure not in markup (headings as styled divs)   |
| 1.3.2  | Meaningful Sequence            | Reading order in DOM differs from visual order             |
| 1.3.3  | Sensory Characteristics        | Instructions rely on shape, color, location alone          |
| 1.4.1  | Use of Color                   | Color is the only way to convey information                |
| 1.4.2  | Audio Control                  | Autoplay audio >3s with no accessible pause control        |
| 2.1.1  | Keyboard                       | Any functionality unreachable via keyboard                 |
| 2.1.2  | No Keyboard Trap               | Focus enters a component and cannot leave via keyboard     |
| 2.2.1  | Timing Adjustable              | Time limits with no way to extend or disable               |
| 2.3.1  | Three Flashes or Below         | Content flashes >3 times/second                            |
| 2.4.1  | Bypass Blocks                  | No skip link or landmark structure to bypass nav           |
| 2.4.2  | Page Titled                    | `<title>` absent or non-descriptive                        |
| 2.4.3  | Focus Order                    | Tab order does not follow logical reading order            |
| 2.4.4  | Link Purpose (In Context)      | "Click here" links with no contextual label                |
| 3.1.1  | Language of Page               | Missing or incorrect `lang` attribute on `<html>`          |
| 3.2.1  | On Focus                       | Component triggers context change when focused             |
| 3.2.2  | On Input                       | Form field change triggers navigation without warning      |
| 3.3.1  | Error Identification            | Errors not identified or described in text                 |
| 3.3.2  | Labels or Instructions         | Forms provide no instructions or labels                    |
| 4.1.1  | Parsing                        | Duplicate IDs; unclosed tags                               |
| 4.1.2  | Name, Role, Value              | Custom widgets missing ARIA roles, states, properties      |

---

## Level AA — Legal Standard

| SC     | Title                          | What Fails                                                 |
|--------|--------------------------------|------------------------------------------------------------|
| 1.3.4  | Orientation                    | Content locked to one screen orientation without reason    |
| 1.3.5  | Identify Input Purpose         | Personal data fields missing `autocomplete` attribute      |
| 1.4.3  | Contrast (Minimum)             | Normal text <4.5:1; large text <3:1                        |
| 1.4.4  | Resize Text                    | Text cannot resize to 200% without loss of content         |
| 1.4.5  | Images of Text                 | Text rendered as image when CSS could achieve the same     |
| 1.4.10 | Reflow                         | Content requires horizontal scroll at 320px width          |
| 1.4.11 | Non-text Contrast              | UI component or graphical object contrast <3:1             |
| 1.4.12 | Text Spacing                   | Content breaks when line-height, letter/word spacing set   |
| 1.4.13 | Content on Hover or Focus      | Tooltip/popup not dismissible, hoverable, or persistent    |
| 2.4.5  | Multiple Ways                  | Only one way to locate a page within a site                |
| 2.4.6  | Headings and Labels            | Headings or labels do not describe content or purpose      |
| 2.4.7  | Focus Visible                  | Keyboard focus indicator not visible                       |
| 2.4.11 | Focus Not Obscured (Min)       | Focused component fully hidden by sticky header/footer     |
| 2.5.3  | Label in Name                  | Accessible name does not contain the visible label text    |
| 2.5.4  | Motion Actuation               | Functions triggered by device motion with no alternative   |
| 2.5.7  | Dragging Movements             | Drag operations have no single-pointer alternative         |
| 2.5.8  | Target Size (Minimum)          | Touch targets <24x24 CSS px without adequate spacing       |
| 3.1.2  | Language of Parts              | Language changes in content not marked with `lang`         |
| 3.2.3  | Consistent Navigation          | Navigation order changes across pages                      |
| 3.2.4  | Consistent Identification      | Components with same function identified differently       |
| 3.3.3  | Error Suggestion               | Errors detected but no correction suggestion provided      |
| 3.3.4  | Error Prevention (Legal etc.)  | Legal/financial submissions not reversible or confirmable  |
| 4.1.3  | Status Messages                | Status messages not programmatically determinable          |

---

## Contrast Ratios at a Glance

| Text Type                        | AA Minimum | AAA Target |
|----------------------------------|------------|------------|
| Normal text (<18pt, <14pt bold)  | 4.5:1      | 7.0:1      |
| Large text (>=18pt or >=14pt bold)| 3.0:1     | 4.5:1      |
| UI components, graphical objects  | 3.0:1      | —          |

---

## ARIA Widget Role Requirements

Common roles and their mandatory states. An accessible name is required
on every widget role — supply via `aria-label` or `aria-labelledby` when
no visible label is present.

| Role          | Required ARIA Attributes             | Notes                              |
|---------------|--------------------------------------|------------------------------------|
| checkbox      | aria-checked                         | Use `<input type="checkbox">` when possible |
| combobox      | aria-expanded, aria-controls         | Must own or control a listbox      |
| dialog        | aria-modal (strongly recommended)    | Requires accessible name           |
| listbox       | —                                    | Must contain option roles          |
| menu          | —                                    | Must contain menuitem roles        |
| menuitemcheckbox | aria-checked                      |                                    |
| menuitemradio | aria-checked                         |                                    |
| option        | aria-selected                        |                                    |
| progressbar   | aria-valuenow (or aria-valuetext)    | aria-valuemin/max recommended      |
| radio         | aria-checked                         | Use `<input type="radio">` when possible |
| scrollbar     | aria-controls, aria-valuenow, aria-valuemin, aria-valuemax | |
| slider        | aria-valuenow, aria-valuemin, aria-valuemax |                          |
| spinbutton    | aria-valuenow, aria-valuemin, aria-valuemax |                          |
| switch        | aria-checked                         |                                    |
| tab           | aria-selected                        | Must be inside tablist             |
| tablist       | —                                    | Must contain tab roles             |
| tabpanel      | —                                    | Requires accessible name           |
| tooltip       | —                                    | Triggered by focus or hover        |
| treeitem      | aria-expanded (when has children)    |                                    |

---

## Common Mistakes Reference

| Mistake | Criterion | Correct Approach |
|---------|-----------|------------------|
| `role="presentation"` on button | 4.1.2 | Remove role; use native element semantics |
| `tabindex="1"` or higher | 2.4.3 | Use `tabindex="0"` or rely on source order |
| `aria-label` duplicates visible text | 2.5.3 | Ensure accessible name includes visible label text |
| `outline: none` with no replacement | 2.4.7 | Provide custom focus indicator with sufficient contrast |
| Placeholder as only label | 1.3.1 | Add persistent `<label>` element |
| `aria-hidden` on parent of `<input>` | 4.1.2 | Move aria-hidden to decorative elements only |
| `<div>` click handler, no keyboard event | 2.1.1 | Use `<button>` or add `keydown`/`keyup` handler |
| `<table>` without `scope` on `<th>` | 1.3.1 | Add `scope="col"` or `scope="row"` |
| Icon link with no text or aria-label | 2.4.4 | Add `aria-label` describing destination |
| `lang` attribute missing | 3.1.1 | `<html lang="en">` (or correct BCP 47 code) |
