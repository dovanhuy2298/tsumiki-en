# 2.1 Required Tools and Setup

This section explains the tools and environment setup steps required to practice AITDD. AITDD does not require special tools; you can start by adding AI assistance to your existing development environment.

## List of Required Tools

### Essential Tools

#### 1. Claude Sonnet 4 + Claude Code

**Role**: Main AI development assistant  
**Use**: Code generation, test creation, refactoring, validation  
**Access**: Via Claude Code

#### 2. VS Code

**Role**: Integrated Development Environment  
**Use**: Code editing, debugging, project management  
**Note**: Integrates well with Claude Code

#### 3. Git + GitHub

**Role**: Version control  
**Use**: Code management, history tracking, recovery  
**Importance**: Recovery path when AI output is not as expected

### Supplementary Tools

#### Gemini (Optional)

**Role**: Research and information gathering AI  
**Use**: Library research, technical documentation investigation  
**Strength**: Processes large contexts and large amounts of information

## Setup Steps

### Step 1: Subscribe to Claude Pro Plan

1. **Create a Claude account**

   - Visit https://claude.ai
   - Create an account

2. **Upgrade to Pro Plan**

   - Subscribe to the Pro plan ($20/month)
   - Set a maximum limit up to $200
   - Avoid open-ended API costs

3. **Enable Claude Code**
   - Accessible on the Pro plan
   - Can be freely used for development

### Step 2: Set Up VS Code

1. **Install VS Code**

   ```bash
   # Windows
   winget install Microsoft.VisualStudioCode

   # macOS
   brew install --cask visual-studio-code

   # Linux
   sudo apt install code
   ```

2. **Install Basic Extensions**

   - Git Graph (visualize Git operations)
   - GitLens (enhanced display of Git information)
   - Language-specific extensions (JavaScript, Python, etc.)

3. **Configure Claude Code Integration**
   - Configure the VS Code extension or Claude Code settings
   - Link with the project directory

### Step 3: Set Up Git Environment

1. **Install and Configure Git**

   ```bash
   # Basic settings
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"

   # Default branch
   git config --global init.defaultBranch main
   ```

2. **Prepare a GitHub Account**

   - Create a GitHub account
   - Configure SSH keys or a Personal Access Token
   - Prepare to create a repository

3. **Branch Strategy for AITDD**
   ```bash
   # Basic workflow
   git checkout -b feature/new-functionality
   # Practice AITDD
   git add .
   git commit -m "Implement feature with AITDD"
   git push origin feature/new-functionality
   ```

## AI Tool Comparison and Selection Criteria

### Why Choose Claude Sonnet 4

Here is why we choose Claude Sonnet 4 as the primary tool among many existing AI tools for practicing AITDD.

#### Comprehensive Evaluation

**Key factors:**

1. **Cost efficiency**: Frequent trials in AITDD require reasonable cost levels
2. **Coding performance**: Prioritize stable performance over absolute peak
3. **Accessibility**: Use freely with fewer constraints
4. **Integration**: Alignment with the development environment and consistent workflow

**Advantages of Claude Sonnet 4:**

- **Claude Code integration**: Tight integration via the VS Code plugin
- **Pro plan**: $20/month with a $200 cap (avoid open-ended API costs)
- **Fit for AITDD**: Optimized for trial-heavy development style
- **Overall balance**: Optimal balance of performance, cost, and usability

#### Comparison with Other Tools

**Considered AI tools:**

- ChatGPT: High performance but cost concerns
- GitHub Copilot: Specialized for code completion; insufficient for end-to-end AITDD
- Other AI tools: After trials, overall we converged on Claude Sonnet 4

**Convergence reasons:**

```
Item                 Claude Sonnet 4    Others
────────────────────────────────────────────────
Cost efficiency      ◎                  △
Coding performance   ○                  ◎
Accessibility        ◎                  △
Integration          ◎                  ○
AITDD suitability    ◎                  △
────────────────────────────────────────────────
Overall rating       Optimal            Has issues
```

### How We Combine Gemini

We primarily use Claude Sonnet 4, with Gemini as a supplementary tool for specific purposes.

#### Basic Policy for Division of Labor

**Claude Sonnet 4 (Primary tool):**

- All implementation phases (design → tests → implementation → refactoring → validation)
- Executes the full AITDD process consistently
- Balances code generation and quality checks

**Gemini (Supplementary tool):**

- Technical research and information gathering
- Large-scale information processing using long context
- Library investigation when needed
- Tasks that require extensive research

#### Practical Collaboration Patterns

```
Research phase:
Gemini → Gather technical information → Provide to Claude Sonnet 4

Implementation phase:
Claude Sonnet 4 → Execute a consistent AITDD process
```

**Real examples:**

1. **New library research**: Gather information with Gemini → Provide results to Claude Sonnet 4 → Execute AITDD
2. **Integrate findings**: Use Claude Sonnet 4 to build the implementation plan based on Gemini’s analysis

### Fallback Strategy

How to respond when AI does not produce expected results.

#### Basic Fallback Steps

**Step 1: Restore state**

```bash
# Revert to previous state
git reset --hard HEAD~1
# Or revert to a specific commit
git reset --hard <commit-hash>
```

**Step 2: Adjust prompts**

- Clarify and detail instructions
- Provide additional context
- State constraints explicitly

**Step 3: Re-run**

- Retry with the same tool (Claude Sonnet 4)
- Do not switch tools midstream
- Keep the response consistent

#### When to Use git reset

- When the final code diverges significantly from expectations
- When a fresh implementation is faster than iterative fixes
- When multiple fix attempts show no improvement

**Prompt improvement guideline:**

```
# Before (ambiguous)
"Fix this code"

# After (specific)
"Fix the following issues in this code:
1. Validation errors are not handled correctly
2. Return type differs from the specification
3. Edge case tests are missing"
```

#### Characteristics of the Fallback Strategy

**Simplicity:**

- Avoid complex decision logic
- Emphasize rapid recovery

**Consistency:**

- Default to retrying with the same tool
- Avoid confusion from switching tools

**Learning:**

- Improve intuition through repetition
- Accumulate experience to refine decision criteria

## Recommended Tech Stack

### Programming Languages

#### Recommended

**JavaScript/TypeScript**

- Package management: npm/yarn
- Transparency: Dependencies visible via package.json
- AI-friendly: Allows dynamic library investigation

**Python**

- Package management: pip/poetry
- Transparency: Dependencies visible via requirements.txt
- AI-friendly: Rich library information available to AI

#### Languages Requiring Caution

**Java/C# and other compiled languages**

- Reason: Binary distribution via jar/dll makes dynamic dependency investigation difficult
- Approach: Usable, but requires prior preparation and human assistance

### Project Types

#### Best Fit

- Applications centered on CRUD operations
- Web API development
- Database-integrated applications
- Relatively large projects

#### Effective Code Patterns

- Situations that require generating a large amount of similar code
- Processes that can be templated
- Implementations using standard design patterns

## Cost Management

### Expected Costs

- **Claude Pro**: $20/month
- **GitHub**: Free for individuals; $4/user/month for teams
- **VS Code**: Free
- **Others**: Project-specific dependency costs

### Cost Optimization Tips

1. **Set a cap for Claude Pro**: Up to $200
2. **Use efficiently**: Set clear goals to optimize AI usage
3. **Manage Git history**: Use a sensible commit strategy to avoid wasteful trial and error

## Setup Completion Checklist

Confirm the following items to ensure your setup is complete:

- [ ] Claude Pro plan is active
- [ ] Accessible to Claude Code
- [ ] VS Code is installed
- [ ] Basic VS Code extensions are installed
- [ ] Git is configured
- [ ] GitHub account is ready
- [ ] Project directory is created
- [ ] Base environment for your chosen tech stack is ready

## Troubleshooting

### Common Issues and Solutions

**Cannot access Claude Code**

- Confirm Pro plan is active
- Clear browser cache
- Check network connection

**Issues integrating with VS Code**

- Reinstall Claude Code extension
- Restart VS Code
- Check settings files

**Git operation errors**

- Reconfigure credentials
- Confirm remote repository URL
- Check access permissions

## Next Steps

Once tool setup is complete, proceed to the next chapter, “2.2 How to Use Claude Sonnet 4,” to learn the concrete usage of AI tools. By mastering effective prompt design and collaboration techniques with AI, you can unlock the full potential of AITDD.

# 2.1 必要なツールとセットアップ

AITDD を実践するために必要なツールと環境のセットアップ手順について説明します。AITDD は特別なツールを必要とせず、既存の開発環境に AI 支援ツールを追加するだけで始められます。

## 必要なツール一覧

### 必須ツール

#### 1. Claude Sonnet 4 + Claude Code

**役割**: メインの AI 開発支援ツール  
**用途**: コード生成、テスト作成、リファクタリング、検証  
**アクセス方法**: Claude Code 経由

#### 2. VS Code

**役割**: 統合開発環境  
**用途**: コード編集、デバッグ、プロジェクト管理  
**特徴**: Claude Code との統合が可能

#### 3. Git + GitHub

**役割**: バージョン管理  
**用途**: コード管理、履歴追跡、復旧  
**重要性**: AI が期待通りの結果を出さない場合の回復手段

### 補助ツール

#### Gemini（オプション）

**役割**: 調査・情報収集用 AI  
**用途**: ライブラリ調査、技術情報収集  
**特徴**: 長いコンテキストを活用した大量情報処理

## セットアップ手順

### ステップ 1: Claude Pro プランの契約

1. **Claude アカウント作成**

   - https://claude.ai にアクセス
   - アカウントを作成

2. **Pro プランへのアップグレード**

   - 月額$20 の Pro プランに加入
   - 最大$200 で上限設定可能
   - API 料金のような青天井コストを回避

3. **Claude Code の有効化**
   - Pro プランでアクセス可能
   - 開発用途での自由な使用が可能

### ステップ 2: VS Code のセットアップ

1. **VS Code のインストール**

   ```bash
   # Windows
   winget install Microsoft.VisualStudioCode

   # macOS
   brew install --cask visual-studio-code

   # Linux
   sudo apt install code
   ```

2. **基本的な拡張機能のインストール**

   - Git Graph（Git 操作の視覚化）
   - GitLens（Git 情報の表示強化）
   - 言語固有の拡張（JavaScript、Python 等）

3. **Claude Code 統合の設定**
   - VS Code のプラグインまたは Claude Code の設定
   - プロジェクトディレクトリとの連携設定

### ステップ 3: Git 環境の構築

1. **Git のインストールと設定**

   ```bash
   # 基本設定
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"

   # デフォルトブランチ設定
   git config --global init.defaultBranch main
   ```

2. **GitHub アカウントの準備**

   - GitHub アカウントの作成
   - SSH 鍵または Personal Access Token の設定
   - リポジトリ作成の準備

3. **AITDD 用のブランチ戦略**
   ```bash
   # 基本的なワークフロー
   git checkout -b feature/new-functionality
   # AITDD実践
   git add .
   git commit -m "Implement feature with AITDD"
   git push origin feature/new-functionality
   ```

## AI ツール比較と選択基準

### Claude Sonnet 4 を選択する理由

AITDD を実践するにあたり、多数の AI ツールが存在する中で Claude Sonnet 4 を主力ツールとして選択した理由を説明します。

#### 総合評価による選択

**主要検討要素:**

1. **コスト効率**: AITDD ではトライアルが頻繁なため、妥当なコストレベルが必須
2. **コーディング性能**: 最高性能よりも安定した性能を重視
3. **アクセス性**: 制限の少ないプランで自由に使用可能
4. **統合性**: 開発環境との連携とワークフローの一貫性

**Claude Sonnet 4 の優位性:**

- **Claude Code 統合**: VS Code プラグイン経由での密接な統合
- **Pro プラン**: 月額$20 で上限$200 設定可能（API の青天井コストを回避）
- **AITDD 適性**: トライアル重視の開発スタイルに最適化
- **総合バランス**: 性能、コスト、使いやすさの最適なバランス

#### 他ツールとの比較結果

**検討済み AI ツール:**

- ChatGPT: 性能は高いがコスト面での課題
- GitHub Copilot: コード補完に特化、AITDD 全体には不十分
- その他の AI ツール: 試用の結果、総合的に Claude Sonnet 4 に収束

**収束理由:**

```
項目               Claude Sonnet 4    他ツール
──────────────────────────────────────────
コスト効率         ◎                △
コーディング性能   ○                ◎
アクセス性         ◎                △
統合性             ◎                ○
AITDD適性          ◎                △
──────────────────────────────────────────
総合評価           最適              課題あり
```

### Gemini との使い分け戦略

Claude Sonnet 4 を主力としつつ、特定の用途で Gemini を補助的に活用します。

#### 使い分けの基本方針

**Claude Sonnet 4（主力ツール）:**

- 実装フェーズのすべて（設計〜テスト〜実装〜リファクタリング〜Validation）
- AITDD プロセス全体の一貫した実行
- コード生成と品質チェックの両立

**Gemini（補助ツール）:**

- 技術調査・情報収集
- 長いコンテキストを活用した大量情報処理
- 必要なライブラリの調査
- 大量の調べ物が必要なタスク

#### 具体的な連携パターン

```
調査フェーズ:
Gemini → 技術情報収集 → Claude Sonnet 4に情報提供

実装フェーズ:
Claude Sonnet 4 → 一貫したAITDDプロセス実行
```

**連携の実例:**

1. **新しいライブラリ調査**: Gemini で情報収集
2. **調査結果の統合**: Claude Sonnet 4 に調査結果を提供
3. **実装の実行**: Claude Sonnet 4 で AITDD プロセス実行

### フォールバック戦略

AI が期待通りの結果を出さない場合の対処法について説明します。

#### 基本的なフォールバック手順

**ステップ 1: 状態の復旧**

```bash
# 前の状態に戻す
git reset --hard HEAD~1
# または特定のコミットまで戻る
git reset --hard <commit-hash>
```

**ステップ 2: プロンプト調整**

- 指示の明確化・詳細化
- 文脈情報の追加
- 制約条件の明示

**ステップ 3: 再実行**

- 同じツール（Claude Sonnet 4）で再試行
- 別ツールへの切り替えは行わない
- 一貫性を保った対応

#### フォールバック判断基準

**git reset を実行するタイミング:**

- 最終コードが期待から大きくズレた場合
- 修正依頼より作り直しの方が早いと判断した場合
- 複数回の修正試行で改善が見られない場合

**プロンプト調整の指針:**

```
# 改善前（曖昧）
"このコードを修正して"

# 改善後（具体的）
"このコードの以下の問題を修正して：
1. バリデーションエラーが適切に処理されていない
2. 戻り値の型が仕様と異なる
3. エッジケースのテストが不足している"
```

#### フォールバック戦略の特徴

**シンプル性:**

- 複雑な判断ロジックを避ける
- 迅速な復旧を重視

**一貫性:**

- 同一ツールでの再試行を基本
- ツール切り替えによる混乱を回避

**学習性:**

- 繰り返しで感覚を磨く
- 経験値を蓄積して判断基準を向上

### 新しい AI ツールの評価方法

継続的な改善のため、新しい AI ツールの評価方法も定めておきます。

#### 評価プロセス

**情報収集フェーズ:**

1. **常時チェック**: 新しい AI ツールの情報を常にチェック
2. **話題性の確認**: 一時的なブームではなく持続した関心があるか
3. **コミュニティの反応**: 開発者コミュニティでの評価を確認

**トライアル判断基準:**

- **持続性**: 数ヶ月にわたって話題が続いているか
- **実用性**: AITDD ワークフローに適用可能か
- **コスト効率**: 現在のツール構成と比較して優位性があるか

**慎重なアプローチ:**

- すぐに飛びつかず、十分な情報収集を実施
- 現在の安定したワークフローを維持しながら評価
- 明確な優位性が確認できた場合のみ移行を検討

## 推奨技術スタック

### プログラミング言語

#### 推奨言語

**JavaScript/TypeScript**

- パッケージ管理: npm/yarn
- 透明性: package.json による依存関係の可視化
- AI 対応: 動的なライブラリ調査が可能

**Python**

- パッケージ管理: pip/poetry
- 透明性: requirements.txt による依存関係の可視化
- AI 対応: 豊富なライブラリ情報が AI に利用可能

#### 注意が必要な言語

**Java/C#等のコンパイル型言語**

- 理由: jar や ddl のバイナリ配布により、AI が依存関係を動的調査困難
- 対応: 使用可能だが、事前の準備と人間の補助が必要

### プロジェクトタイプ

#### 最適なプロジェクト

- **CRUD 操作中心のアプリケーション**
- **Web API 開発**
- **データベース連携アプリケーション**
- **比較的大規模なプロジェクト**

#### 効果的なコードパターン

- 似たようなコードを大量に作成する場面
- テンプレート化しやすい処理
- 標準的なデザインパターンの実装

## コスト管理

### 予想コスト

- **Claude Pro**: $20/月
- **GitHub**: 個人利用は無料、チーム利用は$4/ユーザー/月
- **VS Code**: 無料
- **その他**: プロジェクト固有の依存関係コスト

### コスト最適化のポイント

1. **Claude Pro の上限設定**: 最大$200 で設定
2. **効率的な使用**: 明確なゴール設定で AI 使用量を最適化
3. **Git 履歴管理**: 無駄な試行錯誤を避けるための適切なコミット戦略

## セットアップ完了の確認

以下の項目をチェックして、セットアップが完了していることを確認してください：

- [ ] Claude Pro プランが有効
- [ ] Claude Code にアクセス可能
- [ ] VS Code がインストール済み
- [ ] 基本的な VS Code 拡張機能が導入済み
- [ ] Git が設定済み
- [ ] GitHub アカウント準備完了
- [ ] プロジェクト用ディレクトリが作成済み
- [ ] 選択した技術スタックの基本環境が準備済み

## トラブルシューティング

### よくある問題と解決策

**Claude Code へのアクセスができない**

- Pro プランの有効性を確認
- ブラウザキャッシュのクリア
- ネットワーク接続の確認

**VS Code との統合に問題がある**

- Claude Code プラグインの再インストール
- VS Code の再起動
- 設定ファイルの確認

**Git 操作でエラーが発生**

- 認証情報の再設定
- リモートリポジトリの URL 確認
- アクセス権限の確認

## 次のステップ

ツールのセットアップが完了したら、次の章「2.2 Claude Sonnet 4 の活用方法」で AI ツールの具体的な使用方法を学びましょう。効果的なプロンプト設計と AI との協調作業のテクニックを身につけることで、AITDD の真価を発揮できるようになります。
