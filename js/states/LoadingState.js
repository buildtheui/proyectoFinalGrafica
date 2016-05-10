/********
* este el es archivo que carga todos los assets del juego (personaje, mapa, objetos del juego)
*********/
var graficaInteractiva = graficaInteractiva || {};

graficaInteractiva.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

graficaInteractiva.LoadingState.prototype = Object.create(Phaser.State.prototype);
graficaInteractiva.LoadingState.prototype.constructor = graficaInteractiva.LoadingState;

graficaInteractiva.LoadingState.prototype.init = function (level_data, next_state, extra_parameters) {
    "use strict";
    this.level_data = level_data;
};

graficaInteractiva.LoadingState.prototype.preload = function () {
    "use strict";
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    for (asset_key in assets) { // carga todos los assets de acuerdo con la propiedad "key" del asset 
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            // en caso de ser un objeto del mapa el primer caso lo carga
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                // en caso de ser un personaje, en este caso el jugador, lo carga y crea el personaje en movimiento
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                // aqui carga el mapa creado con tiled, segun el archivo mapa.json
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }
};

graficaInteractiva.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start("WorldState", true, false, this.level_data);
};