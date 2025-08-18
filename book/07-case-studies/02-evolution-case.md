# 7.2 Evolution from Vibe Coding to TDD

## Introduction

Many developers follow a common path when adopting AI for development. This section explains the evolution from unstructured “Vibe Coding” to a structured AITDD method, and the lessons learned along the way.

## What is Vibe Coding?

### Definition and characteristics

“Vibe Coding” is coding with AI by momentum and feel. Characteristics:

- Live coding + AI
- Ad‑hoc, unstructured usage
- No clear design phase
- Tendency to accept AI output as‑is
- Test strategy comes after implementation

### Initial appeal

- Start coding immediately
- Extremely fast for a single feature
- Low learning cost
- Natural conversational interaction

### Tool history (early stage)

- Claude Sonnet 3.5
- DeepSeek R1 distilled models
- Various AI tools by trial and error

## Serious problems of Vibe Coding

### 1) Quality instability

- Test burden increases: all manual testing, hard to add automation later, slow root‑cause analysis
- Unpredictable generation: lots of code not requested, ignores existing code, divergent results for the same request
- Repetitive fixing: the same bug patterns recur elsewhere; little learning effect

### 2) Scalability limits: the “three‑feature wall”

- Single feature: very fast
- Two features: doable but harder
- Three features: integration becomes so hard that manual work is faster
- Integration pains: interface mismatches, broken data flows, duplicated code

### 3) Fatal lack of maintainability

- No consistency (naming, patterns, data design)
- Low predictability and hard‑to‑estimate change impacts
- Debugging is difficult (unclear root causes, inconsistent logging/handling)

## Dramatic improvements with TDD

### Resolved pain points

1. Incremental development with assurance per step
2. Robust test foundation (write tests first; regression safety)
3. Sustainable long‑term development (maintainability, extensibility)
4. Predictable quality via repeatable process

### Current method: Red‑Green‑Refactor‑Validation

1. Red: write failing tests first
2. Green: minimal implementation to pass
3. Refactor: improve code quality
4. Validation: comprehensive quality checks

AI is used optimally at each stage with automation and continuous improvement.

## Recommended stepwise evolution

Stage 1: Experience Vibe Coding (1–2 weeks) → understand AI capabilities and dialog patterns

Stage 2: Recognize limits (2–4 weeks) → try integrating multiple features; hit the “three‑feature wall”

Stage 3: Introduce TDD (4–8 weeks) → build AITDD workflow and QA process

Stage 4: Establish long‑term AITDD in teams → continuous improvement and best‑practice accumulation

## Migration strategy

Do’s:

- Consider test strategy from the start
- Run small experiments to expose limits and capture problems
- Combine TDD early once limits appear; prefer learning on new code

Don’ts:

- Avoid large projects with Vibe Coding
- Don’t postpone quality management
- Don’t accept AI output uncritically; always validate design, security, and performance

## Key lessons

- Vibe Coding is a valuable first step, but structured methods are essential for sustainability
- Early recognition of the “three‑feature wall” is critical to pivot to TDD in time
- Gradual introduction works best for individuals and organizations

# 7.2 Evolution Case: From Vibe Coding to TDD

## Introduction

In the evolution of AI-assisted development methods, there is a typical path that many developers experience. This section explains in detail the evolution process from "Vibe Coding," which is unstructured AI utilization, to systematic AITDD methods. This case provides important lessons in the maturation process of AI development methods.

## What is Vibe Coding

### Definition and Characteristics

**Vibe Coding** is **"coding done with AI based on mood and momentum"**. It has the following characteristics:

- Combination of **Live Coding + AI**
- Unstructured, ad-hoc AI utilization
- Lack of clear design phases
- Tendency to accept AI output as-is
- Test strategy added after the fact

### Initial Appeal

Vibe Coding is very appealing at first:

- **Immediate implementation start**: Can start coding before thinking
- **High initial efficiency**: Single functionality implementation is surprisingly fast
- **Low learning cost**: No need to learn special methods
- **Intuitive operation**: Code is generated through natural conversation

### Tool Evolution

**Initial Phase (Vibe Coding Era)**

- Claude Sonnet 3.5
- DeepSeek R1 distilled model
- Trial and error with various AI tools

## Serious Problems with Vibe Coding

### 1. Quality Instability

Specific problems encountered in actual development:

**Dramatic Increase in Testing Burden**

- Need to **test everything manually**
- Difficult to add automated testing mechanisms after the fact
- Takes a long time to identify root causes when bugs are found

**Unpredictable Code Generation**

- AI generates **large amounts of code not requested**
- **Ignores existing code** and starts writing similar code
- **Same request produces completely different implementations**

**Repetitive Work Occurrence**

- **Bug fixes become repetitive**
- Once-fixed problems recur in different places
- Debug pattern learning effects don't accumulate

### 2. Scalability Limitations

**"Three-Feature Integration Wall"**

Limitations clearly demonstrated in practice:

- **Single functionality**: Very fast and efficient
- **Two-feature integration**: Slightly difficult but possible
- **Three-feature integration**: Becomes extremely difficult, **manual work becomes faster**

**Integration Work Difficulties**

- Each functionality is generated independently, causing consistency issues during integration
- Interface mismatches
- Data flow discontinuities
- Massive duplication of code

### 3. Fatal Lack of Maintainability

**Code Inconsistency**

- Naming conventions differ by file
- Inconsistent architectural patterns
- Mixed design philosophies for data structures

**Low Predictability**

- Same correction request produces different results
- Difficult to predict side effects
- Impossible to grasp change impact scope

**Debugging Difficulties**

- Unclear root causes of errors
- Inconsistent log output policies
- Inconsistent error handling

## Dramatic Improvement Through TDD Introduction

### Resolved pain points

1. Incremental development with assurance per step
2. Robust test foundation (write tests first; regression safety)
3. Sustainable long‑term development (maintainability, extensibility)
4. Predictable quality via repeatable process

### Current method: Red‑Green‑Refactor‑Validation

1. Red: write failing tests first
2. Green: minimal implementation to pass
3. Refactor: improve code quality
4. Validation: comprehensive quality checks

AI is used optimally at each stage with automation and continuous improvement.

## Recommended stepwise evolution

Stage 1: Experience Vibe Coding (1–2 weeks) → understand AI capabilities and dialog patterns

Stage 2: Recognize limits (2–4 weeks) → try integrating multiple features; hit the “three‑feature wall”

Stage 3: Introduce TDD (4–8 weeks) → build AITDD workflow and QA process

Stage 4: Establish long‑term AITDD in teams → continuous improvement and best‑practice accumulation

## Migration strategy

Do’s:

- Consider test strategy from the start
- Run small experiments to expose limits and capture problems
- Combine TDD early once limits appear; prefer learning on new code

Don’ts:

- Avoid large projects with Vibe Coding
- Don’t postpone quality management
- Don’t accept AI output uncritically; always validate design, security, and performance

## Key lessons

- Vibe Coding is a valuable first step, but structured methods are essential for sustainability
- Early recognition of the “three‑feature wall” is critical to pivot to TDD in time
- Gradual introduction works best for individuals and organizations
