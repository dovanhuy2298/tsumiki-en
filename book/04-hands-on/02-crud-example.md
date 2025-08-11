# 4.2 CRUD Operations – Example Implementation

## Learning Objectives

In this chapter, you will implement practical CRUD (Create, Read, Update, Delete) operations and learn to:

- Apply AITDD when integrating multiple features
- Design and implement data management logic
- Experience development close to a real application
- Feel the difference from “vibe coding”

## Project Overview: Simple Task Management System

### Features to Implement

We will build a simple in-memory task management system:

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**CRUD operations:**

- **Create**: Create a new task
- **Read**: Retrieve tasks (all, single, filtered)
- **Update**: Update a task
- **Delete**: Delete a task

### Level of Technical Complexity

Compared to the previous calculator example, we add complexity such as:

- Data persistence (in-memory)
- Operations across multiple entities
- Combined validations
- Diversified error handling

## Hands-on

### Step 1: TODO Creation and Feature Decomposition

A key AITDD finding is that integrating around three features is a practical limit. Therefore, split work into the right granularity.

```markdown
# TODO: Implement CRUD for Task Management System

## Phase 1: Foundation

- [ ] Define Task interface
- [ ] Base structure for TaskManager class
- [ ] Implement in-memory storage

## Phase 2: Basic CRUD (up to 3 features)

- [ ] Create: Create a new task
- [ ] Read: Get all tasks
- [ ] Read: Get a task by ID

## Phase 3: Extended CRUD (remaining features)

- [ ] Update: Update a task
- [ ] Delete: Delete a task
- [ ] Read: Filtered search (e.g., by completion)

## Technical Requirements

- Use TypeScript
- Test with Jest
- In-memory data storage
- Proper error handling
```

**Points:**

- Phasing controls integration complexity
- Each phase is independently testable
- Enables incremental feature addition

### Step 2: Phase 1 Implementation

#### Specification

**Prompt to AI:**

```
Please create a specification for the foundation of the task management system.

Requirements:
- Define the Task interface
- Design the TaskManager class
- In-memory storage functionality
- Ensure TypeScript type-safety

Use the following TODO as reference:
[Paste Phase 1 TODO]
```

**Example generated spec:**

````markdown
# Task Management System – Foundation Spec

## Task interface

```typescript
interface Task {
  id: string; // Unique ID in UUID format
  title: string; // Task title (1–100 chars)
  description: string; // Task description (0–500 chars)
  completed: boolean; // Completion status
  createdAt: Date; // Created at
  updatedAt: Date; // Updated at
}
```
````

## TaskManager class

- In-memory task management
- Persistence via array
- Automatic ID generation
- Basic validation

## Error handling

- Task not found: TaskNotFoundError
- Validation failure: ValidationError
- Invalid ID format: InvalidIdError

```

#### Create Test Cases

**Prompt to AI:**
```

Please create test cases for the foundation based on the following spec:

[Paste the foundation spec]

Test viewpoints:

- Interface type checks
- TaskManager initialization
- Behavior of in-memory storage
- Existence of error classes

```

#### Run Red-Green-Refactor-Validation

Ask AI to implement step-by-step:

1. **Red**: Confirm failing tests
2. **Green**: Minimal foundation implementation
3. **Refactor**: Improve the design
4. **Validation**: Confirm soundness of the foundation

### Step 3: Phase 2 Implementation (Basic CRUD)

#### Notes for Integration

Compared to “vibe coding,” a structured approach is required:

**AITDD approach:**
```

1. Clear specification definition
2. Comprehensive test design
3. Incremental implementation
4. Quality checks
   → Easier integration, more stable quality

```

**Vibe coding (to avoid):**
```

1. Ask AI to implement on the fly
2. Write tests afterward
3. Discover issues during integration
4. Fix manually
   → Breaks around integration of 3 features

````

#### Implement Create

**Spec:**
```markdown
## Task creation

### Method: createTask(taskData)
- Args: { title: string, description: string }
- Returns: Created Task
- Validation:
  - title required, 1–100 chars
  - description 0–500 chars
- Auto-set: id, createdAt, updatedAt, completed=false
````

**Prompt example to AI:**

```
Create test cases and an implementation of createTask according to the following spec:

[Paste the spec]

Requirements:
1. Comprehensive tests (normal, error, boundary)
2. Implement via Red-Green-Refactor-Validation cycle
3. Maintain consistency with foundation code
4. Leverage TypeScript type-safety
```

#### Implement Read

Implement both “get all” and “get by ID” together:

**Spec:**

```markdown
## Task retrieval

### getAllTasks(): Task[]

- Return all tasks as an array
- Empty array when none
- Sorted by createdAt in descending order

### getTaskById(id: string): Task

- Find a task by ID
- If not found: TaskNotFoundError
- Invalid ID format: InvalidIdError
```

### Step 4: Phase 3 Implementation (Extended CRUD)

#### Update

**Support partial updates:**

```typescript
interface TaskUpdateData {
  title?: string;
  description?: string;
  completed?: boolean;
}

updateTask(id: string, updateData: TaskUpdateData): Task
```

#### Delete

Include consideration of logical vs. physical delete:

```typescript
deleteTask(id: string): boolean  // physical delete
// or
softDeleteTask(id: string): Task  // logical delete
```

#### Filtered search

**Filtering:**

```typescript
interface TaskFilter {
  completed?: boolean;
  titleContains?: string;
  createdAfter?: Date;
}

searchTasks(filter: TaskFilter): Task[]
```

### Step 5: Integration Tests and Final Review

#### Integration scenario tests

Design tests assuming real use cases:

```typescript
describe("Task management integration scenario", () => {
  test("Typical task flow", async () => {
    const manager = new TaskManager();

    // 1. Create task
    const task1 = manager.createTask({
      title: "Project planning",
      description: "Requirements and design",
    });

    // 2. Retrieve and verify
    const allTasks = manager.getAllTasks();
    expect(allTasks).toHaveLength(1);

    // 3. Update task
    const updatedTask = manager.updateTask(task1.id, { completed: true });
    expect(updatedTask.completed).toBe(true);

    // 4. Search
    const completedTasks = manager.searchTasks({ completed: true });
    expect(completedTasks).toHaveLength(1);

    // 5. Delete
    const deleted = manager.deleteTask(task1.id);
    expect(deleted).toBe(true);
    expect(manager.getAllTasks()).toHaveLength(0);
  });
});
```

#### Performance tests

**Behavior with large data:**

```typescript
describe("Performance tests", () => {
  test("Operate on 1000 tasks", () => {
    const manager = new TaskManager();

    // Create 1000
    const startTime = Date.now();
    for (let i = 0; i < 1000; i++) {
      manager.createTask({
        title: `Task ${i}`,
        description: `Description ${i}`,
      });
    }
    const createTime = Date.now() - startTime;

    // Search performance
    const searchStart = Date.now();
    const results = manager.searchTasks({ titleContains: "Task1" });
    const searchTime = Date.now() - searchStart;

    expect(createTime).toBeLessThan(1000); // within 1s
    expect(searchTime).toBeLessThan(100); // within 100ms
  });
});
```

## Troubleshooting

### Common issues and countermeasures

#### Issue 1: Inconsistency in AI-generated code

**Symptoms:**

- Unintended changes to existing code
- Interface mismatches
- Different naming conventions

**Countermeasure:**

```
Prompt improvement example:
"Without changing any existing code, add only the new method according to the following interface:
[Provide the exact existing interface]"
```

#### Issue 2: Insufficient test quality

**Symptoms:**

- Lacking error-case tests
- Missing boundary tests
- No integration tests

**Countermeasure:**

```
Review checklist:
- [ ] Cover normal, error, and boundary cases
- [ ] Verify error messages
- [ ] Test with realistic use cases
```

#### Issue 3: Complexity during integration

**Symptoms:**

- Breaks when integrating more than three features
- Debugging becomes difficult
- Tests fail

**Countermeasure:**

```
Incremental integration approach:
1. Implement one feature completely at a time
2. Test combinations of two features
3. Proceed carefully when adding the third feature
4. Split features when issues occur
```

## Best Practices for AI Prompts

### Effective prompt design

**1. Clarify context:**

```
Good example:
"For CRUD operations in the task management system, implement the createTask method according to the spec below.
 Implement it as an addition to the existing Task interface and TaskManager class,
 using in-memory storage.

[Existing code]
[Detailed spec]
[Expected output format]"
```

**2. State constraints explicitly:**

```
Constraint examples:
- "Do not modify existing code"
- "Maximize TypeScript type-safety"
- "Implement proper error handling"
- "Use test-first development"
```

**3. Specify expected quality:**

```
Quality requirements:
- "Implement at production-level quality"
- "Prioritize readability and maintainability"
- "Consider performance"
- "Include appropriate comments"
```

### Prompt templates

Prompt template specialized for CRUD:

```
### CRUD Implementation Prompt Template

**Basics:**
- Feature: [Create/Read/Update/Delete]
- Target entity: [Entity name]
- Language: TypeScript
- Test framework: Jest

**Existing context:**
[Existing interfaces and class definitions]

**Implementation requirements:**
[Concrete specification]

**Constraints:**
- Do not modify existing code
- Maximize type-safety
- Error handling required

**Expected output:**
1. Test cases (normal, error, boundary)
2. Implementation code
3. Usage example
4. Notes and limitations
```

## Quality Management Points

### Code review checklist

**Functional quality:**

- [ ] Meets all specification requirements
- [ ] Proper error handling
- [ ] Correct behavior at boundaries
- [ ] Performance within acceptable range

**Technical quality:**

- [ ] TypeScript type-safety ensured
- [ ] Follows naming conventions
- [ ] Appropriate level of abstraction
- [ ] DRY principle is respected

**Test quality:**

- [ ] Sufficient test coverage
- [ ] Tests are easy to understand
- [ ] Appropriate use of mocks
- [ ] Comprehensive integration tests

**Maintainability:**

- [ ] Readable code
- [ ] Structure easy to change
- [ ] Adequate documentation
- [ ] Designed with extensibility in mind

## Learning Effects in Practice

### Strengths of AITDD (What you will feel)

**Development speed:**

- Traditional CRUD implementation: 1–2 days
- With AITDD: Less than 1 hour
- Experience a **20–48x speedup**

**Quality stability:**

- Quality assurance via test-first
- Optimization during the refactor phase
- Comprehensive checks in the Validation step

**Learning effect:**

- Skills for collaborative development with AI
- Effective prompt design capability
- Increased sensitivity to quality management

### Clear differences from vibe coding

**Ease of integration:**

- Vibe coding: Breaks at integration of three features
- AITDD: Stable via incremental integration

**Debugging efficiency:**

- Vibe coding: Repeating the same issues
- AITDD: Systematic problem solving

**Long-term maintainability:**

- Vibe coding: Needs rework later
- AITDD: Enables continuous development

## Preparation for the Next Chapter

From this CRUD experience, you will gain:

1. **Managing multi-feature integration**
2. **Incremental feature development**
3. **Understanding the importance of quality management**
4. **Practical skills in AI prompt design**

Next, you will apply these skills to API development, a more realistic scenario that introduces external dependencies and asynchronous processing, and learn how AITDD addresses these complexities.

## Summary

Through CRUD implementation, you learned:

**Importance of the process:**

- Value of a structured approach
- Effect of incremental feature addition
- Automation of quality management

**Tips for using AI:**

- Provide clear context
- Specify appropriate constraints
- Continuously improve prompts

**Practical skills:**

- Techniques for integrating multiple features
- Test-driven design thinking
- Review and quality management

With these foundations, you can apply AITDD effectively even in more complex, real-world development projects.

# 4.2 CRUD 操作の実装例

## 学習目標

この章では、より実践的な CRUD（Create, Read, Update, Delete）操作の実装を通じて以下を身につけます：

- 複数機能の統合における AITDD の活用
- データ管理ロジックの設計と実装
- 実際のアプリケーション開発に近い体験
- バイブコーディングとの違いを体感

## プロジェクト概要：シンプルなタスク管理システム

### 実装する機能

メモリベースの簡単なタスク管理システムを作成します：

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**CRUD 操作**：

- **Create**：新しいタスクの作成
- **Read**：タスクの取得（全件、単件、条件検索）
- **Update**：タスクの更新
- **Delete**：タスクの削除

### 技術的複雑さのレベル

前章の計算機能と比較して以下の複雑さが追加されます：

- データの永続化（メモリベース）
- 複数のエンティティ操作
- バリデーションの組み合わせ
- エラーハンドリングの多様化

## 実践ハンズオン

### ステップ 1：TODO 作成と機能分解

AITDD の重要な教訓として、**3 機能程度の統合が実用的な限界**であることが分かっています。そのため、機能を適切な粒度に分解します。

```markdown
# TODO: タスク管理システム CRUD 実装

## フェーズ 1：基盤実装

- [ ] Task インターフェースの定義
- [ ] TaskManager クラスの基本構造
- [ ] メモリストレージの実装

## フェーズ 2：基本 CRUD（3 機能まで）

- [ ] Create: 新しいタスク作成
- [ ] Read: 全タスク取得
- [ ] Read: ID による単件取得

## フェーズ 3：拡張 CRUD（残り機能）

- [ ] Update: タスクの更新
- [ ] Delete: タスクの削除
- [ ] Read: 条件検索（完了状態等）

## 技術要件

- TypeScript 使用
- Jest でのテスト
- メモリベースのデータ管理
- 適切なエラーハンドリング
```

**ポイント**：

- フェーズ分けにより統合の複雑さを制御
- 各フェーズが独立してテスト可能
- 段階的な機能追加が可能

### ステップ 2：フェーズ 1 の実装

#### 仕様作成

**AI へのプロンプト**：

```
タスク管理システムの基盤部分の仕様を作成してください。

要件：
- Taskインターフェースの定義
- TaskManagerクラスの設計
- メモリベースのストレージ機能
- TypeScriptでの型安全性確保

以下のTODOを参考にしてください：
[フェーズ1のTODOを貼り付け]
```

**生成された仕様例**：

````markdown
# タスク管理システム基盤仕様

## Task インターフェース

```typescript
interface Task {
  id: string; // UUID形式のユニークID
  title: string; // タスクタイトル（1-100文字）
  description: string; // タスク説明（0-500文字）
  completed: boolean; // 完了状態
  createdAt: Date; // 作成日時
  updatedAt: Date; // 更新日時
}
```
````

## TaskManager クラス

- メモリベースのタスク管理
- タスクの永続化（配列）
- ID の自動生成
- 基本的なバリデーション

## エラー処理

- タスクが見つからない場合：TaskNotFoundError
- バリデーション失敗：ValidationError
- 不正な ID 形式：InvalidIdError

```

#### テストケース作成

**AIプロンプト**：
```

以下の仕様に基づいて基盤部分のテストケースを作成してください：

[基盤仕様を貼り付け]

テスト観点：

- インターフェースの型チェック
- TaskManager の初期化
- メモリストレージの動作確認
- エラークラスの定義確認

```

#### Red-Green-Refactor-Validation実行

AIにステップバイステップで実装を依頼：

1. **Red**: テスト失敗を確認
2. **Green**: 基盤クラスの最小実装
3. **Refactor**: 設計の改善
4. **Validation**: 基盤の妥当性確認

### ステップ3：フェーズ2の実装（基本CRUD）

#### 統合時の注意点

バイブコーディングとの重要な違いとして、**構造化されたアプローチ**が必要です：

**AITDD方式**：
```

1. 明確な仕様定義
2. 包括的なテスト設計
3. 段階的実装
4. 品質チェック
   → 統合が容易、品質が安定

```

**バイブコーディング方式（避けるべき）**：
```

1. 勢いで AI に実装依頼
2. テストは後付け
3. 統合時に問題発見
4. 手作業での修正
   → 3 機能統合で破綻

````

#### Create機能の実装

**仕様**：
```markdown
## タスク作成機能

### メソッド：createTask(taskData)
- 引数：{ title: string, description: string }
- 戻り値：作成されたTask
- バリデーション：
  - titleは1-100文字必須
  - descriptionは0-500文字
- 自動設定：id, createdAt, updatedAt, completed=false
````

**AI プロンプト例**：

```
以下の仕様でcreateTaskメソッドのテストケースと実装を作成してください：

[仕様を貼り付け]

要求：
1. 包括的なテストケース（正常系、異常系、境界値）
2. Red-Green-Refactor-Validationサイクルで実装
3. 既存の基盤コードとの整合性確保
4. TypeScriptの型安全性活用
```

#### Read 機能の実装

**全件取得と単件取得**を同時に実装：

**仕様**：

```markdown
## タスク取得機能

### getAllTasks(): Task[]

- 全てのタスクを配列で返す
- 空の場合は空配列
- 作成日時の降順でソート

### getTaskById(id: string): Task

- ID でタスクを検索
- 見つからない場合：TaskNotFoundError
- 無効な ID 形式：InvalidIdError
```

### ステップ 4：フェーズ 3 の実装（拡張 CRUD）

#### Update 機能

**部分更新をサポート**：

```typescript
interface TaskUpdateData {
  title?: string;
  description?: string;
  completed?: boolean;
}

updateTask(id: string, updateData: TaskUpdateData): Task
```

#### Delete 機能

**論理削除 vs 物理削除**の検討を含めた実装：

```typescript
deleteTask(id: string): boolean  // 物理削除
// または
softDeleteTask(id: string): Task  // 論理削除
```

#### 条件検索機能

**フィルタリング機能**：

```typescript
interface TaskFilter {
  completed?: boolean;
  titleContains?: string;
  createdAfter?: Date;
}

searchTasks(filter: TaskFilter): Task[]
```

### ステップ 5：統合テストと最終レビュー

#### 統合シナリオテスト

実際のユースケースを想定したテスト：

```typescript
describe("タスク管理統合シナリオ", () => {
  test("一般的なタスク管理フロー", async () => {
    const manager = new TaskManager();

    // 1. タスク作成
    const task1 = manager.createTask({
      title: "プロジェクト計画",
      description: "要件定義と設計",
    });

    // 2. タスク取得・確認
    const allTasks = manager.getAllTasks();
    expect(allTasks).toHaveLength(1);

    // 3. タスク更新
    const updatedTask = manager.updateTask(task1.id, {
      completed: true,
    });
    expect(updatedTask.completed).toBe(true);

    // 4. 検索機能
    const completedTasks = manager.searchTasks({
      completed: true,
    });
    expect(completedTasks).toHaveLength(1);

    // 5. タスク削除
    const deleted = manager.deleteTask(task1.id);
    expect(deleted).toBe(true);
    expect(manager.getAllTasks()).toHaveLength(0);
  });
});
```

#### パフォーマンステスト

**大量データでの動作確認**：

```typescript
describe("パフォーマンステスト", () => {
  test("1000件のタスク操作", () => {
    const manager = new TaskManager();

    // 1000件作成
    const startTime = Date.now();
    for (let i = 0; i < 1000; i++) {
      manager.createTask({
        title: `タスク${i}`,
        description: `説明${i}`,
      });
    }
    const createTime = Date.now() - startTime;

    // 検索性能
    const searchStart = Date.now();
    const results = manager.searchTasks({
      titleContains: "タスク1",
    });
    const searchTime = Date.now() - searchStart;

    expect(createTime).toBeLessThan(1000); // 1秒以内
    expect(searchTime).toBeLessThan(100); // 100ms以内
  });
});
```

## トラブルシューティング

### よくある問題と対処法

#### 問題 1：AI 生成コードの整合性

**症状**：

- 既存コードを意図せず修正
- インターフェースの不整合
- 命名規約の違い

**対処法**：

```
プロンプト改善例：
"既存のコードは一切変更せず、以下のインターフェースに従って新しいメソッドのみを追加してください：
[既存インターフェースを明示]"
```

#### 問題 2：テストの品質不足

**症状**：

- 異常系テストが不足
- 境界値テストが漏れ
- 統合テストがない

**対処法**：

```
レビューチェックリスト：
- [ ] 正常系、異常系、境界値を全てカバー
- [ ] エラーメッセージの確認
- [ ] 実際のユースケースでのテスト
```

#### 問題 3：統合時の複雑さ

**症状**：

- 3 機能以上の統合で破綻
- デバッグが困難
- テストが通らない

**対処法**：

```
段階的統合アプローチ：
1. 1機能ずつ完全に実装
2. 2機能の組み合わせをテスト
3. 3機能目の追加時は慎重に進行
4. 問題発生時は機能を分割
```

## AI プロンプトのベストプラクティス

### 効果的なプロンプト設計

**1. コンテキストの明確化**：

```
良い例：
"タスク管理システムのCRUD操作において、以下の仕様に従ってcreateTaskメソッドを実装してください。
既存のTaskインターフェースとTaskManagerクラスに追加する形で実装し、
メモリベースのストレージを使用してください。

[既存コード]
[詳細仕様]
[期待する出力形式]"
```

**2. 制約の明示**：

```
制約例：
- "既存のコードは変更しないでください"
- "TypeScriptの型安全性を最大限活用してください"
- "エラーハンドリングを適切に実装してください"
- "テストファーストで実装してください"
```

**3. 期待する品質の指定**：

```
品質要求例：
- "プロダクションレベルの品質で実装してください"
- "可読性と保守性を重視してください"
- "パフォーマンスを考慮した実装をしてください"
- "適切なコメントを含めてください"
```

### プロンプトテンプレート

CRUD 操作に特化したプロンプトテンプレート：

```
### CRUD実装プロンプトテンプレート

**基本情報**：
- 機能: [Create/Read/Update/Delete]操作
- 対象エンティティ: [エンティティ名]
- 実装言語: TypeScript
- テストフレームワーク: Jest

**既存コンテキスト**：
[既存のインターフェース・クラス定義]

**実装要件**：
[具体的な仕様]

**制約条件**：
- 既存コードは変更禁止
- 型安全性を最大限活用
- エラーハンドリング必須

**出力要求**：
1. テストケース（正常系・異常系・境界値）
2. 実装コード
3. 使用例
4. 注意点・制限事項
```

## 品質管理のポイント

### コードレビューチェックリスト

**機能的品質**：

- [ ] 仕様要件を全て満たしている
- [ ] エラーハンドリングが適切
- [ ] 境界値での動作が正しい
- [ ] パフォーマンスが許容範囲内

**技術的品質**：

- [ ] TypeScript 型安全性が確保されている
- [ ] 命名規約に従っている
- [ ] 適切な抽象化レベル
- [ ] DRY 原則が守られている

**テスト品質**：

- [ ] テストカバレッジが十分
- [ ] テストが理解しやすい
- [ ] モックの使用が適切
- [ ] 統合テストが包括的

**保守性**：

- [ ] コードが読みやすい
- [ ] 変更が容易な構造
- [ ] ドキュメントが適切
- [ ] 拡張性を考慮した設計

## 実践での学習効果

### AITDD の強み（実感できること）

**開発速度**：

- 従来の CRUD 実装：1 日〜2 日
- AITDD 使用：1 時間弱
- **20〜48 倍の効率化**を体感

**品質安定性**：

- テストファーストによる品質保証
- リファクタリング段階での最適化
- Validation ステップでの総合品質チェック

**学習効果**：

- AI との協調開発スキル
- 効果的なプロンプト設計能力
- 品質管理に対する感度向上

### バイブコーディングとの明確な違い

**統合の容易さ**：

- バイブコーディング：3 機能統合で破綻
- AITDD：段階的統合で安定

**デバッグ効率**：

- バイブコーディング：同じ問題の繰り返し
- AITDD：体系的な問題解決

**長期的な保守性**：

- バイブコーディング：後から手直しが必要
- AITDD：継続的な開発が可能

## 次章への準備

この CRUD 実装体験により、以下のスキルが身に付きます：

1. **複数機能の統合管理**
2. **段階的な機能開発**
3. **品質管理の重要性理解**
4. **AI プロンプト設計の実践力**

次章では、これらのスキルを活用して API 開発という、より実践的な開発シナリオに取り組みます。外部依存や非同期処理などの新たな複雑さに対して AITDD がどのように対応できるかを学習します。

## まとめ

CRUD 操作の実装を通じて以下を学習しました：

**プロセスの重要性**：

- 構造化されたアプローチの価値
- 段階的な機能追加の効果
- 品質管理の自動化

**AI 活用のコツ**：

- 明確なコンテキスト提供
- 適切な制約の指定
- 継続的なプロンプト改善

**実践的スキル**：

- 複数機能の統合技法
- テスト駆動の設計思考
- レビューと品質管理

これらの基盤があることで、より複雑な実開発プロジェクトでも AITDD を効果的に活用できるようになります。
