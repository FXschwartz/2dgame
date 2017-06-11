class Level {
	constructor(game, tilemap) {
		this.game = game;

		this.game.stage.backgroundColor = "#a9f0ff";

		// this.map = this.game.add.tilemap(tilemap);
		// this.map.addTilesetImage('tiles_spritesheet', 'tiles_spritesheet');

		this.map = game.add.tiledmap(tilemap);

		// this.backgroundlayer = this.map.createLayer('BackgroundLayer');
		// this.groundLayer = this.map.createLayer('GroundLayer');
		// this.groundLayer.resizeWorld();
		// this.map.setCollisionBetween(0,200, true, 'GroundLayer');

		game.physics.p2.convertTiledmap(this.map, 'GroundLayer');

		this.player = new Player(this.game);
	}
}
