# 4.1 Your First AITDD Project

## Learning Objectives

In this chapter, you will experience the basic flow of AITDD through an initial small project and learn to:

- Understand the overall AITDD process
- Practice the complete sequence from creating TODOs to completing implementation
- Experience the right balance between AI assistance and human review
- Feel the effectiveness of AITDD on a small, focused feature

## Selecting Your First Project

### Characteristics that fit the first project

**Scope:**

- A small feature that can be completed in about 30–60 minutes
- A simple process with a single responsibility
- A feature with high independence and minimal external dependencies

**Technical complexity:**

- Use a familiar tech stack
- Content you can picture how to implement
- Debugging remains relatively simple

**Learning effect:**

- Experience each AITDD step end to end
- Easy to gain an initial success experience
- Acts as a foundation you can expand later

### Recommended project examples

**1. Simple calculation feature**

```
Example: Tax-included price calculator
- Input: item price, tax rate
- Output: tax-included price, tax amount
- Processing: basic numeric computation
```

**2. Data transformation feature**

```
Example: CSV-to-JSON format conversion
- Input: CSV string
- Output: JSON data
- Processing: parsing and transformation logic
```

**3. Validation feature**

```
Example: Email address validation
- Input: string
- Output: validation result (boolean)
- Processing: format check via regular expressions
```

## Hands-on: Tax-Included Price Calculator

In this example, you will learn the AITDD process by implementing a tax-included price calculator.

### Step 1: Create TODO

Create a `todo.md` file in your project and clarify the features to implement.

```markdown
# TODO: Implement tax-included price calculator

## Features to implement

- [ ] Function to calculate tax-included price from item price and tax rate
- [ ] Function to calculate tax amount
- [ ] Input validation
- [ ] Error handling (negative values, null, etc.)

## Completion criteria

- Works correctly with normal values
- Proper error handling for abnormal values
- Achieve 100% test coverage
```

**Points:**

- Break down features concretely
- Clarify completion criteria
- Adjust granularity so each item takes about 30–60 minutes

### Step 2: Write the Specification

Based on the TODO, create a detailed specification in collaboration with AI.

**Prompt example to AI:**

```
From the following TODO, create a detailed specification document:

[paste contents of todo.md]

Please include:
- Function signatures (parameters, return values)
- Constraints on inputs
- Error conditions and handling
- Details of calculation logic
```

**Expected specification (example):**

```markdown
# Tax-Included Price Calculator – Specification

## Function specs

### calculateTaxIncludedPrice(price: number, taxRate: number): number

- Calculate tax-included price from item price and tax rate
- Parameters:
  - price: item price (number ≥ 0)
  - taxRate: tax rate (decimal from 0 to 1 inclusive, e.g., 0.1 = 10%)
- Return: tax-included price (rounded to 1 decimal place)

### calculateTax(price: number, taxRate: number): number

- Calculate tax amount
- Parameters/returns same as above
- Return: tax amount (rounded to 1 decimal place)

## Error handling

- Negative price: Error("Price must be greater than or equal to 0")
- Tax rate out of range: Error("Tax rate must be between 0 and 1 inclusive")
- null/undefined: Error("Please input valid numbers")
```

**Human review checkpoints:**

- [ ] Does it reflect the intent of the TODO correctly?
- [ ] Is each function’s responsibility appropriate?
- [ ] Are error conditions comprehensive?
- [ ] Is it feasible to implement?

### Step 3: Create Test Cases

Ask AI to create test cases based on the specification.

**Prompt example to AI:**

```
Create comprehensive test cases based on the following specification:

[paste the specification]

Design test cases from the following viewpoints:
- Normal cases: behavior with general values
- Boundary values: behavior at boundaries such as 0 and 1
- Error cases: behavior for error conditions
- Test framework: Jest
```

**Generated test example:**

```typescript
import { calculateTaxIncludedPrice, calculateTax } from "./taxCalculator";

describe("Tax-Included Price Calculator", () => {
  describe("calculateTaxIncludedPrice", () => {
    // Normal
    test("General tax-included price calculation", () => {
      expect(calculateTaxIncludedPrice(1000, 0.1)).toBe(1100);
      expect(calculateTaxIncludedPrice(150, 0.08)).toBe(162);
    });

    // Boundary
    test("Price 0", () => {
      expect(calculateTaxIncludedPrice(0, 0.1)).toBe(0);
    });

    test("Tax rate 0", () => {
      expect(calculateTaxIncludedPrice(1000, 0)).toBe(1000);
    });

    // Error
    test("Error on negative price", () => {
      expect(() => calculateTaxIncludedPrice(-100, 0.1)).toThrow(
        "Price must be greater than or equal to 0"
      );
    });

    test("Error when tax rate is out of range", () => {
      expect(() => calculateTaxIncludedPrice(1000, -0.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
      expect(() => calculateTaxIncludedPrice(1000, 1.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
    });
  });

  describe("calculateTax", () => {
    test("Tax amount calculation", () => {
      expect(calculateTax(1000, 0.1)).toBe(100);
      expect(calculateTax(150, 0.08)).toBe(12);
    });
  });
});
```

**Human review checkpoints:**

- [ ] Do test cases cover all specification requirements?
- [ ] Are error-case tests appropriate?
- [ ] Are expected values correct?
- [ ] Any test cases you should add?

### Step 4: Red-Green-Refactor-Validation Cycle

#### 4.1 Red (Failing tests)

Run tests and confirm expected failures.

```bash
npm test
```

Expected output:

```
FAIL  src/taxCalculator.test.ts
  ✕ calculateTaxIncludedPrice is not defined
  ✕ calculateTax is not defined
```

#### 4.2 Green (Minimal implementation)

Ask AI for the minimal implementation.

**Prompt example to AI:**

```
Create the minimal implementation that passes the following test cases:

[paste the test cases]

Requirements:
- Prioritize passing tests
- Do not over-engineer
- Implement proper error handling
```

**Generated implementation example:**

```typescript
export function calculateTaxIncludedPrice(
  price: number,
  taxRate: number
): number {
  validateInputs(price, taxRate);
  const tax = calculateTax(price, taxRate);
  return Math.round((price + tax) * 10) / 10;
}

export function calculateTax(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  return Math.round(price * taxRate * 10) / 10;
}

function validateInputs(price: number, taxRate: number): void {
  if (price < 0) {
    throw new Error("Price must be greater than or equal to 0");
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error("Tax rate must be between 0 and 1 inclusive");
  }
}
```

Run tests:

```bash
npm test
# Confirm all tests pass
```

#### 4.3 Refactor

Ask AI to improve the code.

**Prompt example to AI:**

```
Please refactor the following code:

[paste the implementation]

Improve:
- Code readability
- Separation of responsibilities
- Performance
- TypeScript type-safety
```

#### 4.4 Validation

Ask AI to verify the implementation comprehensively.

**Prompt example to AI:**

```
Please validate the following implementation comprehensively:

[paste the refactored code]
[paste the test cases]

Validation viewpoints:
- Consistency with specification
- Code quality (readability, maintainability)
- Validity of test coverage
- Potential issues
- Performance concerns
```

### Step 5: Final Review

**Human review checklist:**

**Functionality:**

- [ ] All tests pass
- [ ] Specification requirements are met
- [ ] Error handling is appropriate

**Code quality:**

- [ ] High readability
- [ ] Proper separation of responsibilities
- [ ] Follows naming conventions
- [ ] Proper TypeScript typing

**Maintainability:**

- [ ] Easy to extend
- [ ] Tests are maintainable
- [ ] Documentation is adequate

## Reflection and Learning Points

### Success patterns

**Process adherence:**

- Execute each step without skipping
- Ensure human reviews are performed
- Don’t accept AI output blindly

**Effective AI usage:**

- Use clear and specific prompts
- Provide sufficient context
- Specify the expected output format

### Common failure patterns and countermeasures

**Failure 1: Ambiguous prompts**

```
❌ Bad: "Create a tax calculation function"
✅ Good: "Create a function to calculate tax-included price from item price and tax rate, following this specification: [detailed spec]"
```

**Failure 2: Skipping human review**

```
❌ Problem: Using AI output as-is
✅ Fix: Always confirm consistency with the specification
```

**Failure 3: Weak test design**

```
❌ Problem: Only normal-case tests
✅ Fix: Comprehensive tests including boundary and error cases
```

### Preparation for the Next Step

Skills you should acquire from this first project:

- The rhythm of collaborative development with AI
- The importance of quality management
- Basics of prompt design
- Understanding review checkpoints

In the next chapter, you will develop CRUD operations with higher complexity and build applied AITDD skills.

## Summary

In your first AITDD project, focus on:

1. **Gaining a success experience**: Experience the complete process even on a small scope
2. **Establishing basic habits**: Understand the importance of each step
3. **Developing feel for AI usage**: Basics of effective prompt design
4. **Building quality awareness**: Appreciate the value of human review

With these foundations, you will be able to leverage AITDD effectively even in more complex projects.

# 4.1 First AITDD Project

## Learning Objectives

In this chapter, through a first project that allows you to experience the basic AITDD flow, you will acquire:

- Understanding of the overall AITDD process flow
- Practical experience of the complete procedure from TODO creation to implementation completion
- Experience with appropriate balance between AI assistance and human review
- Experience AITDD effectiveness with small-scale functionality

## Project Selection Criteria

### Characteristics Suitable for First Project

**Implementation Scope**:

- Small-scale functionality that can be completed in 30 minutes to 1 hour
- Simple processing with single responsibility
- High independence functionality with few external dependencies

**Technical Complexity**:

- Use familiar technology stack
- Content where implementation method can be imagined
- Processing that is relatively easy to debug

**Learning Effect**:

- Can experience each step of AITDD
- Content that easily provides success experience
- Functionality that can serve as foundation for future expansion

### Recommended Project Examples

**1. Simple Calculation Function**

```
Example: Tax-inclusive Price Calculator
- Input: Product price, tax rate
- Output: Tax-inclusive price, tax amount
- Processing: Basic numerical calculation
```

**2. Data Conversion Function**

```
Example: CSV Data Format Conversion
- Input: CSV string
- Output: JSON format data
- Processing: Parse and conversion logic
```

**3. Validation Function**

```
Example: Email Address Verification
- Input: String
- Output: Verification result (boolean)
- Processing: Format check using regular expressions
```

## Practical Hands-on: Tax-inclusive Price Calculator

In this example, we will learn the AITDD process through implementing a tax-inclusive price calculator.

### Step 1: TODO Creation

Create a todo.md file in the project and clarify the functionality to implement.

```markdown
# TODO: Tax-inclusive Price Calculator Implementation

## Functionality to Implement

- [ ] Function to calculate tax-inclusive price from product price and tax rate
- [ ] Function to calculate tax amount
- [ ] Input value validation
- [ ] Error handling (negative values, null values, etc.)

## Completion Criteria

- Calculation works correctly with normal values
- Appropriate error handling for abnormal values
- Achieve 100% test coverage
```

**Key Points**:

- Break down functionality concretely
- Clarify completion criteria
- Adjust granularity to complete in 30 minutes to 1 hour

### Step 2: Specification Creation

Based on the TODO, create a detailed specification in collaboration with AI.

**AI Prompt Example**:

```
From the following TODO, create a detailed specification document:

[paste contents of todo.md]

Please include:
- Function signatures (parameters, return values)
- Constraints on inputs
- Error conditions and handling
- Details of calculation logic
```

**Expected specification (example)**:

```markdown
# Tax-Included Price Calculator – Specification

## Function specs

### calculateTaxIncludedPrice(price: number, taxRate: number): number

- Calculate tax-included price from item price and tax rate
- Parameters:
  - price: item price (number ≥ 0)
  - taxRate: tax rate (decimal from 0 to 1 inclusive, e.g., 0.1 = 10%)
- Return: tax-included price (rounded to 1 decimal place)

### calculateTax(price: number, taxRate: number): number

- Calculate tax amount
- Parameters/returns same as above
- Return: tax amount (rounded to 1 decimal place)

## Error handling

- Negative price: Error("Price must be greater than or equal to 0")
- Tax rate out of range: Error("Tax rate must be between 0 and 1 inclusive")
- null/undefined: Error("Please input valid numbers")
```

**Human review checkpoints**:

- [ ] Does it reflect the intent of the TODO correctly?
- [ ] Is each function’s responsibility appropriate?
- [ ] Are error conditions comprehensive?
- [ ] Is it feasible to implement?

### Step 3: Create Test Cases

Ask AI to create test cases based on the specification.

**AI Prompt Example**:

```
Create comprehensive test cases based on the following specification:

[paste the specification]

Design test cases from the following viewpoints:
- Normal cases: behavior with general values
- Boundary values: behavior at boundaries such as 0 and 1
- Error cases: behavior for error conditions
- Test framework: Jest
```

**Generated test example**:

```typescript
import { calculateTaxIncludedPrice, calculateTax } from "./taxCalculator";

describe("Tax-Included Price Calculator", () => {
  describe("calculateTaxIncludedPrice", () => {
    // Normal
    test("General tax-included price calculation", () => {
      expect(calculateTaxIncludedPrice(1000, 0.1)).toBe(1100);
      expect(calculateTaxIncludedPrice(150, 0.08)).toBe(162);
    });

    // Boundary
    test("Price 0", () => {
      expect(calculateTaxIncludedPrice(0, 0.1)).toBe(0);
    });

    test("Tax rate 0", () => {
      expect(calculateTaxIncludedPrice(1000, 0)).toBe(1000);
    });

    // Error
    test("Error on negative price", () => {
      expect(() => calculateTaxIncludedPrice(-100, 0.1)).toThrow(
        "Price must be greater than or equal to 0"
      );
    });

    test("Error when tax rate is out of range", () => {
      expect(() => calculateTaxIncludedPrice(1000, -0.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
      expect(() => calculateTaxIncludedPrice(1000, 1.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
    });
  });

  describe("calculateTax", () => {
    test("Tax amount calculation", () => {
      expect(calculateTax(1000, 0.1)).toBe(100);
      expect(calculateTax(150, 0.08)).toBe(12);
    });
  });
});
```

**Human review checkpoints**:

- [ ] Do test cases cover all specification requirements?
- [ ] Are error-case tests appropriate?
- [ ] Are expected values correct?
- [ ] Any test cases you should add?

### Step 4: Red-Green-Refactor-Validation Cycle

#### 4.1 Red (Failing tests)

Run tests and confirm expected failures.

```bash
npm test
```

Expected output:

```
FAIL  src/taxCalculator.test.ts
  ✕ calculateTaxIncludedPrice is not defined
  ✕ calculateTax is not defined
```

#### 4.2 Green (Minimal implementation)

Ask AI for the minimal implementation.

**AI Prompt Example**:

```
Create the minimal implementation that passes the following test cases:

[paste the test cases]

Requirements:
- Prioritize passing tests
- Do not over-engineer
- Implement proper error handling
```

**Generated implementation example**:

```typescript
export function calculateTaxIncludedPrice(
  price: number,
  taxRate: number
): number {
  validateInputs(price, taxRate);
  const tax = calculateTax(price, taxRate);
  return Math.round((price + tax) * 10) / 10;
}

export function calculateTax(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  return Math.round(price * taxRate * 10) / 10;
}

function validateInputs(price: number, taxRate: number): void {
  if (price < 0) {
    throw new Error("Price must be greater than or equal to 0");
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error("Tax rate must be between 0 and 1 inclusive");
  }
}
```

Run tests:

```bash
npm test
# Confirm all tests pass
```

#### 4.3 Refactor (Refactoring)

Ask AI to improve the code.

**AI Prompt Example**:

```
Please refactor the following code:

[paste the implementation]

Improve:
- Code readability
- Separation of responsibilities
- Performance
- TypeScript type-safety
```

#### 4.4 Validation (Validation)

Ask AI to verify the implementation comprehensively.

**AI Prompt Example**:

```
Please validate the following implementation comprehensively:

[paste the refactored code]
[paste the test cases]

Validation viewpoints:
- Consistency with specification
- Code quality (readability, maintainability)
- Validity of test coverage
- Potential issues
- Performance concerns
```

### Step 5: Final Review

**Human review checklist**:

**Functionality**:

- [ ] All tests pass
- [ ] Specification requirements are met
- [ ] Error handling is appropriate

**Code quality**:

- [ ] High readability
- [ ] Proper separation of responsibilities
- [ ] Follows naming conventions
- [ ] Proper TypeScript typing

**Maintainability**:

- [ ] Easy to extend
- [ ] Tests are maintainable
- [ ] Documentation is adequate

## Reflection and Learning Points

### Success patterns

**Process adherence**:

- Execute each step without skipping
- Ensure human reviews are performed
- Do not accept AI output blindly

**Effective AI usage**:

- Use clear and specific prompts
- Provide sufficient context
- Specify the expected output format

### Common failure patterns and countermeasures

**Failure 1: Ambiguous prompts**

```
❌ Bad: "Create a tax calculation function"
✅ Good: "Create a function to calculate tax-included price from item price and tax rate, following this specification: [detailed spec]"
```

**Failure 2: Skipping human review**

```
❌ Problem: Using AI output as-is
✅ Fix: Always confirm consistency with the specification
```

**Failure 3: Weak test design**

```
❌ Problem: Only normal-case tests
✅ Fix: Comprehensive tests including boundary and error cases
```

### Preparation for the Next Step

Skills you should acquire from this first project:

- The rhythm of collaborative development with AI
- The importance of quality management
- Basics of prompt design
- Understanding review checkpoints

Next chapter, you will develop CRUD operations with higher complexity and build applied AITDD skills.

## Summary

In your first AITDD project, focus on:

1. **Gaining a success experience**: Experience the complete process even on a small scope
2. **Establishing basic habits**: Understand the importance of each step
3. **Developing feel for AI usage**: Basics of effective prompt design
4. **Building quality awareness**: Appreciate the value of human review

With these foundations, you will be able to leverage AITDD effectively even in more complex projects.
