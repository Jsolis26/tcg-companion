import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

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
    modDef: 0
  }));

  let activeTerrain = null;

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  // ======================
  // BONOS AUTOMÁTICOS
  // ======================
  function autoBonus(card) {
    let atk = 0;
    let def = 0;

    // Terreno
    if (activeTerrain) {
      if (
        activeTerrain.affects.element === card.element ||
        activeTerrain.affects.class === card.class
      ) {
        atk += activeTerrain.bonus.atk;
        def += activeTerrain.bonus.def;
      }
    }

    // Pasivos legendarios
    board.forEach(s => {
      if (s.card?.legendary && s.card.passiveBonus) {
        const a = s.card.passiveBonus.affects;
        if (
          a.element === card.element ||
          a.class === card.class
        ) {
          atk += s.card.passiveBonus.bonus.atk;
          def += s.card.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  // ======================
  // CONTROLES GLOBALES
  // ======================
  window.changeLife = v => {
    life += v;
    if (life < 0) life = 0;
    render();
  };

  window.useMana = v => {
    if (mana >= v) {
      mana -= v;
      render();
    }
  };

  // 👉 Maná actual SIN límite artificial
  window.addMana = v => {
    mana += v;
    if (mana < 0) mana = 0;
    render();
  };

  // 👉 Control explícito del máximo
  window.addMaxMana = v => {
    maxMana += v;
    if (maxMana < 0) maxMana = 0;
    if (mana > maxMana) mana = maxMana;
    render();
  };

  // ======================
  // NUEVA PARTIDA
  // ======================
  window.newGame = () => {
    life = 40;
    mana = 3;
    maxMana = 3;

    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.modAtk = 0;
      s.modDef = 0;
    });

    activeTerrain = null;
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

  window.selectCard = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id) || null;
    board[i].modAtk = 0;
    board[i].modDef = 0;
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
        <div class="slot">
          <div class="slot-title">Criatura ${s.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e =>
              `<option ${s.filter === e ? "selected" : ""}>${e}</option>`
            ).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(c =>
              `<option value="${c.id}" ${s.card?.id === c.id ? "selected" : ""}>${c.name}</option>`
            ).join("")}
          </select>

          ${s.card ? `
            <div class="stat ${s.card.legendary ? "legendary" : ""}">
              ${s.card.name}
            </div>

            <div class="stat">
              ATK: ${s.card.atk}
              ${auto.atk !== 0 ? ` (<span class="auto">+${auto.atk}</span>)` : ""}
              ${s.modAtk !== 0 ? ` (<span class="manual">${s.modAtk > 0 ? "+" : ""}${s.modAtk}</span>)` : ""}
              → <strong>${s.card.atk + auto.atk + s.modAtk}</strong>
            </div>

            <div class="stat">
              DEF: ${s.card.def}
              ${auto.def !== 0 ? ` (<span class="auto">+${auto.def}</span>)` : ""}
              ${s.modDef !== 0 ? ` (<span class="manual">${s.modDef > 0 ? "+" : ""}${s.modDef}</span>)` : ""}
              → <strong>${s.card.def + auto.def + s.modDef}</strong>
            </div>

            <div class="stat">
              Mod ATK:
              <button onclick="modAtk(${i}, 1)">+</button>
              <button onclick="modAtk(${i}, -1)">−</button>
              (${s.modAtk})
            </div>

            <div class="stat">
              Mod DEF:
              <button onclick="modDef(${i}, 1)">+</button>
              <button onclick="modDef(${i}, -1)">−</button>
              (${s.modDef})
            </div>

            <button onclick="clearMods(${i})">Limpiar</button>

            ${s.card.legendary && s.card.textEffect ? `
              <div class="effect-text">${s.card.textEffect}</div>
            ` : ""}
          ` : ""}
        </div>
      `;
    });

    document.getElementById("terrainSlot").innerHTML = `
      <select onchange="selectTerrain(this.value)">
        <option value="">— Sin Terreno —</option>
        ${TERRAINS.map(t =>
          `<option value="${t.id}" ${activeTerrain?.id === t.id ? "selected" : ""}>${t.name}</option>`
        ).join("")}
      </select>

      ${activeTerrain ? `
        <div class="effect-text">${activeTerrain.textEffect}</div>
      ` : ""}
    `;
  }

  render();
});
