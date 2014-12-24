/**
 * Created by stephen.murby on 12/19/2014.
 */
require([], function () {
    Q.Sprite.extend("Coffee", {
        init: function(p) {
            this._super(p, {});
            this.add("2d");
            this.on("bump.left,bump.right,bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    Q.audio.play('COFFEE');
                    Q.state.inc("lives", 1);
                    //kill enemy
                    this.destroy();
                }
            });
        }
    });
});

