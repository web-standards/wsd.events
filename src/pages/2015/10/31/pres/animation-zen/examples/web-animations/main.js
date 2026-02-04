$(function () {
    var icon = document.querySelector('.js-icon'),
        $handsome = $('.b-handsome'),
        $sex = $('.b-sex'),
        animation;

    // web animations
    animation = icon.animate([
        { transform: 'rotate(0)' },
        { transform: 'rotate(360deg)' }
    ], {
        duration: 2000,
        iterations: Infinity
    });

    $('body').on('keypress', function (e) {
        if (e.keyCode === 32) {
            $handsome.show();
        } else if (e.keyCode === 13) {
            $sex.show();
        } else if (e.keyCode === 113) {
            $handsome.hide();
            $sex.hide();
        }
    });
});
