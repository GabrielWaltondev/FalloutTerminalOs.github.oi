// ============================================================
// COMMANDS — Each command is a function that returns lines to print
// ============================================================
// Lines can be strings or {text, class} objects.

// Current working directory state — tracked here, mutated by cd
const cwd = {
  path: [],  // empty array = root, ["personnel"] = /personnel, etc.

  getCurrentDir() {
    let node = window.FILESYSTEM;
    for (const part of this.path) {
      if (node.children && node.children[part]) {
        node = node.children[part];
      } else {
        return null;
      }
    }
    return node;
  },

  getPathString() {
    return "/" + this.path.join("/");
  }
};

// Resolve a path relative to cwd. Returns the node, or null if not found.
function resolvePath(input) {
  if (!input || input === ".") {
    return cwd.getCurrentDir();
  }

  // Build the new path array
  let parts;
  if (input.startsWith("/")) {
    parts = input.split("/").filter(p => p && p !== ".");
  } else {
    parts = [...cwd.path];
    for (const seg of input.split("/")) {
      if (!seg || seg === ".") continue;
      if (seg === "..") {
        parts.pop();
      } else {
        parts.push(seg);
      }
    }
  }

  // Walk the filesystem
  let node = window.FILESYSTEM;
  for (const part of parts) {
    if (!node.children || !node.children[part]) {
      return null;
    }
    node = node.children[part];
  }
  return { node, parts };
}

// ============================================================
// COMMAND IMPLEMENTATIONS
// ============================================================

const COMMANDS = {

  help: {
    description: "Display available commands",
    run: () => [
      { text: "AVAILABLE COMMANDS:", cls: "line-bright" },
      "",
      "  help            - Show this list",
      "  ls / dir        - List contents of current directory",
      "  cd <path>       - Change directory (cd ..  to go up)",
      "  pwd             - Print working directory",
      "  read <file>     - Display file contents",
      "  cat <file>      - Same as read",
      "  hack            - Practice hack (random average puzzle)",
      "  hack <difficulty>  - very_easy / easy / average / hard",
      "  hack <file>     - Hack a locked file to read it",
      "  skin            - List terminal skins",
      "  skin <name>     - Switch to a different terminal",
      "  clear / cls     - Clear the screen",
      "  whoami          - Display current user",
      "  date            - Show current date/time",
      "  echo <text>     - Print text back",
      "  about           - About this terminal",
      "  exit / logout   - Logout from terminal",
      "",
      { text: "TIP:", cls: "line-dim" },
      { text: "Use Tab to complete filenames. Up/Down arrows recall history.", cls: "line-dim" },
      { text: "During a hack: click words/brackets, or type the word + Enter.", cls: "line-dim" },
    ],
  },

  skin: {
    description: "List or switch terminal skins",
    run: (args) => {
      if (!window.skinManager) {
        return [{ text: "Skin system not loaded.", cls: "line-error" }];
      }

      // No args — list available skins
      if (!args[0]) {
        const skins = window.skinManager.list();
        const lines = [
          { text: "AVAILABLE TERMINAL SKINS:", cls: "line-bright" },
          "",
        ];
        for (const s of skins) {
          const marker = s.active ? "[*]" : "   ";
          lines.push({ text: `${marker} ${s.id.padEnd(12)} ${s.name}`, cls: s.active ? "line-bright" : "" });
          lines.push({ text: `       ${s.description}`, cls: "line-dim" });
        }
        lines.push("");
        lines.push({ text: "Switch with: skin <id>", cls: "line-dim" });
        lines.push({ text: "Each skin has its own filesystem and lore.", cls: "line-dim" });
        return lines;
      }

      // Switch skin
      const id = args[0].toLowerCase();
      const result = window.skinManager.applySkin(id);
      if (result.error) {
        return [{ text: result.error, cls: "line-error" }];
      }

      // Clear the screen and re-run boot for the new skin
      const sc = document.getElementById("screen-content");
      if (sc) sc.innerHTML = "";

      // Hide prompt during boot
      const promptArea = document.getElementById("prompt-area");
      if (promptArea) promptArea.style.display = "none";

      // Trigger a quick boot for the new skin
      if (window.runBootSequence) {
        setTimeout(() => window.runBootSequence(), 100);
      }
      return [];
    },
  },

  ls: {
    description: "List directory contents",
    run: (args) => {
      const target = args[0] ? resolvePath(args[0]) : { node: cwd.getCurrentDir() };
      if (!target || !target.node) {
        return [{ text: `ls: cannot access '${args[0]}': No such file or directory`, cls: "line-error" }];
      }
      const node = target.node;
      if (node.type !== "dir") {
        return [node.name];
      }

      const lines = [];
      const entries = Object.values(node.children || {});
      if (entries.length === 0) {
        lines.push({ text: "(empty directory)", cls: "line-dim" });
        return lines;
      }

      // Header
      lines.push({ text: "TYPE  NAME                          SIZE", cls: "line-dim" });
      lines.push({ text: "----  ----------------------------  --------", cls: "line-dim" });

      // Directories first, then files
      const dirs  = entries.filter(e => e.type === "dir").sort((a,b) => a.name.localeCompare(b.name));
      const files = entries.filter(e => e.type === "file").sort((a,b) => a.name.localeCompare(b.name));

      for (const d of dirs) {
        lines.push(`<DIR>  ${d.name.padEnd(28)}  -`);
      }
      for (const f of files) {
        const size = f.content ? `${f.content.length} bytes` : "0 bytes";
        const fullPath = (target.parts ? "/" + target.parts.join("/") : window.cwd.getPathString()) + "/" + f.name;
        const isUnlocked = window.UNLOCKED_FILES && window.UNLOCKED_FILES.has(fullPath.replace(/\/+/g, '/'));
        if (f.locked && !isUnlocked) {
          lines.push({ text: `<LCK>  ${f.name.padEnd(28)}  [LOCKED]`, cls: "line-warning" });
        } else if (f.locked && isUnlocked) {
          lines.push({ text: `<FIL>  ${f.name.padEnd(28)}  ${size}`, cls: "line-bright" });
        } else {
          lines.push({ text: `<FIL>  ${f.name.padEnd(28)}  ${size}` });
        }
      }
      return lines;
    },
  },

  // Alias
  dir: {
    description: "Same as ls",
    run: (args) => COMMANDS.ls.run(args),
  },

  cd: {
    description: "Change directory",
    run: (args) => {
      if (!args[0]) {
        cwd.path = [];
        return [];
      }
      const arg = args[0];
      if (arg === "/") {
        cwd.path = [];
        return [];
      }

      const target = resolvePath(arg);
      if (!target || !target.node) {
        return [{ text: `cd: no such directory: ${arg}`, cls: "line-error" }];
      }
      if (target.node.type !== "dir") {
        return [{ text: `cd: not a directory: ${arg}`, cls: "line-error" }];
      }
      cwd.path = target.parts;
      return [];
    },
  },

  pwd: {
    description: "Print working directory",
    run: () => [cwd.getPathString()],
  },

  read: {
    description: "Display file contents",
    run: (args) => {
      if (!args[0]) {
        return [{ text: "read: missing filename. Usage: read <file>", cls: "line-error" }];
      }
      const target = resolvePath(args[0]);
      if (!target || !target.node) {
        return [{ text: `read: ${args[0]}: No such file`, cls: "line-error" }];
      }
      if (target.node.type !== "file") {
        return [{ text: `read: ${args[0]}: Is a directory`, cls: "line-error" }];
      }

      const file = target.node;

      // Check if locked
      if (file.locked) {
        const fullPath = "/" + target.parts.join("/");
        if (!window.UNLOCKED_FILES || !window.UNLOCKED_FILES.has(fullPath)) {
          return [
            { text: `read: ${args[0]}: ACCESS DENIED`, cls: "line-error" },
            { text: `This file is password-protected. Use 'hack ${args[0]}' to attempt entry.`, cls: "line-warning" },
          ];
        }
      }

      const lines = [];
      lines.push({ text: `── ${file.name} ──`, cls: "line-bright" });
      lines.push("");
      const contentLines = file.content.split("\n");
      for (const ln of contentLines) {
        lines.push(ln);
      }
      lines.push("");
      lines.push({ text: `── End of ${file.name} (${file.content.length} bytes) ──`, cls: "line-dim" });
      return lines;
    },
  },

  cat: {
    description: "Same as read",
    run: (args) => COMMANDS.read.run(args),
  },

  clear: {
    description: "Clear the screen",
    run: () => {
      const sc = document.getElementById("screen-content");
      if (sc) sc.innerHTML = "";
      return [];
    },
  },

  cls: {
    description: "Same as clear",
    run: () => COMMANDS.clear.run(),
  },

  whoami: {
    description: "Display current user",
    run: () => {
      const user = window.skinManager?.getDefaultUser() || "COURIER_6";
      const auth = window.skinManager?.getAuthToken() || "0xR0BC0-7-F4LL0UT";
      return [
        { text: `USER: ${user}`, cls: "line-bright" },
        { text: `ACCESS LEVEL: TERMINAL_GUEST`, cls: "line-dim" },
        { text: `AUTH TOKEN: ${auth}`, cls: "line-dim" },
      ];
    },
  },

  date: {
    description: "Display current date/time",
    run: () => {
      const d = new Date();
      const real = d.toLocaleString();
      // Random Fallout-flavored date too, for fun
      const wasteland = `WASTELAND DATE: ${2287 + Math.floor(Math.random() * 4)}.${String(d.getMonth() + 1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;
      return [
        { text: `LOCAL TIME:    ${real}`, cls: "line-bright" },
        { text: wasteland, cls: "line-dim" },
      ];
    },
  },

  echo: {
    description: "Print text back",
    run: (args) => [args.join(" ")],
  },

  about: {
    description: "About this terminal",
    run: () => [
      { text: "ROBCO INDUSTRIES TERMLINK", cls: "line-bright" },
      { text: "Standalone Terminal Project // v0.1", cls: "line-dim" },
      "",
      "An interactive RobCo-style terminal sandbox.",
      "All filesystem content is original fiction.",
      "",
      { text: "Inspired by Fallout: New Vegas. Not affiliated with Bethesda.", cls: "line-dim" },
      "",
      "Built with: HTML, CSS, JS. No backend.",
      "Drop the folder anywhere with a browser to run.",
    ],
  },

  exit: {
    description: "Logout from terminal",
    run: () => {
      // Clear screen and show a "logged out" message
      const sc = document.getElementById("screen-content");
      if (sc) sc.innerHTML = "";
      return [
        "",
        "",
        { text: "  TERMINAL SESSION ENDED", cls: "line-bright" },
        "",
        { text: "  ROBCO INDUSTRIES (TM)", cls: "line-dim" },
        { text: "  COPYRIGHT 2075-2077", cls: "line-dim" },
        "",
        "  Reload page to log in again.",
      ];
    },
  },

  logout: {
    description: "Same as exit",
    run: () => COMMANDS.exit.run(),
  },

  hack: {
    description: "Initiate terminal hack sequence",
    run: (args) => {
      const arg = (args[0] || '').toLowerCase();

      // No args — start a random average puzzle
      if (!arg) {
        const result = window.startHack({ difficulty: 'average' });
        if (result.error) {
          return [{ text: result.error, cls: "line-error" }];
        }
        return [];  // hack screen takes over
      }

      // Difficulty levels
      const validDifficulties = ['very_easy', 'easy', 'average', 'hard'];
      if (validDifficulties.includes(arg)) {
        const result = window.startHack({ difficulty: arg });
        if (result.error) {
          return [{ text: result.error, cls: "line-error" }];
        }
        return [];
      }

      // Otherwise, treat as a file path to a locked file
      const target = window.resolvePath(arg);
      if (!target || !target.node) {
        return [
          { text: `hack: ${arg}: No such file or invalid difficulty`, cls: "line-error" },
          { text: `Valid difficulties: very_easy, easy, average, hard`, cls: "line-dim" },
        ];
      }
      if (target.node.type !== "file") {
        return [{ text: `hack: ${arg}: Is a directory`, cls: "line-error" }];
      }
      if (!target.node.locked) {
        return [{ text: `hack: ${arg}: File is not locked`, cls: "line-warning" }];
      }
      // Check if already unlocked
      const fullPath = "/" + target.parts.join("/");
      if (window.UNLOCKED_FILES.has(fullPath)) {
        return [{ text: `${arg} is already unlocked. Use 'read ${arg}' to view.`, cls: "line-dim" }];
      }

      const difficulty = target.node.difficulty || 'average';
      const result = window.startHack({
        difficulty,
        unlockOnWin: fullPath,
      });
      if (result.error) {
        return [{ text: result.error, cls: "line-error" }];
      }
      return [];
    },
  },
};

// Make commands globally available
window.COMMANDS = COMMANDS;
window.cwd = cwd;
window.resolvePath = resolvePath;
