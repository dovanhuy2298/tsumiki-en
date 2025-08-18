# rev-requirements

## Purpose

Reverse-engineer requirements definition documents from an existing codebase. Analyze implemented features and extract/document functional requirements, non-functional requirements, and user stories using EARS (Easy Approach to Requirements Syntax) notation.

## Prerequisites

- Codebase for analysis exists
- `docs/reverse/` directory exists (create if it doesn't exist)
- Preferably, `rev-tasks.md` and `rev-design.md` have been executed beforehand

## Execution Content

1. **Feature Identification and Analysis**

   - Extract screen functions from UI components
   - Identify business functions from API endpoints
   - Estimate data requirements from database schema
   - Confirm expected behavior from test code

2. **User Story Reverse Engineering**

   - Estimate user intent from implemented features
   - Identify WHO (user type)
   - Extract WHAT (what they want to achieve)
   - Estimate WHY (the value they gain)

3. **Requirements Classification by EARS Notation**

   - **Normal Requirements (SHALL)**: Extracted from standard feature implementations
   - **Conditional Requirements (WHEN/IF-THEN)**: Extracted from conditional branch logic
   - **State Requirements (WHERE)**: Extracted from state management implementations
   - **Optional Requirements (MAY)**: Extracted from configurable features
   - **Constraint Requirements (MUST)**: Extracted from validation/restriction logic

4. **Non-functional Requirements Estimation**

   - Performance requirements: Estimated from implemented caching and optimizations
   - Security requirements: Extracted from authentication/authorization implementations
   - Usability requirements: Extracted from UI/UX implementations
   - Operational requirements: Extracted from logging and monitoring implementations

5. **Edge Case Identification**

   - Extract exception requirements from error handling implementations
   - Extract boundary value requirements from validation implementations
   - Extract anticipated error cases from test cases

6. **Acceptance Criteria Generation**

   - Reverse-engineer acceptance criteria from implemented tests
   - Suggest unimplemented test cases as recommendations

7. **File Creation**
   - Save as `docs/reverse/{project-name}-requirements.md`

## Output Format Example

```markdown
# {Project Name} Requirements Definition Document (Reverse-Generated)

## Analysis Overview

**Analysis Date/Time**: {execution timestamp}
**Target Codebase**: {path}
**Extracted Requirements**: {functional requirements count} functional requirements, {non-functional requirements count} non-functional requirements
**Reliability**: {analysis reliability}% (based on implementation coverage)

## System Overview

### Estimated System Purpose

{System purpose estimated from implemented functionality}

### Target Users

{User types estimated from UI components and functionality}

## User Stories

### Story 1: User Authentication

- **As a** unregistered/existing user **I want to**
- **safely log into the system**
- **So that** I can access personal information and services

**Implementation Basis**:

- `LoginForm.tsx` - Login form implementation
- `POST /auth/login` - Authentication API implementation
- `useAuth` hook - Authentication state management

### Story 2: {Other Stories}

{Additional user stories estimated from implemented functionality}

## Functional Requirements (EARS Notation)

### Normal Requirements

#### REQ-001: User Authentication

The system must provide user login with valid email address and password.

**Implementation Basis**:

- `auth.service.ts:login()` method
- `POST /auth/login` endpoint
- JWT token issuance implementation

#### REQ-002: Session Management

The system must manage user sessions after login.

**Implementation Basis**:

- Session management via JWT tokens
- State management in `useAuth` hook
- Token persistence in local storage

### Conditional Requirements

#### REQ-101: Authentication Failure Handling

When invalid authentication information is provided, the system must display appropriate error messages.

**Implementation Basis**:

- Error handling in `auth.controller.ts`
- Error display implementation in `LoginForm.tsx`

#### REQ-102: Token Expiration Handling

When JWT tokens expire, the system must redirect users to the re-login page.

**Implementation Basis**:

- 401 error handling in `axios.interceptors`
- Automatic logout functionality implementation

### State Requirements

#### REQ-201: Display in Login State

When users are in login state, the system must display UI for authenticated users.

**Implementation Basis**:

- Authentication state confirmation in `useAuth` hook
- Conditional rendering based on authentication state

### Optional Requirements

#### REQ-301: Login State Memory

The system may remember user login state.

**Implementation Basis**:

- Token storage in local storage
- Auto-login functionality implementation

### Constraint Requirements

#### REQ-401: Password Requirements

The system must set a minimum 8-character constraint for passwords.

**Implementation Basis**:

- Frontend validation implementation
- Constraint definition in `yup` schema

#### REQ-402: Rate Limiting

The system must set rate limits for login attempts.

**Implementation Basis**:

- `express-rate-limit` middleware implementation

## Non-functional Requirements

### Performance

#### NFR-001: Login Response Time

The system must complete normal login processing within 2 seconds.

**Implementation Basis**:

- Database index configuration
- Efficient query implementation

#### NFR-002: Concurrent Users

The system must handle access from 100 concurrent users.

**Estimation Basis**:

- Connection pool configuration
- Server configuration

### Security

#### NFR-101: Authentication Token Encryption

The system must properly encrypt JWT tokens.

**Implementation Basis**:

- Use of `jsonwebtoken` library
- Secret key signature implementation

#### NFR-102: HTTPS Communication

The system must enforce HTTPS communication in production environment.

**Implementation Basis**:

- SSL configuration files
- HTTPS redirect implementation

### Usability

#### NFR-201: Responsive Design

The system must be usable on mobile devices.

**Implementation Basis**:

- CSS media query implementation
- Responsive UI components

#### NFR-202: Accessibility

The system must meet basic accessibility requirements.

**Implementation Basis**:

- Use of ARIA attributes
- Semantic HTML structure

### Operational

#### NFR-301: Log Output

The system must log important operations.

**Implementation Basis**:

- Use of `winston` logging library
- Structured logging implementation

#### NFR-302: Error Tracking

The system must be able to track occurred errors.

**Implementation Basis**:

- Error handling implementation
- Tracking functionality via log output

## Edge Cases

### Error Handling

#### EDGE-001: Network Disruption

Retry processing for unstable network connections

**Implementation Root**:

- `axios` retry settings
- Error toast display

#### EDGE-002: Server Down

Processing for unavailable backend servers

**Implementation Root**:

- Fallback functionality
- Error page display

### Boundary Values

#### EDGE-101: Maximum Character Limit

Maximum character limit for input fields

**Implementation Root**:

- Form validation implementation
- Database constraints

#### EDGE-102: Empty String/Null Value Handling

Appropriate handling for empty strings and null values

**Implementation Root**:

- Validation implementation
- Default value setting

## Acceptance Criteria

### Implemented Functionality Tests

- [x] User Login Functionality
  - [x] Successful login with valid authentication credentials
  - [x] Failed login with invalid authentication credentials
  - [x] Appropriate error message display
- [x] Session Management Functionality
  - [x] Maintained login state
  - [x] Logout functionality
  - [x] Token expiration handling

### Recommended Additional Tests

- [ ] **Performance Tests**
  - [ ] Login response time measurement
  - [ ] Simultaneous access load test
- [ ] **Security Tests**
  - [ ] SQL injection prevention test
  - [ ] XSS prevention test
  - [ ] CSRF prevention test
- [ ] **Accessibility Tests**
  - [ ] Screen reader compatibility test
  - [ ] Keyboard operation test

## Unidentified Requirements

### Unclear Parts

The following requirements are difficult to estimate from implementation, so confirmation with stakeholders is required:

1. **Business Requirements**

   - Detailed system usage purpose
   - Detailed attributes of target users
   - Revenue model and business objectives

2. **Operational Requirements**

   - Backup and recovery requirements
   - SLA (Service Level Agreement)
   - Monitoring and alerting requirements

3. **Legal and Compliance Requirements**
   - Compliance with data protection regulations
   - Industry-specific regulatory requirements

### Recommended Next Steps

1. **Stakeholder Interviews** - Confirmation of estimated requirements
2. **Usability Tests** - Confirmation of actual usability requirements
3. **Performance Tests** - Verification of non-functional requirements
4. **Security Audit** - Detailed verification of security requirements

## Constraints in Analysis

### Factors Affecting Reliability

- **Comment Insufficiency**: Estimate by supplementing developer intent
- **Test Coverage**: {%}% - Requirements for untested parts are estimated
- **Document Insufficiency**: No external specification documents exist
- **Legacy Code**: Difficulty in estimating due to old implementation patterns

### Basis of Estimation

- **Strong Basis**: Implementation + Tests + Clear behavior
- **Medium Basis**: Implementation + Partial Tests
- **Weak Basis**: Only implementation, supplemented by estimation
```

## Requirement Extraction Algorithm

### 1. Functional Requirement Extraction Process

```
1. API Endpoint → Business Functionality Requirement
2. UI Component → User Interface Requirement
3. Database Schema → Data Requirements
4. Validation Implementation → Constraint Requirements
5. Conditional Branching → Conditional Requirements
```

### 2. Non-functional Requirement Estimation Process

```
1. Configuration Files + Libraries → Performance and Security Requirements
2. UI Implementation Patterns → Usability Requirements
3. Logging and Monitoring Implementation → Operational Requirements
4. Test Implementation → Quality Requirements
```

### 3. User Story Reverse Engineering Process

```
1. Screen Transition Flow → User Journey
2. Forms and Input Items → User Actions
3. CRUD Operations on Data → User Needs
4. Permission and Role Implementation → User Types
```

## Example Execution Commands

```bash
# Full Analysis (All Requirements Extracted)
claude code rev-requirements

# Only specific requirement categories extracted
claude code rev-requirements --target functional
claude code rev-requirements --target non-functional
claude code rev-requirements --target user-stories

# Confidence Filter
claude code rev-requirements --confidence high
claude code rev-requirements --confidence medium

# Analyze specific directory
claude code rev-requirements --path ./src

# Output format specification
claude code rev-requirements --format markdown,json
```

## Post-execution Confirmation

- Display the number of extracted requirements (functional and non-functional)
- Report analysis reliability and strength of basis
- Highlight requirements that are difficult to estimate or require confirmation
- Generate a list of questions for stakeholder confirmation
- Propose next recommended actions (add tests, document maintenance, etc.)
