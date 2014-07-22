module PortalRun {

    export class Play extends Phaser.State {

        backgroundSky: Phaser.TileSprite;
        backgroundMoon: Phaser.Sprite;
        backgroundStars: Phaser.Group;
        backgroundGrass: Phaser.TileSprite;

        player: PortalRun.Player;
        ground: PortalRun.Ground;
        cursors: Phaser.CursorKeys;
        spikes: Phaser.Group;
        portals: Phaser.Group;
        spikeGenerator: Phaser.TimerEvent;
        score: number;
        scoreText: Phaser.BitmapText;
        deathSound: Phaser.Sound;
        portalSound: Phaser.Sound;
        warpSound: Phaser.Sound;
        scoreSound: Phaser.Sound;

        public static GlobalVelocity: number = -200;

        create() {

            // add background objects
            this.backgroundSky = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');

            this.backgroundStars = this.game.add.spriteBatch(this.game.world);
            var numStarGroups: number = this.game.rnd.integerInRange(10, 20);
            for (var i = 0; i < numStarGroups; i++) {
                var x = this.game.rnd.integerInRange(0, this.game.width);
                var y = this.game.rnd.integerInRange(0, this.game.height);
                var r = this.game.rnd.integerInRange(0, 4);
                var starGroup: Phaser.Sprite = this.add.sprite(x, y, 'platform', 'stars');
                starGroup.angle = r * 90;
                this.backgroundStars.add(starGroup);
            }

            this.backgroundMoon = this.add.sprite(this.game.width - 50, 50, 'platform', 'moon');
            this.backgroundMoon.anchor.setTo(0.5, 0.5);

            this.score = 0;
            this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'portalfont', this.score.toString(), 24);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new PortalRun.Player(this.game, 32, this.game.world.height - 150);

            this.ground = new PortalRun.Ground(this.game, 0, this.game.height - 32, this.game.width, 32);
            this.ground.autoScroll(-Player.Velocity, 0);

            this.backgroundGrass = this.game.add.tileSprite(0, 0, this.game.width, 21, 'grass');
            this.backgroundGrass.y = this.ground.y - this.backgroundGrass.height;
            this.backgroundGrass.autoScroll(-Player.Velocity, 0);

            this.deathSound = this.game.add.audio('deathSound', 1, false);
            this.portalSound = this.game.add.audio('portalSound', 1, false);
            this.warpSound = this.game.add.audio('warpSound', 1, false);
            this.scoreSound = this.game.add.audio('scoreSound', 1, false);

            this.spikes = this.game.add.group();
            this.portals = this.game.add.group();

            this.spikeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.generateSpikes, this);
            this.spikeGenerator.timer.start();

            // add mouse/touch controls
            this.input.onDown.add(this.createPortal, this);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.ground);

            var numPortalExists = 0;
            this.portals.forEachExists(() => { numPortalExists++; }, null);

            if (numPortalExists == 2) {
                for (var i = 0; i < 2; i++) {
                    var portal: PortalRun.Portal = this.portals.getAt(i);
                    if (portal.overlap(this.player) && Math.abs(this.player.world.x - portal.world.x) <= 2) {
                        var otherPortal = this.portals.getAt(1 - i);
                        this.player.x = otherPortal.world.x + 3;
                        this.player.y = Math.min(otherPortal.world.y, this.ground.world.y - this.player.height);
                        this.warpSound.play();
                        break;
                    }
                }
            }

            this.spikes.forEach((spike: PortalRun.Spike) => {
                this.checkScore(spike);
                this.game.physics.arcade.collide(this.player, spike, () => {
                    this.deathSound.play();
                    this.game.state.start('GameOver', true, false, this.score);
                }, null, this);
            }, null);
        }

        shutdown() {
            this.player.destroy();
            this.ground.destroy(true);
            this.spikes.destroy();
            this.scoreText.destroy();
            this.backgroundSky.destroy(true);
            this.backgroundMoon.destroy(true);
            this.backgroundStars.destroy(true);
            this.backgroundGrass.destroy(true);
        }

        checkScore(spike: PortalRun.Spike) {
            if (spike.exists && !spike.hasScored && spike.world.x <= this.player.world.x) {
                spike.hasScored = true;
                this.scoreSound.play();
                this.score++;
                this.scoreText.setText(this.score.toString());
            }
        }

        createPortal() {
            var px = this.game.input.x;
            var py = this.game.input.y;

            this.portalSound.play();

            // If haven't made 2 portals then just create new one
            if (this.portals.length < 2) {
                portal = new Portal(this.game, px, py);
                this.portals.add(portal);
            }
            else {
                // Recycle
                var portal: PortalRun.Portal = this.portals.getFirstExists(false);
                if (!portal) { // If both are still visible then reset the first one
                    portal = this.portals.getAt(0);
                }
                
                // Reposition recycled item to the end of the group
                this.portals.remove(portal, false);
                this.portals.add(portal);

                portal.resetPosition(this.game.input.x, this.game.input.y);
            }
        }

        generateSpikes() {
            var pipeY = this.game.rnd.integerInRange(100, this.game.height);
            var spike: PortalRun.Spike = this.spikes.getFirstExists(false);

            if (!spike) {
                spike = new Spike(this.game, 0, 0);
                this.spikes.add(spike);
            }
            spike.resetPosition(this.game.width + spike.width / 2, pipeY);
        }
    }
}