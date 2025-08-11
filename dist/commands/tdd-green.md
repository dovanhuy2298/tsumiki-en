# TDD Green Phase (Implementation)

Execute the Green phase of TDD.

## Preliminary Preparation

Prepare development context:

1. **Search for implementation-related information using @agent-symbol-searcher and read found files**

   - Search for existing similar features and utility functions, and read corresponding files with Read tool
   - Identify implementation patterns and architecture guidelines, and read design documents with Read tool
   - Check dependencies and import paths, and read related files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-red-phase.md` - Check Red phase tests
   - Read related design documents and task files as needed

After loading completion, start Green phase (implementation) work based on prepared context information.

**Use Task tool when executing tests**

## Reliability Level Instructions

When creating implementation code, comment on the verification status with original materials for each implementation content using the following signals:

- 🟢 **Green Signal**: When referring to original materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on original materials
- 🔴 **Red Signal**: When speculation is not based on original materials

## Objective

Please perform **implementation** to make tests created in the Red phase pass.

## Implementation Principles

- **Highest priority on ensuring tests pass**
- Code beauty is secondary (improve in next Refactor phase)
- "Just working" level is OK
- Postpone complex logic, focus on simple implementation
- When tests are hard to pass, use Task tool to investigate failure causes before making implementation plan
- If existing tests fail, fix appropriately based on specifications
- **Mock Usage Restrictions**: Do not write mocks outside test code (implementation code should write actual logic)
- **File Size Management**: Consider file splitting when implementation file exceeds 800 lines
- NEVER: Prohibition of skipping necessary tests
- NEVER: Prohibition of deleting necessary tests
- NEVER: Prohibition of writing mocks/stubs in implementation code
- NEVER: Prohibition of using in-memory storage instead of DB in implementation code
- NEVER: Prohibition of omitting DB operations in implementation code

## 実装時の日本語コメント要件

実装コードには以下の日本語コメントを必ず含めてください：

### 関数・メソッドレベルのコメント

```javascript
/**
 * 【機能概要】: [この関数が何をするかを日本語で説明]
 * 【実装方針】: [なぜこのような実装方法を選んだかを説明]
 * 【テスト対応】: [どのテストケースを通すための実装かを明記]
 * 🟢🟡🔴 信頼性レベル: [この実装が元資料のどの程度に基づいているか]
 * @param {type} paramName - [パラメータの説明]
 * @returns {type} - [戻り値の説明]
 */
function {{function_name}}(paramName) {
  // 【実装内容】: [実装している処理の詳細説明]
}
```

### 処理ブロックレベルのコメント

```javascript
function processData(input) {
  // 【入力値検証】: [入力値の妥当性をチェックする理由と方法] 🟢🟡🔴
  if (!input) {
    throw new Error("入力値が不正です"); // 【エラー処理】: [なぜこのエラーが必要かを説明] 🟢🟡🔴
  }

  // 【データ処理開始】: [メイン処理の開始を明示] 🟢🟡🔴
  // 【処理方針】: [この処理がテストを通すためにどう貢献するかを説明] 🟢🟡🔴
  const result = {
    // 【結果構造】: [戻り値の構造とその理由を説明]
    validData: [],
    invalidData: [],
    errors: [],
  };

  // 【結果返却】: [処理結果を返す理由と内容の説明]
  return result;
}
```

### 変数・定数のコメント

```javascript
// 【定数定義】: [この定数が必要な理由と使用目的]
const MAX_FILE_SIZE = 1024 * 1024; // 【制限値】: ファイルサイズの上限（1MB）を設定

// 【変数初期化】: [この変数がテスト通過のためになぜ必要かを説明]
let processedCount = 0; // 【カウンタ】: 処理済みファイル数を追跡するためのカウンタ
```

### エラーハンドリングのコメント

```javascript
try {
  // 【実処理実行】: [実際の処理を実行する部分の説明]
  const data = processFile(filePath);
} catch (error) {
  // 【エラー捕捉】: [エラーが発生した場合の対処方針]
  // 【テスト要件対応】: [テストで期待されるエラーハンドリングを満たすための処理]
  return {
    success: false,
    error: error.message, // 【エラー情報】: テストで検証されるエラーメッセージを適切に返却
  };
}
```

## 実装例

```javascript
/**
 * 【機能概要】: JSONファイルパスを検証し、有効/無効なパスを分類する
 * 【実装方針】: テストケースを通すために最低限必要な機能のみを実装
 * 【テスト対応】: tdd-red フェーズで作成されたテストケースを通すための実装
 */
function {{function_name}}(input) {
  // 【入力値検証】: 不正な入力値を早期に検出してエラーを防ぐ
  if (!input) {
    // 【エラー処理】: テストで期待されるエラーケースに対応
    throw new Error('入力値が必要です');
  }

  // 【最小限実装】: テストを通すための最もシンプルな実装
  // 【ハードコーディング許可】: リファクタ段階で改善予定のため、現段階では固定値でOK
  return {{simple_return_value}};
}
```

## 段階的実装のガイドライン

1. **まず 1 つのテストケースだけ通す**
   - 【実装戦略】: 複数テストの同時対応は複雑化を招くため避ける
   - 【品質確保】: 1 つずつ確実に実装することで品質を担保
2. **最も簡単な方法で実装**
   - 【シンプル実装】: 複雑なアルゴリズムは後のリファクタで追加
   - 【可読性重視】: 現段階では理解しやすさを最優先
3. **ファイルサイズを意識した実装**
   - 【800 行制限】: 実装ファイルが 800 行を超えた時点で分割を検討
   - 【モジュール設計】: 機能単位でファイルを適切に分離
   - 【関数分割】: 長大な関数は小さな単位に分割して実装
   - 【責任境界】: 各ファイルの責任範囲を明確にして実装
   - 【分割戦略】: 機能・レイヤー・ドメインでファイルを分離
4. **コード品質基準の考慮**
   - 【静的解析対応】: lint や typecheck でエラーが出ない実装を心がける
   - 【フォーマット統一】: プロジェクトの既存フォーマットに合わせた実装
   - 【命名規則遵守】: プロジェクトの命名規則に従った実装
5. **他のテストケースは後回し**
   - 【段階的開発】: TDD の原則に従い、1 ステップずつ進める
   - 【影響範囲限定】: 変更の影響を最小限に抑える
6. **エラーハンドリングも最小限**
   - 【必要最小限】: テストで要求される部分のみ実装
   - 【将来拡張可能】: リファクタ段階で詳細なエラー処理を追加予定
7. **モック使用の制限**
   - 【実装コード制限】: 実装コード内でモック・スタブを使用しない
   - 【テストコード限定】: モックはテストコード内でのみ使用
   - 【実際のロジック実装】: 実装コードは実際の処理を記述する
   - 【依存関係注入】: 必要に応じて依存性注入パターンで実装

## 提供してください

1. **実装コード**: テストを通すコード（必須の日本語コメント付き）
2. **テスト実行結果**: Task ツールを使用して実際にテストが通ることの確認
3. **実装の説明**: どのような考えで実装したか（日本語コメントとの対応関係）
4. **課題の特定**: 現在の実装の問題点（リファクタ対象の明確化）
5. **ファイルサイズチェック**: 実装ファイルの行数確認（800 行超過時の分割計画）
6. **モック使用確認**: 実装コードにモック・スタブが含まれていないことの確認

After implementation completion, execute the following:

1. **Memo File Update**: Update Green phase section of docs/implements/{{task_id}}/{feature_name}-memo.md file
   - Record implementation policy, implementation code, test results, issues and improvements
   - Record in detail for reference in next Refactor phase
2. Save implementation code and design content to docs/implements/{{task_id}}/{feature_name}-green-phase.md (append if existing file exists)
3. Update TODO status (mark Green phase completion)
4. **Automatic Transition Assessment**: Automatically execute `/tdd-refactor` if the following conditions are met
   - All tests confirmed successful using Task tool
   - Implementation is simple and easy to understand
   - Clear refactoring areas exist
   - No functional problems
5. **Manual Confirmation**: If automatic transition conditions are not met, provide the following:
   - "Confirmed tests passed using Task tool."
   - "Current implementation: [brief description]"
   - "Japanese comments included in implementation: [purpose and content of comments]"
   - "Refactoring candidates: [points to improve]"
   - "May we proceed to the next Refactor phase?"

## Quality Assessment Criteria

```
✅ High Quality:
- Test Results: All successful in Task tool execution
- Implementation Quality: Simple and functional
- Refactoring Areas: Clearly identifiable
- Functional Issues: None
- Compile Errors: None
- File Size: 800 lines or less, or clear splitting plan
- Mock Usage: No mocks/stubs in implementation code

⚠️ Needs Improvement:
- Some tests failing (detected by Task tool)
- Implementation too complex
- Refactoring approach unclear
- Functional concerns exist
- Compile errors exist
- File size exceeds 800 lines with unclear splitting plan
- Implementation code contains mocks/stubs
```

## TODO Update Pattern

```
- Mark current TODO "Green Phase (Minimal Implementation)" as "completed"
- Reflect minimal implementation phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Refactor Phase (Quality Improvement)" to TODO
```

Next step: Use `/tdd-refactor` to improve code quality.
