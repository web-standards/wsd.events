(function(global){
	
	function editWishController(){
		this.widget = $(".edit-wish-form");
		if(this.widget.length===0){
			return;
		}
		this.lightbox = $(".lightbox");

		$(document).on("click", ".ticket-widget nav a.edit", $.proxy(this.open,this));
		$(".cancel",this.widget).click($.proxy(this.close,this));
		$(".save",this.widget).click($.proxy(this.save,this));
	}
	
	editWishController.prototype.open = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		var ticket = $(event.currentTarget).closest(".ticket-widget");
		var price = $(".price strong",ticket).text().trim();
		
		if(price.indexOf("$")>-1){
			$(".price label",this.widget).text("$");
		}

		if(price.indexOf("£")>-1){
			$(".price label",this.widget).html("&pound;");
		}

		if(price.indexOf("¥")>-1){
			$(".price label",this.widget).html("&yen;");
		}

		if(price.indexOf("€")>-1){
			$(".price label",this.widget).html("&euro;");
		}

		if(price.indexOf("₣")>-1){
			$(".price label",this.widget).text("₣");
		}

		if(price.indexOf("₤")>-1){
			$(".price label",this.widget).text("₤");
		}

		if(price.indexOf("¢")>-1){
			$(".price label",this.widget).html("&cent;");
		}

		if(price.indexOf("₧")>-1){
			$(".price label",this.widget).text("₧");
		}

		$(".file-upload label",this.widget).css("background","url("+$(".pic img",ticket).attr("src")+") 50% 50% no-repeat");
		$(".name-your-wish",this.widget).val($(".title",ticket).text());
		$("input[name='url']",this.widget).val($(".url",ticket).text());
		$("textarea",this.widget).val($(".abstract",ticket).text().trim());
		$("input[name='price']",this.widget).val(parseFloat(price.replace(" ","").replace("₧","").replace("¢","").replace("₤","").replace("₣","").replace("€","").replace("¥","").replace("$","").replace("£",""),10));

		this.widget.fadeIn();
		this.lightbox.fadeIn();
		this.lightbox.one("click",$.proxy(this.close,this));
	};

	editWishController.prototype.close = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.widget.fadeOut($.proxy(function(){
			this.widget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};

	editWishController.prototype.save = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.widget.fadeOut($.proxy(function(){
			this.widget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};
		
	function onDOMReady(){
   		global.editWishController = new editWishController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);