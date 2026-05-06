---
name: AgenticCompiler
description: Automated meta-skill that runs a Business X-Ray interview and deterministically scaffolds a 3-layer Training Blueprint architecture with an ICM pipeline for the primary bottleneck.
---

# Agentic Compiler

This meta-skill executes the full agentic lifecycle from business context discovery to workspace scaffolding. It uses a "Zero-Click" execution approach: once the interview is complete, it immediately generates the JSON configuration required to build the structure.

## Execution Flow (PAI Algorithm)

### Phase 1: OBSERVE (The Business X-Ray)
1. Tell the user you are starting the Business X-Ray to map their business and find the bottleneck.
2. Ask 3-4 structured questions one by one (using `ask_user` or conversational turns) to map:
   - Traffic sources and core products
   - Core systems (Lead Gen, Sales, Fulfillment)
   - Granular bottlenecks
3. Do not proceed until you have mapped these three layers.

### Phase 2: THINK
1. Analyze the interview results.
2. Identify the single biggest bottleneck that AI automation can solve.
3. Formulate a strategy: How can a 5-stage ICM pipeline solve this bottleneck?
4. Draft the contents of a `STRATEGY.md` file (Business Map + Action Roadmap).

### Phase 3: PLAN
Generate a deterministic JSON payload representing the entire architecture.

You must output exactly one JSON block wrapped in ` ```json ` fences.

The JSON MUST conform to this schema:
```json
{
  "businessName": "string",
  "bottleneckSiloName": "lowercase-with-hyphens",
  "icmStages": [
    { "number": "01", "name": "lowercase-with-hyphens", "description": "string" },
    { "number": "02", "name": "lowercase-with-hyphens", "description": "string" }
  ],
  "requiredSkills": ["array-of-strings"],
  "strategyMarkdown": "string (the full STRATEGY.md contents)"
}
```

### Phase 4: BUILD
After outputting the JSON, immediately use the `run_shell_command` tool to execute the scaffolding script with the JSON payload.

```bash
# Path is relative to the project root in chief-of-staff
node Packs/AgenticCompiler/src/Tools/scaffold.js '{YOUR_JSON_HERE}'
```
Wait for the script to complete. Inform the user the workspace is ready.
