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

  window.changeLife = function(amount) {
    life += amount;
    logEvent(`Vida ${amount > 0 ? "+" : ""}${amount}`);
    updateUI();
  };

  window.useMana = function(amount) {
    if (currentMana >= amount) {
      currentMana -= amount;
      logEvent(`Usa ${amount} maná`);
      updateUI();
    }
  };

  window.addTempMana = function(amount) {
    currentMana += amount;
    logEvent(`Maná temporal +${amount}`);
    updateUI();
  };

  window.nextTurn = function() {
    if (maxMana < 8) maxMana++;
    currentMana = maxMana;
    creatures.forEach(c => c.atkTemp = 0);
    logEvent("Nuevo turno (temporales limpiados)");
    updateUI();
    renderBoard();
  };

  // ======================
  // CARTAS DISPONIBLES
  // ======================
  const cards = [
    { name: "— Vacío —", atk: 0, def: 0 },
    { name: "Espectro Menor", atk: 5, def: 4 },
    { name: "Aprendiz Necromancer", atk: 7, def: 8 },
    { name: "Caballero No-Muerto", atk: 11, def: 11 }
  ];

  // ======================
  // CRIATURAS EN MESA
  // ======================
  const creatures = Array.from({ length: 5 }, () => ({
    card: cards[0],
    atkTemp: 0,
    atkPerm: 0,
    damage: 0
  }));

  function atk(c) {
    return c.card.atk + c.atkTemp + c.atkPerm;
  }

  function def(c) {
    return Math.max(c.card.def - c.damage, 0);
  }

  // ======================
  // ACCIONES
  // ======================
  window.selectCard = function(slot, index) {
    creatures[slot] = {
      card: cards[index],
      atkTemp: 0,
      atkPerm: 0,
      damage: 0
    };
    logEvent(`Slot ${slot + 1}: ${cards[index].name}`);
    renderBoard();
  };

  window.addAtkTemp = function(slot) {
    creatures[slot].atkTemp++;
    logEvent(`Slot ${slot + 1}: +1 ATK temp`);
    renderBoard();
  };

  window.addAtkPerm = function(slot) {
    creatures[slot].atkPerm++;
    logEvent(`Slot ${slot + 1}: +1 ATK perm`);
    renderBoard();
  };

  window.takeDamage = function(slot) {
    creatures[slot].damage++;
    logEvent(`Slot ${slot + 1}: recibe daño`);
    renderBoard();
  };

  // ======================
  // RENDER
  // ======================
  function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    creatures.forEach((c, i) => {
      const div = document.createElement("div");
      div.className = "creature";

      div.innerHTML = `
        <select onchange="selectCard(${i}, this.value)">
          ${cards.map((card, idx) =>
            `<option value="${idx}" ${card.name === c.card.name ? "selected" : ""}>${card.name}</option>`
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
