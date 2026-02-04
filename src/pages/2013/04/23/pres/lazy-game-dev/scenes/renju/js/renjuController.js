(function(global){

  function Player(num){
    this.player = Handlebars.compile($("#player").html());
    this.avatar = {
      x:0,
      y:0
    };
    this.name = '';
    this.id = Math.floor(Math.random()*100000);
    this.first==false;
    if(num==1){
      this.first==true;
    }
  }

  Player.prototype.turn = function(event){
    this.domPlayer.toggleClass('selected');
  };

  Player.prototype.init = function(){
    $('.information').append(this.player({
      name: this.name,
      x: this.avatar.x,
      y: this.avatar.y,
      first: this.first,
      id: this.id
    }));
    this.domPlayer = $(document.getElementById(this.id));
  };


  function Place(){
    this.player = null;
    this.building = null;
    this.level = null;
  }

  function renjuController(){

    this.avatar_popup =  $('.avatars-popup');
    this.avatar_icons =  this.avatar_popup.find('.icons');
    this.create_two_users_screen =  $('.two-user-screen');
    this.see_game_screen =  $('.see-game-screen');
    this.create_single_user_screen =  $('.single-user-screen');
    this.start_screen = $('.start-screen');
    this.standoff_screen = $('.standoff');
    this.win_screen = $('.win-screen');
    this.game_screen = $('.game');

    this.see_game_screen.on('click',$.proxy(this.endGame,this));
    this.win_screen.find('.ok').on('click',$.proxy(this.backToMain,this));
    this.win_screen.find('.replay').on('click',$.proxy(this.replayGame,this));
    this.game_screen.find('.quit').on('click',$.proxy(this.backToMain,this));

    this.church_message = Handlebars.compile($("#church_message").html());
    this.house_message = Handlebars.compile($("#house_message").html());
    this.loose_message = Handlebars.compile($("#loose_message").html());

    this.player = Handlebars.compile($("#player").html());
    this.house = Handlebars.compile($("#house").html());
    this.church = Handlebars.compile($("#church").html());
    this.standoff_message = Handlebars.compile($("#standoff_message").html());

    this.turn = 0;
    this.place_size = 50;
    this.field = $('.field');
    this.board = this.field.find('.board');
    this.board_top = this.board.find('.board-top');

    $('.start-screen .online').on('click',$.proxy(this.online,this));
    $('.start-screen .hotseat').on('click',$.proxy(this.hotseat,this));

    this.create_two_users_screen.find('.avatar').on('click',$.proxy(this.selectAvatar,this));
    this.create_two_users_screen.find('.cancel').on('click',$.proxy(this.backToStart,this));
    this.avatar_popup.on('click',$.proxy(this.cancelAvatar,this));
    this.avatar_icons.on('click',$.proxy(this.updateAvatar,this));
    this.create_two_users_screen.find('form').on('submit',$.proxy(this.createUser,this));
    this.create_two_users_screen.find('input').on('change',$.proxy(this.checkName,this));
    this.create_two_users_screen.find('.confirm').on('click',$.proxy(this.startHotseatGame,this));
  }

  renjuController.prototype.backToMain = function(event){
    event.preventDefault();

    this.see_game_screen.hide();
    this.game_screen.hide();
    this.win_screen.hide();
    $('.game .board-top *').remove();
    $('.game .information .player').remove();
    this.start_screen.show();
  };

  renjuController.prototype.replayGame = function(event){
    event.preventDefault();

    this.see_game_screen.hide();
    this.game_screen.hide();
    this.win_screen.hide();
    $('.game .board-top *').remove();
    $('.game .information .player').remove();

    this.startHotseatGame(event);
  };

  renjuController.prototype.endGame = function(event){
    event.preventDefault();
    this.game_screen.hide();
    this.see_game_screen.hide();
    this.game_screen.find('.field').removeClass('played');
    this.win_screen.show();
  };

  renjuController.prototype.startHotseatGame = function(event){
    event.preventDefault();
    this.create_two_users_screen.hide();
    this.game_screen.show();
    this.startGame();
  };


  renjuController.prototype.createHouse = function(event){
    var place = $(event.currentTarget),
        first = (Math.floor(this.turn/2) == this.turn/2),
        id = null,
        y = parseInt(place.attr('data-y'),10),
        x = parseInt(place.attr('data-x'),10);

    place.off('click').addClass('passive');

    if(first){
      place.append(this.church({}));
      place.building = place.find('.church');
      current_player = this.player1;
    }else{
      place.append(this.house({}));
      place.building = place.find('.house');
      current_player = this.player2;
    }

    place.player = current_player;
    id = current_player.id;

    this.gameField[y][x] = place;
    // console.log(this.gameField);

    win = false;
    loose = false;
    count = 0;
    place_list = [];

    // vertical
    dy = parseInt(y,10);
    while(dy>=0){
      tmp_place = this.gameField[dy][x];
      if(
        (tmp_place.player==null)||
        (current_player.id != tmp_place.player.id)
        ){

        dy++;
        tmp_place = this.gameField[dy][x];

        while(
          dy<15&&
          tmp_place.player!==null
        ){

          tmp_place = this.gameField[dy][x];
          if(
            (tmp_place.player==null)||
            (current_player.id != tmp_place.player.id)
          ){
            break;
          }

          place_list.push(tmp_place);
          count++;
          dy++;
        }

        break;
      }

      dy--;
    }


    this.testResult(current_player,place_list,count);

    win = false;
    loose = false;
    count = 0;
    place_list = [];

    // horizontal
    dx = parseInt(x,10);
    while(dx>=0){
      tmp_place = this.gameField[y][dx];
      if(
        (tmp_place.player==null)||
        (current_player.id != tmp_place.player.id)
        ){

        dx++;
        tmp_place = this.gameField[y][dx];

        while(
          dx<15&&
          tmp_place.player!==null
        ){

          tmp_place = this.gameField[y][dx];
          if(
            (tmp_place.player==null)||
            (current_player.id != tmp_place.player.id)
          ){
            break;
          }

          place_list.push(tmp_place);
          count++;
          dx++;
        }

        break;
      }

      dx--;
    }

    this.testResult(current_player,place_list,count);

    win = false;
    loose = false;
    count = 0;
    place_list = [];

    // diagonal 1
    dx = parseInt(x,10);
    dy = parseInt(y,10);
    while(
      dx>=0&&
      dy>=0
    ){

      tmp_place = this.gameField[dy][dx];

      if(
        (tmp_place.player==null)||
        (current_player.id != tmp_place.player.id)
        ){

        dx++;
        dy++;
        tmp_place = this.gameField[dy][dx];

        while(
          dx<15&&
          dy<15&&
          tmp_place.player!==null
        ){

          tmp_place = this.gameField[dy][dx];
          if(
            (tmp_place.player==null)||
            (current_player.id != tmp_place.player.id)
          ){
            break;
          }

          place_list.push(tmp_place);
          count++;
          dx++;
          dy++;
        }

        break;
      }

      dx--;
      dy--;
    }

    this.testResult(current_player,place_list,count);

    win = false;
    loose = false;
    count = 0;
    place_list = [];

    // diagonal 2
    dx = parseInt(x,10);
    dy = parseInt(y,10);
    while(
      dx<15&&
      dy>=0
    ){

      tmp_place = this.gameField[dy][dx];

      if(
        (tmp_place.player==null)||
        (current_player.id != tmp_place.player.id)
        ){

        dx--;
        dy++;
        tmp_place = this.gameField[dy][dx];

        while(
          dx>=0&&
          dy<15&&
          tmp_place.player!==null
        ){

          tmp_place = this.gameField[dy][dx];
          if(
            (tmp_place.player==null)||
            (current_player.id != tmp_place.player.id)
          ){
            break;
          }

          place_list.push(tmp_place);
          count++;
          dx--;
          dy++;
        }

        break;
      }

      dx++;
      dy--;
    }

    this.testResult(current_player,place_list,count);


    this.endTurn();
  };

  renjuController.prototype.testResult = function(current_player,place_list,count){
    if(count>=5){
      win = true;
    }

    if(
        count>5&&
        current_player.first==true
      ){
      win = false;
      loose = true;
    }

    if(win){
      index = place_list.length;
      while(index--){
        place_list[index].building.addClass('marked_win');
      }
      this.game_screen.find('.board-top .place').off('click');
      this.game_screen.find('.information .pass').remove();
      this.game_screen.find('.field').addClass('played');

      if(current_player.first==true){
        this.win_screen.find('.message').html(this.church_message({
          player1: this.player1.name,
          player2: this.player2.name
        }));
      }else{
        this.win_screen.find('.message').html(this.house_message({
          player1: this.player1.name,
          player2: this.player2.name
        }));
      }
      this.see_game_screen.show();
      // this.win_screen.show();
    }

    if(loose){
      index = place_list.length;
      while(index--){
        place_list[index].building.addClass('marked_loose');
      }
      this.game_screen.find('.board-top .place').off('click');
      this.game_screen.find('.information .pass').remove();
      this.game_screen.find('.field').addClass('played');

      this.win_screen.find('.message').html(this.loose_message({
        player1: this.player1.name,
        player2: this.player2.name
      }));

      this.see_game_screen.show();
      // this.win_screen.show();
    }
  };

  renjuController.prototype.standoff = function(){
    $('.game').hide().find('information *').remove();
    $('.game .board-top *').remove();
    $('.game .information .player').remove();
    var standoff = $('.standoff');
    standoff.prepend(this.standoff_message({
      player1: this.player1.name,
      player2: this.player2.name
    })).show();
  };

  renjuController.prototype.endTurn = function(){
    this.turn++;
    this.player1.turn();
    this.player2.turn();
    if(this.turn==6){
      $('.game .information .player .pass').css('display','inline-block');
    }
  };

  renjuController.prototype.pass = function(event){
    event.preventDefault();

    if(this.last_pass==this.turn-1){
      this.standoff();
      }
    this.last_pass = this.turn;
    this.endTurn();
  };

  renjuController.prototype.generateBoard = function(){
    var h = 15,
        figure = null;
    while(h--){
      v = 15;
      while(v--){

        figure = document.createElement('div');
        figure.className = 'place';
        figure.setAttribute('data-x',h);
        figure.setAttribute('data-y',v);

        $(figure).css({
          left: this.place_size*h + 'px',
          top: this.place_size*v + 'px',
          "z-index": (v+1)*10+(15-Math.abs(7-h))
        });
        this.board_top.append(figure);
      }
    }
    this.board_top.find('.place').on('click',$.proxy(this.createHouse,this));

  };


  renjuController.prototype.startGame = function(){
    var p1 = this.create_two_users_screen.find('.player-1'),
        p2 = this.create_two_users_screen.find('.player-2');
    this.turn = 0;
    this.gameField = [];
    var v = 15
    while(v--){
      h = 15;
      this.gameField.push([]);
      while(h--){
        this.gameField[14-v].push(new Place);
      }
    }

    this.player1 = new Player;
    this.player1.name = p1.find('.name').text();
    this.player1.first = true;
    this.player1.avatar.x = p1.find('.avatar').attr('data-avatar-x');
    this.player1.avatar.y = p1.find('.avatar').attr('data-avatar-y');
    this.player1.init();

    this.player2 = new Player;
    this.player2.name = p2.find('.name').text();;
    this.player2.avatar.x = p2.find('.avatar').attr('data-avatar-x');
    this.player2.avatar.y = p2.find('.avatar').attr('data-avatar-y');
    this.player2.init();

    $('.player .pass').on('click',$.proxy(this.pass,this));
    $('.standoff .ok').on('click',$.proxy(this.startScreen,this));

    this.generateBoard();
  };

  renjuController.prototype.checkName = function(event){
    event.preventDefault();
    var input = $(event.currentTarget),
        start_name = input.val().trim(),
        name = start_name.replace(/[^a-zA-Zа-яА-Я]/g,"").trim();
    input.val(name);
    if(start_name.length==0){
      input[0].setCustomValidity("Ты не представился. Это меня обижает.");
      return;
      }
    if(name==''||name.length<2||name.length>20){
      input[0].setCustomValidity("На нашей планете имена коротки, хотя и не слишком и состоят только из букв. Смирись.");
      return;
    }
    input[0].setCustomValidity("");
  };

  renjuController.prototype.backToStart = function(event){
    event.preventDefault();
    this.create_single_user_screen.hide();
    this.create_two_users_screen.hide();
    // this.create_single_user_screen.find('form').each(function(){this.reset());
    // this.create_two_users_screen.find('form').each(function(){this.reset()});
    this.start_screen.show();
    };

  renjuController.prototype.online = function(event){
    event.preventDefault();
    return;
    this.start_screen.hide();
    this.create_single_user_screen.show();
    };

  renjuController.prototype.createUser = function(event){
    event.preventDefault();
    var form = $(event.currentTarget),
        input = form.find('input'),
        start_name = input.val().trim(),
        name = start_name.replace(/[^a-zA-Zа-яА-Я]/g,"").trim(),
        avatar = form.find('.avatar'),
        x = avatar.attr('data-avatar-x'),
        y = avatar.attr('data-avatar-y'),
        first = form.hasClass('first-user'),
        id = Math.floor(Math.random()*100000),
        player = this.player({
          name: name,
          x: x,
          y: y,
          first: first,
          id: id
        });

      if(start_name.length==0){
        input[0].setCustomValidity("Ты не представился. Это меня обижает.");
        return;
        }
      if(name==''||name.length<2||name.length>20){
        input[0].setCustomValidity("На нашей планете имена коротки, хотя и не слишком и состоят только из букв. Смирись.");
        return;
      }

      before = form.prev();
      if(before.hasClass('player')){
        before.remove();
      }
      form.hide().before(player);
      $('#'+id).find('.remove').on('click',$.proxy(this.removeUser,this));
      if(this.create_two_users_screen.find('.player').length==2){
        this.create_two_users_screen.find('.confirm').show();
      }
    };

  renjuController.prototype.removeUser = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        player = link.closest('.player'),
        form = player.next();
        player.remove();
        form.show();
    this.create_two_users_screen.find('.confirm').hide();
  };

  renjuController.prototype.hotseat = function(event){
    event.preventDefault();
    this.start_screen.hide();

    var avatar = this.create_two_users_screen.find('form .avatar'),
        x = Math.floor(Math.random()*9)*23,
        y = Math.floor(Math.random()*7)*23,
        oldx = x,
        oldy = y;

    $(avatar[0]).css({
      'background-position':'-'+x+'px -'+y+'px'
    }).attr('data-avatar-x',x).attr('data-avatar-y',y);

    while(x==oldx&&y==oldy){
      x = Math.floor(Math.random()*9)*23;
      y = Math.floor(Math.random()*7)*23;
    }

    $(avatar[1]).css({
      'background-position':'-'+x+'px -'+y+'px'
    }).attr('data-avatar-x',x).attr('data-avatar-y',y);

    this.create_two_users_screen.show();
    $('form:visible input:eq(0)').focus();
    };

  renjuController.prototype.selectAvatar = function(event){
    event.preventDefault();
    this.avatar_popup.show();
    this.avatar_popup.player_avatar = $(event.currentTarget);
    };

  renjuController.prototype.updateAvatar = function(event){
    event.preventDefault();
    event.originalEvent.cancelBubble = true;
    var container = $(event.currentTarget),
        x = Math.floor((event.clientX-container.offset().left)/23)*23,
        y = Math.floor((event.clientY-container.offset().top)/23)*23;
    this.avatar_popup.player_avatar.css({
      'background-position':'-'+x+'px -'+y+'px'
    }).attr('data-avatar-x',x).attr('data-avatar-y',y);
    this.avatar_popup.player_avatar = null;
    this.avatar_popup.hide();
    };

  renjuController.prototype.cancelAvatar = function(event){
    event.preventDefault();
    this.avatar_popup.hide();
    };

  renjuController.prototype.startScreen = function(event){
    event.preventDefault();
    $('.game').hide();
    $('.standoff').hide();
    $('.start-screen').show();
  };

  renjuController.prototype.getTransform = function(element){
    var st = window.getComputedStyle(element, null);
    var transform = st.getPropertyValue("-webkit-transform") ||
                    st.getPropertyValue("-moz-transform") ||
                    st.getPropertyValue("-ms-transform") ||
                    st.getPropertyValue("-o-transform") ||
                    st.getPropertyValue("transform");
    if(transform == 'none'){
      transform ='';
    }
    return transform;
  };

  function onDomReady(){
    new renjuController;
  }

  $(document).ready(onDomReady);

})(this)

if (!window.getComputedStyle) {
  window.getComputedStyle = function(el, pseudo) {
    this.el = el;
    this.getPropertyValue = function(prop) {
    var re = /(\-([a-z]){1})/g;
    if (prop == 'float') prop = 'styleFloat';
    if (re.test(prop)) {
      prop = prop.replace(re, function () {
        return arguments[2].toUpperCase();
      });
    }
    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
  }
}