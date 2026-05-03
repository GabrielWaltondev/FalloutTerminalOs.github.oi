# FalloutTerminalOs
It a fallout inspired terminal that is both sandbox and mini game. 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RobCo Industries Termlink</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/skins/vaulttec.css">
  <link rel="stylesheet" href="css/skins/pipboy.css">
</head>
<body>

<!-- ============================================================
     VIEW MODE TOGGLE (top-right)
     ============================================================ -->
<div id="mode-toggle" class="mode-toggle">
  <button id="btn-bezel" class="active">[BEZEL]</button>
  <button id="btn-fullscreen">[FULLSCREEN]</button>
</div>

<!-- ============================================================
     TERMINAL CONTAINER — switches between bezel and fullscreen
     ============================================================ -->
<div id="terminal-container" class="bezel-mode">

  <!-- Bezel wrapper (the chunky physical terminal frame) -->
  <div id="bezel" class="bezel">

    <!-- Top bezel detail -->
    <div class="bezel-top">
      <div class="bezel-vent"></div>
      <div class="bezel-vent"></div>
      <div class="bezel-vent"></div>
    </div>

    <!-- Mounting screws at corners -->
    <div class="screw screw-tl"></div>
    <div class="screw screw-tr"></div>
    <div class="screw screw-bl"></div>
    <div class="screw screw-br"></div>

    <!-- The actual screen -->
    <div id="screen" class="screen">
      <!-- CRT scan/glow overlay (purely visual) -->
      <div class="crt-scanlines"></div>
      <div class="crt-vignette"></div>
      <div class="crt-flicker"></div>

      <!-- Screen content gets injected here by JS -->
      <div id="screen-content" class="screen-content">
        <!-- Initial boot will render here -->
      </div>

      <!-- Terminal prompt + input (only visible after boot) -->
      <div id="prompt-area" class="prompt-area" style="display: none;">
        <span class="prompt-prefix">&gt;</span>
        <span id="prompt-path" class="prompt-path">/</span>
        <span class="prompt-arrow">&gt;</span>
        <input type="text"
               id="terminal-input"
               class="terminal-input"
               autocomplete="off"
               spellcheck="false"
               autofocus>
        <span class="cursor">█</span>
      </div>
    </div>

    <!-- Bottom bezel detail with brand label -->
    <div class="bezel-bottom">
      <div class="bezel-label">ROBCO INDUSTRIES</div>
      <div class="bezel-knobs">
        <div class="knob"></div>
        <div class="knob"></div>
      </div>
    </div>

  </div>

</div>

<!-- ============================================================
     SCRIPTS — load order matters
     ============================================================ -->
<!-- 1. Skin definitions (register themselves into window.SKINS) -->
<script src="data/skins/robco.js"></script>
<script src="data/skins/vaulttec.js"></script>
<script src="data/skins/pipboy.js"></script>
<!-- 2. Skin manager — initializes the default skin -->
<script src="js/skins.js"></script>
<!-- 3. Game systems -->
<script src="js/hack.js"></script>
<script src="js/commands.js"></script>
<script src="js/terminal.js"></script>
<script src="js/boot.js"></script>

</body>
</html>
