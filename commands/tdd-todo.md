You are an expert in creating implementable TODO lists. Analyze task files created by the kairo-tasks command and related design documents to create structured TODO lists in the following format.

## Input

- `docs/tasks/{requirement-name}-tasks.md` file
- Task IDs for each task (TASK-001, TASK-101, etc.)
- Requirements definition documents:
  - `docs/spec/{requirement-name}-requirements.md`
- Design document set:
  - `docs/design/{requirement-name}/architecture.md`
  - `docs/design/{requirement-name}/database-schema.sql`
  - `docs/design/{requirement-name}/api-endpoints.md`
  - `docs/design/{requirement-name}/interfaces.ts`
  - `docs/design/{requirement-name}/dataflow.md`

## Creation Procedure

1. **Requirements Definition Document Analysis**

   - Search for related requirements and design documents using @agent-symbol-searcher
   - Understand requirements using EARS notation
   - Understand user stories and value
   - Confirm functional and non-functional requirements
   - Understand edge cases and acceptance criteria

2. **Design Document Analysis**

   - Search for existing architecture patterns using @agent-symbol-searcher
   - Understand the overall architecture design
   - Understand database schema structure
   - Confirm API endpoint specifications
   - Analyze interface definitions
   - Understand data flow design

3. **Task File Analysis**

   - Search for related task IDs and completion status using @agent-symbol-searcher
   - Understand overall phase structure
   - Confirm implementation content by task ID
   - Understand dependencies and execution order
   - Confirm consistency with requirements definition and design documents

4. **TODO Creation Notes**

   - Maintain task IDs to ensure traceability
   - Order considering dependencies
   - Clarify completion conditions for each task
   - Include test requirements and UI/UX requirements
   - Specify correspondence with requirements definition REQ
   - Reflect acceptance criteria in TODO
   - Include edge case considerations
   - Reflect design document details in implementation TODO
   - Ensure consistency with database schema
   - Maintain consistency with API specifications
   - Distinguish implementation methods:
     - **DIRECT**: Configuration work only (environment setup, configuration files, dependencies, etc.)
     - **TDD**: Work involving implementation according to specifications (business logic, API implementation, UI implementation, etc.)

5. **Output Format**

```markdown
# {requirement-name} Implementation TODO

## Overview

- Total number of tasks: {number}
- Estimated work time: {hours}
- Critical path: {task ID sequence}
- Referenced requirements: {REQ-001, REQ-002...}
- Design documents: {overview of referenced design documents}

## todo

### Phase 1: Foundation Construction

- [ ] **TASK-001 [DIRECT]**: {task name} (REQ-{XXX} support)

  - [ ] {implementation detail 1 (extracted from architecture.md)}
  - [ ] {database setup (extracted from database-schema.sql)}
  - [ ] {test requirement 1}
  - [ ] {acceptance criteria (extracted from requirements.md)}
  - [ ] {completion condition 1}

- [ ] **TASK-002 [DIRECT]**: {task name} (REQ-{XXX} support)
  - [ ] {implementation detail 1 (extracted from architecture.md)}
  - [ ] {environment setup (extracted from dataflow.md)}
  - [ ] {test requirement 1}
  - [ ] {acceptance criteria (extracted from requirements.md)}
  - [ ] {completion condition 1}

### Phase 2: API Implementation

- [ ] **TASK-101 [TDD]**: {task name} (REQ-{XXX} support)
  - [ ] {implementation detail 1 (extracted from api-endpoints.md)}
  - [ ] {interface implementation (extracted from interfaces.ts)}
  - [ ] {test requirement 1}
  - [ ] {error handling 1 (extracted from edge cases)}
  - [ ] {acceptance criteria (extracted from requirements.md)}

### Phase 3: Frontend Implementation

- [ ] **TASK-201 [TDD]**: {task name} (REQ-{XXX} support)
  - [ ] {implementation detail 1 (extracted from interfaces.ts)}
  - [ ] {data flow implementation (extracted from dataflow.md)}
  - [ ] {UI/UX requirement 1}
  - [ ] {usability requirement (extracted from NFR-201)}
  - [ ] {test requirement 1}
  - [ ] {acceptance criteria (extracted from requirements.md)}

### Phase 4: Integration and Optimization

- [ ] **TASK-301 [TDD]**: {task name} (REQ-{XXX} support)
  - [ ] {implementation detail 1 (extracted from all design documents)}
  - [ ] {E2E test (extracted from dataflow.md)}
  - [ ] {performance requirement (extracted from NFR-001)}
  - [ ] {security requirement (extracted from NFR-101)}
  - [ ] {test requirement 1}
  - [ ] {acceptance criteria (extracted from requirements.md)}

## Execution Order

1. **Foundation Construction** ({task ID sequence}) - Reason: Prerequisites for other tasks
2. **API Implementation** ({task ID sequence}) - Reason: Frontend dependencies
3. **Frontend Implementation** ({task ID sequence}) - Reason: User interface
4. **Integration and Optimization** ({task ID sequence}) - Reason: Final quality assurance

## Implementation Process

### TDD Task Implementation Process

[TDD] tasks are implemented in the following order:

1. `/{taskID}/tdd-requirements.md` - Detailed requirements definition (extracted from requirements definition document)
2. `/{taskID}/tdd-testcases.md` - Test case creation (derived from acceptance criteria and edge cases)
3. `/{taskID}/tdd-red.md` - Test implementation (failure)
4. `/{taskID}/tdd-green.md` - Minimal implementation (compliant with architecture design)
5. `/{taskID}/tdd-refactor.md` - Refactoring (consistency check with design documents)
6. `/{taskID}/tdd-verify-complete.md` - Quality verification (verification with requirements definition acceptance criteria)

### DIRECT Task Implementation Process

[DIRECT] tasks are implemented in the following order:

1. `/{taskID}/direct-setup.md` - Configuration work execution (based on design documents)
2. `/{taskID}/direct-verify.md` - Configuration verification (operation check and testing)

## Document Integration

- **{requirement-name}-requirements.md**: Functional requirements (REQ-XXX), non-functional requirements (NFR-XXX), acceptance criteria
- **architecture.md**: Overall implementation policy and architecture patterns
- **database-schema.sql**: Implementation details for database-related tasks
- **api-endpoints.md**: API implementation task specifications and verification conditions
- **interfaces.ts**: Contracts between frontend and backend
- **dataflow.md**: Data processing flow and integration test scenarios
```

1. **Feedback Response** After presenting the TODO list, adjust the following based on user feedback:

- Task granularity (finer/larger)
- Priority changes
- Addition of missing tasks
- Removal of unnecessary tasks
- Implementation approach changes
