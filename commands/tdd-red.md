# TDD Red Phase (Write Failing Tests)

Execute the Red phase of TDD.

## Preliminary Preparation

Prepare development context:

1. **Search for test implementation-related information using @agent-symbol-searcher and read found files**

   - Search for existing test files and test functions, and read corresponding files with Read tool
   - Identify test setup and mock usage patterns, and read related files with Read tool
   - Check Jest/Mocha and other test framework configurations, and read configuration files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - Read related design documents and task files as needed

After loading completion, start Red phase (failing test creation) work based on prepared context information.

## Target Test Cases

**【Target Test Cases】**: {{test_case_name}}

## Test Case Addition Target Count

**Test Case Addition Target Count**: 10 or more (add all if less than 10 available test cases)

Please select and implement 10 or more test cases from unimplemented test cases. If less than 10 test cases are available, target all available test cases for implementation.
If test cases are already implemented, add tests from test cases written in the test case definition.

## Reliability Level Instructions

When creating test code, comment on the verification status with original materials for each test case content using the following signals:

- 🟢 **Green Signal**: When referring to original materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on original materials
- 🔴 **Red Signal**: When speculation is not based on original materials

## Requirements

- **Language/Framework Used**: {{language_framework}}
- Tests must be created in a failing state
- Test names should be clearly written in Japanese
- Assertions (expected value verification) should be clearly described
- Create by calling functions/methods that are not yet implemented

## Test Code Creation Guidelines

- Structure following Given-When-Then pattern
- Test data preparation (Given)
- Actual process execution (When)
- Result verification (Then)

## 日本語コメント必須要件

テストコードには以下の日本語コメントを必ず含めてください：

### テストケース開始時のコメント

```javascript
describe('{{feature_name}}', () => {
  test('{{test_case_name}}', () => {
    // 【テスト目的】: [このテストで何を確認するかを日本語で明記]
    // 【テスト内容】: [具体的にどのような処理をテストするかを説明]
    // 【期待される動作】: [正常に動作した場合の結果を説明]
    // 🟢🟡🔴 信頼性レベル: [このテストの内容が元資料のどの程度に基づいているか]

    // 【テストデータ準備】: [なぜこのデータを用意するかの理由]
    // 【初期条件設定】: [テスト実行前の状態を説明]
    const input = {{test_input}};

    // 【実際の処理実行】: [どの機能/メソッドを呼び出すかを説明]
    // 【処理内容】: [実行される処理の内容を日本語で説明]
    const result = {{function_name}}(input);

    // 【結果検証】: [何を検証するかを具体的に説明]
    // 【期待値確認】: [期待される結果とその理由を説明]
    expect(result).toBe({{expected_output}}); // 【確認内容】: [この検証で確認している具体的な項目] 🟢🟡🔴
  });
});
```

### セットアップ・クリーンアップのコメント（必要に応じて）

```javascript
beforeEach(() => {
  // 【テスト前準備】: [各テスト実行前に行う準備作業の説明]
  // 【環境初期化】: [テスト環境をクリーンな状態にする理由と方法]
});

afterEach(() => {
  // 【テスト後処理】: [各テスト実行後に行うクリーンアップ作業の説明]
  // 【状態復元】: [次のテストに影響しないよう状態を復元する理由]
});
```

### 各 expect ステートメントのコメント

各 expect ステートメントには必ず日本語コメントを付けてください：

```javascript
expect(result.property).toBe(expectedValue); // 【確認内容】: [この検証で確認している具体的な項目と理由]
expect(result.array).toHaveLength(3); // 【確認内容】: [配列の長さが期待値と一致することを確認する理由]
expect(result.errors).toContain("error message"); // 【確認内容】: [特定のエラーメッセージが含まれることを確認する理由]
```

## 作成するテストコードの例

```javascript
// テストファイル: {{test_file_name}}
describe('{{feature_name}}', () => {
  beforeEach(() => {
    // 【テスト前準備】: 各テスト実行前にテスト環境を初期化し、一貫したテスト条件を保証
    // 【環境初期化】: 前のテストの影響を受けないよう、ファイルシステムの状態をクリーンにリセット
  });

  afterEach(() => {
    // 【テスト後処理】: テスト実行後に作成された一時ファイルやディレクトリを削除
    // 【状態復元】: 次のテストに影響しないよう、システムを元の状態に戻す
  });

  test('{{test_case_name}}', () => {
    // 【テスト目的】: {{test_purpose}}
    // 【テスト内容】: {{test_description}}
    // 【期待される動作】: {{expected_behavior}}
    // 🟢🟡🔴 信頼性レベル: [このテストの内容が元資料のどの程度に基づいているか]

    // 【テストデータ準備】: {{test_data_reason}}
    // 【初期条件設定】: {{initial_condition}}
    const input = {{test_input}};

    // 【実際の処理実行】: {{function_description}}
    // 【処理内容】: {{process_description}}
    const result = {{function_name}}(input);

    // 【結果検証】: {{verification_description}}
    // 【期待値確認】: {{expected_result_reason}}
    expect(result).toBe({{expected_output}}); // 【確認内容】: {{specific_verification_point}}
  });
});
```

## 提供してください

1. **テストコード**: 実行可能な形式で、必須の日本語コメント付き
2. **テスト実行コマンド**: どのように実行するか
3. **期待される失敗メッセージ**: どのようなエラーが出るか
4. **コメントの説明**: 各日本語コメントの意図と目的

テストコード作成後、以下を実行してください：

1. **メモファイル作成・更新**: docs/implements/{{task_id}}/{feature_name}-memo.md ファイルに Red フェーズの内容を作成または追記
   - 既存のメモファイルがある場合は、Red フェーズセクションを更新
   - メモファイルが存在しない場合は新規作成
2. テストコードの設計内容を docs/implements/{{task_id}}/{feature_name}-red-phase.md に保存（既存ファイルがある場合は追記）
3. TODO ステータスを更新（Red フェーズ完了をマーク）
4. **品質判定**: テストコードの品質を以下の基準で判定
   - テスト実行: 実行可能で失敗することを確認済み
   - 期待値: 明確で具体的
   - アサーション: 適切
   - 実装方針: 明確
5. **次のステップ表示**: 判定結果に関わらず、次のお勧めコマンドを表示
   - 「次のお勧めステップ: `/tdd-green` で Green フェーズ（最小実装）を開始します。」

## TDD メモファイル形式

docs/implements/{{task_id}}/{feature_name}-memo.md ファイルの形式：

```markdown
# TDD 開発メモ: {feature_name}

## 概要

- 機能名: [機能名]
- 開発開始: [日時]
- 現在のフェーズ: [Red/Green/Refactor]

## 関連ファイル

- 元タスクファイル: `docs/tasks/{taskファイルのパス}.md`
- 要件定義: `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- テストケース定義: `docs/implements/{{task_id}}/{feature_name}-testcases.md`
- 実装ファイル: `[実装ファイルのパス]`
- テストファイル: `[テストファイルのパス]`

## Red フェーズ（失敗するテスト作成）

### 作成日時

[日時]

### テストケース

[作成したテストケースの概要]

### テストコード

[実際のテストコード]

### 期待される失敗

[どのような失敗が期待されるか]

### 次のフェーズへの要求事項

[Green フェーズで実装すべき内容]

## Green フェーズ（最小実装）

### 実装日時

[日時]

### 実装方針

[最小実装の方針]

### 実装コード

[実際の実装コード]

### テスト結果

[テストが通った結果]

### 課題・改善点

[Refactor フェーズで改善すべき点]

## Refactor フェーズ（品質改善）

### リファクタ日時

[日時]

### 改善内容

[具体的な改善内容]

### セキュリティレビュー

[セキュリティ面での確認結果]

### パフォーマンスレビュー

[パフォーマンス面での確認結果]

### 最終コード

[リファクタ後のコード]

### 品質評価

[最終的な品質評価]
```

## Quality Assessment Criteria

```
✅ High Quality:
- Test execution: Success (confirm that it fails)
- Expected values: Clear and specific
- Assertions: Appropriate
- Implementation approach: Clear

⚠️ Needs Improvement:
- Tests cannot be executed
- Expected values are ambiguous
- Implementation approach is unclear
- Complex test cases
```

## TODO Update Pattern

```
- Mark current TODO "Red Phase (Failing Test Creation)" as "completed"
- Reflect failing test creation phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Green Phase (Minimal Implementation)" to TODO
```

Next step: Use `/tdd-green` to perform minimal implementation to make tests pass.
