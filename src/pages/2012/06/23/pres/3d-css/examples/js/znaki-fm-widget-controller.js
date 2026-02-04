(function(global){
	
	function znaki_fm_widget_controller(){}
	
	znaki_fm_widget_controller.prototype.init = function(){
	  if($(".znaki-fm-widget").length===0){
			return;
		}
	  $(".znaki-fm-widget .forward").click($.proxy(this.scroll_forward,this));
	  $(".znaki-fm-widget .backward").click($.proxy(this.scroll_backward,this));
	  
	  this.article = $(".znaki-fm-widget article");
	  var scroll_width = $(".znaki-fm-widget").width();
	  var index = this.article.length;
	  var summ = 0;
	  
	  while(index--){
	    summ+=$(this.article[index]).outerWidth();
	    if(summ>=scroll_width){
	      break;
	    }
	  }
	  
	  this.current = 1;
	  this.total = this.article.length-(this.article.length-index)+2;
	  this.delta = 0;
	  
	  if(this.current>=this.total){
	    $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation").hide();
	  }
	  
	  $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .current").html(this.current);
	  $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .total").html(this.total);
	  
	  var titles = $(".title",this.article);
	  var index = titles.length;
	  while(index--){
	    if($(titles[index]).height()<36){
	      $(titles[index]).addClass("big-title");
	      $(titles[index]).removeClass("title");
	    }
	  }
	  if($(this.article[0])[0].outerHTML==undefined){
	    var first = $(this.article[0]).clone(true);
      var second = $(this.article[1]).clone(true);
	    $(".znaki-fm-widget .znaki-fm-widget-scroller").append(first);
	    $(".znaki-fm-widget .znaki-fm-widget-scroller").append(second);
    }else{
	    var first = $(this.article[0])[0].outerHTML;
      var second = $(this.article[1])[0].outerHTML;
	    $(".znaki-fm-widget .znaki-fm-widget-scroller")[0].innerHTML+=first+second;
    }
	  	  
	  this.article = $(".znaki-fm-widget article");
	  var index = this.article.length;
	  $(this.article[index-1]).addClass("cloned").fadeTo(200,0.3);
	  $(this.article[index-2]).addClass("cloned").fadeTo(200,0.3);
	  var summ = 0;
	  while(index--){
	    summ+=$(this.article[index]).width()+10;
	  }
	  $(".znaki-fm-widget-scroller").width(summ+10+"px");
	  $(".znaki-fm-widget article a").click($.proxy(this.article_click,this));
	  $(".znaki-fm-widget article.cloned").click($.proxy(this.rewind_to_start,this));
  };

	znaki_fm_widget_controller.prototype.article_click = function(event){
	  event.currentTarget.blur();
	  
	  
	  var article = $(event.currentTarget.parentNode);
	  var articleSpace = article.offset().left+article.width();
	  var blockSpace = $(".znaki-fm-widget").offset().left+$(".znaki-fm-widget").width();

    if(article.hasClass("cloned")){
      event.preventDefault();
      this.rewind_to_start();
      return;
    }
	  
	  if(articleSpace>blockSpace){
	    event.preventDefault();
	    $(".znaki-fm-widget .forward").trigger("click");
	  }
  }

	znaki_fm_widget_controller.prototype.rewind_to_start = function(){
	  $(".znaki-fm-widget .znaki-fm-widget-scroller").animate({
        left:0
      },
      {
        duration:50*(this.article.length-2),
        complete:$.proxy(function(){
          this.delta = 0;
          this.current = 1;
          $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .current").html(this.current);
        },this)
      });
	};
	
	znaki_fm_widget_controller.prototype.rewind_to_end = function(){
	  $(".znaki-fm-widget .znaki-fm-widget-scroller").animate({
        left:-this.article[this.total-1].offsetLeft+10+"px"
      },
      {
        duration:50*(this.article.length-2),
        complete:$.proxy(function(){
          this.delta = -this.article[this.total-1].offsetLeft+10;
          this.current = this.total;
          $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .current").html(this.current);
        },this)
      });
	};
	
	znaki_fm_widget_controller.prototype.scroll_forward = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		if($(".znaki-fm-widget :animated").length>0){
		  return;
		}
    if(this.current>=this.total){
      this.rewind_to_start();
      return;
    }
    var index = this.current - 1;
    $(".znaki-fm-widget .znaki-fm-widget-scroller").animate({
        left:parseInt(this.delta-$(this.article[index]).width()-10,10)
      },
      {
        duration:250
      });
    this.delta-=$(this.article[index]).width()+10;
    this.current++;
    $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .current").html(this.current);
	};
	
	znaki_fm_widget_controller.prototype.scroll_backward = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		if($(".znaki-fm-widget :animated").length>0){
		  return;
		}		
    if(this.current<2){
      this.rewind_to_end();
      return;
    }
    var index = this.current - 1;
    $(".znaki-fm-widget .znaki-fm-widget-scroller").animate({
        left:parseInt(this.delta+$(this.article[index-1]).width()+10,10)
      },
      {
        duration:250
      });
    this.delta+=$(this.article[index-1]).width()+10;
    this.current--;
    $(".znaki-fm-widget .znaki-fm-widget-scroller-navigation .current").html(this.current);
	};	
	
	global.znaki_fm_widget_controller = new znaki_fm_widget_controller();
	
})(this);