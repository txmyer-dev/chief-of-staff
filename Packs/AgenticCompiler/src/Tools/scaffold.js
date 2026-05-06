#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function scaffold() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('No JSON payload provided.');
    process.exit(1);
  }

  const payload = JSON.parse(args[0]);
  const cwd = process.cwd();

  console.log(`Scaffolding Agentic OS for ${payload.businessName}...`);

  // 1. Root STRATEGY.md
  fs.writeFileSync(path.join(cwd, 'STRATEGY.md'), payload.strategyMarkdown);

  // 2. Root CLAUDE.md (Append or Create)
  const claudeMdPath = path.join(cwd, 'CLAUDE.md');
  const claudeContent = `\n## New Silo: ${payload.bottleneckSiloName}\nNavigate to \`domains/${payload.bottleneckSiloName}/CONTEXT.md\` to work on the bottleneck.\n`;
  if (fs.existsSync(claudeMdPath)) {
    fs.appendFileSync(claudeMdPath, claudeContent);
  } else {
    fs.writeFileSync(claudeMdPath, `# ${payload.businessName} - Workspace Map\n${claudeContent}`);
  }

  // 3. Root CONTEXT.md (Append or Create)
  const contextMdPath = path.join(cwd, 'CONTEXT.md');
  const contextContent = `| Fix ${payload.bottleneckSiloName} | \`domains/${payload.bottleneckSiloName}/CONTEXT.md\` | \`STRATEGY.md\` |\n`;
  if (fs.existsSync(contextMdPath)) {
    fs.appendFileSync(contextMdPath, contextContent);
  } else {
    fs.writeFileSync(contextMdPath, `# Task Router\n\n| Your Task | Go Here | You'll Also Need |\n|---|---|---|\n${contextContent}`);
  }

  // 4. Bottleneck Silo (In domains/)
  const siloPath = path.join(cwd, 'domains', payload.bottleneckSiloName);
  fs.mkdirSync(siloPath, { recursive: true });

  const siloContextContent = `# ${payload.bottleneckSiloName} Workspace\n\nThis workspace solves the primary bottleneck via a 5-stage ICM pipeline.\n`;
  fs.writeFileSync(path.join(siloPath, 'CONTEXT.md'), siloContextContent);

  // 5. ICM Stages
  payload.icmStages.forEach(stage => {
    const stageName = `${stage.number}-${stage.name}`;
    const stagePath = path.join(siloPath, stageName);
    fs.mkdirSync(path.join(stagePath, 'references'), { recursive: true });
    fs.mkdirSync(path.join(stagePath, 'output'), { recursive: true });
    
    const stageContext = `# Stage ${stage.number}: ${stage.name}\n\n**Goal:** ${stage.description}\n`;
    fs.writeFileSync(path.join(stagePath, 'CONTEXT.md'), stageContext);
  });

  // 6. Skills Directory
  const skillsPath = path.join(siloPath, 'skills');
  fs.mkdirSync(skillsPath, { recursive: true });
  payload.requiredSkills.forEach(skill => {
    // Mock bundling logic (just references for now)
    fs.writeFileSync(path.join(skillsPath, `${skill}.md`), `# Referenced Skill: ${skill}\n`);
  });

  console.log('Scaffolding complete!');
}

scaffold();
