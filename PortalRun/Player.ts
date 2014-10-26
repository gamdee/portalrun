module PortalRun {

    export class Player extends Phaser.Sprite {

        public static Velocity: number = 50;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'sprite', 'dude05.png');

            game.add.existing(this);
            game.physics.arcade.enable(this);

            this.animations.add('left', Phaser.Animation.generateFrameNames('dude0', 1, 4, '.png', 0), 10, true);
            this.animations.add('right', Phaser.Animation.generateFrameNames('dude0', 6, 9, '.png', 0), 10, true);

            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;

            this.animations.play('right');
        }

        update() {
        }
    }
}