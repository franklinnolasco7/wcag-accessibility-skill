# WCAG Accessibility Glossary

> Source: https://www.adacompliancepros.com/wcag-glossary  
> 63 terms defined — jargon-free reference for audits, compliance reports, and development

## When to load this file

Load when the user asks what a term means or when a response would use jargon
(ACR, AT, VPAT, POUR, conformance level, etc.) that needs defining for context.
Do not load for implementation or code questions — SKILL.md covers those.

---

## A

**A11Y**  
A numeronym for "accessibility" — the 11 letters between A and Y. Used in developer communities as shorthand. Pronounced "a-eleven-y" or "ally."

**Accessibility Audit**  
A structured evaluation of digital products (websites, apps, documents) to identify barriers that prevent users with disabilities from accessing content. Can be automated, manual, or a hybrid of both. Produces a report with findings, severity ratings, and remediation guidance.

**Accessibility Conformance Report (ACR)**  
A document detailing how well a digital product meets accessibility standards, typically based on a VPAT template. Required in enterprise procurement and government contracting. See also: VPAT.

**Accessibility Remediation**  
The process of modifying digital content — HTML, CSS, JavaScript, PDFs, documents — so it meets accessibility standards like WCAG. Can range from adding alt text to complete interface redesigns.

**Accessibility Statement**  
A public declaration that a website or application is designed to be usable by people with disabilities. Typically includes the standard(s) targeted, known limitations, contact info for reporting issues, and last audit date. Required by EN 301 549 (EU) and recommended best practice globally.

**Accessibility Testing**  
Evaluating whether digital content is usable by people with disabilities. Includes automated scanning, manual keyboard/screen reader testing, and user testing with people with disabilities.

**Accessible Design**  
A design approach that creates environments, products, and services usable for all people, including those with disabilities, without requiring special adaptation. Distinguished from retrofitting (fixing after the fact).

**Alt Text**  
A written description of an image included in HTML via the `alt` attribute. Used by screen readers to communicate image content to blind users. Also improves SEO. Decorative images should have `alt=""` (empty, not missing). Required by WCAG 1.1.1.

**ARIA (Accessible Rich Internet Applications)**  
A W3C specification (WAI-ARIA) that adds attributes to HTML elements to improve assistive technology support. Adds roles (`role="dialog"`), states (`aria-expanded="true"`), and properties (`aria-label="Close"`). First rule of ARIA: don't use ARIA if native HTML semantics will do.

**Assistive Listening Devices**  
Technologies that improve audio clarity for people with hearing loss, including hearing loops (telecoils), FM systems, and infrared systems. Common in theaters, places of worship, and courtrooms.

**Assistive Technology (AT)**  
Any device, software, or equipment that helps individuals with disabilities perform tasks. Examples: screen readers (NVDA, JAWS, VoiceOver), braille displays, switch access devices, voice control software (Dragon NaturallySpeaking), magnification software.

**Audio Accessibility**  
Designing and delivering audio content to ensure equitable access for all users, including those who are deaf or hard of hearing. Includes captions, transcripts, and avoiding audio-only information delivery.

---

## B

**Blindness**  
The loss of vision that cannot be fully corrected with standard lenses or treatment. "Legal blindness" in the US is defined as visual acuity of 20/200 or less in the better eye with correction, or a visual field of 20 degrees or less. Web accessibility for blind users primarily relies on screen readers.

**Braille**  
A tactile writing system using raised dots arranged in cells to represent letters, numbers, and punctuation. Used by people who are blind or have severe vision impairments. Refreshable Braille displays can render digital text as Braille output. WCAG does not directly require Braille output but screen reader compatibility enables it.

---

## C

**Closed Captions**  
On-screen text descriptions of a video's audio content that can be toggled on or off by the viewer. Includes spoken dialogue and non-speech audio (e.g., "[phone ringing]", "[applause]"). Required for prerecorded video with audio under WCAG 1.2.2 (Level AA). Distinguished from open captions (burned into video, always visible).

**Cochlear Implant**  
A medical device that bypasses damaged parts of the inner ear to directly stimulate the auditory nerve, providing a sense of sound to those with severe to profound hearing loss. Not equivalent to normal hearing; users may still rely on captions and transcripts.

**Cognitive Accessibility**  
Designing and developing digital content to be usable by people who have difficulty processing information, including those with dyslexia, ADHD, autism, traumatic brain injury, dementia, or anxiety. Key principles: plain language, consistent navigation, clear error messages, no time pressure, minimal distractions.

**Color Blindness**  
A visual condition where a person has difficulty distinguishing certain colors, most commonly red-green (affects ~8% of men, ~0.5% of women). Does not mean seeing in black and white. WCAG requires information is not conveyed by color alone (SC 1.4.1).

**Color Contrast**  
The visual difference in brightness (luminance) between foreground content (text, icons) and its background. Measured as a ratio from 1:1 (identical) to 21:1 (black on white). WCAG requires 4.5:1 for normal text (Level AA) and 3:1 for large text and UI components.

---

## D

**Deaf Culture**  
The collective identity, language, values, and traditions shared by people who are deaf and use sign language as their primary language. Members of Deaf culture often do not view deafness as a disability but as a cultural identity. Represented by the capital-D "Deaf."

**Deaf vs. deaf**  
"Deaf" (capital D) refers to cultural identity within the Deaf community with shared language and values. "deaf" (lowercase d) refers to the audiological condition of having significant hearing loss, without implying cultural affiliation.

**Deafness**  
A profound or near-total loss of hearing that significantly limits perception of linguistic information through sound alone. Accessibility approaches include captions, transcripts, and sign language interpretation.

**Digital Accessibility**  
Making all digital content and technology — websites, apps, documents, hardware, kiosks — usable by people with disabilities. Governed by standards including WCAG, Section 508, and the European Accessibility Act.

**Disability**  
Under the ADA: a physical or mental impairment that substantially limits one or more major life activities, a record of such an impairment, or being regarded as having such an impairment. Broader social model: disability is created by the interaction between a person's condition and barriers in the environment.

**Diversity, Equity, and Inclusion (DEI)**  
Guiding principles that help organizations create fair, respectful, and inclusive environments for people of all backgrounds, abilities, and identities. Accessibility is a core component of disability equity within DEI frameworks.

**Document Remediation**  
Making digital documents (PDF, Word, PowerPoint, Excel) accessible to people with disabilities using assistive technologies. Includes: tagged PDF structure, reading order, alt text for images, accessible tables, form fields, and metadata.

---

## E

**ESG (Environmental, Social, and Governance)**  
Criteria used to assess a company's sustainability and ethical impact. Accessibility falls under the Social component as it relates to equitable treatment of people with disabilities. Increasingly relevant in investor reporting and corporate responsibility frameworks.

---

## H

**Hard of Hearing**  
Individuals who experience partial hearing loss ranging from mild to severe. May use hearing aids, cochlear implants, lip-reading, and captions. Distinguished from Deaf (profound loss or cultural identity).

**Hearing Aid**  
A small electronic device worn in or behind the ear that amplifies sound for people with hearing loss. Does not restore normal hearing. Many hearing aids include telecoil (T-coil) technology that works with hearing loop systems.

**Hearing Impairment**  
A reduced or total loss of hearing in one or both ears. Umbrella term covering the full spectrum from mild to profound hearing loss. "Hearing loss" is the preferred clinical term; Deaf culture advocates often prefer "deaf" or "Deaf."

---

## I

**Inclusive Design**  
A design methodology that considers the full range of human diversity — ability, language, culture, age, other dimensions — from the beginning of the design process. Goes beyond compliance: aims to design products that work for everyone by default, not as an accommodation.

**Inclusivity**  
Creating digital content and interfaces usable by the broadest possible range of people. In web development: semantic HTML, keyboard accessibility, captions, sufficient contrast, responsive layouts, plain language.

**Input Assistance**  
Strategies that help users avoid, identify, and correct errors when interacting with web forms. WCAG Guideline 3.3. Includes: describing errors in text, suggesting corrections, preventing errors on legal/financial transactions.

**Input Devices**  
Hardware tools used to send data and commands to a digital system. Accessibility requires support for diverse input devices: keyboards, mice, touchscreens, eye trackers, switch access, voice control, head pointers, joysticks.

**Invisible Disability**  
A chronic condition that limits daily activities but is not immediately apparent to others. Examples: chronic pain, fibromyalgia, diabetes, epilepsy, ADHD, dyslexia, mental health conditions. Users may have significant accessibility needs despite no visible indicators.

---

## J

**JAWS (Job Access With Speech)**  
The most widely used commercial screen reader for Windows. Converts digital text and interface elements into speech or Braille display output. Commonly used with Internet Explorer, Chrome, and Firefox. Standard testing environment for enterprise and government accessibility audits.

---

## K

**Keyboard Navigation**  
Interacting with digital interfaces using only a keyboard (no mouse). Essential for users who cannot use a mouse due to motor impairments, and also used by screen reader users and power users. WCAG 2.1 requires all functionality available via keyboard (SC 2.1.1). Testing: Tab (next), Shift+Tab (previous), Enter (activate), Space (toggle/scroll), Escape (dismiss), Arrow keys (within components).

---

## L

**Lip-Reading (Speechreading)**  
Understanding spoken words by visually interpreting mouth movements, facial expressions, and tongue positions. Used by some deaf and hard-of-hearing people to supplement hearing. Video calls and recorded video should ensure the speaker's face is clearly visible and well-lit.

**Low Vision**  
A level of vision loss that cannot be fully corrected with standard lenses but retains some usable vision. Users may rely on screen magnification, high contrast modes, larger text, and specialized display settings. WCAG AA requires text resizable to 200% and sufficient contrast.

---

## M

**Motor Impairment**  
Reduced or limited use of limbs or body parts affecting the ability to operate standard input devices like a keyboard or mouse. Includes conditions like ALS, cerebral palsy, muscular dystrophy, repetitive strain injury, Parkinson's, and paralysis. Accessibility approaches: keyboard accessibility, switch access, voice control, adequate touch target sizes.

---

## N

**NVDA (NonVisual Desktop Access)**  
A free, open-source screen reader for Windows developed by NV Access. Widely used and the standard free alternative to JAWS. Works with Firefox, Chrome, and Office applications. The primary free testing tool for web accessibility.

---

## P

**Person with Disability**  
Person-first language that emphasizes the individual before the disability. Used in US legal and policy contexts (ADA language). Note: many in the Deaf community and disability rights movement prefer identity-first language ("disabled person"). Follow individual preferences when known.

**Photosensitivity**  
Sensitivity to light, particularly flashing or flickering stimuli, that can trigger seizures in people with photosensitive epilepsy. WCAG 2.3.1 requires no content flash more than 3 times per second. Affects approximately 1 in 4,000 people.

**Public Accommodation**  
Under ADA Title III, a private entity that operates a place of business open to the public. Courts have increasingly held that websites of businesses with physical locations — and sometimes websites alone — constitute places of public accommodation subject to ADA requirements.

---

## R

**Readability**  
How easy text is to read and understand. Affected by: font size, line length, line spacing, contrast, plain language, reading level. WCAG 3.1.5 (AAA) suggests content should not require above lower secondary education reading level.

**Reasonable Accommodation**  
Under the ADA, a modification or adjustment made to enable a qualified person with a disability to enjoy equal access to employment, programs, or services. For websites: providing accessible alternatives, not just redirecting users to call a phone number.

**Reasonable Adjustment**  
UK/EU equivalent of "reasonable accommodation." Under the Equality Act 2010 (UK) and similar EU member state laws, organizations must make reasonable adjustments to prevent disabled people from being substantially disadvantaged.

---

## S

**Screen Reader**  
Software that converts digital text and interface elements into synthesized speech or Braille display output. Used primarily by blind and low-vision users. Major screen readers: JAWS (Windows, paid), NVDA (Windows, free), VoiceOver (macOS/iOS, built-in), TalkBack (Android, built-in), Narrator (Windows, built-in).

**Sign Language**  
A visual-gestural language using hand shapes, movement, facial expressions, and body posture. Different from spoken language and country-specific (ASL in US, BSL in UK, etc.). WCAG 1.2.6 (AAA) recommends sign language interpretation for prerecorded audio content.

**Speech Recognition**  
Technology that converts spoken language into text or system commands. Used by people with motor impairments to control computers and devices. Dragon NaturallySpeaking is the leading commercial product. Web content must be keyboard accessible to support speech recognition use.

---

## U

**Usability**  
The degree to which a product can be used by specified users to achieve specified goals effectively, efficiently, and with satisfaction. Accessibility is a prerequisite for usability for users with disabilities — an inaccessible product cannot be usable.

**User Testing**  
Evaluating a product's usability by observing real users attempting to complete tasks. In accessibility: involves participants with disabilities using their own assistive technologies in their real workflow. Catches issues that automated and even expert manual testing misses.

---

## V

**Video Accessibility**  
Ensuring video content is accessible to users who are deaf/hard of hearing (captions, transcripts) and blind/low-vision (audio descriptions). WCAG 1.2.x covers captions (AA), transcripts (A), audio descriptions (AA), and extended descriptions (AAA).

**Vision Impairment**  
A broad term for any condition that reduces visual acuity or visual field, ranging from mild to total blindness. Includes refractive errors (correctable), low vision (not fully correctable), and blindness.

**Visual Alerting Devices**  
Devices that use visual signals (flashing lights, vibration) instead of audio to alert people who are deaf or hard of hearing. Examples: doorbell signalers, alarm clocks, TTY ringers, smoke alarm strobes.

**Voice User Input**  
Using voice commands to control devices and software. Includes both built-in OS voice control (Windows Speech Recognition, macOS Voice Control) and specialized software (Dragon NaturallySpeaking). Requires keyboard accessibility and clear, consistent labeling.

---

## W

**W3C (World Wide Web Consortium)**  
The main international standards organization for the web. Develops WCAG, ARIA, and other web standards. The Web Accessibility Initiative (WAI) is the W3C group responsible for accessibility standards.

**WCAG (Web Content Accessibility Guidelines)**  
Technical specifications developed by W3C/WAI for making web content more accessible to people with disabilities. Current version: WCAG 2.2 (2023). Organized around 4 principles (POUR), 13 guidelines, and 87 success criteria at levels A, AA, and AAA. WCAG 3.0 is in development.

**WCAG Conformance Levels**  
Three levels of compliance:
- **Level A**: Minimum; addresses the most critical barriers
- **Level AA**: Standard; required by ADA, Section 508, EAA, EN 301 549
- **Level AAA**: Enhanced; not required but best practice for critical content

**Web Accessibility**  
Making websites and web-based applications usable by people with disabilities, including those using screen readers, keyboard-only navigation, speech control, and other assistive technologies.

**Web Accessibility Compliance**  
Meeting legal and regulatory requirements for accessible web content. In the US: ADA Title III and Section 508. In the EU: EN 301 549 and the European Accessibility Act (EAA, deadline June 2025). Most jurisdictions target WCAG 2.1 or 2.2 Level AA.

**Web Accessibility Initiative (WAI)**  
The W3C working group responsible for developing accessibility guidelines and supporting resources, including WCAG, ARIA, ATAG (Authoring Tool Accessibility Guidelines), and UAAG (User Agent Accessibility Guidelines).

**Web Accessibility Principles**  
The four POUR principles underlying WCAG:
1. **Perceivable** — Content can be perceived by all users
2. **Operable** — Interface can be operated by all users
3. **Understandable** — Content and interface are understandable
4. **Robust** — Content works with current and future assistive technologies
