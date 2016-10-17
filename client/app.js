import Field from './Field';
import Player from './Player';
import Ball from './Ball';
import materials from './materials.js';
import SoundManager from './SoundManager';

class App {

    constructor() {

        this.bounds = new Phaser.Rectangle(0, 0, 860, 600);
        this.game = new Phaser.Game(this.bounds.width, this.bounds.height, Phaser.AUTO, 'open-hax', { preload: () => { this.preload(); }, create: () => { this.create(); }, update: () => { this.update(); }, render: this.render });
        this.onSoundLoad = this.onSoundLoad.bind(this);
    }

    preload() {
        //images
        this.game.load.image('field', '/img/grass.jpg');
        //sounds
        this.soundManager = new SoundManager(this.game, this.onSoundLoad);
        this.soundManager.preload();
    }

    create() {

        this.soundManager.create();
        this.game.stage.backgroundColor = '#5F7B48';

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.75;
        materials.init(this.game);

        this.game.physics.p2.setWorldMaterial(materials.world, true, true, true, true);
        this.game.physics.p2.world.defaultContactMaterial.friction = 0.9;
        this.game.physics.p2.world.setGlobalStiffness(1e5);

        this.field = new Field(this.game, materials.field, {
            width: 800,
            height: 400,
            x: 30,
            y: 30,
            borderColor: 0xffffff,
            borderSize: 3,
            borderAlpha: 0.5,
            backgroundColor: 0x61af2a,
        });
        this.field.render();

        this.player = new Player(this.game, materials.player, "home", "ojo", ":)", true);
        this.player2 = new Player(this.game, materials.player, "away", "ojo", ":(", false);
        this.ball = new Ball(this.game, materials.ball);

        this.player.render(300, 300);
        this.player2.render(300, 50);
        this.ball.render(430, 300);

        this.field.addPlayer(this.player);
        this.field.addPlayer(this.player2);
        this.field.addPlayer(this.ball);

        this.children = [];
        this.children.push(this.player);
        this.children.push(this.player2);
        this.children.push(this.ball);
    }

    update() {
    	this.player.update();
    	this.player2.update();
    	this.ball.update();

    	this.children.map((child) => {
    		if(typeof child.update == 'function') {
    			child.update();
    		}
    	});

    }

    onSoundLoad () {
        console.log("sounds loaded");
        this.soundManager.startPublic();
        setTimeout(() => {
            this.soundManager.startMatch();
        }, 2000)
    }


    render() {

    }

}

window.onload = function() {
    let app = new App();
};
