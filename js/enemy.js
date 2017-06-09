'use strict';

class Enemy extends Phaser.Sprite {
	constructor(game, x,y) {
		super(game, x, y, 'baddie');

		game.physics.arcade.enable(this);

		this.body.bounce.y = 0.1;
		this.body.gravity.y = 1000;
		this.body.collideWorldBounds = true;

		this.animations.add('left', [0,1], 10, true);
		this.animations.add('right', [2,3], 10, true);

		this.speed = game.rnd.integerInRange(100,300);
	}

	update() {
		var game = this.game;
		var world = game.myWorld;
		var player = world.player;
		var enemy = this;

		game.physics.arcade.collide(world.enemies);
		game.physics.arcade.collide(enemy, world.platforms);
		game.physics.arcade.collide(player, enemy, player.onHit);
		game.physics.arcade.collide(player.bulletGroup, enemy, this.onHit);

		if(enemy.body.blocked.left) enemy.animations.play('right');
		if(enemy.body.blocked.right) enemy.animations.play('left');

		if(enemy.body.touching.down) {
			if(enemy.body.x-player.body.x>=150) enemy.animations.play('left');
			if(enemy.body.x-player.body.x<=-150) enemy.animations.play('right');

			if(!game.rnd.integerInRange(0,20)) {
				var deltaY = player.body.y-enemy.body.y;
				if(deltaY<-10) enemy.body.velocity.y = (2+game.rnd.frac()) * deltaY;
			}

		}

		if(enemy.animations.currentAnim.name==='left') {
			if(enemy.body.velocity.x>-enemy.speed) enemy.body.velocity.x-=5;
		}
		if(enemy.animations.currentAnim.name==='right') {
			if(enemy.body.velocity.x<enemy.speed) enemy.body.velocity.x+=5;
		}

	}

	onHit(enemy,bullet) {
		enemy.kill();
		bullet.kill();
	}

}
