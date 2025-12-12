import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  let life = 30;
  let maxMana = 1;
  let currentMana = 1;

  const log = document.getElementById("log");

  function logEvent(text) {
    const li = document.createElement("li");
    li.innerText = text;
    log.prepend(li);
  }

  function updateUI() {
    document.getElementById("life").innerText = life;
    document.getElementById("maxMana").innerText = maxMana;
    document.getElementById("currentMana").innerText = currentMana;
  }

  // ======================
  // ESTADO DE JUEGO
  // ======================
  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    atkTemp: 0,
    atkPerm: 0,
    damage: 0,
    filter: "Todos"
  }));

  let activeTerrain = null;

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];
  const classes  = [...new Set(CREATURES.map(c => c.class))];

  // ======================
  // CÁLCULOS
  // ======================
  function terrainBonus(card) {
    if (!activeTerrain || !card) return { atk: 0, def: 0 };

    // afecta por elemento
    if (activeTerrain.affects?.element === card.element) {
      return activeTerrain.bonus;
    }

    // afecta por clase
    if (activeTerrain.affects?.class === card.class) {
      return activeTerrain.bonus;
    }

    return { atk: 0, def: 0 };
  }

  function baseAtk(slot) {
    return slot.card ? slot.card.atk + slot.atkTemp + slot.atkPerm : 0;
  }

  function baseDef(slot) {
    return slot.card ? Math.max(slot.card.def - slot.damage, 0) : 0;
  }

  function finalAtk(slot) {
    return baseAtk(slot) + terrainBonus(slot.card).atk;
  }

  function finalDef(slot) {
    return baseDef(slot) + terrainBonus(slot.card).def;
  }

  // ======================
  // ACCIONES
  // ======================
  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    renderBoard();
  };

  window.selectCard = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id);
    board[i].atkTemp = board[i].atkPerm = board[i].damage = 0;
    renderBoard();
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;
    logEvent(activeTerrain ? `Terreno activo: ${activeTerrain.name}` : "Terreno removido");
    renderBoard();
    renderTerrain();
  };

  // ======================
  // RENDER
  // ======================
  function renderBoard() {
    const el = document.getElementById("board");
    el.innerHTML = "";

    board.forEach((slot, i) => {
      const list = CREATURES.filter(c =>
        slot.filter === "Todos" || c.element === slot.filter
      );

      const bonus = slot.card ? terrainBonus(slot.card) : { atk: 0, def: 0 };

      el.innerHTML += `
        <div class="slot">
          <div class="slot-title">Criatura ${slot.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e => `<option ${e===slot.filter?"selected":""}>${e}</option>`).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
          </select>

          ${slot.card ? `
            <div class="stat">
              ATK: ${baseAtk(slot)}
              ${bonus.atk ? `<span class="bonus">+${bonus.atk} → (${finalAtk(slot)})</span>` : ""}
            </div>
            <div class="stat">
              DEF: ${baseDef(slot)}
              ${bonus.def ? `<span class="bonus">+${bonus.def} → (${finalDef(slot)})</span>` : ""}
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
      <div class="terrain">
        <select onchange="selectTerrain(this.value)">
          <option value="">— Sin Terreno —</option>
          ${TERRAINS.map(t =>
            `<option value="${t.id}" ${activeTerrain?.id===t.id?"selected":""}>
              ${t.name}
            </option>`
          ).join("")}
        </select>
        ${activeTerrain ? `
          <div>
            Afecta: ${activeTerrain.affects?.element || activeTerrain.affects?.class}
            <br>
            Bono: +${activeTerrain.bonus.atk || 0} ATK / +${activeTerrain.bonus.def || 0} DEF
          </div>
        ` : ""}
      </div>
    `;
  }

  renderBoard();
  renderTerrain();
  updateUI();
});
