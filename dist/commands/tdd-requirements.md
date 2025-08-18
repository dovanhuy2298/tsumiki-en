# TDD Requirements Definition and Functional Specification Organization

Starting TDD development. Please organize requirements for the following feature:

**Feature Name**: {{feature_name}}

## Preliminary Preparation

Prepare development context:

1. **Search for feature-related information using @agent-symbol-searcher and read found files**

   - Search for related existing features and components, and read corresponding files with Read tool
   - Identify similar implementation patterns and architecture, and read design documents with Read tool
   - Check existing interfaces and API specifications, and read related files with Read tool

2. **Direct reading of related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check existing requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check existing test cases
   - Read related design documents and task files as needed

After loading completion, start TDD requirements definition work based on prepared context information.

## TDD Requirements Organization Format

**Reliability Level Instructions**:
For each item, briefly indicate the verification status with original materials using:

- 🟢 **Green**: Based on existing documents
- 🟡 **Yellow**: Reasonable inference from documents
- 🔴 **Red**: Requires speculation

## 1. Feature Overview (Based on EARS Requirements Definition and Design Documents)

- What the feature does (extracted from user stories)
- What problems it solves (extracted from As a / So that)
- Expected users (extracted from As a)
- Position within the system (extracted from architecture design)
- **Referenced EARS Requirements**: [specific requirement ID]
- **Referenced Design Documents**: [relevant section of architecture.md]

## 2. Input/Output Specifications (Based on EARS Functional Requirements and TypeScript Type Definitions)

- Input parameters (type, range, constraints) - extracted from interfaces.ts
- Output values (type, format, examples) - extracted from interfaces.ts
- Input/output relationships
- Data flow (extracted from dataflow.md)
- **Referenced EARS Requirements**: [specific REQ-XXX]
- **Referenced Design Documents**: [relevant interface in interfaces.ts]

## 3. Constraint Conditions (Based on EARS Non-functional Requirements and Architecture Design)

- Performance requirements (extracted from NFR-XXX)
- Security requirements (extracted from NFR-XXX)
- Compatibility requirements (extracted from REQ-XXX MUST)
- Architecture constraints (extracted from architecture.md)
- Database constraints (extracted from database-schema.sql)
- API constraints (extracted from api-endpoints.md)
- **Referenced EARS Requirements**: [specific NFR-XXX, REQ-XXX]
- **Referenced Design Documents**: [relevant sections of architecture.md, database-schema.sql, etc.]

## 4. Expected Use Cases (Based on EARS Edge Cases and Data Flow)

- Basic usage patterns (extracted from normal requirements REQ-XXX)
- Data flow (extracted from dataflow.md)
- Edge cases (extracted from EDGE-XXX)
- Error cases (extracted from EDGE-XXX error handling)
- **Referenced EARS Requirements**: [specific EDGE-XXX]
- **Referenced Design Documents**: [relevant flow diagram in dataflow.md]

## 5. Correspondence with EARS Requirements and Design Documents

When referencing existing EARS requirements definition and design documents, specify the following correspondences:

- **Referenced User Stories**: [story name]
- **Referenced Functional Requirements**: [REQ-001, REQ-002, ...]
- **Referenced Non-functional Requirements**: [NFR-001, NFR-101, ...]
- **Referenced Edge Cases**: [EDGE-001, EDGE-101, ...]
- **Referenced Acceptance Criteria**: [specific test items]
- **Referenced Design Documents**:
  - **Architecture**: [relevant section of architecture.md]
  - **Data Flow**: [relevant flow diagram in dataflow.md]
  - **Type Definitions**: [relevant interface in interfaces.ts]
  - **Database**: [relevant table in database-schema.sql]
  - **API Specifications**: [relevant endpoint in api-endpoints.md]

After organization, execute the following:

1. Save requirements definition to docs/implements/{{task_id}}/{feature_name}-requirements.md (append if existing file exists)
2. Update TODO status (mark requirements definition completion)
3. **Quality Assessment**: Assess requirements quality based on the following criteria
   - Requirements are clear and unambiguous
   - Input/output specifications are specifically defined
   - Constraint conditions are clear
   - Implementation feasibility is certain
4. **Next Step Display**: Regardless of assessment results, display the next recommended command
   - "Next recommended step: Use `/tdd-testcases` to identify test cases."

## Quality Assessment Criteria

```
✅ High Quality:
- Requirements ambiguity: None
- Input/output definition: Complete
- Constraint conditions: Clear
- Implementation feasibility: Certain

⚠️ Needs Improvement:
- Requirements have ambiguous parts
- Input/output details are unclear
- Technical constraints are unknown
- User intent confirmation needed
```

## TODO Update Pattern

```
- Mark current TODO as "completed"
- Reflect requirements definition phase completion in TODO content
- Add next phase "Test case identification" to TODO
- Record quality assessment results in TODO content
```

Next step: Use `/tdd-testcases` to identify test cases.
