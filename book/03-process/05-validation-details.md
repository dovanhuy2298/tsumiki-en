# 3.5 Details of the Validation Step

## Positioning of the Validation Step

The Validation step is one of the most important innovations in AITDD. By adding this step to the traditional TDD Red-Green-Refactor cycle, we automate quality assurance and completion decisions for AI-generated code, achieving a more reliable development process.

## Objectives of the Validation Step

### 1. Multi-layered quality assurance

- **Fulfillment of functional requirements**: Planned features are correctly implemented
- **Regression prevention**: No negative impact on existing features
- **Code quality**: Generated code is maintainable and of high quality

### 2. Automated completion decision

- Objective criteria for completion
- Pre-filtering before human review
- Continuous quality monitoring

### 3. Feedback for process improvement

- Understand quality trends of AI-generated code
- Gather information for prompt improvement
- Measure and optimize development efficiency

## Timing of the Validation Step

```mermaid
graph LR
    A[Red] --> B[Green]
    B --> C[Refactor]
    C --> D[Validation]
    D --> E{Decision]
    E -->|Complete| F[Next Feature]
    E -->|Continue| A
    E -->|Issues| G[Human Review]
```

## Concrete Procedures

### 1. Confirm Green status of existing tests

#### Mandatory condition

All existing tests must be passing as a prerequisite.

```bash
# Run tests
$ npm test

# Expected results
✅ User Authentication › should login with valid credentials
✅ User Authentication › should reject invalid password
✅ User Registration › should create user with valid data
✅ User Registration › should reject duplicate email
✅ Product Management › should create product
✅ Product Management › should list products

Tests: 6 passed, 6 total
Time: 2.341s
Coverage: 94%
```

#### If failures occur

```markdown
❌ Countermeasures when tests fail

1. Identify failure causes

   - Impact on existing features from new implementation
   - Conflicts in test data
   - Environment-dependent issues

2. Apply fixes

   - Fix problematic code
   - Adjust test data
   - Review environment configuration

3. Confirm by rerunning
   - Re-run all tests
   - Proceed with Validation after confirming success
```

### 2. Check TDD memo files and requirements documents

#### Files to check

```markdown
## Document checklist

### Required files

- doc/implementation/{feature_name}-requirements.md
- doc/implementation/{feature_name}-testcases.md
- doc/todo.md

### Optional files (if present)

- doc/implementation/{test_case_name}-memo.md
- doc/implementation/{feature_name}-architecture.md
```

#### Example of items to confirm

```markdown
# User Registration – Requirements Confirmation

## Extract from requirements.md

### Planned features

- [x] New user registration via email/password
- [x] Duplicate email validation
- [x] Password strength check
- [x] Password hashing (bcrypt)
- [ ] Rate limiting (100 req/s) ← Not implemented

### Extract from testcases.md

### Number of planned test cases: 10

- TC001: Successful user registration
- TC002: Duplicate email error
- TC003: Password mismatch error
- TC004: Invalid email format
- TC005: Insufficient password strength
- TC006: Missing required fields
- TC007: Boundary test – email length
- TC008: Rate limiting test
- TC009: Database connection error
- TC010: CSRF token verification
```

### 3. Confirm implemented test cases

#### Analyze test files

```javascript
// Example analysis of __tests__/user-registration.test.js

describe("User Registration", () => {
  // Confirm implemented test cases
  test("TC001: should create user with valid data", async () => {
    // Implemented ✅
  });

  test("TC002: should reject duplicate email", async () => {
    // Implemented ✅
  });

  test("TC003: should reject password mismatch", async () => {
    // Implemented ✅
  });

  test("TC004: should validate email format", async () => {
    // Implemented ✅
  });

  test("TC005: should validate password strength", async () => {
    // Implemented ✅
  });

  test("TC006: should require all fields", async () => {
    // Implemented ✅
  });

  test("TC007: should handle email length limits", async () => {
    // Implemented ✅
  });

  test("TC010: should verify CSRF token", async () => {
    // Implemented ✅
  });

  // TC008, TC009 are not implemented
});
```

#### Summarize implementation status

```markdown
## Test-case implementation status

### Implemented: 8

- TC001: Successful user registration ✅
- TC002: Duplicate email error ✅
- TC003: Password mismatch error ✅
- TC004: Invalid email format ✅
- TC005: Insufficient password strength ✅
- TC006: Missing required fields ✅
- TC007: Boundary test ✅
- TC010: CSRF token verification ✅

### Not implemented: 2

- TC008: Rate limiting test ❌
- TC009: Database connection error ❌

### Implementation rate: 80% (8/10)
```

### 4. Analyze implementation status and decide whether to update TODO.md

#### Quality risk evaluation by AI

```markdown
## Example AI analysis report

### Evaluation of implementation completeness

- Basic-function implementation rate: 100%
- Test-case implementation rate: 80%
- Requirement fulfillment rate: 90%

### Importance analysis of unimplemented items

#### TC008: Rate limiting test

- Importance: Medium (security-related)
- Impact: Risk of abuse in production
- Implementation priority: Medium

#### TC009: Database connection error

- Importance: High (availability-related)
- Impact: Stability of the whole system
- Implementation priority: High

### Quality risk evaluation

- Security risk: Medium (rate limiting not implemented)
- Availability risk: High (behavior unknown during DB failures)
- Maintainability risk: Low (code quality good)

### Recommended actions

1. Prioritize implementation of TC009 (DB connection error)
2. Plan to implement TC008 (rate limiting) next
3. Proceed to the next step with caution
```

## Decision Criteria for Validation

### ✅ Fully implemented (proceed automatically)

```markdown
### Completion criteria

- Existing tests: All green ✅
- Test-case implementation rate: 100% ✅
- Completion rate of important features: 100% ✅
- Quality risks: None ✅
- Security check: Passed ✅

### Automatic decision

🎉 Implementation complete — proceed automatically to the next requirements step
```

### ⚠️ Insufficient implementation (additional work required)

```markdown
### Continuation criteria (Example 1: Critical unimplemented items)

- Existing tests: All green ✅
```

### Continuation criteria (Example 2: Existing tests failing)

- Existing tests: Failures present ❌
- Test-case implementation rate: 90% ✅
- Completion rate of important features: 95% ✅

### Decision

❌ Regression test failing — return to Green/Refactor to fix

````

### 🔍 Needs judgment (human review required)

```markdown
### Cases that are difficult to judge

- Test-case implementation rate: 85% (borderline)
- Unimplemented items: Hard to judge importance
- Quality risks: Organization-specific judgment required
- Business requirements: Ambiguity in interpretation

### Decision

🔍 Human review requested — requires expert judgment
````

## AI-Driven Decision Process

### 1. Information gathering and analysis

#### Input information

```markdown
## Input data for running Validation

### Technical information

- Test execution results (details of passes/failures)
- Code coverage report
- Static analysis results (ESLint, TypeScript, etc.)
- Performance test results

### Specification information

- requirements.md (functional/non-functional requirements)
- testcases.md (list of test cases)
- architecture.md (architecture design)

### Project information

- Existing codebase
- Dependency information
- Environment configuration
```

#### Analysis method

```markdown
## AI analysis approach

### 1. Quantitative analysis

- Calculate test-case implementation rate
- Evaluate code coverage
- Measure complexity metrics
- Check performance indicators

### 2. Qualitative analysis

- Confirm consistency between requirements and implementation
- Subjective evaluation of code quality
- Check security requirements
- Evaluate maintainability

### 3. Risk evaluation

- Analyze impact of unimplemented features
- Evaluate security risks
- Evaluate operational risks
- Evaluate technical debt
```

### 2. Decision logic

#### Hierarchical decision system

```markdown
## Priority of decisions

### Level 1: Critical issues (immediate continuation)

1. Existing tests failing
2. Critical security issues
3. Risk of data corruption

### Level 2: Missing important features (continuation recommended)

1. Unimplemented basic functions
2. Insufficient error handling for important cases
3. Missing required validations

### Level 3: Quality standards (threshold-based)

1. Test coverage < 80%
2. Test-case implementation rate < 90%
3. Complexity > allowed threshold

### Level 4: Overall decision (Complete/Continue/Needs judgment)

- Final decision considering all of the above
- Compare with organization’s quality standards
- Consider project context
```

#### Example decision prompt

````markdown
## Validation decision prompt

You are an AI for quality decisions in the AITDD Validation step. Make a completion decision based on the following information.

### Target

- Feature: User registration API
- Implementation results: [Code, test results, quality metrics]
- Requirements: [contents of requirements.md]
- Test cases: [contents of testcases.md]

### Decision criteria

1. Existing tests: All must pass
2. Test-case implementation rate: Complete if ≥ 90%
3. Important features: 100% implemented
4. Security: No critical issues

### Output format

```json
{
  "decision": "complete|continue|needs_judgment",
  "implementation_rate": {
    "test_cases": "80%",
    "important_features": "100%"
  },
  "quality_assessment": {
    "security": "pass|caution|fail",
    "performance": "good|average|needs_improvement",
    "maintainability": "high|medium|low"
  },
  "unimplemented_items": [
    {
      "item": "TC008",
      "importance": "high|medium|low",
      "recommended_action": "implement_now|implement_next|not_needed"
    }
  ],
  "reason_for_continuation": "Reason if decision is to continue",
  "next_actions": "Concrete next steps"
}
```
````

````

## Traffic Light System for Inference Visualization

### Utilizing the Traffic Light System

In the Validation step, we visualize AI's inferred parts to improve human review efficiency.

#### 🟢 Green Light (High Confidence)
```markdown
## Content clearly inferable from source files

### Example: Test case implementation status
- 🟢 TC001 implemented (corresponding test exists in test file)
- 🟢 Basic functionality verified (test success results exist)
- 🟢 Error handling implemented (specified in requirements)
````

#### 🟡 Yellow Light (Caution - Requires Confirmation)

```markdown
## Content supplemented by inference but seems reasonable

### Example: Quality assessment

- 🟡 Code coverage 80% is sufficient (judgment based on general standards)
- 🟡 Performance requirements unmeasured but no problem (inferred from implementation)
- 🟡 Security risk medium (estimated due to unimplemented rate limiting)
```

#### 🔴 Red Light (Requires Verification)

```markdown
## Content not in source files, based on independent judgment

### Example: Business judgment

- 🔴 Rate limiting implementation priority "medium" (organization policy unclear)
- 🔴 DB connection error handling required (operational requirements unconfirmed)
- 🔴 Sufficient for next implementation (project schedule unclear)
```

### Management in TODO Format

```markdown
## Validation Results TODO

### 🟢 High Confidence Items (Recommended for confirmation)

- [ ] Confirm TC001-007 implementation completion in [testcases.md](./testcases.md)
- [ ] Confirm 100% implementation of basic functions in [requirements](./requirements.md)

### 🟡 Medium Confidence Items (Requires confirmation)

- [ ] Confirm performance characteristics of [implementation code](./src/users.js)
- [ ] Confirm compliance with [security requirements](./requirements.md)

### 🔴 Items Requiring Judgment (Important)

- [ ] Detailed confirmation: Determine implementation priority of [unimplemented items](./testcases.md) based on organization standards
- [ ] Detailed confirmation: Confirm DB failure requirements in [operational requirements](./requirements.md)
- [ ] Detailed confirmation: Adjust implementation plan based on project schedule
```

## Validation Step Optimization

### 1. Improving Accuracy Through Prompt Enhancement

#### Improvement Points

```markdown
## Points for Prompt Quality Improvement

### 1. Clarify Assessment Criteria

- Specify numerical criteria (coverage 80% or higher, etc.)
- Detail priority assessment rules
- Reflect organization-specific standards

### 2. Enrich Context Information

- Provide project background
- Relationship with existing systems
- Operational environment constraints

### 3. Standardize Output Format

- Structured output in JSON format
- Utilize traffic light system
- Organize issues in TODO format
```

#### Evolution of Prompt Templates

```markdown
## Progressive Prompt Improvement

### v1.0: Basic Version

- Basic completion/continuation judgment

### v2.0: Detailed Version

- Add quality metrics evaluation
- Strengthen risk evaluation function
- Introduce traffic light system

### v3.0: Organization Optimization Version

- Incorporate organization-specific standards
- Consider project characteristics
- Improve with learning data
```

### 2. Expanding Automation Scope

#### Current Automation Level

```markdown
## Current Automation Status

### Fully Automated

- Test execution and result collection
- Basic quality metrics measurement
- Standardized judgment (clear criteria)

### Semi-automated (Human Confirmation Required)

- Determine importance (business perspective)
- Evaluate security risks
- Evaluate architectural impact

### Manual Required

- Align with organizational policies
- Consider project-specific circumstances
- Adjust stakeholder communication
```

#### Automation Expansion Direction

```markdown
## Future Automation Plan

### Short-term (1-3 months)

- Customize quality standards
- Learning based on past performance
- Automatic report generation

### Medium-term (3-6 months)

- Learn organization-specific rules
- Automatically consider project characteristics
- Automate stakeholder notifications

### Long-term (6 months or more)

- Predictive quality management
- Automatic process optimization
- Integrate team learning
```

## Common Issues and Solutions

### Issue 1: Vague Criteria

**Symptoms**:

- Inconsistent completion/continuation judgment
- Discrepancy between human and AI judgment

**Causes**:

- Undefined organization-specific quality standards
- Ambiguity in assessment rules

**Solutions**:

```markdown
### Clarify Criteria

1. Set numerical criteria

   - Test coverage: 80% or higher
   - Test case implementation rate: 90% or higher
   - 100% completion of important functions

2. Document quality standards

   - Security requirements checklist
   - Performance tolerance
   - Code quality standards

3. Define exception handling rules
   - Consider project-specific circumstances
   - Relax standards during emergency releases
   - Tolerate technical debt
```

### Issue 2: Human Review Bottleneck

**Symptoms**:

- Frequent need for judgment in Validation
- Increased waiting time for human review

**Causes**:

- Insufficient AI accuracy
- Insufficient learning of organizational rules

**Solutions**:

```markdown
### Improve AI Accuracy

1. Accumulate learning data

   - Feed back past judgment results
   - Learn success/failure patterns
   - Reflect organization-specific rules

2. Improve prompts

   - More specific assessment criteria
   - Enriched context information
   - Staged judgment system

3. Adjust thresholds
   - Stricter automatic completion criteria
   - Clear criteria for judgment
   - Improved continuity judgment accuracy
```

### Issue 3: Excessive Quality Requirements

**Symptoms**:

- Many items not completed
- Reduced development efficiency

**Causes**:

- Quality standards are too strict
- Perfectistic settings

**Solutions**:

```markdown
### Balanced Quality Management

1. Staged quality standards

   - MVP (Minimum Viable Product) standards
   - Production standards
   - Enterprise standards

2. Risk-based judgment

   - Adjust standards based on impact
   - Prioritize implementation of important functions
   - Allow non-essential functions to be postponed

3. Continuous improvement
   - Periodic review of standards
   - Reflection of team feedback
   - Optimization based on results
```

## Summary and Next Step

Validation step is a key element of the AITDD process, and its proper operation can lead to:

### Benefits

- **Quality stability**: Application of consistent quality standards
- **Efficiency improvement**: Optimization of human review
- **Continuous improvement**: Feedback loop for process improvement

### Success Points

- **Clear standard setting**: Numerically defined assessment criteria
- **Gradual introduction**: Gradual application tailored to organization
- **Continuous optimization**: Process improvement based on results

### Next Learning

After understanding the overall AITDD process in Chapter 3, try AITDD in [Chapter 4 Hands-On](../04-hands-on/01-first-project.md) to experience it firsthand.

Through actual development, you can feel how this Validation step functions and contributes to quality improvement.
