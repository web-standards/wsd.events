(() => {

const steps = [
  '295.658872 800 38.6124623 587.648204 0 286.720959 431.692573 0 1000 98.2730802 927.01575 587.648204',
  '103.17485 632.258065 0 189.236973 92.7218345 0 829.37905 59.1656328 1000 504.218362 789.093657 800',
  '0 540.272615 193 60.0836431 784.210938 0 1000 288.638476 852.414062 715.737299 93 800',
  '0 283.870968 712 0 891 127.047146 1000 632.258065 228 800 -5.20417043e-15 449.627792',
  '361 0 955 183.622829 1000 449.627792 502 800 70 647.146402 0 171.712159',
  '814 21 1000 323.052109 738 800 141 753.784119 0 289.776675 105 174',
  '1000 199.503722 955 545 153 800 0 525 361 43 638 0',
  '969 708 840 807 0 663 56 145 414 1 1000 127.047146',
];

var slide = document.querySelector('.slide--poly');

const PolyAnimation = function(id, startAt = 0, dur = 5000) {
  this.tl = new TimelineLite();
  this.path = document.getElementById(id);
  this.isAnimationRunned = false;
  this.counter = startAt;
  this.checkMutation();
}

//------------------------------

PolyAnimation.prototype.runAnimation = function() {
  this.counter++;
  var newTime = 2 + Math.round(Math.random() * 4);
  var that = this;

  if(this.counter > steps.length -1) {
    this.counter = 0
  }

  // console.log(this.counter)

  var propSet = {
      attr:{points: steps[this.counter]},
      ease: SlowMo.easeInOut,
      delay: .25,
      onComplete: () => {
          if(that.isAnimationRunned) {
            that.runAnimation();
          }
      }
    };
  this.tl.to(this.path, newTime, propSet);
}
//------------------------------

PolyAnimation.prototype.checkMutation = function() {
  const checkMutation = (mutationsList, observer) => {
    for(var mutation of mutationsList) {
      if (mutation.attributeName === 'class') {
        if(mutation.target.classList.contains('active')) {
          this.isAnimationRunned = true;
          this.runAnimation();
        }
        else {
          this.isAnimationRunned = false;
        }
      }
    }
  };

  const observer = new MutationObserver(checkMutation);
  observer.observe(slide, { attributes: true });
}

new PolyAnimation('poly');

})();
