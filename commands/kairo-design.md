# kairo-design

## Purpose

Based on approved requirements definition documents, generate technical design documents. Perform comprehensive design including data flow diagrams, TypeScript interfaces, database schemas, and API endpoints.

## Prerequisites

- Requirements definition documents exist in `docs/spec/`
- Requirements have been approved by user

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status with original materials (including EARS requirements definition and design documents) using the following signals:

- 🟢 **Green Signal**: When referring to EARS requirements definition and design documents with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on EARS requirements definition and design documents
- 🔴 **Red Signal**: When speculation is not based on EARS requirements definition and design documents

1. **Requirements Analysis**

   - Search for requirements definition documents using @agent-symbol-searcher and read found files with Read tool
   - Check related existing design documents using @agent-symbol-searcher and read found files with Read tool
   - Organize functional and non-functional requirements
   - Clarify system boundaries

2. **Architecture Design**

   - Determine overall system architecture
   - Frontend/backend separation
   - Consider necessity of microservices

3. **Data Flow Diagram Creation**

   - Visualize data flow using Mermaid notation
   - User interaction flow
   - Data flow between systems

4. **TypeScript Interface Definition**

   - Entity type definition
   - API request/response type definition
   - Common type definition

5. **Database Schema Design**

   - Table definition
   - Relationships
   - Index strategy
   - Normalization level determination

6. **API Endpoint Design**

   - RESTful API design
   - Endpoint naming conventions
   - HTTP メソッドの適切な使用
   - リクエスト/レスポンスの構造

7. **ファイルの作成**
   - `docs/design/{要件名}/` ディレクトリに以下を作成：
     - `architecture.md` - アーキテクチャ概要
     - `dataflow.md` - データフロー図
     - `interfaces.ts` - TypeScript 型定義
     - `database-schema.sql` - DB スキーマ
     - `api-endpoints.md` - API 仕様

## 出力フォーマット例

### architecture.md

```markdown
# {要件名} アーキテクチャ設計

## システム概要

{システムの概要説明}

## アーキテクチャパターン

- パターン: {選択したパターン}
- 理由: {選択理由}

## コンポーネント構成

### フロントエンド

- フレームワーク: {使用フレームワーク}
- 状態管理: {状態管理方法}

### バックエンド

- フレームワーク: {使用フレームワーク}
- 認証方式: {認証方法}

### データベース

- DBMS: {使用する DBMS}
- キャッシュ: {キャッシュ戦略}
```

### dataflow.md

```markdown
# データフロー図

## ユーザーインタラクションフロー

\`\`\`mermaid
flowchart TD
A[ユーザー] --> B[フロントエンド]
B --> C[API Gateway]
C --> D[バックエンド]
D --> E[データベース]
\`\`\`

## データ処理フロー

\`\`\`mermaid
sequenceDiagram
participant U as ユーザー
participant F as フロントエンド
participant B as バックエンド
participant D as データベース

    U->>F: アクション
    F->>B: APIリクエスト
    B->>D: クエリ実行
    D-->>B: 結果返却
    B-->>F: レスポンス
    F-->>U: 画面更新

\`\`\`
```

### interfaces.ts

```typescript
// エンティティ定義
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// APIリクエスト/レスポンス
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

### database-schema.sql

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_users_email ON users(email);
```

### api-endpoints.md

```markdown
# API エンドポイント仕様

## 認証

### POST /auth/login

リクエスト:
\`\`\`json
{
"email": "user@example.com",
"password": "password"
}
\`\`\`

レスポンス:
\`\`\`json
{
"success": true,
"data": {
"token": "jwt-token",
"user": { ... }
}
}
\`\`\`

## ユーザー管理

### GET /users/:id

### POST /users

### PUT /users/:id

### DELETE /users/:id
```

## Post-execution Verification

- Verify consistency between created design and existing system using @agent-symbol-searcher
- Display list of created files
- Display summary of main design points
- Display message prompting user confirmation
