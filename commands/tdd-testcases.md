# TDD Test Case Creation

Create comprehensive test cases for TDD development based on requirements definition.

## Purpose

Create detailed test cases covering normal cases, abnormal cases, and edge cases based on requirements definition documents. Prepare for Red phase (failing test creation) in TDD cycle.

## Prerequisites

- Requirements definition document exists (`docs/implements/{{task_id}}/{feature_name}-requirements.md`)
- Feature to be implemented is clearly defined
- Development environment is set up

## Execution Content

### 1. Requirements Analysis

- Read requirements definition document with Read tool
- Extract functional requirements and constraints
- Identify input/output specifications
- Clarify expected behavior and error handling

### 2. Test Case Design

Design test cases covering the following three categories:

#### 2.1 Normal System Test Cases

- **Test Name**: [Easy-to-understand Vietnamese name]
  - **Test Case Overview**: [What normal operation is expected]
  - **Business Value**: [Why this functionality is important]
- **Input Values**: [Specific values]
  - **Meaning of Input Data**: [Why this input value was chosen]
- **Expected Results**: [Specific expected values]
  - **Reason for Expected Results**: [Why this result is considered correct]
- **Test Purpose**: [What to verify]
  - **Verification Points**: [Points to pay special attention to during verification]

#### 2.2 Abnormal System Test Cases (Error Handling)

- **Test Name**: [Easy-to-understand Vietnamese name]
  - **Error Case Overview**: [What abnormal situation is anticipated]
  - **Error Handling Importance**: [Why this error handling is necessary]
- **Input Values**: [Invalid values or values exceeding boundaries]
  - **Reason for Invalidity**: [Why this input value is considered invalid]
  - **Actual Occurrence Scenarios**: [In what situations this occurs in actual operation]
- **Expected Results**: [Appropriate error messages or exceptions]
  - **Error Message Content**: [Whether the message is understandable for users]
  - **System Safety**: [Whether the system can maintain safe state during errors]
- **Test Purpose**: [Error handling verification]
  - **Quality Assurance Perspective**: [How this test contributes to system quality]

#### 2.3 Boundary Value Test Cases (Minimum, maximum, null, etc.)

- **Test Name**: [Easy-to-understand Vietnamese name]
  - **Boundary Value Meaning**: [Why this value is important as a boundary]
  - **Behavior Guarantee at Boundary**: [Consistency confirmation of behavior near boundaries]
- **Input Values**: [Boundary values]
  - **Reason for Boundary Value Selection**: [Why this value was chosen as boundary]
  - **Actual Usage Scenarios**: [How this boundary value affects actual operation]
- **Expected Results**: [Behavior at boundaries]
  - **Accuracy at Boundaries**: [Whether calculations and processing are accurate at boundary values]
  - **Consistent Behavior**: [Whether behavior is consistent inside and outside boundaries]
- **Test Purpose**: [Boundary condition verification]
  - **Robustness Confirmation**: [Whether system operates stably under extreme conditions]

## Development Language & Framework

Please specify the language and test framework to be used for implementation:

- **Programming Language**: {{language}}
  - **Reason for Language Selection**: [Why this language was chosen]
  - **Features Suitable for Testing**: [Advantageous features of this language for testing]
- **Test Framework**: {{test_framework}}
  - **Reason for Framework Selection**: [Why this test framework was chosen]
  - **Test Execution Environment**: [In what environment tests will be executed]

## Vietnamese Comment Guidelines for Test Case Implementation

When implementing each test case, include minimal but essential Vietnamese comments:

### Test Case Start Comments

```javascript
// Test purpose: Verify basic functionality
// Test content: Test normal operation
// Expected behavior: Function returns expected result
```

### Given (Preparation Phase) Comments

```javascript
// Prepare test data
// Set initial conditions
// Confirm prerequisites
```

### When (Execution Phase) Comments

```javascript
// Execute function
// Process data
// Call method
```

### Then (Verification Phase) Comments

```javascript
// Verify result
// Check expected values
// Validate output
```

### Essential expect Comments

```javascript
expect(result.validPaths).toHaveLength(2); // Verify valid paths count
expect(result.invalidPaths).toContain("nonexistent.json"); // Verify invalid path detection
```

### Setup & Cleanup Comments

```javascript
beforeEach(() => {
  // Setup test environment
});

afterEach(() => {
  // Cleanup after test
});
```

After identifying everything, execute the following:

1. Save test case list to docs/implements/{{task_id}}/{feature_name}-testcases.md (append if existing file exists)
2. Update TODO status (mark test case identification completion)
3. **Quality Assessment**: Assess test case quality based on the following criteria
   - Test case classification: Normal, abnormal, and boundary value cases are covered
   - Expected value definition: Expected values for each test case are clear
   - Technology selection: Programming language and test framework are determined
   - Implementation feasibility: Achievable with current technology stack
4. **Next Step Display**: Regardless of assessment results, display the next recommended command
   - "Next recommended step: Start Red phase (failing test creation) with `/tdd-red`."

## Quality Assessment Criteria

Assess test case quality based on the following criteria:

```
✅ High Quality:
- Test case classification: Normal, abnormal, and boundary value cases are covered
- Expected value definition: Expected values for each test case are clear
- Technology selection: Programming language and test framework are determined
- Implementation feasibility: Achievable with current technology stack

⚠️ Needs Improvement:
- Test cases have gaps or duplicates
- Expected values are ambiguous or insufficient
- Technology selection is uncertain
- Too complex to implement

❌ Inappropriate:
- Inconsistent with requirements
- Insufficient test cases
- Technical feasibility issues
```

## TODO Update Pattern

```
- Mark current TODO "Test case identification" as "completed"
- Reflect test case definition phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Red phase (failing test creation)" to TODO
```
