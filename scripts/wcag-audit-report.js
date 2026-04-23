#!/usr/bin/env node
/**
 * wcag-audit-report.js
 *
 * Transforms raw axe-core JSON output into a structured WCAG audit report.
 * axe-core surfaces violations but does not group them by WCAG criterion,
 * severity, or affected component — this script does that, making triage
 * and VPAT documentation significantly faster.
 *
 * Usage:
 *   axe <url> --save results.json          Capture axe output
 *   node wcag-audit-report.js results.json  Generate report to stdout
 *   node wcag-audit-report.js results.json --out report.json
 *
 * Input: axe-core JSON (single run object or array of run objects).
 * Output: Structured report — grouped violations, severity counts, VPAT hints.
 *
 * Requires Node.js >= 18. No npm dependencies.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---- WCAG criterion metadata ---------------------------------------------

// Severity is derived from the WCAG level and the nature of the impact.
// "Critical" blocks assistive technology entirely; "serious" significantly
// impairs access; lower tiers reduce usability but do not block task completion.
const CRITERION_META = {
  '1.1.1': { level: 'A',   title: 'Non-text Content',            severity: 'critical' },
  '1.3.1': { level: 'A',   title: 'Info and Relationships',       severity: 'serious'  },
  '1.3.5': { level: 'AA',  title: 'Identify Input Purpose',       severity: 'moderate' },
  '1.4.1': { level: 'A',   title: 'Use of Color',                 severity: 'serious'  },
  '1.4.2': { level: 'A',   title: 'Audio Control',                severity: 'serious'  },
  '1.4.3': { level: 'AA',  title: 'Contrast (Minimum)',           severity: 'serious'  },
  '1.4.4': { level: 'AA',  title: 'Resize Text',                  severity: 'serious'  },
  '1.4.11': { level: 'AA', title: 'Non-text Contrast',            severity: 'moderate' },
  '2.1.1': { level: 'A',   title: 'Keyboard',                     severity: 'critical' },
  '2.1.2': { level: 'A',   title: 'No Keyboard Trap',             severity: 'critical' },
  '2.2.1': { level: 'A',   title: 'Timing Adjustable',            severity: 'serious'  },
  '2.2.4': { level: 'AAA', title: 'Interruptions',                severity: 'minor'    },
  '2.3.1': { level: 'A',   title: 'Three Flashes or Below',       severity: 'critical' },
  '2.4.1': { level: 'A',   title: 'Bypass Blocks',                severity: 'moderate' },
  '2.4.2': { level: 'A',   title: 'Page Titled',                  severity: 'moderate' },
  '2.4.3': { level: 'A',   title: 'Focus Order',                  severity: 'serious'  },
  '2.4.4': { level: 'A',   title: 'Link Purpose (In Context)',     severity: 'moderate' },
  '2.5.8': { level: 'AA',  title: 'Target Size (Minimum)',        severity: 'moderate' },
  '3.1.1': { level: 'A',   title: 'Language of Page',             severity: 'moderate' },
  '3.1.2': { level: 'AA',  title: 'Language of Parts',            severity: 'minor'    },
  '3.2.5': { level: 'AAA', title: 'Change on Request',            severity: 'minor'    },
  '4.1.1': { level: 'A',   title: 'Parsing',                      severity: 'moderate' },
  '4.1.2': { level: 'A',   title: 'Name, Role, Value',            severity: 'critical' },
  '4.1.3': { level: 'AA',  title: 'Status Messages',              severity: 'moderate' },
};

const SEVERITY_ORDER = ['critical', 'serious', 'moderate', 'minor'];

// ---- axe result parsing --------------------------------------------------

/**
 * axe-core tags violations with WCAG criterion IDs in the format "wcag143".
 * This extracts them as dotted strings ("1.4.3") for lookup against metadata.
 */
function extractCriteria(tags) {
  return tags
    .filter(t => /^wcag\d+$/.test(t))
    .map(t => {
      const digits = t.replace('wcag', '');
      // Insert dots: "143" -> "1.4.3", "111" -> "1.1.1"
      // axe uses the digit run from the criterion number directly.
      return digits.length === 3
        ? `${digits[0]}.${digits[1]}.${digits[2]}`
        : `${digits[0]}.${digits.slice(1, 3)}.${digits.slice(3)}`;
    });
}

function parseAxeResults(raw) {
  // Accept either a single axe run object or an array of runs.
  const runs = Array.isArray(raw) ? raw : [raw];

  const violations = [];
  for (const run of runs) {
    for (const v of (run.violations || [])) {
      violations.push({
        id:          v.id,
        description: v.description,
        help:        v.help,
        helpUrl:     v.helpUrl,
        impact:      v.impact,
        criteria:    extractCriteria(v.tags || []),
        nodes:       (v.nodes || []).map(n => ({
          html:    n.html,
          target:  n.target,
          message: (n.failureSummary || '').split('\n')[0],
        })),
      });
    }
  }
  return violations;
}

// ---- Report generation ---------------------------------------------------

function buildReport(violations) {
  const byCriterion = {};
  const ungrouped   = [];

  for (const v of violations) {
    if (v.criteria.length === 0) {
      ungrouped.push(v);
      continue;
    }
    for (const sc of v.criteria) {
      if (!byCriterion[sc]) byCriterion[sc] = [];
      byCriterion[sc].push(v);
    }
  }

  // Build criterion summaries ordered by severity then SC number.
  const criteria = Object.entries(byCriterion)
    .map(([sc, vs]) => {
      const meta = CRITERION_META[sc] || { level: '?', title: 'Unknown', severity: 'minor' };
      return {
        sc,
        ...meta,
        violationCount: vs.length,
        nodeCount:      vs.reduce((n, v) => n + v.nodes.length, 0),
        violations:     vs,
      };
    })
    .sort((a, b) => {
      const si = SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
      return si !== 0 ? si : a.sc.localeCompare(b.sc);
    });

  // Severity counts for the executive summary.
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const c of criteria) counts[c.severity] = (counts[c.severity] || 0) + c.nodeCount;

  // VPAT hints: criteria with violations map directly to conformance entries.
  const vpatHints = criteria.map(c => ({
    sc:           c.sc,
    title:        c.title,
    level:        c.level,
    conformance:  c.nodeCount > 0 ? 'Does Not Support' : 'Supports',
    nodeCount:    c.nodeCount,
  }));

  return { summary: counts, criteria, ungrouped, vpatHints };
}

function formatReport(report, inputFile) {
  const lines = [];

  lines.push('WCAG Accessibility Audit Report');
  lines.push(`Source: ${inputFile}`);
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('SUMMARY');
  lines.push('-------');
  for (const sev of SEVERITY_ORDER) {
    lines.push(`  ${sev.padEnd(10)} ${report.summary[sev] || 0} affected nodes`);
  }
  lines.push('');

  lines.push('VIOLATIONS BY WCAG CRITERION');
  lines.push('-----------------------------');
  for (const c of report.criteria) {
    lines.push(`\nSC ${c.sc} — ${c.title} (Level ${c.level}) [${c.severity}]`);
    lines.push(`  ${c.nodeCount} affected node(s) across ${c.violationCount} rule(s)`);
    for (const v of c.violations) {
      lines.push(`  Rule: ${v.id} — ${v.help}`);
      lines.push(`  Ref:  ${v.helpUrl}`);
      for (const n of v.nodes.slice(0, 3)) {
        lines.push(`    > ${n.html.slice(0, 120)}`);
        if (n.message) lines.push(`      ${n.message}`);
      }
      if (v.nodes.length > 3) {
        lines.push(`    ... and ${v.nodes.length - 3} more node(s)`);
      }
    }
  }

  if (report.ungrouped.length > 0) {
    lines.push('\nUNMAPPED VIOLATIONS (no WCAG criterion tag)');
    lines.push('--------------------------------------------');
    for (const v of report.ungrouped) {
      lines.push(`  ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    }
  }

  lines.push('\nVPAT CONFORMANCE HINTS');
  lines.push('----------------------');
  lines.push('  SC        Level  Conformance          Nodes');
  for (const h of report.vpatHints) {
    const sc    = `SC ${h.sc}`.padEnd(10);
    const level = h.level.padEnd(6);
    const conf  = h.conformance.padEnd(20);
    lines.push(`  ${sc} ${level} ${conf} ${h.nodeCount}`);
  }

  return lines.join('\n');
}

// ---- Audit API payload builder -------------------------------------------
//
// Produces a ready-to-POST Anthropic /v1/messages payload that enforces the
// minimum 4000-token budget. Callers that build their own payload MUST set
// max_tokens >= 4000 — the default 1000 truncates the audit table mid-row.

function buildAuditPayload(htmlSnippet, { model = 'claude-sonnet-4-20250514', maxTokens = 4000 } = {}) {
  if (maxTokens < 4000) {
    console.warn(`Warning: max_tokens ${maxTokens} < 4000. Audit table will be truncated. Overriding to 4000.`);
    maxTokens = 4000;
  }
  return {
    model,
    max_tokens: maxTokens,
    system: [
      'You are a WCAG 2.2 accessibility auditor.',
      'PHASE 1 (silent): Analyse the HTML. Build your findings for all 11 Areas internally.',
      'PHASE 2 (output): Emit ONLY the verdict line then the complete 11-row table. No prose before or after.',
      'The 11 Areas in order: Language, Skip link, Landmarks, Headings, Forms/Labels,',
      'Images/Alt text, Buttons/ARIA, Keyboard/Focus, Dialogs, Contrast, Touch targets.',
      'Keep each Finding <= 60 characters. If a row is missing the table is incomplete — verify all 11 before outputting.',
    ].join('\n'),
    messages: [
      { role: 'user', content: `Audit this HTML for WCAG 2.2 Level A and AA compliance:\n\n\`\`\`html\n${htmlSnippet}\n\`\`\`` }
    ],
  };
}

// ---- Entry point ---------------------------------------------------------

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
  console.log('Usage: node wcag-audit-report.js <axe-results.json> [--out report.json]');
  console.log('       node wcag-audit-report.js <axe-results.json> --format text');
  console.log('       node wcag-audit-report.js --payload <html-file> [--out payload.json]');
  console.log('');
  console.log('--payload mode: emits a ready-to-POST Anthropic API payload with max_tokens=4000');
  process.exit(0);
}

// --payload <html-file> mode: emit audit API payload
if (args[0] === '--payload') {
  const htmlFile = args[1];
  if (!htmlFile) { console.error('--payload requires an HTML file path'); process.exit(1); }
  const html    = fs.readFileSync(htmlFile, 'utf8');
  const payload = buildAuditPayload(html);
  const outFlag2 = args.indexOf('--out');
  const outFile2 = outFlag2 !== -1 ? args[outFlag2 + 1] : null;
  const json = JSON.stringify(payload, null, 2);
  if (outFile2) { fs.writeFileSync(outFile2, json); console.log(`Payload written to ${outFile2}`); }
  else { console.log(json); }
  process.exit(0);
}

const inputFile  = args[0];
const outFlag    = args.indexOf('--out');
const outFile    = outFlag !== -1 ? args[outFlag + 1] : null;
const formatJson = !args.includes('--format') || args[args.indexOf('--format') + 1] === 'json';

const raw        = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const violations = parseAxeResults(raw);
const report     = buildReport(violations);

if (outFile && formatJson) {
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log(`Report written to ${outFile}`);
} else {
  console.log(formatReport(report, inputFile));
  if (outFile) fs.writeFileSync(outFile, formatReport(report, inputFile));
}
