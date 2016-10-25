class Collisions {

	constructor(game) {
		this.game = game;
		this.groups = {
			FOR_BALL: this.game.physics.p2.createCollisionGroup(),
			FOR_PLAYER: this.game.physics.p2.createCollisionGroup(),
			FOR_LINE: this.game.physics.p2.createCollisionGroup(),
			FOR_GOAL: this.game.physics.p2.createCollisionGroup(),
			FOR_DISC: this.game.physics.p2.createCollisionGroup(),
			FOR_CIRCLE: this.game.physics.p2.createCollisionGroup(),
			FOR_ARC: this.game.physics.p2.createCollisionGroup()
		}

	}
}

export default Collisions;