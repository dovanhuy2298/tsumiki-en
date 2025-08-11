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

# 3.2 TODO 作成と仕様策定

## TODO 作成：開発の出発点

### TODO の重要性

AITDD において、適切な TODO 作成は成功の鍵となります。曖昧な TODO は、その後のすべてのステップに悪影響を与えるため、明確で実行可能な TODO を作成することが重要です。

### 効果的な TODO 作成の原則

#### 1. 具体性の確保

```markdown
❌ 悪い例：「ユーザー管理機能を作る」
✅ 良い例：「ユーザーの新規登録機能を実装する（email/password 認証）」
```

#### 2. 適切な粒度

- **大きすぎる**: 1 つの TODO に複数の機能が含まれる
- **小さすぎる**: 個別のメソッド単位
- **適切**: 1 つの完結した機能単位

#### 3. 完了条件の明確化

```markdown
## TODO: ユーザー登録 API 実装

### 完了条件

- [ ] POST /api/users エンドポイントの実装
- [ ] email/password のバリデーション
- [ ] パスワードハッシュ化
- [ ] データベース保存
- [ ] レスポンス形式の統一
```

### TODO 管理ファイルの構造

#### 基本的なフォーマット

```markdown
# プロジェクト TODO 管理

## 実装予定

### 高優先度

- [ ] **ユーザー認証機能**
  - 説明: JWT 認証による認証機能
  - 完了条件: ログイン/ログアウト/トークン検証
  - 依存: データベース設計完了

### 中優先度

- [ ] **商品検索機能**
  - 説明: キーワードとカテゴリによる商品検索
  - 完了条件: 検索 API + フィルタリング機能

## 進行中

- [x] データベース設計（2024-06-21 完了）

## 完了

- [x] プロジェクト初期セットアップ（2024-06-20 完了）
```

#### ファイル構成の推奨事項

```
doc/
├── todo.md                    # メインTODO管理
├── implementation/
│   ├── user-auth-requirements.md      # 個別機能の詳細仕様
│   ├── user-auth-testcases.md         # テストケース
│   └── search-requirements.md
└── archive/
    └── completed-todos.md              # 完了したTODOのアーカイブ
```

## 仕様策定：設計の基盤

### 仕様策定の目的

TODO から具体的な技術仕様を策定し、実装の方向性を明確にします。この段階での曖昧さは、後のステップで大きな問題となるため、詳細まで検討することが重要です。

### 仕様書のテンプレート

```markdown
# [機能名] 要件定義書

## 概要

機能の目的と概要を簡潔に記述

## 機能要件

### 基本機能

- 必須となる基本的な機能

### 詳細仕様

- 入力項目とバリデーション
- 処理の流れ
- 出力形式

### 非機能要件

- パフォーマンス要件
- セキュリティ要件
- 可用性要件

## 技術仕様

### API 仕様

- エンドポイント
- リクエスト/レスポンス形式
- ステータスコード

### データベース設計

- テーブル設計
- インデックス
- 制約

### エラーハンドリング

- エラーケースの定義
- エラーメッセージ
- ログ出力方針

## 制約事項

- 技術的制約
- ビジネス制約
- 外部依存

## 参考資料

- 関連ドキュメント
- 外部 API 仕様書
```

### 具体的な仕様策定例

#### 例：ユーザー登録機能の仕様

```markdown
# ユーザー登録機能 要件定義書

## 概要

新規ユーザーが email と password で登録できる機能

## 機能要件

### 基本機能

- email/password による新規ユーザー登録
- 重複 email の検証
- パスワード強度チェック

### 詳細仕様

#### 入力項目

- **email**: 必須、email 形式、最大 254 文字
- **password**: 必須、8 文字以上、英数字記号を含む
- **password_confirmation**: 必須、password と一致

#### バリデーション

- email 重複チェック（データベース確認）
- password 強度（大文字/小文字/数字/記号を含む）
- CSRF トークン検証

#### 処理フロー

1. 入力値バリデーション
2. email 重複チェック
3. password ハッシュ化（bcrypt）
4. データベース保存
5. 成功レスポンス返却

### 非機能要件

- レスポンス時間: 2 秒以内
- 同時登録: 100 件/秒まで対応
- パスワードハッシュ化必須

## 技術仕様

### API 仕様
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

### データベース設計
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

### エラーハンドリング

- **400**: バリデーションエラー、重複 email
- **429**: レート制限
- **500**: サーバーエラー

## 制約事項

- パスワードは平文保存禁止
- email 確認機能は今回は含まない
- ソーシャルログインは今回は含まない

```

## 人間レビューのポイント

### チェック項目

#### 1. 完全性の確認
- [ ] 必要な機能がすべて含まれているか
- [ ] エッジケースが考慮されているか
- [ ] エラーハンドリングが十分か

#### 2. 実現可能性の検証
- [ ] 技術的に実装可能か
- [ ] パフォーマンス要件が現実的か
- [ ] セキュリティ要件が適切か

#### 3. 一貫性の確認
- [ ] 他の機能との整合性
- [ ] データ設計の一貫性
- [ ] APIインターフェースの統一性

#### 4. 保守性の考慮
- [ ] 将来の拡張性
- [ ] テストの容易さ
- [ ] ドキュメント化のしやすさ

### レビュー時の注意点

#### AIの提案を活用する際の注意
- AIの提案は参考として活用
- 最終判断は必ず人間が行う
- プロジェクト固有の要件は人間が追加

#### 段階的な詳細化
```

1. 概要レベルの仕様 → レビュー
2. 詳細仕様の追加 → レビュー
3. 技術仕様の策定 → レビュー
4. 最終確認 → 承認

````

## 仕様策定のベストプラクティス

### 1. 明確で曖昧さのない表現
```markdown
❌ 「適切に処理する」
✅ 「エラー時は400ステータスコードとエラーメッセージを返却する」
````

### 2. 具体的な数値の明記

```markdown
❌ 「高速に処理する」
✅ 「2 秒以内にレスポンスを返却する」
```

### 3. 制約事項の明確化

```markdown
❌ 「セキュリティに配慮する」
✅ 「パスワードは bcrypt でハッシュ化し、平文保存は禁止」
```

### 4. テスタビリティの考慮

- 各仕様項目がテスト可能か確認
- テストデータの準備方法を考慮
- モックやスタブの必要性を検討

## 次のステップへの準備

仕様策定が完了したら、次は[テストケース作成](./03-test-case-creation.md)に進みます。

### 成果物の確認

- [ ] TODO.md が適切に更新されている
- [ ] requirements.md が詳細に作成されている
- [ ] 仕様に曖昧な部分が残っていない
- [ ] 人間によるレビューが完了している

### よくある問題と対策

#### 仕様が曖昧なまま進んでしまう

**対策**: 必ず人間レビューを実施し、疑問点はその場で解決

#### AI の提案に過度に依存する

**対策**: AI の提案は参考程度に留め、最終判断は人間が行う

#### 非機能要件が漏れる

**対策**: チェックリストを用いて体系的にレビュー

適切な仕様策定により、その後のテストケース作成と実装がスムーズに進行します。
