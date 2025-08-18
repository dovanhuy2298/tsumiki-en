# TDD Green Phase (Implementation)

Execute the Green phase of TDD.

## Preliminary Preparation

Prepare development context:

1. **Search for implementation-related information using @agent-symbol-searcher and read found files**

   - Search for existing similar features and utility functions, and read corresponding files with Read tool
   - Identify implementation patterns and architecture guidelines, and read design documents with Read tool
   - Check dependencies and import paths, and read related files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-red-phase.md` - Check Red phase tests
   - Read related design documents and task files as needed

After loading completion, start Green phase (implementation) work based on prepared context information.

**Use Task tool when executing tests**

## Reliability Level Instructions

When creating implementation code, comment on the verification status with original materials for each implementation content using the following signals:

- 🟢 **Green Signal**: When referring to original materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on original materials
- 🔴 **Red Signal**: When speculation is not based on original materials

## Objective

Please perform **implementation** to make tests created in the Red phase pass.

## Implementation Principles

- **Highest priority on ensuring tests pass**
- Code beauty is secondary (improve in next Refactor phase)
- "Just working" level is OK
- Postpone complex logic, focus on simple implementation
- When tests are hard to pass, use Task tool to investigate failure causes before making implementation plan
- If existing tests fail, fix appropriately based on specifications
- **Mock Usage Restrictions**: Do not write mocks outside test code (implementation code should write actual logic)
- **File Size Management**: Consider file splitting when implementation file exceeds 800 lines
- NEVER: Prohibition of skipping necessary tests
- NEVER: Prohibition of deleting necessary tests
- NEVER: Prohibition of writing mocks/stubs in implementation code
- NEVER: Prohibition of using in-memory storage instead of DB in implementation code
- NEVER: Prohibition of omitting DB operations in implementation code

## Vietnamese Comment Requirements for Implementation

Implementation code should include minimal but essential Vietnamese comments:

### Function/Method Level Comments

```javascript
/**
 * Validate JSON file paths and classify valid/invalid paths
 * @param {string} input - Input file paths
 * @returns {object} - Classification result
 */
function validatePaths(input) {
  // Basic input validation
  if (!input) {
    throw new Error("Input value is required");
  }

  // Simple implementation to pass tests
  return {
    validPaths: [],
    invalidPaths: [],
    errors: [],
  };
}
```

### Essential Comments Only

```javascript
function processData(input) {
  // Input validation
  if (!input) {
    throw new Error("Input value is invalid");
  }

  // Process data and return result
  const result = {
    validData: [],
    invalidData: [],
    errors: [],
  };

  return result;
}
```

## Implementation Examples

```javascript
/**
 * Validate JSON file paths and classify valid/invalid paths
 * Implementation approach: Minimal functionality to pass test cases
 */
function validatePaths(input) {
  // Input validation
  if (!input) {
    throw new Error("Input value is required");
  }

  // Minimal implementation to pass tests
  return {
    validPaths: [],
    invalidPaths: [],
    errors: [],
  };
}
```

## Phased Implementation Guidelines

1. **First pass only one test case**
   - Implementation Strategy: Avoid simultaneous handling of multiple tests
   - Quality Assurance: Ensure quality by implementing one by one
2. **Implement in simplest way possible**
   - Simple Implementation: Complex algorithms will be added in later refactor phase
   - Readability Priority: Prioritize ease of understanding at this stage
3. **File size conscious implementation**
   - 800 Line Limit: Consider file splitting when implementation file exceeds 800 lines
   - Module Design: Appropriately separate files by functionality
   - Function Division: Divide long functions into small units
   - Responsibility Boundaries: Clearly define responsibility scope of each file
4. **Consider code quality standards**
   - Static Analysis Support: Aim for implementation without lint or typecheck errors
   - Format Consistency: Implementation matching project's existing format
   - Naming Convention Compliance: Implementation following project's naming conventions
5. **Postpone other test cases**
   - Phased Development: Follow TDD principles, proceed one step at a time
   - Limited Impact Scope: Minimize impact of changes
6. **Minimal error handling**
   - Minimal Necessity: Implement only parts required by tests
   - Future Extensibility: Detailed error handling will be added in refactor phase
7. **Mock usage restrictions**
   - Implementation Code Restriction: Don't use mocks/stubs in implementation code
   - Test Code Only: Mocks used only in test code
   - Actual Logic Implementation: Implementation code should describe actual processing
   - Dependency Injection: Use dependency injection pattern as needed

## Please Provide

1. **Implementation Code**: Code that passes tests (with required Vietnamese comments)
2. **Test Execution Results**: Confirmation that tests actually pass using Task tool
3. **Implementation Explanation**: How implementation was thought out (correspondence with Vietnamese comments)
4. **Issue Identification**: Current implementation problems (clarification of refactor targets)
5. **File Size Check**: Implementation file line count confirmation (splitting plan when exceeding 800 lines)
6. **Mock Usage Verification**: Confirmation that implementation code contains no mocks/stubs

After implementation completion, execute the following:

1. **Memo File Update**: Update Green phase section of docs/implements/{{task_id}}/{feature_name}-memo.md file
   - Record implementation policy, implementation code, test results, issues and improvements
   - Record in detail for reference in next Refactor phase
2. Save implementation code and design content to docs/implements/{{task_id}}/{feature_name}-green-phase.md (append if existing file exists)
3. Update TODO status (mark Green phase completion)
4. **Automatic Transition Assessment**: Automatically execute `/tdd-refactor` if the following conditions are met
   - All tests confirmed successful using Task tool
   - Implementation is simple and easy to understand
   - Clear refactoring areas exist
   - No functional problems
5. **Manual Confirmation**: If automatic transition conditions are not met, provide the following:
   - "Confirmed tests passed using Task tool."
   - "Current implementation: [brief description]"
   - "Vietnamese comments included in implementation: [purpose and content of comments]"
   - "Refactoring candidates: [points to improve]"
   - "May we proceed to the next Refactor phase?"

## Quality Assessment Criteria

```
✅ High Quality:
- Test Results: All successful in Task tool execution
- Implementation Quality: Simple and functional
- Refactoring Areas: Clearly identifiable
- Functional Issues: None
- Compile Errors: None
- File Size: 800 lines or less, or clear splitting plan
- Mock Usage: No mocks/stubs in implementation code

⚠️ Needs Improvement:
- Some tests failing (detected by Task tool)
- Implementation too complex
- Refactoring approach unclear
- Functional concerns exist
- Compile errors exist
- File size exceeds 800 lines with unclear splitting plan
- Implementation code contains mocks/stubs
```

## TODO Update Pattern

```
- Mark current TODO "Green Phase (Minimal Implementation)" as "completed"
- Reflect minimal implementation phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Refactor Phase (Quality Improvement)" to TODO
```

Next step: Use `/tdd-refactor` to improve code quality.
