# 4.4 Error Handling and Debugging

## Learning Objectives

In this chapter, you will acquire methods for handling various errors that occur during AITDD development and effective debugging techniques:

- Understanding error patterns specific to AI-generated code
- Identifying and correcting prompt-related errors
- Establishing efficient debugging processes
- Decision-making and practice for switching to manual implementation
- Best practices for error prevention

## Error Classification and Response Strategy

In AITDD development, different types of errors occur compared to traditional development. It's important to properly classify these and apply appropriate countermeasures for each.

### Basic Error Classification

**1. Prompt-Related Errors**

- Due to ambiguous instructions
- Due to unclear requirements
- Due to insufficient context

**2. AI Implementation Errors**

- Bugs in AI-generated code
- Consistency issues with existing code
- Performance issues

**3. Integration Errors**

- Problems during multi-feature integration
- Interface inconsistencies
- Dependency issues

**4. Traditional Errors**

- General programming errors
- Environment configuration issues
- External dependency issues

## Practical Debugging Process

### Step 1: Comprehensive Collection of Error Information

When an error occurs, first collect information systematically.

**Information to Collect**:

```markdown
## Error Information Collection Checklist

### Basic Information

- [ ] Error message (complete version)
- [ ] Stack trace
- [ ] Timing of occurrence
- [ ] Execution environment

### Context Information

- [ ] Executed commands
- [ ] Input data
- [ ] Expected behavior
- [ ] Actual behavior

### AI-Related Information

- [ ] Used prompts
- [ ] Relevant parts of AI-generated code
- [ ] Related existing code

### Execution Environment

- [ ] OS/browser information
- [ ] Node.js/TypeScript version
- [ ] Status of dependent packages
```

**Example of Information Collection**:

```
Example of error occurrence record:

Error message:
TypeError: Cannot read property 'map' of undefined
    at getAllTasks (TaskController.ts:15)
    at Router.handle (express/lib/router/layer.js:95)

Timing of occurrence:
During test execution of GET /api/tasks endpoint

Input data:
GET http://localhost:3000/api/tasks
```

### Step 2: AI-assisted Root Cause Analysis

Provide all collected information to AI and ask for a root cause analysis.

Effective analysis prompt:

```
Please analyze the following error:

## Error info
[paste everything you collected]

## Related code
[paste all relevant source code]

## Requests
1. Proximate cause
2. Root causes (design/implementation)
3. Possibility of prompt-induced issues
4. Fix strategy
5. Prevention of similar issues

Please be concrete and practical.
```

Example of AI analysis:

```
## Error analysis

### Proximate cause
TaskController.getAllTasks: taskManager.getAllTasks() returned undefined

### Root causes
1. Incorrect TaskManager instantiation
2. Task array not initialized in getAllTasks

### Prompt-induced possibility
Instruction "use existing TaskManager" was ambiguous and implementation may have proceeded without checking the class definition

### Fix strategy
1. Verify TaskManager initialization
2. Validate getAllTasks return value
3. Add null/undefined checks

### Prevention
1. Include existing code details in prompts
2. Strengthen type-safety of return values
3. Add null/undefined cases in unit tests
```

### Step 3: Iterative Investigation and Hypothesis Testing

Investigate step-by-step based on the analysis.

Example steps:

```typescript
// 1. Confirm TaskManager state
describe("TaskManager debugging", () => {
  test("TaskManager instantiation", () => {
    const manager = new TaskManager();
    console.log("TaskManager instance:", manager);
    expect(manager).toBeDefined();
  });

  test("getAllTasks return value", () => {
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    console.log("getAllTasks result:", result);
    console.log("result type:", typeof result);
    expect(result).toBeDefined();
  });

  test("Initial tasks array state", () => {
    const manager = new TaskManager();
    const tasks = manager.getAllTasks();
    expect(Array.isArray(tasks)).toBe(true);
    console.log("Initial tasks array:", tasks);
  });
});
```

Run debug tests:

```bash
npm test -- --verbose TaskManager debugging
```

### Step 4: Implement Fixes with AI Collaboration

Feed findings back to AI and ask for a fix implementation.

Fix request prompt:

```
From the debugging investigation, we found:

## Findings
[paste debug test output]

## Identified issues
1. Array initialization in TaskManager is incorrect
2. getAllTasks returns undefined

## Fix requirements
Implement fixes so that:
1. Arrays are properly initialized
2. Type-safety is ensured
3. Null/undefined checks are added
4. Existing tests pass
5. New test cases are added

Please include code and explanation of the fix.
```

## Identifying and Fixing Prompt-induced Errors

### Criteria to judge prompt problems

By frequency:

```
Occurrence pattern of similar errors:
- First: treat as implementation error
- Second: consider prompt issue
- Third: prompt fix required
```

Typical signs of prompt issues:

- Different implementations for the same request
- Output deviates greatly from expectations
- Unintended modifications of existing code
- Implementations exceeding requested scope

### Process to fix prompt issues

1. Prompt diagnosis (ask AI to critique the prompt)

```
Please analyze the following prompt and point out issues:

## Prompt used
[the problematic prompt]

## Expected output
[what you expected]

## Actual output
[what you got]

## Diagnosis requests
1. Ambiguous parts
2. Missing information
3. Misleading expressions
4. Improvement proposals
```

2. Create improved prompt

```
Before:
"Create an API endpoint using the TaskManager class"

After:
"Using the following existing TaskManager, implement GET /api/tasks.

Existing code:
[full TaskManager code]

Requirements:
1. Do not change existing code
2. Use Express Router
3. Response format: { success: boolean, data: Task[] }
4. Include error handling
5. Ensure TypeScript type-safety

Output format:
- routes/tasks.ts
- controllers/TaskController.ts
- Corresponding test file"
```

3. Validate the improved prompt

```typescript
describe("Prompt improvement validation", () => {
  test("Reproduce issue with old prompt", async () => {
    // Implement with the old prompt
    // Confirm expected problem happens
  });

  test("Verify fix with improved prompt", async () => {
    // Implement with improved prompt
    // Confirm problem resolved
  });

  test("Check side effects", async () => {
    // Confirm no new issues from the improvement
  });
});
```

## Decision to Switch to Manual Implementation

### When to decide before starting

```markdown
## Checklist for considering manual implementation

### Implementation image

- [ ] You can picture concrete steps
- [ ] Technologies/libraries are clear
- [ ] You can anticipate pitfalls

### Technical complexity

- [ ] Performance optimization is required
- [ ] Complex algorithms are required
- [ ] Deep domain knowledge is required

### Difficulty explaining to AI

- [ ] Requirements hard to articulate
- [ ] Prompts become overly long
- [ ] Too much prerequisite explanation
```

### When to switch during implementation

```
Decision criteria:
1. Same error occurs 3+ times
2. Prompt fixes fail to resolve
3. Debug time exceeds implementation time
4. AI-generated code quality is inconsistent
```

### Effective manual implementation approach

Use AI partially with a staged strategy:

```typescript
// 1) Implement complex logic manually
const complexAlgorithm = (data: any[]) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    // Complex calculations
  }
  return result;
};

// 2) Ask AI to generate boilerplate
const generateApiResponse = (data: any) => ({
  success: true,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    count: Array.isArray(data) ? data.length : 1,
  },
});

// 3) Combine
export const processData = async (inputData: any[]) => {
  try {
    const processedData = complexAlgorithm(inputData);
    return generateApiResponse(processedData);
  } catch (error) {
    // Error handling (can be AI-assisted)
  }
};
```

### Using AI even when implementing manually

1. Leverage IDE AI completion:

```typescript
const taskManager = new TaskManager();
// Use AI completion where helpful
```

2. Ask AI for partial code generation:

```
Please create a validation function based on the following types:

interface TaskInput {
  title: string;
  description?: string;
}

Requirements:
- title required (1–100 chars)
- description optional (0–500 chars)
- Clear error messages for invalid input
- Works as a TypeScript type guard
```

3. Keep the Validation step even when manual

```
Validation checklist for manual implementation:
1. Consistency with spec
2. Type-safety ensured
3. Appropriate error handling
4. Test coverage confirmed
5. Performance appropriate
6. Readability and maintainability
```

## Best Practices to Prevent Errors

### Improve prompt design

1. Clarify context

```
Good prompt example:

"Add a new feature to the following existing system:

Existing code:
[paste all relevant code]

New feature requirements:
[clear and concrete]

Constraints:
- Do not modify existing code
- Ensure TypeScript type-safety
- Error handling required

Expected output:
- Implementation code
- Test code
- Usage example
- Notes"
```

2. Phase the implementation

```
Implement complex features step by step:

Step 1: Interface design
Step 2: Basic implementation
Step 3: Error handling
Step 4: Test creation

Confirm each step before moving on.
```

### Strengthen test strategy

1. Tests specific to AI-generated code

```typescript
describe("AI-generated code validation", () => {
  test("No unintended changes to legacy code", () => {
    const originalFunction = require("./legacy/original-module");
    expect(originalFunction.criticalMethod).toBeDefined();
    expect(typeof originalFunction.criticalMethod).toBe("function");
  });

  test("Scope check for inferred implementations", () => {
    const implementation = new FeatureImplementation();
    expect(implementation.getImplementedFeatures()).toEqual(
      expect.arrayContaining(REQUIRED_FEATURES)
    );
  });

  test("Type-safety holds", () => {
    // Confirm TypeScript compile passes
  });
});
```

2. Strengthen integration tests

```typescript
describe("Feature integration tests", () => {
  test("Regression when integrating three features", async () => {
    const feature1 = await executeFeature1();
    const feature2 = await executeFeature2(feature1.result);
    const feature3 = await executeFeature3(feature2.result);
    expect(feature3.result).toMatchExpectedOutput();
  });
});
```

### Continuous improvement process

1. Accumulate error patterns

```markdown
## Error pattern management

### Frequent errors

1. undefined/null access

   - Cause: Missing initialization in AI code
   - Countermeasure: Explicit instructions to initialize

2. Type mismatch

   - Cause: Missing type info in prompt
   - Countermeasure: Provide explicit type definitions

3. Legacy code modification
   - Cause: Weak "do not modify" constraint
   - Countermeasure: Concrete constraint instructions
```

2. Improve prompt templates

```
Improved prompt template:

### Base Template

Feature: [name]
Target: [what to implement]

Existing code:
[all related code]

Requirements:
[clear and concrete]

Constraints:
- Do not modify existing code
- [other constraints]

Expected output:
- [expected format]

Quality requirements:
- TypeScript type-safety
- Error handling
- Include test code
```

## Practical Debugging Techniques

### Log-based debugging

Effective logging helper and usage:

```typescript
class DebugLogger {
  static log(context: string, data: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[${context}]`, {
        timestamp: new Date().toISOString(),
        data: JSON.stringify(data, null, 2),
      });
    }
  }

  static error(context: string, error: any) {
    console.error(`[ERROR:${context}]`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
}

export const taskController = {
  getAllTasks: async (req, res, next) => {
    try {
      DebugLogger.log("TaskController.getAllTasks", "Starting execution");
      const tasks = taskManager.getAllTasks();
      DebugLogger.log("TaskController.getAllTasks", {
        tasksCount: tasks?.length,
      });
      const response = generateResponse(tasks);
      DebugLogger.log("TaskController.getAllTasks", { response });
      res.json(response);
    } catch (error) {
      DebugLogger.error("TaskController.getAllTasks", error);
      next(error);
    }
  },
};
```

### Test-driven debugging

Work backward from a failing test:

```typescript
describe("Bug reproduction test", () => {
  test("Reproduce null error under specific conditions", () => {
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    expect(() => result.map((x) => x.id)).toThrow();
  });

  test("Verify after the fix", () => {
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    expect(Array.isArray(result)).toBe(true);
    expect(() => result.map((x) => x.id)).not.toThrow();
  });
});
```

## Summary

In this chapter, you learned comprehensive error handling and debugging methods for AITDD development:

Main outcomes:

- Proper classification and handling of errors
- Efficient debugging with AI support
- Identification and correction of prompt-induced errors
- Decision-making for switching to manual implementation and a hybrid AI strategy
- Best practices for error prevention

Practical skills:

- Comprehensive information gathering
- AI-assisted error analysis
- Stepwise problem solving
- Continuous quality improvement

Next:
With these skills, you are ready to learn advanced AITDD optimization techniques. We proceed to prompt design optimization and AI utilization.
