# TDD Test Case Completeness Verification

Verify whether test case implementation is completely finished in TDD development.

## Purpose of Verification

After refactoring, confirm that all planned test cases have been implemented to prevent implementation gaps.

## Important Principles

**⚠️ No modifications in this process**

- Do not make any code or test modifications in this verification phase
- If problems are discovered, record them in the memo file
- Leave modification work to later processes (next TDD cycle or separate tasks)
- Focus on verification, recording, and reporting

## Verification Procedure

### 1. Confirm Green State of Existing Tests

- **Required**: Confirm that all existing tests are successful
- Execute `npm test` or `jest` to check test results
- **If test failures exist**: Record in memo file and handle fixes in later processes
- **Modification prohibited in this process**: Do not fix test failures even if discovered here
- Record test state and proceed to next step

### 2. Preliminary Preparation

Prepare verification context:

1. **Search for verification-related information using @agent-symbol-searcher and read found files**

   - Search for planned test cases and features for completion, and read corresponding files with Read tool
   - Check existing test coverage and quality standards, and read related files with Read tool
   - Identify marking patterns for implementation completion tasks, and read task files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-refactor-phase.md` - Check Refactor phase results
   - Original task file (`docs/tasks/{taskfile}.md`) - Check task completion status

After loading completion, start test case completeness verification based on prepared context information.

### 2. Check Implemented Test Cases

- Check current test files
- Count number of implemented test cases
- Compare each test case content with plans

### 3. 実装状況の分析と TODO.md 更新判定

以下の形式で分析結果を提供してください：

```
## テストケース実装状況

### 📋 TODO.md対象タスク確認
- **対象タスク**: [現在のTDD開発対象タスク名]
- **現在のステータス**: [未完了/部分完了/完了済み]
- **完了マーク要否**: [要/不要]

### 📋 予定テストケース（要件定義より）
- **総数**: [予定していた総テストケース数]
- **分類**:
  - 正常系: [数]個
  - 異常系: [数]個
  - エッジケース: [数]個
  - その他: [数]個

### ✅ 実装済みテストケース
- **総数**: [実装済み総テストケース数]
- **成功率**: [通過テスト数]/[実装テスト数] ([成功率]%)

### ❌ 未実装テストケース（[数]個）
1. **テストケース名**: [予定していたが未実装のテスト]
   - **種類**: [正常系/異常系/エッジケース]
   - **内容**: [テストの詳細内容]
   - **重要度**: [高/中/低]
   - **要件項目**: [対応する要件定義書の項目]

2. **テストケース名**: [2つ目の未実装テスト]
   ...

### 📋 要件定義書網羅性チェック
- **要件項目総数**: [要件定義書の総項目数]
- **実装済み項目**: [実装・テスト済みの項目数]
- **要件網羅率**: [実装済み]/[総数] = [網羅率]%

#### 未網羅の要件項目（[数]個）
1. **要件項目**: [未実装の要件項目名]
   - **分類**: [入力パラメータ/出力仕様/制約条件/使用例/エラーケース等]
   - **内容**: [要件の詳細内容]
   - **実装不足の理由**: [なぜ未実装なのか]
   - **対応の必要性**: [必須/推奨/任意]

2. **要件項目**: [2つ目の未網羅項目]
   ...

### 📊 実装率
- **全体実装率**: [実装数]/[予定数] = [実装率]%
- **正常系実装率**: [実装数]/[予定数] = [実装率]%
- **異常系実装率**: [実装数]/[予定数] = [実装率]%
- **エッジケース実装率**: [実装数]/[予定数] = [実装率]%
```

### 4. 判定基準

#### ✅ 完全実装済み（自動で次ステップ）

```
- 既存テスト状態: すべてグリーン
- 要件網羅率: 100%（全要件項目実装・テスト済み）
- テスト成功率: 100%
- 未実装重要要件: 0個
- 品質基準: 要件定義に対する完全な充実度を達成
```

#### ⚠️ 実装不足あり（追加実装必要）

```
- 既存テスト状態: 失敗テストあり または
- 要件網羅率: 100%未満（要件定義の項目に対する実装不足）
- 重要な要件項目が未実装・未テスト
- 要件充実度に品質リスクあり
```

### 5. 検証結果のメモファイル記録と TODO.md 更新

#### メモファイルの統合更新

検証完了後、`docs/implements/{{task_id}}/{feature_name}-memo.md` の既存内容を整理・統合し、以下の情報に更新：

```markdown
# [機能名] TDD 開発完了記録

## 確認すべきドキュメント

- `docs/tasks/{taskファイルのパス}.md`
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

## 🎯 最終結果 ([日時])

- **実装率**: [数]% ([実装数]/[予定数]テストケース)
- **品質判定**: [合格/不合格]
- **TODO 更新**: [✅ 完了マーク追加/要改善]

## 💡 重要な技術学習

### 実装パターン

[今後再利用できる重要な実装手法]

### テスト設計

[効果的だったテストアプローチ]

### 品質保証

[品質確保で重要だった観点]

## ⚠️ 注意点・修正が必要な項目（該当時のみ）

[実装時の重要な注意事項や未完了項目]

### 🔧 後工程での修正対象

#### テスト失敗

- [失敗しているテストケース名]
- **失敗内容**: [具体的な失敗内容]
- **修正方針**: [推奨される修正方法]

#### 実装不足

- [未実装の機能や要件]
- **不足内容**: [具体的な不足内容]
- **対応方針**: [推奨される対応方法]

#### 品質改善

- [品質向上が必要な箇所]
- **改善内容**: [具体的な改善内容]
- **改善方針**: [推奨される改善方法]

---

_既存のメモ内容から重要な情報を統合し、重複・詳細な経過記録は削除_
```

**統合更新ルール:**

1. **重要情報保持**: 既存メモの技術的学習ポイント・再利用可能パターンを統合
2. **重複削除**: 類似の記録・詳細な経過は最新情報に集約
3. **簡潔化**: 日付・数値などの詳細は最終結果のみ保持
4. **再利用重視**: 今後の開発で参考になる情報を優先して残す
5. **関連情報重視**: 仕様情報などの情報は優先して残す

#### 元タスクファイル完了マーク自動更新

検証が完了した場合、以下の手順で元タスクファイルを自動更新：

1. **完了タスクの特定**: 現在の TDD 開発対象タスクを元タスクファイルから特定
2. **完了マーク追加**: 該当タスクに `✅ **完了**` マークを追加
3. **完了理由記載**: `(TDD開発完了 - [テスト数]テストケース全通過)` を追記
4. **サブタスク更新**: 関連するサブタスクにも `[x]` チェックマークを追加

例：

```markdown
### 1. JSON ファイルパス引数処理機能 ✅ **完了** (TDD 開発完了 - 15 テストケース全通過)

- [x] コマンドライン引数で JSON ファイルパスを受け取る機能を追加
- [x] 複数の JSON ファイルパスに対応（sample/ディレクトリ全体の読み込み）
- [x] 引数バリデーション機能
```

### 6. 対応アクション

#### 完全実装済みの場合

以下のメッセージと共に次のお勧めコマンドを表示：

```
✅ テストケース完全性検証: 合格
- 予定テストケース: [数]個すべて実装済み
- テスト成功率: 100%
- 品質基準: 達成

次のお勧めステップ: `/tdd-cycle` で次のTDDサイクルを開始します。
```

**メモファイル記録**: 検証結果をメモファイルに自動追記する。
**元タスクファイル更新**: 完了したタスクに ✅ 完了マークを自動追加する。

#### 実装不足がある場合

以下のメッセージを提供し、状況を記録する：

```
⚠️ テストケース実装不足を検出

未実装テストケース（[数]個）があります。
以下の内容をmemoファイルに記録しました：

[未実装テストケースのリスト]

【重要】この工程では修正を行いません。
修正が必要な内容はmemoファイルに記載され、後の工程で対応されます。

現状の記録を完了し、次のステップに進みます。
```

**メモファイル記録**: 実装不足の検証結果と修正方針をメモファイルに詳細記録する。
**元タスクファイル更新**: 実装不足の場合でも、部分完了したタスクがあれば適切にマークする。
**修正作業禁止**: この工程では一切の修正作業を行わない。

## 検証対象ファイル

### 確認すべきドキュメント

- **元タスクファイル**: `docs/tasks/{taskファイルのパス}.md` - プロジェクト全体のタスク完了状況（完了マーク更新対象）
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

### 確認すべきテストファイル

- `src/__tests__/*.test.ts`
- `src/__tests__/*.test.js`

### 確認すべき実装ファイル

- `src/*.ts`
- `src/*.js`

### Git で変更されたファイル

- `git status` で変更されたファイル
- `git diff --name-only` で変更されたファイル

## 品質基準

### 最低品質基準

- **実装率**: 80%以上
- **成功率**: 100%
- **重要テスト**: すべて実装
- **要件網羅性**: 要件定義書の主要機能をすべて網羅
- **コンパイルエラー**: なし

### 理想品質基準

- **実装率**: 100%
- **成功率**: 100%
- **網羅性**: 全ケース対応
- **要件完全網羅**: 要件定義書の全項目を網羅

### 要件定義書の網羅性チェック

要件定義書（requirements.md）に記載された以下の項目が実装・テストされているかを確認：

#### 必須チェック項目

- **入力パラメータ**: 全ての必須・オプション引数の処理
- **出力仕様**: 期待される出力形式・構造の実装
- **制約条件**: パフォーマンス・セキュリティ・互換性要件
- **基本使用例**: 想定される基本的な使用パターン
- **エッジケース**: 境界値・例外条件の処理
- **エラーケース**: 異常系の適切な処理
- **主要アルゴリズム**: 機能の核となる処理ロジック

#### 網羅性判定基準

```
✅ 完全網羅 (100%):
- 要件定義書の全項目が実装・テストされている
- 入力パラメータの全パターンをテスト
- 出力仕様の全形式を検証
- エラーケース・エッジケースを全て網羅

⚠️ 部分網羅 (80-99%):
- 主要機能は実装されているが一部項目が未実装
- 基本的な使用例は網羅されている
- 重要でないエラーケースの一部が未実装

❌ 不十分 (<80%):
- 要件定義書の重要な項目が未実装
- 基本的な使用例に漏れがある
- エラーハンドリングが不十分
```

## 自動遷移判定

### 品質判定基準

```
✅ 高品質（要件充実度完全達成）:
- 既存テスト状態: すべてグリーン
- 要件網羅率: 100%（要件定義書の全項目に対する完全な実装・テスト）
- テスト成功率: 100%
- 未実装重要要件: 0個
- 要件充実度: 要件定義に対する完全な充実度を達成

⚠️ 要改善（要件充実度不足）:
- 既存テスト状態: 失敗テストあり または
- 要件網羅率: 100%未満（要件定義書の項目に対する実装・テスト不足）
- 重要な要件項目が未実装・未テスト
- 要件充実度: 要件定義に対する充実度が不十分
- 追加実装による要件充実度向上が必要
```

## 使用例

```bash
# refactorフェーズ後に自動実行
/tdd-refactor
# ↓ 自動実行
/tdd-verify-complete
# ↓ 実装完全なら自動実行
/tdd-cycle
```

## Output Format

Output in one of the following formats depending on implementation status:

### For Complete Implementation

```
✅ **Test Case Completeness Verification: Pass**

📊 Current Task Requirements Fulfillment:
- Target requirement items: [number] items
- Implemented & tested: [number] items / Unimplemented: [number] items
- Requirements coverage: 100%
- Requirements fulfillment: Complete achievement

📊 Overall Test Status:
- Total test cases: [number] cases
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

🚀 Complete fulfillment of requirements definition achieved.
Automatically proceeding to next TDD cycle.
```

### For Insufficient Implementation

```
⚠️ **Test Case Implementation Insufficiency Detected**

📊 Current Task Requirements Fulfillment:
- Target requirement items: [number] items
- Implemented & tested: [number] items / Unimplemented: [number] items
- Requirements coverage: [number]%
- Requirements fulfillment: [fulfillment level]

📊 Overall Test Status:
- Total test cases: [number] cases
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

❌ Unimplemented Test Cases:
[Detailed list of unimplemented test cases]

📝 **Correction content recorded in memo file**
Will be addressed in later processes. No corrections made in this process.
```

This verification ensures the quality and completeness of TDD development.
