class World {
	constructor(game) {
		this.sky = game.add.sprite(0, 0, 'sky');
		this.sky.scale.setTo(4,4);

		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		this.ground = this.platforms.create(0, game.world.height - 64, 'ground');
		this.ground.scale.setTo(8,2);
		this.ground.body.immovable = true;


		// Add some ledges...
		for(var i=0,x=0,d=1;i<19;i++) {
			if(i && i%5===0) d *=-1;
			x += 300*d;
			this.addLedge(200+x, game.world.height-(200+i*150), 8 - Math.round(i/2));
		}

	}

	addLedge(x,y, w=8) {		// w: the number of bricks wide
		for(var i=0;i<w;i++) {
			var brick = this.platforms.create(x+i*32,y,'brick');
			brick.body.immovable = true;
			brick.scale.setTo(0.5,0.5);
		}
	}
}
