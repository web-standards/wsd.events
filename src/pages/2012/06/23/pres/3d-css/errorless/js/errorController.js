(function(global){
	function errorController(){
		this.widget = $(".error-widget");
		if(this.widget.length==0){
			return;
		}
		$('.tabs a',this.widget).on('click',$.proxy(this.open,this));
	}

	errorController.prototype.open = function(event){
		event.preventDefault();
		$(".tabs a.selected",this.widget).removeClass("selected");
		$(event.currentTarget).addClass("selected");
		$(".tabspace .tab.selected",this.widget).slideUp("fast",$.proxy(function(){
			$(".tabspace .tab.selected",this.widget).removeClass("selected");
			$(".tabspace .tab"+$(".tabs a.selected",this.widget).attr("href"),this.widget).slideDown("fast",$.proxy(function(){
				$(".tabspace .tab"+$(".tabs a.selected",this.widget).attr("href"),this.widget).addClass("selected");
			},this));
		},this));
	};

	function onDOMReady(){
		global.errorController = new errorController();
	}
	$(document).ready(onDOMReady);
})(this);