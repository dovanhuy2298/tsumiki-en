#!/usr/bin/env node

// src/cli.ts
import { Command } from "commander";

// src/commands/gitignore.tsx
import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { Box, Newline, render, Text } from "ink";
import React, { useEffect, useState } from "react";
var GitignoreComponent = () => {
  const [status, setStatus] = useState("starting");
  const [addedRules, setAddedRules] = useState([]);
  const [skippedRules, setSkippedRules] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const performGitignoreUpdate = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const gitignorePath = path.join(currentDir, ".gitignore");
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const tsumikiDir = path.join(__dirname, "commands");
        const files = await fs.readdir(tsumikiDir);
        const targetFiles = files.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        const rulesToAdd = targetFiles.map(
          (file) => `.claude/commands/${file}`
        );
        let gitignoreContent = "";
        let gitignoreExists = false;
        try {
          gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
          gitignoreExists = true;
        } catch {
          gitignoreExists = false;
        }
        const existingLines = gitignoreContent.split("\n").map((line) => line.trim());
        const rulesToActuallyAdd = [];
        const rulesAlreadyExist = [];
        for (const rule of rulesToAdd) {
          if (existingLines.includes(rule)) {
            rulesAlreadyExist.push(rule);
          } else {
            rulesToActuallyAdd.push(rule);
          }
        }
        if (rulesToActuallyAdd.length === 0) {
          setSkippedRules(rulesAlreadyExist);
          setStatus("skipped");
          setTimeout(() => {
            process.exit(0);
          }, 2e3);
          return;
        }
        setStatus("updating");
        let newContent = gitignoreContent;
        if (gitignoreExists && gitignoreContent.length > 0 && !gitignoreContent.endsWith("\n")) {
          newContent += "\n";
        }
        if (gitignoreExists && gitignoreContent.length > 0) {
          newContent += "\n# Tsumiki command templates\n";
        } else {
          newContent = "# Tsumiki command templates\n";
        }
        for (const rule of rulesToActuallyAdd) {
          newContent += `${rule}
`;
        }
        await fs.writeFile(gitignorePath, newContent);
        setAddedRules(rulesToActuallyAdd);
        setSkippedRules(rulesAlreadyExist);
        setStatus("completed");
        setTimeout(() => {
          process.exit(0);
        }, 2e3);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setStatus("error");
        setTimeout(() => {
          process.exit(1);
        }, 3e3);
      }
    };
    performGitignoreUpdate();
  }, []);
  if (status === "starting") {
    return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, "\u{1F680} .gitignore \u306E\u66F4\u65B0\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, { color: "yellow" }, "\u{1F4CB} .gitignore \u30D5\u30A1\u30A4\u30EB\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "updating") {
    return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, { color: "blue" }, "\u270F\uFE0F .gitignore \u3092\u66F4\u65B0\u4E2D..."));
  }
  if (status === "error") {
    return /* @__PURE__ */ React.createElement(Box, { flexDirection: "column" }, /* @__PURE__ */ React.createElement(Text, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ React.createElement(Text, { color: "red" }, error));
  }
  if (status === "skipped") {
    return /* @__PURE__ */ React.createElement(Box, { flexDirection: "column" }, /* @__PURE__ */ React.createElement(Text, { color: "yellow" }, "\u23ED\uFE0F \u3059\u3079\u3066\u306E\u30EB\u30FC\u30EB\u304C\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059"), /* @__PURE__ */ React.createElement(Newline, null), /* @__PURE__ */ React.createElement(Text, null, "\u65E2\u5B58\u306E\u30EB\u30FC\u30EB:"), skippedRules.map((rule) => /* @__PURE__ */ React.createElement(Text, { key: rule, color: "gray" }, "\u2022 ", rule)), /* @__PURE__ */ React.createElement(Newline, null), /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, ".gitignore \u306E\u66F4\u65B0\u306F\u4E0D\u8981\u3067\u3057\u305F"));
  }
  if (status === "completed") {
    return /* @__PURE__ */ React.createElement(Box, { flexDirection: "column" }, /* @__PURE__ */ React.createElement(Text, { color: "green" }, "\u2705 .gitignore \u306E\u66F4\u65B0\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ React.createElement(Newline, null), addedRules.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, null, "\u8FFD\u52A0\u3055\u308C\u305F\u30EB\u30FC\u30EB (", addedRules.length, "\u500B):"), addedRules.map((rule) => /* @__PURE__ */ React.createElement(Text, { key: rule, color: "green" }, "\u2022 ", rule))), skippedRules.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, null, "\u65E2\u5B58\u306E\u30EB\u30FC\u30EB (", skippedRules.length, "\u500B):"), skippedRules.map((rule) => /* @__PURE__ */ React.createElement(Text, { key: rule, color: "gray" }, "\u2022 ", rule))), /* @__PURE__ */ React.createElement(Newline, null), /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, "Tsumiki \u306E\u30B3\u30DE\u30F3\u30C9\u30D5\u30A1\u30A4\u30EB\u304C Git \u304B\u3089\u7121\u8996\u3055\u308C\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3057\u305F"));
  }
  return null;
};
var gitignoreCommand = () => {
  render(React.createElement(GitignoreComponent));
};

// src/commands/install.tsx
import * as path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import fs2 from "fs-extra";
import { Box as Box2, Newline as Newline2, render as render2, Text as Text2 } from "ink";
import React2, { useEffect as useEffect2, useState as useState2 } from "react";
var InstallComponent = () => {
  const [status, setStatus] = useState2("starting");
  const [copiedFiles, setCopiedFiles] = useState2([]);
  const [error, setError] = useState2(null);
  useEffect2(() => {
    const performInstall = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const commandsTargetDir = path2.join(currentDir, ".claude", "commands");
        const agentsTargetDir = path2.join(currentDir, ".claude", "agents");
        const __filename = fileURLToPath2(import.meta.url);
        const __dirname = path2.dirname(__filename);
        const tsumikiCommandsDir = path2.join(__dirname, "commands");
        const tsumikiAgentsDir = path2.join(__dirname, "agents");
        await fs2.ensureDir(commandsTargetDir);
        await fs2.ensureDir(agentsTargetDir);
        setStatus("copying");
        const commandFiles = await fs2.readdir(tsumikiCommandsDir);
        const targetCommandFiles = commandFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        let targetAgentFiles = [];
        try {
          const agentFiles = await fs2.readdir(tsumikiAgentsDir);
          targetAgentFiles = agentFiles.filter((file) => file.endsWith(".md"));
        } catch {
        }
        const copiedFilesList = [];
        for (const file of targetCommandFiles) {
          const sourcePath = path2.join(tsumikiCommandsDir, file);
          const targetPath = path2.join(commandsTargetDir, file);
          await fs2.copy(sourcePath, targetPath);
          copiedFilesList.push(`commands/${file}`);
        }
        for (const file of targetAgentFiles) {
          const sourcePath = path2.join(tsumikiAgentsDir, file);
          const targetPath = path2.join(agentsTargetDir, file);
          await fs2.copy(sourcePath, targetPath);
          copiedFilesList.push(`agents/${file}`);
        }
        setCopiedFiles(copiedFilesList);
        setStatus("completed");
        setTimeout(() => {
          process.exit(0);
        }, 2e3);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setStatus("error");
        setTimeout(() => {
          process.exit(1);
        }, 3e3);
      }
    };
    performInstall();
  }, []);
  if (status === "starting") {
    return /* @__PURE__ */ React2.createElement(Box2, null, /* @__PURE__ */ React2.createElement(Text2, { color: "cyan" }, "\u{1F680} Tsumiki \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ React2.createElement(Box2, null, /* @__PURE__ */ React2.createElement(Text2, { color: "yellow" }, "\u{1F4CB} \u74B0\u5883\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "copying") {
    return /* @__PURE__ */ React2.createElement(Box2, null, /* @__PURE__ */ React2.createElement(Text2, { color: "blue" }, "\u{1F4DD} \u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30B3\u30D4\u30FC\u4E2D..."));
  }
  if (status === "error") {
    return /* @__PURE__ */ React2.createElement(Box2, { flexDirection: "column" }, /* @__PURE__ */ React2.createElement(Text2, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ React2.createElement(Text2, { color: "red" }, error));
  }
  if (status === "completed") {
    return /* @__PURE__ */ React2.createElement(Box2, { flexDirection: "column" }, /* @__PURE__ */ React2.createElement(Text2, { color: "green" }, "\u2705 \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ React2.createElement(Newline2, null), /* @__PURE__ */ React2.createElement(Text2, null, "\u30B3\u30D4\u30FC\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB (", copiedFiles.length, "\u500B):"), copiedFiles.map((file) => /* @__PURE__ */ React2.createElement(Text2, { key: file, color: "gray" }, " ", "\u2022 ", file)), /* @__PURE__ */ React2.createElement(Newline2, null), /* @__PURE__ */ React2.createElement(Text2, { color: "cyan" }, "Claude Code\u3067\u4EE5\u4E0B\u306E\u3088\u3046\u306B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u7528\u3067\u304D\u307E\u3059:"), /* @__PURE__ */ React2.createElement(Text2, { color: "white" }, " /tdd-requirements"), /* @__PURE__ */ React2.createElement(Text2, { color: "white" }, " /kairo-design"), /* @__PURE__ */ React2.createElement(Text2, { color: "white" }, " @agent-symbol-searcher"), /* @__PURE__ */ React2.createElement(Text2, { color: "white" }, " ..."));
  }
  return null;
};
var installCommand = () => {
  render2(React2.createElement(InstallComponent));
};

// src/commands/uninstall.tsx
import * as path3 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import fs3 from "fs-extra";
import { Box as Box3, Newline as Newline3, render as render3, Text as Text3 } from "ink";
import React3, { useEffect as useEffect3, useState as useState3 } from "react";
var UninstallComponent = () => {
  const [status, setStatus] = useState3("starting");
  const [removedFiles, setRemovedFiles] = useState3([]);
  const [error, setError] = useState3(null);
  useEffect3(() => {
    const performUninstall = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const targetDir = path3.join(currentDir, ".claude", "commands");
        const dirExists = await fs3.pathExists(targetDir);
        if (!dirExists) {
          setStatus("not_found");
          setTimeout(() => {
            process.exit(0);
          }, 2e3);
          return;
        }
        const __filename = fileURLToPath3(import.meta.url);
        const __dirname = path3.dirname(__filename);
        const tsumikiDir = path3.join(__dirname, "commands");
        const tsumikiFiles = await fs3.readdir(tsumikiDir);
        const tsumikiTargetFiles = tsumikiFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        setStatus("removing");
        const installedFiles = await fs3.readdir(targetDir);
        const removedFilesList = [];
        for (const file of installedFiles) {
          if (tsumikiTargetFiles.includes(file)) {
            const filePath = path3.join(targetDir, file);
            await fs3.remove(filePath);
            removedFilesList.push(file);
          }
        }
        const remainingFiles = await fs3.readdir(targetDir);
        if (remainingFiles.length === 0) {
          await fs3.rmdir(targetDir);
          const claudeDir = path3.dirname(targetDir);
          const claudeFiles = await fs3.readdir(claudeDir);
          if (claudeFiles.length === 0) {
            await fs3.rmdir(claudeDir);
          }
        }
        setRemovedFiles(removedFilesList);
        setStatus("completed");
        setTimeout(() => {
          process.exit(0);
        }, 2e3);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setStatus("error");
        setTimeout(() => {
          process.exit(1);
        }, 3e3);
      }
    };
    performUninstall();
  }, []);
  if (status === "starting") {
    return /* @__PURE__ */ React3.createElement(Box3, null, /* @__PURE__ */ React3.createElement(Text3, { color: "cyan" }, "\u{1F5D1}\uFE0F Tsumiki \u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ React3.createElement(Box3, null, /* @__PURE__ */ React3.createElement(Text3, { color: "yellow" }, "\u{1F4CB} \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u72B6\u6CC1\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "removing") {
    return /* @__PURE__ */ React3.createElement(Box3, null, /* @__PURE__ */ React3.createElement(Text3, { color: "blue" }, "\u{1F5D1}\uFE0F \u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u4E2D..."));
  }
  if (status === "not_found") {
    return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Text3, { color: "yellow" }, "\u26A0\uFE0F .claude/commands \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"), /* @__PURE__ */ React3.createElement(Text3, { color: "gray" }, "Tsumiki\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u306A\u3044\u3088\u3046\u3067\u3059\u3002"));
  }
  if (status === "error") {
    return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Text3, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ React3.createElement(Text3, { color: "red" }, error));
  }
  if (status === "completed") {
    if (removedFiles.length === 0) {
      return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Text3, { color: "yellow" }, "\u26A0\uFE0F \u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A1\u30A4\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F"), /* @__PURE__ */ React3.createElement(Text3, { color: "gray" }, "Tsumiki\u306E\u30B3\u30DE\u30F3\u30C9\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u306A\u3044\u3088\u3046\u3067\u3059\u3002"));
    }
    return /* @__PURE__ */ React3.createElement(Box3, { flexDirection: "column" }, /* @__PURE__ */ React3.createElement(Text3, { color: "green" }, "\u2705 \u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ React3.createElement(Newline3, null), /* @__PURE__ */ React3.createElement(Text3, null, "\u524A\u9664\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB (", removedFiles.length, "\u500B):"), removedFiles.map((file) => /* @__PURE__ */ React3.createElement(Text3, { key: file, color: "gray" }, " ", "\u2022 ", file)), /* @__PURE__ */ React3.createElement(Newline3, null), /* @__PURE__ */ React3.createElement(Text3, { color: "cyan" }, "Tsumiki\u306EClaude Code\u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002"));
  }
  return null;
};
var uninstallCommand = () => {
  render3(React3.createElement(UninstallComponent));
};

// src/cli.ts
var program = new Command();
program.name("tsumiki-en").description("CLI tool for installing Claude Code command templates").version("1.0.0");
program.command("install").description("Install Claude Code command templates to .claude/commands/").action(installCommand);
program.command("uninstall").description("Uninstall Claude Code command templates from .claude/commands/").action(uninstallCommand);
program.command("gitignore").description("Add commands/*.{md,sh} to .gitignore file").action(gitignoreCommand);
program.parse();
