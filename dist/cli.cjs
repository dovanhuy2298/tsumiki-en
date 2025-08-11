#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_commander = require("commander");

// src/commands/gitignore.tsx
var path = __toESM(require("path"), 1);
var import_node_url = require("url");
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_ink = require("ink");
var import_react = __toESM(require("react"), 1);
var import_meta = {};
var GitignoreComponent = () => {
  const [status, setStatus] = (0, import_react.useState)("starting");
  const [addedRules, setAddedRules] = (0, import_react.useState)([]);
  const [skippedRules, setSkippedRules] = (0, import_react.useState)([]);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const performGitignoreUpdate = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const gitignorePath = path.join(currentDir, ".gitignore");
        const __filename = (0, import_node_url.fileURLToPath)(import_meta.url);
        const __dirname = path.dirname(__filename);
        const tsumikiDir = path.join(__dirname, "commands");
        const files = await import_fs_extra.default.readdir(tsumikiDir);
        const targetFiles = files.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        const rulesToAdd = targetFiles.map(
          (file) => `.claude/commands/${file}`
        );
        let gitignoreContent = "";
        let gitignoreExists = false;
        try {
          gitignoreContent = await import_fs_extra.default.readFile(gitignorePath, "utf-8");
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
        await import_fs_extra.default.writeFile(gitignorePath, newContent);
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
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, null, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "cyan" }, "\u{1F680} .gitignore \u306E\u66F4\u65B0\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, null, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "yellow" }, "\u{1F4CB} .gitignore \u30D5\u30A1\u30A4\u30EB\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "updating") {
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, null, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "blue" }, "\u270F\uFE0F .gitignore \u3092\u66F4\u65B0\u4E2D..."));
  }
  if (status === "error") {
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "red" }, error));
  }
  if (status === "skipped") {
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "yellow" }, "\u23ED\uFE0F \u3059\u3079\u3066\u306E\u30EB\u30FC\u30EB\u304C\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059"), /* @__PURE__ */ import_react.default.createElement(import_ink.Newline, null), /* @__PURE__ */ import_react.default.createElement(import_ink.Text, null, "\u65E2\u5B58\u306E\u30EB\u30FC\u30EB:"), skippedRules.map((rule) => /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { key: rule, color: "gray" }, "\u2022 ", rule)), /* @__PURE__ */ import_react.default.createElement(import_ink.Newline, null), /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "cyan" }, ".gitignore \u306E\u66F4\u65B0\u306F\u4E0D\u8981\u3067\u3057\u305F"));
  }
  if (status === "completed") {
    return /* @__PURE__ */ import_react.default.createElement(import_ink.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "green" }, "\u2705 .gitignore \u306E\u66F4\u65B0\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ import_react.default.createElement(import_ink.Newline, null), addedRules.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, null, "\u8FFD\u52A0\u3055\u308C\u305F\u30EB\u30FC\u30EB (", addedRules.length, "\u500B):"), addedRules.map((rule) => /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { key: rule, color: "green" }, "\u2022 ", rule))), skippedRules.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_ink.Text, null, "\u65E2\u5B58\u306E\u30EB\u30FC\u30EB (", skippedRules.length, "\u500B):"), skippedRules.map((rule) => /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { key: rule, color: "gray" }, "\u2022 ", rule))), /* @__PURE__ */ import_react.default.createElement(import_ink.Newline, null), /* @__PURE__ */ import_react.default.createElement(import_ink.Text, { color: "cyan" }, "Tsumiki \u306E\u30B3\u30DE\u30F3\u30C9\u30D5\u30A1\u30A4\u30EB\u304C Git \u304B\u3089\u7121\u8996\u3055\u308C\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3057\u305F"));
  }
  return null;
};
var gitignoreCommand = () => {
  (0, import_ink.render)(import_react.default.createElement(GitignoreComponent));
};

// src/commands/install.tsx
var path2 = __toESM(require("path"), 1);
var import_node_url2 = require("url");
var import_fs_extra2 = __toESM(require("fs-extra"), 1);
var import_ink2 = require("ink");
var import_react2 = __toESM(require("react"), 1);
var import_meta2 = {};
var InstallComponent = () => {
  const [status, setStatus] = (0, import_react2.useState)("starting");
  const [copiedFiles, setCopiedFiles] = (0, import_react2.useState)([]);
  const [error, setError] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    const performInstall = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const commandsTargetDir = path2.join(currentDir, ".claude", "commands");
        const agentsTargetDir = path2.join(currentDir, ".claude", "agents");
        const __filename = (0, import_node_url2.fileURLToPath)(import_meta2.url);
        const __dirname = path2.dirname(__filename);
        const tsumikiCommandsDir = path2.join(__dirname, "commands");
        const tsumikiAgentsDir = path2.join(__dirname, "agents");
        await import_fs_extra2.default.ensureDir(commandsTargetDir);
        await import_fs_extra2.default.ensureDir(agentsTargetDir);
        setStatus("copying");
        const commandFiles = await import_fs_extra2.default.readdir(tsumikiCommandsDir);
        const targetCommandFiles = commandFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        let targetAgentFiles = [];
        try {
          const agentFiles = await import_fs_extra2.default.readdir(tsumikiAgentsDir);
          targetAgentFiles = agentFiles.filter((file) => file.endsWith(".md"));
        } catch {
        }
        const copiedFilesList = [];
        for (const file of targetCommandFiles) {
          const sourcePath = path2.join(tsumikiCommandsDir, file);
          const targetPath = path2.join(commandsTargetDir, file);
          await import_fs_extra2.default.copy(sourcePath, targetPath);
          copiedFilesList.push(`commands/${file}`);
        }
        for (const file of targetAgentFiles) {
          const sourcePath = path2.join(tsumikiAgentsDir, file);
          const targetPath = path2.join(agentsTargetDir, file);
          await import_fs_extra2.default.copy(sourcePath, targetPath);
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
    return /* @__PURE__ */ import_react2.default.createElement(import_ink2.Box, null, /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "cyan" }, "\u{1F680} Tsumiki \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ import_react2.default.createElement(import_ink2.Box, null, /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "yellow" }, "\u{1F4CB} \u74B0\u5883\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "copying") {
    return /* @__PURE__ */ import_react2.default.createElement(import_ink2.Box, null, /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "blue" }, "\u{1F4DD} \u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30B3\u30D4\u30FC\u4E2D..."));
  }
  if (status === "error") {
    return /* @__PURE__ */ import_react2.default.createElement(import_ink2.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "red" }, error));
  }
  if (status === "completed") {
    return /* @__PURE__ */ import_react2.default.createElement(import_ink2.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "green" }, "\u2705 \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Newline, null), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, null, "\u30B3\u30D4\u30FC\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB (", copiedFiles.length, "\u500B):"), copiedFiles.map((file) => /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { key: file, color: "gray" }, " ", "\u2022 ", file)), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Newline, null), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "cyan" }, "Claude Code\u3067\u4EE5\u4E0B\u306E\u3088\u3046\u306B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u7528\u3067\u304D\u307E\u3059:"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "white" }, " /tdd-requirements"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "white" }, " /kairo-design"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "white" }, " @agent-symbol-searcher"), /* @__PURE__ */ import_react2.default.createElement(import_ink2.Text, { color: "white" }, " ..."));
  }
  return null;
};
var installCommand = () => {
  (0, import_ink2.render)(import_react2.default.createElement(InstallComponent));
};

// src/commands/uninstall.tsx
var path3 = __toESM(require("path"), 1);
var import_node_url3 = require("url");
var import_fs_extra3 = __toESM(require("fs-extra"), 1);
var import_ink3 = require("ink");
var import_react3 = __toESM(require("react"), 1);
var import_meta3 = {};
var UninstallComponent = () => {
  const [status, setStatus] = (0, import_react3.useState)("starting");
  const [removedFiles, setRemovedFiles] = (0, import_react3.useState)([]);
  const [error, setError] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    const performUninstall = async () => {
      try {
        setStatus("checking");
        const currentDir = process.cwd();
        const targetDir = path3.join(currentDir, ".claude", "commands");
        const dirExists = await import_fs_extra3.default.pathExists(targetDir);
        if (!dirExists) {
          setStatus("not_found");
          setTimeout(() => {
            process.exit(0);
          }, 2e3);
          return;
        }
        const __filename = (0, import_node_url3.fileURLToPath)(import_meta3.url);
        const __dirname = path3.dirname(__filename);
        const tsumikiDir = path3.join(__dirname, "commands");
        const tsumikiFiles = await import_fs_extra3.default.readdir(tsumikiDir);
        const tsumikiTargetFiles = tsumikiFiles.filter(
          (file) => file.endsWith(".md") || file.endsWith(".sh")
        );
        setStatus("removing");
        const installedFiles = await import_fs_extra3.default.readdir(targetDir);
        const removedFilesList = [];
        for (const file of installedFiles) {
          if (tsumikiTargetFiles.includes(file)) {
            const filePath = path3.join(targetDir, file);
            await import_fs_extra3.default.remove(filePath);
            removedFilesList.push(file);
          }
        }
        const remainingFiles = await import_fs_extra3.default.readdir(targetDir);
        if (remainingFiles.length === 0) {
          await import_fs_extra3.default.rmdir(targetDir);
          const claudeDir = path3.dirname(targetDir);
          const claudeFiles = await import_fs_extra3.default.readdir(claudeDir);
          if (claudeFiles.length === 0) {
            await import_fs_extra3.default.rmdir(claudeDir);
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
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, null, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "cyan" }, "\u{1F5D1}\uFE0F Tsumiki \u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3092\u958B\u59CB\u3057\u307E\u3059..."));
  }
  if (status === "checking") {
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, null, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "yellow" }, "\u{1F4CB} \u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u72B6\u6CC1\u3092\u30C1\u30A7\u30C3\u30AF\u4E2D..."));
  }
  if (status === "removing") {
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, null, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "blue" }, "\u{1F5D1}\uFE0F \u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u4E2D..."));
  }
  if (status === "not_found") {
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "yellow" }, "\u26A0\uFE0F .claude/commands \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "gray" }, "Tsumiki\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u306A\u3044\u3088\u3046\u3067\u3059\u3002"));
  }
  if (status === "error") {
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "red" }, "\u274C \u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:"), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "red" }, error));
  }
  if (status === "completed") {
    if (removedFiles.length === 0) {
      return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "yellow" }, "\u26A0\uFE0F \u524A\u9664\u5BFE\u8C61\u306E\u30D5\u30A1\u30A4\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F"), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "gray" }, "Tsumiki\u306E\u30B3\u30DE\u30F3\u30C9\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u306A\u3044\u3088\u3046\u3067\u3059\u3002"));
    }
    return /* @__PURE__ */ import_react3.default.createElement(import_ink3.Box, { flexDirection: "column" }, /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "green" }, "\u2705 \u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F!"), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Newline, null), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, null, "\u524A\u9664\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB (", removedFiles.length, "\u500B):"), removedFiles.map((file) => /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { key: file, color: "gray" }, " ", "\u2022 ", file)), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Newline, null), /* @__PURE__ */ import_react3.default.createElement(import_ink3.Text, { color: "cyan" }, "Tsumiki\u306EClaude Code\u30B3\u30DE\u30F3\u30C9\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002"));
  }
  return null;
};
var uninstallCommand = () => {
  (0, import_ink3.render)(import_react3.default.createElement(UninstallComponent));
};

// src/cli.ts
var program = new import_commander.Command();
program.name("tsumiki-en").description("CLI tool for installing Claude Code command templates").version("1.0.0");
program.command("install").description("Install Claude Code command templates to .claude/commands/").action(installCommand);
program.command("uninstall").description("Uninstall Claude Code command templates from .claude/commands/").action(uninstallCommand);
program.command("gitignore").description("Add commands/*.{md,sh} to .gitignore file").action(gitignoreCommand);
program.parse();
