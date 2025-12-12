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

  // ======================
  // ESTADO DE MESA
  // ======================
  const board = Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    card: null,
    atkTemp: 0,
    atkPerm: 0,
    damage: 0,
    filter: "Todos"
  }));

  let activeTerrain = null;

  const elements = ["Todos", ...new Set(CREATURES.map(c => c.element))];

  // ======================
  // CÁLCULOS
  // ======================
  function terrainBonus(card) {
    if (!activeTerrain || !card) return { atk: 0, def: 0 };

    if (activeTerrain.affects?.element === card.element) {
      return activeTerrain.bonus;
    }

    if (activeTerrain.affects?.class === card.class) {
      return activeTerrain.bonus;
    }

    return { atk: 0, def: 0 };
  }

  function baseAtk(slot) {
    return slot.card ? slot.card.atk + slot.atkTemp + slot.atkPerm : 0;
  }

  function baseDef(slot) {
    return slot.card ? Math.max(slot.card.def - slot.damage, 0) : 0;
  }

  function fina
