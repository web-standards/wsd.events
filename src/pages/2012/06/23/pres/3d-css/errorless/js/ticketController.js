(function(global){
	function ticketController(){
		this.widget = $(".tickets-widget");
		if(this.widget.length==0){
			return;
		}
		$(document).on("click",".tickets-widget .more,.tickets-widget .similar",$.proxy(this.loadMore,this));
	}

	ticketController.prototype.loadMore = function(event){
		event.preventDefault();

		var link = $(event.currentTarget);
		var sourceMore = '<div class="trans paperfold-widget closed have-more"><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-1</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-2</a></div></div></article><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-3</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-4</a></div></div></article><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-5</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-6</a></div></div></article><div class="fold-odd"><a href="#" class="more"><span>More 10 unresolved errors</span></a></div></div></div></div></div></div></div></div>';
		var source = '<div class="trans paperfold-widget closed"><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-1</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-2</a></div></div></article><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-3</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-4</a></div></div></article><div class="fold-odd"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-5</a></div></div></article><div class="fold-even"><article class="ticket unresolved normal frontend"><div class="additional"><time class="when" datetime="2011-03-05T14:25Z">12.05.2011</time></div><div class="wrapper"><div class="inner-wrapper"><span class="where">removeusers.rb#897</span><a href="#" class="what">Fold-6</a></div></div></article></div></div></div></div></div></div></div>';
		
		if($("html").hasClass('csstransforms3d')){
			var hideout = $(document.createElement("DIV"));
			hideout.addClass("tickets-widget").css({
				position:'absolute',
				left:0,
				top:0,
				'z-index':100000
			});
			$('html').append(hideout);
			var foldHeight = 0;

			if(link.hasClass("more")){
				hideout.html(sourceMore);
				foldHeight = hideout.outerHeight();
				paperfold = $(".paperfold-widget",hideout);
				link.before(paperfold).remove();
			}else if(link.hasClass("similar")){
				var next = link.closest(".ticket").next();
				if(next.hasClass("more")){
					hideout.html(sourceMore);
					foldHeight = hideout.outerHeight();
					paperfold = $(".paperfold-widget",hideout);
					next.before(paperfold).remove();	
				}else{
					hideout.html(source);
					foldHeight = hideout.outerHeight();
					paperfold = $(".paperfold-widget",hideout);
					link.closest(".ticket").after(paperfold);	
				}
			}else{
				hideout.html(source);
				foldHeight = hideout.outerHeight();
				paperfold = $(".paperfold-widget",hideout);
				link.after(paperfold);
			}

			paperfold.animate({
				'height':foldHeight+"px"
			},{
				duration:300
			}).on("transitionend webkitTransitionEnd oTransitionEnd",
				$.proxy(this.transitionEnd,this)
			);

			window.setTimeout(function(){$(".paperfold-widget.closed",this.widget).removeClass('closed');},100);
		}else{
			if(link.hasClass("more")){
				link.before(source).prev().slideDown();
			}else{
				link.closest(".ticket").after(source).next().slideDown();
			}
		}
	};

	ticketController.prototype.transitionEnd = function(event){
		var paperfold = $(event.currentTarget);
		//paperfold[0].style[Modernizr.prefixed('transition')] = 'none';
		if($("html").hasClass("csstransforms3d")&&paperfold.hasClass('trans')&&paperfold.hasClass('have-more')){
			paperfold.removeClass('trans').height(paperfold.height()-39).after($(".more",paperfold));
		}
	};

	function onDOMReady(){
		global.ticketController = new ticketController();
	}
	$(document).ready(onDOMReady);
})(this);