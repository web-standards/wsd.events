(function(global){
	function blankWidgetController(){
		this.widget = $(".blank-widget");
		if(this.widget.length==0){
			return;
		}
		$('.set-up-list a',this.widget).on('click',$.proxy(this.open,this));
	}

	blankWidgetController.prototype.open = function(event){
		event.preventDefault();
		$(".set-up-list li.selected",this.widget).removeClass("selected");
		$(event.currentTarget.parentNode).addClass("selected");
		$(".set-up-details.selected",this.widget).slideUp("fast",$.proxy(function(){
			$(".set-up-details.selected",this.widget).removeClass("selected");
			$(".set-up-details"+$(".set-up-list li.selected a",this.widget).attr("href"),this.widget).slideDown("fast",$.proxy(function(){
				$(".set-up-details"+$(".set-up-list li.selected a",this.widget).attr("href"),this.widget).addClass("selected");
			},this));
		},this));
	};

	function onDOMReady(){
		global.blankWidgetController = new blankWidgetController();
	}
	$(document).ready(onDOMReady);
})(this);