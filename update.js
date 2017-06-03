'use strict';

function update() {

	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(player2, platforms);
	game.physics.arcade.collide(player, player2);

	var maxSpeed = 400;
	var speedInc = 20;

    if(player2.body.blocked.left) {
        player2.animations.play('right');
    }
    if(player2.body.blocked.right) {
        player2.animations.play('left');
    }

    if(player2.animations.currentAnim.name==='right') {
        player2.body.velocity.x += speedInc;
		if(player2.body.velocity.x>maxSpeed) player2.body.velocity.x=maxSpeed;
    }

    if(player2.animations.currentAnim.name==='left') {
        player2.body.velocity.x += speedInc * -1;
		if(player2.body.velocity.x<maxSpeed*-1) player2.body.velocity.x = maxSpeed*-1;
    }

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
