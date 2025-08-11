# Tsumiki - AI-Driven Development Support Framework

Tsumiki is a framework for AI-driven development. It provides an efficient development process leveraging AI, from requirements definition to implementation.

## Origin and Attribution

This repository is an English translation/adaptation of the original Tsumiki project by Classmethod Inc. The upstream (Japanese) source is available at [classmethod/tsumiki](https://github.com/classmethod/tsumiki). Credit for the original concept, content, and implementation belongs to the upstream authors; this repository focuses on making the documentation and command templates accessible in English.

## Installation

To use Tsumiki, install it with the following npx command:

```bash
npx https://github.com/dovanhuy2298/tsumiki-en.git install
```

Running this command installs Tsumiki’s Claude Code slash commands into `.claude/commands/`.

## Overview

Tsumiki consists of the following two command groups:

- **kairo** - A comprehensive development flow from requirements to implementation
- **tdd** - Standalone execution of Test-Driven Development (TDD)

### Kairo Commands

Kairo automates and supports the development process from requirements to implementation. It supports the following flow:

1. **Requirements Definition** - Generate a detailed requirements document from a high-level summary
2. **Design** - Automatically generate a technical design document
3. **Task Decomposition** - Split and order implementation tasks appropriately
4. **TDD Implementation** - High-quality implementation via Test-Driven Development

## Available Commands

### Kairo Commands (End-to-End Development Flow)

- `kairo-requirements` - Requirements definition
- `kairo-design` - Generate design documentation
- `kairo-tasks` - Task decomposition
- `kairo-implement` - Execute implementation

### TDD Commands (Run Individually)

- `tdd-requirements` - TDD requirements definition
- `tdd-testcases` - Create test cases
- `tdd-red` - Test implementation (Red)
- `tdd-green` - Minimal implementation (Green)
- `tdd-refactor` - Refactoring
- `tdd-verify-complete` - Verify TDD completion

### Reverse Engineering Commands

- `rev-tasks` - Reverse-generate a task list from existing code
- `rev-design` - Reverse-generate design documents from existing code
- `rev-specs` - Reverse-generate test specifications from existing code
- `rev-requirements` - Reverse-generate a requirements document from existing code

## Quick Start

### End-to-End Development Flow

```bash
# 1. Requirements
/kairo-requirements

# 2. Design
/kairo-design

# 3. Task decomposition
/kairo-tasks

# 4. Implementation
/kairo-implement
```

### Individual TDD Process

```bash
/tdd-requirements
/tdd-testcases
/tdd-red
/tdd-green
/tdd-refactor
/tdd-verify-complete
```

### Reverse Engineering

```bash
# 1. Analyze task structure from existing code
/rev-tasks

# 2. Reverse-generate design documents (recommended after task analysis)
/rev-design

# 3. Reverse-generate test specifications (recommended after design documents)
/rev-specs

# 4. Reverse-generate requirements (recommended after all analyses)
/rev-requirements
```

### Clean Up the Development Environment

```bash
# Clean up the development environment
/clear
```

## Detailed Manual

For detailed usage, directory structure, workflow examples, and troubleshooting, see [MANUAL.md](./MANUAL.md).
