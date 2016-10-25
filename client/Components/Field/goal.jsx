class Goal {

	constructor (game, collisions, props) {
		this.game = game;
		this.props = props;
		this.collisions = collisions;
		this.sprite = null;
	}


	render () {

		console.log("FROM ", this.props.x1, this.props.y1);
		console.log("TO ", this.props.x2, this.props.y2);

		//fix line expanding from center when static = true
		let startX = (this.props.x2 - this.props.x1)/2 + this.props.x1;
		let startY = (this.props.y2 - this.props.y1)/2 + this.props.y1;

                let graphics = new Phaser.Graphics(0, 0);
                graphics.moveTo(this.props.x1, this.props.y1);
                graphics.lineStyle(this.props.style.borderSize, this.props.style.borderColor, this.props.style.borderAlpha);
                graphics.lineTo(this.props.x2, this.props.y2);
                graphics.endFill();
                this.sprite = this.game.add.sprite(startX, startY, graphics.generateTexture());
                this.game.physics.p2.enable(this.sprite);
                this.sprite.body.static = true;
	}

	update () {

	}
}

export default Goal;