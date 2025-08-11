# 2.3 Building the Development Environment and Workflow

This section explains how to build a development environment and workflow to practice AITDD effectively. Beyond preparing tools, we systematize the entire development process to enable consistent, high-quality development.

## Practical Introduction Path and Method Evolution

### Introduction Timeline

#### Full-scale adoption starting early 2025

**Trigger:**

- Emergence of **Claude Sonnet 3.5** and **distilled DeepSeek R1**
- Confidence that a certain level of implementation is feasible with AI
- Recognized the limitations of purely manual coding

**Accumulated 5–6 months of practice:**

- Evolved from initial trial-and-error to a systematic method
- Discovered optimal patterns for prompt design
- Learned from failures and established best practices

### Evolution of the Method

#### Phase 1: Live coding (initial approach)

**Characteristics:**

- Create code while interacting with AI in real time
- Effective for small-scale feature implementations
- Rapid fixes via immediate feedback

**Where it helped:**

- Small changes within a single file
- Rapid prototype creation
- Sample code for technical research

**Limits discovered:**

- Structure tends to break down in large-scale development
- Difficult to manage complex dependencies
- Hard to maintain consistent quality

#### Phase 2: Combined with TDD (current approach)

**Recognized issues:**

- Large-scale development is difficult with live coding
- Lacks quality assurance mechanisms
- Need a mechanism to maintain design consistency

**Adopted solution:**

- Combine with **TDD (Test-Driven Development)**
- Establish **Red-Green-Refactor-Validation** cycle
- Build a systematic workflow

**Characteristics of the current method:**

```
Before (live coding):
Requirements → Direct implementation → Verify behavior → Fix → Done

After (AITDD):
Requirements → TODO → Red → Green → Refactor → Validation → Done
         ↑                                          ↓
         ←←←←←←← Feedback loop ←←←←←←←←←←←←←←←←←←←←
```

## Building a Practical Development Workflow

### Process of Optimizing Project Structure

**Initial challenges:**

- File structures varied across projects
- TODO item granularity was inappropriate
- Git history was hard to track

**Improved structure:**

```
project-root/
├── todo.md                    # Central task management
├── docs/                      # Systematized design documents
│   ├── requirements.md        # Clear requirements definition
│   ├── architecture.md        # Architecture design
│   └── api-spec.md            # Detailed API specification
├── src/                       # Clear separation by feature
├── tests/                     # Systematized test code
└── scripts/                   # Automation scripts
```

### Evolution of TODO Management

**Initial problems:**

- TODO items were too coarse (e.g., “Implement the whole system”)
- Unclear dependencies
- Hard to track progress

**Optimized current approach:**

**Discovered appropriate granularity:**

```markdown
# Optimal granularity (30–60 minutes)

- [x] Implement user registration API
- [x] Password validation functionality
- [ ] JWT authentication middleware
- [ ] Add tests for login functionality

# Granularity to avoid

❌ Implement the entire system (too big)
❌ Rename variables (too small)
```

**Practical sequential execution strategy:**

1. **Process the TODO list from the top**
2. **Complete one item fully before moving on**
3. **Adjust order for items with dependencies**
4. **Split into units that can be completed in 30–60 minutes**

## Git Workflow in Practice

### Branch Strategy Specialized for AITDD

**Strategy actually used:**

```bash
# Create a branch per TODO item
git checkout -b feature/user-registration    # TODO: User registration API
git checkout -b feature/auth-middleware      # TODO: Authentication middleware
git checkout -b feature/password-validation  # TODO: Password validation
```

**Commit strategy for the AITDD cycle:**

```bash
# Red phase (write failing tests)
git add tests/user-registration.test.js
git commit -m "Red: Add failing tests for user registration"

# Green phase (minimal implementation to pass tests)
git add src/controllers/user.js
git commit -m "Green: Implement basic user registration"

# Refactor phase (improve code)
git add src/controllers/user.js src/models/user.js
git commit -m "Refactor: Extract user validation logic"

# Validation phase (final verification and documentation)
git add docs/api-spec.md
git commit -m "Validation: Complete user registration with docs"
```

### Practical Recovery Strategy When Failing

**Decision criteria used in practice:**

```bash
# Pattern 1: Minor differences from expectations
if [ "difference_from_expectation" == "small" ]; then
    # Retry with prompt adjustments
    echo "Add details to the prompt and retry"
fi

# Pattern 2: Requires significant changes
if [ "difference_from_expectation" == "large" ]; then
    git reset --hard HEAD~1  # Revert to previous state
    echo "Review prompt and retry"
fi

# Pattern 3: Multiple failures
if [ "num_failures" -gt 3 ]; then
    git reset --hard <last_known_good_commit>
    echo "Rethink the approach fundamentally"
fi
```

**Practical example of recovery:**

```
Situation: Error handling in user authentication API was inadequate
Judgment: No improvement after 3 retry attempts
Action: git reset --hard HEAD~4 to return to the Red phase
Re-run: Restart with a more detailed prompt
Result: Implementation completed as expected
```

## Key Lessons from Practice

### Analysis of Success Factors

**1. Effectiveness of incremental approach:**

- Steady progress in small steps
- Quality checks at each stage
- Limited impact radius when failing

**2. Importance of documentation:**

- Clear requirements definition directly improves AI output quality
- API specifications guide test design
- Visualized progress helps maintain motivation

**3. Cumulative effect of prompt optimization:**

- Efficiency through reuse of similar patterns
- Improved precision by analyzing failures
- Accumulated domain-specific knowledge

## Common Problems and Solutions

**Problem 1: Unstable AI output quality**

```
Symptom: Different results for the same prompt depending on the day
Cause: Ambiguous prompt, lack of context
Countermeasure: Add more specific technical constraints and examples

Improvement example:
"Create an API"
↓
"Create POST /api/users API with Express.js + Mongoose:
- Request: {name: string, email: string}
- Validation: email format check, name required
- Response: 201 with created user info
- Errors: 400 (validation), 409 (duplicate), 500 (server)"
```

**Problem 2: Getting lost in large projects**

```
Symptom: Lose track of current work position
Cause: Poor TODO management, lack of progress tracking
Countermeasure: Display clear progress and next actions

Improvement example:
## Current Implementation Status (2025-06-21)
- [x] User management feature (completed)
- [ ] **Authentication feature (in progress: creating JWT middleware)**
- [ ] Authorization feature (not started)

### Next actions
1. Implement JWT signature verification
2. Add token refresh functionality
3. Implement logout
```

**Problem 3: Inconsistency between tests and code**

```
Symptom: Tests pass but real behavior differs from expectations
Cause: Poor test design, misunderstanding of requirements
Countermeasure: Create more realistic test cases

Improvement example:
# Insufficient test
test('should create user', () => {
  expect(user).toBeDefined();
});

# Improved test
test('should create user with valid email and return 201', async () => {
  const userData = { name: 'John', email: 'john@example.com' };
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);

  expect(response.body.user.email).toBe(userData.email);
  expect(response.body.user.password).toBeUndefined();
});
```

## Overall AITDD Development Workflow

### Basic development flow

```
Create TODO list → Select item → Run AITDD → Review → Next item
     ↑                                         ↓
     ←←←←←←←← Adjust as needed ←←←←←←←←←←←←←←←
```

### Detailed AITDD execution cycle

```
Red (tests) → Green (implementation) → Refactor (improvement) → Validation (verification)
      ↑                                                         ↓
      ←←←←←←←←←←← Feedback loop ←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

## Project Structure Design

### Recommended directory structure

```
project-root/
├── todo.md                    # Main TODO list
├── docs/                      # Project documents
│   ├── requirements.md        # Requirements definition
│   ├── architecture.md        # Architecture design
│   └── api-spec.md            # API specifications
├── src/                       # Source code
│   ├── models/                # Data models
│   ├── controllers/           # Controllers
│   ├── services/              # Business logic
│   └── utils/                 # Utilities
├── tests/                     # Test code
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── fixtures/              # Test data
├── scripts/                   # Development scripts
└── README.md                  # Project overview
```

### Create and manage TODO list

#### Basic format of the TODO list

```markdown
# Project TODO List

## Currently targeted for implementation

- [ ] Implement user registration feature

## Completed

- [x] Initial project setup
- [x] Database connection configuration

## Not started (in priority order)

1. [ ] User authentication

   - [ ] Password hashing
   - [ ] JWT token generation
   - [ ] Login API

2. [ ] User management

   - [ ] Profile update API
   - [ ] User deletion API
   - [ ] User list API

3. [ ] Security enhancement
   - [ ] Rate limiting
   - [ ] Input validation hardening
   - [ ] CORS configuration
```

#### Set effective TODO granularity

**Appropriate examples:**

- ✅ `Implement user registration API` (30–60 minutes)
- ✅ `Password validation functionality` (30–60 minutes)
- ✅ `JWT authentication middleware` (30–60 minutes)

**To avoid:**

- ❌ `Implement the entire system` (too large)
- ❌ `Rename variables` (too small)

### Execution strategy for TODOs

#### Sequential execution approach

```markdown
Execution policy:

1. Process TODOs from the top
2. Complete one item fully before the next
3. Adjust order for dependencies
4. Split into units that can be completed in 30–60 minutes
```

#### Managing dependencies

```markdown
Examples of dependencies:

- User model → User registration API → User authentication
- Database design → Migration → API implementation
- Basic features → Error handling → Security enhancement
```

## Git Workflow Settings

### Branch strategy for AITDD

#### Basic branch model

```bash
main                    # For production
├── develop             # Integration branch
└── feature/todo-item   # Per TODO item
```

#### Example of creating branches

```bash
# Create branches per TODO item
git checkout -b feature/user-registration
git checkout -b feature/user-authentication
git checkout -b feature/password-validation

# Group by feature
git checkout -b feature/user-management
git checkout -b feature/security-enhancement
```

### Commit strategy

#### Commits aligned to AITDD cycle

```bash
# Red phase (tests)
git add tests/
git commit -m "Red: Add tests for user registration"

# Green phase (implementation)
git add src/
git commit -m "Green: Implement user registration functionality"

# Refactor phase (improvement)
git add src/
git commit -m "Refactor: Improve user registration code structure"

# Validation phase (verification)
git add .
git commit -m "Validation: Complete user registration with documentation"
```

### Recovery strategy when failing

```bash
# When AI does not produce expected results
git reset --hard HEAD~1  # Undo the last commit
# Or
git reset --hard <commit-hash>  # Revert to a specific commit

# Adjust the prompt and re-run
# Commit again after success
```

## Next Steps for Practice

### After environment setup

1. **Prepare for Chapter 3**

   - Detailed understanding of the AITDD process
   - Master the Red-Green-Refactor-Validation cycle
   - Experience the actual development flow

2. **Plan your first project**

   - Design a small sample project
   - Define clear feature requirements
   - Create a TODO list within an implementable scope

3. **Prepare for continuous improvement**
   - Improve prompt design skills
   - Learn effective collaboration patterns with AI
   - Practice review and quality management

### Key points for success

#### Adopt an incremental approach

- **Start small**: Begin with simple features
- **Expand gradually**: Accumulate successful experiences
- **Learn from failure**: Don’t hesitate to use git reset

#### Keep quality in focus

- **Test-first**: Always start from tests
- **Habitual reviews**: Always review AI-generated code
- **Document**: Record implementation appropriately

#### Prepare for team practice

- **Build shared understanding**: Align team members
- **Unify tools**: Work within the same environment
- **Share knowledge**: Share successes and failures

## Completion Check for Environment Setup

### Final checklist

- [ ] **Basic tools**

  - [ ] Claude Sonnet 4 (Claude Code) is available
  - [ ] VS Code is properly configured
  - [ ] Git repository initialized

- [ ] **Project structure**

  - [ ] Recommended directory structure created
  - [ ] todo.md is prepared
  - [ ] Basic configuration files are placed

- [ ] **Development workflow**

  - [ ] Branch strategy decided
  - [ ] Commit rules defined
  - [ ] Test environment verified

- [ ] **Documentation and monitoring**
  - [ ] README.md created
  - [ ] Logging is configured
  - [ ] Debug environment is ready

### Operational tests

```bash
# Basic checks
npm test                     # Run tests
npm run test:coverage        # Check coverage
git status                   # Check Git status
git log --oneline -5         # Show recent commits

# Check integration with Claude Code
# Open the project in VS Code
# Confirm the Claude Code extension works
# Ask AI to create a simple test case for verification
```

### Troubleshooting

#### Common issues and solutions

**Cannot connect to Claude Code**

```bash
# Check authentication
# Confirm that the Pro plan is active
# Check network settings
```

**Errors in the test environment**

```bash
# Reinstall dependencies
npm install

# Clear package cache
npm cache clean --force
```

**Errors with Git operations**

```bash
# Reconfigure credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Summary

In Chapter 2, you learned how to build a comprehensive development environment to practice AITDD. The most important points are:

### Key outcomes

1. **Tool setup**: Built a development environment centered on Claude Sonnet 4
2. **Workflow design**: A systematic process from TODO management to Git flow
3. **Quality foundation**: Test environment, logging, and debugging setup

### Preparation for the next chapter

With the environment ready, you can now learn the actual AITDD process. In Chapter 3, “Details of the AITDD Process,” you will master the practical methods of the Red-Green-Refactor-Validation cycle.

**Learning points:**

- Specific tasks in each phase
- Effective ways to collaborate with AI
- Quality management and review techniques

Now that your environment is prepared, you are ready to collaborate with AI to develop software. In the next chapter, experience the full value of AITDD.

# 2.3 開発環境とワークフロー構築

AITDD を効果的に実践するための開発環境とワークフローの構築方法について説明します。ツールの準備だけでなく、開発プロセス全体を体系化することで、一貫性のある高品質な開発を実現します。

## AITDD 導入の実際の経緯と手法の進化

### 導入タイムライン

#### 2025 年始めからの本格的取り組み

**きっかけ:**

- **Claude Sonnet 3.5** と **DeepSeek R1 の蒸留モデル** の登場
- ある程度の実装が AI で実現可能という確信を得た
- 従来の手動コーディングの限界を感じた

**約 5-6 ヶ月の実践経験の蓄積:**

- 初期の試行錯誤から体系的な手法への発展
- プロンプト設計の最適化パターンの発見
- 失敗事例からの学習とベストプラクティスの確立

### 手法の進化プロセス

#### 第 1 段階：ライブコーディング（初期アプローチ）

**特徴:**

- リアルタイムで AI と対話しながらコード作成
- 小規模な機能実装に効果的
- 即座のフィードバックによる迅速な修正

**有効だった場面:**

- 単一ファイル内での小規模修正
- プロトタイプの迅速な作成
- 技術調査のためのサンプルコード作成

**限界の発見:**

- 大規模開発では構造が破綻しやすい
- 複雑な依存関係の管理が困難
- 品質の一貫性を保つことが困難

#### 第 2 段階：TDD との組み合わせ（現在の手法）

**課題認識:**

- ライブコーディングでは大規模開発が困難
- 品質保証のメカニズムが不足
- 設計の一貫性を保つ仕組みが必要

**解決策の採用:**

- **TDD（テスト駆動開発）** との組み合わせ
- **Red-Green-Refactor-Validation**サイクルの確立
- 体系的なワークフローの構築

**現在の手法の特徴:**

```
進化前（ライブコーディング）:
要件 → 直接実装 → 動作確認 → 修正 → 完了

進化後（AITDD）:
要件 → TODO作成 → Red → Green → Refactor → Validation → 完了
         ↑                                          ↓
         ←←←←←←← フィードバックループ ←←←←←←←←←←
```

### 実際の開発ワークフローの構築経験

#### プロジェクト構造の最適化プロセス

**初期の課題:**

- ファイル構成がプロジェクトごとにバラバラ
- TODO の粒度が適切でない
- Git 履歴が追跡困難

**改善後の構造:**

```
project-root/
├── todo.md                    # 中心的なタスク管理
├── docs/                      # 設計文書の体系化
│   ├── requirements.md        # 明確な要件定義
│   ├── architecture.md        # アーキテクチャ設計
│   └── api-spec.md           # 詳細なAPI仕様
├── src/                       # 機能別の明確な分離
├── tests/                     # テストコードの体系化
└── scripts/                   # 自動化スクリプト
```

#### TODO 管理の進化過程

**初期の問題:**

- TODO の粒度が大きすぎる（「システム全体の実装」など）
- 依存関係が不明確
- 進捗が追跡困難

**現在の最適化されたアプローチ:**

**適切な粒度の発見:**

```markdown
# 最適な粒度（30 分〜1 時間）

- [x] ユーザー登録 API の実装
- [x] パスワードバリデーション機能
- [ ] JWT 認証ミドルウェア
- [ ] ログイン機能のテスト追加

# 避けるべき粒度

❌ システム全体の実装（大きすぎる）
❌ 変数名の変更（小さすぎる）
```

**実践的な順次実行戦略:**

1. **TODO リストを上から順番に処理**
2. **一つのアイテムを完全に完了してから次へ**
3. **依存関係があるアイテムは順序を調整**
4. **30 分〜1 時間で完了できる単位に分割**

### Git ワークフローの実践的運用

#### AITDD 特化のブランチ戦略

**実際に採用している戦略:**

```bash
# TODO項目ごとのブランチ作成パターン
git checkout -b feature/user-registration    # TODO: ユーザー登録API
git checkout -b feature/auth-middleware      # TODO: 認証ミドルウェア
git checkout -b feature/password-validation  # TODO: パスワード検証
```

**AITDD サイクル対応コミット戦略:**

```bash
# Red フェーズ（失敗するテスト作成）
git add tests/user-registration.test.js
git commit -m "Red: Add failing tests for user registration"

# Green フェーズ（テストを通す最小実装）
git add src/controllers/user.js
git commit -m "Green: Implement basic user registration"

# Refactor フェーズ（コード改善）
git add src/controllers/user.js src/models/user.js
git commit -m "Refactor: Extract user validation logic"

# Validation フェーズ（最終検証と文書化）
git add docs/api-spec.md
git commit -m "Validation: Complete user registration with docs"
```

#### 失敗時の回復戦略の実践

**実際の運用での判断基準:**

```bash
# パターン1: 軽微な修正で対応可能
if [ "期待との差異" == "小さい" ]; then
    # プロンプト調整で再実行
    echo "プロンプトを詳細化して再試行"
fi

# パターン2: 大幅な修正が必要
if [ "期待との差異" == "大きい" ]; then
    git reset --hard HEAD~1  # 前の状態に戻す
    echo "プロンプト見直し後に再実行"
fi

# パターン3: 複数回の失敗
if [ "失敗回数" -gt 3 ]; then
    git reset --hard <last_known_good_commit>
    echo "アプローチを根本的に見直し"
fi
```

**実際の回復パターン例:**

```
状況: ユーザー認証APIの実装でエラーハンドリングが不適切
判断: 3回の修正試行で改善されず
対応: git reset --hard HEAD~4 でRed フェーズまで戻る
再実行: より詳細なプロンプトで再開
結果: 期待通りの実装が完了
```

### 実践から得られた重要な教訓

#### 成功要因の分析

**1. 段階的アプローチの効果:**

- 小さなステップでの確実な進歩
- 各段階での品質確認
- 失敗時の影響範囲の限定

**2. 文書化の重要性:**

- 要件定義の明確化が AI 出力品質に直結
- API 仕様書がテスト設計の指針になる
- 進捗の可視化がモチベーション維持に寄与

**3. プロンプト最適化の累積効果:**

- 同じパターンの再利用による効率向上
- 失敗事例の分析による精度向上
- ドメイン特化の知識蓄積

#### よくある問題と対処法

**問題 1: AI 出力の品質が不安定**

```
症状: 同じプロンプトでも日によって結果が異なる
原因: プロンプトの曖昧性、文脈不足
対処: より具体的な技術制約と例示の追加

改善例:
"APIを作って"
↓
"Express.js + Mongoose で POST /api/users API を作成:
- リクエスト: {name: string, email: string}
- バリデーション: email形式チェック、name必須
- レスポンス: 201で作成されたユーザー情報
- エラー: 400(バリデーション), 409(重複), 500(サーバー)"
```

**問題 2: 大規模プロジェクトでの迷子状態**

```
症状: 現在の作業位置が分からなくなる
原因: TODO管理の不備、進捗追跡の欠如
対処: 明確な進捗表示と次のアクションの明示

改善例:
## 現在の実装状況 (2025-06-21)
- [x] ユーザー管理機能 (完了)
- [ ] **認証機能 (実装中: JWT middleware作成段階)**
- [ ] 権限管理機能 (未着手)

### 次のアクション
1. JWT署名検証の実装
2. トークン更新機能の追加
3. ログアウト機能の実装
```

**問題 3: テストとコードの不整合**

```
症状: テストは通るが実際の動作が期待と異なる
原因: テスト設計の不備、要件理解の齟齬
対処: より現実的なテストケースの作成

改善例:
# 不十分なテスト
test('should create user', () => {
  expect(user).toBeDefined();
});

# 改善されたテスト
test('should create user with valid email and return 201', async () => {
  const userData = { name: 'John', email: 'john@example.com' };
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);

  expect(response.body.user.email).toBe(userData.email);
  expect(response.body.user.password).toBeUndefined(); // パスワードは含まない
});
```

## AITDD 開発ワークフローの全体像

### 基本的な開発フロー

```
TODOリスト作成 → 項目選択 → AITDD実行 → レビュー → 次の項目
     ↑                                            ↓
     ←←←←←←←←←← 必要に応じて調整 ←←←←←←←←←←←←←←
```

### AITDD 実行の詳細サイクル

```
Red (テスト作成) → Green (実装) → Refactor (改善) → Validation (検証)
      ↑                                                    ↓
      ←←←←←←←←←←←←← フィードバックループ ←←←←←←←←←←←←←←
```

## プロジェクト構造の設計

### 推奨ディレクトリ構造

```
project-root/
├── todo.md                    # メインのTODOリスト
├── docs/                      # プロジェクト文書
│   ├── requirements.md        # 要件定義
│   ├── architecture.md        # アーキテクチャ設計
│   └── api-spec.md           # API仕様書
├── src/                       # ソースコード
│   ├── models/               # データモデル
│   ├── controllers/          # コントローラー
│   ├── services/             # ビジネスロジック
│   └── utils/                # ユーティリティ
├── tests/                     # テストコード
│   ├── unit/                 # ユニットテスト
│   ├── integration/          # 統合テスト
│   └── fixtures/             # テストデータ
├── scripts/                   # 開発用スクリプト
└── README.md                 # プロジェクト概要
```

### TODO リストの作成と管理

#### TODO リストの基本形式

**todo.md の例:**

```markdown
# プロジェクト TODO リスト

## 現在の実装対象

- [ ] ユーザー登録機能の実装

## 完了済み

- [x] プロジェクト初期設定
- [x] データベース接続設定

## 未着手（優先度順）

1. [ ] ユーザー認証機能

   - [ ] パスワードハッシュ化
   - [ ] JWT トークン生成
   - [ ] ログイン API

2. [ ] ユーザー管理機能

   - [ ] プロフィール更新 API
   - [ ] ユーザー削除 API
   - [ ] ユーザー一覧 API

3. [ ] セキュリティ強化
   - [ ] レート制限実装
   - [ ] 入力値検証強化
   - [ ] CORS 設定

## 今後検討

- [ ] パフォーマンス最適化
- [ ] デプロイメント自動化
```

#### 効果的な TODO 粒度の設定

**適切な粒度の例:**

- ✅ `ユーザー登録APIの実装`（30 分〜1 時間）
- ✅ `パスワードバリデーション機能`（30 分〜1 時間）
- ✅ `JWT認証ミドルウェア`（30 分〜1 時間）

**避けるべき粒度:**

- ❌ `システム全体の実装`（大きすぎる）
- ❌ `変数名の変更`（小さすぎる）

### TODO の実行戦略

#### 順次実行アプローチ

```markdown
実行方針:

1. TODO リストを上から順番に処理
2. 一つのアイテムを完全に完了してから次へ
3. 依存関係があるアイテムは順序を調整
4. 30 分〜1 時間で完了できる単位に分割
```

#### 依存関係の管理

```markdown
依存関係の例:

- ユーザーモデル → ユーザー登録 API → ユーザー認証
- データベース設計 → マイグレーション → API 実装
- 基本機能 → エラーハンドリング → セキュリティ強化
```

## Git ワークフローの設定

### AITDD 向けブランチ戦略

#### 基本的なブランチモデル

```bash
main                    # 本番環境用
├── develop            # 開発統合用
└── feature/todo-item  # 各TODO項目用
```

#### ブランチ作成の実例

```bash
# TODO項目ごとにブランチを作成
git checkout -b feature/user-registration
git checkout -b feature/user-authentication
git checkout -b feature/password-validation

# 機能群でまとめる場合
git checkout -b feature/user-management
git checkout -b feature/security-enhancement
```

### コミット戦略

#### AITDD サイクルに対応したコミット

```bash
# Red フェーズ（テスト作成）
git add tests/
git commit -m "Red: Add tests for user registration"

# Green フェーズ（実装）
git add src/
git commit -m "Green: Implement user registration functionality"

# Refactor フェーズ（改善）
git add src/
git commit -m "Refactor: Improve user registration code structure"

# Validation フェーズ（検証）
git add .
git commit -m "Validation: Complete user registration with documentation"
```

#### 失敗時の回復戦略

```bash
# AIが期待通りの結果を出さない場合
git reset --hard HEAD~1  # 最後のコミットを取り消し
# または
git reset --hard <commit-hash>  # 特定のコミットまで戻る

# プロンプトを調整して再実行
# 成功したら新しいコミット
```

## 実践のための Next Steps

### 環境構築完了後の行動指針

1. **第 3 章への移行準備**

   - AITDD プロセスの詳細理解
   - Red-Green-Refactor-Validation サイクルの習得
   - 実際の開発フローの体験

2. **最初のプロジェクト計画**

   - 小規模なサンプルプロジェクトの設計
   - 明確な機能要件の定義
   - 実装可能な範囲での TODO リスト作成

3. **継続的改善の準備**
   - プロンプト設計スキルの向上
   - AI との効果的な対話パターンの習得
   - レビューと品質管理の実践

### 成功のための重要ポイント

#### 段階的なアプローチの採用

- **小さく始める**: 単純な機能から開始
- **徐々に拡張**: 成功体験を積み重ねる
- **失敗から学ぶ**: git reset を恐れずに試行錯誤

#### 品質への継続的な注意

- **テストファースト**: 必ずテストから書き始める
- **レビューの習慣化**: AI 生成コードも必ず確認
- **文書化の実践**: 実装内容を適切に記録

#### チームでの実践準備

- **共通理解の構築**: チームメンバーとの認識合わせ
- **ツール統一**: 同じ開発環境での作業
- **知識共有**: 成功・失敗事例の共有

## 環境構築の完了確認

### 最終チェックリスト

- [ ] **基本ツール**

  - [ ] Claude Sonnet 4 (Claude Code) が利用可能
  - [ ] VS Code が適切に設定済み
  - [ ] Git リポジトリが初期化済み

- [ ] **プロジェクト構造**

  - [ ] 推奨ディレクトリ構造が作成済み
  - [ ] todo.md ファイルが準備済み
  - [ ] 基本的な設定ファイルが配置済み

- [ ] **開発ワークフロー**

  - [ ] Git ブランチ戦略が決定済み
  - [ ] コミット規則が定義済み
  - [ ] テスト環境が動作確認済み

- [ ] **文書化・監視**
  - [ ] README.md が作成済み
  - [ ] ログ設定が完了済み
  - [ ] デバッグ環境が準備済み

### 動作確認テスト

```bash
# 基本的な動作確認
npm test                     # テスト実行
npm run test:coverage        # カバレッジ確認
git status                   # Git状態確認
git log --oneline -5         # 最近のコミット確認

# Claude Codeとの連携確認
# VS Code でプロジェクトを開く
# Claude Code プラグインが正常に動作するか確認
# 簡単なテストケース作成をAIに依頼して動作確認
```

### トラブルシューティング

#### よくある問題と解決策

**Claude Code に接続できない**

```bash
# 認証の確認
# Proプランの有効性確認
# ネットワーク設定の確認
```

**テスト環境でエラーが発生**

```bash
# 依存関係の再インストール
npm install

# パッケージキャッシュのクリア
npm cache clean --force
```

**Git 操作でエラー**

```bash
# 認証情報の再設定
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## まとめ

第 2 章では、AITDD を実践するための包括的な開発環境の構築方法を学習しました。重要なポイントは以下の通りです：

### 主要な成果

1. **ツールセットアップ**: Claude Sonnet 4 を中心とした開発環境の構築
2. **ワークフロー設計**: TODO 管理から Git フローまでの体系的なプロセス
3. **品質管理基盤**: テスト環境、ログ、デバッグ機能の整備

### 次章への準備

環境構築が完了したら、いよいよ AITDD の実際のプロセスを学習します。第 3 章「AITDD プロセスの詳細」では、Red-Green-Refactor-Validation サイクルの具体的な実践方法を習得します。

**学習のポイント:**

- 各フェーズでの具体的な作業内容
- AI との効果的な対話方法
- 品質管理とレビューのテクニック

環境が整った今、実際に AI と協調してソフトウェア開発を行う準備が整いました。次章で、AITDD の真価を体験しましょう。
