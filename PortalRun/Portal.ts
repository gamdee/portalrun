module PortalRun {

    export class Portal extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'portal');

            this.anchor.setTo(0.5, 0.5);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.animations.add('warp', null, 10, true);
            this.animations.play('warp');

            this.body.allowGravity = false;
            this.body.immovable = true;

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            this.resetVelocity();
        }

        update() {
        }

        resetPosition(x: number, y: number) {
            this.reset(x, y);
            this.resetVelocity();
        }

        resetVelocity() {
            this.body.velocity.x = Play.GlobalVelocity;
        }
    }

}