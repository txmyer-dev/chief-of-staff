# Compound Engineering v1.0.0 - Installation Guide

**This guide is designed for AI agents installing this pack into a user's infrastructure.**

---

## AI Agent Instructions

**This is a wizard-style installation.** Use your native tools to guide the user through installation:

1. **AskUserQuestion** - For user decisions and confirmations
2. **Bash/Read/Write** - For actual installation
3. **VERIFY.md** - For final validation

### Welcome Message

Before starting, greet the user:
```
"I'm installing the Compound Engineering (CE) suite v1.0.0. This is a comprehensive package containing 37 specialized engineering skills and 49+ specialized agents.

This suite adds capabilities for:
- End-to-end software engineering (Brainstorm -> Plan -> Work -> Release)
- Agent-native architecture and design
- Advanced Git workflows (Worktrees, Branch cleanup, Automated commits)
- Session and context management for long-running tasks
- Specialized code reviews and debugging

Let me analyze your system and guide you through installation."
```

---

## Phase 1: System Analysis

**Execute this analysis BEFORE any file operations.**

### 1.1 Run These Commands

```bash
# Check for skills directory
CLAUDE_DIR="$HOME/.claude"
echo "Claude directory: $CLAUDE_DIR"

# Check if skills directory exists
if [ -d "$CLAUDE_DIR/skills" ]; then
  echo "OK Skills directory exists at: $CLAUDE_DIR/skills"
else
  echo "INFO Skills directory does not exist (will be created)"
fi

# Check for existing CompoundEngineering skill
if [ -d "$CLAUDE_DIR/skills/CompoundEngineering" ]; then
  echo "WARNING Existing CompoundEngineering skill found"
else
  echo "OK No existing CompoundEngineering skill (clean install)"
fi

# Check for PAI infrastructure
if [ -d "$HOME/.gemini/PAI" ] || [ -d "$HOME/.claude/PAI" ]; then
  echo "OK PAI infrastructure detected"
else
  echo "INFO PAI infrastructure not detected"
fi
```

---

## Phase 2: Installation

### 2.1 Create Directories

```bash
mkdir -p "$HOME/.claude/skills/CompoundEngineering"
```

### 2.2 Copy Files

Copy all contents from the pack's `src/` directory to the destination:

```bash
# Assuming current directory is the pack root
cp -r src/* "$HOME/.claude/skills/CompoundEngineering/"
```

---

## Phase 3: Verification

Execute the checks in `VERIFY.md`.
