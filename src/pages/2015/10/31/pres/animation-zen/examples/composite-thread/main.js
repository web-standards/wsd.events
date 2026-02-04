$(function () {
    var logoChrome = document.querySelector('.js-chrome'),
        logoYabro2 = document.querySelector('.js-yabro2'),
        $btn = $('.js-btn'),
        $icons = $('.js-icon'),
        killTime = 5000,
        animation;

    // tweenmax
    TweenMax.to(logoChrome, 2, { rotation: 360, repeat: -1, ease: Linear.easeNone });

    // web animations
    animation = logoYabro2.animate([
        { transform: 'rotate(0)' },
        { transform: 'rotate(360deg)' }
    ], {
        duration: 2000,
        iterations: Infinity
    });

    // kill main thread
    $btn.on('click', function () {
        var time = Date.now();

        while (Date.now() < time + killTime) {
        }
    });

    $icons.on('click', function(){
        $(this).parent().addClass('b-active');
    });
});
