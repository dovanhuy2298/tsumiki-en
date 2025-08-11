# rev-specs

## Purpose

Reverse-generate comprehensive test cases and specifications from an existing codebase. Analyze implemented business logic, API behavior, and UI component behavior, identify and generate missing test cases, and document them as specifications.

## Prerequisites

- The target codebase to analyze exists
- The `docs/reverse/` directory exists (create it if it does not)
- Preferably, `rev-requirements.md` and `rev-design.md` have been executed beforehand

## Execution Content

1. **Analyze Existing Tests**

   - Check implementation status of unit tests
   - Check implementation status of integration tests
   - Check implementation status of E2E tests
   - Measure test coverage

2. **Reverse-generate Test Cases from Implementation Code**

   - Generate test cases from function/method parameters and return values
   - Generate boundary test cases from conditional branches
   - Generate abnormal test cases from error handling
   - Generate data tests from database operations

3. **Generate Test Cases from API Specifications**

   - Normal test cases for each endpoint
   - Authentication/authorization tests
   - Validation error tests
   - HTTP status code tests

4. **Generate Test Cases from UI Components**

   - Component rendering tests
   - User interaction tests
   - State change tests
   - Property change tests

5. **Generate Performance and Security Test Cases**

   - Load test scenarios
   - Security vulnerability tests
   - Response time tests

6. **Generate Test Specifications**

   - Test plan
   - List of test cases
   - Test environment specifications
   - Test procedures

7. **Create Files**
   - `docs/reverse/{project-name}-test-specs.md` - Test specifications
   - `docs/reverse/{project-name}-test-cases.md` - List of test cases
   - `docs/reverse/tests/` - Generated test code

## Output Format Examples

### test-specs.md

````markdown
# {project-name} Test Specifications (Reverse-Generated)

## Analysis Overview

**Analysis Date/Time**: {execution timestamp}
**Target Codebase**: {path}
**Test Coverage**: {current coverage}%
**Generated Test Cases**: {generated count}
**Recommended Cases to Implement**: {recommended count}

## Current Test Implementation Status

### Test Frameworks

- **Unit**: {Jest/Vitest/pytest, etc.}
- **Integration**: {Supertest/TestContainers, etc.}
- **E2E**: {Cypress/Playwright, etc.}
- **Coverage**: {istanbul/c8, etc.}

### Test Coverage Details

| File/Directory  | Line Cov. | Branch Cov. | Func Cov. |
| --------------- | --------- | ----------- | --------- |
| src/auth/       | 85%       | 75%         | 90%       |
| src/users/      | 60%       | 45%         | 70%       |
| src/components/ | 40%       | 30%         | 50%       |
| **Overall**     | **65%**   | **55%**     | **75%**   |

### Status by Category

#### Unit Tests

- [x] **Auth Service**: auth.service.spec.ts
- [x] **User Service**: user.service.spec.ts
- [ ] **Data Transform Utils**: not implemented
- [ ] **Validation Helpers**: not implemented

#### Integration Tests

- [x] **Auth API**: auth.controller.spec.ts
- [ ] **User Management API**: not implemented
- [ ] **Database Operations**: not implemented

#### E2E Tests

- [ ] **User Login Flow**: not implemented
- [ ] **Data Operation Flow**: not implemented
- [ ] **Error Handling**: not implemented

## Generated Test Cases

### API Test Cases

#### POST /auth/login - Authentication

**Normal Cases**

```typescript
describe("POST /auth/login", () => {
  it("success with valid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe("test@example.com");
  });

  it("returns a JWT token in correct format", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send(validCredentials);

    const token = response.body.data.token;
    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });
});
```
````

**Abnormal Cases**

```typescript
describe("POST /auth/login - abnormal", () => {
  it("error for invalid email format", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("error for non-existent user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("error for wrong password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("INVALID_CREDENTIALS");
  });
});
```

**Boundary Cases**

```typescript
describe("POST /auth/login - boundary", () => {
  it("password at minimum length", async () => {
    // 8 characters (minimum)
    const response = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
  });

  it("max-length email", async () => {
    // 255 characters (max)
    const longEmail = "a".repeat(243) + "@example.com";
    const response = await request(app).post("/auth/login").send({
      email: longEmail,
      password: "password123",
    });

    expect(response.status).toBe(400);
  });
});
```

### UI Component Test Cases

#### LoginForm Component

**Rendering**

```typescript
import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("renders required elements", () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("hides error by default", () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
```

**User Interaction**

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("LoginForm - interactions", () => {
  it("calls onSubmit on form submission", async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("does not submit on validation error", async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
```

### Service Layer Test Cases

#### AuthService Unit Tests

```typescript
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";

jest.mock("./user.repository");

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(mockUserRepository);
  });

  describe("login", () => {
    it("returns user and token with valid credentials", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        hashedPassword: "hashed_password",
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(authService, "verifyPassword").mockResolvedValue(true);
      jest.spyOn(authService, "generateToken").mockReturnValue("mock_token");

      const result = await authService.login("test@example.com", "password");

      expect(result).toEqual({
        user: { id: "1", email: "test@example.com" },
        token: "mock_token",
      });
    });

    it("throws error for non-existent user", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login("nonexistent@example.com", "password")
      ).rejects.toThrow("Invalid credentials");
    });
  });
});
```

## Performance Test Cases

### Load Testing

```typescript
describe("Performance", () => {
  it("Login API - 100 concurrent connections", async () => {
    const promises = Array.from({ length: 100 }, () =>
      request(app).post("/auth/login").send(validCredentials)
    );

    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const endTime = Date.now();

    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });

    expect(endTime - startTime).toBeLessThan(5000);
  });

  it("Database - large dataset query performance", async () => {
    await createTestData(1000);

    const startTime = Date.now();
    const response = await request(app)
      .get("/users")
      .query({ limit: 100, offset: 0 });
    const endTime = Date.now();

    expect(response.status).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000);
  });
});
```

### Security Tests

```typescript
describe("Security", () => {
  it("SQL injection", async () => {
    const maliciousInput = "'; DROP TABLE users; --";

    const response = await request(app)
      .post("/auth/login")
      .send({ email: maliciousInput, password: "password" });

    expect(response.status).toBe(400);

    const usersResponse = await request(app)
      .get("/users")
      .set("Authorization", "Bearer " + validToken);
    expect(usersResponse.status).not.toBe(500);
  });

  it("XSS protection", async () => {
    const xssPayload = '<script>alert("XSS")</script>';

    const response = await request(app)
      .post("/users")
      .set("Authorization", "Bearer " + validToken)
      .send({ name: xssPayload, email: "test@example.com" });

    expect(response.body.data.name).not.toContain("<script>");
    expect(response.body.data.name).toContain("&lt;script&gt;");
  });
});
```

## E2E Test Cases

### Playwright/Cypress Scenarios

```typescript
// User login flow E2E test
describe("User Login Flow", () => {
  it("from successful login to dashboard display", async () => {
    await page.goto("/login");

    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.fill('[data-testid="password-input"]', "password123");
    await page.click('[data-testid="login-button"]');

    await page.waitForURL("/dashboard");

    await expect(page.locator('[data-testid="user-name"]')).toContainText(
      "Test User"
    );

    await page.click('[data-testid="logout-button"]');
    await page.waitForURL("/login");
  });

  it("error display on login failure", async () => {
    await page.goto("/login");

    await page.fill('[data-testid="email-input"]', "wrong@example.com");
    await page.fill('[data-testid="password-input"]', "wrongpassword");
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "Invalid credentials"
    );
  });
});
```

## Test Environment Setup

### Database Test Setup

```typescript
beforeAll(async () => {
  await setupTestDatabase();
  await runMigrations();
});

beforeEach(async () => {
  await cleanupDatabase();
  await seedTestData();
});

afterAll(async () => {
  await teardownTestDatabase();
});
```

### Mock Settings

```typescript
jest.mock("./email.service", () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue(true),
  })),
}));

process.env.JWT_SECRET = "test-secret";
process.env.NODE_ENV = "test";
```

## Priority of Missing Tests

### High Priority (implement immediately)

1. **E2E Test Suite** - Ensure end-to-end user flows
2. **API Integration Tests** - Cover backend APIs
3. **Security Tests** - Verify against vulnerabilities

### Medium Priority (next sprint)

1. **Performance Tests** - Load/response time tests
2. **UI Component Tests** - Frontend reliability
3. **Database Tests** - Data consistency tests

### Low Priority (continuous improvement)

1. **Browser Compatibility Tests** - Multiple browsers
2. **Accessibility Tests** - a11y compliance
3. **Internationalization Tests** - i18n support

### test-cases.md

```markdown
# {project-name} Test Case List (Reverse-Generated)

## Test Case Overview

| ID     | Name              | Category | Priority | Status | Est. Effort |
| ------ | ----------------- | -------- | -------- | ------ | ----------- |
| TC-001 | Login Normal Case | API      | High     | ✅     | 2h          |
| TC-002 | Login Abnormal    | API      | High     | ✅     | 3h          |
| TC-003 | E2E Login Flow    | E2E      | High     | ❌     | 4h          |
| TC-004 | Performance Load  | Perf     | Medium   | ❌     | 6h          |

## Detailed Test Cases

### TC-001: Login API - Normal Case

**Purpose**: Verify login with valid credentials

**Preconditions**:

- Test user exists in database
- Password is correctly hashed

**Steps**:

1. Send POST /auth/login request
2. Include JSON with valid email and password
3. Verify response

**Expected**:

- HTTP status: 200
- success: true
- data.token: JWT token format
- data.user: user info

**Implementation File**: `auth.controller.spec.ts`

### TC-002: Login API - Abnormal Case

**Purpose**: Verify error handling with invalid credentials

**Cases**:

1. Non-existent email
2. Wrong password
3. Invalid email format
4. Empty string/null
5. SQL injection attack

**Expected**:

- Appropriate HTTP status code
- Unified error response format
- No security vulnerabilities

**Status**: ✅ Partially implemented
```

## Test Code Generation Algorithm

### 1. Static Analysis Extraction

```
1. Function signature analysis → argument/return test cases
2. Conditional branch analysis → branch coverage test cases
3. Exception handling analysis → abnormal test cases
4. Database access analysis → data test cases
```

### 2. Dynamic Analysis Generation

```
1. API call logs → real usage pattern tests
2. User action logs → E2E scenarios
3. Performance logs → load test scenarios
```

### 3. Test Coverage Gap Analysis

```
1. Measure current coverage
2. Identify untested lines/branches
3. Identify critical paths
4. Risk-based prioritization
```

## Example Commands

```bash
# Full analysis (generate all test cases)
claude code rev-specs

# Generate only specific test categories
claude code rev-specs --type unit
claude code rev-specs --type integration
claude code rev-specs --type e2e

# Target specific files/directories
claude code rev-specs --path ./src/auth

# Actually generate test code output
claude code rev-specs --generate-code

# Analyze with coverage report
claude code rev-specs --with-coverage

# Priority filter
claude code rev-specs --priority high
```

## Post-execution Confirmation

- Display current test coverage and detailed gaps report
- Display number of generated test cases and estimated implementation effort
- Present prioritized recommendation list for implementation
- Propose required test environment settings and recommended tools
- Propose CI/CD pipeline integration plan
