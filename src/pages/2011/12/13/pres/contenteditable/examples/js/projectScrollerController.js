(function(global){
	function projectScrollerController(){
	  this.widget = $(".project-view-widget");
	  if(this.widget.length==0){
	    delete this.widget;
	    return;
	  }

	  var list = $(".inner-wrapper figure",this.widget);
	  if(list.length>1){
	    
	    this.slideCount = list.length;
	    var index = this.slideCount;
	    $(".wrapper",this.widget).before('<ul class="page-list"></ul>');
	    var pages = $(".page-list",this.widget);
	    while(index--){
	      pages.append('<li><a href="#">'+(this.slideCount-index)+'</a></li>');
	    }
	    
	    $(".page-list a").click($.proxy(this.scrollTo,this));
	    
      this.slideWidth = $(".wrapper",this.widget).outerWidth();
	   
      this.wrapper = $(".inner-wrapper",this.widget);
      this.wrapper[0].innerHTML+=this.wrapper[0].getElementsByTagName('figure')[0].outerHTML;
     
     var list = $(".inner-wrapper figure",this.widget);
     var index = list.length;
     this.widgetWidth = 0;
	   while(index--){
	     this.widgetWidth+=$(list[index]).outerWidth(true);
	   }
     this.wrapper.width(this.wrapperWidth);
     
     this.curretSlide = 1;
     this.setPast();
	   this.timer = window.setInterval($.proxy(this.showNext,this),5500); 
	    
    }
	  
  }

	projectScrollerController.prototype.scrollTo = function(event){
	  event.preventDefault();
	  var link = $(event.currentTarget);
	  link[0].blur();
	  var num = parseInt(link.html(),10)-1;
	  this.curretSlide = num+1;
	  this.setPast();
    this.wrapper.animate({
	    left:-1*num*this.slideWidth
	  },{
	    duration:500
	  });
  };

	projectScrollerController.prototype.setPast = function(){
	  $(".page-list li",this.widget).removeClass("past");
	  $(".page-list li:lt("+this.curretSlide+")",this.widget).addClass("past");
  };
	
	projectScrollerController.prototype.showNext = function(){
	  
	  if($(".inner-wrapper:animated",this.widget).length>0){
	    return;
	  }
	  
    this.curretSlide++;
    this.setPast();
    
    var current_left = parseInt(this.wrapper.css("left"),10);
    
	  this.wrapper.stop().animate({
	    left:current_left-this.slideWidth
	  },{
	    duration:500,
	    complete: $.proxy(function(){
	      var current_left = parseInt(this.wrapper.css("left"),10);
	      if(Math.abs(current_left)==this.widgetWidth-this.slideWidth){
	        this.rewind();
	      }
	    },this)
	  });
  };
	
	projectScrollerController.prototype.rewind = function(){
    this.wrapper.css("left","0");
    this.curretSlide = 1;
    this.setPast();
	};
	
	function onDOMReady(){
	  global.projectScrollerController = new projectScrollerController();
	}
	$(document).ready(onDOMReady);
})(this);