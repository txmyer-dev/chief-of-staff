---
name: Agentic Compiler
pack-id: txmyer-agentic-compiler-v1.0.0
version: 1.0.0
author: txmyer
description: Scaffold 3-layer Training Blueprints with ICM pipelines — transform business context into a deterministic workspace architecture
type: skill
purpose-type: [productivity, architecture, automation]
platform: gemini-cli
dependencies: []
keywords: [agentic-os, compiler, scaffolding, blueprint, ICM, business-x-ray, automation]
---

# Agentic Compiler

> Transform business context into a deterministic, agent-ready workspace architecture.

---

## The Problem

Setting up a new project or business unit for AI agents is often manual, inconsistent, and prone to "token hallucinations." You end up with:

- **Flat directories** — Agents lose focus as context builds up in a single folder.
- **Inconsistent routing** — No clear path for how data should flow between stages.
- **Manual scaffolding** — Spending 30 minutes setting up folders, `CLAUDE.md`, and `CONTEXT.md` files.

---

## The Solution

The Agentic Compiler is an automated meta-skill that runs a structured **Business X-Ray** to find your primary bottleneck and then scaffolds a complete **3-layer Training Blueprint** directly on your disk.

It uses a deterministic scaffolding engine to ensure your workspace follows the **Interpretable Context Methodology (ICM)** every time.

---

## Installation

This pack is designed for AI-assisted installation. Give this directory to your AI and ask it to install using `INSTALL.md`.

---

## What's Included

| Component | File | Purpose |
|-----------|------|---------|
| Meta-Skill | `src/SKILL.md` | The PAI-compliant skill definition |
| Scaffolding Engine | `src/Tools/scaffold.js` | The deterministic Node.js script for folder creation |

---

## How It Works

1. **OBSERVE:** The agent runs a 3-4 question interview (Business X-Ray).
2. **THINK & PLAN:** The agent identifies the bottleneck and generates a JSON payload.
3. **BUILD:** The agent runs `scaffold.js` with the JSON payload.
4. **EXECUTE:** Your workspace is ready with a `STRATEGY.md`, silo folders, and 5-stage pipelines.

---

## Credits

- **Methodology:** Jake Van Clief (ICM & Training Blueprint)
- **Implementation:** txmyer
