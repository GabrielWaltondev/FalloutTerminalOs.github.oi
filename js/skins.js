// ============================================================
// SKIN MANAGER — Handle switching between visual themes
// ============================================================

const skinManager = {
  active: null,        // current active skin id
  activeSkin: null,    // current active skin object

  // Initialize — load the default skin
  init(defaultSkin = "robco") {
    if (!window.SKINS || Object.keys(window.SKINS).length === 0) {
      console.error("No skins registered!");
      return;
    }
    // Default if not specified
    const id = window.SKINS[defaultSkin] ? defaultSkin : Object.keys(window.SKINS)[0];
    this.applySkin(id);
  },

  // List all registered skins
  list() {
    return Object.values(window.SKINS || {}).map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      active: s.id === this.active,
    }));
  },

  // Apply a skin: swap filesystem, update CSS class, reset CWD
  applySkin(id) {
    const skin = window.SKINS && window.SKINS[id];
    if (!skin) {
      return { error: `Unknown skin: ${id}. Available: ${Object.keys(window.SKINS || {}).join(", ")}` };
    }

    this.active = id;
    this.activeSkin = skin;

    // Swap the filesystem (used by commands.js / hack.js)
    window.FILESYSTEM = skin.filesystem;

    // Reset CWD to root
    if (window.cwd) window.cwd.path = [];

    // Clear unlocked files (they're skin-specific)
    if (window.UNLOCKED_FILES) window.UNLOCKED_FILES.clear();

    // Apply CSS class to the document body so styles can override
    document.body.classList.remove(...this.allCssClasses());
    if (skin.cssClass) document.body.classList.add(skin.cssClass);

    return { ok: true, skin };
  },

  // Get all possible CSS classes from registered skins
  allCssClasses() {
    return Object.values(window.SKINS || {})
      .map(s => s.cssClass)
      .filter(Boolean);
  },

  // Get the boot banner from the active skin
  getBootBanner() {
    return this.activeSkin?.bootBanner || "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL";
  },

  getBootSubtitle() {
    return this.activeSkin?.bootSubtitle || "RobCo Industries Unified Operating System";
  },

  getDefaultUser() {
    return this.activeSkin?.defaultUser || "USER";
  },

  getAuthToken() {
    return this.activeSkin?.authToken || "0xDEFAULT";
  },
};

// Initialize after all skin scripts have loaded
window.addEventListener("DOMContentLoaded", () => {
  skinManager.init("robco");
});

// Expose globally
window.skinManager = skinManager;
