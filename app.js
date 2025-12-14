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

  /* ================= DROPDOWNS (CLAVE) ================= */
  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-options")
      .forEach(d => d.style.display = "none");
  }

  window.toggleDropdown = id => {
    const el = document.getElementById(id);
    const isOpen = el.style.display === "block";
    closeAllDropdowns();
    if (!isOpen) el.style.display = "block";
  };

  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown")) {
      closeAllDropdowns();
    }
  });

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

  /* ================= TABLERO ================= */
  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    closeAllDropdowns();
    render();
  };

  window.selectCreature = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id);
    addLog(`🧙 Invoca ${board[i].card.name}`);
    closeAllDropdowns();
    render();
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id);
    addLog(`🌍 Terreno: ${activeTerrain.name}`);
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

  /* ================= RENDER ================= */
  function render() {
    document.getElementById("life").textContent = life;
    document.getElementById("currentMana").textContent = mana;
    document.getElementById("maxMana").textContent = maxMana;

    /* ===== TERRENO ===== */
    const terrainEl = document.getElementById("terrainSlot");
    terrainEl.innerHTML = `
      <div class="dropdown">
        <button onclick="toggleDropdown('terrain-options')">
          ${activeTerrain ? activeTerrain.name : "🌍 Seleccionar terreno"}
        </button>
        <div id="terrain-options" class="dropdown-options">
          ${TERRAINS.map(t => `
            <div class="terrain-option" onclick="selectTerrain('${t.id}')">
              <strong>${t.name}</strong>
              <div class="terrain-text">${t.textEffect}</div>
            </div>
          `).join("")}
        </div>
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

  <div class="dropdown">
    <button onclick="toggleDropdown('element-${i}')">
      ${getElementIcon(s.filter)} ${s.filter}
    </button>
    <div id="element-${i}" class="dropdown-options">
      ${elements.map(e => `
        <div onclick="setFilter(${i}, '${e}')">
          ${getElementIcon(e)} ${e}
        </div>
      `).join("")}
    </div>
  </div>

  <div class="dropdown">
    <button onclick="toggleDropdown('creature-${i}')">
      ${s.card ? `${getElementIcon(s.card.element)} ${s.card.name}` : "🧙 Seleccionar criatura"}
    </button>
    <div id="creature-${i}" class="dropdown-options">
      ${list.map(c => `
        <div onclick="selectCreature(${i}, '${c.id}')">
          <div>${c.name}</div>
          <div>${"⭐".repeat(c.stars)}</div>
        </div>
      `).join("")}
    </div>
  </div>

  ${s.card ? `
    <button onclick="togglePosition(${i})">Posición: ${s.position}</button>

    <div class="stat">
      ATK ${s.card.atk}
      ${auto.atk ? `<span class="auto-bonus">+${auto.atk}</span>` : ""}
      ${s.modAtk ? `<span class="${s.modAtk > 0 ? "manual-bonus" : "manual-penalty"}">${s.modAtk > 0 ? "+" : ""}${s.modAtk}</span>` : ""}
      → <strong>${s.card.atk + auto.atk + s.modAtk}</strong>
    </div>

    <div class="stat">
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
