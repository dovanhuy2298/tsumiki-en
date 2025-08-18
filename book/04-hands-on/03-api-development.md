# 4.3 Practical API Development

## Learning Objectives

In this chapter, you will learn how to apply AITDD to real web application development through building a RESTful API:

- Use AITDD with external dependencies
- Implement asynchronous processing and error handling
- Design HTTP status codes and responses
- Auto-generate API documentation
- Experience development close to production

## Project Overview: Task Management API

Based on the task management system developed in the previous chapter, we will build a RESTful API using Express.js.

### API Specification Overview

```http
GET    /api/tasks       # Get all tasks
GET    /api/tasks/:id   # Get task by ID
POST   /api/tasks       # Create task
PUT    /api/tasks/:id   # Update task
DELETE /api/tasks/:id   # Delete task
```

### Tech Stack

- Web framework: Express.js
- Language: TypeScript
- Test: Jest + Supertest
- Validation: express-validator
- Documentation: OpenAPI (Swagger)

## New Technical Complexities

Compared to CRUD only, API development adds:

**HTTP:**

- Request/response handling
- Status code management
- Header handling
- Routing design

**Asynchronous processing:**

- Promise/async-await
- Error handling
- Timeout handling

**Validation:**

- Request data validation
- Unified response format
- Standardized error responses

## Hands-on

### Step 1: TODO Creation and API Design

The “3-feature integration limit” also applies here, so split endpoints appropriately.

```markdown
# TODO: Implement Task Management API

## Phase 1: Foundation

- [ ] Set up Express.js project
- [ ] Configure TypeScript
- [ ] Basic middleware setup
- [ ] Error-handling middleware

## Phase 2: Basic API (3 endpoints)

- [ ] GET /api/tasks - Get all tasks
- [ ] GET /api/tasks/:id - Get single task
- [ ] POST /api/tasks - Create task

## Phase 3: Extended API (remaining endpoints)

- [ ] PUT /api/tasks/:id - Update task
- [ ] DELETE /api/tasks/:id - Delete task
- [ ] GET /api/tasks?search=xxx - Filtered search

## Phase 4: Quality improvement

- [ ] Generate OpenAPI spec
- [ ] Strengthen input validation
- [ ] Add security headers
- [ ] Performance optimizations
```

### Step 2: Phase 1 – Foundation

#### Create the spec

**Prompt to AI:**

```text
Please create a foundation spec for an API project using Express.js and TypeScript.

Requirements:
- Express.js settings for a TypeScript environment
- Basic middleware (CORS, JSON parse, etc.)
- Structured error handling
- Separate development and production configs
- Test environment setup

Use the following TODO as reference:
[Paste Phase 1 TODO]
```

**Example generated spec:**

````markdown
# Task Management API – Foundation Spec

## Project structure

```
src/
├── app.ts              # Express application setup
├── server.ts           # Server bootstrap
├── routes/             # Route definitions
├── controllers/        # Business logic
├── middleware/         # Custom middleware
├── types/              # TypeScript type definitions
└── tests/              # Test files
```

## Express settings

- CORS
- JSON/URL-encoded parsing
- Request logging
- Security headers
- Error-handling middleware

## Error model

```typescript
interface APIError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}
```

## Unified response

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```
````

#### Test cases and Red-Green-Refactor-Validation

**API foundation tests:**

```typescript
describe("API foundation tests", () => {
  test("Server health", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("CORS settings", async () => {
    const response = await request(app)
      .options("/api/tasks")
      .set("Origin", "http://localhost:3000")
      .set("Access-Control-Request-Method", "GET");
    expect(response.headers["access-control-allow-origin"]).toBeDefined();
  });

  test("JSON parsing", async () => {
    const response = await request(app)
      .post("/api/test")
      .send({ test: "data" })
      .set("Content-Type", "application/json");
    expect(response.status).not.toBe(400); // not a JSON parse error
  });

  test("Error handling", async () => {
    const response = await request(app).get("/api/nonexistent");
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
  });
});
```

### Step 3: Phase 2 – Basic API

#### Implement GET /api/tasks

**Spec:**

````markdown
## Get all tasks API

### Endpoint

GET /api/tasks

### Success response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
      "createdAt": "2025-06-21T10:00:00Z",
      "updatedAt": "2025-06-21T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2025-06-21T10:00:00Z",
    "requestId": "req-123"
  }
}
```
````

### Status codes

- 200: Success (including empty array)
- 500: Server error

````

**Prompt example to AI:**

```text
Implement GET /api/tasks according to the spec:

[Paste spec]

Requirements:
1. Use Express.js Router
2. Use the TaskManager class from the previous chapter
3. Implement proper error handling
4. Ensure TypeScript type-safety
5. Create integration tests with Supertest

Existing code:
[TaskManager code]
[API foundation code]
````

**Expected implementation:**

```typescript
// routes/tasks.ts
import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.get("/", taskController.getAllTasks);

export default router;

// controllers/TaskController.ts
import { Request, Response, NextFunction } from "express";
import { TaskManager } from "../services/TaskManager";
import { APIResponse } from "../types/api";

export class TaskController {
  private taskManager = new TaskManager();

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = this.taskManager.getAllTasks();
      const response: APIResponse<typeof tasks> = {
        success: true,
        data: tasks,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: (req.headers["x-request-id"] as string) || "unknown",
        },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
```

#### Implement GET /api/tasks/:id

**Additional spec:**

```markdown
## Get single task API

### Endpoint

GET /api/tasks/:id

### Params

- id: Task ID (UUID)

### Status codes

- 200: Success
- 400: Invalid ID format
- 404: Task not found
- 500: Server error
```

#### Implement POST /api/tasks

**Additional spec:**

````markdown
## Create task API

### Endpoint

POST /api/tasks

### Request body

```json
{
  "title": "Task title",
  "description": "Task description"
}
```

### Validation

- title: required, 1–100 chars
- description: optional, 0–500 chars

### Status codes

- 201: Created
- 400: Validation error
- 500: Server error
````

### Step 4: Phase 3 – Extended API

#### Strengthen input validation

Using express-validator:

```typescript
// middleware/validation.ts
import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("title must be 1-100 chars"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("description must be <= 500 chars"),
];

export const taskIdValidation = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        statusCode: 400,
        details: errors.array(),
      },
    });
  }
  next();
};
```

#### PUT /api/tasks/:id

Support partial updates:

```typescript
export const updateTaskValidation = [
  ...taskIdValidation,
  body("title")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("title must be 1-100 chars"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("description must be <= 500 chars"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be a boolean"),
];
```

#### DELETE /api/tasks/:id

Consider soft delete as needed:

```typescript
deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = this.taskManager.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Task not found",
          code: "TASK_NOT_FOUND",
          statusCode: 404,
        },
      });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
```

### Step 5: Phase 4 – Quality Improvements

#### Generate OpenAPI spec

**Prompt example:**

```text
Generate an OpenAPI 3.0 spec from the following endpoints:

[List implemented endpoints]
[Define response formats]
[Define error responses]

Requirements:
1. Viewable in Swagger UI
2. Detailed docs for all endpoints
3. Include request/response examples
4. Include error code descriptions
```

**Example generated OpenAPI:**

```yaml
openapi: 3.0.0
info:
  title: Task Management API
  version: 1.0.0
  description: RESTful API for a simple task management system

paths:
  /api/tasks:
    get:
      summary: Get all tasks
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TaskListResponse"

    post:
      summary: Create task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateTaskRequest"
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TaskResponse"
        "400":
          description: Validation error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
          minLength: 1
          maxLength: 100
        description:
          type: string
          maxLength: 500
        completed:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
```

## Handling Complex Problems

### When to switch to manual implementation

Consider manual implementation in API development when:

**You cannot picture the implementation approach:**

- Complex custom auth middleware
- WebSocket integration
- Advanced database optimization

**Performance work is required:**

- High-throughput optimization
- Memory optimization
- Response latency reduction

### Using AI during manual implementation

Not fully manual—use AI for parts:

```typescript
// Let AI generate helper-like code
const generateResponseHelper = (data: any, meta: any) => ({
  success: true,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    ...meta,
  },
});

// Keep complex logic manual
const complexAuthMiddleware = (req, res, next) => {
  // Implement complex logic manually
};
```

## API-specific Test Strategy

### Integration test pattern

End-to-end test:

```typescript
describe("API integration tests", () => {
  test("Task management flow", async () => {
    // 1. Create
    const createResponse = await request(app)
      .post("/api/tasks")
      .send({ title: "Test task", description: "For test" });
    expect(createResponse.status).toBe(201);
    const taskId = createResponse.body.data.id;

    // 2. Read
    const getResponse = await request(app).get(`/api/tasks/${taskId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.title).toBe("Test task");

    // 3. Update
    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.completed).toBe(true);

    // 4. Delete
    const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);
    expect(deleteResponse.status).toBe(204);

    // 5. Verify deletion
    const getAfterDeleteResponse = await request(app).get(
      `/api/tasks/${taskId}`
    );
    expect(getAfterDeleteResponse.status).toBe(404);
  });
});
```

### Performance tests

Load testing idea:

```typescript
describe("Performance tests", () => {
  test("Concurrent requests", async () => {
    const requests = Array.from({ length: 100 }, (_, i) =>
      request(app)
        .post("/api/tasks")
        .send({
          title: `Concurrent ${i}`,
          description: "Concurrency test",
        })
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();

    responses.forEach((res) => expect(res.status).toBe(201));
    expect(endTime - startTime).toBeLessThan(5000); // within 5s
  });
});
```

## Error-handling Best Practices

### Comprehensive error handling

```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logging
  console.error("API Error:", {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  if (error.name === "TaskNotFoundError") {
    return res.status(404).json({
      success: false,
      error: {
        message: "Task not found",
        code: "TASK_NOT_FOUND",
        statusCode: 404,
      },
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        statusCode: 400,
        details: error.details,
      },
    });
  }

  // Unknown error
  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
    },
  });
};
```

## Learning Effects

### AITDD benefits in API development

**Development speed:**

- Traditional API development: days to a week
- With AITDD: hours
- Achieve significant efficiency gains

**Quality stability:**

- Comprehensive tests ensure quality
- Standardized error handling
- Automatic API docs generation

**Practical skills:**

- Effective AI usage in web development
- Handling complex integrations
- Production-grade implementation

### Differences from traditional development

**Design phase:**

- Traditional: Heavy upfront detailed design
- AITDD: Iteratively designed with AI

**Implementation phase:**

- Traditional: Manual detailed implementation
- AITDD: Quality-managing AI-generated code

**Test phase:**

- Traditional: Tests after implementation
- AITDD: Test-first approach

## Preparation for the Next Chapter

From this API development experience, you will gain:

1. AI utilization techniques in web development
2. Managing complex integrations
3. Production-grade implementation techniques
4. Error handling and debugging skills

Next, you will learn concrete techniques for handling errors and troubleshooting issues during implementation.

## Summary

Through API development, you learned:

**Technical growth:**

- Practical RESTful API design
- Asynchronous programming and error handling
- Type-safe implementation with TypeScript
- Comprehensive testing strategy

**AITDD techniques:**

- AI collaboration in complex implementations
- Managing incremental feature additions
- Automating quality management
- Leveraging documentation generation

**Practical development skills:**

- Production-quality implementation
- Performance-aware design
- Security-conscious implementation
- Operability-oriented design

These experiences provide a solid foundation to leverage AITDD effectively in real products.

# 4.3 API Development Practice

## Learning Objectives

In this chapter, through RESTful API development, you will learn how to apply AITDD to actual web application development:

- AITDD utilization in implementations with external dependencies
- Implementation of asynchronous processing and error handling
- HTTP status codes and response design
- Automatic API documentation generation
- Development experience close to actual production environment

## Project Overview: Task Management API

Based on the task management system developed in the previous chapter, we will build a RESTful API using Express.js.

### API Specification Overview

```http
GET    /api/tasks       # Get all tasks
GET    /api/tasks/:id   # Get specific task
POST   /api/tasks       # Create new task
PUT    /api/tasks/:id   # Update task
DELETE /api/tasks/:id   # Delete task
```

### Technology Stack

- **Web Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest + Supertest
- **Validation**: express-validator
- **Documentation**: OpenAPI (Swagger)

## New Technical Complexity

In API development, in addition to CRUD from the previous chapter, the following elements increase:

**HTTP Related**:

- Request/response processing
- Status code management
- Header processing
- Routing design

**Asynchronous Processing**:

- Promise/async-await
- Error handling
- Timeout processing

**Validation**:

- Request data validation
- Response format unification
- Error response standardization

## Practical Hands-on

### Step 1: TODO Creation and API Design

In AITDD API development, the **3-function integration limit** also applies. Therefore, we appropriately divide endpoints.

```markdown
# TODO: Task Management API Implementation

## Phase 1: Foundation Building

- [ ] Express.js project setup
- [ ] TypeScript configuration
- [ ] Basic middleware configuration
- [ ] Error handling middleware

## Phase 2: Basic API (3 endpoints)

- [ ] GET /api/tasks - Get all tasks
- [ ] GET /api/tasks/:id - Get single task
- [ ] POST /api/tasks - Create task

## Phase 3: Extended API (remaining endpoints)

- [ ] PUT /api/tasks/:id - Update task
- [ ] DELETE /api/tasks/:id - Delete task
- [ ] GET /api/tasks?search=xxx - Conditional search

## Phase 4: Quality Improvement

- [ ] OpenAPI specification generation
- [ ] Input validation enhancement
- [ ] Security header addition
- [ ] Performance optimization
```

### Step 2: Phase 1 - Foundation Building

#### Create the spec

**AI Prompt:**

```
Express.jsとTypeScriptを使用したAPIプロジェクトの基盤設定の仕様を作成してください。

要件：
- TypeScript環境でのExpress.js設定
- 基本的なミドルウェア（CORS、JSON パース等）
- 構造化されたエラーハンドリング
- 開発・本番環境の設定分離
- テスト環境のセットアップ

以下のTODOを参考にしてください：
[フェーズ1のTODOを貼り付け]
```

**Generated spec example:**

````markdown
# タスク管理 API 基盤仕様

## プロジェクト構造

```
src/
├── app.ts              # Express アプリケーション設定
├── server.ts           # サーバー起動エントリーポイント
├── routes/             # ルート定義
├── controllers/        # ビジネスロジック
├── middleware/         # カスタムミドルウェア
├── types/              # TypeScript型定義
└── tests/              # テストファイル
```

## Express 設定

- CORS 対応
- JSON/URL エンコードパース
- リクエストログ
- セキュリティヘッダー
- エラーハンドリングミドルウェア

## エラー処理標準化

```typescript
interface APIError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}
```

## レスポンス形式統一

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```
````

#### Test cases and Red-Green-Refactor-Validation

**API 基盤のテスト**：

```typescript
describe("API基盤テスト", () => {
  test("サーバー起動確認", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("CORS設定確認", async () => {
    const response = await request(app)
      .options("/api/tasks")
      .set("Origin", "http://localhost:3000")
      .set("Access-Control-Request-Method", "GET");

    expect(response.headers["access-control-allow-origin"]).toBeDefined();
  });

  test("JSON解析確認", async () => {
    const response = await request(app)
      .post("/api/test")
      .send({ test: "data" })
      .set("Content-Type", "application/json");

    expect(response.status).not.toBe(400); // JSON解析エラーではない
  });

  test("エラーハンドリング確認", async () => {
    const response = await request(app).get("/api/nonexistent");
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
  });
});
```

### Step 3: Phase 2 - Basic API Implementation

#### Implement GET /api/tasks

**Spec:**

````markdown
## 全タスク取得 API

### エンドポイント

GET /api/tasks

### レスポンス（成功時）

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "タスクタイトル",
      "description": "タスク説明",
      "completed": false,
      "createdAt": "2025-06-21T10:00:00Z",
      "updatedAt": "2025-06-21T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2025-06-21T10:00:00Z",
    "requestId": "req-123"
  }
}
```
````

### Status codes

- 200: 正常取得（空配列含む）
- 500: サーバーエラー

**AI プロンプト例**：

```
以下の仕様に基づいて GET /api/tasks エンドポイントの実装を行ってください：

[仕様を貼り付け]

要求：
1. Express.jsルーターを使用
2. 前章で作成したTaskManagerクラスを活用
3. エラーハンドリングを適切に実装
4. TypeScriptの型安全性を確保
5. Supertestを使用した統合テスト作成

既存のコード：
[TaskManagerクラスのコードを貼り付け]
[API基盤のコードを貼り付け]
```

**期待される実装**：

```typescript
// routes/tasks.ts
import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.get("/", taskController.getAllTasks);

export default router;

// controllers/TaskController.ts
import { Request, Response, NextFunction } from "express";
import { TaskManager } from "../services/TaskManager";
import { APIResponse } from "../types/api";

export class TaskController {
  private taskManager = new TaskManager();

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = this.taskManager.getAllTasks();

      const response: APIResponse<typeof tasks> = {
        success: true,
        data: tasks,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: (req.headers["x-request-id"] as string) || "unknown",
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
```

#### Implement GET /api/tasks/:id

**仕様追加**：

```markdown
## 単一タスク取得 API

### エンドポイント

GET /api/tasks/:id

### パラメータ

- id: タスク ID（UUID 形式）

### ステータスコード

- 200: 正常取得
- 400: 不正な ID 形式
- 404: タスクが見つからない
- 500: サーバーエラー
```

#### POST /api/tasks の実装

**仕様追加**：

````markdown
## タスク作成 API

### エンドポイント

POST /api/tasks

### リクエストボディ

```json
{
  "title": "タスクタイトル",
  "description": "タスク説明"
}
```

### バリデーション

- title: 必須、1-100 文字
- description: 任意、0-500 文字

### ステータスコード

- 201: 作成成功
- 400: バリデーションエラー
- 500: サーバーエラー
````

### Step 4: Phase 3 - Extended API Implementation

#### Strengthen input validation

**express-validator の活用**：

```typescript
// middleware/validation.ts
import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("タイトルは必須です")
    .isLength({ min: 1, max: 100 })
    .withMessage("タイトルは1-100文字である必要があります"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("説明は500文字以下である必要があります"),
];

export const taskIdValidation = [
  param("id").isUUID().withMessage("有効なUUID形式のIDを指定してください"),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "バリデーションエラー",
        code: "VALIDATION_ERROR",
        statusCode: 400,
        details: errors.array(),
      },
    });
  }
  next();
};
```

#### PUT /api/tasks/:id 実装

**部分更新対応**：

```typescript
export const updateTaskValidation = [
  ...taskIdValidation,
  body("title")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("タイトルは1-100文字である必要があります"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("説明は500文字以下である必要があります"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completedはboolean値である必要があります"),
];
```

#### DELETE /api/tasks/:id 実装

**ソフトデリートの考慮**：

```typescript
deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = this.taskManager.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: {
          message: "タスクが見つかりません",
          code: "TASK_NOT_FOUND",
          statusCode: 404,
        },
      });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
```

### Step 5: Phase 4 - Quality Improvement

#### OpenAPI specification generation

**AI Prompt example:**

```
以下のAPIエンドポイントからOpenAPI 3.0仕様書を生成してください：

[実装したエンドポイントの一覧]
[レスポンス形式の定義]
[エラーレスポンスの定義]

要求：
1. Swagger UIで表示可能な形式
2. 全エンドポイントの詳細ドキュメント
3. リクエスト/レスポンスの例を含める
4. エラーコードの説明を含める
```

**Generated OpenAPI specification example:**

```yaml
openapi: 3.0.0
info:
  title: タスク管理API
  version: 1.0.0
  description: シンプルなタスク管理システムのRESTful API

paths:
  /api/tasks:
    get:
      summary: 全タスク取得
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TaskListResponse"

    post:
      summary: タスク作成
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateTaskRequest"
      responses:
        "201":
          description: 作成成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TaskResponse"
        "400":
          description: バリデーションエラー
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
          minLength: 1
          maxLength: 100
        description:
          type: string
          maxLength: 500
        completed:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
```

## Handling Complex Problems

### When to switch to manual implementation

Consider manual implementation in API development when:

**You cannot picture the implementation approach:**

- Complex custom auth middleware
- WebSocket integration
- Advanced database optimization

**Performance work is required:**

- High-throughput optimization
- Memory optimization
- Response latency reduction

### Using AI during manual implementation

Not fully manual—use AI for parts:

```typescript
// Let AI generate helper-like code
const generateResponseHelper = (data: any, meta: any) => {
  // This part can be generated by AI
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
};

// Keep complex logic manual
const complexAuthMiddleware = (req, res, next) => {
  // Implement complex logic manually
  // However, use AI for partial completion
};
```

## API Development Specific Test Strategy

### Integration test pattern

End-to-end test:

```typescript
describe("API integration tests", () => {
  test("Task management flow", async () => {
    // 1. Create
    const createResponse = await request(app).post("/api/tasks").send({
      title: "テストタスク",
      description: "テスト用のタスクです",
    });

    expect(createResponse.status).toBe(201);
    const taskId = createResponse.body.data.id;

    // 2. Read
    const getResponse = await request(app).get(`/api/tasks/${taskId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.title).toBe("テストタスク");

    // 3. Update
    const updateResponse = await request(app).put(`/api/tasks/${taskId}`).send({
      completed: true,
    });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.completed).toBe(true);

    // 4. Delete
    const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(204);

    // 5. Verify deletion
    const getAfterDeleteResponse = await request(app).get(
      `/api/tasks/${taskId}`
    );

    expect(getAfterDeleteResponse.status).toBe(404);
  });
});
```

### Performance tests

**Load testing**：

```typescript
describe("Performance tests", () => {
  test("Concurrent requests processing", async () => {
    const requests = Array.from({ length: 100 }, (_, i) =>
      request(app)
        .post("/api/tasks")
        .send({
          title: `並行タスク${i}`,
          description: "並行処理テスト",
        })
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();

    responses.forEach((response) => {
      expect(response.status).toBe(201);
    });

    expect(endTime - startTime).toBeLessThan(5000); // within 5s
  });
});
```

## Error-handling Best Practices

### Comprehensive error handling

```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logging
  console.error("API Error:", {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Error type handling
  if (error.name === "TaskNotFoundError") {
    return res.status(404).json({
      success: false,
      error: {
        message: "タスクが見つかりません",
        code: "TASK_NOT_FOUND",
        statusCode: 404,
      },
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: {
        message: "バリデーションエラー",
        code: "VALIDATION_ERROR",
        statusCode: 400,
        details: error.details,
      },
    });
  }

  // Unknown error
  res.status(500).json({
    success: false,
    error: {
      message: "サーバー内部エラーが発生しました",
      code: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
    },
  });
};
```

## Learning Effects

### AITDD benefits in API development

**Development speed:**

- Traditional API development: days to a week
- With AITDD: hours
- **Achieve significant efficiency gains**

**Quality stability:**

- Comprehensive tests ensure quality
- Standardized error handling
- Automatic API docs generation

**Practical skills:**

- Effective AI usage in web development
- Handling complex integrations
- Production-grade implementation

### Differences from traditional development

**Design phase:**

- Traditional: Heavy upfront detailed design
- AITDD: Iteratively designed with AI

**Implementation phase:**

- Traditional: Manual detailed implementation
- AITDD: Quality-managing AI-generated code

**Test phase:**

- Traditional: Tests after implementation
- AITDD: Test-first approach

## Preparation for the Next Chapter

From this API development experience, you will gain:

1. **AI utilization techniques in web development**
2. **Managing complex integrations**
3. **Production-grade implementation techniques**
4. **Error handling and debugging skills**

Next, you will learn concrete techniques for handling errors and troubleshooting issues during implementation.

## Summary

Through API development, you learned:

**Technical growth:**

- Practical RESTful API design
- Asynchronous programming and error handling
- Type-safe implementation with TypeScript
- Comprehensive testing strategy

**AITDD techniques:**

- AI collaboration in complex implementations
- Managing incremental feature additions
- Automating quality management
- Leveraging documentation generation

**Practical development skills:**

- Production-quality implementation
- Performance-aware design
- Security-conscious implementation
- Operability-oriented design

These experiences provide a solid foundation to leverage AITDD effectively in real products.
