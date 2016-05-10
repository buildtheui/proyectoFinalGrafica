var graficaInteractiva = graficaInteractiva || {};

var game = new Phaser.Game(600, 600, Phaser.CANVAS);
game.state.add("BootState", new graficaInteractiva.BootState());
game.state.add("LoadingState", new graficaInteractiva.LoadingState());
game.state.add("WorldState", new graficaInteractiva.WorldState());
game.state.start("BootState", true, false, "assets/levels/world_level.json", "WorldState");
alert("Instrucciones:\n1. Contesta las 2 preguntas de los monstruos para matarlos\n2. luego destruye el muro y rescata a la princesa!");