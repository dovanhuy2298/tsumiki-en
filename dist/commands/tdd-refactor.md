# TDD Refactor Phase (Quality Improvement)

Improve code quality while maintaining functionality after tests pass.

## Purpose

Refactor code to improve quality, maintainability, and performance while ensuring all tests continue to pass. Focus on code structure, security, and performance optimization.

## Prerequisites

- Green phase is complete (tests are passing)
- Implementation code exists
- Test suite is comprehensive

## Execution Content

### 1. Code Structure Improvement

- Apply SOLID principles
- Improve function and variable naming
- Organize code into logical sections
- Remove code duplication

### 2. Readability Enhancement

- Improve code organization
- Add clear comments
- Simplify complex logic
- Use consistent formatting

### 3. Design Improvement

- Apply single responsibility principle
- Organize dependencies
- Consider modularization

- NEVER: Write mocks/stubs in implementation code
- NEVER: Use in-memory storage instead of DB in implementation code

### 4. File Size Optimization

- Split and optimize to keep file size under 500 lines
- Split large files by functionality
- Set appropriate module boundaries

### 5. Code Quality Assurance

- Resolve lint errors
- Resolve typecheck errors
- Unify formatting
- Clear static analysis tool checks

### 6. Security Review

- Detect and fix implementations leading to vulnerabilities
- Strengthen input validation
- Confirm SQL injection countermeasures
- Confirm XSS (Cross-Site Scripting) countermeasures
- Confirm CSRF (Cross-Site Request Forgery) countermeasures
- Avoid data leakage risks
- Proper authentication and authorization implementation

### 7. Performance Review

- Analyze algorithm computational complexity
- Optimize memory usage
- Remove unnecessary processing
- Consider cache strategies
- Optimize database queries
- Improve loop processing efficiency
- Proper asynchronous processing implementation

### 8. Error Handling Enhancement

- Input validation
- Appropriate error messages
- Exception handling improvement

## Vietnamese Comment Enhancement Requirements for Refactoring

During refactoring, improve existing Vietnamese comments and add new ones:

### Improved Function/Method Comments

```javascript
/**
 * 【Function Overview】: [Detailed explanation of functionality after refactoring]
 * 【Improvement Content】: [Explanation of what improvements were made]
 * 【Design Approach】: [Reason why this design was chosen]
 * 【Performance】: [Performance considerations]
 * 【Maintainability】: [Efforts to make maintenance easier]
 * 🟢🟡🔴 Reliability Level: [To what extent this improvement is based on original materials]
 * @param {type} paramName - [Detailed parameter explanation and constraints]
 * @returns {type} - [Detailed return value explanation and guarantees]
 */
function improvedFunction(paramName) {
  // 【Implementation Details】: [Content and reasons for improved implementation]
}
```

### Helper Function/Utility Comments

```javascript
/**
 * 【Helper Function】: [Role of this function and creation reason]
 * 【Reusability】: [In what situations it can be reused]
 * 【Single Responsibility】: [Scope of responsibility this function handles]
 */
function helperFunction(input) {
  // 【Processing Efficiency】: [Efforts to make processing more efficient] 🟢🟡🔴
  // 【Readability Improvement】: [Mechanism to improve code readability] 🟢🟡🔴
}
```

### Constant/Configuration Value Comments

```javascript
// 【Configuration Constant】: [Role of this constant and configuration reason] 🟢🟡🔴
// 【Adjustability】: [Possibility of future adjustment needs and methods] 🟢🟡🔴
const IMPROVED_CONSTANT = 100; // 【Optimized】: Optimized based on performance tests 🟢🟡🔴

// 【Configuration Object】: [Reason for grouping configurations and management policy]
const CONFIG = {
  // 【Each Configuration Item】: [Meaning and impact scope of each configuration value]
  maxRetries: 3, // 【Retry Count】: Appropriate count based on actual operation experience
  timeout: 5000, // 【Timeout】: Time setting considering usability
};
```

### Error Handling Improvement Comments

```javascript
try {
  // 【Safe Processing Execution】: [Possibility of exceptions and countermeasures]
  const result = riskyOperation();
} catch (error) {
  // 【Detailed Error Handling】: [Appropriate processing according to error type]
  // 【Usability】: [Error handling understandable for users]
  if (error.code === "SPECIFIC_ERROR") {
    // 【Specific Error Handling】: [Reason for processing specialized for this error]
    return handleSpecificError(error);
  }
  // 【General Error Handling】: [Safe response to unexpected errors]
  return handleGenericError(error);
}
```

## Refactoring Process

1. **Confirm all current tests pass**
   - 【Quality Assurance】: Verify behavior before refactoring
   - 【Safety Assurance】: Prevent functionality breakdown from changes
   - 【Execution Method】: Use Task tool to execute tests and analyze results in detail
2. **Code/Test Exclusion Check**
   - 【.gitignore Confirmation】: Check if code files that should be verified are not excluded
   - 【Test Exclusion Confirmation】: Check if tests are not disabled with `describe.skip`, `it.skip`, `test.skip`, etc.
   - 【Jest Configuration Confirmation】: Check if test files are not excluded in `jest.config.js` or `package.json`'s `testPathIgnorePatterns`, etc.
   - 【Execution Target Confirmation】: Check if tests and code that should actually be executed are appropriately included in targets
3. **Clean up development-generated files**
   - 【Unnecessary File Detection】: Detect and delete temporary files created during development
   - 【Target File Patterns】: Check files matching the following patterns
     - `debug-*.js`, `debug-*.ts`: Debug scripts
     - `test-*.js`, `test-*.ts`, `temp-*.js`: Temporary test files
     - `*.tmp`, `*.temp`, `*.bak`, `*.orig`: Temporary/backup files
     - `*~`, `.DS_Store`: Editor/system generated files
     - `test-output-*`, `*.test-output`: Test output files
   - 【Safety Confirmation】: Check content of each file before deletion to ensure no important code is included
   - 【Selective Deletion】: Delete only files judged unnecessary, keep necessary files
   - 【Deletion Log】: Record deleted files and deletion reasons as logs
   - 【Execution Procedure】:
     1. Use `find . -name "debug-*" -o -name "test-*" -o -name "temp-*" -o -name "*.tmp" -o -name "*.temp" -o -name "*.bak" -o -name "*.orig" -o -name "*~" -o -name ".DS_Store" | grep -v node_modules` to detect files
     2. Check content of each file with Read tool
     3. Delete files judged unnecessary and record deletion reasons
4. **Conduct Security Review**
   - 【Vulnerability Inspection】: Identify security holes in entire codebase
   - 【Input Validation Confirmation】: Confirm defense functions against invalid input values
   - 【Security Guideline Application】: Apply industry-standard security best practices
5. **Conduct Performance Review**
   - 【Computational Complexity Analysis】: Evaluate time and space complexity of algorithms
   - 【Bottleneck Identification】: Identify problem areas in processing speed and memory usage
   - 【Optimization Strategy】: Formulate specific performance improvement measures
6. **Apply small improvements one by one**
   - 【Phased Improvement】: Safe changes with limited impact scope
   - 【Traceability】: Ensure traceability of changes
7. **Execute tests after each improvement**
   - 【Continuous Verification】: Verify behavior with each improvement
   - 【Early Detection】: Early detection and correction of problems
   - 【Execution Method】: Use Task tool to execute tests and confirm impact of improvements
8. **Immediately revert if tests fail**
   - 【Rapid Recovery】: Quick response when problems occur
   - 【Stability Maintenance】: Maintain stable system state

## Important Notes

- **Do not make functional changes** (No new feature additions)
- **Fix immediately if tests stop passing**
- **Do not make large changes at once**
- **Also improve quality of Vietnamese comments**
- **Use Task tool when executing tests for quality confirmation**

## Please Provide

1. **Security Review Results**: Presence/absence of vulnerabilities and countermeasures
2. **Performance Review Results**: Analysis of performance issues and improvement measures
3. **Improved Code**: Code after refactoring (with enhanced Vietnamese comments)
4. **Improvement Point Explanation**: What and how improvements were made (including security and performance perspectives)
5. **Test Execution Results**: Confirmation that all tests continue to pass using Task tool
6. **Quality Assessment**: Current code quality level (including security and performance evaluation)
7. **Comment Improvement Content**: How Vietnamese comments were enhanced

## Refactoring Examples

```javascript
// Before: Hard-coded
function add(a, b) {
  return 5; // Implementation that works for now
}

// After: Appropriate implementation (with improved Vietnamese comments)
/**
 * 【Function Overview】: Add two numbers and return result
 * 【Improvement Content】: Remove hard-coding and implement actual addition processing
 * 【Design Approach】: Design emphasizing input validation and type safety
 * 【Error Handling】: Implement appropriate exception handling for invalid input
 */
function add(firstNumber, secondNumber) {
  // 【Input Validation】: Detect non-numeric input early to prevent errors
  // 【Type Safety】: Implement runtime validation along with TypeScript type checking
  if (typeof firstNumber !== "number" || typeof secondNumber !== "number") {
    // 【Usability】: Provide error messages understandable for developers
    throw new Error("Arguments must be numbers");
  }

  // 【Main Processing】: Simple and reliable addition processing
  // 【Performance】: Efficient implementation avoiding unnecessary processing
  return firstNumber + secondNumber;
}
```

After refactoring completion, execute the following:

1. **Final memo file update**: Update Refactor phase section and overview of docs/implements/{{task_id}}/{feature_name}-memo.md file
   - Record improvement content, security review results, performance review results
   - Record final code and quality evaluation
   - Update current phase in overview section to "completed"
2. Save refactoring content and design improvements to docs/implements/{{task_id}}/{feature_name}-refactor-phase.md (append if existing file exists)
3. Update TODO status (mark Refactor phase completion)
4. **Quality Assessment**: Assess refactoring results quality based on the following criteria
   - Test results: All tests continue to succeed
   - Security: No critical vulnerabilities discovered
   - Performance: No critical performance issues discovered
   - Refactoring quality: Goals achieved
   - Code quality: Improved to appropriate level
5. **Next Step Display**: Regardless of assessment results, display the next recommended command
   - "Next recommended step: Execute completeness verification with `/tdd-verify-complete`."

## Quality Assessment Criteria

```
✅ High Quality:
- Test results: All continue to succeed in Task tool execution
- Security: No critical vulnerabilities
- Performance: No critical performance issues
- Refactoring quality: Goals achieved
- Code quality: Appropriate level
- Documentation: Complete

⚠️ Needs Improvement:
- Some tests failing (detected by Task tool)
- Security vulnerabilities discovered
- Performance issues discovered
- Refactoring goals not achieved
- Quality improvement insufficient
- Documentation deficiencies
```

## TODO Update Pattern

```
- Mark current TODO "Refactor Phase (Quality Improvement)" as "completed"
- Reflect refactoring phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Completeness Verification" to TODO
- Add new TODOs for areas requiring improvement if any
```
