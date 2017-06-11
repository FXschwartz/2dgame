class Level {
	constructor(game, tilemap) {
		this.game = game;

		this.map = this.game.add.tilemap(tilemap);
		this.map.addTilesetImage('tiles_spritesheet', 'tiles_spritesheet');

		this.game.stage.backgroundColor = "#a9f0ff";

		this.backgroundlayer = this.map.createLayer('BackgroundLayer');
		this.groundLayer = this.map.createLayer('GroundLayer');
		this.groundLayer.resizeWorld();
		this.map.setCollisionBetween(0,200, true, 'GroundLayer');

		this.player = new Player(this.game);
	}
}
