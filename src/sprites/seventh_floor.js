require([], function () {
    Q.Sprite.extend("EndGame", {
        init: function(p) {
            this._super(p, {});
            this.add("2d");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    Q.stageScene("winGame",1, { label: "Game Over" });
                    collision.obj.destroy();
                }
            });
        }
    });
});
