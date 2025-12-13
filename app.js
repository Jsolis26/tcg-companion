import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // ESTADO
  // ======================
  let life = 40;
  let mana = 3;

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos"
  }));

  let activeTerrain = null;
  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  // ======================
  // BONOS
  // ======================
  function totalBonus(card) {
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

    // Legendarios en mesa
    board.forEach(slot => {
      const c = slot.card;
      if (c?.legendary && c.passiveBonus) {
        const a = c.passiveBonus.affects;
        if (a.element === card.element || a.class === card.class) {
          atk += c.passiveBonus.bonus.atk;
          def += c.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  // ======================
  // ACCIONES
  // ======================
  window.changeLife = v => { life += v; render(); };
  window.useMana = v => { if (mana >= v) mana -= v; render(); };
  window.addMana = v => { mana += v; render(); };

  window.resetGame = () => {
    life = 40;
    mana = 3;
    activeTerrain = null;
    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
    });
    render();
  };

  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    render();
  };

  window.selectCard = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id) || null;
    render();
  };

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

    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((slot, i) => {
      const list = CREATURES.filter(c =>
        slot.filter === "Todos" || c.element === slot.filter
      );

      const bonus = slot.card ? totalBonus(slot.card) : { atk: 0, def: 0 };

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
              ${bonus.atk ? `<span class="bonus">+${bonus.atk} → (${slot.card.atk + bonus.atk})</span>` : ""}
            </div>

            <div class="stat">
              DEF: ${slot.card.def}
              ${bonus.def ? `<span class="bonus">+${bonus.def} → (${slot.card.def + bonus.def})</span>` : ""}
            </div>

            <div class="stat">⭐ ${slot.card.stars}</div>

            ${slot.card.legendary && slot.card.textEffect ? `
              <div class="effect-text">
                <strong>Efecto legendario:</strong><br>
                ${slot.card.textEffect}
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
