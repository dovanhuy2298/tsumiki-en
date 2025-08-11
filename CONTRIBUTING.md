# Contribution Guide

Thank you for contributing to the Tsumiki project! This guide explains how to set up your environment, the workflow, and quality standards.

## Development Environment Setup

### Requirements

- Node.js 18.0.0 or newer
- pnpm 10.13.1 or newer

### Setup Steps

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/tsumiki.git
cd tsumiki
```

1. Install dependencies:

```bash
pnpm install
```

1. Set up pre-commit hooks:

```bash
pnpm prepare
```

## Development Workflow

### Branch Strategy

- `main`: stable code
- Feature development: `feature/<name>`
- Bug fix: `bugfix/<name>`
- Hotfix: `hotfix/<desc>`

### Steps

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

1. Make changes

1. Run quality checks:

```bash
# Type check
pnpm typecheck

# Lint/format check
pnpm check

# Auto-fix
pnpm fix

# Secret scanning
pnpm secretlint
```

1. Build and run a test build:

```bash
pnpm build:run
```

1. Commit changes:

```bash
git add .
git commit -m "feat: add new feature"
```

## Commit Message Convention

Use Conventional Commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Style changes (no code behavior change)
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Build or tooling

Example:

```text
feat: add new install command for .sh files
fix: resolve path handling issue in install command
docs: update README with new command examples
```

## Code Quality Standards

### Automatic Checks (pre-commit)

- secretlint: detect secrets (API keys, passwords, etc.)
- typecheck: TypeScript type checking
- fix: Biome auto-fix

### Manual Checks

Run before committing:

```bash
# Run all checks
pnpm typecheck && pnpm check && pnpm secretlint

# Auto-fix
pnpm fix
```

## Project Structure

```text
tsumiki/
├── src/
│   ├── cli.ts              # CLI entry point
│   └── commands/
│       └── install.tsx     # UI for install command (React + Ink)
├── commands/               # Command templates (.md, .sh)
├── dist/                   # Build output
├── package.json
├── CLAUDE.md               # Project guidance
└── README.md
```

## Pull Requests

### How to create a PR

1. Push your branch:

```bash
git push origin feature/your-feature-name
```

1. Create a PR on GitHub

1. Fill out the PR template thoroughly

### PR Checklist

- [ ] Clear description
- [ ] Related issues linked (if any)
- [ ] Quality checks pass
- [ ] Build succeeds
- [ ] No secrets included

## Issues

Report bugs and request features via Issues.

### Bug Report

Please include:

- Reproduction steps
- Expected behavior
- Actual behavior
- Environment (OS, Node.js version, etc.)
- Error messages (if any)

### Feature Request

Please include:

- Feature description
- Use cases
- Expected benefits
- Proposed approach (if any)

## Security

If you discover a security issue, report it privately instead of opening a public issue.

## License

This project is released under the MIT License. By contributing, you agree to license your contributions under the same terms.

## Questions / Support

- Issues: bugs and feature requests
- Discussions: questions and general discussion

We appreciate your contributions!

## コントリビューションガイド

Tsumiki プロジェクトへのコントリビューションをありがとうございます！このガイドでは、プロジェクトに貢献する方法について説明します。

## 開発環境のセットアップ

### 必要な環境

- Node.js 18.0.0 以上
- pnpm 10.13.1 以上

### セットアップ手順

1. リポジトリをフォークしてクローンします：

```bash
git clone https://github.com/YOUR_USERNAME/tsumiki.git
cd tsumiki
```

1. 依存関係をインストールします：

```bash
pnpm install
```

1. pre-commit フックをセットアップします：

```bash
pnpm prepare
```

## 開発ワークフロー

### ブランチ戦略

- `main`ブランチ：安定版のコード
- 機能開発：`feature/機能名`
- バグ修正：`bugfix/バグ名`
- ホットフィックス：`hotfix/修正内容`

### 開発手順

1. 新しいブランチを作成します：

```bash
git checkout -b feature/your-feature-name
```

1. コードを変更します

1. コード品質チェックを実行します：

```bash
# 型チェック
pnpm typecheck

# コードチェック
pnpm check

# 自動修正
pnpm fix

# 機密情報チェック
pnpm secretlint
```

1. ビルドテストを実行します：

```bash
pnpm build:run
```

1. 変更をコミットします：

```bash
git add .
git commit -m "feat: 新機能の追加"
```

## コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/)形式を使用してください：

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント変更
- `style:` コードスタイル変更（機能に影響しない）
- `refactor:` リファクタリング
- `test:` テスト追加・修正
- `chore:` ビルドプロセスやツール変更

例：

```text
feat: add new install command for .sh files
fix: resolve path handling issue in install command
docs: update README with new command examples
```

## コード品質基準

### 自動チェック

Pre-commit フックで以下が自動実行されます：

- **secretlint**: 機密情報（API キー、パスワードなど）の混入チェック
- **typecheck**: TypeScript の型チェック
- **fix**: Biome によるコードの自動修正

### 手動チェック

変更前に以下のコマンドを実行してください：

```bash
# 全てのチェックを実行
pnpm typecheck && pnpm check && pnpm secretlint

# コードの自動修正
pnpm fix
```

## プロジェクト構造

```text
tsumiki/
├── src/
│   ├── cli.ts              # CLIエントリーポイント
│   └── commands/
│       └── install.tsx     # インストールコマンドのUI実装
├── commands/               # コマンドテンプレート（.md, .sh）
├── dist/                  # ビルド出力
├── package.json
├── CLAUDE.md              # プロジェクト指示書
└── README.md
```

## プルリクエスト

### プルリクエストの作成

1. 変更をプッシュします：

```bash
git push origin feature/your-feature-name
```

1. GitHub でプルリクエストを作成します

1. プルリクエストテンプレートに従って説明を記載します

### プルリクエストの要件

- [ ] 変更内容が明確に説明されている
- [ ] 関連する Issue がリンクされている（該当する場合）
- [ ] コード品質チェックが通っている
- [ ] ビルドが成功している
- [ ] 機密情報が含まれていない

## Issue 報告

バグ報告や機能要望は[Issues](https://github.com/classmethod/tsumiki/issues)で受け付けています。

### バグ報告

以下の情報を含めてください：

- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（OS、Node.js バージョンなど）
- エラーメッセージ（該当する場合）

### 機能要望

以下の情報を含めてください：

- 提案する機能の説明
- ユースケース
- 期待される利益
- 実装案（あれば）

## セキュリティ

セキュリティに関する問題を発見した場合は、公開の Issue ではなく、プライベートに報告してください。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。コントリビューションする際は、このライセンスに同意したものとみなされます。

## 質問・サポート

- [Issues](https://github.com/classmethod/tsumiki/issues) - バグ報告、機能要望
- [Discussions](https://github.com/classmethod/tsumiki/discussions) - 質問、議論

コントリビューションをお待ちしています！
