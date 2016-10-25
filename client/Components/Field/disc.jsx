class Disc {

	constructor (game, collisions, props) {
		this.game = game;
		this.props = props;
		this.collisions = collisions;
		this.sprite = null;
	}


	render () {

                let graphics = new Phaser.Graphics(0, 0);
                graphics.beginFill(this.props.style.backgroundColor, this.props.style.backgroundAlpha);
                graphics.lineStyle(this.props.style.borderSize, this.props.style.borderColor, this.props.style.borderAlpha);
                graphics.drawCircle(0, 0, this.props.diameter);
                graphics.endFill();
                this.sprite = this.game.add.sprite(this.props.x, this.props.y, graphics.generateTexture());
                this.game.physics.p2.enable(this.sprite);
                this.sprite.body.setCircle(this.props.diameter/2, 0, 0, 0);
                this.sprite.body.setCollisionGroup(this.collisions.groups.FOR_DISC);

                let collides = [];

                if(this.props.collidesWithBall) {
                	collides.push(this.collisions.groups.FOR_BALL);
                }

                if(this.props.collidesWithPlayer) {
                	collides.push(this.collisions.groups.FOR_PLAYER);
                }
                this.sprite.body.collides(collides);
                this.sprite.body.static = true;
	}

	update () {

	}
}

export default Disc;