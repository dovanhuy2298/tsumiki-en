# direct-verify

## Purpose

Verify operation and run tests for the configuration work performed in a DIRECT task. Confirm that configurations are correctly applied and that the system behaves as expected.

## Prerequisites

- `direct-setup.md` has been executed
- Task ID is provided
- A record of configuration work exists

## Execution Content

**Important**: If compile or syntax errors are found in files created by direct-setup, an automatic attempt to resolve them will be performed.

1. **Configuration Verification**

   - Search related configurations and verification patterns with @agent-symbol-searcher and read found files with the Read tool
   - Read `docs/implements/{TASK-ID}/setup-report.md` with the Read tool and confirm the results of configuration work
   - Verify environment variables
   - Verify configuration file contents
   - Verify dependency installation status
   - Verify service startup status

2. **Compile/Syntax Verification**

   - TypeScript/JavaScript syntax error check (if applicable)
   - Configuration file syntax verification (JSON, YAML, etc.)
   - SQL syntax verification (if applicable)
   - Resolve minimal compile errors

3. **Run Operation Tests**

   - Search existing test cases and verification scripts with @agent-symbol-searcher and read found files with the Read tool
   - Basic operation check
   - Connectivity tests
   - Permission check
   - Error case check

4. **Quality Checks**
   - Verify security-related settings
   - Verify performance baselines
   - Verify logs

## Output Destination

Verification records are created under `docs/implements/{TASK-ID}/` as the following file:

- `verify-report.md`: Record of configuration verification and operation tests

## Example Output Format

````markdown
# {TASK-ID} Configuration Verification & Operation Tests

## Summary

- **Task ID**: {TASK-ID}
- **Scope**: {Overview of configuration verification}
- **Execution Date**: {Date/time}
- **Executor**: {Executor}

## Configuration Verification Results

### 1. Environment Variables

```bash
# Commands executed
echo $NODE_ENV
echo $DATABASE_URL
```

**Results**:

- [x] NODE_ENV: development (Expected: development)
- [x] DATABASE_URL: postgresql://localhost:5432/mydb (Expected: valid DB URL)

### 2. Configuration Files

**Target File**: `config/database.json`

```bash
# Commands executed
cat config/database.json | jq .
```

**Results**:

- [x] File exists
- [x] Valid JSON format
- [x] Required configuration keys present

## Compile/Syntax Check Results

### 1. TypeScript/JavaScript Syntax Check

```bash
# If TypeScript files exist
npx tsc --noEmit --skipLibCheck

# JavaScript syntax check
node --check *.js
```

**Results**:

- [x] TypeScript syntax errors: none
- [x] JavaScript syntax errors: none
- [x] import/require statements: valid

### 2. Configuration File Syntax Check

```bash
# JSON configuration syntax check
cat config/*.json | jq empty

# YAML configuration syntax check (if applicable)
yamllint config/*.yml
```

**Results**:

- [x] JSON syntax: valid
- [x] YAML syntax: valid (if applicable)
- [x] Configuration key validity: verified

### 3. SQL Syntax Check (if applicable)

```bash
# Basic SQL syntax check
psql -d mydb --single-transaction --set ON_ERROR_STOP=on -f schema.sql --dry-run
```

**Results**:

- [x] SQL syntax: valid
- [x] Table definitions: valid
- [x] Constraint definitions: valid

### 3. Dependency Verification

```bash
# Commands executed
npm list express pg
```

**Results**:

- [x] express: installed
- [x] pg: installed

### 4. Database Connectivity Test

```bash
# Commands executed
psql -d mydb -c "SELECT 1;"
```

**Results**:

- [x] Database connection: success
- [x] Query execution: success

## Operation Test Results

### 1. Basic Operation

```bash
# Test command executed
node -e "console.log('Hello, World!');"
```

**Results**:

- [x] Node.js runtime: OK
- [x] Basic JavaScript execution: OK

### 2. Database Connection Test

```javascript
// Test script
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Connected:", res.rows[0]);
  }
  pool.end();
});
```

**Results**:

- [x] Database connection: OK
- [x] Query execution: OK
- [x] Connection close: OK

### 3. Security Settings Test

```bash
# Commands executed
ls -la config/
ps aux | grep node
```

**Results**:

- [x] Configuration file permissions: appropriate
- [x] Process execution privileges: appropriate
- [x] Protection of sensitive information: appropriate

## Quality Check Results

### Performance

- [x] Startup time: within 2 seconds
- [x] Memory usage: within 256 MB
- [x] CPU usage: within 10%

### Logs

- [x] Error logs: none
- [x] Warning logs: none
- [x] Info logs: output appropriately

## Overall Verification Result

- [x] Configuration work completed correctly
- [x] All operation tests succeeded
- [x] Meets quality standards
- [x] Ready to proceed to the next task

## Found Issues and Resolutions

### Resolution of Syntax/Compile Errors

**Issues automatically attempted**:

- TypeScript/JavaScript syntax errors
- JSON/YAML syntax errors
- Basic SQL syntax errors
- import/require issues

### Issue 1: {Describe issue if any}

- **Details**: {Issue details}
- **Detected by**: {Syntax check/Compile/Operation test}
- **Severity**: {High/Medium/Low}
- **Auto-fix**: {Commands/changes applied}
- **Result**: {Resolved/Manual action required}

### Resolution Execution Log

```bash
# Sample commands executed to resolve issues
# Fix syntax
gsed -i 's/typo/correct/g' config.js

# Fix dependencies
npm install missing-package

# Update config file
jq '.port = 3000' config.json > temp.json && mv temp.json config.json
```

**Resolution Summary**:

- [x] Issue 1: Resolved
- [x] Issue 2: Resolved
- [ ] Issue 3: Manual action required (see recommendations)

## Recommendations

- {Add improvement suggestions if any}
- {Add optimization suggestions if any}

## Next Steps

- Report task completion
- Prepare to start related tasks
- Fine-tune configuration if necessary
````

## Post-execution Verification

- Verify that `docs/implements/{TASK-ID}/verify-report.md` has been created
- Verify that all verification items are completed
- Verify that any issues found have been addressed appropriately
- Verify that the task completion criteria are satisfied
- Verify readiness to proceed to the next task

## Directory Check

Confirm that the directory `docs/implements/{TASK-ID}/` exists (it should have been created in direct-setup).

## Task Completion Marking

If quality checks are sufficient and all verification items pass, add a completion mark to the corresponding task file under the tasks directory.

### Completion Criteria

Mark the task complete only if all of the following are true:

- [ ] All configuration verification items passed
- [ ] Compile/syntax checks succeeded (all errors resolved)
- [ ] All operation tests succeeded
- [ ] Quality checks meet standards
- [ ] Issues identified have been addressed
- [ ] Security settings are appropriate
- [ ] Performance meets baseline

### How to Mark Complete

1. Locate the task file specified by the user
2. Add a `✅ Completed` or `[COMPLETED]` mark to the relevant section or task item in the file
3. Record completion date/time and verifier

## README.md Update

When the task is completed, create or update the project's root `README.md`.

### What to Update

1. **Check the current README.md**: If it exists, review the content
2. **Add information about the completed task**:
   - Overview of the implemented feature
   - Configuration steps
   - How to verify operation
   - Usage instructions
3. **Update project-wide information**:
   - Setup steps
   - Dependencies
   - Environment requirements
   - Development/operations procedures

### README.md Update Example Format

````markdown
# Project Name

## Overview

{Project overview}

## Completed Features

### {TASK-ID}: {Task Name}

- **Implementation Date**: {Date}
- **Overview**: {Feature overview}
- **Configuration**: {What was configured}
- **Verification**: {Verification results}

## Setup

### Prerequisites

- {Required environment/tools}

### Installation

```bash
# Install dependencies
{install command}

# Environment variables
{env vars setup}
```
````

### Start

```bash
# Start development server
{start command}
```

## Configuration

### Environment Variables

- `{ENV_VAR_NAME}`: {Description}

### Configuration Files

- `{path/to/config}`: {Description}

## Usage

{How to use}

## Development

### Prepare Dev Environment

{Steps to prepare dev environment}

### Test

{How to run tests}

## Troubleshooting

### Common Issues

- **Issue**: {Issue}
- **Solution**: {Solution}

## Changelog

- {Date}: {TASK-ID} {Changes}

```

### Steps
1. Review the current README.md (create new if it does not exist)
2. Add information about the completed task
3. Update other sections as needed
4. Commit the changes
```
