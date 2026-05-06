# VERIFY: Agentic Compiler

Confirm the Agentic Compiler is correctly installed and ready for use.

## Checklist

- [ ] `Packs/AgenticCompiler/src/SKILL.md` exists.
- [ ] `Packs/AgenticCompiler/src/Tools/scaffold.js` exists and is executable.
- [ ] `Packs/_catalog/catalog.json` contains `agentic-compiler`.

## Test Run (Dry Run)

Run the following command to verify the scaffolding engine can parse JSON (it should fail if no JSON is provided, confirming it's working):

```bash
node Packs/AgenticCompiler/src/Tools/scaffold.js
```

Expected output: `No JSON payload provided.`
