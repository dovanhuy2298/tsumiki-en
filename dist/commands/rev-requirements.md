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
# {プロジェクト名} 要件定義書（逆生成）

## 分析概要

**分析日時**: {実行日時}
**対象コードベース**: {パス}
**抽出要件数**: {機能要件数}個の機能要件、{非機能要件数}個の非機能要件
**信頼度**: {分析の信頼度} % （実装カバレッジに基づく）

## システム概要

### 推定されたシステム目的

{実装された機能から推測されるシステムの目的}

### 対象ユーザー

{UI コンポーネントや機能から推定されるユーザー種別}

## ユーザーストーリー

### ストーリー 1: ユーザー認証

- **である** 未登録・既存ユーザー **として**
- **私は** システムに安全にログイン **をしたい**
- **そうすることで** 個人的な情報やサービスにアクセスできる

**実装根拠**:

- `LoginForm.tsx` - ログインフォーム実装
- `POST /auth/login` - 認証 API 実装
- `useAuth` フック - 認証状態管理

### ストーリー 2: {その他のストーリー}

{実装された機能から推定される追加のユーザーストーリー}

## 機能要件（EARS 記法）

### 通常要件

#### REQ-001: ユーザー認証

システムは有効なメールアドレスとパスワードでのユーザーログインを提供しなければならない。

**実装根拠**:

- `auth.service.ts:login()` メソッド
- `POST /auth/login` エンドポイント
- JWT トークン発行実装

#### REQ-002: セッション管理

システムはログイン後のユーザーセッションを管理しなければならない。

**実装根拠**:

- JWT トークンによるセッション管理
- `useAuth` フックでの状態管理
- ローカルストレージでのトークン永続化

### 条件付き要件

#### REQ-101: 認証失敗時の処理

無効な認証情報が提供された場合、システムは適切なエラーメッセージを表示しなければならない。

**実装根拠**:

- `auth.controller.ts` のエラーハンドリング
- `LoginForm.tsx` のエラー表示実装

#### REQ-102: トークン期限切れ時の処理

JWT トークンが期限切れの場合、システムはユーザーを再ログインページにリダイレクトしなければならない。

**実装根拠**:

- `axios.interceptors` での 401 エラーハンドリング
- 自動ログアウト機能の実装

### 状態要件

#### REQ-201: ログイン状態での表示

ユーザーがログイン状態にある場合、システムは認証済みユーザー向けの UI を表示しなければならない。

**実装根拠**:

- `useAuth` フックでの認証状態確認
- 認証状態による条件分岐レンダリング

### オプション要件

#### REQ-301: ログイン状態の記憶

システムはユーザーのログイン状態を記憶してもよい。

**実装根拠**:

- ローカルストレージでのトークン保存
- 自動ログイン機能の実装

### 制約要件

#### REQ-401: パスワード要件

システムはパスワードに最小 8 文字の制約を設けなければならない。

**実装根拠**:

- フロントエンドバリデーション実装
- `yup` スキーマでの制約定義

#### REQ-402: レート制限

システムはログイン試行に対してレート制限を設けなければならない。

**実装根拠**:

- `express-rate-limit` ミドルウェアの実装

## 非機能要件

### パフォーマンス

#### NFR-001: ログイン応答時間

システムは通常のログイン処理を 2 秒以内に完了しなければならない。

**実装根拠**:

- データベースインデックス設定
- 効率的なクエリ実装

#### NFR-002: 同時ユーザー数

システムは同時に 100 ユーザーのアクセスを処理できなければならない。

**推定根拠**:

- 接続プール設定
- サーバー構成

### セキュリティ

#### NFR-101: 認証トークン暗号化

システムは JWT トークンを適切に暗号化しなければならない。

**実装根拠**:

- `jsonwebtoken` ライブラリの使用
- 秘密鍵による署名実装

#### NFR-102: HTTPS 通信

システムは本番環境で HTTPS 通信を強制しなければならない。

**実装根拠**:

- SSL 設定ファイル
- HTTPS リダイレクト実装

### ユーザビリティ

#### NFR-201: レスポンシブデザイン

システムはモバイルデバイスでも利用可能でなければならない。

**実装根拠**:

- CSS メディアクエリの実装
- レスポンシブ UI コンポーネント

#### NFR-202: アクセシビリティ

システムは基本的なアクセシビリティ要件を満たさなければならない。

**実装根拠**:

- ARIA 属性の使用
- セマンティック HTML 構造

### 運用性

#### NFR-301: ログ出力

システムは重要な操作をログに記録しなければならない。

**実装根拠**:

- `winston` ログライブラリの使用
- 構造化ログの実装

#### NFR-302: エラー追跡

システムは発生したエラーを追跡可能でなければならない。

**実装根拠**:

- エラーハンドリング実装
- ログ出力による追跡機能

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
