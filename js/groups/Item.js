var graficaInteractiva = graficaInteractiva || {};

graficaInteractiva.Item = function (game_state, name, position, properties) {
    "use strict";
    graficaInteractiva.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

graficaInteractiva.Item.prototype = Object.create(graficaInteractiva.Prefab.prototype);
graficaInteractiva.Item.prototype.constructor = graficaInteractiva.Item;

graficaInteractiva.Item.prototype.update = function () {
    "use strict";
    // when colliding with hero the item is collected
    //this.game_state.game.physics.arcade.collide(this, this.game_state.groups.heroes, this.collect_item, null, this);
};

graficaInteractiva.Item.prototype.collect_item = function (item, hero) {
    "use strict";
    var stat;
    // update hero stats according to item
    /*
    for (stat in this.stats) {
        // update only if the stat is defined for this item
        if (this.stats.hasOwnProperty(stat) && this.stats[stat]) {
            hero.stats[stat] += this.stats[stat];
        }
    } */
    this.kill();
};