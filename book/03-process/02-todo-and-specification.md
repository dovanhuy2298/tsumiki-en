# 3.2 Creating TODOs and Writing Specifications

## Creating TODOs: The Starting Point of Development

### Importance of TODOs

In AITDD, creating appropriate TODO items is the key to success. Ambiguous TODOs negatively impact every subsequent step, so it is important to create clear and actionable TODOs.

### Principles for Effective TODOs

#### 1. Ensure specificity

```markdown
❌ Bad: "Build a user management feature"
✅ Good: "Implement user sign-up (email/password authentication)"
```

#### 2. Use appropriate granularity

- **Too large**: One TODO includes multiple features
- **Too small**: Individual method-level items
- **Appropriate**: One self-contained feature unit

#### 3. Clarify completion conditions

```markdown
## TODO: Implement user registration API

### Completion conditions

- [ ] Implement POST /api/users endpoint
- [ ] Validate email/password
- [ ] Hash password
- [ ] Save to database
- [ ] Standardize response format
```

### Structure of the TODO Management File

#### Basic format

```markdown
# Project TODO Management

## Planned implementations

### High priority

- [ ] **User authentication**
  - Description: JWT-based authentication
  - Completion: Login/Logout/Token verification
  - Dependency: Database design completed

### Medium priority

- [ ] **Product search**
  - Description: Keyword and category search
  - Completion: Search API + filtering

## In progress

- [x] Database design (completed 2024-06-21)

## Completed

- [x] Initial project setup (completed 2024-06-20)
```

#### Recommended file layout

```
doc/
├── todo.md                          # Main TODO management
├── implementation/
│   ├── user-auth-requirements.md    # Detailed specification for a feature
│   ├── user-auth-testcases.md       # Test cases
│   └── search-requirements.md
└── archive/
    └── completed-todos.md           # Archive of completed TODOs
```

## Writing Specifications: Foundation of Design

### Purpose of specification writing

Develop detailed technical specifications from TODOs and clarify implementation direction. Ambiguity at this stage will cause major problems later, so it is important to work out details.

### Specification template

```markdown
# [Feature name] Requirements Definition

## Overview

Briefly describe the purpose and summary of the feature

## Functional requirements

### Basic functions

- List the essential basic functions

### Detailed specifications

- Input fields and validation
- Processing flow
- Output format

### Non-functional requirements

- Performance
- Security
- Availability

## Technical specifications

### API specifications

- Endpoints
- Request/Response format
- Status codes

### Database design

- Table design
- Indexes
- Constraints

### Error handling

- Define error cases
- Error messages
- Logging policy

## Constraints

- Technical constraints
- Business constraints
- External dependencies

## References

- Related documents
- External API specifications
```

### Concrete example: User registration specification

```markdown
# User Registration Requirements Definition

## Overview

Allow new users to register with email and password

## Functional requirements

### Basic functions

- Register new users via email/password
- Validate duplicate emails
- Check password strength

### Detailed specifications

#### Input items

- **email**: required, email format, max 254 characters
- **password**: required, at least 8 characters, includes letters/numbers/symbols
- **password_confirmation**: required, must match password

#### Validation

- Duplicate email check (database)
- Password strength (include uppercase/lowercase/digits/symbols)
- CSRF token verification

#### Processing flow

1. Validate input values
2. Check duplicate email
3. Hash password (bcrypt)
4. Save to database
5. Return success response

### Non-functional requirements

- Response time: within 2 seconds
- Concurrent registrations: up to 100/sec
- Password hashing required

## Technical specifications

### API spec
```

POST /api/users
Content-Type: application/json

Request:
{
"email": "user@example.com",
"password": "SecurePass123!",
"password_confirmation": "SecurePass123!"
}

Response (201):
{
"id": 123,
"email": "user@example.com",
"created_at": "2024-06-21T10:00:00Z"
}

Response (400):
{
"error": "validation_failed",
"details": [
{
"field": "email",
"message": "Email already exists"
}
]
}

````

### Database design
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
````

### Error handling

- **400**: Validation error, duplicate email
- **429**: Rate limiting
- **500**: Server error

## Constraints

- Do not store passwords in plain text
- Email verification is excluded this time
- Social login is excluded this time

```

## Human Review Points

### Checklist

#### 1. Completeness
- [ ] Are all required functions included?
- [ ] Are edge cases considered?
- [ ] Is error handling sufficient?

#### 2. Feasibility
- [ ] Is it technically implementable?
- [ ] Are performance requirements realistic?
- [ ] Are security requirements appropriate?

#### 3. Consistency
- [ ] Consistency with other features
- [ ] Consistency in data design
- [ ] Unified API interface

#### 4. Maintainability
- [ ] Future extensibility
- [ ] Ease of testing
- [ ] Ease of documentation

### Notes for review

#### Caution when using AI suggestions
- Use AI suggestions as reference
- Humans must make final decisions
- Add project-specific requirements manually

#### Progressive detailing
```

1. Overview-level specification → Review
2. Add detailed specifications → Review
3. Draft technical specifications → Review
4. Final confirmation → Approval

````

## Best Practices for Writing Specifications

### 1. Clear, unambiguous expressions
```markdown
❌ "Handle appropriately"
✅ "On error, return HTTP 400 with an error message"
````

### 2. Specify concrete numbers

```markdown
❌ "Process quickly"
✅ "Return a response within 2 seconds"
```

### 3. Clarify constraints

```markdown
❌ "Consider security"
✅ "Hash passwords with bcrypt and never store them in plain text"
```

### 4. Consider testability

- Ensure each specification item is testable
- Consider how to prepare test data
- Consider needs for mocks and stubs

## Preparation for the Next Step

Once specifications are complete, move on to [Create Test Cases](./03-test-case-creation.md).

### Deliverables checklist

- [ ] TODO.md is updated appropriately
- [ ] requirements.md is written in detail
- [ ] No ambiguity remains in the specification
- [ ] Human review is complete

### Common problems and countermeasures

#### Proceeding with ambiguous specs

**Countermeasure**: Always conduct human review and resolve questions immediately

#### Over-reliance on AI suggestions

**Countermeasure**: Treat AI suggestions as reference; humans make final decisions

#### Missing non-functional requirements

**Countermeasure**: Use a checklist for systematic review

Appropriate specification writing makes subsequent test-case creation and implementation go smoothly.

# 3.2 TODO Creation and Specification Development

## TODO Creation: Starting Point of Development

### Importance of TODO

In AITDD, appropriate TODO creation is the key to success. Ambiguous TODOs negatively affect all subsequent steps, so it's important to create clear and executable TODOs.

### Principles of Effective TODO Creation

#### 1. Ensure Specificity

```markdown
❌ Bad example: "Create user management functionality"
✅ Good example: "Implement user registration functionality (email/password authentication)"
```

#### 2. Appropriate Granularity

- **Too large**: One TODO contains multiple functionalities
- **Too small**: Individual method level
- **Appropriate**: One complete functionality unit

#### 3. Clarify Completion Criteria

```markdown
## TODO: User Registration API Implementation

### Completion Criteria

- [ ] Implement POST /api/users endpoint
- [ ] email/password validation
- [ ] Password hashing
- [ ] Database storage
- [ ] Unified response format
```

### TODO Management File Structure

#### Basic Format

```markdown
# Project TODO Management

## Planned Implementation

### High Priority

- [ ] **User Authentication Functionality**
  - Description: Authentication functionality using JWT
  - Completion criteria: Login/logout/token verification
  - Dependencies: Database design completion

### Medium Priority

- [ ] **Product Search Functionality**
  - Description: Product search by keyword and category
  - Completion criteria: Search API + filtering functionality

## In Progress

- [x] Database design (completed 2024-06-21)

## Completed

- [x] Project initial setup (completed 2024-06-20)
```

#### Recommended File Structure

```
doc/
├── todo.md                    # Main TODO management
├── implementation/
│   ├── user-auth-requirements.md      # Detailed specifications for individual functionality
│   ├── user-auth-testcases.md         # Test cases
│   └── search-requirements.md
└── archive/
    └── completed-todos.md              # Archive of completed TODOs
```

## Specification Development: Foundation of Design

### Purpose of Specification Development

Develop specific technical specifications from TODOs and clarify implementation direction. Ambiguity at this stage becomes a major problem in later steps, so it's important to consider details thoroughly.

### Specification Document Template

```markdown
# [Function Name] Requirements Definition Document

## Overview

Briefly describe the purpose and overview of the functionality

## Functional requirements

### Basic functions

- List the essential basic functions

### Detailed specifications

- Input fields and validation
- Processing flow
- Output format

### Non-functional requirements

- Performance
- Security
- Availability

## Technical specifications

### API specifications

- Endpoints
- Request/Response format
- Status codes

### Database design

- Table design
- Indexes
- Constraints

### Error handling

- Define error cases
- Error messages
- Logging policy

## Constraints

- Technical constraints
- Business constraints
- External dependencies

## References

- Related documents
- External API specifications
```

### Concrete example: User registration specification

```markdown
# User Registration Requirements Definition

## Overview

Allow new users to register with email and password

## Functional requirements

### Basic functions

- Register new users via email/password
- Validate duplicate emails
- Check password strength

### Detailed specifications

#### Input items

- **email**: required, email format, max 254 characters
- **password**: required, at least 8 characters, includes letters/numbers/symbols
- **password_confirmation**: required, must match password

#### Validation

- Duplicate email check (database)
- Password strength (include uppercase/lowercase/digits/symbols)
- CSRF token verification

#### Processing flow

1. Validate input values
2. Check duplicate email
3. Hash password (bcrypt)
4. Save to database
5. Return success response

### Non-functional requirements

- Response time: within 2 seconds
- Concurrent registrations: up to 100/sec
- Password hashing required

## Technical specifications

### API spec
```

POST /api/users
Content-Type: application/json

Request:
{
"email": "user@example.com",
"password": "SecurePass123!",
"password_confirmation": "SecurePass123!"
}

Response (201):
{
"id": 123,
"email": "user@example.com",
"created_at": "2024-06-21T10:00:00Z"
}

Response (400):
{
"error": "validation_failed",
"details": [
{
"field": "email",
"message": "Email already exists"
}
]
}

````

### Database design
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
````

### Error handling

- **400**: Validation error, duplicate email
- **429**: Rate limiting
- **500**: Server error

## Constraints

- Do not store passwords in plain text
- Email verification is excluded this time
- Social login is excluded this time

```

## Human Review Points

### Checklist

#### 1. Completeness
- [ ] Are all required functions included?
- [ ] Are edge cases considered?
- [ ] Is error handling sufficient?

#### 2. Feasibility
- [ ] Is it technically implementable?
- [ ] Are performance requirements realistic?
- [ ] Are security requirements appropriate?

#### 3. Consistency
- [ ] Consistency with other features
- [ ] Consistency in data design
- [ ] Unified API interface

#### 4. Maintainability
- [ ] Future extensibility
- [ ] Ease of testing
- [ ] Ease of documentation

### Notes for review

#### Caution when using AI suggestions
- Use AI suggestions as reference
- Humans must make final decisions
- Add project-specific requirements manually

#### Progressive detailing
```

1. Overview-level specification → Review
2. Add detailed specifications → Review
3. Draft technical specifications → Review
4. Final confirmation → Approval

````

## Best Practices for Writing Specifications

### 1. Clear, unambiguous expressions
```markdown
❌ "Handle appropriately"
✅ "On error, return HTTP 400 with an error message"
````

### 2. Specify concrete numbers

```markdown
❌ "Process quickly"
✅ "Return a response within 2 seconds"
```

### 3. Clarify constraints

```markdown
❌ "Consider security"
✅ "Hash passwords with bcrypt and never store them in plain text"
```

### 4. Consider testability

- Ensure each specification item is testable
- Consider how to prepare test data
- Consider needs for mocks and stubs

## Preparation for the Next Step

Once specifications are complete, move on to [Create Test Cases](./03-test-case-creation.md).

### Deliverables checklist

- [ ] TODO.md is updated appropriately
- [ ] requirements.md is written in detail
- [ ] No ambiguity remains in the specification
- [ ] Human review is complete

### Common problems and countermeasures

#### Proceeding with ambiguous specs

**Countermeasure**: Always conduct human review and resolve questions immediately

#### Over-reliance on AI suggestions

**Countermeasure**: Treat AI suggestions as reference; humans make final decisions

#### Missing non-functional requirements

**Countermeasure**: Use a checklist for systematic review

Appropriate specification writing makes subsequent test-case creation and implementation go smoothly.
