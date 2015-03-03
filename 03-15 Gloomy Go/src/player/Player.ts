module Bolinha {

    export class Player extends Phaser.Sprite {

        movable: boolean = false;
        mouseFollowable: boolean = false;
        speed: number = 0;
        body: Phaser.Physics.P2.Body;
        collisionGroup: Phaser.Physics.P2.CollisionGroup;
        constantY: number;

        constructor(game: Phaser.Game, x: number, y: number, asset: any, frame: any = null) {

            super(game, x, y, asset, frame);

            this.constantY = y;
            this.anchor.setTo(0.5, 0);

            this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(this.toogleMovement, this);

            game.add.existing(this);



        }

        update() {
            this.movable ? this.move() : null;
            this.mouseFollowable ? this.mouseFollow() : null;

        }

        toogleMovement() {

            this.toogleMouseFollowable();
            this.movable = !this.movable;

            
        }

        enableMouseFollow() {
            if (!this.mouseFollowable) {
                this.toogleMouseFollowable();
            }
        }

        toogleMouseFollowable() {

            this.mouseFollowable = !this.mouseFollowable;
            this.game.canvas.style.cursor = this.mouseFollowable ? 'none' : 'default';

        }

        move() {

            this.y = this.constantY;

            if (this.body !== null && this.body !== undefined) {
                this.body.setZeroVelocity();

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT || Phaser.Keyboard.A)) {

                    this.body.moveLeft(this.speed);

                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                    this.body.moveRight(this.speed);

                }
            }

        }

        mouseFollow() {
            this.body.setZeroVelocity();
            /*this.body.setZeroVelocity();
            var speed = this.speed;

            if (this.game.input.mousePointer.x > this.x) {
                if (this.game.input.mousePointer.x - this.x > this.speed) 
                    speed = this.game.input.mousePointer.x - this.x;
                this.body.moveRight(speed);
            } else if (this.game.input.mousePointer.x < this.x) {
                if (this.x - this.game.input.mousePointer.x > this.speed)
                    speed = this.x - this.game.input.mousePointer.x;
                this.body.moveLeft(speed);
            } else {
                this.body.setZeroVelocity();
            }*/



            if ((this.game.input.mousePointer.x > this.game.world.centerX - 530) && (this.game.input.mousePointer.x < this.game.world.centerX + 530)) {
                this.body.x = this.game.input.mousePointer.x;
            } else {


                if (this.game.input.mousePointer.x < this.x + this.width/2) {
                    this.body.moveLeft(1000);
                } else if (this.game.input.mousePointer.x > this.x + this.width) {
                    this.body.moveRight(1000);
                }

            }

            
        }

    }

}