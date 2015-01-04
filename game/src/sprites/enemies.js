require([], function () {
    window.security_guards = [];

    Q.component("BaseEnemy", {
        added: function() {
            var entity = this.entity;
            entity.on("bump.left,bump.right,bump.bottom",function(collision) {
                if(collision.obj.isA("Player")) {
                    collision.obj.damage();
                }
            });
        },
        step: function(dt) {
            var dirX = this.p.vx/Math.abs(this.p.vx);
            var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
            var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);

            if (this.p.min_x && this.p.max_y){
                if (this.p.x < this.p.min_x && this.p.y >= this.p.max_y){
                    this.destroy();
                    return;
                }
            }

            //if we are on ground and there is a cliff
            if(!nextTile && ground) {
                if(this.p.vx > 0) {
                    if(this.p.defaultDirection == "right") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                else {
                    if(this.p.defaultDirection == "left") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                this.p.vx = -this.p.vx;
            }
        }
    });

    Q.Sprite.extend("EnemyToKill", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left", min_x: 100, max_y: 2050});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    //make the player jump
                    Q.audio.play('KILL');
                    collision.obj.p.vy = -100;
                    Q.state.inc("score",50);
                    //kill enemy
                    this.destroy();
                }
            });
        }
    });

    Q.Sprite.extend("EnemyToKillFast", {
        init: function(p) {
            this._super(p, {vx: -200, defaultDirection: "left", min_x: 100, max_y: 2050});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    //make the player jump
                    Q.audio.play('KILL');
                    collision.obj.p.vy = -100;
                    Q.state.inc("score",50);
                    //kill enemy
                    this.destroy();
                }
            });
        }
    });


    Q.Sprite.extend("EnemyToAvoid", {
        init: function(p) {
            this._super(p, {vx: -200, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    collision.obj.damage();
                }
            });

            window.security_guards.push(this);
        }
    });

    Q.Sprite.extend("BadgeGuard", {
        init: function(p) {
            this._super(p, {vx: -150, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    collision.obj.damage();
                }
            });

            window.security_guards.push(this);
        },
        step: function(dt) {
            var dirX = this.p.vx/Math.abs(this.p.vx);
            var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
            var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);

            //if we are on ground and there is a cliff
            if(!nextTile && ground) {
                if(this.p.vx > 0) {
                    if(this.p.defaultDirection == "right") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                else {
                    if(this.p.defaultDirection == "left") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                this.p.vx = -this.p.vx;
            }
        }
    });


    Q.Sprite.extend("VerticalEnemyToAvoid", {
        init: function(p) {
            this._super(p, {vy: -150, rangeY: 70, gravity: 0 });
            this.add("2d");

            this.p.initialY = this.p.y;

            this.on("bump.left,bump.right,bump.bottom",function(collision) {
                if(collision.obj.isA("Player")) {
                    collision.obj.damage();
                } else {
                    this.p.vy = -150;
                }
            });
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    collision.obj.p.vy = -100;
                    Q.audio.play('KILL');
                    this.destroy();
                }
            });

            window.security_guards.push(this);
        },

        step: function(dt) {
            if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
                this.p.vy = -this.p.vy;
            }
            else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
                this.p.vy = -this.p.vy;
            }
        }

    });
});
