(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['requestAnimationFramePolyfill'], function() {
    var slidsterController;
    slidsterController = (function() {
      function slidsterController() {
        this.prev = bind(this.prev, this);
        this.next = bind(this.next, this);
        this.getCurrentSlide = bind(this.getCurrentSlide, this);
        this.markCurrent = bind(this.markCurrent, this);
        this.resize = bind(this.resize, this);
        this.fsStateOn = bind(this.fsStateOn, this);
        this.fsStateOff = bind(this.fsStateOff, this);
        this.fsChange = bind(this.fsChange, this);
        this.keyDown = bind(this.keyDown, this);
        this.keyUp = bind(this.keyUp, this);
        this.redrawProgress = bind(this.redrawProgress, this);
        this.selectSlide = bind(this.selectSlide, this);
        this.togglePageSelector = bind(this.togglePageSelector, this);
        this.hidePageSelector = bind(this.hidePageSelector, this);
        this.selectPage = bind(this.selectPage, this);
        this.renderScroll = bind(this.renderScroll, this);
        this.animationLoop = bind(this.animationLoop, this);
        this.scrollToCurrent = bind(this.scrollToCurrent, this);
        var i, len, page_number, ref, slide;
        this.enter = 13;
        this.esc = 27;
        this.dash = 189;
        this.ctrl = 17;
        this.cmd = 91;
        this.shift = 16;
        this.alt = 18;
        this.space = 32;
        this.r = 82;
        this.PgUp = 33;
        this.Up = 38;
        this.Left = 37;
        this.H = 72;
        this.K = 75;
        this.P = 80;
        this.PgDown = 34;
        this.Down = 40;
        this.Right = 39;
        this.L = 76;
        this.J = 74;
        this.Home = 36;
        this.Home = 35;
        this.f5 = 116;
        this.scrolling = false;
        this.max_scroll_time = 1500;
        this.scroll_time_step = 100;
        this.scroll_px_step = 1000;
        this.html = document.querySelector('html');
        this.controlsPressed = [];
        this.controls = [8, 9, 45, 46, 39, 37, this.esc, this.ctrl, this.alt, this.shift, this.enter, this.cmd];
        this.nextKeys = [this.PgDown, this.Down, this.Right, this.L, this.J];
        this.prevKeys = [this.PgUp, this.Up, this.Left, this.H, this.K];
        this.slides = document.getElementById('slides');
        this.articles = this.slides.querySelectorAll('article');
        this.allSlidesCount = this.articles.length;
        this.progress = document.querySelector('.progress .value');
        document.addEventListener('dblclick', this.fsState);
        window.addEventListener('resize', this.resize);
        document.addEventListener('webkitfullscreenchange', this.fsChange);
        document.addEventListener('mozfullscreenchange', this.fsChange);
        document.addEventListener('msfullscreenchange', this.fsChange);
        document.addEventListener('fullscreenchange', this.fsChange);
        document.addEventListener('fullscreeneventchange', this.fsChange);
        document.addEventListener("keydown", this.keyDown);
        ref = this.articles;
        for (i = 0, len = ref.length; i < len; i++) {
          slide = ref[i];
          slide.addEventListener("click", this.selectSlide);
        }
        this.pageSelector = document.querySelector('.go-to-page');
        this.pageSelectorInput = this.pageSelector.querySelector('input');
        this.pageSelector.addEventListener("submit", this.selectPage);
        page_number = parseInt(window.location.hash.replace("#slide-", ""), 10) - 1;
        if (!isNaN(page_number) && page_number > -1 && page_number < this.allSlidesCount) {
          this.markCurrent(this.articles[page_number]);
          if (!window.document.body.classList.contains('fs')) {
            this.scrollToCurrent();
          }
        }
        this.current = this.getCurrentSlide();
        this.resize();
        this.redrawProgress();
      }

      slidsterController.prototype.scrollToCurrent = function(notime) {
        this.startTime = parseInt(new Date().getTime().toString().substr(-5), 10);
        this.startPos = window.pageYOffset;
        this.endPos = this.current.offsetTop;
        if (notime === true) {
          window.scroll(0, this.endPos);
          return false;
        }
        this.vector = 1;
        this.scrolling = true;
        this.html.classList.add('scrolling');
        if (this.endPos < this.startPos) {
          this.vector = -1;
        }
        this.toScroll = Math.abs(this.endPos - this.startPos);
        this.duration = Math.round(this.toScroll * this.scroll_time_step / this.scroll_px_step);
        if (this.duration > this.max_scroll_time) {
          this.duration = this.max_scroll_time;
        }
        this.scrollPerMS = this.toScroll / this.duration;
        this.endTime = this.startTime + this.duration;
        return this.animationLoop();
      };

      slidsterController.prototype.animationLoop = function() {
        if (!this.renderScroll()) {
          this.scrolling = false;
          this.html.classList.remove('scrolling');
          return;
        }
        return requestAnimationFrame(this.animationLoop);
      };

      slidsterController.prototype.renderScroll = function() {
        var currentTime, time;
        time = parseInt(new Date().getTime().toString().substr(-5), 10);
        if (time > this.endTime) {
          time = this.endTime;
        }
        currentTime = time - this.startTime;
        window.scroll(0, Math.round((this.vector * this.scrollPerMS * currentTime) + this.startPos));
        if (this.endTime <= time) {
          return false;
        }
        if (window.pageYOffset === this.endPos) {
          return false;
        }
        if (window.document.body.classList.contains('fs')) {
          window.scroll(0, 0);
          return false;
        }
        return true;
      };

      slidsterController.prototype.selectPage = function(event) {
        var page;
        event.preventDefault();
        page = parseInt(this.pageSelectorInput.value, 10);
        if (isNaN(page)) {
          this.pageSelectorInput.value = "";
        }
        page--;
        if (page < 0) {
          page = 0;
        }
        if (page >= this.allSlidesCount) {
          page = this.allSlidesCount - 1;
        }
        this.markCurrent(this.articles[page]);
        this.hidePageSelector();
        this.pageSelectorInput.blur();
        this.pageSelectorInput.value = "";
        if (!window.document.body.classList.contains('fs')) {
          return this.scrollToCurrent();
        }
      };

      slidsterController.prototype.hidePageSelector = function(event) {
        return this.pageSelector.classList.remove("open");
      };

      slidsterController.prototype.togglePageSelector = function(event) {
        this.pageSelector.classList.toggle("open");
        if (this.pageSelector.classList.contains("open")) {
          this.pageSelectorInput.value = "";
          return this.pageSelectorInput.focus();
        } else {
          this.pageSelectorInput.blur();
          return this.pageSelectorInput.value = "";
        }
      };

      slidsterController.prototype.selectSlide = function(event) {
        if (!document.body.classList.contains('fs')) {
          return this.markCurrent(event.currentTarget);
        }
      };

      slidsterController.prototype.redrawProgress = function(event) {
        var before;
        before = this.allSlidesCount - this.slides.querySelectorAll('.current~article').length;
        return this.progress.style.width = (before * 100 / this.allSlidesCount).toFixed(2) + "%";
      };

      slidsterController.prototype.keyUp = function(event) {
        var index;
        index = this.controlsPressed.indexOf(event.which);
        if (index > -1) {
          return this.controlsPressed.splice(index, 1);
        }
      };

      slidsterController.prototype.keyDown = function(event) {
        var ref, ref1, ref2;
        if ((ref = event.which, indexOf.call(this.controls, ref) >= 0) && this.controlsPressed.indexOf(event.which) < 0) {
          this.controlsPressed.push(event.which);
        }
        if (ref1 = event.which, indexOf.call(this.nextKeys, ref1) >= 0) {
          this.next();
        }
        if (ref2 = event.which, indexOf.call(this.prevKeys, ref2) >= 0) {
          this.prev();
        }
        switch (event.which) {
          case this.P:
            if (!this.scrolling === true) {
              this.togglePageSelector();
            }
            return event.preventDefault();
          case this.enter:
            if (!this.pageSelector.classList.contains("open")) {
              window.document.body.classList.add('fs');
              this.fsStateOn();
              return event.preventDefault();
            }
            break;
          case this.esc:
            window.document.body.classList.remove('fs');
            this.fsStateOff();
            return event.preventDefault();
        }
      };

      slidsterController.prototype.fsChange = function() {
        var fullscreenElement;
        fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if (fullscreenElement === null || fullscreenElement === void 0) {
          window.document.body.classList.remove('fs');
          return this.scrollToCurrent();
        } else {
          return window.document.body.classList.add('fs');
        }
      };

      slidsterController.prototype.fsStateOff = function() {
        if (document.exitFullscreen) {
          return document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          return document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          return document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          return document.webkitExitFullscreen();
        }
      };

      slidsterController.prototype.fsStateOn = function() {
        if (document.documentElement.requestFullscreen) {
          return document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          return document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          return document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          return document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      };

      slidsterController.prototype.resize = function() {
        var current, fullscreenElement, scale;
        fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if (!(window.navigator.standalone || (fullscreenElement && fullscreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen) || (!window.screenTop && !window.screenY))) {
          document.dispatchEvent(new CustomEvent('fullscreenchange', {
            bubbles: true,
            cancelable: true
          }));
        }
        current = this.getCurrentSlide();
        scale = 1 / Math.max(current.clientWidth / window.innerWidth, current.clientHeight / window.innerHeight);
        return ['WebkitTransform', 'MozTransform', 'msTransform', 'OTransform', 'transform'].forEach((function(_this) {
          return function(prop) {
            return _this.slides.style[prop] = 'scale(' + scale + ')';
          };
        })(this));
      };

      slidsterController.prototype.markCurrent = function(element) {
        var before, old;
        old = this.slides.querySelector('.current');
        if (old !== null && old !== void 0) {
          old.classList.remove('current');
        }
        element.classList.add('current');
        this.current = element;
        before = this.allSlidesCount - this.slides.querySelectorAll('.current~article').length;
        this.redrawProgress();
        return history.pushState({}, "Слайд " + before, "index.html#slide-" + before);
      };

      slidsterController.prototype.getCurrentSlide = function() {
        var element;
        element = this.slides.querySelector('.current');
        if (element === null) {
          element = this.slides.querySelector('article');
        }
        this.markCurrent(element);
        return element;
      };

      slidsterController.prototype.next = function() {
        var element;
        element = this.current.nextElementSibling;
        if (element === null) {
          element = this.slides.querySelector('article');
        }
        this.markCurrent(element);
        if (!window.document.body.classList.contains('fs')) {
          return this.scrollToCurrent();
        }
      };

      slidsterController.prototype.prev = function() {
        var element;
        element = this.current.previousElementSibling;
        if (element === null) {
          element = this.slides.querySelector('article:last-child');
        }
        this.markCurrent(element);
        if (!window.document.body.classList.contains('fs')) {
          return this.scrollToCurrent();
        }
      };

      return slidsterController;

    })();
    return slidsterController;
  });

}).call(this);
