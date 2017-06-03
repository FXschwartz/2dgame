var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('brick', 'assets/brick.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('player', 'assets/dude.png',   32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}


var player;
var platforms;
var cursors;
var enemies = [];

function create() {
	var bottom = 2000;

	game.world.setBounds(0, 0, 2000, 2000);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	var sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(4,4);

	platforms = game.add.group();
	platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(8,2);
	ground.body.immovable = true;

	function addLedge(x,y, w=8) {		// w: the number of bricks wide
		for(var i=0;i<w;i++) {
			var brick = platforms.create(x+i*32,y,'brick');
			brick.body.immovable = true;
			brick.scale.setTo(0.5,0.5);
		}
	}

	// Add some ledges...
	for(var i=0,x=0,d=1;i<19;i++) {
		if(i && i%5===0) d *=-1;
		x += 300*d;
		addLedge(200+x, bottom-(200+i*150), 8 - Math.round(i/2));
	}

	var star = game.add.sprite(950, 50, 'star');

	player = game.add.sprite(32, game.world.height - 250, 'player');


	game.camera.follow(player);
	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.1;
	player.body.gravity.y = 1000;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.scale.setTo(1,1.25);

	for(var i=0;i<4;i++) {
		var enemy = game.add.sprite(1500+i*100, bottom-(100+i*50), 'baddie');
		game.physics.arcade.enable(enemy);
		enemy.animations.add('left', [0,1], 10, true);
		enemy.animations.add('right', [2,3], 10, true);
		enemy.animations.play(i%2===0 ? 'left' : 'rigth');
		enemy.body.bounce.y = 0.3;
		enemy.body.gravity.y = 500;
		enemy.body.collideWorldBounds = true;
		enemies.push(enemy);
		enemy.speed = randomInt(100,400);
	}

	game.cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	var cursors = game.cursors;
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
		player.body.velocity.y = Math.max(Math.abs(player.body.velocity.x), 300) * -2;
	}

	enemies.forEach(enemy => {
		game.physics.arcade.collide(platforms, enemy);
		game.physics.arcade.collide(player, enemy, playerHit);

		if(enemy.body.blocked.left) enemy.animations.play('right');
		if(enemy.body.blocked.right) enemy.animations.play('left');

		if(enemy.body.touching.down) {
			if(enemy.body.x-player.body.x>=200) enemy.animations.play('left');
			if(enemy.body.x-player.body.x<=-200) enemy.animations.play('right');
		}

		if(enemy.animations.currentAnim.name==='left') enemy.body.velocity.x = -enemy.speed;
		if(enemy.animations.currentAnim.name==='right') enemy.body.velocity.x = enemy.speed;

		// Let them jump as high as they need to reach you...
		if(enemy.body.touching.down) {
			var heightDelta = enemy.body.y-player.body.y;
			if(heightDelta>50 && !randomInt(0,5)) {
				enemy.body.velocity.y = -randomInt(heightDelta, heightDelta*2);
			}
		}
	});

	// game.debug.spriteCoords(player, 32, 32);
}

function randomInt(min,max) {
	return Math.round(Math.random()*(max-min)+min);
}

function playerHit(player,enemy) {
	player.kill();
}
