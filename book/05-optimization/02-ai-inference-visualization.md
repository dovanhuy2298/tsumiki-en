# 5.2 Visualizing AI Inference

## Introduction

The most important thing in quality management of AI‑generated code is to understand clearly which parts the AI “inferred.” Using a traffic‑light system to visualize AI inference enables efficient review and strong quality assurance.

## Theoretical Background of the Traffic‑Light System

### Identifying the problem

AI‑generated code has the following characteristics:

- Broad auto‑completion: AI fills in unspecified parts
- The “looks plausible” trap: Outputs look reasonable but may differ from intent
- Opaque inference: It’s unclear what information AI used

### Solution approach

The traffic‑light system classifies generated content and clarifies review priority:

```
🟢 Green → 🟡 Yellow → 🔴 Red
  Safe        Caution      Risk
```

## Detailed Definitions

### 🟢 Green (High confidence / Safe)

Definition: Clearly derivable from referenced files.

Characteristics:

- Based on explicit instructions/specs
- Follows established patterns in existing code
- Clear rationale for decisions

Example:

```javascript
// Spec states “User ID is required”
function validateUser(userId) {
  if (!userId) {
    // 🟢 Derived directly from the spec
    throw new Error("User ID is required");
  }
}
```

Review priority: Low
Checks: Correctness of implementation, performance impact

### 🟡 Yellow (Medium confidence / Caution)

Definition: Not in the references, but reasonable.

Characteristics:

- AI’s reasonable inference
- Based on general best practices
- Uses domain knowledge

Example:

```javascript
// Error handling where spec lacks details
function processData(data) {
  try {
    return transform(data);
  } catch (error) {
    // 🟡 Reasonable but verify
    console.error("Data processing failed:", error);
    return null;
  }
}
```

Review priority: High
Checks: Validity of inference, consistency with business requirements

### 🔴 Red (Needs judgment / Risk)

Definition: Not in references and not directly inferable.

Characteristics:

- Based on AI’s own assumption
- Assumes organization‑specific conventions
- Lacks clear rationale for choices

Example:

```javascript
// No info about organization‑specific log format
function logUserAction(action) {
  // 🔴 Organization‑specific, must confirm
  logger.info(
    `[AUDIT] User performed: ${action} at ${new Date().toISOString()}`
  );
}
```

Review priority: Highest
Checks: Alignment with organizational rules, security impact

## Implementation and TODO File Format

### Standard TODO format

```markdown
## [Step Name] Result TODO

### 🟢 High‑confidence items

- [ ] Confirm that [utils.js](./src/utils.js) type definitions match the spec
- [ ] Confirm required checks in [validation.js](./src/validation.js)

### 🟡 Medium‑confidence items

- [ ] Validate error response format in [error-handler.js](./src/error-handler.js)
- [ ] Check defaults in [config.js](./src/config.js) against org policy

### 🔴 Items requiring judgment

- [ ] Confirm log format in [logger.js](./src/logger.js) meets org standard
- [ ] Confirm session management rationale in [auth.js](./src/auth.js)
```

### Prompt instruction template

```markdown
## AI Inference Visualization Instruction

Perform the following tasks and classify generated content with the traffic‑light system:

**Tasks:**
[Concrete task]

**Classification criteria:**

- 🟢 Green: Clearly derivable from references ([file names])
- 🟡 Yellow: Reasonable inference not explicitly specified
- 🔴 Red: Organization‑specific or unsupported inference

**Output file:** `./todos/[step-name]-inference-check.md`

**Output format:**
Attach marks for each item and create a TODO list
```

### Managing reference files

```markdown
## Reference File Management

**Primary references:**

- [`requirements.md`](./docs/requirements.md)
- [`api-spec.yaml`](./docs/api-spec.yaml)

**Secondary references:**

- [`existing-code/`](./src/existing/)
- [`config-samples/`](./config/)

**External references:**

- Framework docs
- Industry standards (e.g., RFC, W3C)

**Traceability:**

- 🟢 Items → explicitly in primary references
- 🟡 Items → secondary references + general knowledge
- 🔴 Items → unclear or assumed
```

## Setting Review Priorities

### Priority matrix

| Signal    | Impact High | Impact Medium | Impact Low |
| --------- | ----------- | ------------- | ---------- |
| 🔴 Red    | Highest     | High          | Medium     |
| 🟡 Yellow | High        | Medium        | Low        |
| 🟢 Green  | Medium      | Low           | Lowest     |

### Impact criteria

High impact:

- Security‑sensitive code
- Data integrity
- System‑wide behavior

Medium impact:

- Feature‑level behavior
- User experience
- Performance

Low impact:

- Logs and comments
- Internal variable names
- Auxiliary features

### Practical review order

1. 🔴 × High impact — check/fix immediately
2. 🔴 × Medium and 🟡 × High — check before next session
3. Other 🔴 items — verify before release
4. 🟡 items — check during review
5. 🟢 items — check at the end

## Case Studies

### Case 1: REST API implementation

Scenario: User management API
References: `user-api-spec.yaml`, `existing-user-model.js`

Classification example:

```javascript
// 🟢 Endpoint defined in API spec
app.post("/api/users", async (req, res) => {
  // 🟡 General validation; not detailed in spec
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  // 🔴 Hashing policy may be org‑specific
  const hashedPassword = bcrypt.hashSync(req.body.password, 12);
  // 🟢 Follows existing model pattern
  const user = new User({ email: req.body.email, password: hashedPassword });
});
```

Generated TODO:

```markdown
## API Implementation TODO

### 🟢 High‑confidence

- [ ] [user-controller.js](./src/controllers/user.js) endpoint matches spec
- [ ] [user-model.js](./src/models/user.js) follows existing patterns

### 🟡 Medium‑confidence

- [ ] [validation.js](./src/middleware/validation.js) message format
- [ ] [user-controller.js](./src/controllers/user.js) status codes

### 🔴 Requires judgment

- [ ] [auth.js](./src/utils/auth.js) bcrypt salt rounds comply with policy
```

### Case 2: Test case generation

Scenario: Test cases for the above API
References: `user-api-spec.yaml`, `existing-test-patterns.js`

```javascript
describe("User API", () => {
  it("should create user with valid email and password", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", password: "password123" });
    expect(response.status).toBe(201); // 🟢 Per spec
  });

  it("should reject invalid email format", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "invalid-email", password: "password123" });
    expect(response.status).toBe(400); // 🟡 Reasonable inference
  });

  it("should enforce password complexity requirements", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", password: "123" });
    expect(response.status).toBe(400); // 🔴 Org policy dependent
  });
});
```

## Measuring Effect and Improving

### Metrics

Quantitative:

- Review time reduction
- Increased bug discovery rate
- Fewer rework cycles

Qualitative:

- More efficient reviews
- Fewer missed critical issues
- Greater developer confidence

Example operations data:

```markdown
## Traffic‑light System Effect (1 month)

Traditional review:

- Avg review time: 45 min/feature
- Bug discovery rate: ~60%
- Missed in review: 3–4 per month

After adoption:

- Avg review time: 25 min/feature (−44%)
- Bug discovery rate: ~85% (+25%)
- Missed in review: ≤1 per month

Typical 🔴 issues:

- Security: 40%
- Policy violations: 35%
- Config/environment: 25%
```

### Continuous improvement

Classification accuracy log, prompt optimization loop, and more. Define and track improvements with concrete examples, and keep templates in `docs/inference-guides/`.

## Deployment Steps

### Step 1: Build the basics

```bash
# Prepare project structure
mkdir -p todos
mkdir -p docs/inference-guides

# Create classification template
cat > docs/inference-guides/classification-template.md << 'EOF'
## AI Inference Classification Template

### 🟢 Green criteria
- In primary references
- Follows established patterns

### 🟡 Yellow criteria
- Based on best practices
- Not explicitly in references

### 🔴 Red criteria
- Organization‑specific
- No clear rationale
EOF
```

### Step 2: Define org‑specific rules

```markdown
## Organization‑specific checkpoints

Security:

- [ ] Password hashing algorithm and strength
- [ ] Session management
- [ ] API authentication

Logging/Audit:

- [ ] Log format and levels
- [ ] Audit fields
- [ ] Retention/rotation

Coding standards:

- [ ] Naming rules
- [ ] Error‑handling patterns
- [ ] Comment rules
```

### Step 3: Team operations

```markdown
## Team operations

Classification ownership:

- Initial classification by executor
- Reviewer validates classification

Work split:

- 🔴 Items: Senior engineer
- 🟡 Items: Pair review
- 🟢 Items: Automated tests + light checks

Knowledge accumulation:

- Weekly review of criteria
- Share misclassification patterns
- Document improvements
```

## Troubleshooting

Common issues and fixes, e.g., inconsistent classification, missed 🔴 items, too many TODOs. Use stricter impact evaluation and group similar TODOs.

## Exercises

1. Create classification criteria for a provided snippet.
2. Prioritize the resulting TODOs.

## Summary

Visualization of AI inference enables:

1. Efficient review focused on critical parts
2. Risk reduction via detection of high‑risk inferences
3. Knowledge accumulation of org‑specific judgments
4. Continuous improvement of classification and prompts

The traffic‑light system balances human factors and AI support in AITDD. Next, we will study continuous improvement and prompt optimization using these techniques.

# 5.2 AI Inference Visualization Techniques

## Introduction

In quality management of AI-generated code, the most important thing is to clearly understand which parts AI "inferred". Through AI inference visualization techniques using the traffic light system, we can achieve efficient reviews and high quality assurance.

## Theoretical Background of the Traffic Light System

### Problem Identification

AI-generated code has the following characteristics:

- **Wide Range of Auto-completion**: AI automatically completes parts not explicitly specified
- **Trap of Plausibility**: Generated content may seem reasonable but differs from actual intent
- **Unclear Inference Basis**: Unclear what information the generation was based on

### Solution Approach

The traffic light system classifies AI-generated content by the following criteria and clarifies review priorities:

```
🟢 Green Light → 🟡 Yellow Light → 🔴 Red Light
   Safe         Caution         Danger
```

## Detailed Definition of the Traffic Light System

### 🟢 Green Light (High Confidence - Safe)

**Definition**: Content clearly inferable from referenced source files

**Characteristics**:

- Generation based on content explicitly stated in original instructions or specifications
- Implementation following existing code patterns
- Implementation decisions with clear basis

**Concrete Examples**:

```javascript
// When specification clearly states "User ID is required"
function validateUser(userId) {
  if (!userId) {
    // 🟢 Clearly derived from specification
    throw new Error("User ID is required");
  }
}
```

**Review Priority**: Low
**Confirmation Points**: Implementation accuracy, performance impact

### 🟡 Yellow Light (Medium Confidence - Caution)

**Definition**: Content not in referenced source files but seems reasonable

**Characteristics**:

- Completion through AI's reasonable inference
- Implementation based on general best practices
- Inference utilizing domain knowledge

**Concrete Examples**:

```javascript
// Error handling when specification lacks details
function processData(data) {
  try {
    return transform(data);
  } catch (error) {
    // 🟡 General but requires confirmation
    console.error("Data processing failed:", error);
    return null;
  }
}
```

**Review Priority**: High
**Confirmation Points**: Validity of inference, consistency with business requirements

### 🔴 Red Light (Requires Judgment - Danger)

**Definition**: Content not in referenced source files and cannot be directly inferred

**Characteristics**:

- Generation through AI's independent judgment
- Assumption of organization-specific customs or rules
- Implementation choices without clear basis

**Concrete Examples**:

```javascript
// No info about organization‑specific log format
function logUserAction(action) {
  // 🔴 Organization‑specific, must confirm
  logger.info(
    `[AUDIT] User performed: ${action} at ${new Date().toISOString()}`
  );
}
```

**Review Priority**: Highest
**Confirmation Points**: Alignment with organizational rules, security impact

## Implementation and TODO File Format

### Standard TODO format

```markdown
## [Step Name] Result TODO

### 🟢 High‑confidence items

- [ ] Confirm that [utils.js](./src/utils.js) type definitions match the spec
- [ ] Confirm required checks in [validation.js](./src/validation.js)

### 🟡 Medium‑confidence items

- [ ] Validate error response format in [error-handler.js](./src/error-handler.js)
- [ ] Check defaults in [config.js](./src/config.js) against org policy

### 🔴 Items requiring judgment

- [ ] Confirm log format in [logger.js](./src/logger.js) meets org standard
- [ ] Confirm session management rationale in [auth.js](./src/auth.js)
```

### Prompt instruction template

```markdown
## AI Inference Visualization Instruction

Perform the following tasks and classify generated content with the traffic‑light system:

**Tasks:**
[Concrete task]

**Classification criteria:**

- 🟢 Green: Clearly derivable from references ([file names])
- 🟡 Yellow: Reasonable inference not explicitly specified
- 🔴 Red: Organization‑specific or unsupported inference

**Output file:** `./todos/[step-name]-inference-check.md`

**Output format:**
Attach marks for each item and create a TODO list
```

### Managing reference files

```markdown
## Reference File Management

**Primary references:**

- [`requirements.md`](./docs/requirements.md)
- [`api-spec.yaml`](./docs/api-spec.yaml)

**Secondary references:**

- [`existing-code/`](./src/existing/)
- [`config-samples/`](./config/)

**External references:**

- Framework docs
- Industry standards (e.g., RFC, W3C)

**Traceability:**

- 🟢 Items → explicitly in primary references
- 🟡 Items → secondary references + general knowledge
- 🔴 Items → unclear or assumed
```

## Setting Review Priorities

### Priority matrix

| Signal    | Impact High | Impact Medium | Impact Low |
| --------- | ----------- | ------------- | ---------- |
| 🔴 Red    | Highest     | High          | Medium     |
| 🟡 Yellow | High        | Medium        | Low        |
| 🟢 Green  | Medium      | Low           | Lowest     |

### Impact criteria

High impact:

- Security‑sensitive code
- Data integrity
- System‑wide behavior

Medium impact:

- Feature‑level behavior
- User experience
- Performance

Low impact:

- Logs and comments
- Internal variable names
- Auxiliary features

### Practical review order

1. 🔴 × High impact — check/fix immediately
2. 🔴 × Medium and 🟡 × High — check before next session
3. Other 🔴 items — verify before release
4. 🟡 items — check during review
5. 🟢 items — check at the end

## Case Studies

### Case 1: REST API implementation

Scenario: User management API
References: `user-api-spec.yaml`, `existing-user-model.js`

Classification example:

```javascript
// 🟢 Endpoint defined in API spec
app.post("/api/users", async (req, res) => {
  // 🟡 General validation; not detailed in spec
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  // 🔴 Hashing policy may be org‑specific
  const hashedPassword = bcrypt.hashSync(req.body.password, 12);
  // 🟢 Follows existing model pattern
  const user = new User({ email: req.body.email, password: hashedPassword });
});
```

Generated TODO:

```markdown
## API Implementation TODO

### 🟢 High‑confidence

- [ ] [user-controller.js](./src/controllers/user.js) endpoint matches spec
- [ ] [user-model.js](./src/models/user.js) follows existing patterns

### 🟡 Medium‑confidence

- [ ] [validation.js](./src/middleware/validation.js) message format
- [ ] [user-controller.js](./src/controllers/user.js) status codes

### 🔴 Requires judgment

- [ ] [auth.js](./src/utils/auth.js) bcrypt salt rounds comply with policy
```

### Case 2: Test case generation

Scenario: Test cases for the above API
References: `user-api-spec.yaml`, `existing-test-patterns.js`

```javascript
describe("User API", () => {
  it("should create user with valid email and password", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", password: "password123" });
    expect(response.status).toBe(201); // 🟢 Per spec
  });

  it("should reject invalid email format", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "invalid-email", password: "password123" });
    expect(response.status).toBe(400); // 🟡 Reasonable inference
  });

  it("should enforce password complexity requirements", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", password: "123" });
    expect(response.status).toBe(400); // 🔴 Org policy dependent
  });
});
```

## Measuring Effect and Improving

### Metrics

Quantitative:

- Review time reduction
- Increased bug discovery rate
- Fewer rework cycles

Qualitative:

- More efficient reviews
- Fewer missed critical issues
- Greater developer confidence

Example operations data:

```markdown
## Traffic‑light System Effect (1 month)

Traditional review:

- Avg review time: 45 min/feature
- Bug discovery rate: ~60%
- Missed in review: 3–4 per month

After adoption:

- Avg review time: 25 min/feature (−44%)
- Bug discovery rate: ~85% (+25%)
- Missed in review: ≤1 per month

Typical 🔴 issues:

- Security: 40%
- Policy violations: 35%
- Config/environment: 25%
```

### Continuous improvement

Classification accuracy log, prompt optimization loop, and more. Define and track improvements with concrete examples, and keep templates in `docs/inference-guides/`.

## Deployment Steps

### Step 1: Build the basics

```bash
# Prepare project structure
mkdir -p todos
mkdir -p docs/inference-guides

# Create classification template
cat > docs/inference-guides/classification-template.md << 'EOF'
## AI Inference Classification Template

### 🟢 Green criteria
- In primary references
- Follows established patterns

### 🟡 Yellow criteria
- Based on best practices
- Not explicitly in references

### 🔴 Red criteria
- Organization‑specific
- No clear rationale
EOF
```

### Step 2: Define org‑specific rules

```markdown
## Organization‑specific checkpoints

Security:

- [ ] Password hashing algorithm and strength
- [ ] Session management
- [ ] API authentication

Logging/Audit:

- [ ] Log format and levels
- [ ] Audit fields
- [ ] Retention/rotation

Coding standards:

- [ ] Naming rules
- [ ] Error‑handling patterns
- [ ] Comment rules
```

### Step 3: Team operations

```markdown
## Team operations

Classification ownership:

- Initial classification by executor
- Reviewer validates classification

Work split:

- 🔴 Items: Senior engineer
- 🟡 Items: Pair review
- 🟢 Items: Automated tests + light checks

Knowledge accumulation:

- Weekly review of criteria
- Share misclassification patterns
- Document improvements
```

## Troubleshooting

Common issues and fixes, e.g., inconsistent classification, missed 🔴 items, too many TODOs. Use stricter impact evaluation and group similar TODOs.

## Exercises

1. Create classification criteria for a provided snippet.
2. Prioritize the resulting TODOs.

## Summary

Visualization of AI inference enables:

1. Efficient review focused on critical parts
2. Risk reduction via detection of high‑risk inferences
3. Knowledge accumulation of org‑specific judgments
4. Continuous improvement of classification and prompts

The traffic‑light system balances human factors and AI support in AITDD. Next, we will study continuous improvement and prompt optimization using these techniques.
