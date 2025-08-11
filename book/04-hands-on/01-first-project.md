# 4.1 Your First AITDD Project

## Learning Objectives

In this chapter, you will experience the basic flow of AITDD through an initial small project and learn to:

- Understand the overall AITDD process
- Practice the complete sequence from creating TODOs to completing implementation
- Experience the right balance between AI assistance and human review
- Feel the effectiveness of AITDD on a small, focused feature

## Selecting Your First Project

### Characteristics that fit the first project

**Scope:**

- A small feature that can be completed in about 30–60 minutes
- A simple process with a single responsibility
- A feature with high independence and minimal external dependencies

**Technical complexity:**

- Use a familiar tech stack
- Content you can picture how to implement
- Debugging remains relatively simple

**Learning effect:**

- Experience each AITDD step end to end
- Easy to gain an initial success experience
- Acts as a foundation you can expand later

### Recommended project examples

**1. Simple calculation feature**

```
Example: Tax-included price calculator
- Input: item price, tax rate
- Output: tax-included price, tax amount
- Processing: basic numeric computation
```

**2. Data transformation feature**

```
Example: CSV-to-JSON format conversion
- Input: CSV string
- Output: JSON data
- Processing: parsing and transformation logic
```

**3. Validation feature**

```
Example: Email address validation
- Input: string
- Output: validation result (boolean)
- Processing: format check via regular expressions
```

## Hands-on: Tax-Included Price Calculator

In this example, you will learn the AITDD process by implementing a tax-included price calculator.

### Step 1: Create TODO

Create a `todo.md` file in your project and clarify the features to implement.

```markdown
# TODO: Implement tax-included price calculator

## Features to implement

- [ ] Function to calculate tax-included price from item price and tax rate
- [ ] Function to calculate tax amount
- [ ] Input validation
- [ ] Error handling (negative values, null, etc.)

## Completion criteria

- Works correctly with normal values
- Proper error handling for abnormal values
- Achieve 100% test coverage
```

**Points:**

- Break down features concretely
- Clarify completion criteria
- Adjust granularity so each item takes about 30–60 minutes

### Step 2: Write the Specification

Based on the TODO, create a detailed specification in collaboration with AI.

**Prompt example to AI:**

```
From the following TODO, create a detailed specification document:

[paste contents of todo.md]

Please include:
- Function signatures (parameters, return values)
- Constraints on inputs
- Error conditions and handling
- Details of calculation logic
```

**Expected specification (example):**

```markdown
# Tax-Included Price Calculator – Specification

## Function specs

### calculateTaxIncludedPrice(price: number, taxRate: number): number

- Calculate tax-included price from item price and tax rate
- Parameters:
  - price: item price (number ≥ 0)
  - taxRate: tax rate (decimal from 0 to 1 inclusive, e.g., 0.1 = 10%)
- Return: tax-included price (rounded to 1 decimal place)

### calculateTax(price: number, taxRate: number): number

- Calculate tax amount
- Parameters/returns same as above
- Return: tax amount (rounded to 1 decimal place)

## Error handling

- Negative price: Error("Price must be greater than or equal to 0")
- Tax rate out of range: Error("Tax rate must be between 0 and 1 inclusive")
- null/undefined: Error("Please input valid numbers")
```

**Human review checkpoints:**

- [ ] Does it reflect the intent of the TODO correctly?
- [ ] Is each function’s responsibility appropriate?
- [ ] Are error conditions comprehensive?
- [ ] Is it feasible to implement?

### Step 3: Create Test Cases

Ask AI to create test cases based on the specification.

**Prompt example to AI:**

```
Create comprehensive test cases based on the following specification:

[paste the specification]

Design test cases from the following viewpoints:
- Normal cases: behavior with general values
- Boundary values: behavior at boundaries such as 0 and 1
- Error cases: behavior for error conditions
- Test framework: Jest
```

**Generated test example:**

```typescript
import { calculateTaxIncludedPrice, calculateTax } from "./taxCalculator";

describe("Tax-Included Price Calculator", () => {
  describe("calculateTaxIncludedPrice", () => {
    // Normal
    test("General tax-included price calculation", () => {
      expect(calculateTaxIncludedPrice(1000, 0.1)).toBe(1100);
      expect(calculateTaxIncludedPrice(150, 0.08)).toBe(162);
    });

    // Boundary
    test("Price 0", () => {
      expect(calculateTaxIncludedPrice(0, 0.1)).toBe(0);
    });

    test("Tax rate 0", () => {
      expect(calculateTaxIncludedPrice(1000, 0)).toBe(1000);
    });

    // Error
    test("Error on negative price", () => {
      expect(() => calculateTaxIncludedPrice(-100, 0.1)).toThrow(
        "Price must be greater than or equal to 0"
      );
    });

    test("Error when tax rate is out of range", () => {
      expect(() => calculateTaxIncludedPrice(1000, -0.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
      expect(() => calculateTaxIncludedPrice(1000, 1.1)).toThrow(
        "Tax rate must be between 0 and 1 inclusive"
      );
    });
  });

  describe("calculateTax", () => {
    test("Tax amount calculation", () => {
      expect(calculateTax(1000, 0.1)).toBe(100);
      expect(calculateTax(150, 0.08)).toBe(12);
    });
  });
});
```

**Human review checkpoints:**

- [ ] Do test cases cover all specification requirements?
- [ ] Are error-case tests appropriate?
- [ ] Are expected values correct?
- [ ] Any test cases you should add?

### Step 4: Red-Green-Refactor-Validation Cycle

#### 4.1 Red (Failing tests)

Run tests and confirm expected failures.

```bash
npm test
```

Expected output:

```
FAIL  src/taxCalculator.test.ts
  ✕ calculateTaxIncludedPrice is not defined
  ✕ calculateTax is not defined
```

#### 4.2 Green (Minimal implementation)

Ask AI for the minimal implementation.

**Prompt example to AI:**

```
Create the minimal implementation that passes the following test cases:

[paste the test cases]

Requirements:
- Prioritize passing tests
- Do not over-engineer
- Implement proper error handling
```

**Generated implementation example:**

```typescript
export function calculateTaxIncludedPrice(
  price: number,
  taxRate: number
): number {
  validateInputs(price, taxRate);
  const tax = calculateTax(price, taxRate);
  return Math.round((price + tax) * 10) / 10;
}

export function calculateTax(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  return Math.round(price * taxRate * 10) / 10;
}

function validateInputs(price: number, taxRate: number): void {
  if (price < 0) {
    throw new Error("Price must be greater than or equal to 0");
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error("Tax rate must be between 0 and 1 inclusive");
  }
}
```

Run tests:

```bash
npm test
# Confirm all tests pass
```

#### 4.3 Refactor

Ask AI to improve the code.

**Prompt example to AI:**

```
Please refactor the following code:

[paste the implementation]

Improve:
- Code readability
- Separation of responsibilities
- Performance
- TypeScript type-safety
```

#### 4.4 Validation

Ask AI to verify the implementation comprehensively.

**Prompt example to AI:**

```
Please validate the following implementation comprehensively:

[paste the refactored code]
[paste the test cases]

Validation viewpoints:
- Consistency with specification
- Code quality (readability, maintainability)
- Validity of test coverage
- Potential issues
- Performance concerns
```

### Step 5: Final Review

**Human review checklist:**

**Functionality:**

- [ ] All tests pass
- [ ] Specification requirements are met
- [ ] Error handling is appropriate

**Code quality:**

- [ ] High readability
- [ ] Proper separation of responsibilities
- [ ] Follows naming conventions
- [ ] Proper TypeScript typing

**Maintainability:**

- [ ] Easy to extend
- [ ] Tests are maintainable
- [ ] Documentation is adequate

## Reflection and Learning Points

### Success patterns

**Process adherence:**

- Execute each step without skipping
- Ensure human reviews are performed
- Don’t accept AI output blindly

**Effective AI usage:**

- Use clear and specific prompts
- Provide sufficient context
- Specify the expected output format

### Common failure patterns and countermeasures

**Failure 1: Ambiguous prompts**

```
❌ Bad: "Create a tax calculation function"
✅ Good: "Create a function to calculate tax-included price from item price and tax rate, following this specification: [detailed spec]"
```

**Failure 2: Skipping human review**

```
❌ Problem: Using AI output as-is
✅ Fix: Always confirm consistency with the specification
```

**Failure 3: Weak test design**

```
❌ Problem: Only normal-case tests
✅ Fix: Comprehensive tests including boundary and error cases
```

### Preparation for the Next Step

Skills you should acquire from this first project:

- The rhythm of collaborative development with AI
- The importance of quality management
- Basics of prompt design
- Understanding review checkpoints

In the next chapter, you will develop CRUD operations with higher complexity and build applied AITDD skills.

## Summary

In your first AITDD project, focus on:

1. **Gaining a success experience**: Experience the complete process even on a small scope
2. **Establishing basic habits**: Understand the importance of each step
3. **Developing feel for AI usage**: Basics of effective prompt design
4. **Building quality awareness**: Appreciate the value of human review

With these foundations, you will be able to leverage AITDD effectively even in more complex projects.

# 4.1 最初の AITDD プロジェクト

## 学習目標

この章では、AITDD の基本的な流れを体験できる初回プロジェクトを通じて以下を身につけます：

- AITDD プロセス全体の流れを理解する
- TODO 作成から実装完了までの一連の手順を実践する
- AI 支援と人力レビューの適切なバランスを体験する
- 小規模な機能で AITDD の効果を実感する

## プロジェクトの選択基準

### 最初のプロジェクトに適した特徴

**実装範囲**：

- 30 分〜1 時間程度で完成する小規模機能
- 単一の責任を持つシンプルな処理
- 外部依存が少ない独立性の高い機能

**技術的複雑さ**：

- 慣れ親しんだ技術スタックを使用
- 実装方法がイメージできる内容
- デバッグが比較的簡単な処理

**学習効果**：

- AITDD の各ステップを体験できる
- 成功体験を得やすい内容
- 後から拡張可能な基盤となる機能

### 推奨プロジェクト例

**1. 簡単な計算機能**

```
例：税込価格計算機
- 入力：商品価格、税率
- 出力：税込価格、税額
- 処理：基本的な数値計算
```

**2. データ変換機能**

```
例：CSVデータのフォーマット変換
- 入力：CSV文字列
- 出力：JSON形式データ
- 処理：パースと変換ロジック
```

**3. バリデーション機能**

```
例：メールアドレス検証
- 入力：文字列
- 出力：検証結果（真偽値）
- 処理：正規表現による形式チェック
```

## 実践ハンズオン：税込価格計算機

この例では、税込価格計算機の実装を通じて AITDD プロセスを学習します。

### ステップ 1：TODO 作成

プロジェクト内に todo.md ファイルを作成し、実装する機能を明確化します。

```markdown
# TODO: 税込価格計算機の実装

## 実装する機能

- [ ] 商品価格と税率から税込価格を計算する関数
- [ ] 税額を計算する関数
- [ ] 入力値のバリデーション
- [ ] エラーハンドリング（負の値、null 値等）

## 完了基準

- 正常な値での計算が正しく動作する
- 異常値に対して適切なエラーハンドリングができる
- テストカバレッジ 100%を達成する
```

**ポイント**：

- 機能を具体的に分解する
- 完了基準を明確にする
- 30 分〜1 時間で完成する粒度に調整する

### ステップ 2：仕様作成

TODO を基に詳細な仕様を AI と協力して作成します。

**AI へのプロンプト例**：

```
以下のTODOから詳細な仕様書を作成してください：

[todo.mdの内容を貼り付け]

仕様書には以下を含めてください：
- 関数の署名（引数、戻り値）
- 入力値の制約
- エラー条件と対応
- 計算ロジックの詳細
```

**期待される仕様書（例）**：

```markdown
# 税込価格計算機 仕様書

## 関数仕様

### calculateTaxIncludedPrice(price: number, taxRate: number): number

- 商品価格と税率から税込価格を計算
- 引数：
  - price: 商品価格（0 以上の数値）
  - taxRate: 税率（0 以上 1 以下の小数、例：0.1 = 10%）
- 戻り値：税込価格（小数第一位で四捨五入）

### calculateTax(price: number, taxRate: number): number

- 税額を計算
- 引数・戻り値は上記と同様
- 戻り値：税額（小数第一位で四捨五入）

## エラー処理

- 負の価格：Error("価格は 0 以上である必要があります")
- 税率が範囲外：Error("税率は 0 以上 1 以下である必要があります")
- null/undefined：Error("有効な数値を入力してください")
```

**人力レビューのチェックポイント**：

- [ ] TODO の意図が正しく反映されているか
- [ ] 関数の責任範囲が適切か
- [ ] エラー条件が網羅されているか
- [ ] 実装可能な内容か

### ステップ 3：テストケース作成

仕様書を基にテストケースを AI に作成させます。

**AI へのプロンプト例**：

```
以下の仕様書に基づいて包括的なテストケースを作成してください：

[仕様書の内容を貼り付け]

以下の観点でテストケースを作成してください：
- 正常系：一般的な値での動作確認
- 境界値：0、1などの境界での動作確認
- 異常系：エラー条件の動作確認
- テストフレームワーク：Jest を使用
```

**生成されたテストケース例**：

```typescript
import { calculateTaxIncludedPrice, calculateTax } from "./taxCalculator";

describe("税込価格計算機", () => {
  describe("calculateTaxIncludedPrice", () => {
    // 正常系
    test("一般的な税込価格計算", () => {
      expect(calculateTaxIncludedPrice(1000, 0.1)).toBe(1100);
      expect(calculateTaxIncludedPrice(150, 0.08)).toBe(162);
    });

    // 境界値
    test("価格0の場合", () => {
      expect(calculateTaxIncludedPrice(0, 0.1)).toBe(0);
    });

    test("税率0の場合", () => {
      expect(calculateTaxIncludedPrice(1000, 0)).toBe(1000);
    });

    // 異常系
    test("負の価格でエラー", () => {
      expect(() => calculateTaxIncludedPrice(-100, 0.1)).toThrow(
        "価格は0以上である必要があります"
      );
    });

    test("税率が範囲外でエラー", () => {
      expect(() => calculateTaxIncludedPrice(1000, -0.1)).toThrow(
        "税率は0以上1以下である必要があります"
      );
      expect(() => calculateTaxIncludedPrice(1000, 1.1)).toThrow(
        "税率は0以上1以下である必要があります"
      );
    });
  });

  describe("calculateTax", () => {
    test("税額計算", () => {
      expect(calculateTax(1000, 0.1)).toBe(100);
      expect(calculateTax(150, 0.08)).toBe(12);
    });
  });
});
```

**人力レビューのチェックポイント**：

- [ ] 仕様の要件を全てカバーしているか
- [ ] 異常系のテストが適切か
- [ ] テストの期待値が正しいか
- [ ] 追加すべきテストケースはないか

### ステップ 4：Red-Green-Refactor-Validation サイクル

#### 4.1 Red（テスト失敗）

テストを実行して期待する失敗を確認します。

```bash
npm test
```

期待される出力：

```
FAIL  src/taxCalculator.test.ts
  ✕ calculateTaxIncludedPrice is not defined
  ✕ calculateTax is not defined
```

#### 4.2 Green（最小実装）

AI に最小限の実装を依頼します。

**AI へのプロンプト例**：

```
以下のテストケースを通る最小限の実装を作成してください：

[テストケースを貼り付け]

要件：
- テストを通すことを最優先
- 過度に複雑にしない
- エラーハンドリングを適切に実装
```

**生成された実装例**：

```typescript
export function calculateTaxIncludedPrice(
  price: number,
  taxRate: number
): number {
  validateInputs(price, taxRate);
  const tax = calculateTax(price, taxRate);
  return Math.round((price + tax) * 10) / 10;
}

export function calculateTax(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  return Math.round(price * taxRate * 10) / 10;
}

function validateInputs(price: number, taxRate: number): void {
  if (price < 0) {
    throw new Error("価格は0以上である必要があります");
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error("税率は0以上1以下である必要があります");
  }
}
```

テスト実行：

```bash
npm test
# 全てのテストがパスすることを確認
```

#### 4.3 Refactor（リファクタリング）

AI にコード改善を依頼します。

**AI へのプロンプト例**：

```
以下のコードをリファクタリングしてください：

[実装コードを貼り付け]

改善点：
- コードの可読性向上
- 関数の責任分割
- パフォーマンス最適化
- TypeScriptの型安全性向上
```

#### 4.4 Validation（検証）

AI に実装の妥当性を検証させます。

**AI へのプロンプト例**：

```
以下の実装について包括的に検証してください：

[リファクタリング後のコードを貼り付け]
[テストケースも貼り付け]

検証観点：
- 仕様要件との整合性
- コード品質（可読性、保守性）
- テストカバレッジの妥当性
- 潜在的な問題点
- パフォーマンス上の懸念
```

### ステップ 5：最終レビュー

**人力レビューのチェックポイント**：

**機能面**：

- [ ] 全てのテストがパスしている
- [ ] 仕様要件が満たされている
- [ ] エラーハンドリングが適切

**コード品質**：

- [ ] 可読性が高い
- [ ] 適切な関数分割がされている
- [ ] 命名規約に従っている
- [ ] TypeScript の型定義が適切

**保守性**：

- [ ] 拡張しやすい構造
- [ ] テストが保守しやすい
- [ ] ドキュメントが適切

## 振り返りと学習のポイント

### 成功のパターン

**プロセス遵守**：

- 各ステップを飛ばさずに実行する
- 人力レビューを確実に行う
- AI 出力を鵜呑みにしない

**適切な AI 活用**：

- 明確で具体的なプロンプトを使う
- コンテキストを十分に提供する
- 期待する出力形式を指定する

### よくある失敗パターンと対策

**失敗 1：プロンプトが曖昧**

```
❌ 悪い例：「税計算の関数を作って」
✅ 良い例：「商品価格と税率から税込価格を計算する関数を、以下の仕様に従って作成してください：[詳細仕様]」
```

**失敗 2：人力レビューを省略**

```
❌ 問題：AIの出力をそのまま使用
✅ 対策：必ず仕様との整合性を確認する
```

**失敗 3：テスト設計が不十分**

```
❌ 問題：正常系のテストのみ
✅ 対策：境界値、異常系を含む包括的なテスト
```

### 次のステップへの準備

この初回プロジェクトで習得すべき感覚：

- AI との協調開発のリズム
- 品質管理の重要性
- プロンプト設計の基本
- レビューポイントの理解

次章では、より複雑な CRUD 操作の実装を通じて、AITDD の応用力を身につけます。

## まとめ

最初の AITDD プロジェクトでは以下を重視します：

1. **成功体験の獲得**：小規模でも完全なプロセスを体験
2. **基本習慣の確立**：各ステップの重要性を理解
3. **AI 活用の感覚**：適切なプロンプト設計の基礎
4. **品質意識の醸成**：人力レビューの価値を実感

これらの基盤があることで、より複雑なプロジェクトでも AITDD を効果的に活用できるようになります。
