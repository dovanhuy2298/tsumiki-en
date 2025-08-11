# kairo-task-verify

## Purpose

Check the content of created task files and add any missing information according to the output format example.

## Prerequisites

- `docs/tasks/{requirement-name}-tasks.md` exists
- Task file has been created by kairo-tasks command

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status with original materials (including EARS requirements definition and design documents) using the following signals:

- 🟢 **Green Signal**: When referring to EARS requirements definition and design documents with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on EARS requirements definition and design documents
- 🔴 **Red Signal**: When speculation is not based on EARS requirements definition and design documents

1. **Task File Verification**

   - Search for task files using @agent-symbol-searcher and read found files with Read tool
   - Read `docs/tasks/{requirement-name}-tasks.md` with Read tool

2. **Comparison with Output Format Example**

   - Search for related task formats using @agent-symbol-searcher and read found files with Read tool
   - Read kairo-tasks command file with Read tool and check output format example
   - Identify missing information in the created task file

3. **Add Missing Information**
   Check if the following items are included and add if missing:

   - Overview section (total number of tasks, estimated work time, critical path)
   - Checkbox for each task
   - Explicit task type (TDD/DIRECT)
   - Requirements link
   - Dependent tasks
   - Implementation details
   - Test requirements
   - UI/UX requirements (for frontend tasks)
   - Error handling requirements
   - Completion conditions
   - Execution order (Mermaid Gantt chart)
   - Subtask template information

4. **File Update**
   - Update the file by adding the missing information

## Post-execution Verification

- Display path of the updated file
- Display summary of added information
- Confirm that the task file is complete
