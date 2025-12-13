// ===================================================
// CRIATURAS – TODOS LOS REINOS (COMPLETO)
// ===================================================

export const creatures = [

  // ================= OSCURIDAD =================
  { id:"espectro_menor", name:"Espectro Menor", element:"Oscuridad", stars:1, atk:5, def:4, mana:1, class:"Sombra" },
  { id:"aprendiz_necromancer", name:"Aprendiz Necromancer", element:"Oscuridad", stars:2, atk:7, def:8, mana:2, class:"Mago" },
  { id:"espectro_errante", name:"Espectro Errante", element:"Oscuridad", stars:3, atk:11, def:12, mana:3, class:"Sombra" },
  { id:"caballero_no_muerto", name:"Caballero No-Muerto", element:"Oscuridad", stars:4, atk:15, def:17, mana:4, class:"Sombra" },
  { id:"chaman_sombras", name:"Chamán de las Sombras", element:"Oscuridad", stars:5, atk:19, def:20, mana:5, class:"Mago" },
  { id:"senor_espectral", name:"Señor Espectral", element:"Oscuridad", stars:6, atk:24, def:25, mana:6, class:"Sombra" },

  {
    id:"dragon-noche-eterna",
    name:"Dragón de la Noche Eterna",
    element:"Oscuridad",
    class:"Dragón",
    stars:7, atk:30, def:30, mana:7,
    legendary:true,
    textEffect:`
La primera vez por turno que sería destruido, no lo es.

Al ser destruido, crea una Sombra 0/4
(+2 ATK si controlas a Kael).
`
  },
  {
    id:"kael-senor-sombras",
    name:"Kael, Señor de las Sombras",
    element:"Oscuridad",
    class:"Sombra",
    stars:8, atk:36, def:38, mana:8,
    legendary:true,
    textEffect:`
Tus Sombras ganan +1 ATK.

Una vez por turno, cuando una criatura Sombra vaya al Cementerio:
Kael gana +1 ATK permanente.

Una vez por turno, puedes revivir 1 criatura Sombra
de hasta 4 estrellas pagando 2 maná.
No puede atacar ese turno.
`,
    passiveBonus:{ affects:{ class:"Sombra" }, bonus:{ atk:1, def:0 } }
  },

  // ================= AGUA =================
  { id:"naiade_curiosa", name:"Naiade Curiosa", element:"Agua", stars:1, atk:5, def:5, mana:1, class:"Bestia" },
  { id:"guardian_mareas", name:"Guardián de las Mareas", element:"Agua", stars:2, atk:8, def:9, mana:2, class:"Guerrero" },
  { id:"sirena_eco_azul", name:"Sirena del Eco Azul", element:"Agua", stars:3, atk:11, def:11, mana:3, class:"Bestia" },
  { id:"caballo_agua", name:"Caballo de Agua", element:"Agua", stars:4, atk:15, def:16, mana:4, class:"Bestia" },
  { id:"chaman_corriente", name:"Chamán de la Corriente", element:"Agua", stars:5, atk:19, def:20, mana:5, class:"Mago" },
  { id:"tortuga_abisal", name:"Tortuga Abisal", element:"Agua", stars:6, atk:23, def:26, mana:6, class:"Bestia" },

  {
    id:"leviatan-horizonte",
    name:"Leviatán del Horizonte",
    element:"Agua",
    class:"Dragón",
    stars:7, atk:30, def:30, mana:7,
    legendary:true,
    textEffect:`
Al atacar:
La criatura defensora pierde -2 DEF este turno.

Si destruye una criatura, roba 1 carta.
`
  },
  {
    id:"aqualis-reina-profundidades",
    name:"Aqualis, Reina de las Profundidades",
    element:"Agua",
    class:"Mago",
    stars:8, atk:35, def:37, mana:8,
    legendary:true,
    textEffect:`
Tus criaturas de Agua ganan +1 DEF.

Durante tu turno,
puedes cambiar una criatura a DEF.
`,
    passiveBonus:{ affects:{ element:"Agua" }, bonus:{ atk:0, def:1 } }
  },

  // ================= FUEGO =================
  { id:"salamandra_ignea", name:"Salamandra Ígnea", element:"Fuego", stars:1, atk:6, def:4, mana:1, class:"Bestia" },
  { id:"guerrero_brasas", name:"Guerrero de las Brasas", element:"Fuego", stars:2, atk:9, def:7, mana:2, class:"Guerrero" },
  { id:"mago_llama_viva", name:"Mago de la Llama Viva", element:"Fuego", stars:3, atk:12, def:10, mana:3, class:"Mago" },
  { id:"fenix_menor", name:"Ave Fénix Menor", element:"Fuego", stars:4, atk:16, def:14, mana:4, class:"Bestia" },
  { id:"gigante_magma", name:"Gigante de Magma", element:"Fuego", stars:5, atk:21, def:17, mana:5, class:"Bestia" },
  { id:"dragon_carmesi", name:"Dragón Carmesí", element:"Fuego", stars:6, atk:26, def:22, mana:6, class:"Dragón" },

  {
    id:"titan-solar",
    name:"Titán Solar",
    element:"Fuego",
    class:"Bestia",
    stars:7, atk:32, def:28, mana:7,
    legendary:true,
    textEffect:`
Al atacar:
Inflige 1 daño directo al rival.

Si destruye una criatura,
inflige 1 daño adicional.
`
  },
  {
    id:"ignis-llamas-eternas",
    name:"Ignis, Señor de las Llamas Eternas",
    element:"Fuego",
    class:"Mago",
    stars:8, atk:38, def:34, mana:8,
    legendary:true,
    textEffect:`
Tus criaturas de Fuego ganan +1 ATK.

Una vez por turno:
Si una criatura enemiga fue destruida,
inflige 2 de daño al rival.
`,
    passiveBonus:{ affects:{ element:"Fuego" }, bonus:{ atk:1, def:0 } }
  },

  // ================= LUZ =================
  { id:"aprendiz_radiante", name:"Aprendiz Radiante", element:"Luz", stars:1, atk:4, def:6, mana:1, class:"Guerrero" },
  { id:"guardian_solar", name:"Guardián Solar", element:"Luz", stars:2, atk:7, def:9, mana:2, class:"Guerrero" },
  { id:"clerigo_alba", name:"Clérigo del Alba", element:"Luz", stars:3, atk:10, def:12, mana:3, class:"Mago" },
  { id:"pegaso_celestial", name:"Pegaso Celestial", element:"Luz", stars:4, atk:14, def:16, mana:4, class:"Bestia" },
  { id:"paladin_luminar", name:"Paladín Luminar", element:"Luz", stars:5, atk:18, def:21, mana:5, class:"Guerrero" },
  { id:"centinela_radiante", name:"Centinela Radiante", element:"Luz", stars:6, atk:23, def:26, mana:6, class:"Eterno" },

  {
    id:"heraldo-amanecer",
    name:"Heraldo del Amanecer",
    element:"Luz",
    class:"Eterno",
    stars:7, atk:29, def:32, mana:7,
    legendary:true,
    textEffect:`
Al entrar:
Una criatura propia gana +3 DEF permanente.

La primera vez por turno
que una criatura propia sería destruida,
no lo es.
`
  },
  {
    id:"solarius-emperador-radiante",
    name:"Solarius, Emperador Radiante",
    element:"Luz",
    class:"Eterno",
    stars:8, atk:34, def:38, mana:8,
    legendary:true,
    textEffect:`
Tus criaturas de Luz ganan +1 DEF.

Una vez por turno,
cuando recibas daño directo,
reduce ese daño en 1.
`,
    passiveBonus:{ affects:{ element:"Luz" }, bonus:{ atk:0, def:1 } }
  }

];

// ===================================================
// TERRENOS – COMPLETOS
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
    textEffect:"Tus criaturas de Fuego ganan +2 ATK mientras esté activo. Cuando una criatura de Fuego destruya una criatura enemiga, inflige 1 daño directo al rival (máx. 2 por turno)."
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
    textEffect:"Tus criaturas de Viento pueden atacar el turno en que son invocadas. Tus criaturas de Viento ganan +1 ATK mientras este terreno esté activo."
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


