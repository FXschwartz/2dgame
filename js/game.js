class Game extends Phaser.Game {
	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
		this.state.add('PlayState', PlayState, false);
		this.state.start('PlayState');
	}
}

class PlayState extends Phaser.State {
	preload() {
		this.game.load.image('sky', 'assets/sky.png');
		this.game.load.image('ground', 'assets/platform.png');
		this.game.load.image('star', 'assets/star.png');
		this.game.load.image('brick', 'assets/brick.png');
		this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	}

	create() {
		console.log('create()\t this=%o', this);
		this.game.world.setBounds(0, 0, 2000, 2000);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.myWorld = new World(this.game);
		this.game.myWorld.player = new Player(this.game);

		this.game.myWorld.enemy = new Enemy(this.game);
	}

}

var game = new Game();
window.game = game;
