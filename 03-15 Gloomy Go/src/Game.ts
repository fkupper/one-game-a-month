﻿module Bolinha {

    export class Game extends Phaser.Game {

        constructor() {

            //super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            super(1280, 720, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level1', Level1, false);

            this.state.start('Boot');

        }

    }

} 