(function(global){
  function previousOrdersController(){
  	this.widget = $(".previous-orders-widget");
  	if(this.widget.length==0){
  		return;
  	}
  	$(".order-details",this.widget).click($.proxy(this.swapItemList,this));
  }

  previousOrdersController.prototype.swapItemList = function(event){
    $(".items-list",event.currentTarget.parentNode).slideToggle();
  };

  function onDOMReady(){
    global.previousOrdersController = new previousOrdersController();
  }
  $(document).ready(onDOMReady);
})(this);