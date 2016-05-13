var graficaInteractiva = graficaInteractiva || {};

// se crea un objeto game para comenzar el juego y se le añaden los estados de creacion, carga el inicio del juego
var game = new Phaser.Game(600, 600, Phaser.AUTO, 'game-area');
// con el objeto anterior phaser crea el canvas con los valores que se le den en la etiqueta #game-area en css
game.state.add("BootState", new graficaInteractiva.BootState());
game.state.add("LoadingState", new graficaInteractiva.LoadingState());
game.state.add("WorldState", new graficaInteractiva.WorldState());
game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState");
// instrucciones iniciales del juego
alert("Instrucciones:\n1. Contesta las 2 preguntas del mostruo y el dragon para matarlos\n2. luego destruye el muro y rescata a la princesa!");