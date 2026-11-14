// Esta es la única capa que dibuja imágenes. Más adelante puedes reemplazar
// cada dibujo por un archivo indicando su ruta en "archivo".
var ARTE = {
  maia: {
    archivo: null, ancho: 42, alto: 58,
    cuerpo: { ancho: 0.62, alto: 0.82, x: 0.19, y: 0.12 },
    dibujar: function (g, w, h) {
      g.fillStyle(0x202c58, 1).fillRoundedRect(w * 0.13, h * 0.08, w * 0.74, h * 0.85, 13);
      g.fillStyle(0x7ce7e1, 1).fillRoundedRect(w * 0.2, h * 0.42, w * 0.6, h * 0.48, 10);
      g.fillStyle(0xffd166, 1).fillCircle(w * 0.5, h * 0.27, w * 0.25);
      g.fillStyle(0x202c58, 1).fillCircle(w * 0.5, h * 0.27, w * 0.19);
      g.fillStyle(0xffd166, 1).fillCircle(w * 0.5, h * 0.29, w * 0.14);
      g.fillStyle(0x26345e, 1).fillRoundedRect(w * 0.28, h * 0.82, w * 0.17, h * 0.16, 4);
      g.fillRoundedRect(w * 0.55, h * 0.82, w * 0.17, h * 0.16, 4);
    }
  },
  tuerca: {
    archivo: null, ancho: 36, alto: 36,
    dibujar: function (g, w, h) {
      g.fillStyle(0x7ce7e1, 1).fillCircle(w * 0.5, h * 0.52, w * 0.4);
      g.fillStyle(0x26345e, 1).fillRoundedRect(w * 0.21, h * 0.3, w * 0.58, h * 0.38, 6);
      g.fillStyle(0xffd166, 1).fillCircle(w * 0.38, h * 0.49, 2.5);
      g.fillCircle(w * 0.62, h * 0.49, 2.5);
      g.lineStyle(2, 0x7ce7e1, 1).lineBetween(w * 0.5, h * 0.13, w * 0.5, h * 0.02);
      g.fillStyle(0xff7b9c, 1).fillCircle(w * 0.5, h * 0.02, 2.5);
    }
  },
  gris: {
    archivo: null, ancho: 38, alto: 34,
    cuerpo: { ancho: 0.82, alto: 0.8, x: 0.09, y: 0.15 },
    dibujar: function (g, w, h) {
      g.fillStyle(0xb7bed1, 1).fillCircle(w * 0.5, h * 0.55, w * 0.42);
      g.fillStyle(0xe6e9f2, 1).fillCircle(w * 0.35, h * 0.42, w * 0.14);
      g.fillStyle(0x747f9b, 1).fillCircle(w * 0.37, h * 0.53, 2.5);
      g.fillCircle(w * 0.63, h * 0.53, 2.5);
    }
  },
  estrella: {
    archivo: null, ancho: 28, alto: 28,
    dibujar: function (g, w, h) {
      g.fillStyle(0xffd166, 1);
      g.fillPoints([
        { x: w * 0.5, y: h * 0.04 }, { x: w * 0.64, y: h * 0.36 },
        { x: w * 0.98, y: h * 0.38 }, { x: w * 0.72, y: h * 0.6 },
        { x: w * 0.82, y: h * 0.96 }, { x: w * 0.5, y: h * 0.75 },
        { x: w * 0.18, y: h * 0.96 }, { x: w * 0.28, y: h * 0.6 },
        { x: w * 0.02, y: h * 0.38 }, { x: w * 0.36, y: h * 0.36 }
      ], true);
    }
  },
  bateria: {
    archivo: null, ancho: 25, alto: 30,
    dibujar: function (g, w, h) {
      g.fillStyle(0x7ce7a8, 1).fillRoundedRect(w * 0.12, h * 0.16, w * 0.76, h * 0.78, 4);
      g.fillStyle(0xd8fff0, 1).fillRoundedRect(w * 0.34, h * 0.03, w * 0.32, h * 0.14, 2);
      g.fillStyle(0x237e69, 1).fillRect(w * 0.43, h * 0.31, w * 0.14, h * 0.46);
      g.fillRect(w * 0.29, h * 0.47, w * 0.42, h * 0.14);
    }
  },
  chispa: {
    archivo: null, ancho: 22, alto: 22,
    dibujar: function (g, w, h) {
      g.fillStyle(0xff7b9c, 1);
      g.fillPoints([
        { x: w * 0.5, y: 0 }, { x: w * 0.63, y: h * 0.35 },
        { x: w, y: h * 0.5 }, { x: w * 0.63, y: h * 0.64 },
        { x: w * 0.5, y: h }, { x: w * 0.36, y: h * 0.64 },
        { x: 0, y: h * 0.5 }, { x: w * 0.36, y: h * 0.35 }
      ], true);
    }
  },
  brillo: {
    archivo: null, ancho: 48, alto: 48,
    dibujar: function (g, w, h) {
      g.fillStyle(0xffd166, 0.22).fillCircle(w / 2, h / 2, w * 0.48);
      g.fillStyle(0xfff1b8, 0.85).fillCircle(w / 2, h / 2, w * 0.22);
    }
  },
  suelo: {
    archivo: null, ancho: 128, alto: 72,
    dibujar: function (g, w, h) {
      g.fillStyle(0x343b68, 1).fillRect(0, 0, w, h);
      g.fillStyle(0x8583b2, 1).fillRect(0, 0, w, h * 0.22);
      g.fillStyle(0x59608e, 1).fillRect(0, h * 0.22, w, h * 0.12);
      g.fillStyle(0x252b51, 0.8).fillCircle(w * 0.2, h * 0.65, h * 0.1);
      g.fillCircle(w * 0.72, h * 0.48, h * 0.07);
      g.fillCircle(w * 0.86, h * 0.82, h * 0.11);
    }
  },
  plataforma: {
    archivo: null, ancho: 128, alto: 32,
    dibujar: function (g, w, h) {
      g.fillStyle(0x59608e, 1).fillRoundedRect(0, h * 0.2, w, h * 0.8, 7);
      g.fillStyle(0xb9b5dc, 1).fillRoundedRect(0, 0, w, h * 0.42, 7);
      g.fillStyle(0x7ce7e1, 0.85).fillRect(w * 0.12, h * 0.38, w * 0.76, h * 0.1);
    }
  },
  fondoLuna: {
    archivo: null, ancho: 960, alto: 540,
    dibujar: function (g, w, h) {
      g.fillStyle(0x111a3d, 1).fillRect(0, 0, w, h);
      g.fillStyle(0x202a58, 1).fillRect(0, h * 0.56, w, h * 0.44);
      g.fillStyle(0xf5f0d7, 0.9).fillCircle(w * 0.78, h * 0.2, 39);
      g.fillStyle(0x111a3d, 1).fillCircle(w * 0.8, h * 0.17, 35);
      for (var i = 0; i < 32; i += 1) {
        g.fillStyle(0xffffff, i % 3 === 0 ? 0.9 : 0.45);
        g.fillCircle((i * 137 + 41) % w, (i * 71 + 27) % (h * 0.62), i % 5 === 0 ? 2 : 1);
      }
      g.fillStyle(0x343b68, 1).fillCircle(w * 0.2, h * 0.94, 125);
      g.fillCircle(w * 0.68, h * 1.03, 175);
    }
  },
  fondoMarte: {
    archivo: null, ancho: 960, alto: 540,
    dibujar: function (g, w, h) {
      g.fillStyle(0x392548, 1).fillRect(0, 0, w, h);
      g.fillStyle(0x9a5260, 1).fillRect(0, h * 0.58, w, h * 0.42);
      g.fillStyle(0xf3bd93, 0.9).fillCircle(w * 0.76, h * 0.22, 42);
      for (var i = 0; i < 28; i += 1) {
        g.fillStyle(0xffffff, i % 4 === 0 ? 0.8 : 0.4);
        g.fillCircle((i * 113 + 23) % w, (i * 83 + 19) % (h * 0.54), 1.5);
      }
      g.fillStyle(0x6d394f, 1).fillCircle(w * 0.18, h * 0.98, 150);
      g.fillCircle(w * 0.73, h * 1.04, 195);
    }
  },
  fondoEspacio: {
    archivo: null, ancho: 960, alto: 540,
    dibujar: function (g, w, h) {
      g.fillStyle(0x090d20, 1).fillRect(0, 0, w, h);
      g.fillStyle(0x24234f, 0.52).fillCircle(w * 0.68, h * 0.34, 160);
      g.fillStyle(0x3e285c, 0.6).fillCircle(w * 0.74, h * 0.38, 104);
      for (var i = 0; i < 55; i += 1) {
        g.fillStyle(i % 5 === 0 ? 0xffd166 : 0xffffff, i % 5 === 0 ? 0.9 : 0.62);
        g.fillCircle((i * 139 + 17) % w, (i * 97 + 31) % h, i % 7 === 0 ? 2 : 1);
      }
      g.fillStyle(0x26345e, 1).fillCircle(w * 0.12, h * 1.02, 105);
    }
  },
  objetoModuloLunar: {
    archivo: null, ancho: 62, alto: 62,
    dibujar: function (g, w, h) {
      g.fillStyle(0xd7d8e8, 1).fillRoundedRect(w * 0.2, h * 0.21, w * 0.6, h * 0.56, 8);
      g.fillStyle(0xffd166, 1).fillTriangle(w * 0.2, h * 0.28, w * 0.02, h * 0.16, w * 0.02, h * 0.82);
      g.fillTriangle(w * 0.8, h * 0.28, w * 0.98, h * 0.16, w * 0.98, h * 0.82);
      g.fillStyle(0x7ce7e1, 1).fillCircle(w * 0.5, h * 0.48, w * 0.12);
      g.lineStyle(3, 0xc3c6d9, 1).lineBetween(w * 0.36, h * 0.77, w * 0.26, h * 0.98);
      g.lineBetween(w * 0.64, h * 0.77, w * 0.74, h * 0.98);
    }
  },
  objetoSondaMarciana: {
    archivo: null, ancho: 62, alto: 62,
    dibujar: function (g, w, h) {
      g.fillStyle(0xd7d8e8, 1).fillRoundedRect(w * 0.3, h * 0.3, w * 0.4, h * 0.46, 7);
      g.fillStyle(0x7ce7e1, 1).fillCircle(w * 0.5, h * 0.43, w * 0.12);
      g.fillStyle(0x9a5260, 1).fillRect(w * 0.03, h * 0.33, w * 0.25, h * 0.34);
      g.fillRect(w * 0.72, h * 0.33, w * 0.25, h * 0.34);
      g.lineStyle(3, 0xffd166, 1).lineBetween(w * 0.5, h * 0.3, w * 0.5, h * 0.1);
      g.lineBetween(w * 0.35, h * 0.76, w * 0.26, h * 0.95);
      g.lineBetween(w * 0.65, h * 0.76, w * 0.74, h * 0.95);
    }
  },
  objetoAntenaEspacial: {
    archivo: null, ancho: 62, alto: 62,
    dibujar: function (g, w, h) {
      g.lineStyle(5, 0xd7d8e8, 1).lineBetween(w * 0.5, h * 0.28, w * 0.5, h * 0.95);
      g.fillStyle(0x7ce7e1, 1).fillCircle(w * 0.5, h * 0.27, w * 0.12);
      g.lineStyle(4, 0xffd166, 1).lineBetween(w * 0.5, h * 0.3, w * 0.19, h * 0.12);
      g.lineBetween(w * 0.5, h * 0.3, w * 0.81, h * 0.12);
      g.lineBetween(w * 0.32, h * 0.95, w * 0.68, h * 0.95);
      g.fillStyle(0xff7b9c, 1).fillCircle(w * 0.19, h * 0.12, 4);
      g.fillCircle(w * 0.81, h * 0.12, 4);
    }
  },
  panel: {
    archivo: null, ancho: 840, alto: 210,
    dibujar: function (g, w, h) {
      g.fillStyle(0x090d20, 0.94).fillRoundedRect(2, 2, w - 4, h - 4, 24);
      g.lineStyle(4, 0x7ce7e1, 0.95).strokeRoundedRect(2, 2, w - 4, h - 4, 24);
    }
  },
  boton: {
    archivo: null, ancho: 300, alto: 70,
    dibujar: function (g, w, h) {
      g.fillStyle(0x202c58, 1).fillRoundedRect(2, 2, w - 4, h - 4, 20);
      g.lineStyle(3, 0xffd166, 1).strokeRoundedRect(2, 2, w - 4, h - 4, 20);
    }
  }
};

var SONIDOS = {
  salto: null,
  estrella: null,
  golpe: null,
  eco: null,
  sonar: function (escena, clave) {
    var ruta = this[clave];
    if (
      typeof ruta !== "string" ||
      !escena ||
      !escena.cache ||
      !escena.cache.audio ||
      !escena.sound ||
      !escena.cache.audio.exists(clave)
    ) {
      return;
    }
    escena.sound.play(clave);
  }
};

function aplicarArte(sprite, clave) {
  var definicion = ARTE[clave];
  if (!definicion || !sprite || !sprite.scene) {
    console.warn("No se encontró la imagen de arte:", clave);
    return;
  }

  var textura = definicion.archivo && sprite.scene.textures.exists("archivo-" + clave)
    ? "archivo-" + clave
    : "arte-" + clave;

  sprite.setTexture(textura);
  if (arguments.length < 3 || !arguments[2]) {
    sprite.setDisplaySize(definicion.ancho, definicion.alto);
  }

  if (sprite.body && definicion.cuerpo) {
    var escalaX = sprite.scaleX || 1;
    var escalaY = sprite.scaleY || 1;
    sprite.body.setSize(
      definicion.ancho * definicion.cuerpo.ancho / escalaX,
      definicion.alto * definicion.cuerpo.alto / escalaY
    );
    sprite.body.setOffset(
      definicion.ancho * definicion.cuerpo.x / escalaX,
      definicion.alto * definicion.cuerpo.y / escalaY
    );
  }
}

function crearImagenArte(escena, x, y, clave) {
  var imagen = escena.add.image(x, y, "arte-" + clave);
  aplicarArte(imagen, clave);
  return imagen;
}
