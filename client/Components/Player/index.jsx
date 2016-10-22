class Player {

    constructor(game, material, type, nickname, avatar, isMe) {

        this.game = game;
        this.avatar = avatar;
        this.nickname = nickname;
        this.isMe = isMe;
        this.material = material;
        this.resultantVelocity = 100;
        this.maxVelocity = 100;
        this.ballBody = null;

        this.graphics = null;
        this.sprite = null;
        this.nicknameText = null;
        this.avatarText = null;

        if (type == "home") {
            this.color = 0xea4141;
        } else {
            this.color = 0x2d7eff;
        }

        this.borderColor = 0x000000;
        this.activeBorderColor = 0xffffff;

        this.cursors = game.input.keyboard.createCursorKeys();
        this.cursors.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);

        this.touchingBall = false;

    }

    render(x, y) {

        this.graphics = this.renderGraphics();
        this.sprite = this.game.make.sprite(x, y, this.graphics.generateTexture());
        this.sprite.smoothed = false;

        this.game.physics.p2.enable(this.sprite);
        this.sprite.body.setCircle(15, 0, 0, 0);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setMaterial(this.material);
        this.sprite.body.fixedRotation = true;
        this.sprite.body.damping = 0.8;
        this.sprite.body.fieldElementType = "player";



        this.sprite.body.onBeginContact.add((contactBody) => {
            if(contactBody && contactBody.fieldElementType == "ball") {
                this.ballBody = contactBody;
                this.touchingBall = true;
            }
        }, this);

        this.sprite.body.onEndContact.add(() => {
            this.touchingBall = false;
        }, this);

        let style = {
            font: "14px Arial",
            fill: "#ffffff",
            wordWrap: false,
            align: "left"
        };

        let style2 = {
            font: "15px Arial",
            fill: "#ffffff",
            wordWrap: false,
            align: "left",
            fontWeight: 500
        }

        if (!this.isMe) {
            this.nicknameText = new Phaser.Text(this.game, 0, 20, this.nickname, style);
            this.nicknameText.x = 0 - this.nicknameText.width/2;
            this.sprite.addChild(this.nicknameText);
        }

        this.avatarText = new Phaser.Text(this.game, 0, -10, this.avatar, style2);
        this.avatarText.x = 0 - this.avatarText.width/2;
        //this.avatarText.anchor.set(0.5);
        this.sprite.addChild(this.avatarText);

    }


    renderGraphics(active) {

        let border = (active) ? this.activeBorderColor : this.borderColor;
        let graphics = new Phaser.Graphics(this.game);

        graphics.lineStyle(2, border, 1);
        graphics.beginFill(this.color, 1);
        graphics.drawCircle(30, 30, 30);

        if (this.isMe) {
            graphics.endFill();
            graphics.lineStyle(3, 0xffffff, 0.2);
            graphics.beginFill(this.color, 0);
            graphics.drawCircle(30, 30, 50);
        }


        return graphics;
    }

    //FIXME: Different acceleration values when forces applyed in two axes at the same time
    update() {

        this.constrainVelocity(this.sprite, 10);

        if (this.isMe) {

            if (this.cursors.left.isDown) {
                this.sprite.body.angle = 270;
                this.sprite.body.thrust(200);
            } else if (this.cursors.right.isDown) {
                this.sprite.body.angle = 90;
                this.sprite.body.thrust(200);
            }

            if (this.cursors.up.isDown) {
                this.sprite.body.angle = 0;
                this.sprite.body.thrust(200);
            } else if (this.cursors.down.isDown) {
                this.sprite.body.angle = 180;
                this.sprite.body.thrust(200);
            }

            if (this.cursors.x.isDown && this.touchingBall && this.ballBody) {

                let p2 = this.ballBody;
                let p1 = this.sprite.body;


                let a = Math.abs(p1.x - p2.x);
                let b = Math.abs(p1.y - p2.y);
                let alpha = Math.atan(a/b) * (180/3.14159);

                /*Cuadrant adjustment*/
                if (p1.y < p2.y && p1.x < p2.x) {
                    alpha = 180 - alpha;
                }

                if (p1.x > p2.x && p1.y < p2.y) {
                    alpha =  alpha + 180;
                }

                if (p1.x > p2.x && p1.y > p2.y) {
                    alpha =  360 - alpha;
                }
                this.ballBody.angle = alpha;
                this.ballBody.thrust(4000);
                this.game.sound.play("kick");
            }



            /*if(velocity.x != 0 && velocity.y != 0) {
                let res = Math.pow(this.resultantVelocity,2);
                res = Math.sqrt(res/2);
                velocity.x = (velocity.x < 0) ? -1*res : res;
                velocity.y = (velocity.y < 0) ? -1*res : res;
            }

            this.sprite.body.velocity.x = velocity.x;
            this.sprite.body.velocity.y = velocity.y;*/


            if (this.cursors.x.isDown) {
                this.sprite.loadTexture(this.renderGraphics(true).generateTexture());
            } else {
                this.sprite.loadTexture(this.renderGraphics(false).generateTexture());
            }
        }

    }

    constrainVelocity(sprite, maxVelocity) {
        let body = sprite.body
        let angle, currVelocitySqr, vx, vy;
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.data.velocity[0] = vx;
            body.data.velocity[1] = vy;
        }
    }
}

export default Player;
