module Bolinha {

    export class Boot extends Phaser.State {

        preload() {

            //  Here we load the assets required for our preloader (in this case a background and a loading bar)
            this.load.pack('preload', '../../assets/assets.json', null, this);

        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.game.stage.disableVisibilityChange = true;
            this.game.stage.smoothed = false;
            
            //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

            this.game.stage.backgroundColor = '#3498db';
            this.physics.startSystem(Phaser.Physics.P2JS);
            
            this.game.state.start('Preloader', true, false);

        }


    }

}