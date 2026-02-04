(function(global){
	function hotTopicController(){
	  this.widget = $(".hot-topic-widget");
	  if(this.widget.length==0){
	    delete this.widget;
	    return;
	  }
	  var list = $(".inner-wrapper li",this.widget);
	  if(list.length>1){
	    
	    this.wrapper = $(".inner-wrapper",this.widget);
	    	    
	    var clone = $(".inner-wrapper li:first-child",this.widget).clone(true);
	    this.wrapper.append(clone);
	    list = $(".inner-wrapper li",this.widget);
	    
	    this.slideWidth = $(list[0]).outerWidth(true);
	    
	    this.widgetWidth = 0;
	    var index = list.length;
	    while(index--){
	      this.widgetWidth+=$(list[index]).outerWidth(true);
	    }
	    
	    this.wrapper.width(this.widgetWidth+"px");
	    
	    this.widget.append(''+
      '<ul class="controls">'+
      '  <li class="pause"><a href="#">Пауза</a></li>'+
      '  <li class="play"><a href="#">Дальше</a></li>'+
      '</ul>'+
	    '');
	    
	    this.play_button = $(".play",this.widget);
	    this.pause_button = $(".pause",this.widget);
	    this.play_button.click($.proxy(this.play,this));
	    this.pause_button.click($.proxy(this.pause,this));
	    this.play_button.hide();
	    this.play();
	  }
  }
  
	hotTopicController.prototype.play = function(event){
	  if(typeof event !== "undefined"){
	    event.preventDefault();
		  event.currentTarget.blur();
	  }
		
    this.timer = window.setInterval($.proxy(this.showNext,this),5500);
    this.pause_button.show();
    this.play_button.hide();
	};
	
	hotTopicController.prototype.pause = function(event){
	  event.preventDefault();
		event.currentTarget.blur();
		
    window.clearInterval(this.timer);
    this.pause_button.hide();
    this.play_button.show();
	};
	
	hotTopicController.prototype.showNext = function(){
	  var current_left = parseInt(this.wrapper.css("left"),10);
	  this.wrapper.animate({
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
	
	hotTopicController.prototype.rewind = function(){
    this.wrapper.css("left","0");
	};
	
	function onDOMReady(){
	  global.hotTopicController = new hotTopicController();
	}
	$(document).ready(onDOMReady);
})(this);