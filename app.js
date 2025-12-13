import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ESTADO GLOBAL
  ========================== */

  let life = 40;
  let mana = 3;
  let maxMana = 3;

  /* =========================
     MESA (5 SLOTS)
  ========================== */

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos",
    modAtk: 0,
    modDef: 0
  }));

  let activeTerrain = null;
  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  /* =========================
     BONOS AUTOMÁTICOS
  ========================== */

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

    // Legendarios en campo
    board.forEach(s => {
      const c = s.card;
      if (c?.legendary && c.passiveBonus) {
        const a = c.passiveBonus.affects;
        if (
          a.element === card.element ||
          a.class === card.class
        ) {
          atk += c.passiveBonus.bonus.atk;
          def += c.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  /* =========================
     ACCIONES GENERALES
  ========================== */

  window.changeLife = v => {
    life += v;
    render();
  };

  window.addMana = v => {
    mana += v;
    if (mana > maxMana) mana = maxMana;
    render();
  };

  window.useMana = v => {
    if (mana >= v) {
      mana -= v;
      render();
    }
  };

  window.newTurn = () => {
    maxMana += 1;
    mana = maxMana;
    render();
  };

  window.resetGame = () => {
    life = 40;
    mana = 3;
    maxMana = 3;
    activeTerrain = null;

    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.modAtk = 0;
      s.modDef = 0;
    });

    render();
  };

  /* =========================
     CARTAS Y TERRENO
  ========================== */

  window.setFilter = (i, value) => {
    board[i].filter = value;
    board[i].card = null;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    render();
  };

  window.selectCard = (i, id) => {
    if (!id) {
      board[i].card = null;
      board[i].modAtk = 0;
      board[i].modDef = 0;
      render();
      return;
    }

    const card = CREATURES.find(c => c.id === id);
    if (!card) return;

    board[i].card = card;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    render();
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;
    render();
  };

  /* =========================
     MODIFICADORES MANUALES
  ========================== */

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

  /* =========================
     RENDER
  ========================== */

  function render() {
    document.getElementById("life").innerText = life;
    document.getElementById("currentMana").innerText = mana;

    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((slot, i) => {
      const list = CREATURES.filter(c =>
        slot.filter === "Todos" || c.element === slot.filter
      );

      const auto = slot.card ? autoBonus(slot.card) : { atk: 0, def: 0 };

      boardEl.innerHTML += `
        <div class="slot">
          <div class="slot-title">Criatura ${slot.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e =>
              `<option value="${e}" ${slot.filter === e ? "selected" : ""}>${e}</option>`
            ).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(c =>
              `<option value="${c.id}" ${slot.card?.id === c.id ? "selected" : ""}>${c.name}</option>`
            ).join("")}
          </select>

          ${slot.card ? `
            <div class="stat ${slot.card.legendary ? "legendary" : ""}">
              ${slot.card.name}
            </div>

            <div class="stat">
              ATK: ${slot.card.atk}
              <span class="bonus">
                (${slot.card.atk + auto.atk + slot.modAtk})
              </span>
            </div>

            <div class="stat">
              DEF: ${slot.card.def}
              <span class="bonus">
                (${slot.card.def + auto.def + slot.modDef})
              </span>
            </div>

            <div class="stat">
              Mod ATK:
              <button onclick="modAtk(${i}, 1)">+</button>
              <button onclick="modAtk(${i}, -1)">−</button>
              (${slot.modAtk})
            </div>

            <div class="stat">
              Mod DEF:
              <button onclick="modDef(${i}, 1)">+</button>
              <button onclick="modDef(${i}, -1)">−</button>
              (${slot.modDef})
            </div>

            <button onclick="clearMods(${i})">Limpiar modificadores</button>

${slot.card.legendary && slot.card.textEffect ? `
  <div class="effect-text">
    <strong>Efecto legendario:</strong><br>
    ${slot.card.textEffect}
  </div>
` : ""}

  </div>
` : ""}
          ` : ""}
        </div>
      `;
    });

    const terrainEl = document.getElementById("terrainSlot");
    terrainEl.innerHTML = `
      <select onchange="selectTerrain(this.value)">
        <option value="">— Sin Terreno —</option>
        ${TERRAINS.map(t =>
          `<option value="${t.id}" ${activeTerrain?.id === t.id ? "selected" : ""}>${t.name}</option>`
        ).join("")}
      </select>

      ${activeTerrain ? `
        <div class="effect-text">
          <strong>${activeTerrain.name}</strong><br>
          ${activeTerrain.textEffect}
        </div>
      ` : ""}
    `;
  }

  render();
});


