module PortalRun {

    export class BaseState extends Phaser.State {

        resizeScreen() {
                //  Same goes for mobile settings.
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.setShowAll();
                this.game.scale.setScreenSize(true);
        }

        update() {
            this.resizeScreen();
        }
    }

}