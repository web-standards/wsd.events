
(function(global){

	function gameController(){

    //ссылки на экраны игры
    this.screenSize = 800;
    this.score = 0;
    this.seconds = 90;
    this.scaleWrapper = $(".scale");
    this.spaceWrapper = $(".space");
    this.gameScreen = $(".game-screen");
    this.scoreScreen = $(".score-screen");
    this.rulesScreen = $(".rules-screen");
    this.navigationScreen = $(".navigation-screen");
    
    this.scoreList = amplify.store('score');
    if(typeof this.scoreList == 'undefined'){
      this.scoreList = new Array();
    }
    if(this.scoreList.length>0){
      $('nav .scores').fadeIn();
      }

    this.userName = amplify.store('name');
    if(typeof this.userName == 'undefined'){
      this.userName = "";
    }else{
      $("nav .change-name b").text(this.userName);
      $("nav .change-name").show();
    }

    this.support3d = Modernizr.testAllProps('perspective');
    if(!this.support3d){
      $("body").addClass("flat");
      $("body .navigation-screen").addClass("selected");
    }else{
      $("body").addClass("perspective-3d");
    }

    if(this.support3d){
      //устанавливаем размеры элементов
      this.resizeView();
      $(window).resize($.proxy(this.resizeView,this));
      $(document).resize($.proxy(this.resizeView,this));
    }


    //инициализируем управление меню
    $('nav .scores').on('click',$.proxy(this.showScores,this));
    $('nav .rules').on('click',$.proxy(this.showRules,this));
    $('nav .new-game').on('click',$.proxy(this.showGame,this));
    $('nav .change-name').on('click',$.proxy(this.setName,this));

    $('.score .back').on('click',$.proxy(this.showNavigation,this));
    $('.rules .back').on('click',$.proxy(this.showNavigation,this));
    
    $(".game-over .ok").on('click',$.proxy(this.showNavigation,this));
    $(".name-popup .ok").on('click',$.proxy(this.saveName,this));
    
    $(".data-panel .pause").on('click',$.proxy(this.pauseSwitch,this));
    $(".data-panel .quit").on('click',$.proxy(this.showNavigation,this));

    $.keyboard('esc',$.proxy(this.showNavigation,this));
    $.keyboard('enter',$.proxy(this.saveName,this));
    $.keyboard('p',$.proxy(this.pauseSwitch,this));

    this.pauseState = null;

    this.currentState = "navigation";
    this.nextState = "navigation";

    if(this.support3d){
      this.spaceWrapper.bind("webkitTransitionEnd transitionend",$.proxy(this.setState,this));
      //плюшки в виде поворота меню
      $('body').mousemove($.proxy(this.changeOrigin,this));
    }

    $(".darkbox").delay(500).fadeOut();
  	}

    gameController.prototype.setName = function(event){
      if(typeof event !== 'undefined' && typeof event.preventDefault !== 'undefined'){
        event.preventDefault();
      }

      if(!this.support3d){
        $(".space>.selected").fadeOut();
        $(".space .game-screen").addClass("selected").fadeIn();
      }else{
        this.spaceWrapper[0].style[Modernizr.prefixed('transform')] = 'rotate(0) translateY('+Math.round(-(this.side/2))+'px)';
      }

      $(".name-popup input").val(this.userName);
      $(".name-popup input")[0].focus();
      $(".name-popup").fadeIn();

    };

    //Сохраняем начинаем игру
    gameController.prototype.saveName = function(event){
      if(typeof event !== 'undefined' && typeof event.preventDefault !== 'undefined'){
        event.preventDefault();
      }

      var toGame = false;
      if(this.userName==""){
          toGame = true;
      }

      if($(".name-popup:visible").length==0){
        return;
      }

      if($(".name-popup input").val().trim()==""){
        $(".name-popup input")[0].focus();
        return;
      }
      
      this.userName = $(".name-popup input").val();
      amplify.store('name',this.userName);

      $("nav .change-name b").text(this.userName);

      $(".name-popup").fadeOut('fast',function(){
        $(".data-panel").fadeIn('fast');
        $(".game-field").fadeIn('fast');
      });
      
      if(toGame){
        this.currentState = "game";
        this.startGame();
      }else{
        this.showNavigation();
      }
    };

    //Показываем страницу игры
    gameController.prototype.showGame = function(event){
      event.preventDefault();

      if(this.userName.trim()==""){
        this.setName();
      }else{
        if(!this.support3d){
          $(".space>.selected").fadeOut();
          $(".space .game-screen").addClass("selected").fadeIn();
        }else{
          this.spaceWrapper[0].style[Modernizr.prefixed('transform')] = 'rotate(0) translateY('+Math.round(-(this.side/2))+'px)';
        }
        this.currentState = "game";
        this.startGame();
      }
    };

    //Начинаем игру
    gameController.prototype.startGame = function(){

      this.gameField = $(".game-field");

      $(".data-panel").fadeIn();
      this.gameField.fadeIn();

      $("div",this.gameField).remove();

      this.rows = 4;
      this.cols = 4;
      this.types = 8;

      this.cardStack = new Array();

      this.errors = 0;

      this.delayBeforeShow = 500;
      this.delayBeforeHide = 3500;
      this.animationTime = 650;

      this.block = true;

      var length = this.rows*this.cols;
      var index = length;
      var card = null;
      var num = -1;
      var i = 2;

      while(index--){
        this.gameField.append("<div></div>");
      }
      
      index = length/2;
      while(index--){
        num++;
        if(num>=this.types){
          num=-1;
        }
        i=2;
        while(i--){
          card = $("div:not(.card)",this.gameField);
          $(card[Math.floor(Math.random()*card.length)]).data('type',(1+num)).addClass('card');
        }
      }

      this.cards = $(".card",this.gameField);

      window.setTimeout($.proxy(this.showAll,this),this.delayBeforeShow);
    };

    //Ставим на паузу
    gameController.prototype.pauseSwitch = function(){
      if(this.pauseState===true){
        $(".pause-popup").fadeOut();
        this.pauseState = false;
        this.timer = window.setInterval($.proxy(this.displayTimer,this),500);
        return;
      }else if(this.pauseState===false){
        $(".pause-popup").fadeIn();
        this.pauseState = true;
        window.clearInterval(this.timer);
        return;
      }
    };

    //Отрисовываем таблицу рекордов
    gameController.prototype.drawScore = function(){
      var table = $('.score table');
      var index = this.scoreList.length;
      this.scoreList.sort(function(a,b) { return parseFloat(a.score) - parseFloat(b.score) } );
      i=0;
      $("tr",table).remove();
      while(index--){
        table.append("<tr><td>"+(i+1)+".</td><td>"+this.scoreList[index].name+"</td><td>"+this.scoreList[index].score+"</td></tr>");
        i++
      }
    };

    //масштабируем страничку
    gameController.prototype.resizeView = function(){
      var viewHeight = $("body").outerHeight(true);
      var viewWidth = $("body").outerWidth(true);
      var viewRatio = viewWidth/viewHeight;
      if(viewRatio<1){
        viewRatio = 1/viewRatio;
      }
      viewRatio = Math.ceil(viewRatio);
      var gameRatio = Math.max(800/viewHeight,800/viewWidth);

      this.side = (viewRatio*2+1)*this.screenSize;
      this.spaceWrapper.css({
        width: this.side+"px",
        height: this.side+"px",
        marginTop:(-this.side/2)+"px",
        marginLeft: (-this.side/2)+"px"
      });
      if(!this.support3d){
        $(".scale")[0].style[Modernizr.prefixed('transform')] = "scale("+1/gameRatio+")";
      }else{
        $(".scale")[0].style[Modernizr.prefixed('transform')] = "scale("+1/gameRatio+") translateY("+Math.round((this.side/2))+"px)";
      }
    };

    //Показываем страницу рекордов
    gameController.prototype.showScores = function(event){
      event.preventDefault();
      this.drawScore();
      if(!this.support3d){
        $(".space>.selected").fadeOut();
        $(".space .score-screen").addClass("selected").fadeIn();

      }else{
        this.spaceWrapper[0].style[Modernizr.prefixed('transform')] = 'rotate(90deg)';
      }
      this.currentState = "score";
    };

    //Показываем страницу правил
    gameController.prototype.showRules = function(event){
      event.preventDefault();
      if(!this.support3d){
        $(".space>.selected").fadeOut();
        $(".space .rules-screen").addClass("selected").fadeIn();
      }else{
        this.spaceWrapper[0].style[Modernizr.prefixed('transform')] = 'rotate(-90deg)';
      }
      this.currentState = "rules";
    };

    //обрываем игру
    gameController.prototype.quitGame = function(){
      if(this.userName.trim() !== ""){
        $("nav .change-name b").text(this.userName);
        $("nav .change-name").css("display","block");
      }

      this.pauseState = null;
      window.clearInterval(this.timer);
      $(".data-panel .timer").text('00:00');
      $(".data-panel .scores").text('0');
      $(".data-panel .pause").fadeTo("fast",.5)
      this.score = 0;
      $(".data-panel:visible").fadeOut();
      $(".data-panel:visible").fadeOut();
      $(".name-popup:visible").fadeOut();
      $(".pause-popup:visible").fadeOut();
      $(".game-field:visible").fadeOut();
      $(".game-over:visible").fadeOut();
    };

    //Показываем страницу навигации
    gameController.prototype.showNavigation = function(event){
      if(typeof event !== 'undefined' && typeof event.preventDefault !== 'undefined'){
        event.preventDefault();
      }
      if(!this.support3d){
        $(".space>.selected").fadeOut();
        $(".space .navigation-screen").addClass("selected").fadeIn();
      }else{
        this.spaceWrapper[0].style[Modernizr.prefixed('transform')] = 'rotate(0)';
      }

      this.quitGame();
      this.currentState = "navigation";
    };
    

    //Крутим странички
    gameController.prototype.changeOrigin = function(event){
      var x = event.pageX;
      var y = event.pageY;
      var size = this.viewport();
      var origin = {
        x:Math.round((x/size.width)*60),
        y:Math.round((y/size.height)*60)
      }
      switch(this.currentState){
        case 'rules':
          var currentScreen = this.rulesScreen;
          var x = origin.x;
          var y = origin.y;
          origin.x = 60-y;
          origin.y = x;
          break;
        case 'game':
          var currentScreen = this.gameScreen;
          break;
        case 'score':
          var currentScreen = this.scoreScreen;
          var x = origin.x;
          var y = origin.y;
          origin.x = y;
          origin.y = 60-x;
          break;
        default:
        case 'navigation':
          var currentScreen = this.navigationScreen;
      }

      $(".turn-wrapper",currentScreen)[0].style[Modernizr.prefixed('transform')] = 'rotateY('+(origin.x-30)+'deg) '+'rotateX('+(-(origin.y-30))+'deg)';
    };

    //получаем размеры вьюпорта
    gameController.prototype.viewport = function(){
      var e = window
      , a = 'inner';
      if(!('innerWidth' in window)){
        a = 'client';
        e = document.documentElement || document.body;
      }
      return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
    };

  	//показываем все карты, что бы пользователь смог их запомнить
  	gameController.prototype.showAll = function(){
  		var index = this.cards.length;
  		var card = null;
  		while(index--){
  			card = $(this.cards[index]);
  			card.addClass('type-'+card.data('type'));
  		}
		this.cards.addClass('open');
    $(".data-panel .pause").fadeTo("normal",.5);

      
    	window.setTimeout($.proxy(this.hideAll,this),this.delayBeforeHide);
  	};

  	//прячем карты что бы начать игру
  	gameController.prototype.hideAll = function(){
  		this.cards.removeClass('open');
      

      if(!this.support3d){
        window.setTimeout($.proxy(this.deTypeAll,this),this.animationTime); 
      }else{
        this.cards.bind('webkitTransitionEnd transitionend',$.proxy(this.deTypeAll,this));
      }
  		
      $(".data-panel .pause").fadeTo("normal",1);
  	};

  	//отключаем типы, что бы пользователь не видел тип карты через инспектор
  	gameController.prototype.deTypeAll = function(){
      this.cards.unbind('webkitTransitionEnd transitionend');
  		var index = this.cards.length;
    		var card = null;
    		while(index--){
    			card = $(this.cards[index]);
    			card.removeClass('type-'+card.data('type'));
    		}

  		//начинаем игру
  		this.initGame();
  	};

    //инициализируем игру
    gameController.prototype.displayScore = function(add){
      this.score+=add;
      if(this.score<0){
        this.score=0;
      }
      $(".data-panel .scores").text(this.score);
    };

  	//инициализируем игру
  	gameController.prototype.initGame = function(){
      this.displayScore(0);
  		this.startTime = parseInt(new Date().getTime(),10) + 1000*this.seconds;
  		this.timer = window.setInterval($.proxy(this.displayTimer,this),500);
      this.displayTimer();
  		$(".card:not('.open')",this.gameField).live('click',$.proxy(this.openCard,this));
      this.pauseState = false;
  	};

  	//отображаем состояние таймера
  	gameController.prototype.displayTimer = function(){
  		var date = new Date();
	 	  var currentTime = date.getTime();
    	var time = this.startTime-currentTime;
      if(time<1){
        $(".data-panel .timer").text('00:00');
        this.endGame();
        return;
      }
    	var hours = Math.floor(time/3600000);
    	var minutes = Math.floor((time-(hours*3600000))/60000);
    	var seconds = Math.floor((time-(hours*3600000)-(minutes*60000))/1000);
    
    	$(".data-panel .timer").html("<b>"+this.leadingZero(minutes)+"</b>:"+this.leadingZero(seconds));
  	};

	  //дописывает 1 разрядным числам ведущий ноль
	  gameController.prototype.leadingZero = function(value){
	    if(value<10){
	      return "0"+value;
	    }
	    return value;
	  };


  	//открываем карту
  	gameController.prototype.openCard = function(event){
  		
      if(this.pauseState===true){
        return;
      }

  		var card = $(event.currentTarget);
  		if(card.hasClass("open")||card.hasClass("animated")||card.hasClass("removed")||card.hasClass("removedFromClosed")){
  			return;
  		}

  		card.addClass('type-'+card.data('type')+' open');
  		this.cardStack.push(card);

  		var half = this.cardStack.length/2;
  		if(half - Math.floor(half) == 0){
  			window.setTimeout($.proxy(this.compareCards,this),this.animationTime);
  		}
  	};

    //Сравниваем карты
  	gameController.prototype.compareCards = function(){
  		if(this.cardStack[0].data('type')==this.cardStack[1].data('type')){
  			this.cardStack[0].removeClass('open').addClass('removed');
  			this.cardStack[1].removeClass('open').addClass('removed');
        this.displayScore(30);
  		}else{
  			this.errors++;
  			this.cardStack[0].removeClass('open').addClass("animated");
  			this.cardStack[1].removeClass('open').addClass("animated");
        this.displayScore(-5);
  		}

  		var unremoved = $(".card:not('.removed')",this.gameField);
  		if(unremoved.length<=2){
  			unremoved.addClass("removedFromClosed");
  			window.setTimeout($.proxy(this.detypeAB,this),this.animationTime);
  			this.endGame();
  		}
  		window.setTimeout($.proxy(this.detypeAB,this),this.animationTime);
      
  	};

  	gameController.prototype.detypeAB = function(){
  		if(this.cardStack.length>1){
  			this.cardStack[0].removeClass('type-'+this.cardStack[0].data('type')).removeClass("animated");
  			this.cardStack[1].removeClass('type-'+this.cardStack[1].data('type')).removeClass("animated");
  			this.cardStack.splice(0,2);
  		}
  		$(".removed",this.gamField).css("visibility","hidden");
  	};


  	//закончили игру
  	gameController.prototype.endGame = function(){

      //сбрасываем карты
      $(".card:not(.open)",this.gamField).addClass("removedFromClosed");
      $(".card.open",this.gamField).addClass("removed");

      //переводим оставшееся время в очки
      var date = new Date();
      var currentTime = date.getTime();
      var time = this.startTime - currentTime;
      time = Math.max(time,0);

      //Сохраняем рекорд
      if(this.score>0){
        this.scoreList.push({name:this.userName, score:this.score});
        this.scoreList.sort(function(a,b) { return parseFloat(a.score) - parseFloat(b.score) } );
        if(this.scoreList.length>10){
          this.scoreList.pop(); 
        }
        $('nav .scores').fadeIn();
      }
      amplify.store('score',this.scoreList);

      //показываем ваш рекорд
      this.displayScore(Math.ceil(time/1000));
      $(".game-over .finalScore").text(this.score);

      //Закрываем все окна
      this.quitGame();

      $(".game-over").fadeIn();
  	};

  	gameController.prototype.showNav = function(event){
  		event.preventDefault();
  		this.gameField = $(".score");
  		$(".page")[0].style[Modernizr.prefixed('transform')] = 'translateY(100%) rotate(0)';
  	};

	function onDOMReady(){
		global.gameController = new gameController();

	}

	if(document.getElementsByTagName("FOOTER").length==0){
	  $(document).ready(onDOMReady);  
    //$("body").queryLoader2();
	}else{
	  onDOMReady();
    //$("body").queryLoader2();
	}

  window.addEventListener('DOMContentLoaded', function() {
    //$("body").queryLoader2();
  });

  if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, ''); 
    }
  }

})(this);