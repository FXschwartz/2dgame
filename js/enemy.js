'use strict';

class Enemy extends Phaser.Sprite {
	constructor(game) {
		console.log(game.world.height);
		super(game, 500, game.world.height-250, 'baddie');
		game.add.existing(this);

		game.physics.arcade.enable(this);

		this.body.bounce.y = 0.1;
		this.body.gravity.y = 1000;
		this.body.collideWorldBounds = true;

		this.animations.add('left', [0,1], 10, true);
		this.animations.add('right', [2,3], 10, true);

		this.speed = 200;
	}

	update() {
		var game = this.game;
		var world = game.myWorld;
		var player = world.player;
		var enemy = this;

		game.physics.arcade.collide(enemy, world.platforms);
		game.physics.arcade.collide(player, enemy, player.onHit);

		if(enemy.body.blocked.left) enemy.animations.play('right');
		if(enemy.body.blocked.right) enemy.animations.play('left');

		if(enemy.body.touching.down) {
			if(enemy.body.x-player.body.x>=200) enemy.animations.play('left');
			if(enemy.body.x-player.body.x<=-200) enemy.animations.play('right');
		}

		if(enemy.animations.currentAnim.name==='left') enemy.body.velocity.x = -enemy.speed;
		if(enemy.animations.currentAnim.name==='right') enemy.body.velocity.x = enemy.speed;

	}

}
