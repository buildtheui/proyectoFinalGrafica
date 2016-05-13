/* 
* en este archivo, describimos el comportamiendo para loos grupos que se definieron en WorldState.js
*/

var graficaInteractiva = graficaInteractiva || {};

graficaInteractiva.Prefab = function (game_state, name, position, properties) {
    "use strict";
     // constructor que es llamado por Item y hero
    Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);
    
    this.game_state = game_state;
    
    this.name = name;
    
    // dependiendo al tipo de grupo entonces se crean las propiedades y se le añaden a este grupo
    this.game_state.groups[properties.group].add(this);
    this.frame = +properties.frame;
    
    // aca hacemos responsive los objetos de los grupos, asi como loo hicimos en WorldState.js con el mapa
    if (properties.scale) {
        this.scale.setTo(properties.scale.x, properties.scale.y);
    }
    
    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }
    
    this.game_state.prefabs[name] = this;
};

graficaInteractiva.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
// finalmente aca es donde construimos el grupo
graficaInteractiva.Prefab.prototype.constructor = graficaInteractiva.Prefab;