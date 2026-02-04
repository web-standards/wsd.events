(function(global){

  $(window).load(onDOMReady);

  function onDOMReady(){
    global.slidsterController = new  SlidsterController;
  }

  function SlidsterController(){

    // есть ли FS API
    this.fs = $('html').hasClass("fullscreen");

    //статьи и номер текущей
    var article = $(".slides>article");

    this.slidesNumber = article.length;

    //навесили всем id и tabindex
    for(i=0;i<this.slidesNumber;i++){
      article[i].setAttribute('tabindex',i);
      article[i].setAttribute('id',i);
    }

    //при нажатии клавищ листаем слайшдшоу
    $(window).on('keydown', $.proxy(this.keyboard,this));
    //при изменении размера окна перерасчитать размер слайд
    $(window).on('resize', $.proxy(this.resize,this));

    this.curentNumber = null;

    this.redrawProgress();
    $("body>.lightbox").fadeOut("slow");

  }

  SlidsterController.prototype.keyboard = function(event){


    if(!$("body").hasClass("fullScreenMode")){
      if(event.keyCode==70){
        this.enterFS();
      }
      return;
    }

    switch(event.keyCode){
      case 34: // PgDown
      case 40: // Down
      case 39: // Right
      case 76: // l
      case 74: // j
        this.next(event);
        break;

      case 33: // PgUp
      case 38: // Up
      case 37: // Left
      case 72: // h
      case 75: // k
      case 8:
        this.prev(event);
        break;

      case 27: // esc
      case 13: // enter
        this.leaveFS(event);
        break
    }
  };


  SlidsterController.prototype.redrawProgress = function(){
    var delta = Math.floor((this.curentNumber/(this.slidesNumber-1))*100)+"%";
    $("body>.progress>div>div").css({
      "width":delta
    })
    if($("body").hasClass("fullScreenMode")){
      window.location.hash = this.curentNumber;
    }
  };

  SlidsterController.prototype.next = function(event){

    this.curentNumber++;
    if(this.curentNumber==this.slidesNumber){
      this.curentNumber=0;
    }

    var article = $(".slides>article.selected");
    if(article.length==0){
      article = $(".slides>article:first-of-type");
    }
    var next = article.next();
    if(next.length==0){
      next = $(".slides>article:first-of-type");
    }

    $(".slides>article.selected").removeClass("selected");
    next.addClass("selected");

    console.log(next[0].className,next.hasClass('deadline'));

    if(next.hasClass('deadline')){
      console.log('fire');
      Notification.requestPermission(function(){
        new Notification("Дедлайн близко! Помни!",{
          icon: "img/deadline-ico.png",
          body: "Я почти хочу, что бы ты облажался. Ты такой … такой … ммммм … сделай это. Ну пожалуйста."
        });
      });
      new Notification("Дедлайн через час",{
        body: "Антон, напоминаю, что дедлайн через час, если вы не вышлете верстку, то … мы знаем где вы живете.",
        icon: "img/deadline-ico.png"
      });
    }

    this.redrawProgress();

  };

  SlidsterController.prototype.prev = function(event){


    this.curentNumber--;
    if(this.curentNumber<0){
      this.curentNumber=his.slidesNumber-1;
    }

    var article = $(".slides>article.selected");
    if(article.length==0){
      article = $(".slides>article:first-of-type");
    }

    var prev = article.prev();
    if(prev.length==0){
      prev = $(".slides>article:last-of-type");
    }
    $(".slides>article.selected").removeClass("selected");
    prev.addClass("selected");

    this.redrawProgress();
  };

  SlidsterController.prototype.leaveFS = function(event){
    window.location.hash = "";
    $('body').removeClass("fullScreenMode");

    $(".slides>article.selected").removeClass("selected");
    this.curentNumber = null;
    this.rescale(1);

    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
  };

  SlidsterController.prototype.rescale = function(scale){

    $('.slides')[0].style[Modernizr.prefixed('transform')] = 'scale('+scale+')';

  };

  SlidsterController.prototype.resize = function(){
    if(!$("body").hasClass("fullScreenMode")){
      return;
    }

    var iw = 1024,
        ih = 768;

    // var h = $(".slides>article:visible").height();
    // var w = $(".slides>article:visible").width();
    var bh = $("body").height();
    var bw = $("body").width();
    var scale = bh/ih;
    var alt = bw/iw;
    if(scale>alt){
      scale = alt;
    }

    this.rescale(scale);

  };

  SlidsterController.prototype.enterFS = function(event){

    if($("body").hasClass("fullScreenMode")){
      return;
    }

    var body = $('body'),
        hash = parseInt(window.location.hash.slice(1),10);

    if(hash>-1&&!isNaN(hash)){
      slide = $(".slides>article:eq("+hash+")")[0];
    }else{
      slide = $('.slides>article')[0];
    }

    if (typeof body[0].requestFullscreen != 'undefined') {
        body[0].requestFullscreen();
    }
    else if (typeof body[0].mozRequestFullScreen != 'undefined') {
        body[0].mozRequestFullScreen();
    }
    else if (typeof body[0].webkitRequestFullScreen != 'undefined') {
        body[0].webkitRequestFullScreen();
    }

    $(".slides>article.selected").removeClass("selected");
    $(slide).addClass("selected");
    this.curentNumber = slide.getAttribute('tabindex');
    body.addClass("fullScreenMode");
    this.resize();
    this.redrawProgress();
  };

})(this);