module Bolinha {

    export class Level1 extends Phaser.State {

        collisionGroups: Array<Phaser.Physics.P2.CollisionGroup> = [];
        player: Player;
        ball: Ball;
        stageWalls: string = 'stageWalls';
        private wallsOffset: number = 600;
        //walls: Phaser.Group;
        wallsCollisionGroup: Phaser.Physics.P2.CollisionGroup;

        create() {


            this.game.physics.p2.setBoundsToWorld();
            this.game.physics.p2.setImpactEvents(true);


            // PLAYER
            this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 25, 'items', 'springboardDown.png');
            this.player.scale.set(1.5, 1);
            this.game.physics.p2.enable(this.player, Util.debug);
            this.player.body.setRectangle(this.player.width, this.player.height / 2, 0, 10);
            this.player.body.collideWorldBounds = true;
            this.player.enableMouseFollow();
            this.player.speed = 1000;
            this.player.collisionGroup = this.game.physics.p2.createCollisionGroup();
            this.player.body.setCollisionGroup(this.player.collisionGroup);
            this.player.body.fixedRotation = true;


            //BALL
            this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, 'alienPink_badge1');
            this.game.physics.p2.enable(this.ball, Util.debug);
            this.ball.body.setCircle(this.ball.width / 2);
            this.ball.collisionGroup = this.game.physics.p2.createCollisionGroup();
            this.ball.body.setCollisionGroup(this.ball.collisionGroup);
            this.ball.body.fixedRotation = true;
            this.ball.speed = 500;
            this.ball.enableBounce(0, 1, this);

            //WALLS
            this.wallsCollisionGroup = this.game.physics.p2.createCollisionGroup();


            var leftWall = this.game.add.sprite(this.game.world.centerX - this.wallsOffset, this.game.world.centerY, 'base', 'castleCenter.png');
            leftWall.height = this.game.world.height;
            var topWall = this.game.add.sprite(this.game.world.centerX, 0, 'base', 'castleCenter.png');
            topWall.width = this.wallsOffset * 2 - 70;
            topWall.anchor.set(0.5, 1);
            var rightWall = this.game.add.sprite(this.game.world.centerX + this.wallsOffset, this.game.world.centerY, 'base', 'castleCenter.png');
            rightWall.height = this.game.world.height;
            
            this.game.physics.p2.enable(leftWall, Util.debug);
            leftWall.body.setCollisionGroup(this.wallsCollisionGroup);
            leftWall.body.collides(this.player.collisionGroup);
            leftWall.body.collides(this.ball.collisionGroup);
            leftWall.body.dynamic = false;
            this.game.physics.p2.enable(rightWall, Util.debug);
            rightWall.body.setCollisionGroup(this.wallsCollisionGroup);
            rightWall.body.collides(this.player.collisionGroup);
            rightWall.body.collides(this.ball.collisionGroup);

            rightWall.body.dynamic = false;
            this.game.physics.p2.enable(topWall, Util.debug);
            topWall.body.setCollisionGroup(this.wallsCollisionGroup);
            topWall.body.collides(this.player.collisionGroup);
            topWall.body.collides(this.ball.collisionGroup);
            topWall.body.dynamic = false;


            //COLLISION GROUPS
            this.collisionGroups.push(this.wallsCollisionGroup);
            this.collisionGroups.push(this.player.collisionGroup);
            this.collisionGroups.push(this.ball.collisionGroup);

            this.player.body.collides(this.collisionGroups);
            this.ball.body.collides(this.collisionGroups, this.hit, this);

            this.ball.body.damping = 0;
            this.ball.body.mass = 0.1;

            this.game.physics.p2.restitution = 1.01;

            this.game.debug.text('player created', 32, 32);
            

        }

        hit(body: any, shapeA: any, shapeB: any, equation: any, a:any) {
            this.game.debug.text('ball hit!', 32, 32);

        }

        


    }

}

