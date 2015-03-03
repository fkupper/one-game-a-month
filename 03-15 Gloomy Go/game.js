window.onload = function () {
    var game = new Bolinha.Game();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bolinha;
(function (Bolinha) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(game, x, y, asset, frame) {
            if (typeof frame === "undefined") { frame = null; }
            _super.call(this, game, x, y, asset, frame);
            this.movable = false;
            this.bounceable = false;
            this.speed = 0;
            this.movingUp = 0;
            this.movingDown = 0;
            this.movingRight = 0;
            this.movingLeft = 0;

            this.anchor.setTo(0.5, 0);

            game.add.existing(this);
        }
        Ball.prototype.update = function () {
        };

        Ball.prototype.enableBounce = function (startBounceX, startBounceY, context) {
            if (typeof startBounceX === "undefined") { startBounceX = 0; }
            if (typeof startBounceY === "undefined") { startBounceY = 0; }
            if (typeof context === "undefined") { context = this; }
            this.bounceable = true;

            this.body.moveDown(this.speed);
        };

        Ball.prototype.bounce = function () {
            this.body.moveForward(this.speed);
        };
        return Ball;
    })(Phaser.Sprite);
    Bolinha.Ball = Ball;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1280, 720, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Bolinha.Boot, false);
            this.state.add('Preloader', Bolinha.Preloader, false);
            this.state.add('MainMenu', Bolinha.MainMenu, false);
            this.state.add('Level1', Bolinha.Level1, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Bolinha.Game = Game;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, asset, frame) {
            if (typeof frame === "undefined") { frame = null; }
            _super.call(this, game, x, y, asset, frame);
            this.movable = false;
            this.mouseFollowable = false;
            this.speed = 0;

            this.constantY = y;
            this.anchor.setTo(0.5, 0);

            this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(this.toogleMovement, this);

            game.add.existing(this);
        }
        Player.prototype.update = function () {
            this.movable ? this.move() : null;
            this.mouseFollowable ? this.mouseFollow() : null;
        };

        Player.prototype.toogleMovement = function () {
            this.toogleMouseFollowable();
            this.movable = !this.movable;
        };

        Player.prototype.enableMouseFollow = function () {
            if (!this.mouseFollowable) {
                this.toogleMouseFollowable();
            }
        };

        Player.prototype.toogleMouseFollowable = function () {
            this.mouseFollowable = !this.mouseFollowable;
            this.game.canvas.style.cursor = this.mouseFollowable ? 'none' : 'default';
        };

        Player.prototype.move = function () {
            this.y = this.constantY;

            if (this.body !== null && this.body !== undefined) {
                this.body.setZeroVelocity();

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT || Phaser.Keyboard.A)) {
                    this.body.moveLeft(this.speed);
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.moveRight(this.speed);
                }
            }
        };

        Player.prototype.mouseFollow = function () {
            this.body.setZeroVelocity();

            if ((this.game.input.mousePointer.x > this.game.world.centerX - 530) && (this.game.input.mousePointer.x < this.game.world.centerX + 530)) {
                this.body.x = this.game.input.mousePointer.x;
            } else {
                if (this.game.input.mousePointer.x < this.x + this.width / 2) {
                    this.body.moveLeft(1000);
                } else if (this.game.input.mousePointer.x > this.x + this.width) {
                    this.body.moveRight(1000);
                }
            }
        };
        return Player;
    })(Phaser.Sprite);
    Bolinha.Player = Player;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.pack('preload', '../../assets/assets.json', null, this);
        };

        Boot.prototype.create = function () {
            this.input.maxPointers = 1;

            this.game.stage.disableVisibilityChange = true;
            this.game.stage.smoothed = false;

            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

            this.game.stage.backgroundColor = '#3498db';
            this.physics.startSystem(Phaser.Physics.P2JS);

            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Bolinha.Boot = Boot;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
            this.collisionGroups = [];
            this.stageWalls = 'stageWalls';
            this.wallsOffset = 600;
        }
        Level1.prototype.create = function () {
            this.game.physics.p2.setBoundsToWorld();
            this.game.physics.p2.setImpactEvents(true);

            this.player = new Bolinha.Player(this.game, this.game.world.centerX, this.game.world.height - 25, 'items', 'springboardDown.png');
            this.player.scale.set(1.5, 1);
            this.game.physics.p2.enable(this.player, Bolinha.Util.debug);
            this.player.body.setRectangle(this.player.width, this.player.height / 2, 0, 10);
            this.player.body.collideWorldBounds = true;
            this.player.enableMouseFollow();
            this.player.speed = 1000;
            this.player.collisionGroup = this.game.physics.p2.createCollisionGroup();
            this.player.body.setCollisionGroup(this.player.collisionGroup);
            this.player.body.fixedRotation = true;

            this.ball = new Bolinha.Ball(this.game, this.game.world.centerX, this.game.world.centerY, 'alienPink_badge1');
            this.game.physics.p2.enable(this.ball, Bolinha.Util.debug);
            this.ball.body.setCircle(this.ball.width / 2);
            this.ball.collisionGroup = this.game.physics.p2.createCollisionGroup();
            this.ball.body.setCollisionGroup(this.ball.collisionGroup);
            this.ball.body.fixedRotation = true;
            this.ball.speed = 500;
            this.ball.enableBounce(0, 1, this);

            this.wallsCollisionGroup = this.game.physics.p2.createCollisionGroup();

            var leftWall = this.game.add.sprite(this.game.world.centerX - this.wallsOffset, this.game.world.centerY, 'base', 'castleCenter.png');
            leftWall.height = this.game.world.height;
            var topWall = this.game.add.sprite(this.game.world.centerX, 0, 'base', 'castleCenter.png');
            topWall.width = this.wallsOffset * 2 - 70;
            topWall.anchor.set(0.5, 1);
            var rightWall = this.game.add.sprite(this.game.world.centerX + this.wallsOffset, this.game.world.centerY, 'base', 'castleCenter.png');
            rightWall.height = this.game.world.height;

            this.game.physics.p2.enable(leftWall, Bolinha.Util.debug);
            leftWall.body.setCollisionGroup(this.wallsCollisionGroup);
            leftWall.body.collides(this.player.collisionGroup);
            leftWall.body.collides(this.ball.collisionGroup);
            leftWall.body.dynamic = false;
            this.game.physics.p2.enable(rightWall, Bolinha.Util.debug);
            rightWall.body.setCollisionGroup(this.wallsCollisionGroup);
            rightWall.body.collides(this.player.collisionGroup);
            rightWall.body.collides(this.ball.collisionGroup);

            rightWall.body.dynamic = false;
            this.game.physics.p2.enable(topWall, Bolinha.Util.debug);
            topWall.body.setCollisionGroup(this.wallsCollisionGroup);
            topWall.body.collides(this.player.collisionGroup);
            topWall.body.collides(this.ball.collisionGroup);
            topWall.body.dynamic = false;

            this.collisionGroups.push(this.wallsCollisionGroup);
            this.collisionGroups.push(this.player.collisionGroup);
            this.collisionGroups.push(this.ball.collisionGroup);

            this.player.body.collides(this.collisionGroups);
            this.ball.body.collides(this.collisionGroups, this.hit, this);

            this.ball.body.damping = 0;
            this.ball.body.mass = 0.1;

            this.game.physics.p2.restitution = 1.01;

            this.game.debug.text('player created', 32, 32);
        };

        Level1.prototype.hit = function (body, shapeA, shapeB, equation, a) {
            this.game.debug.text('ball hit!', 32, 32);
        };
        return Level1;
    })(Phaser.State);
    Bolinha.Level1 = Level1;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.sound.mute = true;

            this.music = this.add.audio('titleMusic');
            this.music.play();

            this.title = this.add.sprite(this.world.centerX, this.world.centerY, 'titlepage');
            this.title.y = this.world.centerY - this.title.height - 20;
            this.title.anchor.setTo(0.5, 1);

            this.playButton = this.add.button(this.world.centerX, this.title.y + 20, 'base', this.fadeOut, this, 'boxItem.png', 'boxItemAlt.png', 'boxItemAlt_disabled.png', 'boxItemAlt_disabled.png');
            this.playButton.anchor.setTo(0.5, 0);

            this.muteButton = this.add.button(20, 20, 'mute', this.toggleSound, this);
            this.muteButton.input.useHandCursor = true;

            if (this.sound.mute) {
                this.muteButton.frame = 1;
            }
        };

        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.playButton).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.title).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        };

        MainMenu.prototype.startGame = function () {
            this.music.stop();

            this.game.state.start('Level1');
        };

        MainMenu.prototype.toggleSound = function () {
            this.sound.mute = !this.sound.mute;
            this.muteButton.frame = this.sound.mute ? 1 : 0;
        };
        return MainMenu;
    })(Phaser.State);
    Bolinha.MainMenu = MainMenu;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'progressBar');
            this.preloadBar.scale.set(4, 2);
            this.preloadBar.anchor.setTo(0.5, 0.5);

            this.load.setPreloadSprite(this.preloadBar);

            this.load.pack('game', 'assets/assets.json', null, this);
        };

        Preloader.prototype.create = function () {
            this.ready = false;
        };

        Preloader.prototype.update = function () {
            if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
                this.ready = true;
                this.game.state.start('MainMenu');
            }
        };
        return Preloader;
    })(Phaser.State);
    Bolinha.Preloader = Preloader;
})(Bolinha || (Bolinha = {}));
var Bolinha;
(function (Bolinha) {
    var Util = (function () {
        function Util() {
        }
        Util.debug = false;
        return Util;
    })();
    Bolinha.Util = Util;
})(Bolinha || (Bolinha = {}));
//# sourceMappingURL=game.js.map
