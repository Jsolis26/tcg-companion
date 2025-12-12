// ======================
// CRIATURAS
// ======================
export const creatures = [
  { id:"espectro_menor", name:"Espectro Menor", element:"Oscuridad", stars:1, atk:5, def:4, mana:1, class:"Sombra" },
  { id:"aprendiz_necromancer", name:"Aprendiz Necromancer", element:"Oscuridad", stars:2, atk:7, def:8, mana:2, class:"Mago" },
  { id:"espectro_errante", name:"Espectro Errante", element:"Oscuridad", stars:3, atk:11, def:12, mana:3, class:"Sombra" },
  { id:"caballero_no_muerto", name:"Caballero No-Muerto", element:"Oscuridad", stars:4, atk:15, def:17, mana:4, class:"Sombra" },

  { id:"naiade_curiosa", name:"Naiade Curiosa", element:"Agua", stars:1, atk:5, def:5, mana:1, class:"Bestia" },
  { id:"guardian_mareas", name:"Guardián de las Mareas", element:"Agua", stars:2, atk:8, def:9, mana:2, class:"Guerrero" },

  { id:"salamandra_ignea", name:"Salamandra Ígnea", element:"Fuego", stars:1, atk:6, def:4, mana:1, class:"Bestia" },
  { id:"guerrero_brasas", name:"Guerrero de las Brasas", element:"Fuego", stars:2, atk:9, def:7, mana:2, class:"Guerrero" }
];

// ======================
// TERRENOS
// ======================
export const terrains = [
  {
    id: "cementerio_oscuro",
    name: "Cementerio Oscuro",
    affects: { class: "Sombra" },
    bonus: { atk: 1, def: 0 }
  },
  {
    id: "santuario_coral",
    name: "Santuario de Coral",
    affects: { element: "Agua" },
    bonus: { atk: 0, def: 1 }
  },
  {
    id: "volcan_erupcion",
    name: "Volcán en Erupción",
    affects: { element: "Fuego" },
    bonus: { atk: 1, def: 0 }
  }
];
