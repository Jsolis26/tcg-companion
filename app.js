import { creatures as CREATURES, terrains as TERRAINS } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // CONFIGURACIÓN GENERAL
  // ======================
  const MAX_MANA_LIMIT = 8;

  // ======================
  // ESTADO DE PARTIDA
  // ======================
  let life = 40;
  let mana = 3;
  let maxMana = 3;

  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    filter: "Todos",
    modAtk: 0,
    modDef: 0,
    position: "ATK", // ATK | DEF
    summonedThisTurn: false
  }));

  let activeTerrain = null;
  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  // ======================
  // LOG DE ACCIONES
  // ======================
  const log = [];

  function addLog(text) {
    log.unshift(text);
    if (log.length > 50) log.pop();
  }

  // ======================
  // BONOS AUTOMÁTICOS
  // ======================
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

    // Pasivos legendarios
    board.forEach(s => {
      if (s.card?.legendary && s.card.passiveBonus) {
        const a = s.card.passiveBonus.affects;
        if (
          a.element === card.element ||
          a.class === card.class
        ) {
          atk += s.card.passiveBonus.bonus.atk;
          def += s.card.passiveBonus.bonus.def;
        }
      }
    });

    return { atk, def };
  }

  // ======================
  // CONTROLES DE JUGADOR
  // ======================
  window.changeLife = v => {
    life += v;
    if (life < 0) life = 0;
    addLog(`❤️ Vida ${v > 0 ? "➕" : "➖"}${Math.abs(v)} → ${life}`);
    render();
  };

  window.useMana = v => {
    if (mana >= v) {
      mana -= v;
      addLog(`🔮 Usa ${v} maná → ${mana}/${maxMana}`);
      render();
    }
  };

  window.addMana = v => {
    mana += v;
    if (mana < 0) mana = 0;
    if (mana > maxMana) mana = maxMana;
    addLog(`🔮 Maná ${v > 0 ? "➕" : "➖"}${Math.abs(v)} → ${mana}/${maxMana}`);
    render();
  };

  window.addMaxMana = v => {
    const before = maxMana;
    maxMana += v;

    if (maxMana > MAX_MANA_LIMIT) maxMana = MAX_MANA_LIMIT;
    if (maxMana < 0) maxMana = 0;
    if (mana > maxMana) mana = maxMana;

    if (maxMana !== before) {
      addLog(`🔷 Máx. maná ajustado → ${maxMana}`);
    } else {
      addLog(`🔷 Máx. maná permanece en ${maxMana} (límite)`);
    }

    render();
  };

  // ======================
  // FIN DE TURNO
  // ======================
  window.endTurn = () => {
    if (maxMana < MAX_MANA_LIMIT) {
      maxMana++;
      addLog(`🔄 Fin de turno → Máx. maná sube a ${maxMana}`);
    } else {
      addLog(`🔄 Fin de turno → Máx. maná ya está en ${MAX_MANA_LIMIT}`);
    }

mana = maxMana;
addLog(`🔮 Maná restaurado a ${mana}/${maxMana}`);

board.forEach(s => {
  s.summonedThisTurn = false;
});

render();

  };

  // ======================
  // NUEVA PARTIDA
  // ======================
  window.newGame = () => {
    life = 40;
    mana = 3;
    maxMana = 3;
    log.length = 0;

    board.forEach(s => {
      s.card = null;
      s.filter = "Todos";
      s.modAtk = 0;
      s.modDef = 0;
      s.position = "ATK";
    });

    activeTerrain = null;
    addLog("🆕 Nueva partida iniciada");
    render();
  };

  // ======================
  // TABLERO (CRIATURAS)
  // ======================
  window.setFilter = (i, v) => {
  board[i].filter = v;
  board[i].card = null;
  board[i].modAtk = 0;
  board[i].modDef = 0;
  board[i].position = "ATK";
  addLog(`📂 Criatura ${i + 1}: filtro → ${v}`);
  render();
};

  window.selectCard = (i, id) => {
    const card = CREATURES.find(c => c.id === id) || null;
    board[i].card = card;
    board[i].modAtk = 0;
    board[i].modDef = 0;
    board[i].position = "ATK";
    board[i].summonedThisTurn = true;

    if (card) {
      addLog(`🧙 Invoca ${card.name} en Criatura ${i + 1}`);
    }

    render();
  };

  window.modAtk = (i, v) => {
    board[i].modAtk += v;
    addLog(`⚔️ Criatura ${i + 1}: ATK ${v > 0 ? "➕" : "➖"}${Math.abs(v)}`);
    render();
  };

  window.modDef = (i, v) => {
    board[i].modDef += v;
    addLog(`🛡️ Criatura ${i + 1}: DEF ${v > 0 ? "➕" : "➖"}${Math.abs(v)}`);
    render();
  };

  window.clearMods = i => {
    board[i].modAtk = 0;
    board[i].modDef = 0;
    addLog(`🧹 Criatura ${i + 1}: modificadores limpiados`);
    render();
  };

window.togglePosition = i => {
  board[i].position = board[i].position === "ATK" ? "DEF" : "ATK";
  addLog(`🔄 Criatura ${i + 1}: cambia a ${board[i].position}`);
  render();
};


  // ======================
  // TERRENO
  // ======================
  window.selectTerrain = id => {
    activeTerrain = TERRAINS.find(t => t.id === id) || null;

    if (activeTerrain) {
      addLog(`🌍 Terreno activo: ${activeTerrain.name}`);
    } else {
      addLog("🌍 Terreno removido");
    }

    render();
  };

  // ======================
  // RENDER
  // ======================
  function render() {
    document.getElementById("life").innerText = life;
    document.getElementById("currentMana").innerText = mana;

    const maxManaEl = document.getElementById("maxMana");
    if (maxManaEl) maxManaEl.innerText = maxMana;

    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    board.forEach((s, i) => {
      const list = CREATURES.filter(
        c => s.filter === "Todos" || c.element === s.filter
      );

      const auto = s.card ? autoBonus(s.card) : { atk: 0, def: 0 };

      boardEl.innerHTML += `
<div class="slot ${s.summonedThisTurn ? "summoned" : ""}">
          <div class="slot-title">Criatura ${s.slot}</div>

          <select onchange="setFilter(${i}, this.value)">
            ${elements.map(e =>
              `<option ${s.filter === e ? "selected" : ""}>${e}</option>`
            ).join("")}
          </select>

          <select onchange="selectCard(${i}, this.value)">
            <option value="">— Selecciona —</option>
            ${list.map(c =>
              `<option value="${c.id}" ${s.card?.id === c.id ? "selected" : ""}>${c.name}</option>`
            ).join("")}
          </select>

          ${s.card ? `
            <div class="stat ${s.card.legendary ? "legendary" : ""}">
              ${s.card.name}
            </div>

            <div class="stat position ${s.position === "ATK" ? "pos-atk" : "pos-def"}">
  ${s.position === "ATK" ? "⚔️ Posición de Ataque" : "🛡️ Posición de Defensa"}
</div>

<button onclick="togglePosition(${i})">
  Cambiar a ${s.position === "ATK" ? "DEF" : "ATK"}
</button>


<div class="stat atk ${s.position === "ATK" ? "active-stat" : "inactive-stat"}">
  ATK: ${s.card.atk}
  ${auto.atk ? ` (<span class="auto">+${auto.atk}</span>)` : ""}
  ${s.modAtk ? ` (<span class="manual">${s.modAtk > 0 ? "+" : ""}${s.modAtk}</span>)` : ""}
  → <strong>${s.card.atk + auto.atk + s.modAtk}</strong>
</div>

<div class="stat def ${s.position === "DEF" ? "active-stat" : "inactive-stat"}">
  DEF: ${s.card.def}
  ${auto.def ? ` (<span class="auto">+${auto.def}</span>)` : ""}
  ${s.modDef ? ` (<span class="manual">${s.modDef > 0 ? "+" : ""}${s.modDef}</span>)` : ""}
  → <strong>${s.card.def + auto.def + s.modDef}</strong>
</div>

            <div class="stat">
              Mod ATK:
              <button onclick="modAtk(${i},1)">+</button>
              <button onclick="modAtk(${i},-1)">−</button>
              (${s.modAtk})
            </div>

            <div class="stat">
              Mod DEF:
              <button onclick="modDef(${i},1)">+</button>
              <button onclick="modDef(${i},-1)">−</button>
              (${s.modDef})
            </div>

            <button onclick="clearMods(${i})">Limpiar</button>

            ${s.card.legendary && s.card.textEffect ? `
              <div class="effect-text">${s.card.textEffect}</div>
            ` : ""}
          ` : ""}
        </div>
      `;
    });

    document.getElementById("terrainSlot").innerHTML = `
      <select onchange="selectTerrain(this.value)">
        <option value="">— Sin Terreno —</option>
        ${TERRAINS.map(t =>
          `<option value="${t.id}" ${activeTerrain?.id === t.id ? "selected" : ""}>${t.name}</option>`
        ).join("")}
      </select>
      ${activeTerrain ? `<div class="effect-text">${activeTerrain.textEffect}</div>` : ""}
    `;

    const logEl = document.getElementById("log");
    if (logEl) {
      logEl.innerHTML = log
        .map(entry => `<div class="log-entry">• ${entry}</div>`)
        .join("");
    }
  }

  render();
});







