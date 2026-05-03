// ============================================================
// BOOT SEQUENCE — Fallout-style terminal startup (skin-aware)
// ============================================================

function getBootSequence() {
  const banner = window.skinManager?.getBootBanner() || "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL";
  const subtitle = window.skinManager?.getBootSubtitle() || "RobCo Industries Unified Operating System";

  return [
    { text: banner, cls: "line-bright", delay: 200 },
    { text: "INITIALIZING...", cls: "line-bright", delay: 400 },
    { text: "", delay: 100 },
    { text: ".", cls: "line-dim", delay: 80 },
    { text: ".", cls: "line-dim", delay: 80 },
    { text: ".", cls: "line-dim", delay: 80 },
    { text: "", delay: 200 },
    { text: subtitle, delay: 100 },
    { text: "Copyright 2075-2077 RobCo Industries", delay: 100 },
    { text: "-Server 6-", cls: "line-dim", delay: 200 },
    { text: "", delay: 100 },
    { text: ">SET TERMINAL/INQUIRE", cls: "line-dim", delay: 150 },
    { text: "", delay: 80 },
    { text: "RIT-V300 ", cls: "line-dim", inline: true, delay: 50 },
    { text: "OK", cls: "line-bright", inline: true, delay: 50 },
    { text: "", delay: 80 },
    { text: ">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F", cls: "line-dim", delay: 100 },
    { text: ">SET HALT RESTART/MAINT", cls: "line-dim", delay: 100 },
    { text: "", delay: 200 },
    { text: "Initializing Robco Industries (TM) MF Boot Agent v2.3.0", delay: 100 },
    { text: "RETROS BIOS", cls: "line-dim", delay: 100 },
    { text: "RBIOS-4.02.08.00 52EE5.E7.E8", cls: "line-dim", delay: 80 },
    { text: "Copyright 2201-2203 RobCo Ind.", cls: "line-dim", delay: 80 },
    { text: "Uppermem: 64 KB", cls: "line-dim", delay: 80 },
    { text: "Root (5A8)", cls: "line-dim", delay: 80 },
    { text: "Maintenance Mode", cls: "line-dim", delay: 200 },
    { text: "", delay: 200 },
    { text: ">RUN DEBUG/ACCOUNTS.F", cls: "line-dim", delay: 200 },
    { text: "", delay: 400 },
    { text: `WELCOME TO ${banner.toUpperCase()}`, cls: "line-bright", delay: 100 },
    { text: "", delay: 200 },
    { text: ">CONNECTION ESTABLISHED", cls: "line-bright", delay: 100 },
    { text: "", delay: 100 },
    { text: "Type 'help' for available commands.", cls: "line-dim", delay: 100 },
  ];
}

async function runBootSequence() {
  const screen = document.getElementById("screen-content");
  if (!screen) return;

  // Clear any existing content
  screen.innerHTML = "";

  const sequence = getBootSequence();

  for (const step of sequence) {
    // Skip rendering blank entries beyond a sleep delay
    if (step.text === "" && !step.inline) {
      await sleep(step.delay || 50);
      const div = document.createElement("div");
      div.className = "line";
      div.innerHTML = "&nbsp;";
      screen.appendChild(div);
      screen.scrollTop = screen.scrollHeight;
      continue;
    }

    // Inline append: add to the previous line
    if (step.inline) {
      const lastDiv = screen.lastElementChild;
      if (lastDiv) {
        const span = document.createElement("span");
        span.textContent = step.text;
        if (step.cls) span.classList.add(step.cls);
        lastDiv.appendChild(span);
      }
      await sleep(step.delay || 50);
      continue;
    }

    // New line
    const div = document.createElement("div");
    div.className = "line";
    if (step.cls) div.classList.add(step.cls);
    div.textContent = step.text;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;

    await sleep(step.delay || 50);
  }

  // Boot complete — show the prompt
  await sleep(300);
  if (window.terminal) {
    window.terminal.showPrompt();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Auto-run on page load
window.addEventListener("DOMContentLoaded", () => {
  // Wait until skin manager has initialized — both fire on DOMContentLoaded,
  // but we want to run AFTER the skin is applied so the banner is correct.
  setTimeout(() => {
    // Make sure a skin is loaded; if not, default to robco
    if (window.skinManager && !window.skinManager.active) {
      window.skinManager.init("robco");
    }
    runBootSequence();
  }, 250);
});

// Expose for re-running if needed
window.runBootSequence = runBootSequence;
