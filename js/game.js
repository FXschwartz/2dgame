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
		this.game.load.image('bullet', 'assets/bullet.png');
		this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
		this.game.load.spritesheet('health', 'assets/health.png', 64,64);
		this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	}

	create() {
		console.log('create()\t this=%o', this);
		this.game.world.setBounds(0, 0, 2000, 2000);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.myWorld = new World(this.game);
		this.game.myWorld.player = new Player(this.game);


		this.game.myWorld.enemies = this.game.add.group();
		for(var i=0;i<8;i++) {
			var enemy = new Enemy(this.game, 1000+i*200, this.game.world.height-300);
			this.game.myWorld.enemies.add(enemy);
		}
	}

}

var game = new Game();
window.game = game;
