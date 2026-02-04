(function(global){
	
	function filterController() {
		this.createBlocks();
	  	this.fulfil = false;
    	if($(".wishes-to-fulfil-widget").length>0){
    		this.fulfil = true;
    	}
    	$("#occasion-filter").on("change",$.proxy(this.onSelectChange,this));
    	this.list = $('.wish-list-widget');
    	if(this.list.length>0){
    		this.list.on("ticketChange",$.proxy(this.onSelectChange,this));
    		this.list.trigger("ticketChange");
    	}
	}

	filterController.prototype.createBlocks = function() {
		$(".wish-list-widget").append('\
			<div class="wishes"><div class="match"><div class="new"></div><div class="old"></div></div>\
			<div class="do-not-match"><div class="new"></div><div class="old"></div></div></div>\
		');
	};

	filterController.prototype.reGenerateAddWishLinks = function() {
		$(".add-wish-link",this.list).remove();
		$("article",this.list).after('<a href="#" class="add-wish-link"><b>Add a wish</b></a>');
	};
	
	filterController.prototype.onSelectChange = function() {
		var filter = $("#occasion-filter");
		if(filter.length>0){
			if(filter.val()=="All occasions") {
				$('.ticket-widget').removeClass("disabled");
			} else {
				$('.ticket-widget .occasion:not(:contains("'+filter.val()+'"))',this.list).closest(".ticket-widget").addClass("disabled");
				$('.ticket-widget .occasion:contains("'+filter.val()+'")',this.list).closest(".ticket-widget").removeClass("disabled");
			}
		}

		var lists = $('.wish-list-widget');
		var index = lists.length;
		while(index--){
			$(".wishes>.match>.new",lists[index]).append($('.ticket-widget.new:not(.disabled)',lists[index]));
			$(".wishes>.match>.old",lists[index]).append($('.ticket-widget:not(.disabled):not(.new)',lists[index]));
			$(".wishes>.do-not-match>.new",lists[index]).append($('.ticket-widget.disabled.new',lists[index]));
			$(".wishes>.do-not-match>.old",lists[index]).append($('.ticket-widget.disabled:not(.new)',lists[index]));
		}

		if(this.fulfil===false){
			this.reGenerateAddWishLinks();
		}
	};
		
	function onDOMReady() {
   		global.filterController = new filterController();
	}
	$(document).ready(onDOMReady);

})(this);