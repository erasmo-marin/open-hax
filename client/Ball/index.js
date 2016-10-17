class Ball {

    constructor(game, material) {

        this.game = game;
        this.material = material;
        this.graphics = null;
        this.sprite = null;
        this.color = 0xffffff;
        this.borderColor = 0x000000;
    }

    render(x, y) {

        this.graphics = new Phaser.Graphics(this.game);
        this.graphics.lineStyle(2, this.borderColor, 1);
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawCircle(20, 20, 20);

        this.sprite = this.game.add.sprite(x, y, this.graphics.generateTexture());
        this.sprite.smoothed = false;

        this.game.physics.p2.enable(this.sprite);
        this.sprite.body.setCircle(10, 0, 0, 0);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setMaterial(this.material);
        this.sprite.body.fixedRotation = true;
        this.sprite.body.damping = 0.5;
        this.sprite.body.mass = 0.8;
        this.sprite.body.fieldElementType = "ball";
    }

    update() {
        
    }
}

export default Ball;