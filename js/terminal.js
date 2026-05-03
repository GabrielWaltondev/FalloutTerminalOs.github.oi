// ============================================================
// TERMINAL CORE — input, history, dispatch, output
// ============================================================

const terminal = {
  history: [],
  historyIndex: -1,

  // Print one line to the screen
  printLine(line, cls) {
    const screen = document.getElementById("screen-content");
    if (!screen) return;
    const div = document.createElement("div");
    div.className = "line";

    // Accept either a string or an object {text, cls}
    if (typeof line === "string") {
      div.textContent = line;
      if (cls) div.classList.add(cls);
    } else if (line && typeof line === "object") {
      div.textContent = line.text || "";
      if (line.cls) div.classList.add(line.cls);
      if (cls) div.classList.add(cls);
    }
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
  },

  // Print multiple lines (array of strings or {text, cls} objects)
  printLines(lines, cls) {
    if (!Array.isArray(lines)) return;
    for (const line of lines) {
      this.printLine(line, cls);
    }
  },

  // Print user input (the line they typed)
  echoInput(text) {
    this.printLine(text, "line-input");
  },

  // Update the prompt path display
  updatePromptPath() {
    const pathEl = document.getElementById("prompt-path");
    if (pathEl) pathEl.textContent = window.cwd.getPathString();
  },

  // Show the prompt area (called after boot)
  showPrompt() {
    const promptArea = document.getElementById("prompt-area");
    if (promptArea) promptArea.style.display = "flex";
    this.updatePromptPath();
    const inputEl = document.getElementById("terminal-input");
    if (inputEl) inputEl.focus();
  },

  // Run a command line
  runCommand(rawInput) {
    const text = rawInput.trim();
    if (!text) return;

    // Echo the line back
    this.echoInput(`${window.cwd.getPathString()} > ${text}`);

    // History
    this.history.unshift(text);
    if (this.history.length > 100) this.history.pop();
    this.historyIndex = -1;

    // Parse: split on whitespace, first token is command
    const tokens = text.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmdName = tokens[0].toLowerCase();
    const args = tokens.slice(1).map(a => a.replace(/^"|"$/g, ""));

    const cmd = window.COMMANDS[cmdName];
    if (!cmd) {
      this.printLine(`${cmdName}: command not found. Type 'help' for available commands.`, "line-error");
      this.updatePromptPath();
      return;
    }

    try {
      const result = cmd.run(args);
      if (result && Array.isArray(result)) {
        this.printLines(result);
      }
    } catch (e) {
      this.printLine(`Error executing ${cmdName}: ${e.message}`, "line-error");
    }
    this.updatePromptPath();
  },

  // ============================================================
  // TAB COMPLETION
  // ============================================================
  tabComplete(input) {
    const text = input.value;
    const cursorPos = input.selectionStart;
    const before = text.substring(0, cursorPos);
    const after = text.substring(cursorPos);

    // Find the token currently being typed
    const lastSpace = before.lastIndexOf(" ");
    const tokenStart = lastSpace + 1;
    const partial = before.substring(tokenStart);

    let candidates = [];

    if (lastSpace === -1) {
      // Completing the command name
      candidates = Object.keys(window.COMMANDS).filter(c => c.startsWith(partial));
    } else {
      // Completing a path/filename in current directory
      const dir = window.cwd.getCurrentDir();
      if (dir && dir.children) {
        candidates = Object.keys(dir.children).filter(c => c.startsWith(partial));
      }
    }

    if (candidates.length === 0) return;

    if (candidates.length === 1) {
      // Single match — complete it
      const completed = candidates[0];
      input.value = before.substring(0, tokenStart) + completed + after;
      input.selectionStart = input.selectionEnd = tokenStart + completed.length;
    } else {
      // Multiple matches — show options
      this.printLine(candidates.join("  "), "line-dim");
      // Find common prefix and complete to it
      const prefix = candidates.reduce((p, c) => {
        let i = 0;
        while (i < p.length && i < c.length && p[i] === c[i]) i++;
        return p.substring(0, i);
      });
      if (prefix.length > partial.length) {
        input.value = before.substring(0, tokenStart) + prefix + after;
        input.selectionStart = input.selectionEnd = tokenStart + prefix.length;
      }
    }
  },
};

// ============================================================
// INPUT EVENT HANDLERS — set up after DOM loads
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("terminal-input");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    // ============================================================
    // HACK MODE — special handling for active hack sessions
    // ============================================================
    if (window.hackState && window.hackState.active) {
      if (e.key === "Enter") {
        e.preventDefault();
        const guess = input.value.trim().toUpperCase();
        input.value = "";
        if (guess === "CANCEL" || guess === "EXIT" || guess === "QUIT") {
          window.cancelHack();
          terminal.printLine("> Hack aborted.", "line-warning");
          terminal.updatePromptPath();
          return;
        }
        if (!guess) return;
        window.submitHackGuess(guess);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        window.cancelHack();
        terminal.printLine("> Hack aborted.", "line-warning");
        terminal.updatePromptPath();
        input.value = "";
        return;
      }
      // Allow normal typing during hack
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.value;
      input.value = "";
      terminal.runCommand(value);
    } else if (e.key === "Tab") {
      e.preventDefault();
      terminal.tabComplete(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (terminal.historyIndex < terminal.history.length - 1) {
        terminal.historyIndex++;
        input.value = terminal.history[terminal.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (terminal.historyIndex > 0) {
        terminal.historyIndex--;
        input.value = terminal.history[terminal.historyIndex];
      } else if (terminal.historyIndex === 0) {
        terminal.historyIndex = -1;
        input.value = "";
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      // Ctrl+L = clear (standard terminal shortcut)
      const sc = document.getElementById("screen-content");
      if (sc) sc.innerHTML = "";
    }
  });

  // Click anywhere in the screen area to refocus input
  const screen = document.getElementById("screen");
  if (screen) {
    screen.addEventListener("click", (e) => {
      // Don't refocus if user is selecting text
      if (window.getSelection().toString()) return;
      input.focus();
    });
  }

  // ============================================================
  // VIEW MODE TOGGLE — bezel vs fullscreen
  // ============================================================
  const btnBezel = document.getElementById("btn-bezel");
  const btnFullscreen = document.getElementById("btn-fullscreen");
  const container = document.getElementById("terminal-container");

  if (btnBezel && btnFullscreen && container) {
    btnBezel.addEventListener("click", () => {
      container.classList.remove("fullscreen-mode");
      container.classList.add("bezel-mode");
      btnBezel.classList.add("active");
      btnFullscreen.classList.remove("active");
      input.focus();
    });
    btnFullscreen.addEventListener("click", () => {
      container.classList.remove("bezel-mode");
      container.classList.add("fullscreen-mode");
      btnFullscreen.classList.add("active");
      btnBezel.classList.remove("active");
      input.focus();
    });
  }
});

// Make available globally
window.terminal = terminal;
