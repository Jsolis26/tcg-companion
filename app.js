import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos"
  }));

  let activeTerrain = null;
  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  function terrainBonus(card) {
    if (!activeTerrain || !card) return { atk:0, def:0 };
    if (activeTerrain.affects.element === card.element) return activeTerrain.bonus;
    if (activeTerrain.affects.class === card.class) return activeTerrain.bonus;
    return { atk:0, def:0 };
  }

  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    renderBoard();
  };

  window.selectCard = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id) || null;
    renderBoard();
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;
    renderBoard();
    renderTerrain();
  };

  function renderBoard() {
    const el = document.getElementById("board");
    el.innerHTML = "";

    board.forEach((slot, i) => {
      const list = CREATURES.filter(c =>
        slot.filter === "Todos" || c.element === slot.filter
      );

      const bonus = slot.card ? terrainBonus(slot.card) : { atk:0, def:0 };

      el.innerHTML += `
        <div class="slot">
          <div class="slot-title">Criatura ${slot.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e =>
              `<option value="${e}" ${slot.filter===e?"selected":""}>${e}</option>`
            ).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(c =>
              `<option value="${c.id}" ${slot.card?.id===c.id?"selected":""}>${c.name}</option>`
            ).join("")}
          </select>

          ${slot.card ? `
            <div class="stat"><strong>${slot.card.name}</strong></div>

            <div class="stat">
              ATK: ${slot.card.atk}
              ${bonus.atk ? `<span class="bonus">+${bonus.atk} → (${slot.card.atk + bonus.atk})</span>` : ""}
            </div>

            <div class="stat">
              DEF: ${slot.card.def}
              ${bonus.def ? `<span class="bonus">+${bonus.def} → (${slot.card.def + bonus.def})</span>` : ""}
            </div>

            <div class="stat">⭐ ${slot.card.stars}</div>
          ` : ""}
        </div>
      `;
    });
  }

  function renderTerrain() {
    const el = document.getElementById("terrainSlot");
    el.innerHTML = `
      <select onchange="selectTerrain(this.value)">
        <option value="">— Sin Terreno —</option>
        ${TERRAINS.map(t =>
          `<option value="${t.id}" ${activeTerrain?.id===t.id?"selected":""}>${t.name}</option>`
        ).join("")}
      </select>

      ${activeTerrain ? `
        <div class="effect-text">
          <div class="terrain-name">${activeTerrain.name}</div>
          ${activeTerrain.textEffect}
        </div>
      ` : ""}
    `;
  }

  renderBoard();
  renderTerrain();
});
