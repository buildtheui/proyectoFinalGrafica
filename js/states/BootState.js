/********
* este el es archivo que carga, crea inicialmente todos los settings del juego (Boot del juego)
*********/
var graficaInteractiva = graficaInteractiva || {};

// comienza el primer stado en phaser
graficaInteractiva.BootState = function () {
    "use strict";
    // crea el estado con el objeto graficaInteractiva
    Phaser.State.call(this);
};

graficaInteractiva.BootState.prototype = Object.create(Phaser.State.prototype);
// construye el objeto basado en el estado inicial
graficaInteractiva.BootState.prototype.constructor = graficaInteractiva.BootState;

// est funcion es la primera que se ejecuta dentro del Bootstate
graficaInteractiva.BootState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};

// luego de la funcion init esta se ejecuta cargando la ruta del archivo donde estan todos los assets mapa.json
graficaInteractiva.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

// cuanto ya ha creado los assets entonces los toma del objeto cache de phaser para cargar el juego
graficaInteractiva.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data);
};