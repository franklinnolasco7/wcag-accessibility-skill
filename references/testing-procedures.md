# Accessibility Testing Procedures

> Manual testing guide for comprehensive WCAG 2.2 compliance verification

## When to load this file

Load when the user needs step-by-step testing instructions: keyboard testing,
screen reader commands (NVDA, JAWS, VoiceOver, TalkBack), contrast verification,
color blindness simulation, cognitive review, motion testing, mobile AT, or PDF
accessibility. Also load when setting up a QA process or documenting test methodology.

Do not load for code implementation questions — SKILL.md covers those.

---

## 1. Keyboard-Only Testing

**Setup**: Unplug or disable your mouse/trackpad. Use keyboard only.

**Core Keys:**
| Key | Action |
|---|---|
| Tab | Move to next focusable element |
| Shift + Tab | Move to previous focusable element |
| Enter | Activate links, buttons |
| Space | Toggle checkboxes, activate buttons, scroll |
| Escape | Close modals, dropdowns, tooltips |
| Arrow Keys | Navigate within menus, tabs, sliders, radio groups |
| Home / End | Jump to start/end of lists |
| Page Up / Page Down | Scroll, navigate through date pickers |

**Test Procedure:**
1. Start at the top of the page (address bar, then Tab into page)
2. Tab through every interactive element
3. Verify each element receives visible focus indicator
4. Verify each element can be activated (Enter/Space)
5. Open and close every modal, dropdown, tooltip via keyboard
6. Complete any forms entirely via keyboard
7. Verify focus is never lost or trapped (except intentional modal trap)
8. Confirm focus returns to trigger element after closing modal/popup

**Pass Criteria:**
- [ ] All functionality achievable without mouse
- [ ] Focus indicator always visible
- [ ] No keyboard traps (can always Tab out of any area)
- [ ] Logical tab order matches visual layout

---

## 2. Screen Reader Testing

### Setup: NVDA + Firefox (recommended free option)

**Download:** https://www.nvaccess.org/download/  
**Version tested:** NVDA 2024.x + Firefox latest

**Key NVDA Commands:**
| Command | Action |
|---|---|
| NVDA + F7 | Open Elements List (headings, links, landmarks) |
| NVDA + Space | Toggle Browse/Forms mode |
| H | Next heading |
| Shift + H | Previous heading |
| 1-6 | Jump to heading level 1-6 |
| D | Next landmark/region |
| K | Next link |
| B | Next button |
| F | Next form field |
| T | Next table |
| G | Next graphic |
| NVDA + Down | Read entire page from cursor |
| NVDA + Tab | Report current focus |
| NVDA + F1 | Help |

**Test Procedure:**
1. Open page with NVDA running
2. Press NVDA+F7 → Headings tab → verify heading structure makes sense
3. Press NVDA+F7 → Landmarks tab → verify page regions are present
4. Read page top-to-bottom (NVDA+Down) — verify reading order is logical
5. Tab through all interactive elements — verify each is announced correctly
6. Fill out any forms — verify labels are announced, errors are clear
7. Open modals — verify focus moves inside, dialog is announced
8. Test any dynamic content (live regions announce updates)

**JAWS + Chrome (enterprise standard):**
Commands are similar to NVDA. Key differences:
- Insert replaces NVDA key
- JAWS+F7 for links list, JAWS+F6 for headings

**VoiceOver + Safari (macOS/iOS):**
- macOS: Command+F5 to toggle
- VO = Control+Option (held together)
- VO+U: Rotor (equivalent to NVDA elements list)
- VO+Right/Left: Navigate elements

---

## 3. Color Contrast Testing

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Inspect element → Styles → Color picker shows contrast
- axe DevTools browser extension: automated scan
- Colour Contrast Analyser (desktop app by TPGi): https://www.tpgi.com/color-contrast-checker/

**Manual Procedure:**
1. For each text element, identify foreground and background colors
2. For text on gradients or images: test the worst-case area
3. Calculate ratio using tool
4. Record: element, foreground color, background color, ratio, pass/fail

**Thresholds:**
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (≥18pt, or ≥14pt bold): 3:1 minimum (WCAG AA)
- UI components (button borders, input outlines): 3:1 minimum
- Focus indicators: 3:1 against adjacent colors (WCAG 2.2 AA)
- Decorative text: exempt
- Logos: exempt

**Special Cases:**
- Text in images: same rules apply, but harder to measure
- Placeholder text: must also meet contrast requirements
- Disabled controls: technically exempt, but avoid very low contrast

---

## 4. Zoom & Reflow Testing

**Procedure:**
1. Set browser zoom to 200% — verify text scales, no content hidden
2. Set browser zoom to 400% — verify content reflows to single column (no horizontal scrolling)
3. Test at 1280px viewport width at 400% zoom (equivalent to 320px CSS pixels)

**Pass Criteria:**
- [ ] All content accessible at 200% zoom
- [ ] At 400% zoom: content reflows, no two-dimensional scrolling required
- [ ] All functionality available at all zoom levels

---

## 5. Color-Only Information Testing

**Procedure:**
1. Use browser DevTools to render page in grayscale (or use color blindness simulator)
2. Identify any information conveyed only through color:
   - Error states (red = error)
   - Link differentiation (color only, no underline)
   - Required field indicators (red asterisk without text label)
   - Chart/graph data series

**Pass Criteria:**
- [ ] All information distinguishable without color
- [ ] Links distinguishable from text via underline, weight, or other non-color indicator
- [ ] Required fields indicated with text (not just color)
- [ ] Charts use patterns/labels not just color coding

---

## 6. Cognitive Accessibility Testing

**Manual Checklist:**
- [ ] All instructions in plain language (≤8th grade reading level)
- [ ] Page title is descriptive (not just "Home" or "Page 1")
- [ ] Consistent navigation across all pages
- [ ] No content that auto-updates (or user can pause/stop it)
- [ ] Form errors: specific message per field, suggestion for correction
- [ ] No time limits (or user can extend them)
- [ ] Complex processes have clear step indicators
- [ ] Consistent icon meaning across site
- [ ] No surprise navigation (target opens in new tab? User is warned)

**Tools:**
- Hemingway App: https://hemingwayapp.com/ (readability scoring)
- Wave: visual overlay shows structure issues

---

## 7. Motion & Animation Testing

**Procedure:**
1. Enable OS "Reduce Motion" setting:
   - macOS: System Settings → Accessibility → Display → Reduce Motion
   - Windows: Settings → Ease of Access → Display → Show animations
   - iOS: Settings → Accessibility → Motion → Reduce Motion
2. Reload page — verify animations stop or reduce

**Pass Criteria:**
- [ ] `prefers-reduced-motion` media query respected in CSS
- [ ] No content flashes more than 3 times/second
- [ ] Parallax and decorative animations disabled when reduce motion is on
- [ ] Essential animations still work (loading spinners, progress bars)

CSS implementation:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Mobile Accessibility Testing

**Touch Target Size:**
- Minimum 24×24 CSS px (WCAG 2.2 AA)
- Recommended 44×44 CSS px (Apple HIG, WCAG AAA)
- Verify with browser DevTools device emulation

**VoiceOver on iOS:**
- Settings → Accessibility → VoiceOver → On
- Single tap: focus element (VoiceOver reads it)
- Double tap: activate focused element
- Three-finger swipe: scroll
- Swipe right/left: next/previous element
- Two-finger Z: escape/go back

**TalkBack on Android:**
- Settings → Accessibility → TalkBack → On
- Same gesture set as iOS VoiceOver approximately

**iOS Swipe Navigation Test:**
1. Enable VoiceOver
2. Swipe right through entire page
3. Verify every element is announced logically
4. Verify reading order matches visual order
5. Test all interactive elements via double-tap activation

---

## 9. PDF Accessibility Testing

**Tools:**
- Adobe Acrobat Pro: Accessibility Checker (built-in)
- PAC 2024 (free): https://pac.pdf-accessibility.org/en
- CommonLook PDF Validator (paid)

**Key PDF Requirements:**
- Document must be tagged (structure tags for headings, paragraphs, tables, lists)
- Reading order must match visual order (check Order panel in Acrobat)
- All images need Alt text in Object Properties
- Tables must have header cells marked
- Form fields must have tooltips (equivalent to HTML labels)
- Document language must be set
- Document title in metadata must be set

**Test Procedure:**
1. Open PDF in Adobe Acrobat
2. Tools → Accessibility → Full Check → Run
3. Review all failures and warnings
4. Check Tags panel: verify proper tag structure
5. Check Order panel: verify logical reading order
6. Open with NVDA: Tab through, verify all content accessible

---

## 10. VPAT/ACR Testing Methodology

When producing a VPAT, document your testing methodology:

```
Testing Methodology:
- Automated: axe-core v4.x, WAVE (browser extension)
- Manual keyboard: Chrome 120, Windows 11
- Screen reader: NVDA 2024.1 + Firefox 121
- Screen reader: JAWS 2024 + Chrome 120
- Mobile: VoiceOver + Safari (iOS 17), TalkBack + Chrome (Android 14)
- Color contrast: Colour Contrast Analyser 3.2
- Zoom: Tested at 100%, 200%, 400%
- Testing date: [Date]
- Product version: [Version]
- Pages/flows tested: [List]
```

---

## Quick Reference: Common Test Failures & Fixes

| Issue Found | WCAG Criterion | Quick Fix |
|---|---|---|
| Image missing alt text | 1.1.1 (A) | Add `alt="description"` or `alt=""` |
| Color contrast fails | 1.4.3 (AA) | Darken text or lighten background |
| Missing form label | 1.3.1 (A) | Add `<label for="id">` |
| Focus indicator missing | 2.4.7 (AA) | Add CSS `:focus { outline: 2px solid; }` |
| Keyboard trap | 2.1.1 (A) | Fix JS event handlers, ensure Escape works |
| Missing skip link | 2.4.1 (A) | Add `<a href="#main">Skip to main</a>` as first element |
| No page title | 2.4.2 (A) | Add descriptive `<title>` to `<head>` |
| Auto-playing video | 1.4.2 (A) | Add pause/stop controls |
| Missing captions | 1.2.2 (AA) | Add synchronized captions to video |
| Bad heading order | 1.3.1 (A) | Fix heading hierarchy, don't skip levels |
| Opens new tab without warning | 3.2.2 (A) | Add "(opens in new tab)" to link text |
| Error not associated with field | 3.3.1 (A) | Use `aria-describedby` to link error to input |
