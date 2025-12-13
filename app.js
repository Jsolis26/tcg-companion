import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ESTADO GLOBAL
  ========================== */

  let life = 40;

  let maxMana = 3;
  let mana = 3;

  let turn = 1;

  const phases = [
    "Inicio",
    "Robo",
    "Principal 1",
    "Combate",
    "Principal 2",
    "Final"
  ];
  let phaseIndex = 0;

  /* =========================
     MESA (5 SLOTS)
  ========================== */

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos",
    position: "ataque",
    summonedThisTurn: false,
    hasAttacked: false,
    positionChangedThisTurn: false
  }));

  let activeTerrain = null;

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  /* =========================
     UTILIDADES
  ========================== */

  function currentPhase() {
    return phases[phaseIndex];
  }

  function isCombatPhase() {
    return currentPhase() === "Combate";
  }

  /* =========================
     BONOS (TERRENO + LEGENDARIOS)
  ========================== */

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
     TURNOS Y FASES
  ========================== */

  window.nextPhase = () => {
    phaseIndex++;

    if (phaseIndex >= phases.length) {
      phaseIndex = 0;
      turn++;
      startTurn();
    }

    render();
  };

  function startTurn() {
    maxMana += 1;
    mana = maxMana;

    board.forEach(s => {
      s.hasAttacked = false;
      s.positionChangedThisTurn = false;
      s.summonedThisTurn = false;
    });
  }

  /* =========================
     ACCIONES GENERALES
  ========================== */

  window.resetGame = () => {
    life = 40;
    maxMana = 3;
    mana = 3;
    turn = 1;
    phaseIndex = 0;
    activeTerrain = null;

    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.position = "ataque";
      s.summonedThisTurn = false;
      s.hasAttacked = false;
      s.positionChangedThisTurn = false;
    });

    render();
  };

  window.changeLife = v => {
    life += v;
    render();
  };

  window.useMana = cost => {
    if (mana >= cost) {
      mana -= cost;
      render();
    }
  };

  /* =========================
     SELECCIÓN DE CARTAS
  ========================== */

  window.setFilter = (i, value) => {
    board[i].filter = value;
    board[i].card = null;
    render();
  };

  window.selectCard = (i, id) => {
    if (!id) {
      board[i].card = null;
      render();
      return;
    }

    const card = CREATURES.find(c => c.id === id);
    if (!card) return;

    board[i].card = card;
    board[i].summonedThisTurn = true;
    board[i].hasAttacked = false;
    board[i].position = "ataque";

    render();
  };

  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;
    render();
  };

  /* =========================
     POSICIÓN DE BATALLA
  ========================== */

  window.togglePosition = i => {
    const slot = board[i];

    if (!slot.card) return;
    if (slot.summonedThisTurn) return;
    if (slot.positionChangedThisTurn) return;
    if (isCombatPhase()) return;

    slot.position =
      slot.position === "ataque" ? "defensa" : "ataque";

    slot.positionChangedThisTurn = true;
    render();
  };

  /* =========================
     COMBATE BÁSICO
  ========================== */

  window.attackPlayer = i => {
    if (!isCombatPhase()) return;

    const slot = board[i];
    if (!slot.card) return;
    if (slot.hasAttacked) return;
    if (slot.summonedThisTurn) return;
    if (slot.position !== "ataque") return;

    const damage = slot.card.stars;
    life -= damage;

    slot.hasAttacked = true;

    alert(`${slot.card.name} inflige ${damage} de daño directo`);
    render();
  };

  /* =========================
     RENDER
  ========================== */

  function render() {
    document.getElementById("life").innerText = life;
    document.getElementById("currentMana").innerText = mana;
    document.getElementById("turnNumber").innerText = turn;
    document.getElementById("phaseName").innerText = currentPhase();

    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((slot, i) => {
      const availableCards = CREATURES.filter(c =>
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
            ${availableCards.map(c =>
              `<option value="${c.id}" ${slot.card?.id === c.id ? "selected" : ""}>${c.name}</option>`
            ).join("")}
          </select>

          ${slot.card ? `
            <div class="stat ${slot.card.legendary ? "legendary" : ""}">
              ${slot.card.name}
            </div>

            <div class="stat">
              Posición: ${slot.position.toUpperCase()}
              <button onclick="togglePosition(${i})">Cambiar</button>
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

            ${isCombatPhase() ? `
              <button onclick="attackPlayer(${i})">Atacar jugador</button>
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
