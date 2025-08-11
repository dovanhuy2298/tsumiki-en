# 5.1 Principles of Effective Prompt Design

## Introduction

In AITDD, the quality of AI output depends heavily on prompt design. With appropriate prompts, you can both improve the quality of AI‑generated code and maximize development efficiency. This chapter covers practical principles and concrete techniques for prompt design.

## Fundamental Principles of Prompt Design

### 1. Embrace an Iterative Improvement Cycle

Rather than expecting perfection from a single prompt, AITDD assumes continuous improvement.

**Basic cycle:**

```text
Create prompt → Execute → Evaluate → Revise → Re‑run
```

**Practical points:**

- Target ~80% quality for the first run; do not aim for perfection
- Analyze each result in detail and identify improvements
- Accumulate small corrections to optimize
- Keep an improvement log and identify recurring patterns

### 2. Build in Confidence Scoring

Have the AI annotate the confidence of its own outputs to efficiently find what needs human review.

**Confidence signals:**

- 🟢 High confidence: Clearly derivable from referenced files
- 🟡 Medium confidence: Reasonable inference but needs confirmation
- 🔴 Needs judgment: Based on AI’s own assumption; requires focused review

### 3. Customize by TDD Step

Optimize prompts for each TDD step (Red, Green, Refactor, Validation).

**Step characteristics:**

- Red: Emphasize clarity and coverage of tests
- Green: Minimal implementation and prevention of unintended changes
- Refactor: Balance quality improvement with behavior preservation
- Validation: Comprehensive quality checks and issue discovery

## Prompt Patterns in AITDD

### Pattern 1: TODO Logging Instruction

Ask AI to record items that must be reviewed as a TODO list.

**Base template:**

````markdown
## Example Prompt Instruction

Execute the following and record the results as a TODO list:

**Tasks to run:**
[Concrete instructions]

**TODO recording format:**

```markdown
## [Step Name] Result TODO

### 🟢 High‑confidence items

- [ ] [file](relative/path) concrete verification points

### 🟡 Medium‑confidence items

- [ ] Validate inferenced content in [file](relative/path)

### 🔴 Items requiring judgment

- [ ] Organization‑specific verification: [file](relative/path)
```
````

**Reference files:** [list of files]
**Output file:** `./todos/[step-name]-check.md`

````

### Pattern 2: Confidence Scoring Instruction

Make AI explicitly state the rationale and confidence for generated content.

**Base template:**
```markdown
## Confidence Scoring Instruction

For each generated item, evaluate confidence by the following criteria:

**Criteria:**
- 🟢 Green: Clearly derivable from the specified references
- 🟡 Yellow: Reasonable inference but needs confirmation
- 🔴 Red: Based on AI’s own assumption

**Targets:**
1. Each feature of the generated code
2. Rationale for chosen test cases
3. Rationale for implementation policy

**Output format:**
- Attach the traffic‑light mark per item
- Specify the exact location in reference files
- Briefly describe the inference
````

### Pattern 3: Progressive Detailing Instruction

Use a staged approach to implement complex features.

**Base template:**

```markdown
## Progressive Implementation Instruction

Proceed in the following order:

**Phase 1: Skeleton**

- Minimal behavior verification
- Skeleton of main functions/classes
- Basic test cases

**Phase 2: Feature Expansion**

- Concrete feature implementation
- Error handling
- Additional test cases

**Phase 3: Optimization**

- Performance improvements
- Code quality improvement
- Comprehensive tests

**Checks after each phase:**

- Report test results
- Perform confidence scoring
- Organize issues for next phase
```

## Practical Components of a Prompt

### Mandatory Elements Checklist

Always include these when creating prompts:

- [ ] **Clear objective**

  - What to achieve, in concrete terms
  - Expected output format

- [ ] **Reference files**

  - Files that serve as ground truth
  - Relationships among files

- [ ] **Confidence scoring instruction**

  - Apply the traffic‑light system
  - Define criteria clearly

- [ ] **Output format**

  - File names and save paths
  - Details (e.g., Markdown format)

- [ ] **Constraints and caveats**
  - What must not be changed
  - Special considerations

### What to Template

**Standard header example:**

```markdown
## [Step Name] Execution Instruction

**Objective:** [concrete objective]
**References:** [file list]
**Output file:** [destination path]

**Confidence scoring:**
Show 🟢🟡🔴 for each generated item

**Constraints:**

- [Important constraints]
```

### What to Customize

Project‑specific elements to customize:

1. **Domain‑specific terms and concepts**

   - Industry‑specific terminology
   - Naming conventions in the project

2. **Constraints of the tech stack**

   - Framework constraints
   - Performance requirements

3. **Organization‑specific rules**
   - Coding standards
   - Security guidelines

## Prompt Techniques for Quality Control

### 1. Prevent Unintended Implementations

**Counter‑techniques:**

```markdown
## Clarify Implementation Constraints

**Allowed change scope:**

- Allowed: [concrete files/functions]
- Forbidden: [working parts of the system]

**Implementation policy:**

- Achieve objectives with minimal changes
- Minimize impact on existing behavior
- Prefer additions; keep existing modifications minimal

**Checklist:**

- [ ] No changes outside the specified scope
- [ ] Existing tests still pass
- [ ] No unintended side effects
```

### 2. Make Reference Relationships Explicit

**Example:**

```markdown
## Reference Relationship Diagram

**Primary references:**

- `spec.md` → Source of requirements
- `existing_test.js` → Confirms existing behavior
- `config.json` → Configuration reference

**Secondary references:**

- `utils.js` → Leverage existing utilities
- `types.ts` → Keep type consistency

**Priority when generating:**

1. Primary references
2. Prefer primary when conflicts arise
3. Record unclear points as questions
```

### 3. Implement Progressive Detailing

**Strategy:**

```markdown
## Progressive Detailing Process

**Level 1: Skeleton**

- Interface definitions
- Function signatures
- Basic error handling

**Level 2: Functionality**

- Business logic
- Detailed error handling
- Input validation

**Level 3: Optimize and Finalize**

- Performance
- Edge‑case handling
- Documentation

**Checks at each level:**

- Test results
- Confidence scoring
- Tasks for the next level
```

## Exercises

### Exercise 1: Create a Basic Prompt

Scenario: Create test cases for user authentication.
References: `auth_spec.md`, `user_model.js`
Expected output: Jest test file

Elements to include:

1. Clear objective
2. Reference files
3. Confidence scoring instruction
4. Output format

### Exercise 2: Design a Progressive Implementation Prompt

Scenario: Implement a REST API endpoint
Requirements: Includes complex data processing
Constraint: Reuse existing middleware

Elements to design:

1. Three implementation phases
2. Deliverables for each phase
3. Checks between phases

## Summary

The essence of effective prompt design:

1. **Iterative improvement**: Assume continuous refinement, not one‑shot perfection
2. **Confidence scoring**: Visualize AI’s inferred parts to review efficiently
3. **Step‑specific optimization**: Tailor prompts to each TDD phase
4. **Quality control**: Prevent unintended implementations and clarify references

In the next section, we will learn concrete techniques for visualizing AI inference that leverage these principles.

# 5.1 効果的なプロンプト設計の原則

## はじめに

AITDD において、AI の出力品質はプロンプト設計に大きく依存します。適切なプロンプト設計により、AI 生成コードの品質向上と開発効率の最大化を実現できます。本章では、実践的なプロンプト設計の原則と具体的な手法を学びます。

## プロンプト設計の基本原則

### 1. 反復改善方式の採用

AITDD では、一度のプロンプト作成で完璧な結果を求めるのではなく、継続的な改善を前提とした設計を行います。

**基本サイクル：**

```
プロンプト作成 → 実行 → 結果評価 → 修正 → 再実行
```

**実践のポイント：**

- 初回は 80%の品質を目標とし、完璧を求めない
- 各実行結果を詳細に分析し、改善点を特定
- 小さな修正を積み重ねて最適化を図る
- 改善ログを記録し、パターンを把握

### 2. 確信度評価の組み込み

AI に自身の出力に対する確信度を評価させることで、レビューすべき箇所を効率的に特定できます。

**確信度の指標：**

- **🟢 高確信度**: 参照ファイルから明確に導出可能
- **🟡 中確信度**: 合理的推測に基づくが確認が必要
- **🔴 要判断**: 独自判断による生成で重点確認が必要

### 3. ステップ別カスタマイズ

TDD の各ステップ（Red、Green、Refactor、Validation）ごとに、プロンプトを最適化します。

**ステップ別の特徴：**

- **Red**: テスト作成の明確性と網羅性を重視
- **Green**: 最小実装と意図しない変更の防止
- **Refactor**: 品質向上と機能保持のバランス
- **Validation**: 総合的な品質チェックと課題発見

## AITDD におけるプロンプトパターン

### パターン 1: TODO 記録指示

AI 生成結果の確認すべき項目を TODO 形式で記録させるパターンです。

**基本テンプレート：**

````markdown
## プロンプトでの指示例

以下の処理を実行し、結果を TODO リストとして記録してください：

**実行内容：**
[具体的な指示内容]

**TODO 記録フォーマット：**

```markdown
## [ステップ名]結果 TODO

### 🟢 高確信度項目

- [ ] [ファイル名](相対パス) の具体的確認内容

### 🟡 中確信度項目

- [ ] [ファイル名](相対パス) の推定内容の妥当性確認

### 🔴 要判断項目

- [ ] 詳細確認: [ファイル名](相対パス) の組織固有内容
```
````

**参照ファイル：** [指定するファイルのリスト]
**出力ファイル：** `./todos/[ステップ名]-check.md`

````

### パターン2: 確信度評価指示

AI生成内容の根拠と確信度を明示させるパターンです。

**基本テンプレート：**
```markdown
## 確信度評価指示

各生成内容について、以下の基準で確信度を評価してください：

**評価基準：**
- 🟢 青信号：参照ファイルから明確に推測可能
- 🟡 黄信号：合理的推測だが要確認
- 🔴 赤信号：独自判断による生成

**評価対象：**
1. 生成したコードの各機能
2. テストケースの選択理由
3. 実装方針の決定根拠

**出力形式：**
- 各項目に信号機マークを付与
- 根拠となる参照ファイルの箇所を明記
- 推測理由を簡潔に説明
````

### パターン 3: 段階的詳細化指示

複雑な実装を段階的に進めるためのパターンです。

**基本テンプレート：**

```markdown
## 段階的実装指示

以下の順序で段階的に実装を進めてください：

**Phase 1: 基本構造**

- 最小限の動作確認
- 主要な関数・クラスの骨格
- 基本的なテストケース

**Phase 2: 機能拡張**

- 具体的な機能実装
- エラーハンドリング
- 追加テストケース

**Phase 3: 最適化**

- パフォーマンス改善
- コード品質向上
- 総合テスト

**各フェーズ後の確認：**

- テスト実行結果の報告
- 確信度評価の実施
- 次フェーズへの課題整理
```

## 実践的なプロンプト構成要素

### 必須要素チェックリスト

プロンプト作成時に必ず含めるべき要素：

- [ ] **明確な目的の定義**

  - 何を実現したいかの明確な説明
  - 期待する出力の具体的な形式

- [ ] **参照ファイルの指定**

  - 根拠とすべきファイルの明記
  - ファイル間の関係性の説明

- [ ] **確信度評価の指示**

  - 信号機システムの適用指示
  - 評価基準の明確な定義

- [ ] **出力形式の指定**

  - ファイル名と保存場所の指定
  - マークダウン形式等の詳細指定

- [ ] **制約・注意事項の明記**
  - 変更してはいけない箇所
  - 特別な考慮事項

### テンプレート化可能な部分

**標準ヘッダー例：**

```markdown
## [ステップ名] 実行指示

**目的：** [具体的な目的]
**参照ファイル：** [ファイルリスト]
**出力ファイル：** [保存先パス]

**確信度評価：**
各生成内容について 🟢🟡🔴 で確信度を表示

**制約事項：**

- [重要な制約事項]
```

### カスタマイズが必要な部分

プロジェクト固有でカスタマイズすべき要素：

1. **ドメイン固有の用語・概念**

   - 業界特有の用語の定義
   - プロジェクト内での命名規則

2. **技術スタック固有の制約**

   - 使用フレームワークの制約
   - パフォーマンス要件

3. **組織固有のルール**
   - コーディング規約
   - セキュリティガイドライン

## 品質確保のためのプロンプト技法

### 1. 想定外実装の防止

**対策技法：**

```markdown
## 実装制約の明確化

**変更許可範囲：**

- 変更可能：[具体的なファイル・関数名]
- 変更禁止：[既存の動作している部分]

**実装方針：**

- 最小限の変更で目的を達成
- 既存機能への影響を最小化
- 新規追加を基本とし、既存修正は最小限

**確認チェック：**

- [ ] 指定範囲外の変更が含まれていないか
- [ ] 既存テストが引き続き成功するか
- [ ] 意図しない副作用が発生していないか
```

### 2. 参照元ファイルとの関係性明示

**関係性明示の例：**

```markdown
## 参照ファイル関係図

**主要参照：**

- `spec.md` → 要件定義の根拠
- `existing_test.js` → 既存仕様の確認
- `config.json` → 設定仕様の参照

**派生参照：**

- `utils.js` → 既存ユーティリティの活用
- `types.ts` → 型定義の整合性確保

**生成時の参照優先度：**

1. 主要参照を最優先
2. 矛盾する内容は主要参照を採用
3. 不明な点は明確に質問として記録
```

### 3. 段階的詳細化の実装

**詳細化戦略：**

```markdown
## 段階的詳細化プロセス

**Level 1: 骨格作成**

- インターフェース定義
- 主要関数のシグネチャ
- 基本的なエラーハンドリング

**Level 2: 機能実装**

- ビジネスロジックの実装
- 詳細なエラーハンドリング
- 入力値検証

**Level 3: 最適化・完成**

- パフォーマンス最適化
- エッジケース対応
- ドキュメント整備

**各レベルでの確認項目：**

- テスト実行結果
- 確信度評価
- 次レベルでの課題
```

## 実践演習

### 演習 1: 基本プロンプトの作成

以下のシナリオでプロンプトを作成してください：

**シナリオ：** ユーザー認証機能のテストケース作成
**参照ファイル：** `auth_spec.md`, `user_model.js`
**期待する出力：** Jest 形式のテストファイル

**作成すべき要素：**

1. 明確な目的定義
2. 参照ファイルの指定
3. 確信度評価の指示
4. 出力形式の指定

### 演習 2: 段階的実装プロンプトの設計

**シナリオ：** REST API エンドポイントの実装
**要件：** 複雑なデータ処理を含む
**制約：** 既存のミドルウェアを活用

**設計すべき要素：**

1. 3 段階の実装フェーズ
2. 各フェーズの成果物
3. フェーズ間の確認項目

## まとめ

効果的なプロンプト設計の核心は以下の通りです：

1. **反復改善**: 一度で完璧を求めず、継続的な改善を前提とする
2. **確信度評価**: AI の推測部分を可視化し、効率的なレビューを実現
3. **ステップ別最適化**: TDD の各段階に応じたプロンプト設計
4. **品質制御**: 想定外実装の防止と参照元の明確化

次のセクションでは、これらの原則を具体的に活用する AI 推論の可視化技術について詳しく学習します。
