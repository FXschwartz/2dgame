'use strict';

function create() {

	game.world.setBounds(0, 0, 2000, 600);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	var sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(4,1);

	//  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();

	//  We will enable physics for any object that is created in this group
	platforms.enableBody = true;

	// Here we create the ground.
	var ground = platforms.create(0, game.world.height - 64, 'ground');

	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(8,2);

	//  This stops it from falling away when you jump on it
	ground.body.immovable = true;


	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;

	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	ledge = platforms.create(750, 250, 'ground');
	ledge.body.immovable = true;

	ledge = platforms.create(900, 150, 'ground');
	ledge.body.immovable = true;


	ledge = platforms.create(1500, 250, 'ground');
	ledge.body.immovable = true;
	ledge.scale.setTo(0.5,0.5);

	// The player and its settings
	player = game.add.sprite(32, game.world.height - 250, 'dude');
	game.camera.follow(player);

	// Create the baddies and its settings
    player2 = game.add.sprite(250,100, 'baddie');
    game.physics.arcade.enable(player2);
    player2.scale.setTo(.6,0.6);
    // player2.frame = 1;
    player2.enableBody = true;
    player2.body.bounce.y = 0.1;
	player2.body.gravity.y = 1000;
	player2.body.collideWorldBounds = true;

    player2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	player2.animations.add('left', [10, 11, 12, 13, 14], 10, true);
    player2.animations.play('left');

	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 1000;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.scale.setTo(1,1.5);


	cursors = game.input.keyboard.createCursorKeys();

}
