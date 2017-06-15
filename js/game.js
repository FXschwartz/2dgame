class Game extends Phaser.Game {
	constructor() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		width = 800;
		super(width, height, Phaser.AUTO, '');

		this.state.add('PlayState', PlayState, false);
		this.state.start('PlayState');
	}
}

class PlayState extends Phaser.State {
	preload() {
		// this.game.add.plugin(Phaser.Plugin.Debug);

		// this.game.load.image('sky', 'assets/sky.png');
		// this.game.load.image('ground', 'assets/platform.png');
		// this.game.load.image('star', 'assets/star.png');
		// this.game.load.image('brick', 'assets/brick.png');
		// this.game.load.image('bullet', 'assets/bullet.png');
		this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
		this.game.load.spritesheet('health', 'assets/health.png', 64,64);
		// this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

		this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/tiles_spritesheet_sm.png');
	}

	create() {
		// console.log('create()\t this=%o', this);
		// this.game.world.setBounds(0, 0, 2000, 2000);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.level = new Level(this.game, 'level1');
	}

}

var game = new Game();
window.game = game;
