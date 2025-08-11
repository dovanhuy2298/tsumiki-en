# 8.1 Technology Selection Guidelines

This chapter provides practical guidelines for making sound technology choices when practicing AITDD.

## Criteria for Choosing AI Tools

### Organization policy comes first

#### Use company‑approved AI tools

Prioritize governance and compliance over technical advantages.

- Use only approved tools in business contexts
- Follow organization policies before technical preferences
- Review AI usage guidelines regularly

#### Recommended tool: Claude Sonnet 4

Based on current practice:

- High‑quality code generation suited for TDD
- Tight integration with Claude Code improves efficiency
- Strong Japanese support for specs and comments
- Large context window for stable operation

## Technology Selection Criteria

### Project fit

Suitable cases:

- New development projects
- Modern tech stacks
- Clear requirements
- Iterative/agile development

Less suitable cases:

- Safety‑critical projects
- Complex legacy systems
- Extremely high quality bars with low risk tolerance
- Tiny hotfixes with short timelines (AIDD overhead not justified)

## Security and Compliance

### Handling sensitive information

Allowed to send to AI:

- Exclude personal information (PII)
- Exclude company‑confidential data
- Prefer public/technical information

Practical protection checklist:

```text
Before sending:
□ Check for personal info
□ Remove confidential data
□ Validate necessity of sending
□ Consider alternatives
```

### Intellectual property

#### Follow organizational policy

- Apply IP policies
- Consult legal as needed
- Review AI tool license terms

#### Risk management

- Understand copyright implications of AI‑generated code
- Follow license terms of tools and outputs
- Confirm commercial suitability

## Team Composition and Skills

### Roles and skills

#### Design lead

Experienced engineer leads design:

- API design (REST/GraphQL)
- Database schema design
- Architecture design
- AI‑aware design (structures AI can handle well)

#### Developers

Baseline skills:

- TDD fundamentals
- Prompting skills (learnable)
- Reviewing AI‑generated code
- Growth mindset and continuous learning

### Addressing prompt‑skill gaps

Recognize real differences:

- Experience dialoguing with AI
- Understanding AI traits/quirks
- Ability to predict prompt effects
- Trial‑and‑error mileage

Approach:

- Continuous practice; start small
- Share knowledge and best practices
- Pair programming for upskilling

## Cost‑Effectiveness

### Efficiency metrics

Practice‑based effects:

- Implementation speed: 20–48×
- Cycle time: 1–2 day tasks → ~1 hour
- Easier iteration enables more approaches

New cost drivers:

- QA of AI output
- AIDD learning curve
- Tooling costs (e.g., Claude Code API)

### ROI guidelines

- Baseline: if much faster than manual, it’s fine
- Impact: developer time reduced to ~1/4–1/8
- Evaluate overall: balance implementation speed vs QA costs

Practical adoption checklist:

```text
□ Timeline allows learning ramp
□ Team understands AI usage
□ Aligns with org AI policies
□ Quality bar is appropriate
□ Security risks manageable
```

## Tech Stack Guidance

### AI‑friendly technologies

Recommended:

- Modern frameworks: React/Vue/Next.js
- Type‑safe languages: TypeScript/Rust/Go
- Standard architectures: REST/MVC/Microservices
- Testable design: DI, unit‑testable structures

Avoid:

- Complex legacy stacks with poor docs
- Non‑standard architectures that confuse AI
- Hard‑to‑test designs (anti‑TDD)

### Phased adoption

Phases:

1. Pilot on small new features
2. Partial adoption in existing projects
3. Org‑wide rollout

Migration strategy:

- Run in parallel with existing tech
- Transfer prior knowledge into AITDD
- Continuously improve from practice

# 8.1 技術選択のガイドライン

エンジニアが AITDD を実践する際の技術選択において、適切な判断を行うための実践的なガイドラインを提供します。

## AI ツール選択の基準

### 組織方針の最優先

#### 会社指定 AI ツールの使用

技術的な優位性よりも、組織のガバナンスとコンプライアンスを最優先に考慮します。

- **承認済みツールのみ使用**: 会社から指示された AI ツールのみを業務で使用
- **組織方針の遵守**: 技術的優位性より組織ルールを優先
- **定期的方針確認**: AI ツール利用ガイドラインの変更を定期確認

#### 推奨ツール: Claude Sonnet 4

現在の実践経験に基づく推奨ツールとその理由：

- **高品質な実装生成**: TDD プロセスに適したコード生成能力
- **Claude Code 連携**: 開発環境との統合による効率化
- **日本語対応**: 仕様記述やコメント生成の品質
- **トークン容量**: 大規模なコンテキストでの安定動作

### 技術選択の判断基準

#### プロジェクト適用条件

**適用に向いているケース**

- **新規開発プロジェクト**: 非常に適している
- **モダンな技術スタック**: AI 支援が効果的
- **明確な要件定義**: 仕様が明確化されている場合
- **反復開発**: アジャイル・インクリメンタルな開発

**適用に向かないケース**

- **人命に関わるプロジェクト**: 適用不可
- **レガシーシステム**: 複雑な制約がある既存システム
- **極めて高い品質要求**: リスク許容度が低いプロジェクト
- **短期間の小規模修正**: AIDD 導入コストが見合わない場合

## セキュリティとコンプライアンス

### 機密情報管理

#### 送信可能情報の基準

AI ツールに送信する情報の安全性を確保するための実践的基準：

- **個人情報の除外**: 個人を特定できる情報は送信対象外
- **機密データの除外**: 会社機密に分類される情報は送信対象外
- **一般的な技術情報**: 公開可能な技術情報のみ送信許可

#### 実践的データ保護手法

```
送信前チェックリスト:
□ 個人情報の有無確認
□ 機密データの除去確認
□ 送信の必要性評価
□ 代替手段の検討
```

### 知的財産権の考慮

#### 組織方針準拠

- **知的財産権ポリシーの適用**: 組織の知的財産権方針に従った運用
- **法務部門との連携**: 必要に応じて法務部門への相談
- **契約条件の確認**: AI ツール利用契約の条項確認

#### リスク管理

- **著作権リスクの認識**: AI 生成コードの著作権問題の理解
- **ライセンス条項の確認**: 使用 AI ツールのライセンス条項遵守
- **商用利用の適切性**: 商用プロダクトでの利用可能性確認

## チーム編成とスキル要件

### 必要な役割とスキル

#### 設計責任者

**要求レベル**: それなりの経験者が設計を中心的に実施

必要なスキル：

- **API 設計**: RESTful API や GraphQL の設計経験
- **データベース設計**: 適切なスキーマ設計能力
- **アーキテクチャ設計**: システム全体の構造設計経験
- **AI 対応設計**: AI が対応しやすい仕組みを作る能力

#### 開発メンバー

**基本要件**: プログラミング基礎知識と AI 活用への適応力

- **TDD の理解**: テスト駆動開発の基本概念
- **プロンプトスキル**: AI との効果的な対話能力（習得可能）
- **コードレビュー能力**: AI 生成コードの適切な評価
- **継続学習意欲**: 新しい手法への適応力

### プロンプトスキル格差への対処

#### 現実的な課題認識

**「AI の反応を想像できる人とできない人の差」**

主な差異：

- AI との対話経験による慣れの差
- AI の特性や癖を理解している度合い
- プロンプトの効果を事前に予測できるスキル
- トライアンドエラーの経験値の蓄積

#### 対策アプローチ

- **継続的な実践**: 「使っていくしかない」という現実的認識
- **段階的な習熟**: 小さなタスクから始めて経験を積む
- **知識共有**: 成功事例とベストプラクティスの共有
- **ペアプログラミング**: 経験者と初心者のペアによる学習促進

## コスト効果の判断

### 効率性の評価基準

#### 開発速度の改善

実践データに基づく効果：

- **実装速度**: 従来の 20〜48 倍の向上を実現
- **開発サイクル**: 1〜2 日のタスクが 1 時間程度に短縮
- **試行錯誤の容易さ**: 高速な反復により多くのアプローチを試行可能

#### 新しいコスト要素

- **品質管理コスト**: AI 生成コードの確認・レビュー負荷
- **学習コスト**: チームメンバーの AIDD 習得時間
- **ツール利用コスト**: Claude Code の API 料金等

### 投資対効果の判断

#### 基本方針

- **基準**: 人力より圧倒的に早くなれば問題なし
- **効果**: 開発者時間の大幅削減（1/4〜1/8 に短縮）
- **総合評価**: 実装効率 vs 品質管理コストのバランス

#### 実践的な導入判断

```
導入検討チェックリスト:
□ プロジェクト期間が十分にある（学習コスト考慮）
□ チームにAI活用への理解がある
□ 組織のAI利用方針に適合している
□ 品質要求レベルが適切な範囲にある
□ セキュリティリスクが管理可能である
```

## 技術スタック選択の指針

### AI 支援に適した技術

#### 推奨技術スタック

- **モダンなフレームワーク**: React、Vue.js、Next.js 等
- **型安全な言語**: TypeScript、Rust、Go 等
- **標準的なアーキテクチャ**: RESTful API、MVC、マイクロサービス
- **テスト可能な設計**: 依存性注入、単体テスト可能な構造

#### 避けるべき技術

- **複雑なレガシー技術**: 文書化が不十分な古い技術
- **非標準的なアーキテクチャ**: AI が理解困難な独自設計
- **テスト困難な構造**: TDD に適さない設計

### 段階的な技術導入

#### 導入フェーズ

1. **パイロットプロジェクト**: 小規模な新規機能で試行
2. **部分適用**: 既存プロジェクトの一部機能に適用
3. **全面展開**: チーム全体での AITDD 実践

#### 技術移行戦略

- **既存技術との並行**: 段階的な移行によりリスク軽減
- **知識継承**: 従来手法の知見を AITDD に活用
- **継続的改善**: 実践を通じた手法の最適化

---

この技術選択ガイドラインを参考に、組織とプロジェクトの特性に適した AITDD 実践を行ってください。
