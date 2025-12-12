// ======================
// VIDA
// ======================
let life = 30;

// ======================
// MANÁ
// ======================
let maxMana = 1;
let currentMana = 1;

// ======================
// LOG
// ======================
const log = document.getElementById("log");

function logEvent(text) {
  const li = document.createElement("li");
  li.innerText = text;
  log.prepend(li);
}

// ======================
// UI GENERAL
// ======================
function updateUI() {
  document.getElementById("life").innerText = life;
  document.getElementById("maxMana").innerText = maxMana;
  document.getElementById("currentMana").innerText = currentMana;
}

// ======================
// VIDA
// ======================
function changeLife(amount) {
  life += amount;
  logEvent(`Vida ${amount > 0 ? "+" : ""}${amount}`);
  updateUI();

  if (life <= 0) {
    alert("Jugador derrotado");
  }
}

// ======================
// MANÁ
// ======================
function nextTurn() {
  if (maxMana < 8) maxMana++;
  currentMana = maxMana;

  // limpiar temporales
  creatures.forEach(c => c.atkTemp = 0);

  logEvent("Nuevo turno (temporales limpiados)");
  updateUI();
  updateBoard();
}

function useMana(amount) {
  if (currentMana >= amount) {
    currentMana -= amount;
    logEvent(`Usa ${amount} maná`);
  } else {
    alert("Maná insuficiente");
  }
  updateUI();
}

function addTempMana(amount) {
  currentMana += amount;
  logEvent(`Maná temporal +${amount}`);
  updateUI();
}

// ======================
// CRIATURAS (5 ESPACIOS)
// ======================
const creatures = Array.from({ length: 5 }, (_, i) => ({
  slot: i + 1,
  name: `Criatura ${i + 1}`,
  atkBase: 5,
  atkTemp: 0,
  atkPerm: 0,
  defBase: 4,
  damage: 0
}));

function getAtk(c) {
  return c.atkBase + c.atkTemp + c.atkPerm;
}

function getDef(c) {
  return Math.max(c.defBase - c.damage, 0);
}

// ======================
// ACCIONES DE CRIATURA
// ======================
function addAtkTemp(index) {
  creatures[index].atkTemp += 1;
  logEvent(`Slot ${index + 1}: +1 ATK temporal`);
  updateBoard();
}

function addAtkPerm(index) {
  creatures[index].atkPerm += 1;
  logEvent(`Slot ${index + 1}: +1 ATK permanente`);
  updateBoard();
}

function takeDamage(index) {
  const c = creatures[index];
  c.damage += 1;

  if (getDef(c) <= 0) {
    logEvent(`Slot ${index + 1}: criatura destruida`);
    c.damage = c.defBase;
  } else {
    logEvent(`Slot ${index + 1}: recibe 1 daño`);
  }

  updateBoard();
}

// ======================
// DIBUJAR MESA
// ======================
function updateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  creatures.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "creature";

    div.innerHTML = `
      <h3>${c.name}</h3>
      <div>ATK: ${getAtk(c)}</div>
      <div>DEF: ${getDef(c)} / ${c.defBase}</div>
      <button onclick="addAtkTemp(${i})">+1 ATK temp</button>
      <button onclick="addAtkPerm(${i})">+1 ATK perm</button>
      <button onclick="takeDamage(${i})">Daño</button>
    `;

    board.appendChild(div);
  });
}

// ======================
// INICIO
// ======================
updateUI();
updateBoard();
