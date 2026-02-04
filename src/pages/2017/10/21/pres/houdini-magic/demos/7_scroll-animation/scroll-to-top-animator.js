isWorkletReady
    .then(() => {
        const animatorName = 'scroll-position-animator';

        const scrollSource = document.querySelector('.page-wrapper');
        const scrollToTopElemet = document.querySelector('.scroll-to-top');

        const scrollAnimationLength = 80;
        const scrollToTopFrames = [
            new KeyframeEffect(
                scrollToTopElemet,
                [
                    { 'transform': 'translateY(' + scrollAnimationLength + 'px)', 'opacity': '0' },
                    { 'transform': 'translateY(0)', 'opacity': '1' }
                ],
                {
                    duration: 1,
                    iterations: 1,
                    fill: 'both',
                }),
        ];
        const scrollToTopTimeline = new ScrollTimeline({
            scrollSource,
            orientation: 'vertical',
            startScrollOffset: '200px',
            endScrollOffset: (scrollAnimationLength + 200) + 'px',
        });
        const scrollToTopAnimation = new WorkletAnimation(animatorName, scrollToTopFrames, scrollToTopTimeline);
        scrollToTopAnimation.play();


        scrollToTopElemet.addEventListener('click', () => {
            scrollTo(scrollSource, 0, 50);
        });
        function scrollTo(element, to, duration) {
            if (duration < 0) return;
            var difference = to - element.scrollTop;
            var perTick = difference / duration * 2;

            setTimeout(function () {
                element.scrollTop = element.scrollTop + perTick;
                scrollTo(element, to, duration - 2);
            }, 10);
        }

    }).catch(console.error);
