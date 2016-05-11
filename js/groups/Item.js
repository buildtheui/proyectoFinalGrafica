var graficaInteractiva = graficaInteractiva || {};
var reg = { wallDestroy : 0 };
graficaInteractiva.Item = function (game_state, name, position, properties) {
    "use strict";
    graficaInteractiva.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

graficaInteractiva.Item.prototype = Object.create(graficaInteractiva.Prefab.prototype);
graficaInteractiva.Item.prototype.constructor = graficaInteractiva.Item;

// el metodo update() es llamado en cada cuadro
graficaInteractiva.Item.prototype.update = function () {
    "use strict";
    // when colliding with hero the item is collected
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.heroes, this.collect_item, null, this);

};

graficaInteractiva.Item.prototype.collect_item = function (item, hero) {
    "use strict";
   /* var stat;
    // update hero stats according to item
    
    for (stat in this.stats) {
        // update only if the stat is defined for this item
        if (this.stats.hasOwnProperty(stat) && this.stats[stat]) {
            hero.stats[stat] += this.stats[stat];
        }
    } */
    reg.modal = new gameModal(game);
    createModals(item, hero);
    console.log(hero);
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
            if( reg.wallDestroy == 2) {
                this.kill();
                hero.walking_speed = 0;
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
   var item = item, hero = hero;

   //// ventana modal 1 ////
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
                        setTimeout(
                            function restart(){
                                game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState")
                                },
                            2500);  
                    }
                }
            ]
   });

    /// ventana modal 2 ///
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
                        setTimeout(
                            function restart(){
                                game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState")
                                },
                            2500);                            
                    }
            }
            ]
    });
            
            /// ventana modal 3
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

            /// ventana modal 4
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
             /// ventana modal 5
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
            /// ventana modal 6
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
            /// ventana modal 7
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
            /// ventana modal 8
            reg.modal.createModal({
                    type:"modal8",
                    includeBackground: true,
                    modalCloseOnInput: false,
                    itemsArr: [
                        {
                            type: "text",
                            content: "Programador cansado... FIN",
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
    var endFn = endFn || function(){};
    setTimeout(endFn,3000);
}
function showModal(endFn){
    setTimeout(endFn,200);
}