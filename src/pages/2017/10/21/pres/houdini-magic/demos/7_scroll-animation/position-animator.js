isWorkletReady
    .then(() => {
        const animatorName = 'scroll-position-animator';

        const scrollSource = document.querySelector('.page-wrapper');
        const positionElement = document.querySelector('.scroll-position');

        const headerHeight = document.querySelector('.header').clientHeight;
        const footerOffsetTop = document.querySelector('.site-footer').offsetTop;

        const positionFrames = [
            new KeyframeEffect(
                positionElement,
                [
                    { 'transform': 'translateX(-100%)' },
                    { 'transform': 'translateX(0%)' }
                ],
                {
                    duration: 1,
                    iterations: 1,
                    fill: 'both',
                }),
        ];
        const positionTimeline = new ScrollTimeline({
            scrollSource,
            orientation: 'vertical',
            startScrollOffset: headerHeight + 'px',
            endScrollOffset: (footerOffsetTop - scrollSource.clientHeight) + 'px',
        });
        const positionAnimation = new WorkletAnimation(animatorName, positionFrames, positionTimeline);
        positionAnimation.play();

    }).catch(console.error);
