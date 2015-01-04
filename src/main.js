var Q = Quintus({ audioSupported: [ 'mp3' ] })
    .include("Sprites, Scenes, Input, 2D, Touch, UI, Audio")
    .setup({
        width: 960,
        height: 640
    })
    .controls()
    .touch()
    .enableSound();
 
//Q.gravityY = 9.8;
 
var objectFiles = [
    './src/sprites/player',
    './src/sprites/enemies',
    './src/sprites/badge',
    './src/sprites/recommendation',
    './src/sprites/coffee',
    './src/sprites/seventh_floor',
    './src/audio'
];
 
require(objectFiles, function () {
    //creating scene on stage

    var enemyAssets = [
        ["EnemyToAvoid", {x: 1000, y: 2050, asset: "enemies/walker.png"}],
        ["EnemyToAvoid", {x: 500, y: 2050, asset: "enemies/walker.png"}],
        ["BadgeGuard", {x: 600, y: 1800, asset: "enemies/walker.png"}],
        ["VerticalEnemyToAvoid", {x: 800, y: 1950, asset: "enemies/flyer.png"}],
        ["EnemyToKill", {x: 280, y: 910, asset: "enemies/slider.png"}],
        ["EnemyToKill", {x: 500, y: 910, asset: "enemies/red_car.png"}],
        ["EnemyToKillFast", {x: 900, y: 910, asset: "enemies/red_car.png"}],
//        ["Badge", {x: 450, y: 1800, asset: "badge.png"}], //todo get rid of or assimilate functionality
        ["Recommendation", {x: 1100, y: 1600, asset: "book.png"}], //todo star and coffee one collectable, change name of 'reccomendation'
        ["Recommendation", {x: 1260, y: 1190, asset: "book.png"}], //todo get rid of or assimilate coffee (life++) which was here
        ["EndGame", {x: 105, y: 70, asset: "exit.png"}]
    ];

    Q.scene("firstStreet",function(stage) {
        var background = new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex: 0, sheet: 'tiles', tileW: 70, tileH: 70, type: Q.SPRITE_NONE });  //Q.SPRITE_NONE nocoll
        stage.insert(background);
        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex:1,  sheet: 'tiles', tileW: 70, tileH: 70 }));
        // add player onto scene
        var player = stage.insert(new Q.Player());
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h});

        stage.loadAssets(enemyAssets);

        var timer2 = setInterval ( function(){
            stage.loadAssets([ ["EnemyToKill", {x: 280, y: 910, asset: "enemies/slider.png"}]])
        }, 4000 );
    });

    Q.scene("endGame",function(stage) {
        Q.audio.play('ENDGAME');
        var container = stage.insert(new Q.UI.Container({
            fill: "white",
            border: 5,
            shadow: 10,
            shadowColor: "rgba(0,0,0,0.5)",
            y: Q.height/2,
            x: Q.width/2
        }));

        stage.insert(new Q.UI.Button({
            label: "You lose!! Your score is " + Q.state.p.score + "! Click to play again",
            color: 'white',
            y: 0,
            x: 0
        }, function() {
            window.location = '';
        }), container);

        container.fit(40,40);

    });

    Q.scene("winGame",function(stage) {
        Q.audio.stop();
        Q.audio.play('OST');
        var container = stage.insert(new Q.UI.Container({
            fill: "white",
            border: 5,
            shadow: 10,
            shadowColor: "rgba(0,0,0,0.5)",
            y: Q.height/2,
            x: Q.width/2
        }));

        stage.insert(new Q.UI.Button({
            label: "You win!!! You scored " + Q.state.p.score + " and you found " + Q.state.p.recommendations + " books!",
            color: 'yellow',
            y: 0,
            x: 0
        }, function() {
            window.location = '';
        }), container);

        container.fit(60,60);
    });

    var timer = setInterval ( function(){ }, 1000 );

    Q.scene("gameStats", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: Q.width/2,
            y: 15,
            border: 1,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 960,
            h: 40
            })
        );

        var score = stage.insert(new Q.UI.Text({
                label: "Score: "  + Q.state.p.score,
                color: "white",
                x: 290,
                y: 0
            }),statsContainer);


        var time = stage.insert(new Q.UI.Text({
                label: "Time: 0",
                color: "white",
                x: 120,
                y: 0
            }),statsContainer);

        var lives = stage.insert(new Q.UI.Text({
                label: "Lives: " + Q.state.p.lives,
                color: "white",
                x: -50,
                y: 0
            }),statsContainer);

        var recs = stage.insert(new Q.UI.Text({
                label: "Books: " + Q.state.p.recommendations,
                color: "white",
                x: -300,
                y: 0
            }),statsContainer);

        var timer = setInterval ( function(){
            Q.state.inc("time", 1);
            Q.state.dec("score", 10);
        }, 1000 );
    });

    Q.load("tiles_map.png, nielek.png, firstStreet.tmx, enemies/walker.png, enemies/flyer.png, enemies/slider.png, badge.png, book.png, exit.png, enemies/red_car.png, enemies/blue_car.png", function() { //creating stage (layer)
        Q.sheet("tiles","tiles_map.png", { tilew: 70, tileh: 70});
        Q.stageScene("firstStreet");
        Q.stageScene("gameStats",1);
    });

    Q.state.reset({ score: 5000, lives: 1 , recommendations: 0, time: 0});

    Q.state.on("change.score",function() {
        var score_label = Q("UI.Text",1).at(0);
        if (score_label){
            score_label.p.label = "Score: "+ Q.state.p.score;
        }

    });

    Q.state.on("change.time", function() {
        var info_label = Q("UI.Text", 1).at(1);
        if (info_label){
            info_label.p.label = "Time: "+ Q.state.p.time;
        }

    });

    Q.state.on("change.lives", function() {
        var info_label = Q("UI.Text", 1).at(2);
        info_label.p.label = "Lives: "+ Q.state.p.lives;
    });

    Q.state.on("change.recommendations", function() {
        var info_label = Q("UI.Text", 1).at(3);
        info_label.p.label = "Keys: "+ Q.state.p.recommendations;
    });
});