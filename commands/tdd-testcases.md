# TDD Test Case Identification

Identify test cases based on the requirements organized earlier.

## Preliminary Preparation

Prepare development context:

1. **Search for test-related information using @agent-symbol-searcher and read found files**

   - Search for existing test patterns and test cases, and read corresponding test files with Read tool
   - Identify testing methods and mock strategies for similar features, and read related files with Read tool
   - Check test framework usage and read configuration files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check existing test cases
   - Read related design documents and task files as needed

After loading completion, identify test cases based on prepared context information.

## Reliability Level Instructions

When creating each test case, always comment on the verification status with original materials (requirements definition, existing implementation, library documentation, etc.) using the following signals:

- 🟢 **Green Signal**: When referring to original materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on original materials
- 🔴 **Red Signal**: When speculation is not based on original materials

## Test Case Classification

### 1. Normal System Test Cases (Basic Operations)

Please describe in the following format:

- **Test Name**: [Easy-to-understand Japanese name]
  - **What to Test**: [Specific operations or features to verify in this test]
  - **Expected Behavior**: [What processes should execute normally]
- **Input Values**: [Specific values]
  - **Meaning of Input Data**: [Why this input value was chosen, what it represents]
- **Expected Results**: [Specific expected values]
  - **Reason for Expected Results**: [Why this result is considered correct]
- **Test Purpose**: [What to verify]
  - **Verification Points**: [Points to pay special attention to during verification]
- 🟢🟡🔴 State reliability level of this test case

### 2. Abnormal System Test Cases (Error Handling)

- **Test Name**: [Easy-to-understand Japanese name]
  - **Error Case Overview**: [What abnormal situation is anticipated]
  - **エラー処理の重要性**: [なぜこのエラーハンドリングが必要か]
- **入力値**: [不正な値や境界を超えた値]
  - **不正な理由**: [なぜこの入力値が不正とされるか]
  - **実際の発生シナリオ**: [実運用でどのような場面で発生するか]
- **期待される結果**: [適切なエラーメッセージや例外]
  - **エラーメッセージの内容**: [ユーザーにとって分かりやすいメッセージか]
  - **システムの安全性**: [エラー時にシステムが安全な状態を保てるか]
- **テストの目的**: [エラーハンドリングの確認]
  - **品質保証の観点**: [このテストがシステム品質にどう貢献するか]
- 🟢🟡🔴 このテストケースの信頼性レベルを記載

### 3. 境界値テストケース（最小値、最大値、null 等）

- **テスト名**: [わかりやすい日本語名]
  - **境界値の意味**: [なぜこの値が境界として重要か]
  - **境界値での動作保証**: [境界付近での動作の一貫性確認]
- **入力値**: [境界値]
  - **境界値選択の根拠**: [なぜこの値を境界値として選んだか]
  - **実際の使用場面**: [実運用でこの境界値がどう影響するか]
- **期待される結果**: [境界での動作]
  - **境界での正確性**: [境界値での計算や処理が正確に行われるか]
  - **一貫した動作**: [境界の内側と外側で動作が一貫しているか]
- **テストの目的**: [境界条件の確認]
  - **堅牢性の確認**: [システムが極端な条件下でも安定動作するか]
- 🟢🟡🔴 このテストケースの信頼性レベルを記載

## 開発言語・フレームワーク

実装に使用する言語・テストフレームワークも併せて指定してください：

- **プログラミング言語**: {{language}}
  - **言語選択の理由**: [なぜこの言語を選んだか]
  - **テストに適した機能**: [この言語のテストに有利な特徴]
- **テストフレームワーク**: {{test_framework}}
  - **フレームワーク選択の理由**: [なぜこのテストフレームワークを選んだか]
  - **テスト実行環境**: [どのような環境でテストを実行するか]
- 🟢🟡🔴 この内容の信頼性レベルを記載

## テストケース実装時の日本語コメント指針

各テストケースの実装時には以下の日本語コメントを必ず含めてください：

### テストケース開始時のコメント

```javascript
// 【テスト目的】: [このテストで何を確認するかを日本語で明記]
// 【テスト内容】: [具体的にどのような処理をテストするかを説明]
// 【期待される動作】: [正常に動作した場合の結果を説明]
// 🟢🟡🔴 この内容の信頼性レベルを記載
```

### Given（準備フェーズ）のコメント

```javascript
// 【テストデータ準備】: [なぜこのデータを用意するかの理由]
// 【初期条件設定】: [テスト実行前の状態を説明]
// 【前提条件確認】: [テスト実行に必要な前提条件を明記]
```

### When（実行フェーズ）のコメント

```javascript
// 【実際の処理実行】: [どの機能/メソッドを呼び出すかを説明]
// 【処理内容】: [実行される処理の内容を日本語で説明]
// 【実行タイミング】: [なぜこのタイミングで実行するかを説明]
```

### Then（検証フェーズ）のコメント

```javascript
// 【結果検証】: [何を検証するかを具体的に説明]
// 【期待値確認】: [期待される結果とその理由を説明]
// 【品質保証】: [この検証がシステム品質にどう貢献するかを説明]
```

### 各 expect ステートメントのコメント

```javascript
// 【検証項目】: [この検証で確認している具体的な項目]
// 🟢🟡🔴 この内容の信頼性レベルを記載
expect(result.validPaths).toHaveLength(2); // 【確認内容】: 有効なパスが正確に2つ検出されることを確認
expect(result.invalidPaths).toContain("nonexistent.json"); // 【確認内容】: 存在しないファイルが無効パスとして適切に分類されることを確認
```

### セットアップ・クリーンアップのコメント

```javascript
beforeEach(() => {
  // 【テスト前準備】: [各テスト実行前に行う準備作業の説明]
  // 【環境初期化】: [テスト環境をクリーンな状態にする理由と方法]
});

afterEach(() => {
  // 【テスト後処理】: [各テスト実行後に行うクリーンアップ作業の説明]
  // 【状態復元】: [次のテストに影響しないよう状態を復元する理由]
});
```

After identifying everything, execute the following:

1. Save test case list to docs/implements/{{task_id}}/{feature_name}-testcases.md (append if existing file exists)
2. Update TODO status (mark test case identification completion)
3. **Quality Assessment**: Assess test case quality based on the following criteria
   - Test case classification: Normal, abnormal, and boundary value cases are covered
   - Expected value definition: Expected values for each test case are clear
   - Technology selection: Programming language and test framework are determined
   - Implementation feasibility: Achievable with current technology stack
4. **Next Step Display**: Regardless of assessment results, display the next recommended command
   - "Next recommended step: Start Red phase (failing test creation) with `/tdd-red`."

## Quality Assessment Criteria

Assess test case quality based on the following criteria:

```
✅ High Quality:
- Test case classification: Normal, abnormal, and boundary value cases are covered
- Expected value definition: Expected values for each test case are clear
- Technology selection: Programming language and test framework are determined
- Implementation feasibility: Achievable with current technology stack

⚠️ Needs Improvement:
- Test cases have gaps or duplicates
- Expected values are ambiguous or insufficient
- Technology selection is uncertain
- Too complex to implement

❌ Inappropriate:
- Inconsistent with requirements
- Insufficient test cases
- Technical feasibility issues
```

## TODO Update Pattern

```
- Mark current TODO "Test case identification" as "completed"
- Reflect test case definition phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Red phase (failing test creation)" to TODO
```
