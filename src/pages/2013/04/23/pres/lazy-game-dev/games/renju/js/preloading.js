(function(global){

  function PreloaderController(num){
    this.loader = new PxLoader(),
    this.urls = ['img/avatars.png',
            'img/boke.jpg',
            'img/bordello-front.png',
            'img/bordello-side.png',
            'img/ch-front.png',
            'img/ch-side.png',
            'img/ch-top.png',
            'img/clock.png',
            'img/crown.png',
            'img/hl.png',
            'img/vl.png',
            'img/zoom.png',
            'img/hl2.png',
            'img/place.png',
            'img/rotate.png',
            'img/front.jpg',
            'img/grass.jpg',
            'img/tiles.jpg'],
    this.query = this.urls.length,
    this.loaded = 0;

    for(var i=0;i<this.query;i++){
      this.loader.addImage(this.urls[i]);
    }

    this.loader.addProgressListener($.proxy(this.fileLoaded,this));
    this.loader.addCompletionListener($.proxy(this.queryComplete,this));
    this.loader.start();
  }

  PreloaderController.prototype.fileLoaded = function(event){
    this.loaded++;
    document.getElementById('loaded').style.width = Math.floor(100*this.loaded/this.query)+"%";
  };

  PreloaderController.prototype.queryComplete = function(){
    $('.start-screen').show();
    $('.loading-screen').fadeOut();
  };


  function onDomReady(){
    new PreloaderController;
  }

  $(document).ready(onDomReady);
})(this)