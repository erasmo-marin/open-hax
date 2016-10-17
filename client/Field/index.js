class Field {

    constructor(game, material, style) {
        this.game = game;
        this.material = material;
        this.style = style;
        this.sprite = null;
        this.grass = null;
        this.graphics = null;
    }

    render() {
        let graphics = new Phaser.Graphics(0, 0);
        graphics.beginFill(this.style.backgroundColor, 0);
        graphics.lineStyle(this.style.borderSize, this.style.borderColor, this.style.borderAlpha);
        graphics.drawRect(0, 0, this.style.width, this.style.height);
        graphics.endFill();
        graphics.beginFill(this.style.backgroundColor);
        graphics.moveTo(this.style.width/2 , this.style.borderSize/2);
        graphics.lineTo(this.style.width/2 , this.style.height - this.style.borderSize/2);
        graphics.endFill();


        graphics.beginFill(this.style.backgroundColor, 0);
        graphics.drawCircle(this.style.width/2, this.style.height/2, 150);
        graphics.endFill();

        this.graphics = graphics;
        this.grass = this.game.add.tileSprite(this.style.x, this.style.y, this.style.width, this.style.height, 'field');
        this.sprite = this.game.add.sprite(this.style.x, this.style.y, this.graphics.generateTexture());

        //this.game.physics.p2.enable(this.sprite);
        //this.sprite.body.setMaterial(this.material);
        //this.sprite.body.mass = 0;
    }

    addPlayer(player) {
        this.sprite.addChild(player.sprite);
    }

    update() {

    }


}

export default Field;
