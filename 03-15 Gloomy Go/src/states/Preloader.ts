module Bolinha {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        ready: boolean;

        preload() {

            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'progressBar');
            this.preloadBar.scale.set(4, 2);
            this.preloadBar.anchor.setTo(0.5, 0.5);

            this.load.setPreloadSprite(this.preloadBar);

            this.load.pack('game', 'assets/assets.json', null, this);

        }

        create() {

            this.ready = false;

        }


        update() {

            if (this.cache.isSoundDecoded('titleMusic') &&  this.ready == false) {
                this.ready = true;
                this.game.state.start('MainMenu');
                //this.game.state.start('Level1');
            }
        }

    }

}