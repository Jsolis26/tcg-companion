// VIDA
let life = 30;

// MANÁ
let maxMana = 1;
let currentMana = 1;

// LOG
const log = document.getElementById("log");

function updateUI() {
  document.getElementById("life").innerText = life;
  document.getElementById("maxMana").innerText = maxMana;
  document.getElementById("currentMana").innerText = currentMana;
}

function logEvent(text) {
  const li = document.createElement("li");
  li.innerText = text;
  log.prepend(li);
}

// VIDA
function changeLife(amount) {
  life += amount;
  logEvent(`Vida ${amount > 0 ? "+" : ""}${amount}`);
  updateUI();

  if (life <= 0) {
    alert("Jugador derrotado");
  }
}

// MANÁ
function nextTurn() {
  if (maxMana < 8) maxMana++;
  currentMana = maxMana;
  logEvent("Nuevo turno: maná restaurado");
  updateUI();
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

// Inicial
updateUI();

// CRIATURA
const creature = {
  name: "Espectro Menor",
  atkBase: 5,
  atkTemp: 0,
  atkPerm: 0,
  defBase: 4,
  damage: 0
};

function updateCreatureUI() {
  document.getElementById("creatureName").innerText = creature.name;
  document.getElementById("atk").innerText =
    creature.atkBase + creature.atkTemp + creature.atkPerm;
  document.getElementById("def").innerText =
    creature.defBase - creature.damage;
  document.getElementById("defMax").innerText = creature.defBase;
}

// ATK
function addAtkTemp(amount) {
  creature.atkTemp += amount;
  logEvent(`ATK temporal +${amount}`);
  updateCreatureUI();
}

function addAtkPerm(amount) {
  creature.atkPerm += amount;
  logEvent(`ATK permanente +${amount}`);
  updateCreatureUI();
}

// DEF / DAÑO
function takeDamage(amount) {
  creature.damage += amount;
  logEvent(`Criatura recibe ${amount} daño`);

  if (creature.defBase - creature.damage <= 0) {
    logEvent("Criatura destruida");
    creature.damage = creature.defBase;
  }
  updateCreatureUI();
}

// LIMPIAR TEMPORALES AL FINAL DEL TURNO
const originalNextTurn = nextTurn;
nextTurn = function () {
  creature.atkTemp = 0;
  logEvent("Se limpian efectos temporales");
  originalNextTurn();
  updateCreatureUI();
};

// REINICIAR PARTIDA
function resetGame() {
  life = 30;
  maxMana = 1;
  currentMana = 1;

  creature.atkTemp = 0;
  creature.atkPerm = 0;
  creature.damage = 0;

  log.innerHTML = "";
  logEvent("Partida reiniciada");
  updateUI();
  updateCreatureUI();
}

// Inicial
updateCreatureUI();

