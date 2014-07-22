module PortalRun {

    export class Player extends Phaser.Sprite {

        public static Velocity: number = 50;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'player', 0);

            game.add.existing(this);
            game.physics.arcade.enable(this);

            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);

            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;

            this.animations.play('right');
        }

        update() {
        }
    }
}