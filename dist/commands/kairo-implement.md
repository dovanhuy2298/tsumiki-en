# kairo-implement

## English Quick Guide

This file contains detailed Japanese blocks below. Use this quick guide for an English-first overview.

- Implementation types:
  - TDD Process (for code implementation tasks)
  - Direct Work Process (for setup/config tasks)

TDD Process:

- Requirements Definition: run `tdd-requirements.md`
- Test Case Creation: run `tdd-testcases.md`
- Red (write failing tests): run `tdd-red.md`
- Green (minimal implementation): run `tdd-green.md`
- Refactor: run `tdd-refactor.md`
- Quality Verification: run `tdd-verify-complete.md`

Direct Work Process:

- Execute preparation work: create directories, configuration files, install dependencies, set up environment
- Verify preparation results: confirm outputs and readiness for next task

See command examples and detailed steps below.

## Purpose

Implement divided tasks in order, or implement user-specified tasks. Use existing TDD commands to perform high-quality implementation.

## Prerequisites

- Task list exists in `docs/tasks/{requirement-name}-tasks.md`
- User has approved task implementation
- Existing TDD commands are available
- Implementation workspace is set up

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status with original materials (including EARS requirements definition and design documents) using the following signals:

- 🟢 **Green Signal**: When referring to EARS requirements definition and design documents with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on EARS requirements definition and design documents
- 🔴 **Red Signal**: When speculation is not based on EARS requirements definition and design documents

1. **Task Selection**

   - Search for specified task ID using @agent-symbol-searcher and read found task files with Read tool
   - Confirm user-specified task ID
   - If no specification, automatically select next task based on dependencies
   - Display details of selected task

2. **Dependency Verification**

   - Search for dependent task status using @agent-symbol-searcher and read found task files with Read tool
   - Confirm if dependent tasks are completed
   - Warn if incomplete dependent tasks exist

3. **Implementation Directory Preparation**

   - Work in current workspace
   - Check directory structure as needed

4. **Implementation Type Determination**

   - Analyze task nature (code implementation vs preparation work)
   - Determine implementation method (TDD vs direct work)

5. **Implementation Process Execution**

   ### A. **TDD Process** (for code implementation tasks)

   a. **Requirements Definition** - `@task general-purpose tdd-requirements.md`

   ````text
   Task execution: TDD requirements definition phase
   Purpose: Describe detailed task requirements and clarify acceptance criteria
   Command: tdd-requirements.md
   実行方式: 個別Task実行
   ```text

   b. **テストケース作成** - `@task general-purpose tdd-testcases.md`

   ```markdown
   Task実行: TDDテストケース作成フェーズ
   目的: 単体テストケースを作成し、エッジケースを考慮する
   コマンド: tdd-testcases.md
   実行方式: 個別Task実行
   ```text

   c. **テスト実装** - `@task general-purpose tdd-red.md`

   ```text
   Task実行: TDDレッドフェーズ
   目的: 失敗するテストを実装し、テストが失敗することを確認する
   コマンド: tdd-red.md
   実行方式: 個別Task実行
   ```text

   d. **最小実装** - `@task general-purpose tdd-green.md`

   ```text
   Task実行: TDDグリーンフェーズ
   目的: テストが通る最小限の実装を行い、過度な実装を避ける
   コマンド: tdd-green.md
   実行方式: 個別Task実行
   ```text

   e. **リファクタリング** - `@task general-purpose tdd-refactor.md`

   ```text
   Task実行: TDDリファクタリングフェーズ
   目的: コードの品質向上と保守性の改善を行う
   コマンド: tdd-refactor.md
   実行方式: 個別Task実行
   ```text

   f. **品質確認** - `@task general-purpose tdd-verify-complete.md`

   ```text
   Task実行: TDD品質確認フェーズ
   目的: 実装の完成度を確認し、不足があればc-fを繰り返す
   コマンド: tdd-verify-complete.md
   実行方式: 個別Task実行
   ```text

   ### B. **直接作業プロセス**（準備作業タスク用）

   a. **準備作業の実行** - `@task general-purpose direct-work-execute`

   ```text
   Task実行: 直接作業実行フェーズ
   目的: ディレクトリ作成、設定ファイル作成、依存関係のインストール、環境設定を行う
   作業内容:
   - ディレクトリ作成
   - 設定ファイル作成
   - 依存関係のインストール
   - 環境設定
   実行方式: 個別Task実行
   ```text

   b. **作業結果の確認** - `@task general-purpose direct-work-verify`

   ```text
   Task実行: 直接作業確認フェーズ
   目的: 作業完了の検証と成果物確認を行う
   作業内容:
   - 作業完了の検証
   - 期待された成果物の確認
   - 次のタスクへの準備状況確認
   実行方式: 個別Task実行
   ````

6. **タスクの完了処理**
   - タスクのステータスを更新（タスクファイルのチェックボックスにチェックを入れる）
   - 実装結果をドキュメント化
   - 次のタスクを提案

## 実行フロー

````mermaid
flowchart TD
    A[タスク選択] --> B{依存関係OK?}
    B -->|No| C[警告表示]
    B -->|Yes| D[実装開始]
    D --> E{タスクタイプ判定}
    E -->|コード実装| F[TDDプロセス]
    E -->|準備作業| G[直接作業プロセス]

    F --> F1[tdd-requirements]
    F1 --> F2[tdd-testcases]
    F2 --> F3[tdd-red]
    F3 --> F4[tdd-green]
    F4 --> F5[tdd-refactor]
    F5 --> F6[tdd-verify-complete]
    F6 --> F7{品質OK?}
    F7 -->|No| F3
    F7 -->|Yes| H[タスク完了]

    G --> G1[準備作業実行]
    G1 --> G2[作業結果確認]
    G2 --> H

    H --> I{他のタスク?}
    I -->|Yes| A
    I -->|No| J[全タスク完了]
```text

## コマンド実行例

```bash
```bash
# 全タスクを順番に実装
$ claude code kairo-implement --all

# 特定のタスクを実装
$ claude code kairo-implement --task TASK-101

# 並行実行可能なタスクを一覧表示
$ claude code kairo-implement --list-parallel

# 現在の進捗を表示
$ claude code kairo-implement --status
```markdown

## 実装タイプ判定基準

### TDD プロセス（コード実装タスク）

以下の条件に当てはまるタスク：

- 新しいコンポーネント、サービス、フック等の実装
- 既存コードの機能追加・修正
- ビジネスロジックの実装
- API 実装

**例**: TaskService 実装、UI コンポーネント作成、状態管理実装

### 直接作業プロセス（準備作業タスク）

以下の条件に当てはまるタスク：

- プロジェクト初期化・環境構築
- ディレクトリ構造作成
- 設定ファイル作成・更新
- 依存関係のインストール
- ツール設定・設定

**例**: プロジェクト初期化、データベース設定、開発環境設定

## 個別 Task 実行アプローチ

### Task 実行の方針

各実装ステップを個別の Task として実行することで、以下のメリットが得られます：

1. **独立性**: 各ステップが独立して実行され、エラー発生時の切り分けが容易
2. **再実行性**: 特定のステップのみ再実行が可能
3. **並列性**: 依存関係のないステップは並列実行可能
4. **追跡性**: 各ステップの実行状況と結果が明確に記録される

### Task 実行パターン

```bash
```bash
# TDDプロセスの場合
@task general-purpose tdd-requirements.md
@task general-purpose tdd-testcases.md
@task general-purpose tdd-red.md
@task general-purpose tdd-green.md
@task general-purpose tdd-refactor.md
@task general-purpose tdd-verify-complete.md

# 直接作業プロセスの場合
@task general-purpose direct-work-execute
@task general-purpose direct-work-verify
```markdown

## 実装時の注意事項

### TDD プロセス用

1. **テストファースト**

   - 必ずテストを先に書く
   - テストが失敗することを確認してから実装

2. **インクリメンタルな実装**

   - 一度に全てを実装しない
   - 小さなステップで進める

3. **継続的な品質確認**
   - 各ステップで品質を確認
   - 技術的負債を作らない

### 直接作業プロセス用

1. **作業の段階的実行**

   - 依存関係を考慮した順序で実行
   - 各ステップの完了を確認

2. **設定の検証**

   - 作成した設定ファイルの動作確認
   - 環境の正常性チェック

3. **ドキュメントの更新**
   - 実装と同時にドキュメントも更新
   - 他の開発者が理解できるように

## 出力フォーマット

### タスク開始時（TDD プロセス）

```text
```text
🚀 タスク TASK-101: ユーザー認証API の実装を開始します

📋 タスク詳細:
- 要件: REQ-101, REQ-102
- 依存: TASK-002 ✅
- 推定時間: 4時間
- 実装タイプ: TDDプロセス

🔄 TDDプロセスを開始します...
```text
```text

### タスク開始時（直接作業プロセス）

```text
```text
🚀 タスク TASK-003: データベース設定 の実装を開始します

📋 タスク詳細:
- 要件: REQ-402, REQ-006
- 依存: TASK-001 ✅
- 推定時間: 3時間
- 実装タイプ: 直接作業プロセス

🔧 準備作業を開始します...
```text
```text

### 各ステップ完了時（TDD）

```text
```text
✅ Task 1/6: @task tdd-requirements 完了
   ファイル: /implementation/{要件名}/TASK-101/requirements.md
   Task実行結果: 要件定義書作成完了

🏃 Task 2/6: @task tdd-testcases 実行中...
   Task実行: TDDテストケース作成フェーズを開始
```text

### 各ステップ完了時（直接作業）

```text
✅ Task 1/2: @task direct-work-execute 完了
   作成ファイル: 8個、設定更新: 3個
   Task実行結果: 準備作業実行完了

🏃 Task 2/2: @task direct-work-verify 実行中...
   Task実行: 直接作業確認フェーズを開始
```markdown

### タスク完了時（TDD）

```text
🎉 タスク TASK-101 が完了しました！

✅ タスクファイルのチェックボックスを更新しました
   - [ ] **タスク完了** → [x] **タスク完了**

📊 実装サマリー:
- 実装タイプ: TDDプロセス (個別Task実行)
- 実行Taskステップ: 6個 (全て成功)
- 作成ファイル: 12個
- テストケース: 25個 (全て成功)
- カバレッジ: 95%
- 所要時間: 3時間45分

📝 次の推奨タスク:
- TASK-102: ユーザー管理API
- TASK-201: ログイン画面（依存関係あり）

続けて実装しますか？ (y/n)
```text

### タスク完了時（直接作業）

```text
🎉 タスク TASK-003 が完了しました！

✅ タスクファイルのチェックボックスを更新しました
   - [ ] **タスク完了** → [x] **タスク完了**

📊 実装サマリー:
- 実装タイプ: 直接作業プロセス (個別Task実行)
- 実行Taskステップ: 2個 (全て成功)
- 作成ファイル: 8個
- 設定更新: 3個
- 環境確認: 正常
- 所要時間: 2時間30分

📝 次の推奨タスク:
- TASK-004: 状態管理設定
- TASK-101: TaskService実装（依存関係あり）

続けて実装しますか？ (y/n)
````

## Error Handling

- Incomplete dependent tasks: Display warning and request confirmation
- Test failures: Display detailed error information
- File conflicts: Create backup before overwriting

## Post-execution Verification

- Display list of implemented files
- Display test result summary
- Display remaining tasks and progress rate
- Display next task suggestions
