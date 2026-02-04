function messageController(message){
	this.widget = $(".message-widget");
	this.lightbox = $("body>.lightbox");
	if(this.widget.length!==1||this.lightbox.length!==1||typeof message === "undefined"){
		return;	
	}
	$(".ok",this.widget).on("click",$.proxy(this.close,this));
	$("p",this.widget).text(message);
	this.widget.css({
		left:-2000,
		display:'block'
	});
	if($("p",this.widget).height()<40){
		$("p",this.widget).css({
			'line-height':'48px'
		});
	}else{
		$("p",this.widget).css({
			'line-height':'24px'
		});
	}
	this.widget.css({
		display:'none',
		left:'50%'
	});
	this.widget.fadeIn();
	this.lightbox.fadeIn();
}

messageController.prototype.close = function(event){
	event.preventDefault();
	event.currentTarget.blur();
	this.widget.fadeOut();
	this.lightbox.fadeOut();
};
	