module PortalRun {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.spritesheet('player', 'assets/dude.png', 32, 48);
            this.load.spritesheet('portal', 'assets/portal.png', 102, 102);
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/ground.png');
            this.load.image('grass', 'assets/grass.png');
            this.load.image('startButton', 'assets/startButton.png');

            this.load.atlas('platform', 'assets/platform.png', 'assets/platform.txt');
            this.load.atlasXML('asteroids', 'assets/asteroids.png', 'assets/asteroids.xml');

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