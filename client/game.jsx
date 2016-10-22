
import React from 'react';

import Chat from './Components/ChatComponent';
import Field from './Components/Field';
import Player from './Components/Player';
import Ball from './Components/Ball';
import room from './Components/Room';

import materials from './materials';
import SoundManager from './SoundManager';

import GameActions from './Actions/GameActions';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.childs = [];
        this.onSoundLoad = this.onSoundLoad.bind(this);
    }

    componentDidMount() {
        this.bounds = new Phaser.Rectangle(0, 0, 860, 460);
        this.game = new Phaser.Game(this.bounds.width, this.bounds.height, Phaser.AUTO, 'open-hax-game', { preload: () => { this.preload(); }, create: () => { this.create(); }, update: () => { this.update(); } });
        GameActions.timerStart();
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
        this.game.world.setBounds(0, 0, 803, 403);

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
        this.player2 = new Player(this.game, materials.player, "away", "oasfsgfdhgdfgdjo", ":(", false);
        this.ball = new Ball(this.game, materials.ball);

        this.player.render(300, 300);
        this.player2.render(300, 50);
        this.ball.render(430, 300);

        this.field.addPlayer(this.player);
        this.field.addPlayer(this.player2);
        this.field.addPlayer(this.ball);

        this.childs.push(this.player);
        this.childs.push(this.player2);
        this.childs.push(this.ball);
    }

    update() {
    	this.childs.map((child) => {
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
        return  <div className="game">
                    <div id="open-hax-game"></div>
                    <Chat/>
                </div>;
    }

}

export default Game;
