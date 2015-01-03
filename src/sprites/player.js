require([], function () {
    Q.Sprite.extend("Player",{
        init: function(p) {
          this._super(p, { asset: "nielek.png", x: 70, y: 1960, jumpSpeed: -540 ,timeInvincible: 2});
//          this._super(p, { asset: "nielek.png", x: 700, y: 280, jumpSpeed: -540 ,timeInvincible: 2}); // end-game test location
          this.add('2d, platformerControls');
        },
        step: function(dt) {
            if(Q.inputs['left'] && this.p.direction == 'right') {
                this.p.flip = 'x';
            }
            if(Q.inputs['right']  && this.p.direction == 'left') {
                this.p.flip = false;
            }

            if (this.p.y < 10){
                Q.stageScene("winGame",1, { label: "Game Over" });
                this.destroy();
            }

            if(this.p.timeInvincible > 0) {
                this.p.timeInvincible = Math.max(this.p.timeInvincible - dt, 0);
            }

        },
        damage: function(){
            if(!this.p.timeInvincible) {
                Q.audio.play('LOSE_LIFE');
                Q.state.dec("lives", 1);
                if(Q.state.p.lives < 0) {
                    Q.stageScene("endGame",1, { label: "Game Over" });
                    this.destroy();
                }
                this.p.timeInvincible = 1;
            }
        }
    });
});