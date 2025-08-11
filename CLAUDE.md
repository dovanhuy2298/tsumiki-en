# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Tsumiki is a CLI tool that provides command templates for an AI‑driven development framework. The project is a CLI application built with TypeScript + React via Ink. It installs Claude Code command templates into the user's `.claude/commands/` directory.

## Development Commands

```bash
# Development environment
pnpm install                # Install dependencies

# Build
pnpm build                  # Build project and copy commands to dist/
pnpm build:run              # Build then run CLI (for testing)

# Code quality
pnpm check                  # Biome checks
pnpm fix                    # Biome auto fixes
pnpm typecheck              # TypeScript type checks (tsgo)
pnpm secretlint             # Secret scanning

# pre-commit hook
pnpm prepare                # Setup simple-git-hooks
```

## Project Structure

- `src/cli.ts`: CLI entry point using commander
- `src/commands/install.tsx`: Install command UI (React + Ink)
- `commands/`: Claude Code command templates for the AI dev framework (`.md` and `.sh`)
- `dist/`: Build output; templates are copied to `dist/commands/`

## Tech Stack

- CLI Framework: Commander.js
- UI Framework: React + Ink (render React in CLI)
- Build Tool: tsup (TypeScript + ESBuild)
- Code Quality: Biome (linter/formatter)
- TypeScript: tsgo (fast type checks)
- Package Manager: pnpm

## Build Process

On `pnpm build`:

1. Clean the `dist` directory
2. Create `dist/commands`
3. Copy `.md` and `.sh` from `commands/` to `dist/commands/`
4. Build TypeScript as ESM and CJS with tsup

## Installation Behavior

`tsumiki install` performs:

1. Create `.claude/commands/` in the current directory
2. Copy all `.md` and `.sh` files from built `dist/commands/`
3. Show progress and file list via React + Ink

## Quality Management

Pre-commit runs automatically:

- `pnpm secretlint`: secrets check
- `pnpm typecheck`: type checks
- `pnpm fix`: auto fixes

Please always run `pnpm check` and `pnpm typecheck` before committing.

## 概要

Tsumiki は AI 駆動開発フレームワークのコマンドテンプレートを提供する CLI ツールです。このプロジェクトは TypeScript + React を Ink で構成された CLI アプリケーションで、Claude Code 用のコマンドテンプレートをユーザーの`.claude/commands/`ディレクトリにインストールします。

## 開発コマンド

```bash
# 開発環境
pnpm install                # 依存関係のインストール

# ビルド
pnpm build                  # プロジェクトをビルドし、commandsディレクトリをdist/にコピー
pnpm build:run              # ビルド後、CLI実行（テスト用）

# コード品質
pnpm check                  # Biomeでコードチェック
pnpm fix                    # Biomeで自動修正
pnpm typecheck              # TypeScriptの型チェック（tsgoを使用）
pnpm secretlint             # シークレット情報の検査

# pre-commitフック
pnpm prepare                # simple-git-hooksのセットアップ
```

## プロジェクト構造

- **`src/cli.ts`**: CLI エントリーポイント、commander を使用してコマンド定義
- **`src/commands/install.tsx`**: React + Ink を使用したインストールコマンドの UI 実装
- **`commands/`**: Tsumiki の AI 開発フレームワーク用 Claude Code コマンドテンプレート（`.md`と`.sh`ファイル）
- **`dist/`**: ビルド出力、`dist/commands/`にテンプレートがコピーされる

## 技術スタック

- **CLI Framework**: Commander.js
- **UI Framework**: React + Ink（CLI での React レンダリング）
- **Build Tool**: tsup（TypeScript + ESBuild ベース）
- **Code Quality**: Biome（リンタ・フォーマッタ）
- **TypeScript**: tsgo（高速型チェック）
- **Package Manager**: pnpm

## ビルドプロセス

ビルド時（`pnpm build`）は以下の処理が実行されます：

1. `dist`ディレクトリをクリーンアップ
2. `dist/commands`ディレクトリを作成
3. `commands/`内の`.md`と`.sh`ファイルを`dist/commands/`にコピー
4. tsup で TypeScript コードを ESM と CJS の両形式でビルド

## インストール動作

`tsumiki install`コマンドは以下を実行します：

1. 現在のディレクトリに`.claude/commands/`ディレクトリを作成
2. ビルド済みの`dist/commands/`から全ての`.md`と`.sh`ファイルをコピー
3. React + Ink でプログレス表示とファイル一覧を表示

## 品質管理

Pre-commit フックで以下が自動実行されます：

- `pnpm secretlint`: 機密情報のチェック
- `pnpm typecheck`: 型チェック
- `pnpm fix`: コードの自動修正

コード修正時は必ず`pnpm check`と`pnpm typecheck`を実行してからコミットしてください。
