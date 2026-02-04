(function(global){
	
	function configureController(){
	  $(".widget-control-widget .remove a").click($.proxy(this.removeBlock,this));
	  $(".widget-control-widget .configure a").click($.proxy(this.showConfig,this));
	  $(".configure-block-widget .controls .close a").click($.proxy(this.closeConfig,this));
	  $(".configure-block-widget button").click($.proxy(this.closeConfig,this));
	}
	
  configureController.prototype.removeBlock = function(event){
    event.preventDefault();
    event.currentTarget.blur();
    
    $(event.currentTarget).parents(".widget-control-widget").parent().fadeOut($.proxy(this.ieRefresh,this));
  };
  
  configureController.prototype.showConfig = function(event){
    event.preventDefault();
    event.currentTarget.blur();
    $(event.currentTarget).parents(".widget-control-widget").next().fadeIn($.proxy(this.ieRefresh,this));
  };
  
  configureController.prototype.closeConfig = function(event){
    event.preventDefault();
    event.currentTarget.blur();
    
 $(event.currentTarget).parents(".configure-block-widget").fadeOut($.proxy(this.ieRefresh,this));
  };
	
	configureController.prototype.ieRefresh = function(){
	  var wrapper = $(".site")[0];
    wrapper.style.zoom = "2";
    wrapper.style.zoom = "1";
  }
	
	function onDOMReady(){
		global.configureController = new configureController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);