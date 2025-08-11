# direct-setup

## Purpose

Execute configuration work for DIRECT tasks. Perform environment setup, configuration file creation, dependency installation, etc., based on design documents.

## Prerequisites

- Task ID is provided
- Related design documents exist
- Necessary permissions and environment are prepared

## Execution Content

1. **Design Document Verification**

   - Search for related design documents and configuration patterns using @agent-symbol-searcher, and read found files with Read tool
   - Read `docs/design/{requirement-name}/architecture.md` with Read tool
   - Read `docs/design/{requirement-name}/database-schema.sql` with Read tool
   - Read other related design documents with Read tool

2. **Configuration Work Execution**

   - Search for existing configuration files and environment variables using @agent-symbol-searcher, and read found files with Read tool
   - Environment variable configuration
   - Configuration file creation/update
   - Dependency installation
   - Database initialization
   - Service startup configuration
   - Permission setup

3. **Work Record Creation**
   - Record of executed commands
   - Record of changed configurations
   - Record of encountered problems and solutions

## Output Destination

Work records are created in the `docs/implements/{TASK-ID}/` directory as the following files:

- `setup-report.md`: Configuration work execution record

## Output Format Example

````markdown
# {TASK-ID} Configuration Work Execution

## Work Summary

- **Task ID**: {TASK-ID}
- **Work Content**: {Configuration work overview}
- **Execution Date**: {Execution date and time}
- **Executor**: {Executor}

## Design Document Reference

- **Referenced Documents**: {List of referenced design documents}
- **Related Requirements**: {REQ-XXX, REQ-YYY}

## Executed Work

### 1. Environment Variable Configuration

```bash
# Executed commands
export NODE_ENV=development
export DATABASE_URL=postgresql://localhost:5432/mydb
```
````

**Configuration Content**:

- NODE_ENV: Set to development environment
- DATABASE_URL: PostgreSQL database URL

### 2. Configuration File Creation

**Created File**: `config/database.json`

```json
{
  "development": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb"
  }
}
```

### 3. Dependency Installation

```bash
# Executed commands
npm install express pg
```

**Installation Content**:

- express: Web framework
- pg: PostgreSQL client

### 4. Database Initialization

```bash
# Executed commands
createdb mydb
psql -d mydb -f database-schema.sql
```

**Execution Content**:

- Database creation
- Schema application

## Work Results

- [ ] Environment variable configuration completed
- [ ] Configuration file creation completed
- [ ] Dependency installation completed
- [ ] Database initialization completed
- [ ] Service startup configuration completed

## Encountered Problems and Solutions

### Problem 1: {Problem overview}

- **Occurrence Situation**: {Situation where the problem occurred}
- **Error Message**: {Error message}
- **Solution**: {Solution}

## Next Steps

- Execute `direct-verify.md` to verify configuration
- Adjust configuration as needed

````

## Post-execution Verification
- Verify that `docs/implements/{TASK-ID}/setup-report.md` file is created
- Verify that configuration is correctly applied
- Verify that preparation for next step (direct-verify) is complete

## Directory Creation

Create necessary directories before execution:
```bash
mkdir -p docs/implements/{TASK-ID}
````
