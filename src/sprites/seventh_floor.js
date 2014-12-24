require([], function () {
    Q.Sprite.extend("EndGame", {
        init: function(p) {
            this._super(p, {});
            this.add("2d");
            this.on("bump.left,bump.right,bump.top, bump.bottom",function(collision) {
                if(collision.obj.isA("Player")) {
                    Q.stageScene("winGame",1, { label: "Game Over" });
                }
            });
        }
    });
});
