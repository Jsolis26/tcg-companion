import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  const MAX_MANA_LIMIT = 8;

  let life = 40;
  let mana = 3;
  let maxMana = 3;
  let activeTerrain = null;

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos",
    modAtk: 0,
    modDef: 0,
    position: "ATK"
  }));

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];
  const log = [];

  /* ================= LOG ================= */
  function addLog(text) {
    log.unshift(text);
    if (log.length > 50) log.pop();
  }

  /* ================= ICONOS ================= */
  function getElementIcon(el) {
    return {
      Agua: "🌊",
      Fuego: "🔥",
      Planta: "🌱",
      Electricidad: "⚡",
      Oscuridad: "🌑",
      Luz: "✨",
      Viento: "🌪️",
      Tierra: "⛰️",
      Todos: "⭕"
    }[el] || "⭕";
  }

  /* ================= BONUS ================= */
  function autoBonus(card) {
    let atk = 0, def = 0;

    if (activeTerrain) {
      const a = activeTerrain.affects;
      if (a.element === card.element || a.class === card.class) {
        atk += activeTerrain.bonus.atk;
        def += activeTerrain.bonus.def;
      }
    }

    board.forEach(s => {
      if (s.card?.passiveBonus) {
        const a = s.card.passiveBonus.affects;
        if (a.element === card.element || a.class === card.class) {
          atk += s.card.passiveBonus.bonus.atk;
          def += s.card.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  /* ================= CONTROLES ================= */
  window.changeLife = v => {
    life = Math.max(0, life + v);
    addLog(`❤️ Vida ${v > 0 ? "+" : ""}${v}`);
    render();
  };

  window.useMana = v => {
    if (mana >= v) {
      mana -= v;
      addLog(`🔮 Usa ${v} maná`);
      render();
    }
  };

  window.addMana = v => {
    mana = Math.min(maxMana, mana + v);
    render();
  };

  window.endTurn = () => {
    if (maxMana < MAX_MANA_LIMIT) maxMana++;
    mana = maxMana;
    addLog("🔄 Fin de turno");
    render();
  };

  window.newGame = () => {
    life = 40;
    mana = 3;
    maxMana = 3;
    activeTerrain = null;
    log.length = 0;

    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.modAtk = 0;
      s.modDef = 0;
      s.position = "ATK";
    });

    addLog("🆕 Nueva partida");
    render();
  };

  /* ================= DROPDOWNS ================= */
  function closeAllDropdowns() {
    document.querySelectorAll(
      ".element-options, .creature-options, .terrain-options"
    ).forEach(el => el.style.display = "none");
  }

  document.addEventListener("click", e => {
    if (!e.target.closest(".element-dropdown") &&
        !e.target.closest(".creature-dropdown") &&
        !e.target.closest(".terrain-dropdown")) {
      closeAllDropdowns();
    }
  });

  /* ================= TABLERO ================= */
  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    render();
  };

  window.selectCreature = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id);
    addLog(`🧙 Invoca ${board[i].card.name}`);
    closeAllDropdowns();
    render();
  };

  window.modAtk = (i, v) => {
    board[i].modAtk += v;
    addLog(`⚔️ ATK ${v > 0 ? "+" : ""}${v}`);
    render();
  };

  window.modDef = (i, v) => {
    board[i].modDef += v;
    addLog(`🛡️ DEF ${v > 0 ? "+" : ""}${v}`);
    render();
  };

  window.clearMods = i => {
    board[i].modAtk = 0;
    board[i].modDef = 0;
    addLog("🧹 Modificadores limpiados");
    render();
  };

  window.togglePosition = i => {
    board[i].position = board[i].position === "ATK" ? "DEF" : "ATK";
    render();
  };

  /* ================= TERRENOS ================= */
  window.toggleTerrainDropdown = () => {
    closeAllDropdowns();
    document.getElementById("terrain-options").style.display = "block";
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id);
    addLog(`🌍 Terreno: ${activeTerrain.name}`);
    closeAllDropdowns();
    render();
  };

  /* ================= RENDER ================= */
  function render() {
    document.getElementById("life").textContent = life;
    document.getElementById("currentMana").textContent = mana;
    document.getElementById("maxMana").textContent = maxMana;

    /* ===== TERRENO ===== */
    const terrainEl = document.getElementById("terrainSlot");
    terrainEl.innerHTML = `
      <div class="terrain-dropdown">
        <button class="terrain-selected" onclick="toggleTerrainDropdown()">
          ${activeTerrain ? `🌍 ${activeTerrain.name}` : "🌍 Seleccionar terreno"}
        </button>

        <div class="terrain-options" id="terrain-options" style="display:none">
          ${TERRAINS.map(t => `
            <div class="terrain-option" onclick="selectTerrain('${t.id}')">
              <strong>${t.name}</strong>
              <div class="terrain-text">${t.textEffect}</div>
            </div>
          `).join("")}
        </div>

        ${activeTerrain ? `
          <div class="terrain-effect">${activeTerrain.textEffect}</div>
        ` : ""}
      </div>
    `;

    /* ===== TABLERO ===== */
    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((s, i) => {
      const list = CREATURES.filter(
        c => s.filter === "Todos" || c.element === s.filter
      );

      const auto = s.card ? autoBonus(s.card) : { atk: 0, def: 0 };

      boardEl.innerHTML += `
<div class="slot element-${s.card ? s.card.element.toLowerCase() : "todos"}">

  <div class="slot-title">Criatura ${s.slot}</div>

  <div class="element-dropdown">
    <button class="element-selected" onclick="closeAllDropdowns();document.getElementById('el-${i}').style.display='block'">
      ${getElementIcon(s.filter)} ${s.filter}
    </button>
    <div class="element-options" id="el-${i}">
      ${elements.map(e => `
        <div class="element-option" onclick="setFilter(${i}, '${e}')">
          ${getElementIcon(e)} ${e}
        </div>`).join("")}
    </div>
  </div>

  <div class="creature-dropdown">
    <button class="creature-selected" onclick="closeAllDropdowns();document.getElementById('cr-${i}').style.display='block'">
      ${s.card ? `${getElementIcon(s.card.element)} ${s.card.name} ${"⭐".repeat(s.card.stars)}` : "🧙 Seleccionar criatura"}
    </button>
    <div class="creature-options" id="cr-${i}">
      ${list.map(c => `
        <div class="creature-option" onclick="selectCreature(${i}, '${c.id}')">
          <div>${c.name}</div>
          <div>${"⭐".repeat(c.stars)}</div>
        </div>`).join("")}
    </div>
  </div>

  ${s.card ? `
    <button onclick="togglePosition(${i})">Posición: ${s.position}</button>

    <div class="stat ${s.position === "ATK" ? "active-stat" : "inactive-stat"}">
      ATK ${s.card.atk}
      ${auto.atk ? `<span class="auto-bonus">+${auto.atk}</span>` : ""}
      ${s.modAtk ? `<span class="${s.modAtk > 0 ? "manual-bonus" : "manual-penalty"}">${s.modAtk > 0 ? "+" : ""}${s.modAtk}</span>` : ""}
      → <strong>${s.card.atk + auto.atk + s.modAtk}</strong>
    </div>

    <div class="stat ${s.position === "DEF" ? "active-stat" : "inactive-stat"}">
      DEF ${s.card.def}
      ${auto.def ? `<span class="auto-bonus">+${auto.def}</span>` : ""}
      ${s.modDef ? `<span class="${s.modDef > 0 ? "manual-bonus" : "manual-penalty"}">${s.modDef > 0 ? "+" : ""}${s.modDef}</span>` : ""}
      → <strong>${s.card.def + auto.def + s.modDef}</strong>
    </div>

    <div class="stat">
      <button onclick="modAtk(${i},1)">ATK +</button>
      <button onclick="modAtk(${i},-1)">ATK −</button>
      <button onclick="modDef(${i},1)">DEF +</button>
      <button onclick="modDef(${i},-1)">DEF −</button>
      <button onclick="clearMods(${i})">Limpiar</button>
    </div>
  ` : ""}
</div>`;
    });

    document.getElementById("log").innerHTML =
      log.map(l => `<div>• ${l}</div>`).join("");
  }

  render();
});
