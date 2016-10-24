
import React from 'react';

import Chat from './Components/ChatComponent';
import Field from './Components/Field';
import Line from './Components/Field/line';
import Circle from './Components/Field/circle';
import Player from './Components/Player';
import Ball from './Components/Ball';
import Room from './Components/Room';
import Collisions from './collisions';

import materials from './materials';
import SoundManager from './SoundManager';

import GameActions from './Actions/GameActions';


let lines = [
                {
                    x1: 30,
                    y1: 30 ,
                    x2: 830,
                    y2: 30,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 3,
                        borderAlpha: 1
                    }
                },
                {
                    x1: 830,
                    y1: 30,
                    x2: 830,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 3,
                        borderAlpha: 1
                    }
                },
                {
                    x1: 30,
                    y1: 430,
                    x2: 830,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 3,
                        borderAlpha: 1
                    }
                },
                {
                    x1: 30,
                    y1: 30 ,
                    x2: 30,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 3,
                        borderAlpha: 1
                    }
                },
                {
                    x1: 430 - 1.5,
                    y1: 30,
                    x2: 430 - 1.5,
                    y2: 430,
                    collidesWithBall: false,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 3,
                        borderAlpha: 1
                    }
                }
            ];

let circles = [{
                x: 860/2 -1.5,
                y: 460/2 - 1.5,
                diameter: 150,
                collidesWithBall: false,
                collidesWithPlayer: false,
                style: {
                    borderColor: 0xffffff,
                    borderSize: 3,
                    borderAlpha: 1
                }
            }];



class Game extends React.Component {

    constructor(props) {
        super(props);
        this.bounds = new Phaser.Rectangle(0, 0, 860, 460);
        this.childs = [];
        this.onSoundLoad = this.onSoundLoad.bind(this);
    }

    componentDidMount() {
        this.game = new Phaser.Game(this.bounds.width, this.bounds.height, Phaser.AUTO, 'open-hax-game', { preload: () => { this.preload(); }, create: () => { this.create(); }, update: () => { this.update(); } });
        if (this.props.params != null && this.props.params.id_room != null) {
            this.room = new Room(this.props.params.id_room);
            window.room = this.room;
        }

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
        this.game.world.setBounds(0, 0, this.bounds.width, this.bounds.height);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.75;
        this.collisions = new Collisions(this.game);
        this.game.physics.p2.updateBoundsCollisionGroup();

        materials.init(this.game);

        this.game.physics.p2.setWorldMaterial(materials.world, true, true, true, true);
        this.game.physics.p2.world.defaultContactMaterial.friction = 0.9;
        this.game.physics.p2.world.setGlobalStiffness(1e5);

        this.field = new Field(this.game, materials.field, {
            width: 800,
            height: 400,
            x: 30,
            y: 30
        });
        this.field.render();

        lines.map((props) => {
            let line = new Line(this.game, this.collisions, props);
            this.field.addLine(line);
        });

        circles.map((props) => {
            let circle = new Circle(this.game, this.collisions, props);
            this.field.addCircle(circle);
        });

        this.player = new Player(this.game, materials.player, this.collisions, "home", "ojo", ":)", true);
        this.player2 = new Player(this.game, materials.player, this.collisions, "away", "oasfsgfdhgdfgdjo", ":(", false);
        this.ball = new Ball(this.game, materials.ball, this.collisions);

        this.field.addPlayer(300, 300, this.player);
        this.field.addPlayer(300, 50, this.player2);
        this.field.addBall(430, 300, this.ball);

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
