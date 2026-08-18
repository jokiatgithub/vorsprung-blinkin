---
name: blinkin-codex-work
description: Practical guidance for using Codex on software work, with explicit scope, verification, and safe delivery.
---

# Codex for real work

Use Codex to turn a clearly scoped software change into a tested, reviewable result.

## Before you start

- State the desired outcome, repository or project, and the files in scope.
- Describe constraints, non-goals, deployment target, and how success will be checked.
- Inspect the existing project before changing it. Preserve unrelated work.
- Treat secrets, credentials, production data, and external systems as protected.

## Working pattern

1. Inspect the project structure, current behavior, and local instructions.
2. Make a short plan that names the smallest useful change.
3. Implement with the project’s existing patterns and dependencies.
4. Verify proportionally: syntax, tests, build, accessibility, and the changed user path.
5. Report what changed, what was verified, and any remaining assumption.

## Safe execution

- Read before editing.
- Keep changes inside the requested scope.
- Do not delete, reset, overwrite, publish, or send anything without clear authorization.
- Never put secrets into source files, logs, command arguments, or screenshots.
- For external writes, confirm the exact destination and data at action time.

## Definition of done

- The requested behavior exists.
- Existing behavior outside the scope still works.
- The relevant checks pass.
- The change is understandable to the next person.
- Deployment steps and limitations are explicit.

Codex and model capabilities change. Check current OpenAI documentation and the local project instructions before relying on a model-specific behavior: https://platform.openai.com/docs/models
