module Bolinha {

    export class Ball extends Phaser.Sprite {

        movable: boolean = false;
        bounceable: boolean = false;
        speed: number = 0;
        body: Phaser.Physics.P2.Body;
        collisionGroup: Phaser.Physics.P2.CollisionGroup;
        movingUp: number = 0;
        movingDown: number = 0;
        movingRight: number = 0;
        movingLeft: number = 0;


        constructor(game: Phaser.Game, x: number, y: number, asset: any, frame: any = null) {

            super(game, x, y, asset, frame);

            this.anchor.setTo(0.5, 0);

            game.add.existing(this);



        }

        update() {
            //this.bounceable ? this.bounce() : null;

        }

        enableBounce(startBounceX: number = 0, startBounceY: number = 0, context: any = this) {
            this.bounceable = true;
            //this.body.angle = 180;
            this.body.moveDown(this.speed);

        }
               

        bounce() {

            this.body.moveForward(this.speed);
        }
        
    }

}