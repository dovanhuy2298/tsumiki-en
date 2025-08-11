# 6.1 Balance Strategy to Avoid Over‑Reliance

To use AITDD effectively, you must leverage AI while preserving developers’ creativity and judgment. This section explains practical strategies for role division between AI and humans, and how to avoid over‑reliance on AI.

## Problems Caused by Over‑Reliance on AI

### Key challenges

One of the biggest risks in AITDD is letting AI take over to the point that developers’ intent and thinking are under‑represented. This happens across tools, not just Claude, and leads to:

- Design decisions: Being swayed by AI suggestions; original judgment is constrained
- Creativity: Fewer original ideas and solutions
- Learning: Reduced opportunities to think and grow skills

### Lessons from “vibe coding”

Early attempts often start with “vibe coding” (building by momentum and feel using AI). We’ve learned its limitations:

- A single implementation is fast, but integration hits a ceiling around three features
- AI generates a lot of code that was never instructed
- The same request can produce drastically different, inconsistent implementations
- Net result: manual work can be faster

## Establishing Proper Role Division

### What humans should own

In AITDD, the most creative area for humans is requirements and design:

- Most critical: requirements and design
  - Imaging “what we want to achieve” is the key creativity point
  - Determine the direction of problem solving and source of value creation
  - Translate business requirements into system requirements
- Human specialties
  - Goal setting: define project objectives and success metrics
  - Value judgment: feature priorities and quality requirements
  - Creative ideation: propose novel approaches and solutions
  - System‑wide coherence: ensure architectural consistency

### Where AI shines

- Implementation support: code generation and detail work
- Quality: test case generation and bug detection
- Efficiency: automation of routine tasks
- Documentation: comments and design docs

## Practical Balance Strategies

### 1) Visualize AI’s inferred content

Make AI’s inference transparent to enable effective oversight and corrections.

- Current practices
  - Prompt design marks inferred/assumed parts
  - Introduce markers for AI’s own assumptions
  - Visualize uncertain judgments
- Future direction
  - Build a full inference‑visibility system
  - Reduce the “black box” problem
  - Enable more precise human oversight

### 2) Clarify checkpoints

Define what humans must check to run efficient reviews.

- Checkpoint purpose: know what to review
- Effect: more efficient reviews
- Quality: prevent missing critical judgments
- Concrete items
  - No functions AI wasn’t instructed to implement
  - Implementation approach matches requirements
  - Consistency with existing system
  - Consideration for future extensibility

### 3) Progressive improvement approach

Collaborate with AI in iterative steps:

1. Now: identify issues and choose directions
2. Next: introduce prompt‑level marking mechanisms
3. Future: full AI inference visualization

Continuous tuning:

- Improve methods through practice
- Share best practices across the team
- Keep up with new AI tools

## Implementing the Strategy in TDD

Role split across Red‑Green‑Refactor‑Validation:

- Red (human‑led)
  - Define test requirements and design policy
  - Design test structures and expected values
  - Let AI implement the test code
- Green (AI‑led, human‑supervised)
  - AI generates implementation code
  - Humans confirm implementation policy and adjust as needed
- Refactor (collaboration)
  - Humans decide refactoring policy
  - AI executes concrete changes
  - Humans own quality standards
- Validation (human‑led)
  - Set quality criteria and interpret AI’s verification
  - Make final acceptance decisions

### Prompt design tips (balance‑focused)

```markdown
# Prompt example (balance‑focused)

Implement code based on the following specification.

## Requirements

- [Concrete requirement list]

## Important constraints

- Follow existing code style
- Do not implement features not explicitly requested

## Output format

Along with the implementation, explicitly list:

- [Inference] Parts inferred from context/specs
- [Confirm] Points that need confirmation
- [Alternatives] Possible alternative approaches
```

## Expected Effects

- Preserve and grow developer skills (clear role split)
- Efficient quality management (clear checkpoints)
- Long‑term development strength (organizational AI competence and sustainable process)

## Summary

AITDD balance strategy is about combining AI efficiency with human creativity. To avoid over‑reliance while making the most of AI, establish clear role division and keep improving continuously. The next section explains concrete points where humans can exercise creativity within this balance.

# 6.1 過度な依存を避けるバランス戦略

AITDD を効果的に活用するには、AI の力を最大限活用しながらも、開発者自身の創造性と判断力を維持することが重要です。このセクションでは、AI と人間の適切な役割分担と、過度な依存を避けるための実践的な戦略について解説します。

## AI への過度な依存による問題

### 主要な課題

AITDD における最大の課題の一つは、**AI に任せすぎることで開発者自身の意思や考えが入りにくくなる**ことです。この問題は Claude Sonnet 4 に限らず、他の AI ツールでも共通して発生し、以下のような影響を与えます：

- **設計判断**: AI の提案に流されやすくなり、独自の判断が制限される
- **創造性**: 独自のアイデアや解決策が生まれにくくなる
- **学習機会**: 自分で考える機会が減少し、スキル向上に影響する

### バイブコーディングからの教訓

AITDD 手法の発展過程では、「バイブコーディング」と呼ばれる初期段階を経験することが多くあります。これは**ノリと勢いで AI を使って作るコーディング**手法ですが、以下のような制限があることが分かっています：

- 一つの実装は非常に高速だが、**3 機能程度の統合で限界**に到達
- AI が**指示していない大量のコード**を勝手に生成してしまう
- **同じ要求で全く違う実装**が生まれやすく、一貫性がない
- 結果として**手作業の方が早い**状況になってしまう

## 適切な役割分担の確立

### 人間が担うべき領域

AITDD において、人間が最も創造性を発揮すべき領域は**要件定義と設計**です：

#### 最重要領域: 要件定義と設計

- **「何をしたいか」のイメージング**が最大の創造性発揮ポイント
- 問題解決の方向性決定
- 価値創造の源泉
- ビジネス要件をシステム要件に変換する過程

#### 人間の専門領域

- **目標設定**: プロジェクトの目的と成功指標の定義
- **価値判断**: 機能の優先順位や品質要件の決定
- **創造的発想**: 新しいアプローチや解決策の提案
- **システム全体の整合性**: アーキテクチャレベルでの一貫性確保

### AI が得意とする領域

一方、AI は以下の領域で人間を効果的に支援できます：

- **実装支援**: コードの生成と詳細な実装
- **品質向上**: テストケース生成とバグ検出
- **効率化**: 定型的な作業の自動化
- **ドキュメント生成**: コメントや設計文書の作成

## 実践的なバランス戦略

### 1. AI の推測内容の可視化

AI の判断プロセスを透明化することで、適切な監督と修正を可能にします：

#### 現在の取り組み

- プロンプト設計での工夫により、AI の推測・補完部分をマーキング
- AI が推測した内容にマークを付ける仕組みの導入
- 不確実な判断の可視化

#### 将来の発展方向

- AI の推測内容完全可視化システムの構築
- ブラックボックス問題の軽減
- より精密な人間による監督の実現

### 2. チェックポイントの明確化

人間がチェックすべき内容を明確にし、効率的なレビューを実現します：

#### チェックポイントの設定

- **目的**: 人間がチェックすべき内容の把握
- **効果**: 効率的なレビューの実現
- **品質**: 重要な判断の見落とし防止

#### 具体的なチェック項目

- AI が指示していない機能を実装していないか
- 実装方法が要件に適合しているか
- 既存システムとの整合性が保たれているか
- 将来の拡張性が考慮されているか

### 3. 段階的改善アプローチ

AI との協調は段階的に改善していくことが重要です：

#### 改善ステップ

1. **現在**: 課題の認識と解決方向の検討
2. **次期**: プロンプト設計でのマーキング仕組み導入
3. **将来**: AI の推測内容完全可視化システム

#### 継続的な調整

- 実践を通じた手法の改良
- チーム内でのベストプラクティス共有
- 新しい AI ツールへの対応

## バランス戦略の実装

### TDD プロセスでの役割分担

Red-Green-Refactor-Validation サイクルにおいて、各ステップで人間と AI の役割を明確にします：

#### Red ステップ（人間主導）

- テスト要件の定義と設計方針の決定
- テストケースの構造と期待値の設計
- AI にはテストコードの実装を依頼

#### Green ステップ（AI 主導・人間監督）

- AI による実装コードの生成
- 人間による実装方針の確認
- 必要に応じた実装内容の調整

#### Refactor ステップ（協調）

- リファクタリング方針は人間が決定
- 具体的な実装は AI が担当
- 品質基準は人間が判断

#### Validation ステップ（人間主導）

- 品質評価基準の設定
- AI の検証結果の解釈
- 受け入れ可否の最終判断

### プロンプト設計の工夫

効果的なバランスを実現するためのプロンプト設計のポイント：

```markdown
# プロンプト例（バランス重視）

あなたは以下の仕様に基づいてコードを実装してください。

## 実装要件

- [具体的な要件]

## 重要な制約

- 既存のコードスタイルに合わせること
- 推測で追加機能を実装しないこと

## 出力形式

実装コードに加えて、以下を明記してください：

- [推測] 仕様から推測した部分
- [確認] 確認が必要な判断ポイント
- [代替案] 他の実装方法があれば提示
```

## 期待される効果

適切なバランス戦略の実装により、以下の効果が期待できます：

### 開発者のスキル維持・向上

- AI と人間の適切な役割分担によるスキル保持
- 開発者の創造性発揮機会の確保
- AI 支援の透明性向上による学習効果

### 品質管理の効率化

- 重要な判断ポイントの明確化
- 効率的なレビューの実現
- 継続的な品質保証プロセスの確立

### 長期的な開発力の向上

- 組織としての AI 活用能力の蓄積
- 人間と AI の協調モデルの確立
- 持続可能な開発プロセスの構築

## まとめ

AITDD におけるバランス戦略は、AI の効率性と人間の創造性を両立させる重要な要素です。過度な依存を避けながら AI の力を最大限活用するためには、明確な役割分担と継続的な改善が必要です。次のセクションでは、このバランスの中で人間が創造性を発揮するための具体的なポイントについて詳しく解説します。
