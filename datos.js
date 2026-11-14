// Ajustes principales. Puedes cambiar estos valores sin tocar la lógica.
var CONFIG = {
  ancho: 960,
  alto: 540,
  gravedad: 1000,
  velocidad: 250,
  fuerzaSalto: 440,
  multiplicadorSaltoCorto: 0.48,
  fuerzaRebote: 330,
  saltosMaximos: 2,
  vidas: 3,
  duracionInvulnerabilidad: 1300,
  velocidadTuerca: 3.5,
  limiteCaida: 140,
  profundidadMundo: 760
};

var TEXTOS = {
  titulo: "SPACE EXPLORERS",
  subtitulo: "Una aventura de Maia y Tuerca",
  historiaMenu: "Explora nuevos mundos y escucha las historias de los objetos que esperan ser encontrados.",
  iniciar: "Comenzar aventura",
  instrucciones: "Mover: ← → o A / D     Saltar: ↑, W o ESPACIO (doble salto)",
  estrellas: "Estrellas de eco",
  rescate: "¡Tuerca te rescató! Volvamos al último lugar seguro.",
  continuar: "Pulsa ESPACIO o toca para continuar",
  ecoRecuperado: "¡Eco recuperado!",
  nivelCompletado: "Gracias por escuchar su historia.",
  estrellasNivel: "Estrellas de eco en este nivel",
  estrellasTotales: "Estrellas de eco reunidas",
  siguienteNivel: "Siguiente nivel",
  aventuraCompleta: "¡Exploración completada!",
  volverMenu: "Volver al menú",
  bateria: "Baterías",
  pausaDialogo: ""
};

var COLORES_DIALOGO = {
  Maia: "#ffd166",
  Tuerca: "#7ce7e1",
  Narrador: "#ffffff",
  Objeto: "#d8c8ff"
};

var DIALOGOS = {
  bienvenida: [
    { quien: "Maia", texto: "Hola, soy Maia. Hoy vamos a explorar y escuchar con atención." },
    { quien: "Tuerca", texto: "¡Bip! A veces algo parece olvidado, pero todavía tiene una historia." }
  ],
  luna: [
    { quien: "Maia", texto: "La Luna está tan silenciosa... ¿qué habrá quedado por aquí?" },
    { quien: "Tuerca", texto: "Mis sensores encontraron un eco. ¡Vamos a buscarlo!" }
  ],
  moduloLunar: [
    { quien: "Maia", texto: "Un módulo lunar. Ayudó a las personas a explorar la Luna." },
    { quien: "Objeto", texto: "Aunque mi viaje terminó hace mucho, todavía puedo contar lo que aprendimos." },
    { quien: "Tuerca", texto: "No estabas dejado atrás. ¡Tu historia llegó hasta nosotros!" }
  ],
  marte: [
    { quien: "Maia", texto: "¡Marte! Cada piedra parece guardar una pista." },
    { quien: "Tuerca", texto: "Busquemos con cuidado. Los ecos se escuchan mejor cuando cooperamos." }
  ],
  sondaMarciana: [
    { quien: "Maia", texto: "Esta sonda recorrió Marte y nos envió muchísima información." },
    { quien: "Objeto", texto: "Mis ruedas dejaron huellas, y mis señales acercaron un mundo lejano." },
    { quien: "Tuerca", texto: "Tu viaje sigue en cada persona que aprende de ti." }
  ],
  espacio: [
    { quien: "Maia", texto: "El espacio profundo es enorme, pero no estamos solos." },
    { quien: "Tuerca", texto: "¡Detecto un eco brillante! Vamos juntos." }
  ],
  antenaEspacial: [
    { quien: "Maia", texto: "Una antena espacial: escuchaba señales desde muy, muy lejos." },
    { quien: "Objeto", texto: "Mis mensajes viajaron por la oscuridad para ayudar a descubrir el universo." },
    { quien: "Tuerca", texto: "Ahora conocemos tu historia. Ningún eco se pierde cuando alguien lo escucha." }
  ]
};

// Las coordenadas indican el centro de cada plataforma, estrella, enemigo u objeto.
var NIVELES = [
  {
    nombre: "Luna",
    fondo: "fondoLuna",
    anchoMundo: 3000,
    puntoInicio: { x: 110, y: 430 },
    nombreDialogoIntroduccion: "luna",
    nombreDialogoObjeto: "moduloLunar",
    plataformas: [
      { x: 300, y: 510, ancho: 600, alto: 60, tipo: "suelo" },
      { x: 800, y: 420, ancho: 190, alto: 28, tipo: "plataforma" },
      { x: 1170, y: 490, ancho: 360, alto: 60, tipo: "suelo" },
      { x: 1530, y: 410, ancho: 230, alto: 28, tipo: "plataforma" },
      { x: 1970, y: 510, ancho: 520, alto: 60, tipo: "suelo" },
      { x: 2370, y: 420, ancho: 220, alto: 28, tipo: "plataforma" },
      { x: 2780, y: 490, ancho: 440, alto: 60, tipo: "suelo" }
    ],
    enemigos: [
      { x: 500, y: 475, patrulla: { minimo: 410, maximo: 650 }, velocidad: 65 },
      { x: 2080, y: 475, patrulla: { minimo: 1980, maximo: 2210 }, velocidad: 75 }
    ],
    estrellas: [
      { x: 360, y: 435 }, { x: 800, y: 365 }, { x: 1190, y: 425 },
      { x: 1530, y: 355 }, { x: 1840, y: 420 }, { x: 2380, y: 365 },
      { x: 2710, y: 420 }
    ],
    objetoOlvidado: { x: 2890, y: 425, imagen: "objetoModuloLunar" }
  },
  {
    nombre: "Marte",
    fondo: "fondoMarte",
    anchoMundo: 3000,
    puntoInicio: { x: 110, y: 430 },
    nombreDialogoIntroduccion: "marte",
    nombreDialogoObjeto: "sondaMarciana",
    plataformas: [
      { x: 300, y: 510, ancho: 580, alto: 60, tipo: "suelo" },
      { x: 760, y: 415, ancho: 190, alto: 28, tipo: "plataforma" },
      { x: 1110, y: 490, ancho: 350, alto: 60, tipo: "suelo" },
      { x: 1490, y: 395, ancho: 230, alto: 28, tipo: "plataforma" },
      { x: 1900, y: 500, ancho: 480, alto: 60, tipo: "suelo" },
      { x: 2320, y: 405, ancho: 220, alto: 28, tipo: "plataforma" },
      { x: 2740, y: 490, ancho: 480, alto: 60, tipo: "suelo" }
    ],
    enemigos: [
      { x: 430, y: 475, patrulla: { minimo: 350, maximo: 590 }, velocidad: 80 },
      { x: 1960, y: 465, patrulla: { minimo: 1820, maximo: 2070 }, velocidad: 70 }
    ],
    estrellas: [
      { x: 340, y: 435 }, { x: 760, y: 360 }, { x: 1110, y: 425 },
      { x: 1490, y: 340 }, { x: 1770, y: 410 }, { x: 2320, y: 350 },
      { x: 2670, y: 420 }
    ],
    objetoOlvidado: { x: 2870, y: 425, imagen: "objetoSondaMarciana" }
  },
  {
    nombre: "Espacio profundo",
    fondo: "fondoEspacio",
    anchoMundo: 3000,
    puntoInicio: { x: 110, y: 430 },
    nombreDialogoIntroduccion: "espacio",
    nombreDialogoObjeto: "antenaEspacial",
    plataformas: [
      { x: 300, y: 510, ancho: 580, alto: 60, tipo: "suelo" },
      { x: 760, y: 410, ancho: 190, alto: 28, tipo: "plataforma" },
      { x: 1110, y: 490, ancho: 350, alto: 60, tipo: "suelo" },
      { x: 1490, y: 385, ancho: 230, alto: 28, tipo: "plataforma" },
      { x: 1900, y: 500, ancho: 480, alto: 60, tipo: "suelo" },
      { x: 2320, y: 395, ancho: 220, alto: 28, tipo: "plataforma" },
      { x: 2740, y: 490, ancho: 480, alto: 60, tipo: "suelo" }
    ],
    enemigos: [
      { x: 480, y: 475, patrulla: { minimo: 380, maximo: 610 }, velocidad: 80 },
      { x: 2010, y: 465, patrulla: { minimo: 1870, maximo: 2110 }, velocidad: 85 }
    ],
    estrellas: [
      { x: 340, y: 435 }, { x: 760, y: 355 }, { x: 1110, y: 425 },
      { x: 1490, y: 330 }, { x: 1770, y: 410 }, { x: 2320, y: 340 },
      { x: 2670, y: 420 }
    ],
    objetoOlvidado: { x: 2870, y: 425, imagen: "objetoAntenaEspacial" }
  }
];
