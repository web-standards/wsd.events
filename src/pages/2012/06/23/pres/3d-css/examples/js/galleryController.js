(function(global){
	
	function galleryController(){
		this.slideWidth = 166;
		this.slideOnScreen = 6;
		this.moveByCount = 1;
		this.slideCount=0;
		this.slideShow = null;
	}
	
	galleryController.prototype.init = function(){
	  
	  if($("body").hasClass("print-widget")){
	    return;
	  }
	  
	  this.slideShow = $(".gallery-widget");
		if(this.slideShow.length==0){
			return;
		}
		
		this.slideCount = $(".inner-wrapper figure",this.slideShow).length;
		
		if(this.slideCount>this.slideOnScreen){
			this.slideShow.append(''+
        '<ul class="gallery-widget-controls">'+
        '  <li class="forward"><a href="#">Вперед</a></li>'+
        '  <li class="backward"><a href="#">Назад</a></li>'+
				'</ul>');

			$(".gallery-widget-controls .forward a",this.slideShow).click($.proxy(this.nextSlide,this));
			$(".gallery-widget-controls .backward a",this.slideShow).click($.proxy(this.previousSlide,this));

			$(".gallery-widget .inner-wrapper").width(parseInt(this.slideCount*this.slideWidth,10)+"px");
		}
		
		
		var wrapper = $(".gallery-widget .inner-wrapper");
		var target = parseInt(wrapper.css("left"),10);
		if(target<-wrapper.width()+(this.slideOnScreen*this.slideWidth)){
      $(".gallery-widget-controls .forward a",this.slideShow).fadeOut();
    }
		if(target>=0){
		  $(".gallery-widget-controls .backward a",this.slideShow).fadeOut();
		}
	};


	galleryController.prototype.nextSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var wrapper = $(".inner-wrapper",this.slideShow);
		var left = parseInt(wrapper.css("left"),10);
		var target = Math.round((left-this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;

    if(target<=-wrapper.width()+(this.slideOnScreen*this.slideWidth)){
      $(".gallery-widget-controls .forward a",this.slideShow).fadeOut();
    }
    if(target<-wrapper.width()+(this.slideOnScreen*this.slideWidth)){
      return;
    }
    
    $(".gallery-widget-controls .backward a",this.slideShow).fadeIn();

		wrapper.stop().animate({
			left:target+"px"
		},{
			duration:300
		});
	};

	galleryController.prototype.previousSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var wrapper = $(".inner-wrapper",this.slideShow);
		var left = parseInt(wrapper.css("left"),10);
		var target = Math.round((left+this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;
		
		if(target>=0){
		  $(".gallery-widget-controls .backward a",this.slideShow).fadeOut();
		}
		if(target>0){
		  return;
	  }
		$(".gallery-widget-controls .forward a",this.slideShow).fadeIn();
		
		wrapper.stop().animate({
			left:target+"px"
		},{
			duration:300
		});
	};
	
	global.galleryController = new galleryController();
	
})(this);