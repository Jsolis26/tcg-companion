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
    position: "ATK",
    summonedThisTurn: false
  }));

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  const log = [];
  const addLog = txt => {
    log.unshift(txt);
    if (log.length > 50) log.pop();
  };

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
  // CONTROLES
  // ======================
  window.changeLife = v => {
    life = Math.max(0, life + v);
    render();
  };

  window.useMana = v => {
    if (mana >= v) mana -= v;
    render();
  };

  window.addMana = v => {
    mana = Math.min(maxMana, Math.max(0, mana + v));
    render();
  };

  window.endTurn = () => {
    if (maxMana < MAX_MANA_LIMIT) maxMana++;
    mana = maxMana;
    board.forEach(s => s.summonedThisTurn = false);
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
    render();
  };

  window.selectCreature = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id);
    board[i].summonedThisTurn = true;
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
  // TERRENO
  // ======================
  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;
    render();
  };

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
    <button class="element-selected">
      ${getElementIcon(s.filter)} ${s.filter}
    </button>
    <div class="element-options">
      ${elements.map(e => `
        <div class="element-option" onclick="setFilter(${i}, '${e}')">
          ${getElementIcon(e)} ${e}
        </div>
      `).join("")}
    </div>
  </div>

  <div class="creature-dropdown">
    <button class="creature-selected">
      ${s.card
        ? `${getElementIcon(s.card.element)} ${s.card.name} ${"⭐".repeat(s.card.stars)}`
        : "🧙 Seleccionar criatura"}
    </button>
    <div class="creature-options">
      ${list.map(c => `
        <div class="creature-option" onclick="selectCreature(${i}, '${c.id}')">
          <div>${c.name}</div>
          <div>${"⭐".repeat(c.stars)}</div>
        </div>
      `).join("")}
    </div>
  </div>

  ${s.card ? `
    <button onclick="togglePosition(${i})">Posición: ${s.position}</button>

    <div class="stat atk ${s.position === "ATK" ? "active-stat" : "inactive-stat"}">
      ATK:
      <span class="base-stat">${s.card.atk}</span>
      ${auto.atk ? `<span class="auto-bonus">+${auto.atk}</span>` : ""}
      ${s.modAtk ? `<span class="${s.modAtk > 0 ? "manual-bonus" : "manual-penalty"}">${s.modAtk > 0 ? "+" : ""}${s.modAtk}</span>` : ""}
      → <strong class="final-stat">${s.card.atk + auto.atk + s.modAtk}</strong>
    </div>

    <div class="stat def ${s.position === "DEF" ? "active-stat" : "inactive-stat"}">
      DEF:
      <span class="base-stat">${s.card.def}</span>
      ${auto.def ? `<span class="auto-bonus">+${auto.def}</span>` : ""}
      ${s.modDef ? `<span class="${s.modDef > 0 ? "manual-bonus" : "manual-penalty"}">${s.modDef > 0 ? "+" : ""}${s.modDef}</span>` : ""}
      → <strong class="final-stat">${s.card.def + auto.def + s.modDef}</strong>
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

    document.getElementById("terrainSlot").innerHTML = `
<select onchange="selectTerrain(this.value)">
  <option value="">— Sin terreno —</option>
  ${TERRAINS.map(t => `
    <option value="${t.id}" ${activeTerrain?.id === t.id ? "selected" : ""}>
      ${t.name}
    </option>
  `).join("")}
</select>
${activeTerrain ? `<div class="effect-text">${activeTerrain.textEffect}</div>` : ""}
`;

    document.getElementById("log").innerHTML =
      log.map(l => `<div>• ${l}</div>`).join("");
  }

  render();
});
