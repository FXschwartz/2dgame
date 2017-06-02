var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var platforms;
var cursors;

function create() {

	 game.world.setBounds(0, 0, 2000, 600);

	//  We're going to be using physics, so enable the Arcade Physics system
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

	//  Now let's create two ledges
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

function update() {

	game.physics.arcade.collide(player, platforms);

	var maxSpeed = 400;
	var speedInc = 20;

	if(cursors.left.isDown) {
		player.animations.play('left');
		player.body.velocity.x += speedInc * -1;
		if(player.body.velocity.x<maxSpeed*-1) player.body.velocity.x = maxSpeed*-1;

	}
	else if(cursors.right.isDown) {
		player.body.velocity.x += speedInc;
		if(player.body.velocity.x>maxSpeed) player.body.velocity.x=maxSpeed;
		player.animations.play('right');
	}
	else {
		//  Stand still
		player.body.velocity.x *= 0.90;
		if(Math.abs(player.body.velocity.x)<50) {
			player.animations.stop();
			player.frame = 4;
			player.body.velocity.x = 0;
		}
	}

	//  Allow the player to jump if they are touching the ground.
	if(cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = Math.max(Math.abs(player.body.velocity.x), 300) * -1.5;
	}

}
