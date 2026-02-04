// запуск видео с примерами анимаций
(function () {
    var $slide = $('#Splash-video'),
        video = $slide.find('video')[0];

    $slide.attrchange({
        trackValues: true,
        callback: function (event) {
            if (event.attributeName !== 'class')
                return;

            if (!/active/.test(event.newValue)) {
                video.currentTime = 0;
                return;
            }

            // запускаем видео
            video.play();
        }
    });
}());

// запуск видео с примером компоновки
(function () {
    var $slide = $('#Layout-video'),
        video = $slide.find('video')[0];

    $slide.attrchange({
        trackValues: true,
        callback: function (event) {
            if (event.attributeName !== 'class')
                return;

            if (!/active/.test(event.newValue)) {
                video.currentTime = 0;
                return;
            }

            // запускаем видео
            video.play();
        }
    });
}());

// запуск видео с сайтом css triggers
(function () {
    var $slide = $('#CSS-triggers'),
        video = $slide.find('video')[0];

    $slide.attrchange({
        trackValues: true,
        callback: function (event) {
            if (event.attributeName !== 'class')
                return;

            if (!/active/.test(event.newValue)) {
                video.currentTime = 0;
                return;
            }

            // запускаем видео
            video.play();
        }
    });
}());

// запуск видео с сайтом css triggers
(function () {
    var $slide = $('#Composite-layers'),
        video = $slide.find('video')[0];

    $slide.attrchange({
        trackValues: true,
        callback: function (event) {
            if (event.attributeName !== 'class')
                return;

            if (!/active/.test(event.newValue)) {
                video.currentTime = 0;
                return;
            }

            // запускаем видео
            video.play();
        }
    });
}());

// запуск видео с профайлингом анимаци   в хроме
(function () {
    var $slide = $('#Profile'),
        video = $slide.find('video')[0];

    $slide.attrchange({
        trackValues: true,
        callback: function (event) {
            if (event.attributeName !== 'class')
                return;

            if (!/active/.test(event.newValue)) {
                video.currentTime = 0;
                return;
            }

            // запускаем видео
            video.play();
        }
    });
}());
