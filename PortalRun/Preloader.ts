module PortalRun {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.atlasJSONArray('sprite', 'assets/sprite.png', 'assets/sprite.json');

            this.load.bitmapFont('portalfont', 'assets/font/font.png', 'assets/font/font.fnt');

            this.load.audio('deathSound', 'assets/death.mp3');
            this.load.audio('portalSound', 'assets/portal.mp3');
            this.load.audio('warpSound', 'assets/warp.mp3');
            this.load.audio('scoreSound', 'assets/score.mp3');
        }

        create() {
            this.startMainMenu();
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}