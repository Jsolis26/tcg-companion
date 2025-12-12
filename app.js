document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // VIDA Y MANÁ
  // ======================
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

  window.changeLife = amount => {
    life += amount;
    logEvent(`Vida ${amount > 0 ? "+" : ""}${amount}`);
    updateUI();
  };

  window.useMana = amount => {
    if (currentMana >= amount) {
      currentMana -= amount;
      logEvent(`Usa ${amount} maná`);
      updateUI();
    }
  };

  window.addTempMana = amount => {
    currentMana += amount;
    logEvent(`Maná temporal +${amount}`);
    updateUI();
  };

  window.nextTurn = () => {
    if (maxMana < 8) maxMana++;
    currentMana = maxMana;
    creatures.forEach(c => c.atkTemp = 0);
    logEvent("Nuevo turno (temporales limpiados)");
    updateUI();
    renderBoard();
  };

  // ======================
  // CARTAS
  // ======================
  const cards = [
    { name: "— Vacío —", element: "Ninguno", atk: 0, def: 0 },
    { name: "Espectro Menor", element: "Sombra", atk: 5, def: 4 },
    { name: "Aprendiz Necromancer", element: "Sombra", atk: 7, def: 8 },
    { name: "Caballero No-Muerto", element: "Sombra", atk: 11, def: 11 },
    { name: "Guardían de Luz", element: "Luz", atk: 6, def: 10 }
  ];

  const elements = ["Todos", "Sombra", "Luz"];

  // ======================
  // MESA
  // ======================
  const creatures = Array.from({ length: 5 }, () => ({
    elementFilter: "Todos",
    card: cards[0],
    atkTemp: 0,
    atkPerm: 0,
    damage: 0
  }));

  const atk = c => c.card.atk + c.atkTemp + c.atkPerm;
  const def = c => Math.max(c.card.def - c.damage, 0);

  // ======================
  // ACCIONES
  // ======================
  window.setFilter = (slot, value) => {
    creatures[slot].elementFilter = value;
    creatures[slot].card = cards[0];
    renderBoard();
  };

  window.selectCard = (slot, index) => {
    creatures[slot].card = cards[index];
    creatures[slot].atkTemp = 0;
    creatures[slot].atkPerm = 0;
    creatures[slot].damage = 0;
    logEvent(`Slot ${slot + 1}: ${cards[index].name}`);
    renderBoard();
  };

  window.addAtkTemp = slot => {
    creatures[slot].atkTemp++;
    renderBoard();
  };

  window.addAtkPerm = slot => {
    creatures[slot].atkPerm++;
    renderBoard();
  };

  window.takeDamage = slot => {
    creatures[slot].damage++;
    renderBoard();
  };

  // ======================
  // RESET
  // ======================
  window.resetGame = () => {
    life = 30;
    maxMana = 1;
    currentMana = 1;
    log.innerHTML = "";

    creatures.forEach(c => {
      c.card = cards[0];
      c.atkTemp = 0;
      c.atkPerm = 0;
      c.damage = 0;
      c.elementFilter = "Todos";
    });

    logEvent("Nueva partida iniciada");
    updateUI();
    renderBoard();
  };

  // ======================
  // RENDER
  // ======================
  function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    creatures.forEach((c, i) => {
      const filtered = cards.filter(card =>
        c.elementFilter === "Todos" || card.element === c.elementFilter
      );

      const div = document.createElement("div");
      div.className = "creature";

      div.innerHTML = `
        <select onchange="setFilter(${i}, this.value)">
          ${elements.map(el =>
            `<option ${el === c.elementFilter ? "selected" : ""}>${el}</option>`
          ).join("")}
        </select>

        <select onchange="selectCard(${i}, this.value)">
          ${filtered.map(card =>
            `<option value="${cards.indexOf(card)}"
              ${card.name === c.card.name ? "selected" : ""}>
              ${card.name}
            </option>`
          ).join("")}
        </select>

        <div>ATK: ${atk(c)}</div>
        <div>DEF: ${def(c)} / ${c.card.def}</div>

        <button onclick="addAtkTemp(${i})">+ATK temp</button>
        <button onclick="addAtkPerm(${i})">+ATK perm</button>
        <button onclick="takeDamage(${i})">Daño</button>
      `;

      board.appendChild(div);
    });
  }

  updateUI();
  renderBoard();
});
