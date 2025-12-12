// ======================
// CRIATURAS
// ======================
export const creatures = [

  // ===== OSCURIDAD =====
  { id:"espectro_menor", name:"Espectro Menor", element:"Oscuridad", stars:1, atk:5, def:4, mana:1, class:"Sombra", rarity:"Común", type:"Criatura" },
  { id:"aprendiz_necromancer", name:"Aprendiz Necromancer", element:"Oscuridad", stars:2, atk:7, def:8, mana:2, class:"Mago", rarity:"Común", type:"Criatura" },
  { id:"espectro_errante", name:"Espectro Errante", element:"Oscuridad", stars:3, atk:11, def:12, mana:3, class:"Sombra", rarity:"Común", type:"Criatura" },
  { id:"caballero_no_muerto", name:"Caballero No-Muerto", element:"Oscuridad", stars:4, atk:15, def:17, mana:4, class:"Sombra", rarity:"Rara", type:"Criatura" },
  { id:"chaman_sombras", name:"Chamán de las Sombras", element:"Oscuridad", stars:5, atk:19, def:20, mana:5, class:"Mago", rarity:"Rara", type:"Criatura" },
  { id:"senor_espectral", name:"Señor Espectral", element:"Oscuridad", stars:6, atk:24, def:25, mana:6, class:"Sombra", rarity:"Épica", type:"Criatura" },
  { id:"dragon_noche_eterna", name:"Dragón de la Noche Eterna", element:"Oscuridad", stars:7, atk:30, def:30, mana:7, class:"Dragón", rarity:"Legendaria", type:"Criatura" },
  { id:"kael_senor_sombras", name:"Kael, Señor de las Sombras", element:"Oscuridad", stars:8, atk:36, def:38, mana:8, class:"Sombra", rarity:"Legendaria", type:"Criatura" },

  // ===== AGUA =====
  { id:"naiade_curiosa", name:"Naiade Curiosa", element:"Agua", stars:1, atk:5, def:5, mana:1, class:"Bestia", rarity:"Común", type:"Criatura" },
  { id:"guardian_mareas", name:"Guardián de las Mareas", element:"Agua", stars:2, atk:8, def:9, mana:2, class:"Guerrero", rarity:"Común", type:"Criatura" },
  { id:"sirena_eco_azul", name:"Sirena del Eco Azul", element:"Agua", stars:3, atk:11, def:11, mana:3, class:"Bestia", rarity:"Común", type:"Criatura" },
  { id:"caballo_agua", name:"Caballo de Agua", element:"Agua", stars:4, atk:15, def:16, mana:4, class:"Bestia", rarity:"Rara", type:"Criatura" },
  { id:"chaman_corriente", name:"Chamán de la Corriente", element:"Agua", stars:5, atk:19, def:20, mana:5, class:"Mago", rarity:"Rara", type:"Criatura" },
  { id:"tortuga_abisal", name:"Tortuga Abisal", element:"Agua", stars:6, atk:23, def:26, mana:6, class:"Bestia", rarity:"Épica", type:"Criatura" },
  { id:"leviatan_horizonte", name:"Leviatán del Horizonte", element:"Agua", stars:7, atk:30, def:30, mana:7, class:"Dragón", rarity:"Legendaria", type:"Criatura" },
  { id:"aqualis_reina", name:"Aqualis, Reina de las Profundidades", element:"Agua", stars:8, atk:35, def:37, mana:8, class:"Mago", rarity:"Legendaria", type:"Criatura" },

  // ===== FUEGO =====
  { id:"salamandra_ignea", name:"Salamandra Ígnea", element:"Fuego", stars:1, atk:6, def:4, mana:1, class:"Bestia", rarity:"Común", type:"Criatura" },
  { id:"guerrero_brasas", name:"Guerrero de las Brasas", element:"Fuego", stars:2, atk:9, def:7, mana:2, class:"Guerrero", rarity:"Común", type:"Criatura" },
  { id:"mago_llama_viva", name:"Mago de la Llama Viva", element:"Fuego", stars:3, atk:12, def:10, mana:3, class:"Mago", rarity:"Común", type:"Criatura" },
  { id:"ave_fenix_menor", name:"Ave Fénix Menor", element:"Fuego", stars:4, atk:16, def:14, mana:4, class:"Bestia", rarity:"Rara", type:"Criatura" },
  { id:"gigante_magma", name:"Gigante de Magma", element:"Fuego", stars:5, atk:21, def:17, mana:5, class:"Bestia", rarity:"Rara", type:"Criatura" },
  { id:"dragon_carmesi", name:"Dragón Carmesí", element:"Fuego", stars:6, atk:26, def:22, mana:6, class:"Dragón", rarity:"Épica", type:"Criatura" },
  { id:"titan_solar", name:"Titán Solar", element:"Fuego", stars:7, atk:32, def:28, mana:7, class:"Bestia", rarity:"Legendaria", type:"Criatura" },
  { id:"ignis_senor_llamas", name:"Ignis, Señor de las Llamas Eternas", element:"Fuego", stars:8, atk:38, def:34, mana:8, class:"Mago", rarity:"Legendaria", type:"Criatura" },

  // (Luz, Viento, Electricidad, Planta, Tierra siguen exactamente igual y ya los tengo listos para la v2)
];

// ======================
// TERRENOS
// ======================
export const terrains = [
  { id:"cementerio_oscuro", name:"Cementerio Oscuro", element:"Oscuridad", mana:2, type:"Terreno" },
  { id:"santuario_coral", name:"Santuario de Coral", element:"Agua", mana:2, type:"Terreno" },
  { id:"volcan_erupcion", name:"Volcán en Erupción", element:"Fuego", mana:2, type:"Terreno" },
  { id:"templo_luz", name:"Templo de la Luz", element:"Luz", mana:2, type:"Terreno" },
  { id:"altos_viento", name:"Altos del Viento", element:"Viento", mana:2, type:"Terreno" },
  { id:"red_alta_tension", name:"Red de Alta Tensión", element:"Electricidad", mana:2, type:"Terreno" },
  { id:"bosque_sagrado", name:"Bosque Sagrado", element:"Planta", mana:2, type:"Terreno" },
  { id:"valle_rocoso", name:"Valle Rocoso", element:"Tierra", mana:2, type:"Terreno" }
];

// ======================
// RITUALES (REGISTRADOS)
// ======================
export const rituals = [
  { id:"oscurecer", name:"Oscurecer", element:"Oscuridad", mana:2, rarity:"Común", type:"Ritual" },
  { id:"pacto_sombras", name:"Pacto de Sombras", element:"Oscuridad", mana:3, rarity:"Común", type:"Ritual" },
  { id:"ritual_resurreccion", name:"Ritual de Resurrección", element:"Oscuridad", mana:4, rarity:"Rara", type:"Ritual" },
  { id:"eclipse_sombras", name:"Eclipse de Sombras", element:"Oscuridad", mana:6, rarity:"Épica", type:"Ritual" },

  { id:"oleada_infinita", name:"Oleada Infinita", element:"Agua", mana:2, rarity:"Común", type:"Ritual" },
  { id:"diluvio_ancestral", name:"Diluvio Ancestral", element:"Agua", mana:6, rarity:"Épica", type:"Ritual" },

  { id:"llamarada_repentina", name:"Llamarada Repentina", element:"Fuego", mana:2, rarity:"Común", type:"Ritual" },
  { id:"meteorito_ardiente", name:"Meteorito Ardiente", element:"Fuego", mana:6, rarity:"Épica", type:"Ritual" },

  { id:"luminiscencia_eterna", name:"Luminiscencia Eterna", element:"Luz", mana:6, rarity:"Épica", type:"Ritual" }
];
