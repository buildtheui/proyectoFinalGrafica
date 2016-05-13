/* 
* en este archivo, describimos el comportamiento del jugador
*/
var graficaInteractiva = graficaInteractiva || {};

graficaInteractiva.Hero = function (game_state, name, position, properties) {
    "use strict";
    // constructor del jugador, para poner su posicion, propiedades, velocidad de movimiento, fisica
    graficaInteractiva.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    // aca le decimos la velocidad a la que se mueve que en maps.json esta definida como 150
    this.walking_speed = +properties.walking_speed;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    // es aca donde hacemos mover el jugador, spritesheet llamado en phaser 
    this.animations.add("walking", [0, 1], 6, true);
    // le decimos que se mueva con las flechas del teclado
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
};

graficaInteractiva.Hero.prototype = Object.create(graficaInteractiva.Prefab.prototype);
// aqui es donde construimos el jugador
graficaInteractiva.Hero.prototype.constructor = graficaInteractiva.Hero;

// el metodo update() es llamado en cada cuadro
graficaInteractiva.Hero.prototype.update = function () {
    "use strict";
    // a esta funcion es la que se llama cuando el jugador choca con algun elemento en el mapa
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    if (this.cursors.left.isDown && this.body.velocity.x <= 0) { // se mueve a a izquiera si no se ha movido a la derecha
        this.body.velocity.x = -this.walking_speed;
        this.scale.setTo(1, 1);
    } else if (this.cursors.right.isDown && this.body.velocity.x >= 0) { // se mueve a la derecha si no se ha movido a la izquierda
        this.body.velocity.x = +this.walking_speed;
        this.scale.setTo(-1, 1);
    } else {
        this.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown && this.body.velocity.y <= 0) { // se mueve arriba si no se ha movido abajo
        this.body.velocity.y = -this.walking_speed;
    } else if (this.cursors.down.isDown && this.body.velocity.y >= 0) { // se mueve abajo si no se ha movido arriba
        this.body.velocity.y = +this.walking_speed;
    } else {
        this.body.velocity.y = 0; // se queda quieto si no hay un evento de las flachas
    }
    
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        // en caso que no se mueva, se para la animación
        this.animations.stop();
        this.frame = 0;
    } else {
        // si se esta moviendo entonces se inicia la animación
        this.animations.play("walking");
    }
};