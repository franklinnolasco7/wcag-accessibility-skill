# CLAUDE.md

Guidance for agents working with this repository.

## What this skill is

An agent skill compatible with Claude Code and other skill-aware agents
(see agentskills.io). The SKILL.md file is the entry point — it is loaded
automatically when an agent detects accessibility-related work.

## File layout

- `SKILL.md` — Skill definition. YAML frontmatter controls trigger matching;
  the body is the knowledge base loaded into context.
- `references/` — Deep reference material. Load specific files on demand;
  do not load all references on every request.
- `scripts/` — Standalone utilities. These run independently of the skill
  and are intended for use in developer workflows.
- `evals/` — Evaluation prompts and trigger tests for skill validation.

## Editing rules

- Keep SKILL.md under ~350 lines. Deep content belongs in `references/`.
- The `description` field in SKILL.md frontmatter controls when the skill
  triggers — keep it keyword-rich and accurate.
- Always cite WCAG success criterion numbers (e.g., "SC 1.4.3") in responses.
- Scripts must follow the project comment style: explain why, not what.
  No emojis in script files.

## No build step

This is declarative content. There is nothing to compile, install, or run
for the skill itself. The scripts in `scripts/` are standalone Node.js
utilities with their own usage docs.
