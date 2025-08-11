# 3.3 Creating Test Cases

## Importance of Creating Test Cases

In AITDD, test cases are a critical factor that determine implementation quality. The quality of AI-generated code greatly depends on the coverage and precision of test cases, so it is important to design comprehensive test cases at this stage.

## Principles of Test Case Design

### 1. Ensure coverage

#### Functional coverage

- **Normal cases**: All expected behaviors
- **Error cases**: Error handling and validation
- **Boundary values**: Boundary conditions for input values
- **Edge cases**: Special conditions and exceptional situations

#### Coverage of test levels

- **Unit tests**: Tests for individual functions/methods
- **Integration tests**: Tests for interactions between components
- **End-to-end tests**: Full execution of user scenarios

### 2. Clear and specific expectations

```markdown
❌ Bad: "An error occurs"
✅ Good: "Return status 400 and error message \"Email already exists\""
```

### 3. Independence and reproducibility

- Each test case can be executed independently
- Does not depend on test execution order
- Does not depend on the external environment

## Standard Format of Test Case Documents

### Basic template

```markdown
# [Feature] Test Case Specification

## Test overview

- **Target feature**: Feature under test
- **Test objective**: What to verify
- **Prerequisites**: Preconditions for test execution

## List of test cases

### TC001: [Name of test case]

- **Category**: Normal/Error/Boundary
- **Objective**: What this test verifies
- **Prerequisites**: State before test execution
- **Test data**: Details of input data
- **Execution steps**:
  1. Concrete step 1
  2. Concrete step 2
- **Expected results**:
  - Details of expected behavior
  - Expected output values
- **Postconditions**: Expected state after execution
```

### Concrete Example: User Registration Test Cases

````markdown
# User Registration Test Case Specification

## Test overview

- **Target feature**: User registration API (POST /api/users)
- **Test objective**: Verify all patterns of new user registration
- **Prerequisites**: Database in initial state, API server running

## List of test cases

### TC001: Successful user registration

- **Category**: Normal
- **Objective**: Verify new user registration with valid data
- **Prerequisites**: test@example.com is not registered
- **Test data**:
  ```json
  {
    "email": "test@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "SecurePass123!"
  }
  ```
````

- **Execution steps**:
  1. POST test data to /api/users
  2. Confirm the response
  3. Confirm database state
- **Expected results**:
  - Status code: 201
  - Response:
    ```json
    {
      "id": <positive integer>,
      "email": "test@example.com",
      "created_at": "ISO8601 timestamp"
    }
    ```
  - Database: A new record is created in the users table
  - Password is stored hashed
- **Postconditions**: User is registered and can log in

### TC002: Duplicate email error

- **Category**: Error
- **Objective**: Verify error handling when registering with an existing email
- **Prerequisites**: test@example.com is already registered
- **Test data**:
  ```json
  {
    "email": "test@example.com",
    "password": "AnotherPass456!",
    "password_confirmation": "AnotherPass456!"
  }
  ```
- **Execution steps**:
  1. POST test data to /api/users
  2. Confirm the response
  3. Confirm database state
- **Expected results**:
  - Status code: 400
  - Response:
    ```json
    {
      "error": "validation_failed",
      "details": [
        {
          "field": "email",
          "message": "Email already exists"
        }
      ]
    }
    ```
  - Database: No new record is created
- **Postconditions**: Existing user data is unaffected

### TC003: Password mismatch error

- **Category**: Error
- **Objective**: Verify error handling when password and confirmation do not match
- **Prerequisites**: Use a new email address
- **Test data**:
  ```json
  {
    "email": "new@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "DifferentPass456!"
  }
  ```
- **Expected results**:
  - Status code: 400
  - Error message: "Password confirmation does not match"

### TC004: Invalid email format

- **Category**: Error/Boundary
- **Objective**: Verify email format validation
- **Dataset of test inputs**:
  - "invalid-email" (missing @)
  - "test@" (missing domain part)
  - "@example.com" (missing local part)
  - "test..test@example.com" (consecutive dots)
- **Expected results**: All return 400 errors

### TC005: Insufficient password strength

- **Category**: Error/Boundary
- **Objective**: Verify password-strength validation
- **Dataset of test inputs**:
  - "short" (less than 8 chars)
  - "onlylowercase" (lowercase only)
  - "ONLYUPPERCASE" (uppercase only)
  - "12345678" (digits only)
  - "NoSymbol123" (no symbols)
- **Expected results**: All return 400 errors

### TC006: Missing required fields

- **Category**: Error
- **Objective**: Verify validation of required fields
- **Dataset of test inputs**:
  - Missing email
  - Missing password
  - Missing password_confirmation
  - Empty strings
  - null values
- **Expected results**: All return 400 errors

### TC007: Boundary value test - Email length

- **Category**: Boundary
- **Objective**: Verify character-length limits for email
- **Test data**:
  - 254 characters (maximum allowed)
  - 255 characters (exceeds limit)
- **Expected results**:
  - 254 characters: Success
  - 255 characters: 400 error

### TC008: Rate limiting test

- **Category**: Non-functional
- **Objective**: Verify rate limiting for concurrent registrations
- **Steps**: Send many requests in a short period
- **Expected results**: Return 429 when the limit is exceeded

### TC009: Database connection error

- **Category**: Error/Infrastructure
- **Objective**: Verify behavior during database failures
- **Prerequisites**: Database is unavailable
- **Expected results**: 500 error and error logs output

### TC010: CSRF token verification

- **Category**: Security
- **Objective**: Prevent CSRF attacks
- **Test data**: Missing or invalid CSRF token
- **Expected results**: 403 error

````

## Workflow for Creating Test Cases

### 1. Extract test cases from the specification

```markdown
Each item in the specification → Corresponding test cases

■ Functional requirements
- Basic functions → Normal-case test cases
- Validation → Error-case test cases
- Input limits → Boundary-value test cases

■ Non-functional requirements
- Performance → Load test cases
- Security → Security test cases
- Availability → Failure test cases
````

### 2. Procedure for test case design

#### Step 1: Organize test perspectives

```markdown
## List of test perspectives

### Functional

- [ ] Behavior with valid inputs
- [ ] Input validation
- [ ] Error handling
- [ ] Data persistence

### Data

- [ ] Boundary values (min, max)
- [ ] Special characters/multi-language
- [ ] NULL/empty string
- [ ] Invalid formats

### State

- [ ] Initial state
- [ ] Data exists
- [ ] Error state
- [ ] Restricted state

### Environment

- [ ] Normal environment
- [ ] High-load environment
- [ ] Failure environment
```

#### Step 2: Create a test case matrix

| Feature           | Normal | Error     | Boundary      | Security | Performance |
| ----------------- | ------ | --------- | ------------- | -------- | ----------- |
| User registration | TC001  | TC002-006 | TC007         | TC010    | TC008       |
| Validation        | -      | TC002-006 | TC004,005,007 | -        | -           |
| Data persistence  | TC001  | TC009     | -             | -        | -           |

#### Step 3: Create detailed test cases

- Expand each cell of the matrix into a detailed test case
- Translate into executable, concrete steps
- Clearly define expected results

### 3. AI Assistance for Test Case Creation

#### Areas where AI can help

- **Coverage checking**: Point out missing test cases
- **Test data generation**: Propose boundary and invalid values
- **Expected value calculation**: Compute complex results
- **Structuring test cases**: Unify the format

#### Areas requiring human judgment

- **Understanding business requirements**: Domain-specific requirements
- **Risk evaluation**: Determine impact and importance
- **Test prioritization**: Execution order and resource allocation
- **Quality criteria**: Set acceptance criteria

## Quality Checkpoints for Test Cases

### 1. Confirm completeness

#### Functional coverage

```markdown
## Coverage checklist

### Each item in the API specification

- [ ] Test cases for all endpoints
- [ ] Test cases for all parameters
- [ ] Test cases for all response patterns

### Error handling

- [ ] Test cases for all error codes
- [ ] Test cases for all validation rules
- [ ] Test cases for all exception patterns
```

#### Business rule coverage

```markdown
### Business-rule verification

- [ ] Test cases for all business flows
- [ ] Test cases for all business exceptions
- [ ] Test cases for all permission patterns
```

### 2. Confirm executability

#### Ability to prepare test data

- Can required test data be prepared?
- Can external dependent services be mocked?
- Can tests run in the test environment?

#### Verifiability of expected results

- Are expected results objectively decidable?
- Are tools and methods for verification available?
- Methods for manual verification where automation is difficult

### 3. Confirm maintainability

#### Independence of test cases

- Each test case can run independently
- Does not depend on test order
- Can run in parallel

#### Handling changes

- Clear the impact scope when specs change
- Easy to modify test cases
- Easy management of test data

## Points for Human Review

### Review perspectives

#### 1. Consistency with business requirements

- [ ] Are user stories properly tested?
- [ ] Are business rules correctly reflected?
- [ ] Are edge cases reasonable from a business perspective?

#### 2. Risk-based priority

- [ ] Are there sufficient test cases for high-risk features?
- [ ] Are important business flows covered?
- [ ] Are security requirements properly tested?

#### 3. Test efficiency

- [ ] Is the number of test cases appropriate (neither too many nor too few)?
- [ ] Are there any duplicate test cases?
- [ ] Is separation of automation and manual testing appropriate?

### Review process

#### Step 1: Initial review

- Confirm consistency with the specification
- Basic coverage check
- Point out obvious omissions or problems

#### Step 2: Detailed review

- Confirm validity of each test case
- Confirm accuracy of expected results
- Verify executability

#### Step 3: Final approval

- Verify overall quality
- Confirm the test execution plan
- Decide whether to proceed to the next phase

## Best Practices for Creating Test Cases

### 1. Progressive detailing

```markdown
Phase 1: Overview level
"Test normal and error cases of user registration"

Phase 2: Feature level
"Registration succeeds with valid data"
"Registration fails with invalid data"

Phase 3: Detailed level
"TC001: Successful user registration"
"TC002: Duplicate email error"
```

### 2. Strategic design of test data

#### Systematize data patterns

```markdown
## Basic datasets

- Normal data: General valid values
- Boundary data: Limit values (min/max)
- Error data: Invalid/incorrect values
- Special data: Special characters, multi-language, NULL
```

#### Reusable test data

- Define commonly used test data
- Manage variations of test data
- Automate data creation

### 3. Precise definition of expected results

#### Concrete expected values

```markdown
❌ "Should result in error"
✅ "HTTP 400 + {"error": "validation_failed", "field": "email"}"

❌ "Should register successfully"
✅ "HTTP 201 + returns user ID + a new DB record is created"
```

#### Verifiable conditions

- Concrete values and formats in output
- State changes in the database
- Contents of log output
- Effects on external systems

## Common Problems and Solutions

### Problem 1: Inappropriate granularity of test cases

**Symptoms**:

- One test case tests multiple features
- Conversely, tests are too fine-grained, increasing management cost

**Solutions**:

- One test case = one verification perspective
- Group by units with business value

### Problem 2: Ambiguous expected results

**Symptoms**:

- Vague like "works normally" or "errors occur"
- Criteria for judgment are unclear

**Solutions**:

- Specify concrete values and states
- Consider judgment conditions for automated tests

### Problem 3: Missing test cases

**Symptoms**:

- Edge cases not considered
- Lack of error patterns

**Solutions**:

- Systematic checks using a checklist
- Use equivalence partitioning and boundary analysis

### Problem 4: Lack of maintainability

**Symptoms**:

- Difficult to modify tests when specifications change
- Complicated management of test data

**Solutions**:

- Modular design
- Reusable test data design

## Preparation for the Next Step

Once test case creation is complete, proceed to the [Red-Green-Refactor-Validation cycle](./04-rgr-validation-cycle.md).

### Deliverables checklist

- [ ] testcases.md is written in detail
- [ ] Test cases cover all items in the specification
- [ ] Expected results are concretely defined
- [ ] Human review is complete
- [ ] Test data can be prepared

### Quality checklist

- [ ] **Coverage**: Normal, error, and boundary cases are covered
- [ ] **Clarity**: Expected results are concrete and verifiable
- [ ] **Independence**: Each test can run independently
- [ ] **Feasibility**: Runnable in the test environment
- [ ] **Maintainability**: Structure that can handle spec changes

By appropriately creating test cases, you establish a foundation for AI to generate high-quality code. In the next chapter, we will explain the implementation cycle based on these test cases in detail.

# 3.3 テストケース作成

## テストケース作成の重要性

AITDD において、テストケースは実装の品質を決定する重要な要素です。AI が生成するコードの品質は、テストケースの網羅性と精度に大きく依存するため、この段階で包括的なテストケースを設計することが重要です。

## テストケース設計の原則

### 1. 網羅性の確保

#### 機能の網羅性

- **正常系**: 期待される動作すべて
- **異常系**: エラー処理とバリデーション
- **境界値**: 入力値の境界条件
- **エッジケース**: 特殊な条件や例外的な状況

#### テストレベルの網羅性

- **単体テスト**: 個別関数・メソッドのテスト
- **統合テスト**: コンポーネント間の連携テスト
- **エンドツーエンドテスト**: ユーザーシナリオの完全実行

### 2. 明確で具体的な期待値

```markdown
❌ 悪い例：「エラーが発生すること」
✅ 良い例：「ステータスコード 400 とエラーメッセージ"Email already exists"が返却されること」
```

### 3. 独立性と再現性

- 各テストケースは独立して実行可能
- テスト実行順序に依存しない
- 外部環境に依存しない

## テストケース文書の標準フォーマット

### 基本テンプレート

```markdown
# [機能名] テストケース仕様書

## テスト概要

- **対象機能**: テスト対象の機能名
- **テスト目的**: 何を検証するか
- **前提条件**: テスト実行の前提

## テストケース一覧

### TC001: [テストケース名]

- **分類**: 正常系/異常系/境界値
- **目的**: このテストで検証する内容
- **前提条件**: テスト実行前の状態
- **テストデータ**: 入力データの詳細
- **実行手順**:
  1. 具体的な手順 1
  2. 具体的な手順 2
- **期待結果**:
  - 期待される動作の詳細
  - 期待される出力値
- **事後条件**: テスト実行後の期待される状態
```

### 具体的なテストケース例

#### 例：ユーザー登録機能のテストケース

````markdown
# ユーザー登録機能 テストケース仕様書

## テスト概要

- **対象機能**: ユーザー新規登録 API (POST /api/users)
- **テスト目的**: 新規ユーザー登録の全パターンを検証
- **前提条件**: データベースが初期状態、API サーバーが稼働中

## テストケース一覧

### TC001: 正常なユーザー登録

- **分類**: 正常系
- **目的**: 有効なデータでの新規ユーザー登録を検証
- **前提条件**: test@example.com は未登録
- **テストデータ**:
  ```json
  {
    "email": "test@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "SecurePass123!"
  }
  ```
````

- **実行手順**:
  1. POST /api/users にテストデータを送信
  2. レスポンスを確認
  3. データベースの状態を確認
- **期待結果**:
  - ステータスコード: 201
  - レスポンス:
    ```json
    {
      "id": 任意の正整数,
      "email": "test@example.com",
      "created_at": "日時（ISO8601形式）"
    }
    ```
  - データベース: users テーブルに新しいレコードが作成される
  - パスワードがハッシュ化されて保存される
- **事後条件**: ユーザーが正常に登録され、ログイン可能

### TC002: メールアドレス重複エラー

- **分類**: 異常系
- **目的**: 既存メールアドレスでの登録時のエラー処理を検証
- **前提条件**: test@example.com が既に登録済み
- **テストデータ**:
  ```json
  {
    "email": "test@example.com",
    "password": "AnotherPass456!",
    "password_confirmation": "AnotherPass456!"
  }
  ```
- **実行手順**:
  1. POST /api/users にテストデータを送信
  2. レスポンスを確認
  3. データベースの状態を確認
- **期待結果**:
  - ステータスコード: 400
  - レスポンス:
    ```json
    {
      "error": "validation_failed",
      "details": [
        {
          "field": "email",
          "message": "Email already exists"
        }
      ]
    }
    ```
  - データベース: 新しいレコードは作成されない
- **事後条件**: 既存ユーザーデータに影響なし

### TC003: パスワード不一致エラー

- **分類**: 異常系
- **目的**: パスワードと確認パスワードの不一致時のエラー処理を検証
- **前提条件**: 新規メールアドレスを使用
- **テストデータ**:
  ```json
  {
    "email": "new@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "DifferentPass456!"
  }
  ```
- **期待結果**:
  - ステータスコード: 400
  - エラーメッセージ: "Password confirmation does not match"

### TC004: 無効なメールアドレス形式

- **分類**: 異常系・境界値
- **目的**: メールアドレス形式バリデーションを検証
- **テストデータ集**:
  - "invalid-email" (@ がない)
  - "test@" (ドメイン部がない)
  - "@example.com" (ローカル部がない)
  - "test..test@example.com" (連続ドット)
- **期待結果**: すべて 400 エラーとなること

### TC005: パスワード強度不足

- **分類**: 異常系・境界値
- **目的**: パスワード強度バリデーションを検証
- **テストデータ集**:
  - "short" (8 文字未満)
  - "onlylowercase" (小文字のみ)
  - "ONLYUPPERCASE" (大文字のみ)
  - "12345678" (数字のみ)
  - "NoSymbol123" (記号なし)
- **期待結果**: すべて 400 エラーとなること

### TC006: 必須項目未入力

- **分類**: 異常系
- **目的**: 必須項目のバリデーションを検証
- **テストデータ集**:
  - email なし
  - password なし
  - password_confirmation なし
  - 空文字列のケース
  - null のケース
- **期待結果**: すべて 400 エラーとなること

### TC007: 境界値テスト - メールアドレス長

- **分類**: 境界値
- **目的**: メールアドレスの文字数制限を検証
- **テストデータ**:
  - 254 文字（最大許可）
  - 255 文字（制限超過）
- **期待結果**:
  - 254 文字: 正常登録
  - 255 文字: 400 エラー

### TC008: レート制限テスト

- **分類**: 非機能
- **目的**: 同時登録のレート制限を検証
- **実行手順**: 短時間で大量のリクエストを送信
- **期待結果**: 制限を超えた場合 429 エラー

### TC009: データベース接続エラー

- **分類**: 異常系・インフラ
- **目的**: データベース障害時の動作を検証
- **前提条件**: データベースが利用不可
- **期待結果**: 500 エラーとエラーログ出力

### TC010: CSRF トークン検証

- **分類**: セキュリティ
- **目的**: CSRF 攻撃の防止を検証
- **テストデータ**: CSRF トークンなし、または無効なトークン
- **期待結果**: 403 エラー

````

## テストケース作成のワークフロー

### 1. 仕様書からのテストケース抽出

```markdown
仕様書の各項目 → 対応するテストケース

■ 機能要件
- 基本機能 → 正常系テストケース
- バリデーション → 異常系テストケース
- 入力制限 → 境界値テストケース

■ 非機能要件
- パフォーマンス → 負荷テストケース
- セキュリティ → セキュリティテストケース
- 可用性 → 障害テストケース
````

### 2. テストケース設計の手順

#### ステップ 1: テスト観点の整理

```markdown
## テスト観点一覧

### 機能観点

- [ ] 正常な入力での動作
- [ ] 入力値バリデーション
- [ ] エラーハンドリング
- [ ] データ永続化

### データ観点

- [ ] 境界値（最小、最大）
- [ ] 特殊文字・多言語
- [ ] NULL・空文字
- [ ] 不正な形式

### 状態観点

- [ ] 初期状態
- [ ] データ存在状態
- [ ] エラー状態
- [ ] 制限状態

### 環境観点

- [ ] 正常環境
- [ ] 高負荷環境
- [ ] 障害環境
```

#### ステップ 2: テストケースマトリックス作成

| 機能           | 正常系 | 異常系    | 境界値        | セキュリティ | パフォーマンス |
| -------------- | ------ | --------- | ------------- | ------------ | -------------- |
| ユーザー登録   | TC001  | TC002-006 | TC007         | TC010        | TC008          |
| バリデーション | -      | TC002-006 | TC004,005,007 | -            | -              |
| データ保存     | TC001  | TC009     | -             | -            | -              |

#### ステップ 3: 詳細テストケース作成

- 各セルの内容を詳細なテストケースとして展開
- 実行可能な具体的手順に落とし込み
- 期待結果を明確に定義

### 3. AI 活用によるテストケース支援

#### AI を活用できる領域

- **網羅性チェック**: 漏れているテストケースの指摘
- **テストデータ生成**: 境界値や異常値の提案
- **期待値計算**: 複雑な計算結果の算出
- **テストケース構造化**: フォーマットの統一

#### 人間が判断すべき領域

- **ビジネス要件の理解**: ドメイン固有の要件
- **リスク評価**: 影響度と重要度の判定
- **テスト優先度**: 実行順序とリソース配分
- **品質基準**: 受け入れ基準の設定

## テストケース品質のチェックポイント

### 1. 完全性の確認

#### 機能カバレッジ

```markdown
## カバレッジチェックリスト

### API 仕様書の各項目

- [ ] 全エンドポイントにテストケースあり
- [ ] 全パラメータにテストケースあり
- [ ] 全レスポンスパターンにテストケースあり

### エラーハンドリング

- [ ] 全エラーコードにテストケースあり
- [ ] 全バリデーションルールにテストケースあり
- [ ] 全例外パターンにテストケースあり
```

#### ビジネスルールカバレッジ

```markdown
### ビジネスルール検証

- [ ] 全業務フローにテストケースあり
- [ ] 全業務例外にテストケースあり
- [ ] 全権限パターンにテストケースあり
```

### 2. 実行可能性の確認

#### テストデータの準備可能性

- 必要なテストデータが準備可能か
- 外部依存サービスのモック化が可能か
- テスト環境での実行が可能か

#### 期待結果の検証可能性

- 期待結果が客観的に判定可能か
- 検証に必要なツールや方法が利用可能か
- 自動化が困難な部分の手動確認方法

### 3. 保守性の確認

#### テストケースの独立性

- 各テストケースが独立して実行可能
- テスト順序に依存しない
- 並列実行が可能

#### 変更への対応

- 仕様変更時の影響範囲が明確
- テストケースの修正が容易
- テストデータの管理が簡単

## 人間レビューのポイント

### レビュー観点

#### 1. ビジネス要件との整合性

- [ ] ユーザーストーリーが適切にテストされているか
- [ ] ビジネスルールが正しく反映されているか
- [ ] エッジケースが業務観点で妥当か

#### 2. リスクベースの優先度

- [ ] 高リスク機能に十分なテストケースがあるか
- [ ] 重要な業務フローが網羅されているか
- [ ] セキュリティ要件が適切にテストされているか

#### 3. テスト効率性

- [ ] テストケース数が適切か（過多/過少でない）
- [ ] 重複するテストケースがないか
- [ ] 自動化可能な部分と手動テストの分離が適切か

### レビュープロセス

#### ステップ 1: 初期レビュー

- 仕様書との整合性確認
- 網羅性の基本チェック
- 明らかな漏れや問題の指摘

#### ステップ 2: 詳細レビュー

- 各テストケースの妥当性確認
- 期待結果の正確性確認
- 実行可能性の検証

#### ステップ 3: 最終承認

- 全体的な品質確認
- テスト実行計画の確認
- 次フェーズへの進行判定

## テストケース作成のベストプラクティス

### 1. 段階的詳細化

```markdown
第 1 段階: 概要レベル
「ユーザー登録の正常系・異常系をテストする」

第 2 段階: 機能レベル
「有効データでの登録成功」
「無効データでの登録失敗」

第 3 段階: 詳細レベル
「TC001: 正常なユーザー登録」
「TC002: メールアドレス重複エラー」
```

### 2. テストデータの戦略的設計

#### データパターンの体系化

```markdown
## 基本データセット

- 正常データ: 一般的な有効値
- 境界データ: 制限値（最小/最大）
- 異常データ: 無効値・不正値
- 特殊データ: 特殊文字・多言語・NULL
```

#### 再利用可能なテストデータ

- 共通的に使用するテストデータの定義
- テストデータのバリエーション管理
- データ作成の自動化

### 3. 期待結果の精密な定義

#### 具体的な期待値

```markdown
❌ 「エラーになること」
✅ 「HTTP 400 + {"error": "validation_failed", "field": "email"}」

❌ 「正常に登録されること」
✅ 「HTTP 201 + ユーザー ID 返却 + DB にレコード作成」
```

#### 検証可能な条件

- 出力値の具体的な値や形式
- データベースの状態変化
- ログ出力の内容
- 外部システムへの影響

## よくある問題と対策

### 問題 1: テストケースの粒度が不適切

**症状**:

- 1 つのテストケースで複数の機能をテスト
- 逆に細かすぎて管理コストが高い

**対策**:

- 1 つのテストケース = 1 つの検証観点
- ビジネス価値のある単位でグループ化

### 問題 2: 期待結果が曖昧

**症状**:

- 「正常に動作する」「エラーが発生する」など
- 判定基準が不明確

**対策**:

- 具体的な値や状態を明記
- 自動テストでの判定条件を意識

### 問題 3: テストケースの漏れ

**症状**:

- エッジケースが未考慮
- エラーパターンの不足

**対策**:

- チェックリストによる体系的確認
- 同等クラス分割や境界値分析の活用

### 問題 4: 保守性の不足

**症状**:

- 仕様変更時にテストケース修正が困難
- テストデータの管理が煩雑

**対策**:

- モジュール化された設計
- 再利用可能なテストデータ設計

## 次のステップへの準備

テストケース作成が完了したら、次は[Red-Green-Refactor-Validation サイクル](./04-rgr-validation-cycle.md)に進みます。

### 成果物の確認

- [ ] testcases.md が詳細に作成されている
- [ ] 全ての仕様項目にテストケースが対応している
- [ ] 期待結果が具体的に定義されている
- [ ] 人間によるレビューが完了している
- [ ] テストデータが準備可能である

### 品質チェックリスト

- [ ] **網羅性**: 正常系・異常系・境界値がカバーされている
- [ ] **明確性**: 期待結果が具体的で検証可能
- [ ] **独立性**: 各テストケースが独立して実行可能
- [ ] **実現性**: テスト環境で実行可能
- [ ] **保守性**: 仕様変更に対応しやすい構造

適切なテストケース作成により、AI が高品質なコードを生成するための基盤が整います。次の章では、これらのテストケースを基にした実装サイクルを詳しく解説します。
