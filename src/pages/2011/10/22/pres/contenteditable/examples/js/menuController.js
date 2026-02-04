(function (global) {
  
  function menuController() {

  }
  
  menuController.prototype.init = function () {
    
    //Анимация для газеты
    if($("body").hasClass("newspaper")){
      $("body .nav-wrapper").parent().append("<div class='textLogotype'></div>");
      if(!Modernizr.testAllProps('animation')){
        $("header .textLogotype").width("240px").delay(5000).animate({width:0},{duration:1000,complete:function(event){$(this).remove();}});
        $(".newspaper header nav .nav-wrapper").css({left:240}).delay(5000).animate({left:0},{duration:1000});
        $(".newspaper .brief-search-widget").css({
          opacity:0,
          right:-200
        }).delay(5000).
        animate(
          {
            opacity:1,
            right:4
          },
          {duration:1000}
          )
      }
    }
    
    //Прячем часть кнопок и добавляем переключатели
    var menu = $("header nav .subsection-widget");
    menu.addClass("subsection-widget-closed");
    var li = $("li", menu);
    var index = li.length;
    var summ = 0;
    while(index--){
      var workIndex = li.length-1-index;
      summ+=$(li[workIndex]).outerWidth(true);
      if((summ>435)||(workIndex>4)){
        $(li[workIndex]).addClass("hidden-button");
      }
    }
    $(".lang-ru header nav .subsection-widget").append("<li class='open'>Другие разделы</li><li class='close'>Скрыть</li>");
    $(".lang-uk header nav .subsection-widget").append("<li class='open'>Інші розділи</li><li class='close'>Сховати</li>");
    $(".lang-en header nav .subsection-widget").append("<li class='open'>Other sections</li><li class='close'>Hide</li>");
    
    $(".subsection-widget .open").click($.proxy(this.openMenu,this));
    $(".subsection-widget .close").click($.proxy(this.closeMenu,this));
    
  }
  
  menuController.prototype.openMenu = function(event){
    $(".subsection-widget").removeClass("subsection-widget-closed");
    $("header .brief-search-widget").hide();
    
    var wrapper = $(".site")[0];
    wrapper.style.zoom = "2";
    wrapper.style.zoom = "1";
	};
	
  menuController.prototype.closeMenu = function(event){
    $(".subsection-widget").addClass("subsection-widget-closed");  
    $("header .brief-search-widget").show();
    
    var wrapper = $(".site")[0];
    wrapper.style.zoom = "2";
    wrapper.style.zoom = "1";
	};
  
  global.menuController = new menuController();

})(this);