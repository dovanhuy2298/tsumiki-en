# TDD Verify Complete

## Purpose

Verify the completeness of TDD development by checking test case implementation status, requirements coverage, and overall quality. Determine whether to proceed to the next TDD cycle or require additional implementation.

## Prerequisites

- TDD development has progressed through Red, Green, and Refactor phases
- Test cases have been implemented and are passing
- Requirements definition documents exist
- Implementation files are available

## Execution Content

### 1. Test Case Implementation Status Verification

- Check all planned test cases from requirements definition
- Verify implementation status of each test case
- Confirm test execution results (pass/fail)
- Count number of implemented test cases
- Compare each test case content with plans

### 2. Requirements Coverage Analysis

- Check requirements definition document (`requirements.md`)
- Verify implementation status of each requirement item
- Calculate requirements coverage rate
- Identify unimplemented requirement items
- Assess quality of implemented requirements

### 3. Implementation Status Analysis and TODO.md Update Determination

Please provide analysis results in the following format:

```
## Test Case Implementation Status

### 📋 TODO.md Target Task Confirmation
- **Target Task**: [Current TDD development target task name]
- **Current Status**: [Incomplete/Partially Complete/Complete]
- **Completion Mark Required**: [Required/Not Required]

### 📋 Planned Test Cases (from requirements definition)
- **Total**: [Total planned test cases]
- **Classification**:
  - Normal cases: [number] cases
  - Abnormal cases: [number] cases
  - Edge cases: [number] cases
  - Others: [number] cases

### ✅ Implemented Test Cases
- **Total**: [Total implemented test cases]
- **Success Rate**: [Passing tests]/[Implemented tests] ([Success rate]%)

### ❌ Unimplemented Test Cases ([number] cases)
1. **Test Case Name**: [Test that was planned but not implemented]
   - **Type**: [Normal/Abnormal/Edge case]
   - **Content**: [Detailed test content]
   - **Importance**: [High/Medium/Low]
   - **Requirement Item**: [Corresponding requirement definition item]

2. **Test Case Name**: [Second unimplemented test]
   ...

### 📋 Requirements Definition Coverage Check
- **Total Requirement Items**: [Total items in requirements definition]
- **Implemented Items**: [Implemented and tested items]
- **Requirements Coverage Rate**: [Implemented]/[Total] = [Coverage rate]%

#### Uncovered Requirement Items ([number] items)
1. **Requirement Item**: [Unimplemented requirement item name]
   - **Classification**: [Input parameters/Output specifications/Constraints/Usage examples/Error cases, etc.]
   - **Content**: [Detailed requirement content]
   - **Reason for Implementation Shortage**: [Why not implemented]
   - **Correspondence Necessity**: [Required/Recommended/Optional]

2. **Requirement Item**: [Second uncovered item]
   ...

### 📊 Implementation Rate
- **Overall Implementation Rate**: [Implemented]/[Planned] = [Implementation rate]%
- **Normal Case Implementation Rate**: [Implemented]/[Planned] = [Implementation rate]%
- **Abnormal Case Implementation Rate**: [Implemented]/[Planned] = [Implementation rate]%
- **Edge Case Implementation Rate**: [Implemented]/[Planned] = [Implementation rate]%
```

### 4. Determination Criteria

#### ✅ Complete Implementation (Automatically proceed to next step)

```
- Existing test status: All green
- Requirements coverage rate: 100% (All requirement items implemented and tested)
- Test success rate: 100%
- Unimplemented important requirements: 0 items
- Quality standards: Complete fulfillment of requirements definition achieved
```

#### ⚠️ Implementation Shortage (Additional implementation required)

```
- Existing test status: Failed tests exist OR
- Requirements coverage rate: Less than 100% (Implementation shortage for requirement definition items)
- Important requirement items unimplemented and untested
- Quality risk in requirement fulfillment
```

### 5. Verification Result Memo File Recording and TODO.md Update

#### Memo File Integration Update

After verification completion, organize and integrate existing content in `docs/implements/{{task_id}}/{feature_name}-memo.md`, updating with the following information:

```markdown
# [Feature Name] TDD Development Completion Record

## Documents to Check

- `docs/tasks/{task file path}.md`
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

## 🎯 Final Results ([Date/Time])

- **Implementation Rate**: [number]% ([Implemented]/[Planned] test cases)
- **Quality Determination**: [Pass/Fail]
- **TODO Update**: [✅ Completion mark added/Improvement required]
```

**Important Technical Learning**

### Implementation Patterns

[Important implementation techniques that can be reused in the future]

### Test Design

[Effective test approaches]

### Quality Assurance

[Important perspectives for quality assurance]

## ⚠️ Important Points & Items Requiring Correction (only when applicable)

[Important implementation notes or incomplete items]

### 🔧 Correction Targets in Later Processes

#### Test Failures

- [Failing test case name]
- **Failure Content**: [Specific failure content]
- **Correction Approach**: [Recommended correction method]

#### Implementation Shortages

- [Unimplemented functionality or requirements]
- **Shortage Content**: [Specific shortage content]
- **Correspondence Approach**: [Recommended correspondence method]

#### Quality Improvements

- [Areas requiring quality improvement]
- **Improvement Content**: [Specific improvement content]
- **Improvement Approach**: [Recommended improvement method]

---

_Integrate important information from existing memo content, remove duplicates and detailed progress records_

````

**Integration Update Rules:**

1. **Important Information Retention**: Integrate technical learning points and reusable patterns from existing memos
2. **Duplicate Removal**: Consolidate similar records and detailed progress into latest information
3. **Simplification**: Keep only final results for details like dates and numbers
4. **Reusability Priority**: Prioritize information useful for future development
5. **Related Information Priority**: Prioritize information like specifications

#### Original Task File Completion Mark Automatic Update

When verification is complete, automatically update the original task file with the following steps:

1. **Identify Completed Task**: Identify current TDD development target task from original task file
2. **Add Completion Mark**: Add `✅ **Complete**` mark to corresponding task
3. **Record Completion Reason**: Add `(TDD development complete - [test count] test cases all passed)`
4. **Update Subtasks**: Add `[x]` checkmarks to related subtasks

Example:

```markdown
### 1. JSON File Path Argument Processing Function ✅ **Complete** (TDD development complete - 15 test cases all passed)

- [x] Add functionality to receive JSON file path via command line arguments
- [x] Support multiple JSON file paths (read entire sample/ directory)
- [x] Argument validation functionality
````

### 6. Corresponding Actions

#### When Implementation is Complete

Display the following message along with recommended next commands:

```
✅ Test case completeness verification: Pass
- Planned test cases: [number] all implemented
- Test success rate: 100%
- Quality standards: Achieved

Next recommended step: Start next TDD cycle with `/tdd-cycle`.
```

**Memo File Recording**: Automatically append verification results to memo file.
**Original Task File Update**: Automatically add ✅ completion mark to completed tasks.

#### When Implementation is Insufficient

Provide the following message and record the situation:

```
⚠️ Test case implementation shortage detected

There are [number] unimplemented test cases.
The following content has been recorded in memo file:

[List of unimplemented test cases]

**Important**: No corrections are made in this process.
Content requiring correction is recorded in memo file and will be addressed in later processes.

Completing current record and proceeding to next step.
```

**Memo File Recording**: Record detailed verification results and correction approaches for implementation shortages in memo file.
**Original Task File Update**: Even with implementation shortages, appropriately mark partially completed tasks.
**Correction Work Prohibition**: No correction work is performed in this process.

## Verification Target Files

### Documents to Check

- **Original Task File**: `docs/tasks/{task file path}.md` - Overall project task completion status (target for completion mark updates)
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

### Test Files to Check

- `src/__tests__/*.test.ts`
- `src/__tests__/*.test.js`

### Implementation Files to Check

- `src/*.ts`
- `src/*.js`

### Files Changed in Git

- Files changed with `git status`
- Files changed with `git diff --name-only`

## Quality Standards

### Minimum Quality Standards

- **Implementation Rate**: 80% or higher
- **Success Rate**: 100%
- **Important Tests**: All implemented
- **Requirements Coverage**: Cover all major functionality in requirements definition
- **Compile Errors**: None

### Ideal Quality Standards

- **Implementation Rate**: 100%
- **Success Rate**: 100%
- **Coverage**: All cases covered
- **Complete Requirements Coverage**: Cover all items in requirements definition

### Requirements Definition Coverage Check

Check whether the following items documented in requirements definition document (requirements.md) are implemented and tested:

#### Required Check Items

- **Input Parameters**: Processing of all required and optional arguments
- **Output Specifications**: Implementation of expected output format and structure
- **Constraints**: Performance, security, compatibility requirements
- **Basic Usage Examples**: Basic usage patterns as expected
- **Edge Cases**: Processing of boundary values and exception conditions
- **Error Cases**: Appropriate processing of abnormal cases
- **Core Algorithms**: Core processing logic for functionality

#### Coverage Determination Criteria

```
✅ Complete Coverage (100%):
- All items in requirements definition are implemented and tested
- Test all patterns of input parameters
- Verify all formats of output specifications
- Cover all error cases and edge cases

⚠️ Partial Coverage (80-99%):
- Major functionality is implemented but some items are unimplemented
- Basic usage examples are covered
- Some unimportant error cases are unimplemented

❌ Insufficient (<80%):
- Important items in requirements definition are unimplemented
- Basic usage examples have gaps
- Error handling is insufficient
```

## Automatic Transition Determination

### Quality Determination Criteria

```
✅ High Quality (Complete requirement fulfillment achieved):
- Existing test status: All green
- Requirements coverage rate: 100% (Complete implementation and testing for all items in requirements definition)
- Test success rate: 100%
- Unimplemented important requirements: 0 items
- Requirement fulfillment: Complete fulfillment of requirements definition achieved

⚠️ Needs Improvement (Insufficient requirement fulfillment):
- Existing test status: Failed tests exist OR
- Requirements coverage rate: Less than 100% (Implementation and testing shortage for items in requirements definition)
- Important requirement items are unimplemented and untested
- Requirement fulfillment: Insufficient fulfillment of requirements definition
- Additional implementation required to improve requirement fulfillment
```

## Usage Examples

```bash
# Automatically executed after refactor phase
/tdd-refactor
# ↓ Automatically executed
/tdd-verify-complete
# ↓ Automatically executed if implementation is complete
/tdd-cycle
```

## Output Format

Output in one of the following formats depending on implementation status:

### For Complete Implementation

```
✅ **Test Case Completeness Verification: Pass**

📊 Current Task Requirements Fulfillment:
- Target requirement items: [number] items
- Implemented & tested: [number] items / Unimplemented: [number] items
- Requirements coverage: 100%
- Requirements fulfillment: Complete achievement

📊 Overall Test Status:
- Total test cases: [number] cases
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

🚀 Complete fulfillment of requirements definition achieved.
Automatically proceeding to next TDD cycle.
```

### For Insufficient Implementation

```
⚠️ **Test Case Implementation Insufficiency Detected**

📊 Current Task Requirements Fulfillment:
- Target requirement items: [number] items
- Implemented & tested: [number] items / Unimplemented: [number] items
- Requirements coverage: [number]%
- Requirements fulfillment: [fulfillment level]

📊 Overall Test Status:
- Total test cases: [number] cases
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

❌ Unimplemented Test Cases:
[Detailed list of unimplemented test cases]

📝 **Correction content recorded in memo file**
Will be addressed in later processes. No corrections made in this process.
```

This verification ensures the quality and completeness of TDD development.
