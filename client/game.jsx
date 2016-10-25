
import React from 'react';

import Chat from './Components/ChatComponent';
import Field from './Components/Field';
import Line from './Components/Field/line';
import Circle from './Components/Field/circle';
import Disc from './Components/Field/disc';
import Arc from './Components/Field/arc';
import Goal from './Components/Field/goal';
import Player from './Components/Player';
import Ball from './Components/Ball';
import Room from './Components/Room';
import Collisions from './collisions';

import materials from './materials';
import SoundManager from './SoundManager';

import GameActions from './Actions/GameActions';

//small stadium theme
let lines = [
                //line up
                {
                    x1: 30,
                    y1: 30,
                    x2: 830,
                    y2: 30,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line right 1
                {
                    x1: 830,
                    y1: 30,
                    x2: 830,
                    y2: 160,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line right 2
                {
                    x1: 830,
                    y1: 300,
                    x2: 830,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line down
                {
                    x1: 30,
                    y1: 430,
                    x2: 830,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line left 1
                {
                    x1: 30,
                    y1: 30,
                    x2: 30,
                    y2: 160,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line left 2
                {
                    x1: 30,
                    y1: 300,
                    x2: 30,
                    y2: 430,
                    collidesWithBall: true,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                },
                //line middle field
                {
                    x1: 430 - 1,
                    y1: 30,
                    x2: 430 - 1,
                    y2: 430,
                    collidesWithBall: false,
                    collidesWithPlayer: false,
                    style: {
                        borderColor: 0xffffff,
                        borderSize: 2,
                        borderAlpha: 1
                    }
                }
            ];

let circles = [{
                x: 860/2 -1,
                y: 460/2 - 1,
                diameter: 150,
                collidesWithBall: false,
                collidesWithPlayer: false,
                style: {
                    borderColor: 0xffffff,
                    borderSize: 2,
                    borderAlpha: 1
                }
            }];

let discs = [{
                x: 30,
                y: 160,
                diameter: 15,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    backgroundColor: 0xff0000,
                    backgroundAlpha: 1,
                    borderColor: 0x000000,
                    borderSize: 2,
                    borderAlpha: 1
                }
            },
            {
                x: 30,
                y: 300,
                diameter: 15,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    backgroundColor: 0xff0000,
                    backgroundAlpha: 1,
                    borderColor: 0x000000,
                    borderSize: 2,
                    borderAlpha: 1
                }
            },
            {
                x: 830,
                y: 160,
                diameter: 15,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    backgroundColor: 0x0000ff,
                    backgroundAlpha: 1,
                    borderColor: 0x000000,
                    borderSize: 2,
                    borderAlpha: 1
                }
            },
            {
                x: 830,
                y: 300,
                diameter: 15,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    backgroundColor: 0x0000ff,
                    backgroundAlpha: 1,
                    borderColor: 0x000000,
                    borderSize: 2,
                    borderAlpha: 1
                }
            }];

let arcs = [{
                cx: 10,
                cy: 160,
                radius: 140,
                startAngle: 150,
                endAngle: 210,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    borderColor: 0x000000,
                    borderSize: 3,
                    borderAlpha: 1
                }
            },{
                cx: 827,
                cy: 160,
                radius: 140,
                startAngle: 330,
                endAngle: 30,
                collidesWithBall: true,
                collidesWithPlayer: true,
                style: {
                    borderColor: 0x000000,
                    borderSize: 3,
                    borderAlpha: 1
                }
            }]

let ball = {

            };


//if the ball cross those lines, it's a goal
let goals = {
    home: {
        x1: 30,
        y1: 160,
        x2: 30,
        y2: 300,
        style: {
            borderColor: 0xffffff,
            borderSize: 2,
            borderAlpha: 1
        }
    },
    away: {
        x1: 830,
        y1: 160,
        x2: 830,
        y2: 300,
        style: {
            borderColor: 0xffffff,
            borderSize: 2,
            borderAlpha: 1
        }
    }

}



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
        this.game.load.image('field', '/img/grass.png');
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

        arcs.map((props) => {
            let arc = new Arc(this.game, this.collisions, props);
            this.field.addArc(arc);
        });

        //goal home
        goals.home.home = true;
        let goalHome = new Goal(this.game, this.collisions, goals.home);
        this.field.addGoal(goalHome);

        //goal away
        goals.away.away = true;
        let goalAway = new Goal(this.game, this.collisions, goals.away);
        this.field.addGoal(goalAway);

        discs.map((props) => {
            let disc = new Disc(this.game, this.collisions, props);
            this.field.addDisc(disc);
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
