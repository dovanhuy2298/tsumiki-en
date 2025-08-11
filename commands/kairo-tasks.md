# kairo-tasks

## English Quick Guide

This document includes Japanese examples below. Use this section as an English-first summary.

- Goal: Split implementation into phased task files under `docs/tasks/{requirement-name}-*.md` with daily granularity and clear dependencies.
- Task metadata per item: Task ID, Name, Type (TDD/DIRECT), Requirements link, Dependencies, Implementation details, Test requirements, UI/UX requirements, Completion conditions.
- Phases: Create `overview.md` plus `phase1.md`, `phase2.md`, ... each listing day-level tasks with checkboxes and milestones.
- Numbering: Use `TASK-0001` format, assign consecutively across files without duplication.
- Output files:
  - `docs/tasks/{requirement-name}-overview.md`
  - `docs/tasks/{requirement-name}-phase1.md`, `-phase2.md`, ...
- After generation: verify inter-file links, dependency records, 4-digit ID format, and phase completion criteria.

See the detailed Japanese templates and Mermaid examples below.

## Purpose

Based on design documents, split implementation tasks into daily granularity and organize them into monthly phases. Create individual task files for each phase and manage them in appropriate order considering dependencies.

## Prerequisites

- Design documents exist in `docs/design/{requirement-name}/`
- Design has been approved by user (or approval is omitted)
- `docs/tasks/` directory exists (create if it doesn't exist)

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status with original materials (including EARS requirements definition and design documents) using the following signals:

- 🟢 **Green Signal**: When referring to EARS requirements definition and design documents with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on EARS requirements definition and design documents
- 🔴 **Red Signal**: When speculation is not based on EARS requirements definition and design documents

1. **Design Document Analysis**

   - Search for design documents using @agent-symbol-searcher and read found files with Read tool
   - Read `docs/design/{requirement-name}/architecture.md` with Read tool
   - Read `docs/design/{requirement-name}/database-schema.sql` with Read tool
   - Read `docs/design/{requirement-name}/api-endpoints.md` with Read tool
   - Read `docs/design/{requirement-name}/interfaces.ts` with Read tool
   - Read `docs/design/{requirement-name}/dataflow.md` with Read tool

2. **Existing Task File Verification**

   - Search for existing task IDs using @agent-symbol-searcher and read found task files with Read tool
   - Read existing `docs/tasks/{requirement-name}-*.md` files with Read tool
   - Extract used task numbers (TASK-0001 format)
   - Assign non-overlapping numbers for new tasks

3. **Task Identification**

   - Foundation tasks (DB setup, environment construction, etc.)
   - Backend tasks (API implementation)
   - Frontend tasks (UI implementation)
   - Integration tasks (E2E testing, etc.)

4. **Dependency Analysis**

   - Clarify dependencies between tasks
   - Identify tasks that can be executed in parallel
   - Identify critical path

5. **Task Detailing**
   Include the following for each task:

   - Task ID (4-digit number in TASK-0001 format)
   - Task name
   - タスクタイプ（TDD/DIRECT）
     - **TDD**: コーディング、ビジネスロジック実装、UI 実装、テスト実装など開発作業
     - **DIRECT**: 環境構築、設定ファイル作成、ドキュメント作成、ビルド設定など準備作業
   - 要件へのリンク
   - 依存タスク
   - 実装詳細
   - 単体テスト要件
   - 統合テスト要件
   - UI/UX 要件（該当する場合）
     - ローディング状態
     - エラー表示
     - モバイル対応
     - アクセシビリティ要件

6. **タスクの順序付け**

   - 依存関係に基づいて実行順序を決定
   - マイルストーンを設定
   - 並行実行可能なタスクをグループ化

7. **フェーズ分割とファイル作成**
   - タスクを 1 ヶ月程度の期間でフェーズに分割
   - 各フェーズ毎に個別のタスクファイルを作成
   - `docs/tasks/{要件名}-overview.md`: 全体概要とフェーズ一覧
   - `docs/tasks/{要件名}-phase1.md`: フェーズ 1 の詳細タスク
   - `docs/tasks/{要件名}-phase2.md`: フェーズ 2 の詳細タスク
   - （以下、フェーズ数に応じて継続）
   - 各タスクを 1 日単位の粒度で設計
   - 各タスクにチェックボックスを追加してタスクの完了状況を追跡可能にする

## 出力フォーマット例

### 1. overview.md（全体概要）

````markdown
# {要件名} 実装タスク全体概要

## プロジェクト概要

- **要件名**: {要件名}
- **総期間**: {開始日} 〜 {終了予定日}
- **総工数**: {工数}
- **総タスク数**: {数}

## フェーズ構成

| フェーズ              | 期間   | 主要成果物           | タスク数  | 工数 | ファイル               |
| --------------------- | ------ | -------------------- | --------- | ---- | ---------------------- |
| Phase 1: 基盤構築     | 1 ヶ月 | 開発環境・DB 設定    | 20 タスク | 160h | [phase1.md](phase1.md) |
| Phase 2: コア機能     | 1 ヶ月 | 基本 API・認証       | 22 タスク | 176h | [phase2.md](phase2.md) |
| Phase 3: UI 実装      | 1 ヶ月 | 画面・コンポーネント | 25 タスク | 200h | [phase3.md](phase3.md) |
| Phase 4: 統合・最適化 | 2 週間 | テスト・性能調整     | 10 タスク | 80h  | [phase4.md](phase4.md) |

## 既存タスク番号の管理

**既存ファイル確認結果**:

- 確認したファイル: `docs/tasks/{要件名}-*.md`
- 使用済みタスク番号: TASK-0001 〜 TASK-0077 (例)
- 次回開始番号: TASK-0078

## 依存関係

````mermaid
gantt
    title プロジェクト全体スケジュール
    dateFormat  YYYY-MM-DD
    section Phase 1
    基盤構築           :phase1, 2024-01-01, 30d
    section Phase 2
    コア機能           :phase2, after phase1, 30d
    section Phase 3
    UI実装            :phase3, after phase2, 30d
    section Phase 4
    統合・最適化       :phase4, after phase3, 14d
```markdown

## 進捗管理

### 全体進捗

- [ ] Phase 1: 基盤構築 (0/20)
- [ ] Phase 2: コア機能 (0/22)
- [ ] Phase 3: UI 実装 (0/25)
- [ ] Phase 4: 統合・最適化 (0/10)

### マイルストーン

- [ ] M1: 開発環境完成 (Phase 1 完了時)
- [ ] M2: MVP 機能完成 (Phase 2 完了時)
- [ ] M3: UI 完成 (Phase 3 完了時)
- [ ] M4: リリース準備完了 (Phase 4 完了時)

## リスク管理

| リスク       | 影響度   | 発生確率 | 対策       |
| ------------ | -------- | -------- | ---------- |
| {リスク項目} | 高/中/低 | 高/中/低 | {対策内容} |

## 品質基準

- テストカバレッジ: 90%以上
- パフォーマンス: 応答時間 3 秒以内
- セキュリティ: OWASP Top 10 対応
- アクセシビリティ: WCAG 2.1 AA 準拠
````
````

### 2. phase\*.md（各フェーズ詳細）

````markdown
# {要件名} Phase 1: 基盤構築

## フェーズ概要

- **期間**: 1 ヶ月 (20 営業日)
- **目標**: 開発環境とデータベース基盤の構築
- **成果物**: 動作する開発環境、データベーススキーマ、CI/CD 基盤
- **担当**: {担当者名}

## 週次計画

### Week 1: 環境構築

- **目標**: 基本的な開発環境の構築
- **成果物**: Docker 環境、基本設定

### Week 2: データベース設計

- **目標**: データベーススキーマの実装
- **成果物**: DB 設計、マイグレーション

### Week 3: CI/CD 構築

- **目標**: 自動化パイプラインの構築
- **成果物**: テスト・デプロイ自動化

### Week 4: 基盤テスト・調整

- **目標**: 基盤の安定化
- **成果物**: 動作確認済み基盤

## 日次タスク

### Week 1: 環境構築

#### Day 1 (TASK-0001): プロジェクト初期化

- [ ] **タスク完了**
- **推定工数**: 8 時間
- **タスクタイプ**: DIRECT
- **要件リンク**: REQ-001
- **依存タスク**: なし
- **実装詳細**:
  - Node.js/TypeScript 環境設定
  - package.json 設定
  - ESLint/Prettier 設定
  - Git 初期化・.gitignore 設定
- **完了条件**:
  - [ ] npm run dev で開発サーバーが起動する
  - [ ] npm run lint でエラーが出ない
  - [ ] TypeScript 設定が正しく動作する
- **注意事項**: Node.js LTS 版を使用すること

#### Day 2 (TASK-0002): Docker 環境構築

- [ ] **タスク完了**
- **推定工数**: 8 時間
- **タスクタイプ**: DIRECT
- **要件リンク**: REQ-002
- **依存タスク**: TASK-0001
- **実装詳細**:
  - Dockerfile 作成
  - docker-compose.yml 設定
  - PostgreSQL・Redis 設定
  - 環境変数管理設定
- **完了条件**:
  - [ ] docker-compose up で全サービスが起動する
  - [ ] アプリケーションから DB 接続できる
  - [ ] ホットリロードが動作する
- **注意事項**: ポート競合に注意すること

#### Day 3 (TASK-0003): 基本ディレクトリ構造

- [ ] **タスク完了**
- **推定工数**: 6 時間
- **タスクタイプ**: DIRECT
- **要件リンク**: REQ-003
- **依存タスク**: TASK-0002
- **実装詳細**:
  - src/ディレクトリ構造作成
  - テストディレクトリ構造
  - 設定ファイル配置
  - README.md 作成
- **完了条件**:
  - [ ] Clean Architecture に沿った構造
  - [ ] テストファイルの配置が正しい
  - [ ] README.md が充実している
- **注意事項**: 後から変更しにくい構造のため慎重に設計

#### Day 4 (TASK-0004): ログ・エラーハンドリング基盤

- [ ] **タスク完了**
- **推定工数**: 8 時間
- **タスクタイプ**: TDD
- **要件リンク**: REQ-004
- **依存タスク**: TASK-0003
- **実装詳細**:
  - Winston/Pino ログライブラリ設定
  - エラーハンドリングミドルウェア
  - 構造化ログ設定
  - ログローテーション設定
- **テスト要件**:
  - [ ] ログ出力テスト
  - [ ] エラーハンドリングテスト
  - [ ] ログレベル制御テスト
- **完了条件**:
  - [ ] 各レベルのログが正しく出力される
  - [ ] エラーが適切にキャッチされる
  - [ ] 本番環境でセンシティブ情報が出力されない

#### Day 5 (TASK-0005): 設定管理システム

- [ ] **タスク完了**
- **推定工数**: 6 時間
- **タスクタイプ**: TDD
- **要件リンク**: REQ-005
- **依存タスク**: TASK-0004
- **実装詳細**:
  - 環境別設定ファイル
  - 設定バリデーション
  - 機密情報管理
  - 設定読み込みモジュール
- **テスト要件**:
  - [ ] 設定読み込みテスト
  - [ ] 環境別設定テスト
  - [ ] 設定バリデーションテスト
- **完了条件**:
  - [ ] 環境変数が正しく読み込まれる
  - [ ] 不正な設定でエラーになる
  - [ ] 機密情報が適切に管理される

### Week 2: データベース設計

#### Day 6 (TASK-0006): データベース接続基盤

- [ ] **タスク完了**
- **推定工数**: 8 時間
- **タスクタイプ**: TDD
- **要件リンク**: REQ-401
- **依存タスク**: TASK-0005
- **実装詳細**:
  - TypeORM/Prisma 設定
  - 接続プール設定
  - マイグレーション基盤
  - データベースモニタリング
- **テスト要件**:
  - [ ] 接続プールテスト
  - [ ] 接続障害処理テスト
  - [ ] トランザクション管理テスト
- **完了条件**:
  - [ ] データベース接続が安定している
  - [ ] 接続プールが適切に動作する
  - [ ] マイグレーションコマンドが動作する

{...続き、Day 7-20 まで同様の形式で記載...}

## フェーズ完了基準

- [ ] 全タスクが完了している (20/20)
- [ ] 開発環境が安定して動作する
- [ ] データベーススキーマが完成している
- [ ] CI/CD パイプラインが動作する
- [ ] 基盤コードのテストカバレッジが 90%以上
- [ ] セキュリティチェックが完了している
- [ ] ドキュメントが整備されている

## 次フェーズへの引き継ぎ事項

- 開発環境の利用方法
- データベーススキーマの詳細
- CI/CD の運用方法
- 設定項目の一覧
- トラブルシューティング情報

## 振り返り

### 計画との差異

- {計画と実際の差異を記録}

### 学習事項

- {技術的な学習事項を記録}

### 改善点

- {次フェーズで改善すべき点を記録}

```markdown
## サブタスクテンプレート

### TDD タスクの場合

各タスクは以下の TDD プロセスで実装:

1. `tdd-requirements.md` - 詳細要件定義
2. `tdd-testcases.md` - テストケース作成
3. `tdd-red.md` - テスト実装（失敗）
4. `tdd-green.md` - 最小実装
5. `tdd-refactor.md` - リファクタリング
6. `tdd-verify-complete.md` - 品質確認

### DIRECT タスクの場合

各タスクは以下の DIRECT プロセスで実装:

1. `direct-setup.md` - 直接実装・設定
2. `direct-verify.md` - 動作確認・品質確認
```
````

## Post-execution Verification

- Verify consistency between created tasks and existing system using @agent-symbol-searcher
- Display list of created files
  - `docs/tasks/{requirement-name}-overview.md`: Overall overview and phase list
  - `docs/tasks/{requirement-name}-phase1.md`: Phase 1 details
  - `docs/tasks/{requirement-name}-phase2.md`: Phase 2 details
  - (Continue according to number of phases)
- Display overview and task count for each phase
- Display overall schedule and dependencies
- Report project duration and total workload
- **Display existing task number verification results**
  - Used numbers extracted from existing files
  - Starting number for new tasks
  - Verify consecutive number assignment without duplication
- Display message prompting user confirmation to start implementation

## File Link Verification

- Verify that links from overview.md to each phase\*.md are correctly set
- Verify that task dependencies within each phase file are correctly recorded
- **Verify that all task IDs are unified in 4-digit TASK-0001 format**
- Verify that milestones and phase completion criteria are clearly defined

## Task Number Management Notes

- Always check used numbers with Grep tool if existing files exist
- Support maximum 9999 tasks from TASK-0001 to TASK-9999
- Carefully manage to prevent number duplication or gaps
- Assign task numbers consecutively even across multiple phase files

```text

```
