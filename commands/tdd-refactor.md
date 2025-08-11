# TDD Refactor Phase (Code Improvement)

Execute the Refactor phase of TDD.

## Preliminary Preparation

Prepare development context:

1. **Search for refactoring-related information using @agent-symbol-searcher and read found files**

   - Search for existing code styles and best practices, and read style guides with Read tool
   - Identify project-wide architecture patterns, and read design documents with Read tool
   - Check reusable utility functions and components, and read related files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-green-phase.md` - Check Green phase implementation
   - Read related design documents and task files as needed

After loading completion, start Refactor phase (code improvement) work based on prepared context information.

## Reliability Level Instructions

When refactoring, comment on the verification status with original materials for each improvement content using the following signals:

- 🟢 **Green Signal**: When referring to original materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on original materials
- 🔴 **Red Signal**: When speculation is not based on original materials

## Objective

Improve the code implemented in the Green phase from the following perspectives. **Tests must continue to pass** as a prerequisite.

## Improvement Perspectives

### 1. Readability Enhancement

- Improve variable and function names
- Enrich Japanese comments
- Make code structure more understandable

### 2. Eliminate Duplicate Code (DRY Principle)

- Commonalize similar processes
- Extract constants
- Create helper functions

### 3. Design Improvement

- Apply single responsibility principle
- Organize dependencies
- Consider modularization

- NEVER: Write mocks/stubs in implementation code
- NEVER: Use in-memory storage instead of DB in implementation code

### 4. File Size Optimization

- Split and optimize to keep file size under 500 lines
- 長大なファイルの機能別分割
- 適切なモジュール境界の設定

### 5. コード品質の確保

- lint エラーの解消
- typecheck エラーの解消
- フォーマットの統一
- 静的解析ツールのチェッククリア

### 6. セキュリティレビュー

- 脆弱性に繋がる実装の検出と修正
- 入力値検証の強化
- SQL インジェクション対策の確認
- XSS（Cross-Site Scripting）対策の確認
- CSRF（Cross-Site Request Forgery）対策の確認
- データ漏洩リスクの回避
- 認証・認可の適切な実装

### 7. パフォーマンスレビュー

- アルゴリズムの計算量解析
- メモリ使用量の最適化
- 不要な処理の削除
- キャッシュ戦略の検討
- データベースクエリの最適化
- ループ処理の効率化
- 非同期処理の適切な実装

### 8. エラーハンドリングの充実

- 入力値の検証
- 適切なエラーメッセージ
- 例外処理の改善

## リファクタリング時の日本語コメント強化要件

リファクタリングでは既存の日本語コメントを改善し、新たなコメントを追加してください：

### 改善された関数・メソッドのコメント

```javascript
/**
 * 【機能概要】: [リファクタ後の機能の詳細説明]
 * 【改善内容】: [どのような改善を行ったかを説明]
 * 【設計方針】: [なぜこの設計にしたかの理由]
 * 【パフォーマンス】: [性能面での考慮事項]
 * 【保守性】: [メンテナンスしやすくするための工夫]
 * 🟢🟡🔴 信頼性レベル: [この改善が元資料のどの程度に基づいているか]
 * @param {type} paramName - [パラメータの詳細説明と制約]
 * @returns {type} - [戻り値の詳細説明と保証事項]
 */
function improvedFunction(paramName) {
  // 【実装詳細】: [改善された実装の内容と理由]
}
```

### ヘルパー関数・ユーティリティのコメント

```javascript
/**
 * 【ヘルパー関数】: [この関数の役割と作成理由]
 * 【再利用性】: [どのような場面で再利用できるか]
 * 【単一責任】: [この関数が担当する責任の範囲]
 */
function helperFunction(input) {
  // 【処理効率化】: [処理を効率化するための工夫] 🟢🟡🔴
  // 【可読性向上】: [コードの読みやすさを向上させる仕組み] 🟢🟡🔴
}
```

### 定数・設定値のコメント

```javascript
// 【設定定数】: [この定数の役割と設定理由] 🟢🟡🔴
// 【調整可能性】: [将来的に調整が必要になる可能性と方法] 🟢🟡🔴
const IMPROVED_CONSTANT = 100; // 【最適化済み】: パフォーマンステストに基づき最適化 🟢🟡🔴

// 【設定オブジェクト】: [設定をまとめた理由と管理方針]
const CONFIG = {
  // 【各設定項目】: [それぞれの設定値の意味と影響範囲]
  maxRetries: 3, // 【リトライ回数】: 実運用での経験に基づく適切な回数
  timeout: 5000, // 【タイムアウト】: ユーザビリティを考慮した時間設定
};
```

### エラーハンドリング改善のコメント

```javascript
try {
  // 【安全な処理実行】: [例外が発生する可能性と対策]
  const result = riskyOperation();
} catch (error) {
  // 【詳細エラー処理】: [エラーの種類に応じた適切な処理]
  // 【ユーザビリティ】: [ユーザーにとって分かりやすいエラー対応]
  if (error.code === "SPECIFIC_ERROR") {
    // 【特定エラー対応】: [このエラーに特化した処理の理由]
    return handleSpecificError(error);
  }
  // 【一般エラー対応】: [予期しないエラーへの安全な対処]
  return handleGenericError(error);
}
```

## リファクタリングの手順

1. **現在のテストが全て通ることを確認**
   - 【品質保証】: リファクタ前の動作確認
   - 【安全性確保】: 変更による機能破綻の防止
   - 【実行方法】: Task ツールを使用してテストを実行し、結果を詳細に分析
2. **コード・テスト除外チェック**
   - 【.gitignore 確認】: 本来確認対象のコードファイルが除外されていないかチェック
   - 【テスト除外確認】: `describe.skip`, `it.skip`, `test.skip`等でテストが無効化されていないかチェック
   - 【jest 設定確認】: `jest.config.js`や`package.json`の`testPathIgnorePatterns`等でテストファイルが除外されていないかチェック
   - 【実行対象確認】: 実際に実行されるべきテストとコードが適切に対象に含まれているかチェック
3. **開発時生成ファイルのクリーンアップ**
   - 【不要ファイル検出】: 開発中に作成された一時的なファイルを検出・削除
   - 【対象ファイルパターン】: 以下のパターンに該当するファイルを確認
     - `debug-*.js`, `debug-*.ts`: デバッグ用スクリプト
     - `test-*.js`, `test-*.ts`, `temp-*.js`: 一時テストファイル
     - `*.tmp`, `*.temp`, `*.bak`, `*.orig`: 一時・バックアップファイル
     - `*~`, `.DS_Store`: エディタ・システム生成ファイル
     - `test-output-*`, `*.test-output`: テスト出力ファイル
   - 【安全確認】: 削除前に各ファイルの内容を確認し、重要なコードが含まれていないかチェック
   - 【選択的削除】: 不要と判断されたファイルのみを削除し、必要なファイルは保持
   - 【削除ログ】: 削除したファイルと削除理由をログとして記録
   - 【実行手順】:
     1. `find . -name "debug-*" -o -name "test-*" -o -name "temp-*" -o -name "*.tmp" -o -name "*.temp" -o -name "*.bak" -o -name "*.orig" -o -name "*~" -o -name ".DS_Store" | grep -v node_modules` でファイル検出
     2. 各ファイルの内容を Read ツールで確認
     3. 不要と判断されたファイルは削除し、削除理由を記録
4. **セキュリティレビューの実施**
   - 【脆弱性検査】: コード全体のセキュリティホールの特定
   - 【入力検証確認】: 不正な入力値に対する防御機能の確認
   - 【セキュリティガイドライン適用】: 業界標準のセキュリティベストプラクティスの適用
5. **パフォーマンスレビューの実施**
   - 【計算量解析】: アルゴリズムの時間計算量・空間計算量の評価
   - 【ボトルネック特定】: 処理速度やメモリ使用量の問題箇所の特定
   - 【最適化戦略】: 具体的なパフォーマンス改善施策の立案
6. **小さな改善を 1 つずつ適用**
   - 【段階的改善】: 影響範囲を限定した安全な変更
   - 【トレーサビリティ】: 変更内容の追跡可能性確保
7. **各改善後にテストを実行**
   - 【継続的検証】: 改善の度に動作確認
   - 【早期発見】: 問題の早期発見と修正
   - 【実行方法】: Task ツールを使用してテストを実行し、改善の影響を確認
8. **テストが失敗したら即座に戻す**
   - 【迅速復旧】: 問題発生時の素早い対応
   - 【安定性維持】: システムの安定した状態を保持

## 注意事項

- **機能的な変更は行わない**（新機能追加は NG）
- **テストが通らなくなったら即座に修正**
- **一度に大きな変更をしない**
- **日本語コメントの品質も向上させる**
- **品質確認のためのテスト実行時は Task ツールを利用する**

## 提供してください

1. **セキュリティレビュー結果**: 脆弱性の有無と対応策
2. **パフォーマンスレビュー結果**: 性能課題の分析と改善策
3. **改善されたコード**: リファクタリング後のコード（強化された日本語コメント付き）
4. **改善ポイントの説明**: 何をどのように改善したか（セキュリティ・パフォーマンス観点を含む）
5. **テスト実行結果**: Task ツールを使用して全てのテストが引き続き通ることの確認
6. **品質評価**: 現在のコードの品質レベル（セキュリティ・パフォーマンス評価を含む）
7. **コメント改善内容**: 日本語コメントをどのように強化したか

## リファクタリング例

```javascript
// Before: ハードコーディング
function add(a, b) {
  return 5; // とりあえず動く実装
}

// After: 適切な実装（改善された日本語コメント付き）
/**
 * 【機能概要】: 2つの数値を加算し、結果を返す
 * 【改善内容】: ハードコーディングを削除し、実際の加算処理を実装
 * 【設計方針】: 入力値検証と型安全性を重視した設計
 * 【エラー処理】: 不正な入力に対する適切な例外処理を実装
 */
function add(firstNumber, secondNumber) {
  // 【入力値検証】: 数値以外の入力を早期に検出してエラーを防ぐ
  // 【型安全性】: TypeScriptの型チェックと併せて実行時検証を実施
  if (typeof firstNumber !== "number" || typeof secondNumber !== "number") {
    // 【ユーザビリティ】: 開発者にとって分かりやすいエラーメッセージを提供
    throw new Error("引数は数値である必要があります");
  }

  // 【メイン処理】: シンプルで確実な加算処理
  // 【パフォーマンス】: 不要な処理を避けた効率的な実装
  return firstNumber + secondNumber;
}
```

After refactoring completion, execute the following:

1. **Final memo file update**: Update Refactor phase section and overview of docs/implements/{{task_id}}/{feature_name}-memo.md file
   - Record improvement content, security review results, performance review results
   - Record final code and quality evaluation
   - Update current phase in overview section to "completed"
2. Save refactoring content and design improvements to docs/implements/{{task_id}}/{feature_name}-refactor-phase.md (append if existing file exists)
3. Update TODO status (mark Refactor phase completion)
4. **Quality Assessment**: Assess refactoring results quality based on the following criteria
   - Test results: All tests continue to succeed
   - Security: No critical vulnerabilities discovered
   - Performance: No critical performance issues discovered
   - Refactoring quality: Goals achieved
   - Code quality: Improved to appropriate level
5. **Next Step Display**: Regardless of assessment results, display the next recommended command
   - "Next recommended step: Execute completeness verification with `/tdd-verify-complete`."

## Quality Assessment Criteria

```
✅ High Quality:
- Test results: All continue to succeed in Task tool execution
- Security: No critical vulnerabilities
- Performance: No critical performance issues
- Refactoring quality: Goals achieved
- Code quality: Appropriate level
- Documentation: Complete

⚠️ Needs Improvement:
- Some tests failing (detected by Task tool)
- Security vulnerabilities discovered
- Performance issues discovered
- Refactoring goals not achieved
- Quality improvement insufficient
- Documentation deficiencies
```

## TODO Update Pattern

```
- Mark current TODO "Refactor Phase (Quality Improvement)" as "completed"
- Reflect refactoring phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Completeness Verification" to TODO
- Add new TODOs for areas requiring improvement if any
```
