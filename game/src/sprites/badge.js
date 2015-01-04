require([], function () {
    Q.Sprite.extend("Badge", {
        init: function(p) {
            this._super(p, {});
            this.add("2d");
            this.on("bump.left,bump.right,bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    Q.audio.play('RECOMMENDATION');
                    Q.state.inc("score", 200);
                    //kill enemy
                    this.destroy();
                    for (var i = 0; i < window.security_guards.length; i++) {
                        window.security_guards[i].destroy();
                    }
                }
            });
        }
    });
});
