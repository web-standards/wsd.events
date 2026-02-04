(function(global){
  
  function onDOMReady(){
    global.mooController = new  mooController();
  }
  
  function mooController(){
    $("body").bind("sethash",$.proxy(this.checkHash,this));
  }

  mooController.prototype.checkHash = function(event){
    var hash = parseInt(window.location.hash.slice(1),10);
    if(hash==16){
    	$(".moo-activity-hidden").addClass("moo-activity");
    }else{
    	$(".moo-activity-hidden").removeClass("moo-activity");
    }
  }

  
  //$(document).ready(onDOMReady);
  $(window).load(onDOMReady);

})(this);