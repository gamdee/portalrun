module PortalRun {

    export class GameOver extends Phaser.State {

        backgroundGrass: Phaser.TileSprite;
        ground: PortalRun.Ground;
        deadPlayer: Phaser.Sprite;
        score: number;
        scoreText: Phaser.BitmapText;
        replayText: Phaser.BitmapText;

        init(score: number) {
            this.score = score;
        }

        create() {
            this.deadPlayer = this.game.add.sprite(this.game.width / 2, this.game.height - 32, 'player', 5);
            this.deadPlayer.anchor.setTo(0.5, 0.5);
            this.deadPlayer.angle = 90;

            this.ground = new PortalRun.Ground(this.game, 0, this.game.height - 32, this.game.width, 32);

            this.backgroundGrass = this.game.add.tileSprite(0, 0, this.game.width, 21, 'grass');
            this.backgroundGrass.y = this.ground.y - this.backgroundGrass.height;

            this.scoreText = this.game.add.bitmapText(this.game.width / 2 - 60, 100, 'portalfont', 'Score: ' + this.score.toString(), 24);
            this.replayText = this.game.add.bitmapText(this.game.width / 2 - 120, 200, 'portalfont', 'Tap anywhere to play again', 16);

            this.input.onDown.add(() => { this.game.state.start('Play'); }, this);
        }

        shutdown() {
            this.deadPlayer.destroy();
            this.ground.destroy(true);
            this.backgroundGrass.destroy(true);
            this.scoreText.destroy();
            this.replayText.destroy();
        }

        update() {
        }
    }
}