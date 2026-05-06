# Chief-of-Staff (CoS) System

**The Brain in a Box: A Synthesized PAI + Agentic OS Framework.**

This repository is a fully standalone, portable agentic system designed to manage your digital life. It synthesizes the deep goals and "Life OS" grounding of **PAI** with the business context and marketing expertise of **Agentic OS**.

---

## 🧠 The Architecture

The system operates on a **Multi-Agent Specialist** model, orchestrated by a central "Chief-of-Staff" brain.

### 1. The Orchestrator (PAI Algorithm)
Uses the 7-phase **Algorithm v6.3.0** (Observe → Think → Plan → Build → Execute → Verify → Learn) to handle tasks based on their complexity (Effort Tiers E1-E5).

### 2. The Specialists (Domain Agents)
Four dedicated agents manage the "Personal OS" tier without context bloat:
*   **Ledger (Finance):** Strategist for net worth and cash flow.
*   **Vitalis (Health):** Performance coach for sleep and bio-hacking.
*   **Scribe (PKM):** Librarian for knowledge graphs and link analysis.
*   **Wayfinder (Life-Ops):** Logistics coordinator focused on removing daily friction.

### 3. The Library (50+ Skills)
A unified suite of capabilities including:
*   **PAI Packs:** Deep Research, Systems Thinking, OSINT, and Custom Agent Composition.
*   **AOS Skills:** Brand Voice extraction, Copywriting, ICP definition, and Content Repurposing.

---

## 📂 Structure

```text
├── .claude/           # PAI Engine & Hook configurations
├── ALGORITHM/         # v6.3.0 Execution Logic
├── Packs/             # Unified PAI + AOS Skill Library
├── domains/           # Specialist Agent Definitions & ISAs
├── telos/             # Personal Life OS Grounding (Templates)
├── dashboard/         # Proactive "Pulse" Dashboard
├── Tools/             # Linking and Maintenance Utilities
└── SYSTEM_DESIGN.md   # Detailed Architectural Blueprint
```

---

## 🚀 Installation

This system is designed for cross-server portability.

### 1. Prerequisites
- **Git**
- **Bun** (Required for running PAI tools)
- **Gemini CLI** (Installed globally)

### 2. Setup
Clone this repo to your server and run the linking tool:

```bash
git clone <your-repo-url> chief-of-staff
cd chief-of-staff
bun Tools/gemini-link.ts
```

### 3. Verification
Verify that the 50+ skills are registered correctly:

```bash
gemini skills list
```

---

## 🎯 Getting Started
1. **Define your TELOS:** Open `telos/MISSION.md` and articulate your goals.
2. **Review the Dashboard:** Use `dashboard/DASHBOARD.md` to check the status of your specialist agents.
3. **Engage a Specialist:** Ask the Chief-of-Staff to delegate a task to one of the specialists (e.g., "Ask Ledger to review my cash flow").

---

Built by Tony & the Gemini CLI Agent.
*Augment yourself.*
