(function() {
  'use strict';
var slide = document.querySelector('.slide--bubbles');

var container = document.querySelector('.bubbles-demo');
var containerWidth = container.clientWidth;
var containerHeight = container.clientHeight;
var content = document.querySelector('.bubbles-demo__content');
var header = document.querySelector('.bubbles-demo__header');
header.content = document.querySelector('.bubbles-demo__title');
header.splash = document.querySelector('.bubbles-demo-header__splash');

var shape = document.querySelector('.bubbles-demo__bubble');
var shapeWidth = shape.clientWidth;
var shapeHeight = shape.clientHeight;

var minX = 0;
var minY = 0;

var bubbles = [];
var maxBubbles = 25; //25
var baseShapeSize = 220; // 220
var minShapeSize = 50; // 50

var time = 7;
var minTime = 4;

var posibleSides = ['top', 'right', 'bottom', 'left'];

//------------------------------

function Bubble( pos ) {
  this.bubble = shape.cloneNode( true );
  this.setSize();
  this.setPos();
  content.appendChild( this.bubble );
  this.content = this.bubble.querySelector('.bubbles-demo__group');
  this.splash = this.bubble.querySelector('.bubbles-demo__splash');

  this.isAnimationRunned = false;
  this.isCollapsed = false;
  this.checkMutation();
  // Run animation only if slide is active
  // this.addAnimation();
  var that = this;

  this.bubble.onclick = function () {
    if ( !that.isCollapsed ) {
      that.isCollapsed = true;
      that.collapse();
    }
  }
}

//------------------------------

Bubble.prototype.collapse = function () {
  var that = this;

  function resetBubble() {
    var tl = new TimelineLite();
    that.setSize();
    that.setPos();

    tl.to( that.content, .3, {
      'scale': 1,
      'opacity': 1,
      'delay': 2,
      'onComplete': function() {
        that.isCollapsed = false;
      }
    });
  }

  var tl = new TimelineLite();
  tl.set( this.content, {
      'scale': 0,
      'transform-origin': '100px 100px',
      'opacity': 0
    });
  tl.set( this.splash, {
    'scale': .5,
    'transform-origin': '100px 100px',
    'opacity': 1,
  });
  tl.to( this.splash, .15, {
    'scale': 1.5,
    'opacity': 0,
    'ease': Power1.easeOut,
    'onComplete': resetBubble
  });
}

//------------------------------

Bubble.prototype.setPos = function () {
  var target = this.getSide();

  this.bubble.style.transform = 'translate3d(' + target.coords.x +'px, ' + target.coords.y + 'px, 0)';
}

//------------------------------

Bubble.prototype.setSize = function () {
  this.shapeSize = Math.round( Math.random() * (baseShapeSize - minShapeSize) ) + minShapeSize;
  this.bubble.style.width = this.shapeSize + 'px';
  this.bubble.style.height = this.shapeSize + 'px';

  this.maxX = containerWidth - this.shapeSize;
  this.maxY = containerHeight - this.shapeSize;
}

//------------------------------

Bubble.prototype.addAnimation = function () {
  var minX = 0;
  var newTime = Math.random() * time + minTime;
  var elem = this.bubble;
  var delay = Math.random() * time;
  var tl = new TimelineLite();
  var that = this;

  resetSizes();

  if(this.isAnimationRunned) {
    animate();
  }

  function animate () {
    var target = that.getSide( that.side );
    that.side = target.side;

    var propSet = {
      x: target.coords.x,
      y: target.coords.y,
      ease: SlowMo.easeInOut,
      delay: delay,
      onComplete: () => {
        if(that.isAnimationRunned) {
          animate();
        }
      }
    };
    tl.to( elem, newTime, propSet);

    if ( delay ) {
      delay = 0;
    }
  }
}

//------------------------------

Bubble.prototype.checkMutation = function(){
  const checkMutation = (mutationsList, observer) => {
    for(var mutation of mutationsList) {
      if (mutation.attributeName === 'class') {
        const targetIsActive = mutation.target.classList.contains('active');

        if(targetIsActive) {
          if(!this.isAnimationRunned) {
            this.isAnimationRunned = true;
            this.addAnimation();
          }
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

//------------------------------

Bubble.prototype.getSide = function () {
  var targetParams = {
    side: '',
    coords: {}
  };
  var maxRandX = Math.round( Math.random() * this.maxX );
  var maxRandY = Math.round( Math.random() * this.maxY );

  var sides = {
    'top': {
      x: maxRandX,
      y: minY
    },
   'right': {
      x: this.maxX,
      y: maxRandY
    },
   'bottom': {
      x: maxRandX,
      y: this.maxY
    },
   'left': {
     x: minX,
     y: maxRandY
    }
  };

  delete sides[ this.side ];
  var keys = Object.keys( sides );
  var randPos = Math.floor( Math.random() * keys.length );
  var newSide = keys[ randPos ];

  targetParams.side = newSide;
  targetParams.coords = sides[ newSide ];

  return targetParams;

}

//------------------------------

function addBubble () {
  var bubble = new Bubble( i );
  bubbles.push( bubble );
}

//------------------------------

for ( var i = 0; i < maxBubbles; i ++ ) {
  addBubble();
}

//------------------------------

function resetSizes () {
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;

  bubbles.forEach( function ( item ) {
    item.maxX = containerWidth - item.shapeSize;
    item.maxY = containerHeight - item.shapeSize;
  });
}

//------------------------------

window.onresize = resetSizes;

//------------------------------

header.onclick = function () {
  var that = this;

  function resetElem() {
    var tl = new TimelineLite();

    tl.to( that.content, .3, {
      'scale': 1,
      'opacity': 1,
      'onComplete': function() {
        that.isCollapsed = false;
        }
    });
  }

  var tl = new TimelineLite();
  tl.set( this.content, {
      'scale': 0,
      'opacity': 0
  });
  tl.set( this.splash, {
    'scale': .5,
    'opacity': 1,
  });
  tl.to( this.splash, .15, {
    'scale': 1.5,
    'opacity': 0,
    'ease': Power1.easeOut,
    'onComplete': resetElem
  });
};
})();
