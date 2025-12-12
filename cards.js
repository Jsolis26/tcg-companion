export const creatures = [
  { id:"espectro_menor", name:"Espectro Menor", element:"Oscuridad", stars:1, atk:5, def:4, class:"Sombra" },
  { id:"naiade_curiosa", name:"Naiade Curiosa", element:"Agua", stars:1, atk:5, def:5, class:"Bestia" },
  { id:"salamandra_ignea", name:"Salamandra Ígnea", element:"Fuego", stars:1, atk:6, def:4, class:"Bestia" },
  { id:"aprendiz_radiante", name:"Aprendiz Radiante", element:"Luz", stars:1, atk:4, def:6, class:"Guerrero" },
  { id:"espiritu_errante", name:"Espíritu Errante", element:"Viento", stars:1, atk:6, def:4, class:"Espíritu" },
  { id:"pulso_erratico", name:"Pulso Errático", element:"Electricidad", stars:1, atk:6, def:4, class:"Electricidad" },
  { id:"semilla_errante", name:"Semilla Errante", element:"Planta", stars:1, atk:4, def:6, class:"Planta" },
  { id:"golem_roca", name:"Gólem de Roca Menor", element:"Tierra", stars:1, atk:4, def:6, class:"Bestia" }
];

export const terrains = [

  {
    id: "cementerio_oscuro",
    name: "Cementerio Oscuro",
    affects: { class: "Sombra" },
    bonus: { atk: 0, def: 2 },
    textEffect: "Una vez por turno, puedes descartar 1 carta para recuperar +1 maná."
  },

  {
    id: "santuario_coral",
    name: "Santuario de Coral",
    affects: { element: "Agua" },
    bonus: { atk: 2, def: 0 },
    textEffect: "La primera criatura de Agua que invoques cada turno gana +1 DEF permanente."
  },

  {
    id: "volcan_erupcion",
    name: "Volcán en Erupción",
    affects: { element: "Fuego" },
    bonus: { atk: 2, def: 0 },
    textEffect: "Cuando una criatura de Fuego destruya una criatura enemiga, inflige 1 daño directo al rival (máx. 2 veces por turno)."
  },

  {
    id: "templo_luz",
    name: "Templo de la Luz",
    affects: { element: "Luz" },
    bonus: { atk: 0, def: 2 },
    textEffect: "Una vez por turno, puedes curar 1 punto de vida."
  },

  {
    id: "altos_viento",
    name: "Altos del Viento",
    affects: { element: "Viento" },
    bonus: { atk: 1, def: 0 },
    textEffect: "Tus criaturas de Viento pueden atacar el turno en que son invocadas."
  },

  {
    id: "red_alta_tension",
    name: "Red de Alta Tensión",
    affects: { element: "Electricidad" },
    bonus: { atk: 0, def: 0 },
    textEffect: "Tus criaturas de Electricidad pueden atacar el turno en que son invocadas. Cada vez que destruyas una criatura enemiga, infliges 2 de daño directo al rival."
  },

  {
    id: "bosque_sagrado",
    name: "Bosque Sagrado",
    affects: { element: "Planta" },
    bonus: { atk: 0, def: 2 },
    textEffect: "La primera criatura de Planta que invoques cada turno gana +1 ATK permanente."
  },

  {
    id: "valle_rocoso",
    name: "Valle Rocoso",
    affects: { element: "Tierra" },
    bonus: { atk: 0, def: 2 },
    textEffect: "La primera vez que una criatura de Tierra fuese a recibir daño cada turno, reduce ese daño en 2."
  }

];
