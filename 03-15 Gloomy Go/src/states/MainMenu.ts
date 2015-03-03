module Bolinha {

    export class MainMenu extends Phaser.State {

        playButton: Phaser.Button;
        muteButton: Phaser.Button;
        title: Phaser.Sprite;
        music: Phaser.Sound;

        create() {

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

        }

        fadeOut() {

            this.add.tween(this.playButton).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.title).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        }

        startGame() {

            this.music.stop();

            this.game.state.start('Level1');
        }

        toggleSound() {
            this.sound.mute = !this.sound.mute;
            this.muteButton.frame = this.sound.mute ? 1 : 0;	

        }
        

    }

}