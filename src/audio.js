/**
 * Created by stephen.murby on 12/18/2014.
 */
require([], function () {
    Q.load({"OST": '../audio/main-theme-overworld.mp3'},function() {
        Q.audio.play('OST');
    });

    Q.load({"ENDGAME": '../audio/super-mario-loses-game.mp3'},function() {
    });

    Q.load({"COFFEE": '../audio/kill.mp3'},function() {
    });

    Q.load({"RECOMMENDATION": '../audio/kill.mp3'},function() {
    });

    Q.load({"LOSE_LIFE": '../audio/lose_life.mp3'},function() {
    });

    Q.load({"KILL": '../audio/kill.mp3'},function() {
    });
});