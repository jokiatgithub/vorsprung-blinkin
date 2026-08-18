---
name: blinkin-claude-work
description: Practical guidance for using Claude on real business work, with context, review, and a clear handoff.
---

# Claude for real work

Use Claude to move a defined piece of work forward, not to generate activity without an owner.

## Before you start

- Name the job to be done and the person responsible for the result.
- Provide the relevant context, source material, constraints, and desired output.
- Separate confidential information from information that can safely be shared with the model.
- Define what a good result looks like before asking Claude to produce one.

## Working pattern

1. Ask Claude to restate the task, assumptions, missing information, and acceptance criteria.
2. Give it the smallest useful set of source material and ask it to cite or point to evidence.
3. Work in a short loop: draft, review, correct, and produce the next version.
4. Keep a human responsible for decisions, external communication, and irreversible actions.
5. Save the useful prompt, source context, decision, and final output where the team can reuse them.

## Prompt shape

```text
Aufgabe: [konkrete Arbeit]
Kontext: [relevante Informationen und Quellen]
Zielgruppe: [wer nutzt das Ergebnis]
Constraints: [Zeit, Ton, Daten, Systeme, Grenzen]
Erfolgskriterium: [woran erkennen wir, dass es funktioniert]
Ausgabe: [Format und gewünschte Tiefe]
Bitte nenne zuerst Annahmen und offene Fragen.
```

## Review checklist

- Are claims supported by the supplied material?
- Did Claude distinguish facts, assumptions, and recommendations?
- Is the result usable in the actual workflow?
- Has a responsible person reviewed it before it is shared or acted on?
- Is the final version stored with its source context?

Claude’s capabilities, model names, and product controls change. Check Anthropic’s current documentation before making provider-specific promises: https://docs.anthropic.com/en/docs/welcome
