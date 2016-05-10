var graficaInteractiva = graficaInteractiva || {};

// se crea un objeto game para comenzar el juego y se le añaden los estados de creacion, carga e inicio dell juego
var game = new Phaser.Game(600, 600, Phaser.CANVAS);
game.state.add("BootState", new graficaInteractiva.BootState());
game.state.add("LoadingState", new graficaInteractiva.LoadingState());
game.state.add("WorldState", new graficaInteractiva.WorldState());
game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState");
// instrucciones iniciales del juego
alert("Instrucciones:\n1. Contesta las 2 preguntas de los monstruos para matarlos\n2. luego destruye el muro y rescata a la princesa!");