
  function userListController(widget){
   this.widget = $(widget);
   if(this.widget.length==0){
      return;
    }
   this.list = $(".user-list ul",this.widget);

    
   this.wrapper = $(".user-list .user-list-wrapper",this.widget);
//   this.filter = $("input.filter").keyup($.proxy(this.filterUserList,this));

/*
   this.selectAll = document.getElementById("friend-list-widget-all");
   this.selectAllLabel = $(this.selectAll).next();
   this.scroll = null;
   this.handle = null;
   this.users = {};
   this.maxHeight = parseInt(this.wrapper.height(),10);
   this.initScroll();
   $(this.selectAll).bind("click",$.proxy(this.selectAllChange,this));
   $(this.selectAllLabel).bind("click",$.proxy(this.selectAllChange,this));
   $("input:checkbox",this.list).bind("change",$.proxy(this.configureSwitch,this));
   
   this.getUserList();
   this.configureInput();*/
    
  if($("input.filter").length>0){
        this.filterState = true;
        this.wrapper.height($(".user-list").height()-38);
         this.filter = $("input.filter").keyup($.proxy(this.filterUserList,this));
        }else{
         this.filterState = false;
         this.wrapper.height($(".user-list").height()-8); 
         this.wrapper.css({
           "margin-top":"4px",
           "margin-bottom":"4px"
        })
      }

       this.selectAll = document.getElementById("friend-list-widget-all");
    if($(this.selectAll).length>0){
      this.selectAllState = true;
      this.selectAllLabel = $(this.selectAll).next();
      $(this.selectAll).bind("click",$.proxy(this.selectAllChange,this));
      $(this.selectAllLabel).bind("click",$.proxy(this.selectAllChange,this));
    }else{
       this.selectAllState = false;
    }

     this.scroll = null;
     this.handle = null;
     this.users = {};
     this.maxHeight = parseInt(this.wrapper.height(),10);
     this.initScroll();
      $("input:checkbox",this.list).bind("change",$.proxy(this.configureSwitch,this));

      this.getUserList();
      this.configureInput();
  };

  userListController.prototype.getUserList = function(){
    var users = $("input:checkbox",this.list);
    var user = null;
    var id = null;
    var label = null;
    var index = users.length;
    while(index--){
      user = users[index];
      id = user.getAttribute("id");
      label = $("label[for='"+id+"']")[0];
      this.users[id] = {
        input:user,
        id:id,
        visible:true,
        name: $(".name",label).text().toLowerCase(),
        label:label
      }
    }
  };
  
  userListController.prototype.filterUserList = function(event){
    var keyword = this.filter.val().toLowerCase();
    for (id in this.users){
      if(this.users[id].name.indexOf(keyword)==-1){
        if(this.users[id].visible===true){
          this.users[id].input.checked = false;
          this.users[id].visible = false;
          this.users[id].input.parentNode.style.display="none";
        }
      }else{
        if(this.users[id].visible===false){
          this.users[id].visible = true;
          this.users[id].input.parentNode.style.display="block";
        }
      }
    }

    this.configureSwitch();
    this.initScroll();
    this.configureInput();
  };

  userListController.prototype.configureInput = function(){
    if(!-[1,]===false){
      return;
    }
    var label = null;
    for (id in this.users){
      label = $(this.users[id].label);
      if(this.users[id].input.checked&&!label.hasClass("checked")){
        label.addClass("checked");
      }else if(!this.users[id].input.checked&&label.hasClass("checked")){
        label.removeClass("checked");
      }
    }
  };

  userListController.prototype.selectAllChange = function(){

      for (id in this.users){
        if(this.selectAll.checked){
          if(this.users[id].visible===true&&this.users[id].input.checked===false){
            this.users[id].input.checked = true;
          }else if(this.users[id].visible===false&&this.users[id].input.checked===true){
            this.users[id].input.checked = false;
          }
        }else{
          if(this.users[id].input.checked === true){
            this.users[id].input.checked = false;
          }
        }
      }

    this.configureInput();
  };
  
  userListController.prototype.configureSwitch = function(){
    
    var selected = true;
    var visible = 0;
    for (id in this.users){
      if(!this.users[id].visible){
        continue;
      }
      visible++;
      if(!this.users[id].input.checked){
        selected = false;
      }
      if(visible>0&&selected===false){
        break;
      }
    }
    
    if(visible>0&&selected==true){
      this.selectAll.checked = true;
    }else{
      this.selectAll.checked = false;      
    }
    
    this.configureInput();
  };
  
  userListController.prototype.initScroll = function(){
    var scroll = $(".user-list-scroll",this.widget);    
    var height = parseInt(this.list.height(),10);

    if(height>this.maxHeight){
      
      if(scroll.length==0){
        this.list.after(''+
        '<div class="user-list-scroll">'+
          '<div class="user-list-scroll-handle"></div>'+
        '</div>');
        this.scroll = $(".user-list-scroll",this.widget);
        this.handle = $(".user-list-scroll-handle",this.scroll);
                
        this.handle.draggable({
          axis: "y",
          containment: "parent",
          drag:$.proxy(this.onScroll,this)
        });
        this.list.bind('mousewheel',$.proxy(this.weelScroll,this));
        this.scroll.bind('mousewheel',$.proxy(this.weelScroll,this));
        this.scroll.bind('click',$.proxy(this.scrollTo,this));
      }
      
      var delta = height - this.maxHeight;        
      this.handle.height(Math.floor((this.maxHeight/height)*this.scroll.height()));
      
    }else{
      scroll.remove();
    }
    

  };

  userListController.prototype.weelScroll = function(event, delta){
    event.preventDefault();
    
    if (navigator.appVersion.indexOf("Mac")!=-1){
        if(typeof java != "undefined"){
           if(parseInt(java.lang.System.getProperty('os.version').split(".").join(""),10)>1060){
             delta*=-1;
           }

        }else{
          delta*=-1;
         }
      }
    
    var top = parseInt(this.handle.css("top"),10);
    var max = this.scroll.height()-this.handle.height();
    
    if(top==0&&delta<0){
      return;
    }
    
    if(top==max&&delta>0){
      return;
    }
    
    var targ = top+Math.ceil(delta*10);
    
    if(targ<0){
      targ=0;
    }
    
    if(targ>max){
      targ=max;
    }
        
    this.handle.css({
      top:targ
    })
    
    this.onScroll();
  };

  userListController.prototype.scrollTo = function(event){
    var top = parseInt(this.list.css("top"),10);
    var perc = event.offsetY*100/this.wrapper.outerHeight();
    var targ = Math.round((this.list.height()-this.wrapper.height())*perc/100);

    this.list.stop().animate({
      top:-targ+"px"
    },{
      duration: 300
    });
    this.setHolderPosition(-targ,true);
  };
  
  userListController.prototype.setHolderPosition = function(targ,animation){
    var top = parseInt(this.list.css("top"),10);
    var perc = Math.abs(targ)*100/(this.list.height()-this.wrapper.height());
    var delta = (this.scroll.height()-this.handle.height())*perc/100;
    var delay = (Math.abs(top)-Math.abs(targ))*50;
    
    if(animation){
      this.handle.stop().animate({
        top:delta
      },{
       duration: 300
      });
    }else{
      this.handle.css({
        top:delta
      });
    }
  };
  
  userListController.prototype.onScroll = function(){
    
      var space = this.scroll.height()-this.handle.height();
      var delta = this.handle.offset().top-this.scroll.offset().top;
      var wrapperDelta = this.list.height() - this.wrapper.height();
      var perc = delta*100/space;
      
      this.list.css({
        top:-Math.floor((this.list.height()-this.wrapper.height())*perc/100)
      });
  };
  

  function onDOMReady(){
    var list = $(".friend-list-widget");
    var index = list.length;
    while(index--){
      new userListController(list[index]);
    }
  }
  
  if($(".friend-list-widget .skip").length==0){
    $(document).ready(onDOMReady);  
  }else{
    onDOMReady();
  }
  