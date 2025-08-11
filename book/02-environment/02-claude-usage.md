# 2.2 How to Use Claude Sonnet 4

This section explains how to effectively leverage Claude Sonnet 4, the core of AITDD. Rather than merely asking AI to write code, you will learn how humans and AI collaborate to develop high-quality software.

## Features and Strengths of Claude Sonnet 4

### Positioning in AITDD

- **Primary executor of the Red-Green-Refactor-Validation cycle**
- **Handles design, tests, and implementation consistently**
- **Balances high-quality code generation with quality checks**

### Reasons for Selection

- **Accessibility**: Freely usable with Claude Code
- **Coding performance**: Stable and sufficiently strong for needs
- **Cost efficiency**: Reasonable cost ($20/month)
- **Fit for AITDD**: Optimized for a trial-heavy development style
- **Integration**: Excellent integration with VS Code

## Basics of Using Claude Code

### Launch and Basic Operations

1. **Launch Claude Code**

   ```bash
   # Launch Claude Code inside VS Code
   # Or access via the browser version of Claude
   ```

2. **Project Integration**
   - Specify your project directory
   - Recognize the file structure
   - Understand existing code

### Basic Interaction Patterns in AITDD

#### 1. Goal Setting Phase

```
You: "I want to implement CRUD operations for the user management feature. First, please create a TODO list."

Claude: "Creating a TODO list for user management:
1. Define User model
2. Create test cases for user creation
3. Implement user creation functionality
..."
```

#### 2. Test Creation Phase

````
You: "Create test cases for the first item in the TODO."

Claude: "Creating test cases for the User model:
```javascript
describe('User Model', () => {
  test('should create user with valid data', () => {
    // test code
  });
});
```"
````

#### 3. Implementation Phase

````
You: "Implement code to pass this test."

Claude: "Implementing a User model to pass the test:
```javascript
class User {
  constructor(name, email) {
    // implementation
  }
}
```"
````

## Effective Prompt Design

### Basic Principles of Prompt Design

#### 1. Clear goal setting

**Good example:**

```
"I want to implement a user registration API (POST /users).
- With validation
- Including error handling
- Proceed with test-first"
```

**Bad example:**

```
"Make a user feature"
```

#### 2. Provide context

```
"Current project setup:
- Express.js + MongoDB
- Jest for testing
- Existing User model

New functionality to add:
- User profile update API"
```

#### 3. State constraints

```
"Constraints:
- Maintain compatibility with existing APIs
- Implement with security in mind
- Performance requirement: respond within 1 second"
```

### Iterative Process for Prompt Optimization

#### Step 1: First run

1. **Create prompt**
2. **Ask AI to execute**
3. **Evaluate the result**

#### Step 2: Evaluate and improve

1. **Identify gaps from expectations**
2. **Analyze prompt issues**
3. **Design an improved prompt**

#### Step 3: Re-run

1. **Execute with improved prompt**
2. **Check degree of improvement**
3. **Adjust further as needed**

### Practical Prompt Templates

#### For feature implementation

```
[Implementation Request]
Feature: [specific feature]
Tech stack: [technologies]
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Constraints:
- [constraint 1]
- [constraint 2]

Expected deliverables:
- Test cases
- Implementation code
- Documentation (if necessary)
```

#### For debugging

```
[Debug Request]
Issue: [detailed description]
Error message: [actual error]
Reproduction steps:
1. [step 1]
2. [step 2]
3. [step 3]

Related code: [problematic code]
Expected behavior: [what should happen]
```

## Review and Quality Management

### Points for Human Review

#### 1. Consistency with specification

- **Reflect design intent**: Is the planned functionality correctly implemented?
- **Coverage of requirements**: Are all requirements satisfied?
- **Adherence to constraints**: Are stated constraints respected?

#### 2. Priority of review targets

1. **Specification**: Most important alignment with requirements
2. **Test cases**: Appropriate coverage of specification
3. **Implementation code**: Code quality and spec conformance

#### 3. Review checklist

- [ ] Functional requirements are satisfied
- [ ] Error handling is appropriate
- [ ] Security requirements are considered
- [ ] Performance requirements are met
- [ ] Test coverage is sufficient
- [ ] Code readability and maintainability are good

### If AI Does Not Produce Expected Results

#### Fallback Strategy

**Basic flow:**

1. **git reset**: Revert to previous state
2. **Prompt adjustment**: Clarify and detail instructions
3. **Re-run**: Retry with the same tool (Claude Sonnet 4)
4. **Evaluate**: Check the degree of improvement

**When to git reset:**

- The final code diverges significantly from expectations
- Re-implementation is faster than requesting fixes
- Multiple fix attempts show no improvement

#### Prompt Adjustment Techniques

**Increase specificity:**

```
# Before
"Fix this code"

# After
"Fix the following issues in this code:
1. Validation errors are not handled correctly
2. Return type differs from the specification
3. Edge case tests are missing"
```

**Add context:**

```
# Before
"Create an API"

# After
"Create a RESTful API using Express.js:
- Endpoint: POST /api/users
- Request format: JSON
- Response format: JSON
- Use the existing User model
- Connected to MongoDB Atlas"
```

## Recording for Continuous Improvement

### Record success patterns

```markdown
## Success Case Log

### Date: 2025-06-21

### Task: Implement user authentication API

### Prompt used:

[Prompt content]

### Result:

- Completed as expected in one shot
- 100% of tests passed

### Learnings:

- For authentication, specifying libraries concretely is effective
- Important to state security requirements in advance
```

### Analyze failure patterns

```markdown
## Improvement Case Log

### Date: 2025-06-21

### Task: Complex query optimization

### Problems:

- Initial implementation did not meet performance requirements
- No improvement after 3 attempts

### Solution:

- Use git reset to return to the initial state
- State performance requirements quantitatively in the prompt
- Provide reference implementation examples

### Learnings:

- Performance requirements must be specified quantitatively
- Split complex tasks into smaller ones
```

## Using Tools Other Than Claude Sonnet 4

### Deeper Collaboration with Gemini (for research)

#### Where Gemini shines

**Use cases:**

- Researching new libraries
- Reading large technical documents
- Research tasks requiring long context
- Integrating information from multiple sources

**Unique strengths of Gemini:**

- **Long context**: Processes large amounts of information at once
- **Information gathering**: Effectively integrates information from multiple sources
- **Research specialization**: Excellent at in-depth technical research

#### Practical collaboration workflow

**Basic pattern:**

```
1. Identify research topic → Gather info with Gemini
2. Organize and summarize → Analyze with Gemini
3. Draft implementation plan → Provide info to Claude Sonnet 4
4. Execute AITDD → Implement consistently with Claude Sonnet 4
```

**Examples:**

**Example 1: Introducing a new framework**

```
Gemini:
"Research new features of Next.js 14 and outline migration from an existing Express.js app"

↓ Provide findings to Claude Sonnet 4

Claude Sonnet 4:
"Based on Gemini's findings, create a step-by-step migration TODO list and
implement the first feature with AITDD"
```

**Example 2: Deep-dive into technical specs**

```
Gemini:
"Research best practices and implementation patterns for combining OAuth 2.0 and JWT"

↓ Provide organized security requirements to Claude Sonnet 4

Claude Sonnet 4:
"Based on the research, start from test cases for a secure auth system and
implement using AITDD"
```

#### Decision criteria for tool selection

**Use Gemini when:**

- [ ] First-time research on new tech/libraries
- [ ] Need to compare multiple options
- [ ] Need to read long technical documents
- [ ] Need to organize complex requirements
- [ ] Need to research prior art

**Use Claude Sonnet 4 when:**

- [ ] Concrete implementation work
- [ ] Creating test cases
- [ ] Code review and quality checks
- [ ] Debugging and troubleshooting
- [ ] Refactoring

## Operational Know-how

### Advanced techniques for prompt design

**Maintaining context across sessions:**

```
# At session start
"Please remember the following project setup:
- Express.js + MongoDB + Jest
- User authentication implemented
- Current goal: Add user profile management"

# In a continued session
"Based on the project setup I shared, please create test cases for the profile update API"
```

**Progressive detailing:**

```
# Phase 1: Overview level
"Design the overall user management system"

# Phase 2: Feature level
"From the design above, write detailed specs for the profile update feature"

# Phase 3: Implementation level
"Based on the specs, implement test cases and API endpoints"
```

### Advanced error-handling strategies

**Pattern analysis for prompt adjustments:**

**Pattern 1: Failure due to lack of specificity**

```
# Failure example
"Create an API"
→ Implementation deviates significantly from expectations

# Success example
"Create POST /api/users/profile API with Express.js:
- Request: {name, email, bio}
- Validation: email format, name required
- Response: updated user info
- Error handling: 400, 401, 500 supported"
```

**Pattern 2: Failure due to missing technical constraints**

```
# Failure example
"Write database operation code"
→ Implemented using an ORM we are not using

# Success example
"Implement update operation for the User schema using Mongoose 7.x:
- Use the existing User model
- findByIdAndUpdate method
- Properly handle validation errors"
```

**Practical prompt checklist:**

- [ ] State the tech stack explicitly
- [ ] Specify input/output formats concretely
- [ ] Instruct consideration of error cases
- [ ] Ensure consistency with existing code
- [ ] State performance requirements
- [ ] Instruct security considerations

## Methods for Recording Continuous Improvement

**Template successful patterns:**

```markdown
## Prompt Template: API Implementation

### Basic form

"Implement [HTTP method] [endpoint] API with [framework]:

- Request format: [details]
- Response format: [details]
- Validation: [requirements]
- Error handling: [status codes]
- Use existing [ModelName] model"

### Example

[Concrete example]

### Expected results

[Expected output pattern]
```

**Record analysis of failure patterns:**

```markdown
## Improvement Record: [date]

### Problematic prompt

[Original prompt]

### Problems encountered

- [Specific issue 1]
- [Specific issue 2]

### Improved prompt

[Revised prompt]

### Points of improvement

- [Point 1]
- [Point 2]

### Guidance for future use

[How to apply this to other cases]
```

## Why We Consolidate on Claude Sonnet 4

### 1. Importance of consistency

- Unified approach using the same tool
- Accumulated optimizations become more effective
- Knowledge of tool-specific quirks and limits compounds

### 2. Maximize learning efficiency

- Efficiency improves by mastering one tool
- Prompt design skills deepen
- Accumulate error patterns and solutions

### 3. Simplify cost management

- Easier to manage a single tool than multiple
- Simplify budgeting
- Centralize usage monitoring

### 4. Simplify fallback strategy

- Avoid complex decision logic
- No need to decide “which tool to retry”
- Enables quick problem solving

**Benefits of consolidation:**

```
Item                         Consolidated approach   Multi-tool approach
────────────────────────────────────────────────────────────────────────
Learning cost                Low                     High
Prompt optimization          High                    Low
Cost management complexity   Low                     High
Fallback decision-making     Simple                  Complex
Knowledge accumulation       High                    Distributed
────────────────────────────────────────────────────────────────────────
Overall development efficacy Optimized               Inefficient
```

## Future-readiness of the AI Tool Environment

### Policy for adopting new technologies

**Systematize evaluation criteria:**

- **Performance evaluation**: Compare within current workflow
- **Cost analysis**: Total cost of ownership (including learning)
- **Integration evaluation**: Compatibility with current environment
- **Migration cost**: Estimate cost of tool switching

**Phased introduction approach:**

1. **Information gathering**: Observe for 3–6 months
2. **Small tests**: Try in non-critical projects
3. **Comparative evaluation**: Quantitative comparison of performance/efficiency
4. **Phased migration**: Migrate cautiously only when clear superiority is confirmed

**Quantify decisions:**

```
Threshold for adopting a new tool:
- Performance improvement: ≥ 20%
- Cost reduction: ≥ 15%
- Learning cost: within 2 weeks
- Integration cost: ≤ 50% of current tool
```

## Next Steps

After you understand how to use Claude Sonnet 4, move on to the next chapter, “2.3 Building the Development Environment and Workflow,” where you will construct an end-to-end AITDD development environment. From TODO management to Git workflow, you will establish a structured development process.

# 2.2 Claude Sonnet 4 の活用方法

AITDD の核心となる Claude Sonnet 4 の効果的な活用方法について説明します。単に AI にコードを書かせるのではなく、人間と AI が協調して高品質なソフトウェアを開発する方法を学びます。

## Claude Sonnet 4 の特徴と強み

### AITDD における位置づけ

- **Red-Green-Refactor-Validation サイクルの実行主体**
- **設計からテスト、実装まで一貫して担当**
- **高品質なコード生成と品質チェックを両立**

### 選択理由

- **アクセス性**: Claude Code で自由に使用可能
- **コーディング性能**: 必要十分なレベルの安定した性能
- **コスト効率**: 妥当なレベルでのコスト（$20/月）
- **AITDD 適性**: トライアル重視の開発スタイルに最適
- **統合性**: VS Code 環境との優れた連携

## Claude Code の基本的な使い方

### 起動と基本操作

1. **Claude Code の起動**

   ```bash
   # VS Code内でClaude Codeを起動
   # またはブラウザ版Claude経由でアクセス
   ```

2. **プロジェクトとの連携**
   - プロジェクトディレクトリの指定
   - ファイル構造の認識
   - 既存コードの理解

### AITDD での基本的な対話パターン

#### 1. ゴール設定フェーズ

```
あなた: "ユーザー管理機能のCRUD操作を実装したい。まずTODOリストを作成してください。"

Claude: "ユーザー管理機能のTODOリストを作成します：
1. ユーザーモデルの定義
2. ユーザー作成のテストケース作成
3. ユーザー作成機能の実装
..."
```

#### 2. テスト作成フェーズ

````
あなた: "TODOの最初の項目のテストケースを作成してください。"

Claude: "ユーザーモデルのテストケースを作成します：
```javascript
describe('User Model', () => {
  test('should create user with valid data', () => {
    // テストコード
  });
});
```"
````

#### 3. 実装フェーズ

````
あなた: "このテストを通すためのコードを実装してください。"

Claude: "テストを通すためのユーザーモデルを実装します：
```javascript
class User {
  constructor(name, email) {
    // 実装コード
  }
}
```"
````

## 効果的なプロンプト設計

### プロンプト設計の基本原則

#### 1. 明確な目標設定

**良い例:**

```
"ユーザー登録API（POST /users）を実装したい。
- バリデーション機能付き
- エラーハンドリング含む
- テストファーストで進めたい"
```

**悪い例:**

```
"ユーザー機能を作って"
```

#### 2. 文脈の提供

```
"現在のプロジェクト構成：
- Express.js + MongoDB
- Jest for testing
- 既存のUserモデルあり

新しく追加したい機能：
- ユーザーのプロフィール更新API"
```

#### 3. 制約の明示

```
"制約条件：
- 既存のAPIとの互換性を保つ
- セキュリティを考慮した実装
- パフォーマンス要件: 1秒以内のレスポンス"
```

### プロンプト最適化の反復プロセス

#### ステップ 1: 初回実行

1. **プロンプトを作成**
2. **AI に実行依頼**
3. **結果を評価**

#### ステップ 2: 評価と改善

1. **期待との差分を特定**
2. **プロンプトの問題点を分析**
3. **改善版プロンプトを設計**

#### ステップ 3: 再実行

1. **改善されたプロンプトで実行**
2. **結果の改善度を確認**
3. **必要に応じてさらに調整**

### 実践的なプロンプトテンプレート

#### 機能実装用テンプレート

```
【実装依頼】
機能: [具体的な機能名]
技術スタック: [使用技術の列挙]
要件:
- [要件1]
- [要件2]
- [要件3]

制約:
- [制約1]
- [制約2]

期待する成果物:
- テストケース
- 実装コード
- ドキュメント（必要に応じて）
```

#### デバッグ用テンプレート

```
【デバッグ依頼】
問題: [具体的な問題の説明]
エラーメッセージ: [実際のエラー]
再現手順:
1. [手順1]
2. [手順2]
3. [手順3]

関連コード: [問題のあるコード]
期待する動作: [本来の動作]
```

## レビューと品質管理

### 人力レビューのポイント

#### 1. 仕様との整合性確認

- **設計意図の反映**: 計画した機能が正しく実装されているか
- **要件の網羅**: すべての要件が満たされているか
- **制約の遵守**: 設定した制約が守られているか

#### 2. レビュー対象の優先順位

1. **仕様書**: 要件との整合性が最重要
2. **テストケース**: 仕様の適切なカバレッジ
3. **実装コード**: コード品質と仕様適合性

#### 3. レビューチェックリスト

- [ ] 機能要件が満たされているか
- [ ] エラーハンドリングが適切か
- [ ] セキュリティ要件が考慮されているか
- [ ] パフォーマンス要件が満たされているか
- [ ] テストカバレッジが十分か
- [ ] コードの可読性・保守性は良いか

### AI が期待通りの結果を出さない場合の対処法

#### フォールバック戦略

**基本対応フロー:**

1. **git reset**: 前の状態に戻す
2. **プロンプト調整**: 指示を明確化・詳細化
3. **再実行**: 同じツール（Claude Sonnet 4）で再試行
4. **評価**: 結果の改善度を確認

**git reset のタイミング:**

- 最終コードが期待から大きくズレた場合
- 修正依頼より作り直しの方が早いと判断した場合
- 複数回の修正試行で改善が見られない場合

#### プロンプト調整のテクニック

**具体性の向上:**

```
# 改善前
"このコードを修正して"

# 改善後
"このコードの以下の問題を修正して：
1. バリデーションエラーが適切に処理されていない
2. 戻り値の型が仕様と異なる
3. エッジケースのテストが不足している"
```

**文脈の追加:**

```
# 改善前
"APIを作って"

# 改善後
"Express.jsを使用してRESTful APIを作成：
- エンドポイント: POST /api/users
- リクエスト形式: JSON
- レスポンス形式: JSON
- 既存のUserモデルを使用
- MongoDB Atlas接続済み"
```

## 継続的改善のための記録

### 成功パターンの記録

```markdown
## 成功事例記録

### 日付: 2025-06-21

### タスク: ユーザー認証 API 実装

### 使用したプロンプト:

[具体的なプロンプト内容]

### 結果:

- 一発で期待通りの実装完了
- テストも 100%通過

### 学び:

- 認証系は具体的なライブラリ指定が効果的
- セキュリティ要件を事前に明示することが重要
```

### 失敗パターンの分析

```markdown
## 改善事例記録

### 日付: 2025-06-21

### タスク: 複雑なクエリ最適化

### 問題:

- 最初の実装がパフォーマンス要件を満たさず
- 3 回の修正試行でも改善されず

### 解決策:

- git reset で初期状態に戻す
- プロンプトにパフォーマンス要件を数値で明示
- 参考実装例を提供

### 学び:

- 性能要件は定量的に指定する
- 複雑なタスクは小さく分割する
```

## Claude Sonnet 4 以外のツールとの使い分け

### Gemini（調査用）との詳細な連携

#### Gemini の使用場面と強み

**使用場面:**

- 新しいライブラリの調査
- 技術文書の大量読み込み
- 長いコンテキストを要求される調査タスク
- 複数の情報源からの情報統合

**Gemini の固有の強み:**

- **長いコンテキスト**: 大量の情報を一度に処理可能
- **情報収集能力**: 複数のソースからの情報を効果的に統合
- **調査特化**: 技術情報の深堀りに優れた性能

#### 実践的な連携ワークフロー

**基本的な連携パターン:**

```
1. 調査課題の特定 → Gemini による情報収集
2. 情報の整理・要約 → Gemini による分析
3. 実装計画の立案 → Claude Sonnet 4 に情報提供
4. AITDD実行 → Claude Sonnet 4 による一貫した実装
```

**連携の具体例:**

**例 1: 新しいフレームワーク導入**

```
Gemini:
"Next.js 14の新機能について調査し、既存のExpress.js
アプリケーションからの移行方法を整理してください"

↓ 調査結果をClaude Sonnet 4に提供

Claude Sonnet 4:
"Geminiの調査結果を基に、段階的な移行計画のTODOリストを
作成し、AITDDで最初の機能を実装してください"
```

**例 2: 技術仕様の深掘り調査**

```
Gemini:
"OAuth 2.0とJWT認証の組み合わせについて、セキュリティの
ベストプラクティスと実装パターンを調査してください"

↓ セキュリティ要件を整理してClaude Sonnet 4に提供

Claude Sonnet 4:
"調査結果に基づき、セキュアな認証システムのテストケースから
作成し、AITDD手法で実装してください"
```

#### 使い分けの判断基準

**Gemini を使うべき場面:**

- [ ] 新技術・新ライブラリの初回調査
- [ ] 複数の選択肢の比較検討が必要
- [ ] 長い技術文書の読み込みが必要
- [ ] 複雑な要件の整理が必要
- [ ] 先行事例の調査が必要

**Claude Sonnet 4 を使うべき場面:**

- [ ] 具体的な実装作業
- [ ] テストケースの作成
- [ ] コードレビューと品質チェック
- [ ] デバッグとトラブルシューティング
- [ ] リファクタリング作業

### 実践的な運用ノウハウ

#### プロンプト設計の発展的テクニック

**コンテキスト継続の技術:**

```
# セッション開始時
"以下のプロジェクト構成を記憶してください：
- Express.js + MongoDB + Jest
- ユーザー認証機能実装済み
- 今回の目標：ユーザープロフィール管理機能の追加"

# 継続セッションでの参照
"先ほど伝えたプロジェクト構成を前提に、
プロフィール更新APIのテストケースを作成してください"
```

**段階的詳細化の技術:**

```
# フェーズ1: 概要レベル
"ユーザー管理システムの全体設計を考えてください"

# フェーズ2: 機能レベル
"先ほどの設計から、プロフィール更新機能の詳細仕様を作成してください"

# フェーズ3: 実装レベル
"仕様を基に、テストケースとAPIエンドポイントを実装してください"
```

#### エラー対応の発展的戦略

**プロンプト調整のパターン分析:**

**パターン 1: 具体性不足による失敗**

```
# 失敗例
"APIを作って"
→ 期待と大きく異なる実装

# 成功例
"Express.jsでPOST /api/users/profile APIを作成:
- リクエスト: {name, email, bio}
- バリデーション: emailフォーマット、name必須
- レスポンス: 更新されたユーザー情報
- エラーハンドリング: 400, 401, 500対応"
```

**パターン 2: 技術制約の未指定による失敗**

```
# 失敗例
"データベース操作のコードを書いて"
→ 使用していないORMでの実装

# 成功例
"Mongoose 7.x を使用してUserスキーマの更新操作を実装:
- 既存のUserモデルを使用
- findByIdAndUpdate メソッドを使用
- バリデーションエラーの適切な処理"
```

**プロンプト調整の実践的チェックリスト:**

- [ ] 使用技術スタックの明示
- [ ] 入出力形式の具体的な指定
- [ ] エラーケースの考慮指示
- [ ] 既存コードとの整合性確保
- [ ] パフォーマンス要件の明示
- [ ] セキュリティ考慮事項の指示

#### 継続的改善のための記録方法

**成功パターンのテンプレート化:**

```markdown
## プロンプトテンプレート: API 実装

### 基本形式

"[フレームワーク名]で[HTTP メソッド] [エンドポイント] API を実装:

- リクエスト形式: [詳細]
- レスポンス形式: [詳細]
- バリデーション: [要件]
- エラーハンドリング: [対応するステータスコード]
- 既存の[モデル名]モデルを使用"

### 適用例

[具体的な使用例]

### 期待される結果

[成功時の出力パターン]
```

**失敗パターンの分析記録:**

```markdown
## 改善記録: [日付]

### 問題のあったプロンプト

[元のプロンプト]

### 発生した問題

- [具体的な問題 1]
- [具体的な問題 2]

### 改善後のプロンプト

[修正版プロンプト]

### 改善のポイント

- [改善点 1]
- [改善点 2]

### 今後の適用指針

[他のケースへの応用方法]
```

### 他の AI ツールとの比較の詳細

**なぜ Claude Sonnet 4 に集約するか:**

**1. 一貫性の重要性**

- 同じツールによる統一されたアプローチ
- 学習した最適化が累積的に効果を発揮
- ツール固有の癖や制限への対応が蓄積される

**2. 学習効率の最大化**

- 一つのツールに習熟することで効率向上
- プロンプト設計のノウハウが深化
- エラーパターンと対処法の蓄積

**3. コスト管理の簡素化**

- 複数ツールより単一ツールが管理しやすい
- 予算計画の簡素化
- 使用量監視の一元化

**4. フォールバック戦略の簡潔性**

- 複雑な判断ロジックを避けられる
- 「どのツールで再試行するか」の判断が不要
- 迅速な問題解決が可能

**ツール統合によるメリット:**

```
項目                     統合アプローチ    複数ツールアプローチ
─────────────────────────────────────────────────────
学習コスト               低                高
プロンプト最適化効率     高                低
コスト管理複雑度         低                高
フォールバック判断       シンプル          複雑
ナレッジ蓄積効率         高                分散
─────────────────────────────────────────────────────
総合的な開発効率         最適化            非効率
```

### AI ツール環境の将来対応

#### 新技術への対応方針

**評価基準の体系化:**

- **性能評価**: 既存ワークフローでの性能比較
- **コスト分析**: 総所有コスト（学習コスト含む）の評価
- **統合性評価**: 現在の開発環境との親和性
- **移行コスト**: ツール変更に伴うコストの見積もり

**段階的導入アプローチ:**

1. **情報収集期**: 3-6 ヶ月の観察期間
2. **小規模テスト**: 非重要プロジェクトでの試用
3. **比較評価**: 定量的な性能・効率比較
4. **段階的移行**: 明確な優位性確認後の慎重な移行

**判断の定量化:**

```
新ツール採用の閾値:
- 性能向上: 20%以上
- コスト削減: 15%以上
- 学習コスト: 2週間以内
- 統合コスト: 現在ツールの50%以下
```

## 次のステップ

Claude Sonnet 4 の活用方法を理解したら、次の章「2.3 開発環境とワークフロー構築」で、AITDD を実践するための総合的な開発環境を構築しましょう。TODO 管理から Git ワークフローまで、体系的な開発プロセスを確立します。
