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
