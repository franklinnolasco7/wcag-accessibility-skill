#!/usr/bin/env node
/**
 * contrast-check.js
 *
 * Batch color contrast checker implementing WCAG 2.2 SC 1.4.3 and SC 1.4.11.
 *
 * Usage:
 *   node contrast-check.js                      Run built-in reference examples
 *   node contrast-check.js "#333333" "#ffffff"   Check a single pair
 *   node contrast-check.js --file colors.json    Batch check from JSON
 *
 * JSON input format:
 *   [{ "label": "Body text", "foreground": "#333333", "background": "#ffffff" }]
 */

'use strict';

// ---- Color math ----------------------------------------------------------

/**
 * Expands 3-digit shorthand hex and parses to RGB components.
 * Shorthand must be normalized first because parseInt treats "abc" as 0xabc,
 * not 0xaabbcc.
 */
function hexToRgb(hex) {
  const clean = hex.replace(/^#/, '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Converts an 8-bit channel to linear light via the IEC 61966-2-1 transfer
 * function. The 0.04045 threshold and 12.92 divisor come from the sRGB spec;
 * they are not tunable.
 */
function linearize(channel) {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Computes relative luminance per WCAG 2.x (WCAG definition 1).
 * Coefficients (0.2126, 0.7152, 0.0722) are the Rec. 709 primaries
 * used by sRGB — not arbitrary.
 */
function relativeLuminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Contrast ratio as defined by WCAG 2.x (WCAG definition 2).
 * Adding 0.05 to both terms prevents division by zero for pure black/white.
 */
function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---- WCAG thresholds -----------------------------------------------------

const THRESHOLDS = {
  AA_NORMAL:  4.5,  // SC 1.4.3 — normal text
  AA_LARGE:   3.0,  // SC 1.4.3 — large text (>=18pt or >=14pt bold)
  AA_UI:      3.0,  // SC 1.4.11 — UI components and graphical objects
  AAA_NORMAL: 7.0,  // SC 1.4.6 — enhanced normal text
  AAA_LARGE:  4.5,  // SC 1.4.6 — enhanced large text
};

function evaluate(ratio) {
  return {
    ratio:      Math.round(ratio * 100) / 100,
    AA_normal:  ratio >= THRESHOLDS.AA_NORMAL,
    AA_large:   ratio >= THRESHOLDS.AA_LARGE,
    AA_ui:      ratio >= THRESHOLDS.AA_UI,
    AAA_normal: ratio >= THRESHOLDS.AAA_NORMAL,
    AAA_large:  ratio >= THRESHOLDS.AAA_LARGE,
  };
}

// ---- Output --------------------------------------------------------------

const GREEN = '\x1b[32m';
const RED   = '\x1b[31m';
const BOLD  = '\x1b[1m';
const RESET = '\x1b[0m';

function pass(label) { return `${GREEN}PASS${RESET} ${label}`; }
function fail(label) { return `${RED}FAIL${RESET} ${label}`; }

function displayResult(label, fg, bg, result) {
  const { ratio, AA_normal, AA_large, AA_ui, AAA_normal, AAA_large } = result;
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`${BOLD}${label}${RESET}`);
  console.log(`  Foreground: ${fg}  Background: ${bg}`);
  console.log(`  Contrast ratio: ${ratio}:1`);
  console.log(`  ${AA_normal  ? pass('AA  normal text (>=4.5:1)') : fail('AA  normal text (>=4.5:1)')}`);
  console.log(`  ${AA_large   ? pass('AA  large text  (>=3.0:1)') : fail('AA  large text  (>=3.0:1)')}`);
  console.log(`  ${AA_ui      ? pass('AA  UI/graphic  (>=3.0:1)') : fail('AA  UI/graphic  (>=3.0:1)')}`);
  console.log(`  ${AAA_normal ? pass('AAA normal text (>=7.0:1)') : fail('AAA normal text (>=7.0:1)')}`);
  console.log(`  ${AAA_large  ? pass('AAA large text  (>=4.5:1)') : fail('AAA large text  (>=4.5:1)')}`);
}

function displaySummary(results) {
  const total   = results.length;
  const passAA  = results.filter(r => r.result.AA_normal).length;
  const passAAA = results.filter(r => r.result.AAA_normal).length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`${BOLD}SUMMARY${RESET}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Pairs checked:      ${total}`);
  console.log(`Pass AA  (normal):  ${passAA}/${total} (${Math.round(passAA / total * 100)}%)`);
  console.log(`Pass AAA (normal):  ${passAAA}/${total} (${Math.round(passAAA / total * 100)}%)`);

  const failures = results.filter(r => !r.result.AA_normal);
  if (failures.length > 0) {
    console.log(`\n${RED}AA Failures:${RESET}`);
    failures.forEach(f => {
      console.log(`  ${f.label}: ${f.result.ratio}:1 (needs 4.5:1)`);
    });
  }
}

// ---- Entry point ---------------------------------------------------------

const args = process.argv.slice(2);

if (args.length === 2 && args[0].startsWith('#') && args[1].startsWith('#')) {
  const [fg, bg] = args;
  const result = evaluate(contrastRatio(fg, bg));
  displayResult('Command-line pair', fg, bg, result);

} else if (args[0] === '--file' && args[1]) {
  const fs    = require('fs');
  const pairs = JSON.parse(fs.readFileSync(args[1], 'utf8'));
  const results = pairs.map(pair => {
    const result = evaluate(contrastRatio(pair.foreground, pair.background));
    displayResult(pair.label || 'Unlabeled', pair.foreground, pair.background, result);
    return { label: pair.label, result };
  });
  displaySummary(results);

} else {
  console.log(`\n${BOLD}WCAG Contrast Checker${RESET}`);
  console.log('Usage: node contrast-check.js "#333333" "#ffffff"');
  console.log('       node contrast-check.js --file colors.json\n');

  const examples = [
    { label: 'Black on white (reference ceiling)',  fg: '#000000', bg: '#ffffff' },
    { label: 'Dark gray on white (common body)',    fg: '#333333', bg: '#ffffff' },
    { label: 'Mid gray on white (borderline)',      fg: '#767676', bg: '#ffffff' },
    { label: 'Light gray on white (fails AA)',      fg: '#aaaaaa', bg: '#ffffff' },
    { label: 'White on accessible blue button',     fg: '#ffffff', bg: '#0057b8' },
    { label: 'White on light blue (fails AA)',       fg: '#ffffff', bg: '#4a90e2' },
    { label: 'Dark text on yellow',                 fg: '#333333', bg: '#ffff00' },
    { label: 'Red link on white',                   fg: '#cc0000', bg: '#ffffff' },
  ];

  const results = examples.map(ex => {
    const result = evaluate(contrastRatio(ex.fg, ex.bg));
    displayResult(ex.label, ex.fg, ex.bg, result);
    return { label: ex.label, result };
  });

  displaySummary(results);
}

module.exports = { contrastRatio, evaluate, hexToRgb, relativeLuminance };
