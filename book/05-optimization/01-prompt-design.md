# 5.1 Principles of Effective Prompt Design

## Introduction

In AITDD, AI output quality heavily depends on prompt design. Through appropriate prompt design, we can achieve improved quality of AI-generated code and maximize development efficiency. In this chapter, we will learn practical principles and concrete techniques for prompt design.

## Basic Principles of Prompt Design

### 1. Adopt Iterative Improvement Approach

In AITDD, rather than seeking perfect results from a single prompt creation, we design based on the premise of continuous improvement.

**Basic Cycle:**

```
Prompt Creation → Execution → Result Evaluation → Modification → Re-execution
```

**Practical Points:**

- Aim for 80% quality in the first attempt, don't seek perfection
- Analyze each execution result in detail and identify improvement points
- Accumulate small modifications to achieve optimization
- Record improvement logs and understand patterns

### 2. Incorporate Confidence Assessment

By having AI assess its own output confidence, we can efficiently identify areas that need review.

**Confidence Indicators:**

- **🟢 High Confidence**: Clearly derivable from reference files
- **🟡 Medium Confidence**: Based on reasonable inference but requires confirmation
- **🔴 Requires Judgment**: Generated through independent judgment, requires focused confirmation

### 3. Step-by-Step Customization

Optimize prompts for each TDD step (Red, Green, Refactor, Validation).

**Characteristics by Step:**

- **Red**: Emphasize clarity and comprehensiveness of test creation
- **Green**: Prevent minimal implementation and unintended changes
- **Refactor**: Balance quality improvement with functionality preservation
- **Validation**: Comprehensive quality checks and issue discovery

## Prompt Patterns in AITDD

### Pattern 1: TODO Recording Instructions

Pattern for having AI record items to be confirmed in TODO format.

**Basic Template:**

````markdown
## Prompt Instruction Example

Please execute the following process and record the results as a TODO list:

**Execution Content:**
[Concrete instruction content]

**TODO Recording Format:**

```markdown
## [Step Name] Result TODO

### 🟢 High Confidence Items

- [ ] Specific confirmation content for [filename](relative path)

### 🟡 Medium Confidence Items

- [ ] Validate appropriateness of estimated content for [filename](relative path)

### 🔴 Items Requiring Judgment

- [ ] Detailed confirmation: Organization-specific content for [filename](relative path)
```
````

**Reference Files:** [List of specified files]
**Output File:** `./todos/[step-name]-check.md`

````

### Pattern 2: Confidence Assessment Instructions

Pattern for having AI explicitly show the basis and confidence of generated content.

**Basic Template:**
```markdown
## Confidence Assessment Instructions

For each generated content, please assess confidence according to the following criteria:

**Assessment Criteria:**
- 🟢 Green: Clearly derivable from the specified references
- 🟡 Yellow: Reasonable inference but needs confirmation
- 🔴 Red: Based on AI’s own assumption

**Targets:**
1. Each feature of the generated code
2. Rationale for chosen test cases
3. Rationale for implementation policy

**Output format:**
- Attach the traffic‑light mark per item
- Specify the exact location in reference files
- Briefly describe the inference
````

### Pattern 3: Progressive Detailing Instruction

Use a staged approach to implement complex features.

**Base template:**

```markdown
## Progressive Implementation Instruction

Proceed in the following order:

**Phase 1: Skeleton**

- Minimal behavior verification
- Skeleton of main functions/classes
- Basic test cases

**Phase 2: Feature Expansion**

- Concrete feature implementation
- Error handling
- Additional test cases

**Phase 3: Optimization**

- Performance improvements
- Code quality improvement
- Comprehensive tests

**Checks after each phase:**

- Report test results
- Perform confidence scoring
- Organize issues for next phase
```

## Practical Components of a Prompt

### Mandatory Elements Checklist

Always include these when creating prompts:

- [ ] **Clear objective**

  - What to achieve, in concrete terms
  - Expected output format

- [ ] **Reference files**

  - Files that serve as ground truth
  - Relationships among files

- [ ] **Confidence scoring instruction**

  - Apply the traffic‑light system
  - Define criteria clearly

- [ ] **Output format**

  - File names and save paths
  - Details (e.g., Markdown format)

- [ ] **Constraints and caveats**
  - What must not be changed
  - Special considerations

### What to Template

**Standard header example:**

```markdown
## [Step Name] Execution Instruction

**Objective:** [concrete objective]
**References:** [file list]
**Output file:** [destination path]

**Confidence scoring:**
Show 🟢🟡🔴 for each generated item

**Constraints:**

- [Important constraints]
```

### What to Customize

Project‑specific elements to customize:

1. **Domain‑specific terms and concepts**

   - Industry‑specific terminology
   - Naming conventions in the project

2. **Constraints of the tech stack**

   - Framework constraints
   - Performance requirements

3. **Organization‑specific rules**
   - Coding standards
   - Security guidelines

## Prompt Techniques for Quality Control

### 1. Prevent Unintended Implementations

**Counter‑techniques:**

```markdown
## Clarify Implementation Constraints

**Allowed change scope:**

- Allowed: [concrete files/functions]
- Forbidden: [working parts of the system]

**Implementation policy:**

- Achieve objectives with minimal changes
- Minimize impact on existing behavior
- Prefer additions; keep existing modifications minimal

**Checklist:**

- [ ] No changes outside the specified scope
- [ ] Existing tests still pass
- [ ] No unintended side effects
```

### 2. Make Reference Relationships Explicit

**Example:**

```markdown
## Reference Relationship Diagram

**Primary references:**

- `spec.md` → Source of requirements
- `existing_test.js` → Confirms existing behavior
- `config.json` → Configuration reference

**Secondary references:**

- `utils.js` → Leverage existing utilities
- `types.ts` → Keep type consistency

**Priority when generating:**

1. Primary references
2. Prefer primary when conflicts arise
3. Record unclear points as questions
```

### 3. Implement Progressive Detailing

**Strategy:**

```markdown
## Progressive Detailing Process

**Level 1: Skeleton**

- Interface definitions
- Function signatures
- Basic error handling

**Level 2: Functionality**

- Business logic
- Detailed error handling
- Input validation

**Level 3: Optimize and Finalize**

- Performance
- Edge‑case handling
- Documentation

**Checks at each level:**

- Test results
- Confidence scoring
- Tasks for the next level
```

## Exercises

### Exercise 1: Create a Basic Prompt

Scenario: Create test cases for user authentication.
References: `auth_spec.md`, `user_model.js`
Expected output: Jest test file

Elements to include:

1. Clear objective
2. Reference files
3. Confidence scoring instruction
4. Output format

### Exercise 2: Design a Progressive Implementation Prompt

Scenario: Implement a REST API endpoint
Requirements: Includes complex data processing
Constraint: Reuse existing middleware

Elements to design:

1. Three implementation phases
2. Deliverables for each phase
3. Checks between phases

## Summary

The essence of effective prompt design:

1. **Iterative improvement**: Assume continuous refinement, not one‑shot perfection
2. **Confidence scoring**: Visualize AI’s inferred parts to review efficiently
3. **Step‑specific optimization**: Tailor prompts to each TDD phase
4. **Quality control**: Prevent unintended implementations and clarify references

In the next section, we will learn concrete techniques for visualizing AI inference that leverage these principles.
