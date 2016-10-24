class Field {

    constructor(game, material, style) {
        this.game = game;
        this.material = material;
        this.style = style;
        this.sprite = null;
        this.grass = null;
        this.graphics = null;
        this.lines = [];
        this.circles = [];
        this.goals = [];
        this.discs = [];
        this.players = [];
        this.ball = null;
    }

    render() {
        /*let graphics = new Phaser.Graphics(0, 0);
        graphics.beginFill(this.style.backgroundColor, 0);
        graphics.lineStyle(this.style.borderSize, this.style.borderColor, this.style.borderAlpha);
        graphics.drawCircle(this.style.width/2 - this.style.x, this.style.height/2 - this.style.y, 150);
        graphics.endFill();*/

        //this.graphics = graphics;
        this.grass = this.game.add.tileSprite(this.style.x, this.style.y, this.style.width, this.style.height, 'field');
        //this.sprite = this.game.add.sprite(this.style.width/2, this.style.height/2, this.graphics.generateTexture());
    }

    addPlayer(x, y, player) {
        this.players.push(player);
        player.render(x, y);
    }

    addLine(line) {
        this.lines.push(line);
        line.render();
    }

    addGoal(x, y,goal) {
        this.goals.push(goal);
       goal.render(x, y);
    }

    addDisc(x, y, disc) {
        this.discs.push(disc);
        disc.render(x, y);
    }

    addBall(x, y, ball) {
        this.ball = ball;
        ball.render(x, y);
    }

    addCircle(circle) {
        this.circles.push(circle);
        circle.render();
    }


    update() {

    }


}

export default Field;
