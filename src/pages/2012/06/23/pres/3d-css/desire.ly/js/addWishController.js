(function(global){
	
	function addWishController(){
		this.widget = $(".add-wish-form");
		if(this.widget.length===0){
			return;
		}
		this.lightbox = $(".lightbox");

		$(document).on("click", "a.add-wish-link", $.proxy(this.open,this));
		$(".your-details-widget .new-wish a").click($.proxy(this.open,this));
		$(".cancel",this.widget).click($.proxy(this.close,this));
		$(".add",this.widget).click($.proxy(this.create,this));
	}
	
	addWishController.prototype.open = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		this.widget.fadeIn();
		this.lightbox.fadeIn();

		this.lightbox.one("click",$.proxy(this.close,this));
	};

	addWishController.prototype.close = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.widget.fadeOut($.proxy(function(){
			this.widget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};

	addWishController.prototype.create = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.widget.fadeOut($.proxy(function(){
			this.widget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};
		
	function onDOMReady(){
   		global.addWishController = new addWishController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);