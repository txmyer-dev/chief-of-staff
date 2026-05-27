
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, basename } from "path";
import { execSync } from "child_process";

const COMPANY_ID = "849cf75d-a98b-4007-80e1-f82e4c6711ac";
const CEO_ID = "5d5afd8a-5190-4d41-a498-61c7aa9a11e0";
const REPO_PATH = "/root/chief-of-staff/Packs/Agency-Agents/src/agency-agents-repo";

const AGENT_DIRS = [
  "design", "engineering", "finance", "game-development", "marketing", "paid-media", "product", "project-management",
  "sales", "spatial-computing", "specialized", "strategy", "support", "testing"
];

function runSql(sql: string) {
    writeFileSync("/tmp/temp.sql", sql);
    execSync(`docker cp /tmp/temp.sql paperclip-postgres:/tmp/temp.sql`);
    const cmd = `docker exec -e PGPASSWORD=paperclip-secret paperclip-postgres psql -U paperclip -d paperclip -f /tmp/temp.sql`;
    return execSync(cmd).toString();
}

async function main() {
  let allSql = "";
  let count = 0;

  for (const dir of AGENT_DIRS) {
    const fullDir = join(REPO_PATH, dir);
    if (!statSync(fullDir).isDirectory()) continue;

    const files = readdirSync(fullDir).filter(f => f.endsWith(".md"));
    for (const file of files) {
      const filePath = join(fullDir, file);
      const content = readFileSync(filePath, "utf-8");
      
      const fileName = basename(file, ".md");
      const name = fileName.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      const role = dir;
      
      const capabilities = content;
      
      allSql += `
        INSERT INTO agents (company_id, name, role, title, capabilities, reports_to, adapter_type, status)
        VALUES (
          '${COMPANY_ID}',
          '${name.replace(/'/g, "''")}',
          '${role.replace(/'/g, "''")}',
          '${name.replace(/'/g, "''")}',
          '${capabilities.replace(/'/g, "''")}',
          '${CEO_ID}',
          'process',
          'idle'
        );
      `;
      count++;
    }
  }

  const taskTitle = "Configure and onboard Agency Agents";
  const taskDescription = `${count} new Agency Agents have been imported as database records. Review their capabilities, set up their instruction files in the company directory, and activate them as needed for agency operations.`;
  
  allSql += `
    INSERT INTO issues (company_id, title, description, status, priority, assignee_agent_id)
    VALUES (
      '${COMPANY_ID}',
      '${taskTitle.replace(/'/g, "''")}',
      '${taskDescription.replace(/'/g, "''")}',
      'todo',
      'high',
      '${CEO_ID}'
    );
  `;
  
  console.log(`Prepared ${count} agents for import.`);
  runSql(allSql);
  console.log("Migration and task assignment complete.");
}

main();
