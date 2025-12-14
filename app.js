import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  const MAX_MANA_LIMIT = 8;

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
  const log = [];

  function addLog(text) {
    log.unshift(text);
    if (log.length > 50) log.pop();
  }

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

  window.setFilter = (i, v) => {
    board[i].filter = v;
    board[i].card = null;
    render();
  };

  window.selectCard = (i, id) => {
    board[i].card = CREATURES.find(c => c.id === id) || null;
    board[i].summonedThisTurn = true;
    render();
  };

  window.toggleElementDropdown = i => {
    document.querySelectorAll(".element-options").forEach(el => el.style.display = "none");
    document.getElementById(`element-options-${i}`).style.display = "block";
  };

  window.selectElement = (i, value) => {
    setFilter(i, value);
    document.getElementById(`element-options-${i}`).style.display = "none";
  };

  window.toggleCreatureDropdown = i => {
    document.querySelectorAll(".creature-options").forEach(el => el.style.display = "none");
    document.getElementById(`creature-options-${i}`).style.display = "block";
  };

  window.selectCreature = (i, id) => {
    selectCard(i, id);
    document.getElementById(`creature-options-${i}`).style.display = "none";
  };

  document.addEventListener("click", e => {
    if (!e.target.closest(".element-dropdown") &&
        !e.target.closest(".creature-dropdown")) {
      document.querySelectorAll(".element-options, .creature-options")
        .forEach(el => el.style.display = "none");
    }
  });

  function render() {
    document.getElementById("board").innerHTML = "";

    board.forEach((s, i) => {
      const list = CREATURES.filter(
        c => s.filter === "Todos" || c.element === s.filter
      );

      document.getElementById("board").innerHTML += `
        <div class="slot element-${s.card ? s.card.element.toLowerCase() : "todos"}">
          <div class="slot-title">Criatura ${s.slot}</div>

          <div class="element-dropdown">
            <button class="element-selected" onclick="toggleElementDropdown(${i})">
              <span class="el-icon">${getElementIcon(s.filter)}</span>
              ${s.filter}
            </button>
            <div class="element-options" id="element-options-${i}">
              ${elements.map(e => `
                <div class="element-option" onclick="selectElement(${i}, '${e}')">
                  <span class="el-icon">${getElementIcon(e)}</span>${e}
                </div>`).join("")}
            </div>
          </div>

          <div class="creature-dropdown">
            <button class="creature-selected" onclick="toggleCreatureDropdown(${i})">
              ${s.card
                ? `<span class="el-icon">${getElementIcon(s.card.element)}</span>
                   <span class="creature-name">${s.card.name}</span>
                   <span class="stars">${"⭐".repeat(s.card.stars)}</span>`
                : "🧙 Seleccionar criatura"}
            </button>
            <div class="creature-options" id="creature-options-${i}">
              ${list.map(c => `
                <div class="creature-option" onclick="selectCreature(${i}, '${c.id}')">
                  <span class="el-icon">${getElementIcon(c.element)}</span>
                  <span class="creature-name">${c.name}</span>
                  <span class="stars">${"⭐".repeat(c.stars)}</span>
                </div>`).join("")}
            </div>
          </div>
        </div>`;
    });
  }

  render();
});
