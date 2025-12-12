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

  window.changeLife = a => { life += a; updateUI(); };
  window.useMana = a => { if (currentMana >= a) currentMana -= a; updateUI(); };
  window.addTempMana = a => { currentMana += a; updateUI(); };
  window.nextTurn = () => {
    if (maxMana < 8) maxMana++;
    currentMana = maxMana;
    creatures.forEach(c => c.atkTemp = 0);
    renderBoard();
  };

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  const creatures = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    atkTemp: 0,
    atkPerm: 0,
    damage: 0,
    filter: "Todos"
  }));

  let terrain = null;

  function baseAtk(c) { return c.card ? c.card.atk + c.atkTemp + c.atkPerm : 0; }
  function baseDef(c) { return c.card ? Math.max(c.card.def - c.damage, 0) : 0; }

  window.setFilter = (i, v) => { creatures[i].filter = v; creatures[i].card = null; renderBoard(); };
  window.selectCard = (i, id) => {
    creatures[i].card = CREATURES.find(c => c.id === id);
    creatures[i].atkTemp = creatures[i].atkPerm = creatures[i].damage = 0;
    renderBoard();
  };

  function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    creatures.forEach((c, i) => {
      const list = CREATURES.filter(x => c.filter === "Todos" || x.element === c.filter);

      board.innerHTML += `
        <div class="slot">
          <div class="slot-title">Criatura ${c.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e => `<option ${e===c.filter?"selected":""}>${e}</option>`).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(x => `<option value="${x.id}">${x.name}</option>`).join("")}
          </select>

          ${c.card ? `
            <div>ATK: ${baseAtk(c)}</div>
            <div>DEF: ${baseDef(c)}</div>
            <div>⭐ ${c.card.stars}</div>
          ` : ""}
        </div>`;
    });
  }

  renderBoard();
  updateUI();
});
