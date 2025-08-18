# TDD Red Phase (Failing Test Creation)

Create failing tests for TDD development based on test case definitions.

## Purpose

Create failing tests that define expected behavior for features to be implemented. These tests will fail initially and serve as specifications for implementation in the Green phase.

## Prerequisites

- Test case definition document exists (`docs/implements/{{task_id}}/{feature_name}-testcases.md`)
- Requirements definition document exists
- Development environment is set up
- Test framework is configured

## Execution Content

### 1. Test Case Analysis

- Read test case definition document with Read tool
- Understand test scenarios and expected behavior
- Identify input/output specifications
- Clarify test data requirements

### 2. Test Code Creation

Create test code following these principles:

- **Test Structure**: Follow Given-When-Then pattern
- **Test Data**: Prepare appropriate test data
- **Assertions**: Define clear expected results
- **Failure Confirmation**: Ensure tests fail initially

## Test Code Creation Guidelines

- Structure following Given-When-Then pattern
- Test data preparation (Given)
- Actual process execution (When)
- Result verification (Then)

## Vietnamese Comment Requirements

Test code should include minimal but essential Vietnamese comments:

### Test Case Start Comments

```javascript
describe('{{feature_name}}', () => {
  test('{{test_case_name}}', () => {
    // Test purpose: Verify basic functionality
    // Test data preparation
    const input = {{test_input}};

    // Execute function
    const result = {{function_name}}(input);

    // Verify result
    expect(result).toBe({{expected_output}});
  });
});
```

### Setup & Cleanup Comments (as needed)

```javascript
beforeEach(() => {
  // Setup test environment
});

afterEach(() => {
  // Cleanup after test
});
```

### Essential expect Comments

```javascript
expect(result.property).toBe(expectedValue); // Verify property value
expect(result.array).toHaveLength(3); // Verify array length
expect(result.errors).toContain("error message"); // Verify error message
```

## Example Test Code to Create

```javascript
// Test file: {{test_file_name}}
describe('{{feature_name}}', () => {
  beforeEach(() => {
    // Initialize test environment
    // Clean reset of file system state
  });

  afterEach(() => {
    // Delete temporary files and directories
    // Return system to original state
  });

  test('{{test_case_name}}', () => {
    // Test purpose: {{test_purpose}}
    // Test content: {{test_description}}
    // Expected behavior: {{expected_behavior}}

    // Prepare test data
    // Set initial conditions
    const input = {{test_input}};

    // Execute function
    // Process data
    const result = {{function_name}}(input);

    // Verify result
    // Check expected values
    expect(result).toBe({{expected_output}});
  });
});
```

## Please Provide

1. **Test Code**: In executable format with required Vietnamese comments
2. **Test Execution Command**: How to execute
3. **Expected Failure Message**: What kind of error will occur
4. **Comment Explanation**: Intent and purpose of each Vietnamese comment

After test code creation, execute the following:

1. **Memo File Creation/Update**: Create or append Red phase content to docs/implements/{{task_id}}/{feature_name}-memo.md file
   - If existing memo file exists, update Red phase section
   - If memo file doesn't exist, create new one
2. Save test code design content to docs/implements/{{task_id}}/{feature_name}-red-phase.md (append if existing file exists)
3. Update TODO status (mark Red phase completion)
4. **Quality Assessment**: Assess test code quality based on the following criteria
   - Test execution: Executable and confirmed to fail
   - Expected values: Clear and specific
   - Assertions: Appropriate
   - Implementation approach: Clear
5. **Next Step Display**: Regardless of assessment results, display next recommended command
   - "Next recommended step: Start Green phase (minimal implementation) with `/tdd-green`."

## TDD Memo File Format

Format for docs/implements/{{task_id}}/{feature_name}-memo.md file:

```markdown
# TDD Development Memo: {feature_name}

## Overview

- Feature Name: [Feature name]
- Development Start: [Date/Time]
- Current Phase: [Red/Green/Refactor]

## Related Files

- Original Task File: `docs/tasks/{task file path}.md`
- Requirements Definition: `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- Test Case Definition: `docs/implements/{{task_id}}/{feature_name}-testcases.md`
- Implementation File: `[Implementation file path]`
- Test File: `[Test file path]`

## Red Phase (Failing Test Creation)

### Creation Date/Time

[Date/Time]

### Test Cases

[Overview of created test cases]

### Test Code

[Actual test code]

### Expected Failures

[What kind of failures are expected]

### Requirements for Next Phase

[Content to be implemented in Green phase]

## Green Phase (Minimal Implementation)

### Implementation Date/Time

[Date/Time]

### Implementation Approach

[Minimal implementation approach]

### Implementation Code

[Actual implementation code]

### Test Results

[Results when tests pass]

### Issues & Improvements

[Points to improve in Refactor phase]

## Refactor Phase (Quality Improvement)

### Refactor Date/Time

[Date/Time]

### Improvement Content

[Specific improvement content]

### Security Review

[Security confirmation results]

### Performance Review

[Performance confirmation results]

### Final Code

[Code after refactoring]

### Quality Assessment

[Final quality assessment]
```

## Quality Assessment Criteria

```
✅ High Quality:
- Test execution: Success (confirm that it fails)
- Expected values: Clear and specific
- Assertions: Appropriate
- Implementation approach: Clear

⚠️ Needs Improvement:
- Tests cannot be executed
- Expected values are ambiguous
- Implementation approach is unclear
- Complex test cases
```

## TODO Update Pattern

```
- Mark current TODO "Red Phase (Failing Test Creation)" as "completed"
- Reflect failing test creation phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Green Phase (Minimal Implementation)" to TODO
```

Next step: Use `/tdd-green` to perform minimal implementation to make tests pass.
