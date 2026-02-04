(function(global){
  
  function onDOMReady(){
    global.slidsterController = new  slidsterController();
  }
  
  function slidsterController(){
    
    $("article:eq(0)").focus();
    this.slidesNumber = $("body article").length;
    this.curentNumber = 1;
    
    $(window).bind('resize',$.proxy(this.fullScreenResize,this));
    $(window).bind('keydown', 'left up', $.proxy(this.prev,this));
    $(window).bind('keydown', 'tab right down space', $.proxy(this.next,this));
    $(window).bind('keydown', 'Shift+Ctrl+f f11 enter return Cmd+Shift+f', $.proxy(this.fullScreenMode,this));
    $(window).bind('keydown', 'esc', $.proxy(this.exitfullScreenMode,this));
    $("article").bind('click', $.proxy(this.selectSlide,this));
    
    var hash = parseInt(window.location.hash.slice(1),10);
    
    if(hash>0&&!isNaN(hash)){
      $("article:eq("+(hash-1)+")").trigger("click");
      
      //alert("article:eq("+(hash-1)+")");
    }
    
  }

  slidsterController.prototype.selectSlide = function(event){
    var slide = event.currentTarget;
    slide.focus();
    $("article.selected").removeClass("selected");
    $(slide).addClass("selected");
    if(!$("body").hasClass("fullScreenMode")){
      this.curentNumber = $(slide).attr("tabindex");
      this.fullScreenMode();
    }else{
      this.next();
    }
  }

  slidsterController.prototype.exitfullScreenMode = function(event){
    event.preventDefault();
    $("body").removeClass("fullScreenMode");
    this.fullScreenResize();
    window.location.hash="";
  }
  
  slidsterController.prototype.fullScreenMode = function(){
    $("body").toggleClass("fullScreenMode");
    this.fullScreenResize();
  }
  
  slidsterController.prototype.redrawProgress = function(){
    var delta = Math.floor((this.curentNumber/this.slidesNumber)*100)+"%";
    $("body>.progress>div>div").css({
      "width":delta
    })
    if($("body").hasClass("fullScreenMode")){
      window.location.hash = this.curentNumber;
    }
  };

  slidsterController.prototype.next = function(event){
    
    if(!$("body").hasClass("fullScreenMode")){
      return;
    }
    
    event.preventDefault();
    
    this.curentNumber++;
    
    var article = $("article:focus");
    if(article.length==0){
      article = $("article:first-of-type");
      this.curentNumber=1;
    }
    var next = article.next();
    if(next.length==0){
      next = $("article:first-of-type");
      this.curentNumber=1;
    }
    next[0].focus();
    
    $("article.selected").removeClass("selected");
    $(next).addClass("selected");
    
    this.redrawProgress();
  };
  
  slidsterController.prototype.prev = function(event){
    
    if(!$("body").hasClass("fullScreenMode")){
      return;
    }
    
    event.preventDefault();
    
    this.curentNumber--;
    
    var article = $("article:focus");
    if(article.length==0){
      article = $("article:first-of-type");
      this.curentNumber=1;
    }
    var prev = article.prev();
    if(prev.length==0){
      prev = $("article:last-of-type");
      this.curentNumber=this.slidesNumber;
    }
    prev[0].focus();
    $("article.selected").removeClass("selected");
    $(prev).addClass("selected");
    
    this.redrawProgress();
  };
  
  slidsterController.prototype.fullScreenResize = function(){
    if($("body").hasClass("fullScreenMode")){
       var h = $("article:visible").height();
       var w = $("article:visible").width();
       var bh = $("body").height();
       var bw = $("body").width();
       var scale = bh/h;
       var alt = bw/w;
       if(scale>alt){
         scale = alt;
       }
       
       $("body article").css({
         "-webkit-transform": "scale("+scale+")",
         "-moz-transform": "scale("+scale+")",
         "-ms-transform": "scale("+scale+")",
         "-o-transform": "scale("+scale+")",
         "transform": "scale("+scale+")"
       });
       
       if(!Modernizr.testAllProps('transform')){
         $("body article").css({
           "zoom":scale
         });
       }
       
       $("article").css({
          "top":Math.floor((bh-h*scale)/2)+"px",
          "left":Math.floor((bw-w*scale)/2)+"px"
        });
        
        this.redrawProgress();
       
     } else {
      $("body article").css({
        "-webkit-transform": "scale(1)",
        "-moz-transform": "scale(1)",
        "-ms-transform": "scale(1)",
        "-o-transform": "scale(1)",
        "transform": "scale(1)",
        "left":"auto",
        "top":"auto",
        "zoom":"1"
      });
    }
  };
  
  //$(document).ready(onDOMReady);
  $(window).load(onDOMReady);

})(this);