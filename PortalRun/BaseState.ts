module PortalRun {

    export class BaseState extends Phaser.State {

        resizeScreen() {
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.setShowAll();
                this.game.scale.setScreenSize(true);
            }
            else {
                //  Same goes for mobile settings.
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.setShowAll();
                this.game.scale.setScreenSize(true);
                this.game.scale.forceOrientation(true, false, 'rotate');
            }
        }

        update() {
            this.resizeScreen();
        }
    }

}