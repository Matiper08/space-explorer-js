# Space Explorers

Juego web hecho solo con HTML, CSS, JavaScript y Phaser 3.80.1. No hace falta instalar Node.js ni herramientas de compilación.

## Cómo abrirlo por primera vez

1. Abre esta carpeta (`space-explorer-js`) en Visual Studio Code.
2. En la vista de extensiones de VS Code, busca e instala **Live Server**.
3. En el explorador de archivos de VS Code, haz clic derecho en `index.html` y elige **Open with Live Server**.
4. Se abrirá el juego en el navegador. Para ver los cambios, guarda los archivos; Live Server actualizará la página.

Se necesita conexión a internet para cargar Phaser desde jsDelivr.

## Cómo jugar

- Moverse: flechas izquierda/derecha o teclas A/D.
- Saltar: flecha arriba, W o espacio. Maia puede hacer un segundo salto en el aire.
- Soltar el botón de salto mientras Maia sube hace que el salto sea más corto.
- Recoge estrellas, evita tocar a los Grises de costado y salta encima de ellos para convertirlos en chispas.
- Si Maia se queda sin baterías o cae, Tuerca la rescata. No hay game over.
- Toca el objeto al final de cada nivel y avanza los diálogos con espacio o haciendo clic/tocando la pantalla.

## Dónde personalizar

- `datos.js`: controles de movimiento, textos, diálogos y datos de los tres niveles.
- `arte.js`: dibujos provisionales, dimensiones y rutas de imágenes. Coloca tus archivos en `assets/` y cambia `archivo: null` por una ruta, por ejemplo `archivo: "assets/maia.png"`.
- `game.js`: reglas y funcionamiento de las escenas.
- `style.css`: presentación de la página y el tamaño adaptable del juego.

Si una imagen configurada no se puede cargar, el juego avisa en la consola del navegador y conserva su dibujo provisorio.
