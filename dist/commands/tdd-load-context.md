# TDD Related File Loading and Context Preparation (Deprecated)

**Note**: This command is deprecated. Other TDD commands use @agent-symbol-searcher and Read tools directly to prepare context.

The following is maintained as reference information.

## Execution Tasks

Execute the following parallel loading and searching using @agent-symbol-searcher and Task tools:

### 0. **Search related information with @agent-symbol-searcher**

- Search for existing symbols, functions, and classes related to the target feature
- Identify implementation patterns and architecture of similar features
- Check usage methods of TDD-related tools and frameworks

```
1. Loading: TDD memo file verification
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-memo.md`
   - Understand existing development history, phase information, verification results

2. Loading: Requirements definition document verification
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-requirements.md`
   - Understand functional specifications, input/output, constraint conditions

3. Loading: Test case definition verification
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-testcases.md`
   - Understand planned test cases, classification, expected values

4. Exploration only: Project design document identification
   - Glob tool: Check existence of `docs/spec/{feature_name}-requirements.md`
   - Glob tool: Identify files in `docs/design/{feature_name}/` directory
   - Record found file paths (do not execute loading)

5. Exploration only: Project structure and library file identification
   - Glob tool: Check existence of `package.json`
   - Glob tool: Understand existing test file structure (`**/*test*.js`, `**/*spec*.js`, etc.)
   - Grep tool: Investigate implementation patterns of similar features (related keyword search)
   - Record found file paths (do not execute loading)

6. Exploration only: Task management document identification
   - Glob tool: Check existence of `docs/tasks/{requirement-name}-tasks.md`
   - Record found file paths (do not execute loading)
```

## Organizing Loading Results

After completing loading and exploration, organize information in the following format:

### 📋 Development Context Information

```markdown
## TDD Development Context

### 🎯 Current Phase and Status

- **Target Feature**: {feature_name}
- **Current TDD Phase**: [Requirements/TestCases/Red/Green/Refactor/Verify]
- **Previously Completed Phase**: [Previously completed phase]
- **Current Execution Plan**: [Next step to execute]

### 📄 Requirements and Specification Information

- **Feature Overview**: [Feature overview extracted from requirements definition]
- **Input Specification**: [Input parameter types, constraints, ranges]
- **Output Specification**: [Output format, structure, expected values]
- **Constraint Conditions**: [Performance, security, technical constraints]
- **Referenced EARS Requirements**: [Requirement IDs like REQ-XXX, NFR-XXX]

### 🔧 Technical and Implementation Information

- **Language Used**: [JavaScript/TypeScript, etc.]
- **Test Framework**: [Jest/Mocha, etc.]
- **Related Files**: [List of related file paths found through exploration]
- **Design Document Paths**: [List of design document paths found]
- **Similar Implementation Paths**: [File paths of existing implementations for reference]

### 📈 Progress and Quality Information

- **Overall Task Progress**: [Completed]/[Total] ([%])
- **Previous Verification Results**: [Pass/Fail/Not Implemented]
- **Quality Issues**: [Security and performance issues]
- **Improvement Requirements**: [Improvement points recorded previously]

### ⚠️ Notes and Constraints

- **Technical Constraints**: [Architecture and compatibility constraints]
- **Implementation Notes**: [Important notes recorded previously]
- **Unresolved Issues**: [Issues requiring continued attention]
```

## Reliability Level Assessment

Assess the reliability level of each piece of loaded information:

- 🟢 **Green Signal**: File exists and detailed information is available
- 🟡 **Yellow Signal**: File exists but information is partial
- 🔴 **Red Signal**: File does not exist or speculation is required

## Usage

Use at the beginning of each TDD command as follows:

```markdown
## Preliminary Preparation

Prepare development context:

**Task tool execution**: Execute `/tdd-load-context` to load TDD-related files, exploration, and context preparation

After loading completion, start work for {current phase} based on prepared context information.
```

## Effects

- **Efficiency**: Load memos, requirements, and test cases while only exploring others for time savings
- **Consistency**: Unified context preparation across all TDD phases
- **Quality Improvement**: Prevent missing necessary information during loading
- **Maintainability**: Centralized management of file loading and exploration logic
- **Lightweight**: Only identify related files, can be loaded individually as needed

This task efficiently prepares necessary information for each phase of TDD development by combining search results from @agent-symbol-searcher with existing TDD file information.
