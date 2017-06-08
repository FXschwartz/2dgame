'use strict';

class Player extends Phaser.Sprite {
	constructor(game) {
		super(game, 32, game.world.height-250, 'dude');
		game.add.existing(this);

		game.camera.follow(this);
		game.physics.arcade.enable(this);

		this.health = 3;
		this.maxHealth = 3;

		this.body.bounce.y = 0.2;
		this.body.gravity.y = 1000;
		this.body.collideWorldBounds = true;

		this.animations.add('left', [0, 1, 2, 3], 10, true);
		this.animations.add('right', [5, 6, 7, 8], 10, true);
		this.scale.setTo(1,1);

		this.cursors = game.input.keyboard.createCursorKeys();
	}

	update() {
		var game = this.game;
		var player = this;
		var platforms = game.myWorld.platforms;
		var cursors = this.cursors;

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
			player.body.velocity.y = Math.min(Math.max(Math.abs(player.body.velocity.x), 300), 600) * -1.8;
		}
	}

	onHit(player,enemy) {
		// console.log('Player.onHit: enemy=%o', enemy);
		if(player.body.touching.right) player.body.velocity.x = -1000;
		if(player.body.touching.left) player.body.velocity.x = 1000;
		if(player.body.touching.down) {
			player.body.velocity.y = -400;
			enemy.kill();
		}
	}
}
