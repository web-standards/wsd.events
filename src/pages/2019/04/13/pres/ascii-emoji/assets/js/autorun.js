(() => {
  const slides = document.querySelectorAll('.slide');

  const SlideWithVideo = function (slide, video) {
    this.video = video;

    const checkMutation = (mutationsList, observer) => {
      for(var mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          if(mutation.target.classList.contains('active')) {
            this.video.play();
          }
          else {
            this.video.pause();
          }
        }
      }
    };

    const observer = new MutationObserver(checkMutation);
    observer.observe(slide, { attributes: true });
  };

  // ------------------------------

  const SlideWithAnimation = function (slide, animation) {
    const checkMutation = (mutationsList, observer) => {
      for(var mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          if(mutation.target.classList.contains('active')) {
            window[animation].play();
          }
          else {
            window[animation].pause();
          }
        }
      }
    };

    const observer = new MutationObserver(checkMutation);
    observer.observe(slide, { attributes: true });
  };

  // ------------------------------

  slides.forEach(slide => {
    const video = slide.querySelector('video');
    const dataset = slide.dataset;
    if(video) {
      new SlideWithVideo(slide, video);
    }

    if(dataset && dataset.animation) {
      new SlideWithAnimation(slide, dataset.animation);
    }
  });
})();
