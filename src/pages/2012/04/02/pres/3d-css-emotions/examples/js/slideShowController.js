(function(global){
	
	function slideShowController(){
		this.slideWidth = 156;
		this.moveByCount = 1;
		this.slideOnScreen = 4;
		this.slideCount=0;
		this.slideDelay=5000;
		this.timer = null;
		this.slideShow = null;
		this.css3 = false;
		this.opacity = false;
		this.boxShadow = false;
	}
	
	slideShowController.prototype.init = function(){
	  
	  if($("body").hasClass("print-widget")){
	    return;
	  }
	  
	  this.slideShow = $(".slide-show-widget");
		if(this.slideShow.length==0){
			return;
		}
		
		$("figure",this.slideShow).css("display","block");
		$(".slide-previews",this.slideShow).css("height","123px");
		$(".slide-previews .slide-wrapper",this.slideShow).css({
			position:'absolute',
			padding:'0',
			width:'619px',
			height:'100px'
		});
		$(".slide-previews .slide-list",this.slideShow).css({
			position:'absolute',
			width:'5000px'
		});
		$(".slide-previews .slide-list li",this.slideShow).css("margin-bottom","0");
		
		if(!Modernizr.testAllProps('opacity')){
			this.opacity = true;
		}
		  
		if(!Modernizr.testAllProps('box-shadow')){
			this.boxShadow = true;
		}
		  
		if(!Modernizr.testAllProps('transition')){
			this.css3 = true;
		}
		
		this.slideCount = $(".slide-list li",this.slideShow).length;
		
		
		$("figure").click($.proxy(this.openNextSlide,this));
		
		if(this.slideCount>this.slideOnScreen){
			$(".slide-previews",this.slideShow).append(''+
				'<ul class="slide-preview-controls">'+
				'	<li class="forward">Вперед</li>'+
				'	<li class="backward">Назад</li>'+
				'</ul>');

			if(!this.css3){
				$(".slide-previews .forward",this.slideShow).css("right","6px");
				$(".slide-previews .backward",this.slideShow).css("left","6px");
				$(".slide-previews .forward",this.slideShow).bind("mouseenter",function(){
					$(".slide-previews .forward",this.slideShow).stop().animate({
						right:1
					},{
						duration:300
					});
				});
				$(".slide-previews .forward",this.slideShow).bind("mouseleave",function(){
					$(".slide-previews .forward",this.slideShow).stop().animate({
						right:6
					},{
						duration:300
					});
				});
				$(".slide-previews .backward",this.slideShow).bind("mouseenter",function(){
					$(".slide-previews .backward",this.slideShow).stop().animate({
						left:1
					},{
						duration:300
					});
				});
				$(".slide-previews .backward",this.slideShow).bind("mouseleave",function(){
					$(".slide-previews .backward",this.slideShow).stop().animate({
						left:6
					},{
						duration:300
					});
				});
				$(".slide-previews",this.slideShow).bind("mouseenter",function(){
					$(".slide-previews .forward",this.slideShow).stop().animate({
						right:6
					},{
						duration:300
					});
					$(".slide-previews .backward",this.slideShow).stop().animate({
						left:6
					},{
						duration:300
					});
				});
			}

			if(!this.boxShadow){
				$(".slide-show-widget .slide-previews .slide-wrapper").css("background-color","#363636");
			}

			if(!this.opacity){
				$(".slide-previews li").css("opacity","0.4");
				$(".slide-previews li").bind("mouseenter",function(event){
					var current = $(event.currentTarget);
					if(!current.hasClass('currentSlide')){
						current.fadeTo(300,0.7);
					}
				});
				$(".slide-previews li").bind("mouseleave",function(event){
					var current = $(event.currentTarget);
					if(!current.hasClass('currentSlide')){
						current.fadeTo(300,0.4);
					}
				});
			}

			$(".slide-previews .forward",this.slideShow).click($.proxy(this.nextSlide,this));
			$(".slide-previews .backward",this.slideShow).click($.proxy(this.previousSlide,this));

			$(".slide-previews .slide-list").width(parseInt((this.slideCount*this.slideWidth)+(this.slideOnScreen*this.slideWidth*2)+20,10)+"px");

			var firstSlide = $(".slide-previews .slide-list li:eq(0)").clone(true).addClass("clonedSlide").removeClass("selectedOne");
			var slideBlockAfter = $(".slide-previews .slide-list li:gt("+Math.max(parseInt(this.slideCount-this.slideOnScreen-1,10),0)+")",this.slideShow).clone(true).addClass("clonedSlide");

			$(".slide-previews .slide-list").append(firstSlide);
			$(".slide-previews .slide-list").prepend(slideBlockAfter);

			$(".slide-previews .slide-list").css("left",-((this.slideOnScreen)*this.slideWidth)+"px");
		}
		
		if(this.slideCount>0){
			$(".slide-previews .slide-list li a",this.slideShow).live("click",$.proxy(this.showFullView,this));
			$(".slide-list li:not('.clonedSlide'):eq(0) a",this.slideShow).trigger("click");

			//this.timer = window.setInterval($.proxy(this.moveSlideShow,this),this.slideDelay);
		}
	};

	slideShowController.prototype.moveSlideShow = function(){
		var next = $(".slide-list .selectedOne+li:not('.clonedSlide')",this.slideShow);
		
		if(next.length==0){
			next = $(".slide-list li:not('.clonedSlide'):eq(0)",this.slideShow);
		}
		$("a",next).trigger("click");
	};
	
	slideShowController.prototype.playSlideShow = function(event){
		if(event){
			event.preventDefault();
			event.currentTarget.blur();
		}
		if(this.timer==null){
			this.timer = window.setInterval($.proxy(this.moveSlideShow,this),this.slideDelay);
			$("li.pause",this.slideShow).css("position","static");
			$("li.play",this.slideShow).css("position","absolute").css("left","-9000px");
		}
	};
	
	slideShowController.prototype.stopSlideShow = function(event){
		if(event){
			event.preventDefault();
			event.currentTarget.blur();
		}
		if(this.timer!=null){
			window.clearInterval(this.timer);
			this.timer=null;
			$("li.pause",this.slideShow).css("position","absolute").css("left","-9000px");
			$("li.play",this.slideShow).css("position","static");
		}
	};

	slideShowController.prototype.openNextSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var next = $(".slide-list .selectedOne+li:not('.clonedSlide')",this.slideShow);

		if(next.length==0){
			next = $(".slide-list li:not('.clonedSlide'):eq(0)",this.slideShow);
		}

		this.stopSlideShow();
		$("a",next).trigger("click");
	};

	slideShowController.prototype.openPreviousSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var previous = $(".slide-list li:not('.clonedSlide')+.selectedOne",this.slideShow).prev();
		if(previous.length==0){
			previous = $(".slide-list li:not('.clonedSlide')",this.slideShow).last();
		}

		this.stopSlideShow();
		$("a",previous).trigger("click");
	};

	slideShowController.prototype.nextSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var wrapper = $(".slide-list",this.slideShow);
		var left = parseInt(wrapper.css("left"),10);
		var target = Math.round((left-this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;

		if(target==-this.slideWidth*(this.slideCount+1)){	
			wrapper.css("left",0);
			var left = 0;
			var target = Math.round((left-this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;
		}

		wrapper.stop().animate({
			left:target+"px"
		},{
			duration:300
		});
	};

	slideShowController.prototype.previousSlide = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		var wrapper = $(".slide-list",this.slideShow);
		var left = parseInt(wrapper.css("left"),10);
		var target = Math.round((left+this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;

		if(parseInt(Math.round((left+this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth,10)>=156){
			var left = -parseInt((this.slideCount)*this.slideWidth,10);
			wrapper.css("left",left+"px");
			var target = Math.round((left+this.slideWidth*this.moveByCount)/this.slideWidth)*this.slideWidth;
		}
		
		wrapper.stop().animate({
			left:target+"px"
		},{
			duration:300
		});
	};
	
	slideShowController.prototype.showFullView = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		if('keyCode' in event){
			this.stopSlideShow();
		}
		
		var left = event.currentTarget.parentNode.offsetLeft;		
		var wrapperLeft = $(".slide-list",this.slideShow)[0].offsetLeft;
		var delta = Math.abs(wrapperLeft)-Math.abs(left);
		
    
		
		if(Math.abs(left)==Math.abs(wrapperLeft)){
		  $(".slide-previews .backward",this.slideShow).trigger("click");
		}
		
		if(Math.abs(left)==(Math.abs(wrapperLeft)+this.slideWidth*(this.slideOnScreen-1))){
		  $(".slide-previews .forward",this.slideShow).trigger("click");
		}
		
		if(delta>0){
			var target = wrapperLeft+delta;
			var duration = (Math.abs(target)-Math.abs(wrapperLeft))/this.slideWidth*200;
			
			$(".slide-list",this.slideShow).stop().animate({
				left:target+"px"
			},{
				duration:duration
			});
		}

		if(delta<-(this.slideWidth-1)*this.slideOnScreen){
			var target = wrapperLeft+delta+(this.slideOnScreen-1)*this.slideWidth;
			var duration = (Math.abs(target)-Math.abs(wrapperLeft))/this.slideWidth*200;
			
			$(".slide-list",this.slideShow).stop().animate({
				left:target+"px"
			},{
				duration:duration
			});
		}

		if(!this.opacity){
			$(".currentSlide",event.currentTarget.parentNode.parentNode).stop().fadeTo(300,0.4);
		}

		$(".currentSlide",event.currentTarget.parentNode.parentNode).removeClass("currentSlide");
		$("figure .img-loading",this.slideShow).remove();
		var img = $("img",event.currentTarget)[0];

		$(".selectedOne",event.currentTarget.parentNode.parentNode).removeClass("selectedOne");
		$(event.currentTarget.parentNode).addClass("selectedOne");

		$("img[src='"+img.getAttribute("src")+"']",event.currentTarget.parentNode.parentNode).parent().parent().addClass("currentSlide");

		if(!this.opacity){
			$(".currentSlide",event.currentTarget.parentNode.parentNode).stop().fadeTo(300,1);
		}

		if(event.currentTarget.href==$("figure img").attr("src")){
			return;
		}

		var newImage = new Image();
		newImage.setAttribute("src",event.currentTarget.href);
		newImage.setAttribute("alt",img.getAttribute("alt"));
		newImage.setAttribute("title",img.getAttribute("title"));
		newImage.setAttribute("data-copyright",img.getAttribute("data-copyright"));
		newImage.className = "img-loading";
		$("figure",this.slideShow).prepend(newImage);

		if($("figure .loading",this.slideShow).length==0){
			$("figure",this.slideShow).append('<div class="loading"></div>');
		}

		if(newImage.complete){
			this.onFullViewLoad();
		}else{
			$(newImage).bind("load",$.proxy(this.onFullViewLoad,this));	
		}
	};
	
	slideShowController.prototype.onFullViewLoad = function(){
		$("figure img:not(.img-loading)",this.slideShow).remove();
		$("figure .loading",this.slideShow).remove();
		$("figure .img-loading",this.slideShow).removeClass("img-loading");
		$("figure-abstract",this.slideShow).remove();
		$("figcaption",this.slideShow).html($("figure img")[0].getAttribute("title")+' <b class="source">'+$("figure img")[0].getAttribute("data-copyright")+'</b>');
	};

	global.slideShowController = new slideShowController();
	
})(this);