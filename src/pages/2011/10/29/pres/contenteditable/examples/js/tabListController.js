(function(global){
	
	function tabListController(){
		this.tabCount=0;
		this.listWidth=0;
		this.wrapperWidth=0;
		this.wrapper = null;
	}
	
	tabListController.prototype.init = function(){
	  
	  if($("body").hasClass("print-widget")){
	    return;
	  }
	  
	  this.tabList = $(".tab-list-widget");
		if(this.tabList.length==0){
			return;
		}
		
		var li = $("li",this.tabList);
		this.slideCount = li.length;
		this.wrapper = $(".inner-wrapper",this.tabList);
		
		var index = this.slideCount;
		while(index--){
		  this.listWidth+=$(li[index]).outerWidth(true);
		}
		
		this.wrapper.width(this.listWidth);
		
		this.wrapperWidth = this.wrapper.parent().width();
		
		if(this.listWidth>this.wrapperWidth){
		  $(".wrapper",this.tabList).after('<a href="#" class="forward">Вперед</a>');
		  $(".wrapper",this.tabList).before('<a href="#" class="backward">Назад</a>');
		  $(".forward",this.tabList).bind("mousedown",$.proxy(this.forward,this));
		  $(".backward",this.tabList).bind("mousedown",$.proxy(this.backward,this));
		  $(".forward,.backward",this.tabList).bind("mouseup",$.proxy(this.stopScroll,this));
		  $(".forward,.backward",this.tabList).click($.proxy(this.preventEvent,this));
		  this.startPoint();
		}
		
	};

	tabListController.prototype.preventEvent = function(event){
	  event.preventDefault();
		event.currentTarget.blur();
		
  };

	tabListController.prototype.startPoint = function(event){
	  $(".backward",this.tabList).fadeTo(100,0.5);
  };
  
	tabListController.prototype.endPoint = function(event){
	  $(".forward",this.tabList).fadeTo(100,0.5);
  };

	tabListController.prototype.stopScroll = function(event){
	  event.preventDefault();
		event.currentTarget.blur();
		
		this.wrapper.stop();
  };

	tabListController.prototype.forward = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
    var left = parseInt(this.wrapper.css("left"),10);
    var delta = Math.round(Math.abs(left-this.listWidth)*0.8);
    
    $(".backward",this.tabList).fadeTo(100,1);
    
    this.wrapper.stop().animate({
      left:-this.listWidth+this.wrapperWidth
    },{
      duration:delta,
      complete:this.endPoint
    });

	};

	tabListController.prototype.backward = function(event){
		event.preventDefault();
		event.currentTarget.blur();

    var left = parseInt(this.wrapper.css("left"),10);
    var delta = Math.abs(left*0.8);
    
    $(".forward",this.tabList).fadeTo(100,1);
    
    this.wrapper.stop().animate({
      left:0
    },{
      duration:delta,
      complete:this.startPoint
    });
	};
	
	global.tabListController = new tabListController();
	
})(this);