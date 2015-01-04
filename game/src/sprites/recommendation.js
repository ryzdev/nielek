require([], function () {
    Q.Sprite.extend("Recommendation", {
        init: function(p) {
            this._super(p, {});
            this.add("2d");
            this.on("bump.left,bump.right,bump.top,bump.bottom",function(collision) {
                if(collision.obj.isA("Player")) {
                    Q.audio.play('RECOMMENDATION');
                    Q.state.inc("recommendations", 1);
                    //kill enemy
                    this.destroy();
                }
            });
        }
    });
});
