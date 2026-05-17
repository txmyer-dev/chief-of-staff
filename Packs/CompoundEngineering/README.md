---
name: CompoundEngineering
pack-id: txmyer-compoundengineering-v1.0.0
version: 1.0.0
author: txmyer-dev
description: Compound Engineering (CE) suite -- 37 specialized skills for software engineering, architecture, planning, and execution.
type: skill
purpose-type: [software-engineering, architecture, automation, productivity]
platform: claude-code
dependencies: []
keywords: [engineering, architecture, planning, execution, brainstorm, code-review, commit, debug, demo, rails, frontend, ideate, optimize, product-pulse, release-notes, report-bug, session, strategy, worktree, compound-engineering]
---

# Compound Engineering (CE)

> A comprehensive suite of 37 specialized skills and 49+ agents for end-to-end software engineering — from initial brainstorming and technical planning to execution, debugging, and release.

---

## The Problem

Modern software development with AI requires more than just code generation. It requires:
- **Structured Planning**: Moving from vague ideas to concrete implementation plans.
- **Consistent Quality**: Ensuring code follows project-specific standards and best practices.
- **Context Management**: Handling long-running sessions, migrations, and complex repo research.
- **Workflow Orchestration**: Coordinating specialized agents for reviews, testing, and documentation.

Without a unified framework, AI interactions remain transactional, inconsistent, and often miss the broader architectural context.

---

## The Solution

Compound Engineering (CE) provides a unified routing layer for 37 specialized engineering skills:

### Core Workflows

| Skill | Description |
|-----------|-------------|
| **ce-brainstorm** | Defines WHAT to build. Explores ideas and captures requirements. |
| **ce-plan** | Defines HOW to build it. Creates detailed technical implementation plans. |
| **ce-work** | Executes the plan. Handles the actual implementation and testing. |
| **ce-debug** | Systematically identifies and fixes bugs with root-cause analysis. |
| **ce-code-review** | Performs multi-lens reviews (security, performance, maintainability). |

### Specialized Tools

- **Architecture & Design**: `ce-agent-native-architecture`, `ce-frontend-design`, `ce-strategy`.
- **Git & Release**: `ce-commit`, `ce-release-notes`, `ce-clean-gone-branches`, `ce-worktree`.
- **Session & Context**: `ce-sessions`, `ce-session-extract`, `ce-session-inventory`.
- **Testing & Quality**: `ce-proof`, `ce-test-browser`, `ce-test-xcode`, `ce-simplify-code`.

### Agent Army

The pack includes 49+ specialized agents defined in `src/agents/`, including:
- **Reviewers**: `ce-maintainability-reviewer`, `ce-security-reviewer`, `ce-performance-reviewer`.
- **Researchers**: `ce-web-researcher`, `ce-slack-researcher`, `ce-learnings-researcher`.
- **Specialists**: `ce-architecture-strategist`, `ce-data-migration-expert`, `ce-api-contract-reviewer`.

---

## Installation

Point your AI to the pack directory:

```
"Install the CompoundEngineering pack from Packs/CompoundEngineering/"
```

See [INSTALL.md](INSTALL.md) for detailed instructions.
