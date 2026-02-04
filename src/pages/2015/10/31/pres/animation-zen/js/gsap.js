/*external js
 http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js
 http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js
 */

window.onload = function() {
    var logo = document.getElementById("logo"),
        playBtn = document.getElementById("playBtn"),
        pauseBtn = document.getElementById("pauseBtn"),
        resumeBtn = document.getElementById("resumeBtn"),
        reverseBtn = document.getElementById("reverseBtn"),
        playFromBtn = document.getElementById("playFromBtn"),
        reverseFromBtn = document.getElementById("reverseFromBtn"),
        seekBtn = document.getElementById("seekBtn"),
        timeScaleSlowBtn = document.getElementById("timeScaleSlowBtn"),
        timeScaleNormalBtn = document.getElementById("timeScaleNormalBtn"),
        timeScaleFastBtn = document.getElementById("timeScaleFastBtn"),
        restartBtn = document.getElementById("restartBtn"),
        tween = TweenLite.to(logo, 3, {left:"600px", rotation:"360deg", ease:Linear.easeNone, paused: true});

    playBtn.onclick = function() {
        //Play the tween forward from the current position.
        //If tween is complete, play() will have no effect
        tween.play();
    }
    pauseBtn.onclick = function() {
        tween.pause();
    }
    resumeBtn.onclick = function() {
        //Resume playback in current direction.
        tween.resume();
    }
    reverseBtn.onclick = function() {
        tween.reverse();
    }
    playFromBtn.onclick = function() {
        //Play from a sepcified time (in seconds).
        tween.play(2);
    }
    reverseFromBtn.onclick = function() {
        //Reverse from a specified time (in seconds).
        tween.reverse(1);
    }
    seekBtn.onclick = function() {
        //Jump to specificied time (in seconds) without affecting
        //whether or not the tween is paused or reversed.
        tween.seek(2);
    }
    timeScaleSlowBtn.onclick = function() {
        //timescale of 0.5 will make the tween play at half-speed (slower).
        //Tween will take 12 seconds to complete (normal duration is 6 seconds).
        tween.timeScale(0.5);
    }
    timeScaleNormalBtn.onclick = function() {
        //timescale of 1 will make tween play at normal speed.
        tween.timeScale(1);
    }
    timeScaleFastBtn.onclick = function() {
        //timescale of 1 will make the tween play at double-speed (faster).
        //Tween will take 3 seconds to complete (normal duration is 6 seconds).
        tween.timeScale(2);
    }
    restartBtn.onclick = function() {
        //Start playing from a progress of 0.
        tween.restart();
    }
}
