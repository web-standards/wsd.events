
var gameObjects = [];

// game tick
var lastTimeValue = 0;
function tick (time) {
    var timeDelta = (time - lastTimeValue) / 1000; // time between two ticks in seconds

    gameObjects.forEach(function (gameObject) {
        gameObject.update(timeDelta);
    });

    // fps -> Math.round(1000 / (time - lastTimeValue));

    lastTimeValue = time;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

document.addEventListener('visibilitychange', function () {
    lastTimeValue = performance.now();
});