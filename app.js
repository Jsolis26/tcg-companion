import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // CONFIGURACIÓN GENERAL
  // ======================
  const MAX_MANA_LIMIT = 8;

  // ======================
  // ESTADO DE PARTIDA
  // ======================
  let life = 40;
  let mana = 3;
  let maxMana = 3;

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos",
    modAtk: 0,
    modDef: 0,
    position: "ATK",
    summonedThisTurn: false
  }));

  let activeTerrain = null;
  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  // ======================
  // LOG
  // ======================
  const log = [];
  function addLog(text) {
    log.unshift(text);
    if (log.length > 50) log.pop();
  }

  // ======================
  // ICONOS
  // ======================
  function getElementIcon(el) {
    switch (el) {
      case "Agua": return "🌊";
      case "Fuego": return "🔥";
      case "Planta": return "🌱";
      case "Electricidad": return "⚡";
      case "Oscuridad": return "🌑";
      case "Luz": return "✨";
      case "Viento": return "🌪️";
      case "Tierra": return "⛰️";
      default: return "⭕";
    }
  }

  // ======================
  // BONOS AUTOMÁTICOS
  // ======================
  function autoBonus(card) {
    let atk = 0, def = 0;

    if (activeTerrain) {
      if (
        activeTerrain.affects.element === card.element ||
        activeTerrain.affects.class === card.class
      ) {
        atk += activeTerrain.bonus.atk;
        def += activeTerrain.bonus.def;
      }
    }

    board.forEach(s => {
      if (s.card?.legendary && s.card.passiveBonus) {
        const a = s.card.passiveBonus.affects;
        if (a.element === card.element || a.class === card.class) {
          atk += s.card.passiveBonus.bonus.atk;
          def += s.card.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  // ======================
  // CONTROLES DE PARTIDA
  // ======================
  window.changeLife = v => {
    life = Math.max(0, life + v);
    addLog(`❤️ Vida ${v > 0 ? "➕" : "➖"}${Math.abs(v)} → ${life}`);
    render();
  };

  window.useMana = v => {
    if (mana >= v) {
      mana -= v;
      addLog(`🔮 Usa ${v} maná → ${mana}/${maxMana}`);
      render();
    }
  };

  window.addMana = v => {
    mana = Math.min(maxMana, Math.max(0, mana + v));
    addLog(`🔮 Maná ${v > 0 ? "➕" : "➖"}${Math.abs(v)} → ${mana}/${maxMana}`);
    render();
  };

  window.endTurn = () => {
    if (maxMana < MAX_MANA_LIMIT) {
      maxMana++;
      addLog(`🔄 Fin de turno → Máx. maná ${maxMana}`);
    }
    mana = maxMana;
    board.forEach(s => s.summonedThisTurn = false);
    render();
  };

  window.newGame = () => {
    life = 40;
    mana = 3;
    maxMana = 3;
    log.length = 0;
    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.modAtk = 0;
      s.modDef = 0;
      s.position = "ATK";
    });
    activeTerrain = null;
    addLog("🆕 Nueva partida");
    render();
  };

  // ======================
  // TABLERO
  // ======================
  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    board[i].position = "ATK";
    addLog(`📂 Criatura ${i + 1}: filtro → ${v}`);
    render();
  };

  window.selectCard = (i, id) => {
    const card = CREATURES.find(c => c.id === id) || null;
    board[i].card = card;
    board[i].summonedThisTurn = true;
    addLog(`🧙 Invoca ${card.name}`);
    render();
  };

  window.modAtk = (i, v) => {
    board[i].modAtk += v;
    render();
  };

  window.modDef = (i, v) => {
    board[i].modDef += v;
    render();
  };

  window.clearMods = i => {
    board[i].modAtk = 0;
    board[i].modDef = 0;
    render();
  };

  window.togglePosition = i => {
    board[i].position = board[i].position === "ATK" ? "DEF" : "ATK";
    render();
  };

  // ======================
  // DROPDOWNS
  // ======================
  window.toggleElementDropdown = i => {
    closeAllDropdowns();
    document.getElementById(`element-options-${i}`).style.display = "block";
  };

  window.selectElement = (i, value) => {
    setFilter(i, value);
    closeAllDropdowns();
  };

  window.toggleCreatureDropdown = i => {
    closeAllDropdowns();
    document.getElementById(`creature-options-${i}`).style.display = "block";
  };

  window.selectCreature = (i, id) => {
    selectCard(i, id);
    closeAllDropdowns();
  };

  function closeAllDropdowns() {
    document.querySelectorAll(".element-options, .creature-options")
      .forEach(el => el.style.display = "none");
  }

  document.addEventListener("click", e => {
    if (!e.target.closest(".element-dropdown") &&
        !e.target.closest(".creature-dropdown")) {
      closeAllDropdowns();
    }
  });

  // ======================
  // RENDER
  // ======================
  function render() {
    document.getElementById("life").innerText = life;
    document.getElementById("currentMana").innerText = mana;
    document.getElementById("maxMana").innerText = maxMana;

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
    <button class="element-selected" onclick="toggleElementDropdown(${i})">
      <span class="el-icon">${getElementIcon(s.filter)}</span> ${s.filter}
    </button>
    <div class="element-options" id="element-options-${i}">
      ${elements.map(e => `
        <div class="element-option" onclick="selectElement(${i}, '${e}')">
          <span class="el-icon">${getElementIcon(e)}</span> ${e}
        </div>`).join("")}
    </div>
  </div>

<div class="creature-dropdown">
  <button class="creature-selected" onclick="toggleCreatureDropdown(${i})">
    ${s.card ? `
      <span class="el-icon">${getElementIcon(s.card.element)}</span>
      <span class="creature-name">${s.card.name}</span>
      <span class="stars">${"⭐".repeat(s.card.stars)}</span>
    ` : "🧙 Seleccionar criatura"}
  </button>

  <div class="creature-options" id="creature-options-${i}">
    ${list.map(c => `
      <div class="creature-option" onclick="selectCreature(${i}, '${c.id}')">
        <div class="creature-option-name">${c.name}</div>
        <div class="creature-option-stars">${"⭐".repeat(c.stars)}</div>
      </div>
    `).join("")}
  </div>
</div>

  ${s.card ? `
    <div class="stat ${s.card.legendary ? "legendary" : ""}">${s.card.name}</div>

    <button onclick="togglePosition(${i})">
      Posición: ${s.position}
    </button>
<div class="stat atk ${s.position === "ATK" ? "active-stat" : "inactive-stat"}">
  ATK:
  <span class="base-stat">${s.card.atk}</span>

  ${auto.atk !== 0 ? `
    <span class="auto-bonus">
      ${auto.atk > 0 ? "+" : ""}${auto.atk}
    </span>
  ` : ""}

  ${s.modAtk !== 0 ? `
    <span class="${s.modAtk > 0 ? "manual-bonus" : "manual-penalty"}">
      ${s.modAtk > 0 ? "+" : ""}${s.modAtk}
    </span>
  ` : ""}

  → <strong class="final-stat">
    ${s.card.atk + auto.atk + s.modAtk}
  </strong>
</div>


<div class="stat def ${s.position === "DEF" ? "active-stat" : "inactive-stat"}">
  DEF:
  <span class="base-stat">${s.card.def}</span>

  ${auto.def !== 0 ? `
    <span class="auto-bonus">
      ${auto.def > 0 ? "+" : ""}${auto.def}
    </span>
  ` : ""}

  ${s.modDef !== 0 ? `
    <span class="${s.modDef > 0 ? "manual-bonus" : "manual-penalty"}">
      ${s.modDef > 0 ? "+" : ""}${s.modDef}
    </span>
  ` : ""}

  → <strong class="final-stat">
    ${s.card.def + auto.def + s.modDef}
  </strong>
</div>



    <div class="stat">
      <button onclick="modAtk(${i},1)">ATK +</button>
      <button onclick="modAtk(${i},-1)">ATK −</button>
      <button onclick="modDef(${i},1)">DEF +</button>
      <button onclick="modDef(${i},-1)">DEF −</button>
      <button onclick="clearMods(${i})">Limpiar</button>
    </div>

    ${s.card.legendary && s.card.textEffect
      ? `<div class="effect-text">${s.card.textEffect}</div>`
      : ""}
  ` : ""}
</div>`;
    });

    document.getElementById("log").innerHTML =
      log.map(l => `<div>• ${l}</div>`).join("");
  }

  render();
});











