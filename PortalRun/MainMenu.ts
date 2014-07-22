module PortalRun {

    export class MainMenu extends Phaser.State {

        titleText: Phaser.BitmapText;
        backgroundGrass: Phaser.TileSprite;
        player: PortalRun.Player;
        ground: PortalRun.Ground;
        startButton: Phaser.Button;
        portals: PortalRun.Portal[];
        animationOn: boolean;

        firstPortalPositionX: number = 520;

        create() {
            this.game.stage.backgroundColor = '#222222';
            this.titleText = this.game.add.bitmapText(this.game.width / 2 - 60, 50, 'portalfont', 'Portal Run', 24);

            this.startButton = this.game.add.button(this.game.width / 2, 150, 'startButton', this.startClick, this);
            this.startButton.anchor.setTo(0.5, 0.5);

            this.ground = new PortalRun.Ground(this.game, 0, this.game.height - 32, this.game.width, 32);
            this.ground.autoScroll(-Player.Velocity, 0);

            this.backgroundGrass = this.game.add.tileSprite(0, 0, this.game.width, 21, 'grass');
            this.backgroundGrass.y = this.ground.y - this.backgroundGrass.height;
            this.backgroundGrass.autoScroll(-Player.Velocity, 0);

            this.player = new PortalRun.Player(this.game, 100, this.game.world.height - 150);

            this.portals = [];
            this.portals.push(new PortalRun.Portal(this.game, this.firstPortalPositionX, this.game.world.height - 50));
            this.portals.push(new PortalRun.Portal(this.game, this.game.width, this.game.world.height - 150));

            this.animationOn = true;

            var resetAnimationTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.resetAnimation, this);
            resetAnimationTimer.timer.start();
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.ground);

            if (this.animationOn) {
                for (var i = 0; i < this.portals.length; i++) {
                    var portal: PortalRun.Portal = this.portals[i];
                    if (portal.overlap(this.player) && Math.abs(this.player.world.x - portal.world.x) <= 2) {
                        var otherPortal = this.portals[1 - i];
                        this.player.x = otherPortal.world.x + 3;
                        this.player.y = Math.min(otherPortal.world.y, this.ground.world.y - this.player.height);
                        this.animationOn = false;
                        break;
                    }
                }
            }
        }

        shutdown() {
            this.titleText.destroy();
            this.backgroundGrass.destroy(true);
            this.ground.destroy(true);
            this.startButton.destroy();
            this.player.destroy();
            this.portals.forEach((portal) => { portal.destroy(); }, null);
        }

        resetAnimation() {
            this.player.x = 100;
            this.player.y = this.game.world.height - 150;
            this.portals[0].resetPosition(this.firstPortalPositionX, this.portals[0].y);
            this.portals[1].resetPosition(this.game.width, this.portals[1].y);
            this.animationOn = true;
        }

        startClick() {
            this.game.state.start('Play');
        }
    }

}