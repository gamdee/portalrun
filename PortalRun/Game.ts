module PortalRun {

    export class Game extends Phaser.Game {
        constructor() {

            super(800, 400, Phaser.AUTO, null, null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Play', Play, false);
            this.state.add('GameOver', GameOver, false);

            this.state.start('Boot');
        }
    }
}