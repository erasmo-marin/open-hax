class Materials {

	constructor() {
	    this.world = null;
	    this.player = null;
	    this.ball = null;
        this.field = null;

	    this.playersContact = null;
	    this.playerWorldContact = null;
	    this.playerBallContact = null;
	    this.ballWorldContact = null;
        this.ballFieldContact = null;
        this.playerFieldContact = null;
        this.playerBallContact = null;
	}


    init (game) {
        this.world = game.physics.p2.createMaterial('worldMaterial');
        this.player = game.physics.p2.createMaterial('playerMaterial');
        this.ball = game.physics.p2.createMaterial('ballMaterial');
        this.field = game.physics.p2.createMaterial('fieldMaterial');


        //PLAYERS
        this.playersContact = game.physics.p2.createContactMaterial(this.player, this.player);
        this.playersContact.friction = 1; // Friction to use in the contact of these two materials.
        this.playersContact.restitution = 1; // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
        this.playersContact.stiffness = 1e7; // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
        this.playersContact.relaxation = 3; // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
        this.playersContact.frictionStiffness = 1e7; // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
        this.playersContact.frictionRelaxation = 3; // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
        this.playersContact.surfaceVelocity = 0; // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right


        //PLAYER - WORLD
        this.playerWorldContact = game.physics.p2.createContactMaterial(this.player, this.world);
        this.playerWorldContact.friction = 0.3; 
        this.playerWorldContact.restitution = 0;
        //this.playerWorldContact.stiffness = 1e7;
        //this.playerWorldContact.relaxation = 3;
        //this.playerWorldContact.frictionStiffness = 1e7;
        //this.playerWorldContact.frictionRelaxation = 3;
        this.playerWorldContact.surfaceVelocity = 0;

        //PLAYER - FIELD
        this.playerFieldContact = game.physics.p2.createContactMaterial(this.player, this.field);
        this.playerFieldContact.friction = 0.5; 
        this.playerFieldContact.restitution = 0.9;
        this.playerFieldContact.stiffness = 1e7;
        this.playerFieldContact.relaxation = 3;
        this.playerFieldContact.frictionStiffness = 1e7;
        this.playerFieldContact.frictionRelaxation = 3;
        this.playerFieldContact.surfaceVelocity = 0;

        //BALL - FIELD
        this.ballFieldContact = game.physics.p2.createContactMaterial(this.ball, this.field);
        this.ballFieldContact.friction = 0.5; 
        this.ballFieldContact.restitution = 0.9;
        this.ballFieldContact.stiffness = 1e7;
        this.ballFieldContact.relaxation = 3;
        this.ballFieldContact.frictionStiffness = 1e7;
        this.ballFieldContact.frictionRelaxation = 3;
        this.ballFieldContact.surfaceVelocity = 0;

        //PLAYER - BALL
        this.playerBallContact = game.physics.p2.createContactMaterial(this.player, this.ball);
        //this.playerBallContact.friction = 0.5; 
        this.playerBallContact.restitution = 0.1;
        //this.playerBallContact.stiffness = 1e7;
        //this.playerBallContact.relaxation = 3;
        //this.playerBallContact.frictionStiffness = 1e7;
        //this.playerBallContact.frictionRelaxation = 3;
        //this.playerBallContact.surfaceVelocity = 0;


    }
}

const materials = new Materials();

export default materials;
