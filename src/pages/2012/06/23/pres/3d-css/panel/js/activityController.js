(function(global){
  function activityController(){
    this.widget = $(".game-lightbox-widget");
    this.usersLoaded = false;
    this.users = null;
    this.popup = null;

    $(".header-widget .profile,.how-to-navigation a").click($.proxy(this.showMainPopup,this));
    $(".ok",this.widget).click($.proxy(this.hideMainPopup,this));

    $("a.invite",this.widget).click($.proxy(this.invideFriends,this));
    $("a.register",this.widget).click($.proxy(this.registerFriends,this));
    $("a.post-own",this.widget).click($.proxy(this.postOnYourWall,this));
    $("a.post-friend",this.widget).click($.proxy(this.postFriendsWall,this));

    console.log(new Date().getTime());
  }

  activityController.prototype.invideFriends = function(event){
    event.preventDefault();
    if(this.popup != null){
      return;
    }
    this.createPopUp();
    this.generateUserList();
  };

  activityController.prototype.generateUserList = function(){
    if(!this.usersLoaded){
      window.setTimeout($.proxy(this.generateUserList,this),1000);
      return;
    }
    $(".user-list-wrapper",this.popup).css("background","none");
    console.log(this.users);
  };

  activityController.prototype.createPopUp = function(){

    var index = new Date().getTime();
    var popup = '\
      <section class="invite-user-widget popup-'+index+'">\
        <div class="friend-list-widget">\
          <div class="user-list">\
            <div class="user-list-wrapper">\
              <ul>\
              </ul>\
            </div>\
          </div>\
        </div>\
        <a href="#" class="cancel">Cancel</a>\
      </section>';

      $('body').append(popup);
      this.popup = $(".popup-"+index);
      $(".cancel",this.popup).click($.proxy(this.closePopup,this));


      this.popup.fadeIn();
  };

  activityController.prototype.closePopup = function(event){
    event.preventDefault();

    this.popup.fadeOut($.proxy(function(){
      this.popup.remove();
      this.popup = null;
    },this));
  };

  activityController.prototype.registerFriends = function(event){
    event.preventDefault();
  };

  activityController.prototype.postFriendsWall = function(event){
    event.preventDefault();

    if(this.popup != null){
      return;
    }
    this.createPopUp();
  };

  //себе на стену постим
  activityController.prototype.postOnYourWall = function(event){
    event.preventDefault();
    
    FB.ui({
      to: event.currentTarget.getAttribute("data-user-id"),
      method: 'feed',
      link: 'http://apps.facebook.com/giftofoni/',
      picture: 'http://dl.dropbox.com/u/2440979/hero.jpg',
      name: '100 adet yepyeni iPhone 4S',
      caption: 'İçlerinden birini arkadaşına tamamen ücretsiz gönderebileceksin',
      description: 'En aktif ve sadık kullanıcılarımıza ödüllerimizi gururla sunuyoruz',
      name: 'Bu uygulamayı kabul et ve bana iPhone 4S kazandır'
    },$.proxy(this.wallPost,this));
  };

  //Запрашиваем список друзей пользователя
  activityController.prototype.getUserList = function(){
    FB.getLoginStatus($.proxy(function(response) {
      if (response.status === 'connected') {
        FB.api({
           method: 'fql.query',
           query: 'SELECT name, url, pic_small, id FROM profile WHERE id IN (SELECT uid2 FROM friend WHERE uid1 = me())'
         },$.proxy(this.createUserList,this));
      }
     },this));
  };

  //Сохраняем список друзей
  activityController.prototype.createUserList = function(responce){
    this.users = responce;
    this.usersLoaded = true;
  };

  //показываем попап
  activityController.prototype.showMainPopup = function(event){
    event.preventDefault();
    this.widget.css({
      "display":"none",
      "visibility":"visible"
    })
    this.widget.fadeIn();
  };

  //прячем попап
  activityController.prototype.hideMainPopup = function(event){
    event.preventDefault();
    this.widget.fadeOut();
  };

  function onDOMReady(){
    global.activityController = new activityController();
  }
  $(document).ready(onDOMReady);
})(this);