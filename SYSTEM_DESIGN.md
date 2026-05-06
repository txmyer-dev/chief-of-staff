# Chief-of-Staff Agent: Requirements & Architecture

## Overview
This document outlines the architecture for a "Chief-of-Staff" (CoS) agent system, synthesized from the philosophies of PAI (Life OS grounding), Agentic OS (Brand/Business context), and the "Algorithm as Orchestrator" concept. The goal is to build an agent that acts as the "Brain," taking the lead on managing the principal's digital life by orchestrating specialized domain agents and utilizing a unified skill library.

## Priorities
Implementation will follow this phased priority list:
1.  **Phase 1: Personal Operating System** (Finance, Health, PKM, Life-Ops)
2.  **Phase 2: Professional/Business** (Client automation, Project management)
3.  **Phase 3: Content/Brand** (Voice AI playbook updates, Content repurposing)

## System Architecture: The Orchestrator and the Experts

The system utilizes a **Hybrid Memory Architecture (Dashboard + ISA Docs)** and a **Multi-Agent Strategy (Domain-Specific Context Agents)**.

### 1. The Chief-of-Staff (The Orchestrator / The Brain)
*   **Role:** The primary interface for the user. It manages the "Pulse" of the user's life, delegating deep work to domain agents and synthesizing their outputs.
*   **Grounding:** Grounded in the user's TELOS (Mission, Goals, Beliefs) via PAI's identity layer.
*   **Memory Management:** 
    *   Maintains the central "Life Dashboard" (e.g., `PULSE` in PAI) for high-level daily check-ins and cross-domain tracking.
    *   Reads and updates a daily session memory file (similar to Agentic OS's memory) for continuity.

### 2. Domain-Specific Agents (The Specialists)
*   **Role:** Manage deep context and complex workflows for specific areas of the user's life without bloating the CoS's context window.
*   **Memory Management:**
    *   Each agent maintains its own standalone Ideal State Artifact (ISA) documents and private logs within its domain folder.
    *   The CoS queries these agents for summaries or specific data points when needed, rather than holding all the data itself.
*   **Initial Domains (Phase 1):**
    *   **Finance Agent:** Manages income, expenses, net worth tracking, and bill management ISAs.
    *   **Health & Bio-hacking Agent:** Tracks sleep, exercise, nutrition data, and long-term health goals.
    *   **PKM (Knowledge) Agent:** Organizes digital notes, YouTube transcripts, and reading lists (integrating tools like NotebookLM/Jupyter).
    *   **Routines & Life-Ops Agent:** Manages recurring tasks, daily habits, and household automation.

### 3. The Unified Skill Library
The CoS and Domain Agents draw from a synthesized library of skills:
*   **PAI Core:** The 7-Phase Algorithm (OBSERVE → THINK → PLAN → BUILD → EXECUTE → VERIFY → LEARN) acts as the meta-framework dictating *how* work is approached based on Effort Tiers (E1-E5).
*   **Agentic OS Skills (aos-*):** Integrated as modular tools. Skills like `mkt-brand-voice`, `mkt-positioning`, and `mkt-icp` will be essential for Phase 2 and 3, ensuring the CoS understands the user's professional context.
*   **Compound Engineering (CE) / GSD:** Utilized by the Algorithm for project management and "knowledge compounding" (e.g., documenting learnings in `docs/solutions/`).

## Implementation Strategy

1.  **Directory Structure:** Establish the domain folders (`/Domains/Finance`, `/Domains/Health`, etc.) within the PAI `USER` space.
2.  **Dashboard Integration:** Extend the PAI Pulse dashboard to include summary views pulled from the new Domain Agents.
3.  **Skill Migration:** Migrate necessary Agentic OS skills into the PAI skill structure, ensuring they are accessible to the CoS when the Algorithm determines they are needed.
4.  **Agent Definition:** Define the system prompts and Context Matrices for the four Phase 1 Domain Agents, specifying their read/write access to their respective ISAs.