//initiate the Phaser framework
var game = new Phaser.Game(600, 700, Phaser.CANVAS, 'game_canvas');




game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.start('PreloadState');