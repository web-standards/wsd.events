(function() {
    var items = document.querySelectorAll('.snail-gallery__pic');
    items.map = [].map;

    var view = document.querySelector('.snail-gallery__view');
    view.dataset.state = 'closed';
    var viewImg = view.querySelector('img');
    view.dataset.isVertical = 1;
    var arrPrev = document.querySelector('.snail-gallery__arrow--prev');
    var arrNext = document.querySelector('.snail-gallery__arrow--next');
    var position = {
        current: 0,
        max: 0
    };


    var imgUrls = [];

    items.map( (item, i) => {
        item.dataset.position = i;
        var imgUrl = '';

        if (item.querySelector('img')) {
            imgUrl = item.querySelector('img').src;
        }
        else {
            imgUrl = getComputedStyle(item).backgroundImage.match(/url\("(.*)"\)/)[1];
        }

        imgUrls.push(imgUrl);
        item.addEventListener('click', showView);
    });
    position.max = imgUrls.length - 1;

    view.addEventListener('click', hideView);
    arrPrev.addEventListener('click', showPrev);
    arrNext.addEventListener('click', showNext);

    function showView() {
        position.current = +this.dataset.position;
        view.dataset.state = 'open';
        changeImage();
    }

    function hideView() {
        view.dataset.state = 'closed';
        viewImg.src = "";
    }

    function changeImage() {
        viewImg.src = imgUrls[position.current];
        if ( viewImg.clientWidth > viewImg.clientHeight ) {
            view.dataset.isVertical = 0;
        }
        else {
            view.dataset.isVertical = 1;
        }

    }

    function showPrev() {
        event.stopPropagation();

        if (position.current === 0) {
            position.current = position.max;
        }
        else {
            position.current--;
        }

        changeImage();
    }

    function showNext() {
        event.stopPropagation()

        if (position.current === position.max) {
            position.current = 0;
        }
        else {
            position.current++;
        }

        changeImage();
    }

    window.addEventListener('keyup',function(ev){
        if (view.dataset.state === 'open') {
            if (ev.keyCode === 37) {
                // arrowLeft
                showPrev();
            }
            else if (ev.keyCode === 39 || ev.keyCode === 32) {
                ev.preventDefault();
                // arrowRight, space
                showNext();
            }
        }
    })

})();
