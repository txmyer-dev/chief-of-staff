# Compound Engineering v1.0.0 - Verification Guide

**This guide is designed for AI agents to verify a successful installation of the Compound Engineering pack.**

---

## 1. File Structure Check

Verify that the core files were copied correctly:

```bash
CLAUDE_DIR="$HOME/.claude/skills/CompoundEngineering"

# Check for router
if [ -f "$CLAUDE_DIR/SKILL.md" ]; then
  echo "OK Router SKILL.md exists"
else
  echo "FAIL Router SKILL.md missing"
fi

# Check for core skills
for skill in ce-brainstorm ce-plan ce-work ce-debug; do
  if [ -d "$CLAUDE_DIR/$skill" ] && [ -f "$CLAUDE_DIR/$skill/SKILL.md" ]; then
    echo "OK $skill exists"
  else
    echo "FAIL $skill missing or incomplete"
  fi
done

# Check for agents
if [ -d "$CLAUDE_DIR/agents" ]; then
  AGENT_COUNT=$(ls "$CLAUDE_DIR/agents"/*.md | wc -l)
  echo "OK Agents directory exists ($AGENT_COUNT agents found)"
else
  echo "FAIL Agents directory missing"
fi
```

## 2. Router Validation

Verify that the router `SKILL.md` contains the expected name and description.

```bash
grep "name: CompoundEngineering" "$HOME/.claude/skills/CompoundEngineering/SKILL.md"
```

## 3. Post-Installation Message

Once verified, tell the user:
```
"Compound Engineering v1.0.0 is now installed. You can now use any of the 37 CE skills (e.g., 'plan this feature with ce-plan' or 'debug this with ce-debug') and leverage the 49+ specialized engineering agents."
```
