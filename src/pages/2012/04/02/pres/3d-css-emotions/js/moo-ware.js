(function(global){
  
  function onDOMReady(){
    global.mooController = new  mooController();
  }
  
  function mooController(){
    $("body").bind("sethash",$.proxy(this.checkHash,this));
  }

  mooController.prototype.checkHash = function(event){
    var hash = parseInt(window.location.hash.slice(1),10);
    if(hash==38){
    	$(".moo-activity-hidden-ware").addClass("moo-activity-ware");
    }else{
    	$(".moo-activity-hidden-ware").removeClass("moo-activity-ware");
    }
  }

  
  //$(document).ready(onDOMReady);
  $(window).load(onDOMReady);

})(this);