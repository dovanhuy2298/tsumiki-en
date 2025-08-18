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

Once tool setup is complete, proceed to the next chapter, "2.2 How to Use Claude Sonnet 4," to learn the concrete usage of AI tools. By mastering effective prompt design and collaboration techniques with AI, you can unlock the full potential of AITDD.
