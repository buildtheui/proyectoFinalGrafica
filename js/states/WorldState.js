/********
* este el es archivo donde se crea colisiones en el mapa, gravedad y ademas se hace responsive el juego
*********/

var graficaInteractiva = graficaInteractiva || {};

graficaInteractiva.WorldState = function () {
    "use strict";
    Phaser.State.call(this);

    // inicializamos los tipos que tendran un comportamiento en los grupos, al final de este archivo se crean
    this.prefab_classes = {
        "hero": graficaInteractiva.Hero.prototype.constructor,
        "item": graficaInteractiva.Item.prototype.constructor
        
    }
};

graficaInteractiva.WorldState.prototype = Object.create(Phaser.State.prototype);
graficaInteractiva.WorldState.prototype.constructor = graficaInteractiva.WorldState;

graficaInteractiva.WorldState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    var tileset_index;
    this.level_data = level_data;
    
    // volvemos el juego responsive dependiendo del tamaño de la pantalla el juego scala
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    // usamos la api de phaser para ponerle fisica al juego, pero realmente desactivamos la gravedad
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
    
    // ya cargado el mapa aqui lo creamos
    this.map = this.game.add.tilemap(level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);
};

graficaInteractiva.WorldState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    
    // en Tiled creamos capas, que se encuentran en mapa.json de ahi toma los layers y los añade phaser
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // configura la capa collision 
            this.map.setCollisionByExclusion([-1], true, layer.name);
        }
    }, this);
    //  ajusta el tamaño del juego para que sea igual a la capa actual
    this.layers[this.map.layer.name].resizeWorld();
    
    // crea los grupos de phaser (objetos del mapa) que se encuentran en mapa.json
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // Crea la capa de los objetos que esta en mapa.json
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    
     // aqui ponemos la camara encima del jugador y le decimos que lo siga
    this.game.camera.follow(this.prefabs.hero);
};

graficaInteractiva.WorldState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position;
    // aqui decimos que las cordenadas de cada loza (tiled o patron) comiencen abajo a la izquierda
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
    this.create_prefab(object.type, object.name, position, object.properties);
};

graficaInteractiva.WorldState.prototype.create_prefab = function (type, name, position, properties) {
    "use strict";
    var prefab;
    // se crean los grupos segun el tipo
    if (this.prefab_classes.hasOwnProperty(type)) {
        prefab = new this.prefab_classes[type](this, name, position, properties);
    }
    this.prefabs[name] = prefab;
    return prefab;
};