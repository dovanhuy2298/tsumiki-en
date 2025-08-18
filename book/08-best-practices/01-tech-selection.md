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

# 8.1 Technology Selection Guidelines

We provide practical guidelines for engineers to make appropriate decisions when selecting technologies for practicing AITDD.

## AI Tool Selection Criteria

### Prioritize Organizational Policy

#### Use Company-Designated AI Tools

Prioritize organizational governance and compliance over technical superiority.

- **Use Only Approved Tools**: Use only AI tools designated by the company for business purposes
- **Comply with Organizational Policy**: Prioritize organizational rules over technical superiority
- **Regular Policy Confirmation**: Regularly check for changes in AI tool usage guidelines

#### Recommended Tool: Claude Sonnet 4

Recommended tool based on current practical experience and reasons:

- **High-Quality Implementation Generation**: Code generation capability suitable for TDD process
- **Claude Code Integration**: Efficiency through development environment integration
- **Japanese Language Support**: Quality of specification description and comment generation
- **Token Capacity**: Stable operation with large context

### Technology Selection Decision Criteria

#### Project Application Conditions

**Cases Suitable for Application**

- **New Development Projects**: Highly suitable
- **Modern Technology Stack**: AI assistance is effective
- **Clear Requirements Definition**: When specifications are clarified
- **Iterative Development**: Agile and incremental development

**Cases Not Suitable for Application**

- **Life-Critical Projects**: Not applicable
- **Legacy Systems**: Existing systems with complex constraints
- **Extremely High Quality Requirements**: Projects with low risk tolerance
- **Short-term Small-scale Fixes**: When AITDD introduction cost doesn't justify

## Security and Compliance

### Confidential Information Management

#### Criteria for Transmittable Information

Practical standards to ensure safety of information sent to AI tools:

- **Exclude Personal Information**: Information that can identify individuals is excluded from transmission
- **Exclude Confidential Data**: Information classified as company confidential is excluded from transmission
- **General Technical Information**: Only publicly available technical information is permitted for transmission

#### Practical Data Protection Methods

```
Pre-transmission Checklist:
□ Confirm absence of personal information
□ Confirm removal of confidential data
□ Evaluate necessity of transmission
□ Consider alternatives
```

### Intellectual Property Considerations

#### Organizational Policy Compliance

- **Apply Intellectual Property Policy**: Operate according to organizational intellectual property policy
- **Collaborate with Legal Department**: Consult legal department when necessary
- **Confirm Contract Terms**: Check terms of AI tool usage contracts

#### Risk Management

- **Recognize Copyright Risks**: Understand copyright issues with AI-generated code
- **Confirm License Terms**: Comply with license terms of AI tools used
- **Commercial Use Appropriateness**: Confirm usability in commercial products

## Team Composition and Skill Requirements

### Required Roles and Skills

#### Design Lead

**Required Level**: Someone with considerable experience centrally conducts design

Required Skills:

- **API Design**: Experience designing RESTful APIs and GraphQL
- **Database Design**: Ability to design appropriate schemas
- **Architecture Design**: Experience designing overall system structure
- **AI-Compatible Design**: Ability to create mechanisms that AI can easily handle

#### Development Members

**Basic Requirements**: Programming foundation knowledge and adaptability to AI utilization
