// ===================================================
// CRIATURAS – TODOS LOS REINOS
// ===================================================

export const creatures = [

  // ================= OSCURIDAD =================
  { id:"espectro_menor", name:"Espectro Menor", element:"Oscuridad", stars:1, atk:5, def:4, mana:1, class:"Sombra" },
  { id:"aprendiz_necromancer", name:"Aprendiz Necromancer", element:"Oscuridad", stars:2, atk:7, def:8, mana:2, class:"Mago" },
  { id:"espectro_errante", name:"Espectro Errante", element:"Oscuridad", stars:3, atk:11, def:12, mana:3, class:"Sombra" },
  { id:"caballero_no_muerto", name:"Caballero No-Muerto", element:"Oscuridad", stars:4, atk:15, def:17, mana:4, class:"Sombra" },
  { id:"chaman_sombras", name:"Chamán de las Sombras", element:"Oscuridad", stars:5, atk:19, def:20, mana:5, class:"Mago" },
  { id:"senor_espectral", name:"Señor Espectral", element:"Oscuridad", stars:6, atk:24, def:25, mana:6, class:"Sombra" },
  { id:"dragon_noche_eterna", name:"Dragón de la Noche Eterna", element:"Oscuridad", stars:7, atk:30, def:30, mana:7, class:"Dragón", legendary:true },
  { id:"kael_senor_sombras", name:"Kael, Señor de las Sombras", element:"Oscuridad", stars:8, atk:36, def:38, mana:8, class:"Sombra", legendary:true },

  // ================= AGUA =================
  { id:"naiade_curiosa", name:"Naiade Curiosa", element:"Agua", stars:1, atk:5, def:5, mana:1, class:"Bestia" },
  { id:"guardian_mareas", name:"Guardián de las Mareas", element:"Agua", stars:2, atk:8, def:9, mana:2, class:"Guerrero" },
  { id:"sirena_eco_azul", name:"Sirena del Eco Azul", element:"Agua", stars:3, atk:11, def:11, mana:3, class:"Bestia" },
  { id:"caballo_agua", name:"Caballo de Agua", element:"Agua", stars:4, atk:15, def:16, mana:4, class:"Bestia" },
  { id:"chaman_corriente", name:"Chamán de la Corriente", element:"Agua", stars:5, atk:19, def:20, mana:5, class:"Mago" },
  { id:"tortuga_abisal", name:"Tortuga Abisal", element:"Agua", stars:6, atk:23, def:26, mana:6, class:"Bestia" },
  { id:"leviatan_horizonte", name:"Leviatán del Horizonte", element:"Agua", stars:7, atk:30, def:30, mana:7, class:"Dragón", legendary:true },
  { id:"aqualis_reina", name:"Aqualis, Reina de las Profundidades", element:"Agua", stars:8, atk:35, def:37, mana:8, class:"Mago", legendary:true },

  // ================= FUEGO =================
  { id:"salamandra_ignea", name:"Salamandra Ígnea", element:"Fuego", stars:1, atk:6, def:4, mana:1, class:"Bestia" },
  { id:"guerrero_brasas", name:"Guerrero de las Brasas", element:"Fuego", stars:2, atk:9, def:7, mana:2, class:"Guerrero" },
  { id:"mago_llama_viva", name:"Mago de la Llama Viva", element:"Fuego", stars:3, atk:12, def:10, mana:3, class:"Mago" },
  { id:"fenix_menor", name:"Ave Fénix Menor", element:"Fuego", stars:4, atk:16, def:14, mana:4, class:"Bestia" },
  { id:"gigante_magma", name:"Gigante de Magma", element:"Fuego", stars:5, atk:21, def:17, mana:5, class:"Bestia" },
  { id:"dragon_carmesi", name:"Dragón Carmesí", element:"Fuego", stars:6, atk:26, def:22, mana:6, class:"Dragón" },
  { id:"titan_solar", name:"Titán Solar", element:"Fuego", stars:7, atk:32, def:28, mana:7, class:"Bestia", legendary:true },
  { id:"ignis_senor_llamas", name:"Ignis, Señor de las Llamas Eternas", element:"Fuego", stars:8, atk:38, def:34, mana:8, class:"Mago", legendary:true },

  // ================= LUZ =================
  { id:"aprendiz_radiante", name:"Aprendiz Radiante", element:"Luz", stars:1, atk:4, def:6, mana:1, class:"Guerrero" },
  { id:"guardian_solar", name:"Guardián Solar", element:"Luz", stars:2, atk:7, def:9, mana:2, class:"Guerrero" },
  { id:"clerigo_alba", name:"Clérigo del Alba", element:"Luz", stars:3, atk:10, def:12, mana:3, class:"Mago" },
  { id:"pegaso_celestial", name:"Pegaso Celestial", element:"Luz", stars:4, atk:14, def:16, mana:4, class:"Bestia" },
  { id:"paladin_luminar", name:"Paladín Luminar", element:"Luz", stars:5, atk:18, def:21, mana:5, class:"Guerrero" },
  { id:"centinela_radiante", name:"Centinela Radiante", element:"Luz", stars:6, atk:23, def:26, mana:6, class:"Eterno" },
  { id:"heraldo_amanecer", name:"Heraldo del Amanecer", element:"Luz", stars:7, atk:29, def:32, mana:7, class:"Eterno", legendary:true },
  { id:"solarius_emperador", name:"Solarius, Emperador Radiante", element:"Luz", stars:8, atk:34, def:38, mana:8, class:"Eterno", legendary:true },

  // ================= VIENTO =================
  { id:"espiritu_errante_viento", name:"Espíritu Errante", element:"Viento", stars:1, atk:6, def:4, mana:1, class:"Espíritu" },
  { id:"halcon_cumbres", name:"Halcón de las Cumbres", element:"Viento", stars:2, atk:9, def:7, mana:2, class:"Bestia" },
  { id:"jinete_viento", name:"Jinete del Viento", element:"Viento", stars:3, atk:12, def:10, mana:3, class:"Guerrero" },
  { id:"espiritu_tormenta", name:"Espíritu de Tormenta", element:"Viento", stars:4, atk:16, def:13, mana:4, class:"Espíritu" },
  { id:"maga_aeromante", name:"Maga Aeromante", element:"Viento", stars:5, atk:20, def:17, mana:5, class:"Mago" },
  { id:"dragon_celeste", name:"Dragón Celeste", element:"Viento", stars:6, atk:25, def:22, mana:6, class:"Dragón" },
  { id:"tempestia_reina", name:"Tempestia, Reina del Aire", element:"Viento", stars:7, atk:31, def:28, mana:7, class:"Espíritu", legendary:true },
  { id:"zephyrus_senor", name:"Zephyrus, Señor del Cielo", element:"Viento", stars:8, atk:37, def:33, mana:8, class:"Mago", legendary:true },

  // ================= ELECTRICIDAD =================
  { id:"pulso_erratico", name:"Pulso Errático", element:"Electricidad", stars:1, atk:6, def:4, mana:1, class:"Electricidad" },
  { id:"serpiente_voltaica", name:"Serpiente Voltaica", element:"Electricidad", stars:2, atk:9, def:7, mana:2, class:"Electricidad" },
  { id:"guerrero_electro", name:"Guerrero Electromagnético", element:"Electricidad", stars:3, atk:12, def:10, mana:3, class:"Electricidad" },
  { id:"aguila_relampago", name:"Águila Relámpago", element:"Electricidad", stars:4, atk:16, def:13, mana:4, class:"Electricidad" },
  { id:"golem_plasma", name:"Gólem de Plasma", element:"Electricidad", stars:5, atk:21, def:17, mana:5, class:"Electricidad" },
  { id:"titan_trueno", name:"Titán de Trueno", element:"Electricidad", stars:6, atk:26, def:22, mana:6, class:"Electricidad" },
  { id:"dragon_tempestad", name:"Dragón Tempestad", element:"Electricidad", stars:7, atk:32, def:28, mana:7, class:"Electricidad", legendary:true },
  { id:"coloso_electrico", name:"Coloso Eléctrico", element:"Electricidad", stars:8, atk:38, def:33, mana:8, class:"Electricidad", legendary:true },

  // ================= PLANTA =================
  { id:"semilla_errante", name:"Semilla Errante", element:"Planta", stars:1, atk:4, def:6, mana:1, class:"Planta" },
  { id:"brote_guardian", name:"Brote Guardián", element:"Planta", stars:2, atk:7, def:9, mana:2, class:"Planta" },
  { id:"guerrero_espinas", name:"Guerrero de Espinas", element:"Planta", stars:3, atk:10, def:12, mana:3, class:"Guerrero" },
  { id:"arbol_ancestral", name:"Árbol Ancestral", element:"Planta", stars:4, atk:14, def:17, mana:4, class:"Planta" },
  { id:"druida_verde", name:"Druida Verde", element:"Planta", stars:5, atk:18, def:22, mana:5, class:"Mago" },
  { id:"ent_colosal", name:"Ent Colosal", element:"Planta", stars:6, atk:22, def:27, mana:6, class:"Bestia" },
  { id:"reina_flores", name:"Reina de las Flores", element:"Planta", stars:7, atk:28, def:33, mana:7, class:"Planta", legendary:true },
  { id:"coloso_raices", name:"Coloso de Raíces", element:"Planta", stars:8, atk:33, def:39, mana:8, class:"Planta", legendary:true },

  // ================= TIERRA =================
  { id:"golem_roca", name:"Gólem de Roca Menor", element:"Tierra", stars:1, atk:4, def:6, mana:1, class:"Bestia" },
  { id:"armadillo_valle", name:"Armadillo del Valle", element:"Tierra", stars:2, atk:7, def:9, mana:2, class:"Bestia" },
  { id:"guerrero_granito", name:"Guerrero de Granito", element:"Tierra", stars:3, atk:10, def:13, mana:3, class:"Guerrero" },
  { id:"guardian_canon", name:"Guardián del Cañón", element:"Tierra", stars:4, atk:14, def:18, mana:4, class:"Guerrero" },
  { id:"druida_tierra", name:"Druida de la Tierra", element:"Tierra", stars:5, atk:18, def:23, mana:5, class:"Mago" },
  { id:"coloso_montana", name:"Coloso de Montaña", element:"Tierra", stars:6, atk:22, def:28, mana:6, class:"Bestia" },
  { id:"titan_cordillera", name:"Titán de la Cordillera", element:"Tierra", stars:7, atk:27, def:34, mana:7, class:"Bestia", legendary:true },
  { id:"gaia_madre", name:"Gaia, Madre de la Tierra", element:"Tierra", stars:8, atk:32, def:40, mana:8, class:"Mago", legendary:true }

];

// ===================================================
// TERRENOS – CERRADOS
// ===================================================

export const terrains = [

  {
    id:"cementerio_oscuro",
    name:"Cementerio Oscuro",
    affects:{ class:"Sombra" },
    bonus:{ atk:0, def:2 },
    textEffect:"Tus criaturas Sombra ganan +2 DEF mientras este terreno esté activo. Una vez por turno, puedes descartar 1 carta para recuperar +1 maná."
  },
  {
    id:"santuario_coral",
    name:"Santuario de Coral",
    affects:{ element:"Agua" },
    bonus:{ atk:2, def:0 },
    textEffect:"Tus criaturas de Agua ganan +2 ATK mientras esté activo. La primera criatura de Agua que invoques cada turno gana +1 DEF permanente."
  },
  {
    id:"volcan_erupcion",
    name:"Volcán en Erupción",
    affects:{ element:"Fuego" },
    bonus:{ atk:2, def:0 },
    textEffect:"Tus criaturas de Fuego ganan +2 ATK mientras esté activo. Cuando una criatura de Fuego destruya una criatura enemiga, inflige 1 daño directo al rival (máx. 2 veces por turno)."
  },
  {
    id:"templo_luz",
    name:"Templo de la Luz",
    affects:{ element:"Luz" },
    bonus:{ atk:0, def:2 },
    textEffect:"Tus criaturas de Luz ganan +2 DEF mientras esté activo. Una vez por turno, puedes curar 1 punto de vida."
  },
  {
    id:"altos_viento",
    name:"Altos del Viento",
    affects:{ element:"Viento" },
    bonus:{ atk:1, def:0 },
    textEffect:"Tus criaturas de Viento pueden atacar el turno en que son invocadas y ganan +1 ATK mientras este terreno esté activo."
  },
  {
    id:"red_alta_tension",
    name:"Red de Alta Tensión",
    affects:{ element:"Electricidad" },
    bonus:{ atk:0, def:0 },
    textEffect:"Tus criaturas de Electricidad pueden atacar el turno en que son invocadas. Cada vez que destruyas una criatura enemiga, infliges 2 de daño directo al rival mientras este terreno esté activo."
  },
  {
    id:"bosque_sagrado",
    name:"Bosque Sagrado",
    affects:{ element:"Planta" },
    bonus:{ atk:0, def:2 },
    textEffect:"Tus criaturas de Planta ganan +2 DEF mientras esté activo. La primera criatura de Planta que invoques cada turno gana +1 ATK permanente."
  },
  {
    id:"valle_rocoso",
    name:"Valle Rocoso",
    affects:{ element:"Tierra" },
    bonus:{ atk:0, def:2 },
    textEffect:"Tus criaturas de Tierra ganan +2 DEF mientras esté activo. La primera vez que una criatura de Tierra fuese a recibir daño cada turno, reduce ese daño en 2."
  }

];
