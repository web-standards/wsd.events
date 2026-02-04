(function(global){

  function accordionController(){}

  accordionController.prototype.init = function(){
    this.widget = $(".accordion-widget");
    if(this.widget.length==0){
      delete this.widget;
      return;
    }
    var elements = $(".container",this.widget);
    var index = elements.length;
    var height = 0;
    while(index--){
      height = Math.max(height,$(elements[index]).outerHeight(true));
    }
    
    var elements = $(".title",this.widget);
    var index = elements.length;
    var titleHeight = 0;
    while(index--){
      titleHeight+= $(elements[index]).outerHeight(true);
    }
    
    
    var global = $(".global-title",this.widget);
    if(global.length>0){
      var additional = global.outerHeight(true);
      this.widget.height(height+titleHeight+additional);
    }else{
      this.widget.height(height+titleHeight);  
    }
    
    $(".title a",this.widget).click($.proxy(this.openTab,this));
    
    $(".title:eq(0) a",this.widget).addClass("opened");
    
    $(".container",this.widget).hide();
    $(".container:eq(0)",this.widget).show();
  };
  
  accordionController.prototype.openTab = function(event){
    event.preventDefault();
    var button = $(event.currentTarget);
    button[0].blur();
    
    if(button.hasClass("opened")){
      return;
      }
    
    $(".opened",this.widget).parent().next().slideUp();
    $(".opened",this.widget).removeClass("opened");
    
    button.addClass("opened");
    $(".opened",this.widget).parent().next().slideDown();
  };
	
  global.accordionController = new accordionController();
})(this);