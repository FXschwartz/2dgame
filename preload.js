'use strict';

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('baddie', 'assets/scottpilgrim_multiple.png', 108, 135);
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var player2;
var platforms;
var cursors;
