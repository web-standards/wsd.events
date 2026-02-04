var pupils;

function tick () {

    var gamepad = navigator.getGamepads()[0];

    if (gamepad && pupils) {
        pupils.forEach(function (pupil, index) {
            index *= 2;
            var position = [
                75 + (gamepad.axes[index] * 75),
                75 + (gamepad.axes[index + 1] * 75)
            ];
            pupil.style.left = position[0] + 'px';
            pupil.style.top = position[1] + 'px';
        });
    }

    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

window.onload = function () {
    pupils = document.querySelectorAll('.pupil');
};