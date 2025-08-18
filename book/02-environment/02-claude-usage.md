# 2.2 How to Use Claude Sonnet 4

This section explains how to effectively leverage Claude Sonnet 4, the core of AITDD. Rather than merely asking AI to write code, you will learn how humans and AI collaborate to develop high-quality software.

## Features and Strengths of Claude Sonnet 4

### Positioning in AITDD

- **Primary executor of the Red-Green-Refactor-Validation cycle**
- **Handles design, tests, and implementation consistently**
- **Balances high-quality code generation with quality checks**

### Reasons for Selection

- **Accessibility**: Freely usable with Claude Code
- **Coding performance**: Stable and sufficiently strong for needs
- **Cost efficiency**: Reasonable cost ($20/month)
- **Fit for AITDD**: Optimized for a trial-heavy development style
- **Integration**: Excellent integration with VS Code

## Basics of Using Claude Code

### Launch and Basic Operations

1. **Launch Claude Code**

   ```bash
   # Launch Claude Code inside VS Code
   # Or access via the browser version of Claude
   ```

2. **Project Integration**
   - Specify your project directory
   - Recognize the file structure
   - Understand existing code

### Basic Interaction Patterns in AITDD

#### 1. Goal Setting Phase

```
You: "I want to implement CRUD operations for the user management feature. First, please create a TODO list."

Claude: "Creating a TODO list for user management:
1. Define User model
2. Create test cases for user creation
3. Implement user creation functionality
..."
```

#### 2. Test Creation Phase

````
You: "Create test cases for the first item in the TODO."

Claude: "Creating test cases for the User model:
```javascript
describe('User Model', () => {
  test('should create user with valid data', () => {
    // test code
  });
});
```"
````

#### 3. Implementation Phase

````
You: "Implement code to pass this test."

Claude: "Implementing a User model to pass the test:
```javascript
class User {
  constructor(name, email) {
    // implementation
  }
}
```"
````

## Effective Prompt Design

### Basic Principles of Prompt Design

#### 1. Clear goal setting

**Good example:**

```
"I want to implement a user registration API (POST /users).
- With validation
- Including error handling
- Proceed with test-first"
```

**Bad example:**

```
"Make a user feature"
```

#### 2. Provide context

```
"Current project setup:
- Express.js + MongoDB
- Jest for testing
- Existing User model

New functionality to add:
- User profile update API"
```

#### 3. State constraints

```
"Constraints:
- Maintain compatibility with existing APIs
- Implement with security in mind
- Performance requirement: respond within 1 second"
```

### Iterative Process for Prompt Optimization

#### Step 1: First run

1. **Create prompt**
2. **Ask AI to execute**
3. **Evaluate the result**

#### Step 2: Evaluate and improve

1. **Identify gaps from expectations**
2. **Analyze prompt issues**
3. **Design an improved prompt**

#### Step 3: Re-run

1. **Execute with improved prompt**
2. **Check degree of improvement**
3. **Adjust further as needed**

### Practical Prompt Templates

#### For feature implementation

```
[Implementation Request]
Feature: [specific feature]
Tech stack: [technologies]
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Constraints:
- [constraint 1]
- [constraint 2]

Expected deliverables:
- Test cases
- Implementation code
- Documentation (if necessary)
```

#### For debugging

```
[Debug Request]
Issue: [detailed description]
Error message: [actual error]
Reproduction steps:
1. [step 1]
2. [step 2]
3. [step 3]

Related code: [problematic code]
Expected behavior: [what should happen]
```

## Review and Quality Management

### Points for Human Review

#### 1. Consistency with specification

- **Reflect design intent**: Is the planned functionality correctly implemented?
- **Coverage of requirements**: Are all requirements satisfied?
- **Adherence to constraints**: Are stated constraints respected?

#### 2. Priority of review targets

1. **Specification**: Most important alignment with requirements
2. **Test cases**: Appropriate coverage of specification
3. **Implementation code**: Code quality and spec conformance

#### 3. Review checklist

- [ ] Functional requirements are satisfied
- [ ] Error handling is appropriate
- [ ] Security requirements are considered
- [ ] Performance requirements are met
- [ ] Test coverage is sufficient
- [ ] Code readability and maintainability are good

### If AI Does Not Produce Expected Results

#### Fallback Strategy

**Basic flow:**

1. **git reset**: Revert to previous state
2. **Prompt adjustment**: Clarify and detail instructions
3. **Re-run**: Retry with the same tool (Claude Sonnet 4)
4. **Evaluate**: Check the degree of improvement

**When to git reset:**

- The final code diverges significantly from expectations
- Re-implementation is faster than requesting fixes
- Multiple fix attempts show no improvement

#### Prompt Adjustment Techniques

**Increase specificity:**

```
# Before
"Fix this code"

# After
"Fix the following issues in this code:
1. Validation errors are not handled correctly
2. Return type differs from the specification
3. Edge case tests are missing"
```

**Add context:**

```
# Before
"Create an API"

# After
"Create a RESTful API using Express.js:
- Endpoint: POST /api/users
- Request format: JSON
- Response format: JSON
- Use the existing User model
- Connected to MongoDB Atlas"
```

## Recording for Continuous Improvement

### Record success patterns

```markdown
## Success Case Log

### Date: 2025-06-21

### Task: Implement user authentication API

### Prompt used:

[Prompt content]

### Result:

- Completed as expected in one shot
- 100% of tests passed

### Learnings:

- For authentication, specifying libraries concretely is effective
- Important to state security requirements in advance
```

### Analyze failure patterns

```markdown
## Improvement Case Log

### Date: 2025-06-21

### Task: Complex query optimization

### Problems:

- Initial implementation did not meet performance requirements
- No improvement after 3 attempts

### Solution:

- Use git reset to return to the initial state
- State performance requirements quantitatively in the prompt
- Provide reference implementation examples

### Learnings:

- Performance requirements must be specified quantitatively
- Split complex tasks into smaller ones
```

## Using Tools Other Than Claude Sonnet 4

### Deeper Collaboration with Gemini (for research)

#### Where Gemini shines

**Use cases:**

- Researching new libraries
- Reading large technical documents
- Research tasks requiring long context
- Integrating information from multiple sources

**Unique strengths of Gemini:**

- **Long context**: Processes large amounts of information at once
- **Information gathering**: Effectively integrates information from multiple sources
- **Research specialization**: Excellent at in-depth technical research

#### Practical collaboration workflow

**Basic pattern:**

```
1. Identify research topic → Gather info with Gemini
2. Organize and summarize → Analyze with Gemini
3. Draft implementation plan → Provide info to Claude Sonnet 4
4. Execute AITDD → Implement consistently with Claude Sonnet 4
```

**Examples:**

**Example 1: Introducing a new framework**

```
Gemini:
"Research new features of Next.js 14 and outline migration from an existing Express.js app"

↓ Provide findings to Claude Sonnet 4

Claude Sonnet 4:
"Based on Gemini's findings, create a step-by-step migration TODO list and
implement the first feature with AITDD"
```

**Example 2: Deep-dive into technical specs**

```
Gemini:
"Research best practices and implementation patterns for combining OAuth 2.0 and JWT"

↓ Provide organized security requirements to Claude Sonnet 4

Claude Sonnet 4:
"Based on the research, start from test cases for a secure auth system and
implement using AITDD"
```

#### Decision criteria for tool selection

**Use Gemini when:**

- [ ] First-time research on new tech/libraries
- [ ] Need to compare multiple options
- [ ] Need to read long technical documents
- [ ] Need to organize complex requirements
- [ ] Need to research prior art

**Use Claude Sonnet 4 when:**

- [ ] Concrete implementation work
- [ ] Creating test cases
- [ ] Code review and quality checks
- [ ] Debugging and troubleshooting
- [ ] Refactoring

## Operational Know-how

### Advanced techniques for prompt design

**Maintaining context across sessions:**

```
# At session start
"Please remember the following project setup:
- Express.js + MongoDB + Jest
- User authentication implemented
- Current goal: Add user profile management"

# In a continued session
"Based on the project setup I shared, please create test cases for the profile update API"
```

**Progressive detailing:**

```
# Phase 1: Overview level
"Design the overall user management system"

# Phase 2: Feature level
"From the design above, write detailed specs for the profile update feature"

# Phase 3: Implementation level
"Based on the specs, implement test cases and API endpoints"
```

### Advanced error-handling strategies

**Pattern analysis for prompt adjustments:**

**Pattern 1: Failure due to lack of specificity**

```
# Failure example
"Create an API"
→ Implementation deviates significantly from expectations

# Success example
"Create POST /api/users/profile API with Express.js:
- Request: {name, email, bio}
- Validation: email format, name required
- Response: updated user info
- Error handling: 400, 401, 500 supported"
```

**Pattern 2: Failure due to missing technical constraints**

```
# Failure example
"Write database operation code"
→ Implemented using an ORM we are not using

# Success example
"Implement update operation for the User schema using Mongoose 7.x:
- Use the existing User model
- findByIdAndUpdate method
- Properly handle validation errors"
```

**Practical prompt checklist:**

- [ ] State the tech stack explicitly
- [ ] Specify input/output formats concretely
- [ ] Instruct consideration of error cases
- [ ] Ensure consistency with existing code
- [ ] State performance requirements
- [ ] Instruct security considerations

## Methods for Recording Continuous Improvement

**Template successful patterns:**

```markdown
## Prompt Template: API Implementation

### Basic form

"Implement [HTTP method] [endpoint] API with [framework]:

- Request format: [details]
- Response format: [details]
- Validation: [requirements]
- Error handling: [status codes]
- Use existing [ModelName] model"

### Example

[Concrete example]

### Expected results

[Expected output pattern]
```

**Record analysis of failure patterns:**

```markdown
## Improvement Record: [date]

### Problematic prompt

[Original prompt]

### Problems encountered

- [Specific issue 1]
- [Specific issue 2]

### Improved prompt

[Revised prompt]

### Points of improvement

- [Point 1]
- [Point 2]

### Guidance for future use

[How to apply this to other cases]
```

## Why We Consolidate on Claude Sonnet 4

### 1. Importance of consistency

- Unified approach using the same tool
- Accumulated optimizations become more effective
- Knowledge of tool-specific quirks and limits compounds

### 2. Maximize learning efficiency

- Efficiency improves by mastering one tool
- Prompt design skills deepen
- Accumulate error patterns and solutions

### 3. Simplify cost management

- Easier to manage a single tool than multiple
- Simplify budgeting
- Centralize usage monitoring

### 4. Simplify fallback strategy

- Avoid complex decision logic
- No need to decide “which tool to retry”
- Enables quick problem solving

**Benefits of consolidation:**

```
Item                         Consolidated approach   Multi-tool approach
────────────────────────────────────────────────────────────────────────
Learning cost                Low                     High
Prompt optimization          High                    Low
Cost management complexity   Low                     High
Fallback decision-making     Simple                  Complex
Knowledge accumulation       High                    Distributed
────────────────────────────────────────────────────────────────────────
Overall development efficacy Optimized               Inefficient
```

## Future-readiness of the AI Tool Environment

### Policy for adopting new technologies

**Systematize evaluation criteria:**

- **Performance evaluation**: Compare within current workflow
- **Cost analysis**: Total cost of ownership (including learning)
- **Integration evaluation**: Compatibility with current environment
- **Migration cost**: Estimate cost of tool switching

**Phased introduction approach:**

1. **Information gathering**: Observe for 3–6 months
2. **Small tests**: Try in non-critical projects
3. **Comparative evaluation**: Quantitative comparison of performance/efficiency
4. **Phased migration**: Migrate cautiously only when clear superiority is confirmed

**Quantify decisions:**

```
Threshold for adopting a new tool:
- Performance improvement: ≥ 20%
- Cost reduction: ≥ 15%
- Learning cost: within 2 weeks
- Integration cost: ≤ 50% of current tool
```

## Next Steps

After you understand how to use Claude Sonnet 4, move on to the next chapter, "2.3 Building the Development Environment and Workflow," where you will construct an end-to-end AITDD development environment. From TODO management to Git workflow, you will establish a structured development process.
