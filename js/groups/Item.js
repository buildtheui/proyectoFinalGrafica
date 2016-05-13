/* 
* en este archivo, describimos el comportamiento de los items en el mapa, como dragones, el muro, y dialogos
*/
var graficaInteractiva = graficaInteractiva || {};
var reg = { wallDestroy : 0 }; // lo usamos para los dialogos y la informacion de la pared a destruir
graficaInteractiva.Item = function (game_state, name, position, properties) {
    "use strict";
    // constructor del item, para poner su posicion, propiedades, movimiento y fisica
    graficaInteractiva.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

graficaInteractiva.Item.prototype = Object.create(graficaInteractiva.Prefab.prototype);
// aqui es donde construimos el item
graficaInteractiva.Item.prototype.constructor = graficaInteractiva.Item;

// el metodo update() es llamado en cada cuadro
graficaInteractiva.Item.prototype.update = function () {
    "use strict";
    // cuando hay un choque del jugador con el item entonces se llama a la funcion collect_item
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.heroes, this.collect_item, null, this);

};

graficaInteractiva.Item.prototype.collect_item = function (item, hero) {
    "use strict";
   // con la libreria modal.js creamos un nuevo objeto modal, para crear los dialogos
    reg.modal = new gameModal(game);
    // llamamos a la funcion que creara los dialogos
    createModals(item, hero);
    switch(item.key){
        case "demon_image":
             // si choca con el elemento, el jugador queda quieto hasta que responda la pregunta
            hero.walking_speed = 0;
            reg.modal.showModal("modal1");
            break;
        case "dragon_image":
            // si choca con el elemento, el jugador queda quieto hasta que responda la pregunta
            hero.walking_speed = 0;
            reg.modal.showModal("modal2");
            break;  
        case "wall_image":
            // si ha respondido la pregunta del dragon y mounstro y choca con la pared entonces esta desaparece
            if( reg.wallDestroy == 2) {
                this.kill();
                hero.walking_speed = 0;
                // comienza la converzacion del jugador con la reina
                reg.modal.showModal("modal6");
                setTimeout(
                    function dialog1(){
                        reg.modal.hideModal("modal6");
                        hero.walking_speed = 150;
                    },
                2000);
            }
            break;
        case "girl_image":
            // cuando el jugador choca con la reina, se crea la converzacion final
                hero.walking_speed = 0;
                reg.modal.showModal("modal4");
                hideModal(function (){
                    reg.modal.hideModal("modal4");
                    showModal(function (){
                            reg.modal.showModal("modal5");
                            hideModal(function (){
                                reg.modal.hideModal("modal5");
                                showModal(function (){
                                    reg.modal.showModal("modal7");
                                    hideModal(function (){
                                        reg.modal.hideModal("modal7");
                                        showModal(function (){
                                            reg.modal.showModal("modal8");
                                        });
                                    });
                                });
                            });
                        });
                });
        break;
            
    }
};

function createModals(item, hero) {
   // esta es la duncion que crea los dialogos
   var item = item, hero = hero;

   //// ventana modal 1, conversación 1 ////
    reg.modal.createModal({
            type:"modal1",
            includeBackground: true,
            modalCloseOnInput: false,
        itemsArr: [
                {
                    type: "text",
                    content: "Tienes una oportunidad, si contestas mal Mueressssss.....",
                    fontFamily: "Luckiest Guy",
                    fontSize: 20,
                    color: "0xFEFF49",
                    offsetY: -100,
                    stroke: "0x000000",
                    strokeThickness: 5
            },
                {
                    type: "text",
                    content: "¿Darias tu vida por la princesa?",
                    fontFamily: "Luckiest Guy",
                    fontSize: 20,
                    color: "0xFEFF49",
                    stroke: "0x000000",
                    strokeThickness: 5
            },
                {
                    type: "image",
                    content: "si",
                    offsetY: 100,
                    offsetX: -80,
                    contentScale: 0.6,
                    callback: function () {
                      // elimina los mounstros, cierra la venta modal y de nuevo permite movimiento al jugador
                      // autemnta el 1 para eliminar la pared donde esta la reina
                        reg.wallDestroy += 1;
                        item.kill();                        
                        reg.modal.hideModal("modal1");
                        hero.walking_speed = 150;
                    }
            },
                {
                    type: "image",
                    content: "no",
                    offsetY: 100,
                    offsetX: 80,
                    contentScale: 0.6,
                    callback: function () {
                        reg.modal.hideModal("modal1");
                        reg.modal.showModal("modal3");
                        // en caso que responda no muestra game over y reinicia el juego
                        setTimeout(
                            function restart(){
                                game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState")
                                },
                            2500);  
                    }
                }
            ]
   });

    /// ventana modal 2, conversacion 2 ///
    reg.modal.createModal({
            type:"modal2",
            includeBackground: true,
            modalCloseOnInput: false,
        itemsArr: [
                {
                    type: "text",
                    content: "Tienes una oportunidad, si contestas mal Mueressssss.....",
                    fontFamily: "Luckiest Guy",
                    fontSize: 20,
                    color: "0xFEFF49",
                    offsetY: -100,
                    stroke: "0x000000",
                    strokeThickness: 5
            },
                {
                    type: "text",
                    content: "¿Darias lo que tienes por ella?",
                    fontFamily: "Luckiest Guy",
                    fontSize: 20,
                    color: "0xFEFF49",
                    stroke: "0x000000",
                    strokeThickness: 5
            },
                {
                    type: "image",
                    content: "si",
                    offsetY: 100,
                    offsetX: -80,
                    contentScale: 0.6,
                    callback: function () {
                        // elimina los mounstros, cierra la venta modal y de nuevo permite movimiento al jugador
                        // autemnta el 1 para eliminar la pared donde esta la reina
                        reg.wallDestroy += 1;
                        item.kill();                        
                        reg.modal.hideModal("modal2");
                        hero.walking_speed = 150;
                      
                    }
            },
                {
                    type: "image",
                    content: "no",
                    offsetY: 100,
                    offsetX: 80,
                    contentScale: 0.6,
                    callback: function () {
                        reg.modal.hideModal("modal2");
                        reg.modal.showModal("modal3");
                        // en caso que responda no muestra game over y reinicia el juego
                        setTimeout(
                            function restart(){
                                game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState")
                                },
                            2500);                            
                    }
            }
            ]
    });
            
            /// ventana modal 3, conversación 3 ///
            reg.modal.createModal({
                    type:"modal3",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "En serio man???",
                            fontFamily: "Luckiest Guy",
                            fontSize: 42,
                            color: "0xFEFF49",
                            offsetY: 50
                        },
                      {
                            type: "image",
                            content: "gameover",
                            offsetY: -50,
                            contentScale: 0.6
                        }
                    ]
                });

            /// ventana modal 4, conversación 4 ///
            reg.modal.createModal({
                    type:"modal4",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "Gracias por salvarme!\nEres el Amigo que toda\nprincesa debe tener!",
                            fontFamily: "Luckiest Guy",
                            fontSize: 30,
                            color: "0xFEFF49",
                            offsetY: 50
                        },
                      {
                            type: "image",
                            content: "princess",
                            offsetY: -90
                        }
                    ]
                });
             /// ventana modal 5, conversación 5 /// 
            reg.modal.createModal({
                    type:"modal5",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "image",
                            content: "ahora_no",
                            offsetY: 0
                        }
                    ]
                });
            /// ventana modal 6, conversación 6 ///
            reg.modal.createModal({
                    type:"modal6",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "Ahora si princesa!\nHe luchado por ti!",
                            fontFamily: "Luckiest Guy",
                            fontSize: 45,
                            color: "0xFEFF49",
                            offsetY: 50
                        },
                      {
                            type: "image",
                            content: "hero",
                            offsetY: -150
                        }
                    ]
                });
            /// ventana modal 7, conversacion 7 ///
            reg.modal.createModal({
                    type:"modal7",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "Tu solo me salvaste con otras\nintenciones...",
                            fontFamily: "Luckiest Guy",
                            fontSize: 30,
                            color: "0xFEFF49",
                            offsetY: 50
                        },
                      {
                            type: "image",
                            content: "princess",
                            offsetY: -90
                        }
                    ]
                });
            /// ventana modal 8, conversación 8 ///
            reg.modal.createModal({
                    type:"modal8",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "... FIN",
                            fontFamily: "Luckiest Guy",
                            fontSize: 30,
                            color: "0xFEFF49",
                            offsetY: 50
                        },
                        {
                            type: "image",
                            content: "c_l_supo",
                            offsetY: -150
                        }
                    ]
                });
};

function hideModal(endFn){
    // esta funcion crea un delay de 3 seg antes de cerrar la conversación
    var endFn = endFn || function(){};
    setTimeout(endFn,3000);
}
function showModal(endFn){
    // esta funcion crea un delay de 200 ms para mostrar la conversación
    setTimeout(endFn,200);
}