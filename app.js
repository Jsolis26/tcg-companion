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

    // limpiar temporales
    creatures.forEach(c => c.atkTemp = 0);

    logEvent("Nuevo turno (temporales limpiados)");
    updateUI();
    renderBoard();
    renderTerrain();
  };

  // ======================
  // CARTAS DE CRIATURA
  // ======================
  const creatureCards = [
    { name: "— Vacío —", element: "Ninguno", atk: 0, def: 0, stars: 0 },
    { name: "Espectro Menor", element: "Sombra", atk: 5, def: 4, stars: 1 },
    { name: "Aprendiz Necromancer", element: "Sombra", atk: 7, def: 8, stars: 2 },
    { name: "Caballero No-Muerto", element: "Sombra", atk: 11, def: 11, stars: 3 },
    { name: "Guardián de Luz", element: "Luz", atk: 6, def: 10, stars: 2 }
  ];

  // ======================
  // CARTAS DE TERRENO
  // ======================
  const terrainCards = [
    {
      name: "— Sin Terreno —",
      apply: () => ({ atk: 0, def: 0 })
    },
    {
      name: "Cementerio Antiguo",
      apply: creature =>
        creature.card.element === "Sombra"
          ? { atk: 1, def: 0 }
          : { atk: 0, def: 0 }
    },
    {
      name: "Santuario de Luz",
      apply: creature =>
        creature.card.element === "Luz"
          ? { atk: 0, def: 1 }
          : { atk: 0, def: 0 }
    }
  ];

  const elements = ["Todos", "Sombra", "Luz"];

  // ======================
  // MESA
  // ======================
  const creatures = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    elementFilter: "Todos",
    card: creatureCards[0],
    atkTemp: 0,
    atkPerm: 0,
    damage: 0
  }));

  let terrain = terrainCards[0];

  // ======================
  // CÁLCULOS (CLAVE)
  // ======================
  function terrainBonus(creature) {
    return terrain.apply ? terrain.apply(creature) : { atk: 0, def: 0 };
  }

  function atk(c) {
    const bonus = terrainBonus(c);
    return c.card.atk + c.atkTemp + c.atkPerm + bonus.atk;
  }

  function def(c) {
    const bonus = terrainBonus(c);
    return Math.max(c.card.def + bonus.def - c.damage, 0);
  }

  // ======================
  // ACCIONES
  // ======================
  window.setFilter = (slot, value) => {
    creatures[slot].elementFilter = value;
    creatures[slot].card = creatureCards[0];
    renderBoard();
  };

  window.selectCard = (slot, index) => {
    creatures[slot] = {
      ...creatures[slot],
      card: creatureCards[index],
      atkTemp: 0,
      atkPerm: 0,
      damage: 0
    };
    logEvent(`Criatura ${slot + 1}: ${creatureCards[index].name}`);
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

  window.selectTerrain = index => {
    terrain = terrainCards[index];
    logEvent(`Terreno activo: ${terrain.name}`);
    renderBoard();
    renderTerrain();
  };

  window.resetGame = () => {
    life = 30;
    maxMana = 1;
    currentMana = 1;
    log.innerHTML = "";

    creatures.forEach(c => {
      c.card = creatureCards[0];
      c.atkTemp = 0;
      c.atkPerm = 0;
      c.damage = 0;
      c.elementFilter = "Todos";
    });

    terrain = terrainCards[0];

    logEvent("Nueva partida iniciada");
    updateUI();
    renderBoard();
    renderTerrain();
  };

  // ======================
  // RENDER
  // ======================
  function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    creatures.forEach((c, i) => {
      const filtered = creatureCards.filter(card =>
        c.elementFilter === "Todos" || card.element === c.elementFilter
      );

      const div = document.createElement("div");
      div.className = "slot";

      div.innerHTML = `
        <div class="slot-title">Criatura ${c.slot}</div>

        <div class="creature">
          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(el =>
              `<option ${el === c.elementFilter ? "selected" : ""}>${el}</option>`
            ).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            ${filtered.map(card =>
              `<option value="${creatureCards.indexOf(card)}"
                ${card.name === c.card.name ? "selected" : ""}>
                ${card.name}
              </option>`
            ).join("")}
          </select>

          <div>⭐ ${c.card.stars}</div>
          <div>ATK: ${atk(c)}</div>
          <div>DEF: ${def(c)} / ${c.card.def}</div>

          <button onclick="addAtkTemp(${i})">+ATK temp</button>
          <button onclick="addAtkPerm(${i})">+ATK perm</button>
          <button onclick="takeDamage(${i})">Daño</button>
        </div>
      `;

      board.appendChild(div);
    });
  }

  function renderTerrain() {
    const slot = document.getElementById("terrainSlot");

    slot.innerHTML = `
      <div class="terrain">
        <select onchange="selectTerrain(this.value)">
          ${terrainCards.map((t, i) =>
            `<option value="${i}" ${t.name === terrain.name ? "selected" : ""}>
              ${t.name}
            </option>`
          ).join("")}
        </select>
        <div><strong>Terreno activo</strong></div>
      </div>
    `;
  }

  updateUI();
  renderBoard();
  renderTerrain();
});
