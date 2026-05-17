# NotebookLM Loop Workflow

**Goal:** Transform static Obsidian notes into dynamic insights and developed content using NotebookLM and Gemini.

## Execution Steps

### 1. Observe (Source Selection)
- Identify the project or theme scope.
- Select relevant `.md` files from the `agentic-wiki`.
- **Criteria:** Narrower is better (one project, one theme).

### 2. Export (Preparation)
- Ensure notes are clean Markdown.
- If notes contain complex formatting/images, convert to PDF.
- **Tool:** Use `obsidian-export` or manual print-to-pdf if interactive.

### 3. Interrogate (NotebookLM)
- Upload sources to a dedicated NotebookLM notebook.
- **Prompts:** 
  - "Identify the three most contradictory claims from these sources."
  - "Summarize the core mental models present."
  - "Generate an Audio Overview for mobile review."
- Capture the AI's output (Summaries, FAQs, Study Guides).

### 4. Develop (Gemini)
- Attach the NotebookLM notebook to Gemini (using Google Workspace integration) or paste the summary into Gemini.
- **Prompts:**
  - "Draft a [deliverable type] for [audience] based on these insights."
  - "Create a step-by-step technical walkthrough."
  - "Transform these insights into a slide deck outline or infographic copy."

### 5. Close (Obsidian Route-Back)
- Download the generated content as Markdown.
- File in `00-INBOX/` with metadata:
  ```markdown
  ---
  type: developed-content
  source_notebook: [Notebook Name]
  date: YYYY-MM-DD
  status: unread
  ---
  ```
- Reference the original sources via Wiki-links.

## Error Handling
- **Hallucinations:** Cross-reference Gemini output with NotebookLM sources.
- **Format Loss:** Use PDF for complex layouts.
