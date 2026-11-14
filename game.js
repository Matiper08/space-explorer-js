// Las escenas ordenan la carga, el menú y la aventura. La lógica del juego vive aquí.
class Precarga extends Phaser.Scene {
  constructor() {
    super("Precarga");
  }

  preload() {
    Object.keys(ARTE).forEach(function (clave) {
      var definicion = ARTE[clave];
      var dibujo = this.make.graphics({ x: 0, y: 0, add: false });
      definicion.dibujar(dibujo, definicion.ancho, definicion.alto);
      dibujo.generateTexture("arte-" + clave, definicion.ancho, definicion.alto);
      dibujo.destroy();

      if (definicion.archivo) {
        this.load.image("archivo-" + clave, definicion.archivo);
      }
    }, this);

    this.load.on("loaderror", function (archivo) {
      console.warn("No se pudo cargar " + archivo.src + "; se usará el dibujo provisorio.");
    });
  }

  create() {
    this.scene.start("Menu");
  }
}

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    var fondo = crearImagenArte(this, CONFIG.ancho / 2, CONFIG.alto / 2, "fondoEspacio");
    fondo.setDisplaySize(CONFIG.ancho, CONFIG.alto);

    var brillo = crearImagenArte(this, 745, 172, "brillo").setAlpha(0.7);
    brillo.setScale(2.2);
    crearImagenArte(this, 745, 165, "tuerca").setScale(2.2);
    crearImagenArte(this, 190, 426, "maia").setScale(1.55);

    this.add.text(CONFIG.ancho / 2, 95, TEXTOS.titulo, {
      fontFamily: "Arial, sans-serif",
      fontSize: "48px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(CONFIG.ancho / 2, 155, TEXTOS.subtitulo, {
      fontFamily: "Arial, sans-serif",
      fontSize: "24px",
      color: "#7ce7e1"
    }).setOrigin(0.5);

    this.add.text(CONFIG.ancho / 2, 247, TEXTOS.historiaMenu, {
      fontFamily: "Arial, sans-serif",
      fontSize: "20px",
      color: "#ffffff",
      align: "center",
      wordWrap: { width: 650 }
    }).setOrigin(0.5);

    var boton = crearImagenArte(this, CONFIG.ancho / 2, 340, "boton");
    this.add.text(CONFIG.ancho / 2, 340, TEXTOS.iniciar, {
      fontFamily: "Arial, sans-serif",
      fontSize: "24px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(CONFIG.ancho / 2, 424, TEXTOS.instrucciones, {
      fontFamily: "Arial, sans-serif",
      fontSize: "17px",
      color: "#d8c8ff",
      align: "center"
    }).setOrigin(0.5);

    var comenzar = function () {
      this.scene.start("Juego", { indiceNivel: 0, estrellasTotales: 0 });
    };
    this.time.delayedCall(150, function () {
      boton.setInteractive({ useHandCursor: true });
      boton.on("pointerdown", comenzar, this);
      this.input.keyboard.once("keydown-SPACE", comenzar, this);
      this.input.keyboard.once("keydown-ENTER", comenzar, this);
    }, [], this);
  }
}

class CajaDialogo {
  constructor(escena) {
    this.escena = escena;
    this.lineas = [];
    this.indice = 0;
    this.alTerminar = null;
    this.visible = false;
    this.eventoEntrada = null;
    this.escuchando = false;

    this.panel = crearImagenArte(escena, CONFIG.ancho / 2, CONFIG.alto - 118, "panel");
    this.panel.setDisplaySize(860, 200).setScrollFactor(0).setDepth(1000);
    this.nombre = escena.add.text(90, CONFIG.alto - 195, "", {
      fontFamily: "Arial, sans-serif",
      fontSize: "21px",
      fontStyle: "bold",
      color: "#ffd166"
    }).setScrollFactor(0).setDepth(1001);
    this.texto = escena.add.text(90, CONFIG.alto - 158, "", {
      fontFamily: "Arial, sans-serif",
      fontSize: "22px",
      color: "#ffffff",
      wordWrap: { width: 770 },
      lineSpacing: 7
    }).setScrollFactor(0).setDepth(1001);
    this.indicacion = escena.add.text(CONFIG.ancho - 85, CONFIG.alto - 48, TEXTOS.continuar, {
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      color: "#b9c1db"
    }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(1001);

    this.ocultar();
  }

  mostrar(nombre, alTerminar) {
    this.lineas = DIALOGOS[nombre] || [];
    if (this.lineas.length === 0) {
      console.warn("No hay diálogo configurado con el nombre:", nombre);
      if (alTerminar) alTerminar();
      return;
    }

    this.indice = 0;
    this.alTerminar = alTerminar;
    this.visible = true;
    this.panel.setVisible(true);
    this.nombre.setVisible(true);
    this.texto.setVisible(true);
    this.indicacion.setVisible(true);
    this.eventoEntrada = this.escena.time.delayedCall(150, function () {
      if (!this.visible) return;
      this.escena.input.keyboard.on("keydown", this.manejarTecla, this);
      this.escena.input.on("pointerdown", this.avanzar, this);
      this.escuchando = true;
    }, [], this);
    this.mostrarLinea();
  }

  mostrarLinea() {
    var linea = this.lineas[this.indice];
    this.nombre.setText(linea.quien);
    this.nombre.setColor(COLORES_DIALOGO[linea.quien] || "#ffffff");
    this.texto.setText(linea.texto);
  }

  manejarTecla(evento) {
    if (evento.repeat) return;
    if (evento.code === "Space" || evento.code === "Enter" || evento.code === "ArrowDown") {
      this.avanzar();
    }
  }

  avanzar() {
    if (!this.visible) return;
    this.indice += 1;
    if (this.indice < this.lineas.length) {
      this.mostrarLinea();
      return;
    }

    var alTerminar = this.alTerminar;
    this.ocultar();
    if (alTerminar) alTerminar();
  }

  ocultar() {
    this.visible = false;
    this.panel.setVisible(false);
    this.nombre.setVisible(false);
    this.texto.setVisible(false);
    this.indicacion.setVisible(false);
    if (this.eventoEntrada) {
      this.eventoEntrada.remove(false);
      this.eventoEntrada = null;
    }
    if (this.escuchando) {
      this.escena.input.keyboard.off("keydown", this.manejarTecla, this);
      this.escena.input.off("pointerdown", this.avanzar, this);
      this.escuchando = false;
    }
  }
}

class Juego extends Phaser.Scene {
  constructor() {
    super("Juego");
    this.teclasSalto = [];
    this.invulnerableHasta = 0;
    this.indiceNivel = 0;
    this.estrellasTotales = 0;
    this.estrellasNivel = 0;
    this.vidas = CONFIG.vidas;
    this.bloqueado = false;
  }

  create(datosInicio) {
    this.indiceNivel = datosInicio.indiceNivel || 0;
    this.estrellasTotales = datosInicio.estrellasTotales || 0;
    this.nivel = NIVELES[this.indiceNivel];
    this.estrellasNivel = 0;
    this.vidas = CONFIG.vidas;
    this.bloqueado = false;
    this.invulnerableHasta = 0;
    this.direccion = 1;
    this.puntoSeguro = { x: this.nivel.puntoInicio.x, y: this.nivel.puntoInicio.y };

    this.physics.world.setBounds(0, 0, this.nivel.anchoMundo, CONFIG.profundidadMundo);
    this.fondo = this.add.tileSprite(0, 0, this.nivel.anchoMundo, CONFIG.alto, "arte-" + this.nivel.fondo);
    aplicarArte(this.fondo, this.nivel.fondo, true);
    this.fondo.setOrigin(0).setDepth(-100);

    this.plataformas = this.physics.add.staticGroup();
    this.nivel.plataformas.forEach(this.crearPlataforma, this);

    this.jugador = this.physics.add.sprite(
      this.nivel.puntoInicio.x,
      this.nivel.puntoInicio.y,
      "arte-maia"
    );
    aplicarArte(this.jugador, "maia");
    this.jugador.setCollideWorldBounds(false);
    this.physics.add.collider(this.jugador, this.plataformas);

    this.companero = crearImagenArte(this, this.jugador.x - 55, this.jugador.y - 22, "tuerca");
    this.companero.setDepth(5);

    this.crearEnemigos();
    this.crearEstrellas();
    this.crearObjeto();
    this.crearControles();
    this.crearInterfaz();

    this.cajaDialogo = new CajaDialogo(this);
    this.camara = this.cameras.main;
    this.camara.setBounds(0, 0, this.nivel.anchoMundo, CONFIG.alto);
    this.camara.startFollow(this.jugador, true, 0.1, 0.1);
    this.camara.setDeadzone(300, 0);

    this.cajaDialogo.mostrar(this.nivel.nombreDialogoIntroduccion, function () {
      this.bloqueado = false;
    }.bind(this));
    this.bloqueado = true;
  }

  crearPlataforma(datos) {
    var clave = datos.tipo === "suelo" ? "suelo" : "plataforma";
    var plataforma = this.plataformas.create(datos.x, datos.y, "arte-" + clave);
    aplicarArte(plataforma, clave);
    plataforma.setDisplaySize(datos.ancho, datos.alto);
    plataforma.refreshBody();
  }

  crearEnemigos() {
    this.enemigos = this.physics.add.group();
    this.nivel.enemigos.forEach(function (datos) {
      var enemigo = this.enemigos.create(datos.x, datos.y, "arte-gris");
      aplicarArte(enemigo, "gris");
      enemigo.setCollideWorldBounds(true);
      enemigo.setBounce(0);
      enemigo.datosPatrulla = datos.patrulla;
      enemigo.velocidadPatrulla = datos.velocidad;
      enemigo.setVelocityX(datos.velocidad);
      this.physics.add.collider(enemigo, this.plataformas);
    }, this);
    this.physics.add.overlap(this.jugador, this.enemigos, this.alTocarGris, null, this);
  }

  crearEstrellas() {
    this.estrellas = this.physics.add.group({ allowGravity: false, immovable: true });
    this.nivel.estrellas.forEach(function (datos) {
      var estrella = this.estrellas.create(datos.x, datos.y, "arte-estrella");
      aplicarArte(estrella, "estrella");
      estrella.body.setAllowGravity(false);
      estrella.body.setImmovable(true);
      estrella.yInicial = estrella.y;
    }, this);
    this.physics.add.overlap(this.jugador, this.estrellas, this.recogerEstrella, null, this);
  }

  crearObjeto() {
    var datos = this.nivel.objetoOlvidado;
    this.objeto = this.physics.add.staticImage(datos.x, datos.y, "arte-" + datos.imagen);
    aplicarArte(this.objeto, datos.imagen);
    this.objeto.refreshBody();
    this.physics.add.overlap(this.jugador, this.objeto, this.terminarNivel, null, this);
  }

  crearControles() {
    this.teclado = this.input.keyboard;
    this.cursores = this.teclado.createCursorKeys();
    this.teclas = this.teclado.addKeys("A,D,W");
    this.teclasSalto = [this.cursores.up, this.teclas.W, this.cursores.space];
    this.teclado.on("keyup", this.soltarSalto, this);
    this.saltosUsados = 0;
  }

  crearInterfaz() {
    this.contadorTexto = this.add.text(22, 18, "", {
      fontFamily: "Arial, sans-serif",
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setScrollFactor(0).setDepth(100);

    this.bateriasTexto = this.add.text(730, 27, TEXTOS.bateria, {
      fontFamily: "Arial, sans-serif",
      fontSize: "15px",
      color: "#ffffff"
    }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(100);

    this.vidasIconos = [];
    for (var i = 0; i < CONFIG.vidas; i += 1) {
      var bateria = crearImagenArte(this, 807 + i * 36, 34, "bateria");
      bateria.setScrollFactor(0).setDepth(100);
      this.vidasIconos.push(bateria);
    }
    this.textoNivel = this.add.text(CONFIG.ancho / 2, 22, this.nivel.nombre, {
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      color: "#d8c8ff"
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);

    this.aviso = this.add.text(CONFIG.ancho / 2, 82, "", {
      fontFamily: "Arial, sans-serif",
      fontSize: "20px",
      color: "#ffffff",
      backgroundColor: "#202c58",
      padding: { x: 16, y: 10 },
      align: "center"
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100).setVisible(false);
    this.actualizarInterfaz();
  }

  actualizarInterfaz() {
    this.contadorTexto.setText(TEXTOS.estrellas + ": " + this.estrellasNivel);
    this.vidasIconos.forEach(function (icono, indice) {
      icono.setVisible(indice < this.vidas);
    }, this);
  }

  soltarSalto(evento) {
    if (
      (evento.code === "Space" || evento.code === "ArrowUp" || evento.code === "KeyW") &&
      this.jugador.body.velocity.y < 0
    ) {
      this.jugador.setVelocityY(this.jugador.body.velocity.y * CONFIG.multiplicadorSaltoCorto);
    }
  }

  update(tiempo) {
    if (!this.jugador || !this.jugador.active) return;
    this.fondo.tilePositionX = this.camara.scrollX * 0.14;
    this.companero.x = Phaser.Math.Linear(this.companero.x, this.jugador.x - this.direccion * 48, 0.08);
    this.companero.y = Phaser.Math.Linear(
      this.companero.y,
      this.jugador.y - 22 + Math.sin(tiempo / 180) * 7,
      0.12
    );
    this.companero.setFlipX(this.direccion < 0);

    this.estrellas.children.iterate(function (estrella) {
      if (estrella && estrella.active) {
        estrella.y = estrella.yInicial + Math.sin(tiempo / 240 + estrella.x) * 5;
      }
    });

    this.enemigos.children.iterate(function (enemigo) {
      if (!enemigo || !enemigo.active) return;
      if (enemigo.x <= enemigo.datosPatrulla.minimo) {
        enemigo.setVelocityX(enemigo.velocidadPatrulla);
      } else if (enemigo.x >= enemigo.datosPatrulla.maximo) {
        enemigo.setVelocityX(-enemigo.velocidadPatrulla);
      }
      enemigo.setFlipX(enemigo.body.velocity.x < 0);
    });

    if (this.bloqueado) {
      this.jugador.setVelocityX(0);
      return;
    }

    var izquierda = this.cursores.left.isDown || this.teclas.A.isDown;
    var derecha = this.cursores.right.isDown || this.teclas.D.isDown;
    var direccion = (derecha ? 1 : 0) - (izquierda ? 1 : 0);
    this.jugador.setVelocityX(direccion * CONFIG.velocidad);
    if (direccion !== 0) {
      this.direccion = direccion;
      this.jugador.setFlipX(direccion < 0);
    }

    var estaEnSuelo = this.jugador.body.blocked.down || this.jugador.body.touching.down;
    if (estaEnSuelo) this.saltosUsados = 0;
    if (this.teclasSalto.some(function (tecla) {
      return Phaser.Input.Keyboard.JustDown(tecla);
    }) && this.saltosUsados < CONFIG.saltosMaximos) {
      this.jugador.setVelocityY(-CONFIG.fuerzaSalto);
      this.saltosUsados += 1;
      SONIDOS.sonar(this, "salto");
    }

    if (estaEnSuelo && this.jugador.y < CONFIG.alto) {
      this.puntoSeguro = { x: this.jugador.x, y: this.jugador.y };
    }
    if (this.jugador.y > CONFIG.alto + CONFIG.limiteCaida) {
      this.rescatar();
    }

    if (tiempo < this.invulnerableHasta) {
      this.jugador.setAlpha(Math.floor(tiempo / 90) % 2 === 0 ? 0.35 : 1);
    } else {
      this.jugador.setAlpha(1);
    }
  }

  recogerEstrella(jugador, estrella) {
    if (!estrella.active) return;
    estrella.disableBody(true, true);
    this.estrellasNivel += 1;
    this.estrellasTotales += 1;
    this.actualizarInterfaz();
    SONIDOS.sonar(this, "estrella");
  }

  alTocarGris(jugador, enemigo) {
    if (!enemigo.active || this.bloqueado) return;
    var veniaDesdeArriba =
      jugador.body.velocity.y > 0 &&
      jugador.body.prev.y + jugador.body.height <= enemigo.body.top + 16;

    if (veniaDesdeArriba) {
      var x = enemigo.x;
      var y = enemigo.y;
      enemigo.disableBody(true, true);
      jugador.setVelocityY(-CONFIG.fuerzaRebote);
      var coloresChispa = [0xffd166, 0x7ce7e1, 0xff7b9c, 0xc3a6ff];
      coloresChispa.forEach(function (color, indice) {
        var angulo = indice * Math.PI / 2;
        var chispa = crearImagenArte(this, x, y, "chispa").setDepth(10).setTint(color);
        this.tweens.add({
          targets: chispa,
          x: x + Math.cos(angulo) * 28,
          y: y + Math.sin(angulo) * 28 - 24,
          alpha: 0,
          scaleX: 1.7,
          scaleY: 1.7,
          duration: 650,
          onComplete: function () { chispa.destroy(); }
        });
      }, this);
    } else {
      this.perderBateria();
    }
  }

  perderBateria() {
    if (this.time.now < this.invulnerableHasta) return;
    this.vidas -= 1;
    this.invulnerableHasta = this.time.now + CONFIG.duracionInvulnerabilidad;
    this.actualizarInterfaz();
    SONIDOS.sonar(this, "golpe");
    if (this.vidas <= 0) {
      this.rescatar();
    }
  }

  rescatar() {
    this.vidas = CONFIG.vidas;
    this.invulnerableHasta = this.time.now + CONFIG.duracionInvulnerabilidad;
    this.jugador.setPosition(this.puntoSeguro.x, this.puntoSeguro.y);
    this.jugador.setVelocity(0, 0);
    this.saltosUsados = 0;
    this.actualizarInterfaz();
    this.aviso.setText(TEXTOS.rescate).setVisible(true);
    if (this.avisoOcultar) this.avisoOcultar.remove(false);
    this.avisoOcultar = this.time.delayedCall(2400, function () {
      this.aviso.setVisible(false);
    }, [], this);
  }

  terminarNivel() {
    if (this.bloqueado) return;
    this.bloqueado = true;
    this.objeto.disableBody(true, true);
    this.cajaDialogo.mostrar(this.nivel.nombreDialogoObjeto, function () {
      this.mostrarResultado();
    }.bind(this));
    SONIDOS.sonar(this, "eco");
  }

  mostrarResultado() {
    this.panelResultado = crearImagenArte(this, CONFIG.ancho / 2, CONFIG.alto / 2, "panel");
    this.panelResultado.setDisplaySize(780, 300).setScrollFactor(0).setDepth(1100);
    var esFinal = this.indiceNivel === NIVELES.length - 1;
    this.add.text(CONFIG.ancho / 2, 185, esFinal ? TEXTOS.aventuraCompleta : TEXTOS.ecoRecuperado, {
      fontFamily: "Arial, sans-serif",
      fontSize: esFinal ? "34px" : "38px",
      color: "#ffd166",
      fontStyle: "bold"
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1101);

    this.add.text(
      CONFIG.ancho / 2,
      250,
      TEXTOS.nivelCompletado +
        "\n" + TEXTOS.estrellasNivel + ": " + this.estrellasNivel +
        "\n" + TEXTOS.estrellasTotales + ": " + this.estrellasTotales,
      {
        fontFamily: "Arial, sans-serif",
        fontSize: "22px",
        color: "#ffffff",
        align: "center",
        lineSpacing: 8
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1101);

    var boton = crearImagenArte(this, CONFIG.ancho / 2, 360, "boton");
    boton.setScrollFactor(0).setDepth(1101);
    this.add.text(
      CONFIG.ancho / 2,
      360,
      esFinal ? TEXTOS.volverMenu : TEXTOS.siguienteNivel,
      {
        fontFamily: "Arial, sans-serif",
        fontSize: "23px",
        color: "#ffffff",
        fontStyle: "bold"
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1102);

    var avanzar = function () {
      if (esFinal) {
        this.scene.start("Menu");
      } else {
        this.scene.start("Juego", {
          indiceNivel: this.indiceNivel + 1,
          estrellasTotales: this.estrellasTotales
        });
      }
    };
    this.time.delayedCall(150, function () {
      boton.setInteractive({ useHandCursor: true });
      boton.once("pointerdown", avanzar, this);
      this.input.keyboard.once("keydown-SPACE", avanzar, this);
      this.input.keyboard.once("keydown-ENTER", avanzar, this);
    }, [], this);
  }
}

var configuracionJuego = {
  type: Phaser.AUTO,
  parent: "juego",
  width: CONFIG.ancho,
  height: CONFIG.alto,
  backgroundColor: "#090d20",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: CONFIG.gravedad },
      debug: false
    }
  },
  scene: [Precarga, Menu, Juego]
};

var partidaPhaser = new Phaser.Game(configuracionJuego);
