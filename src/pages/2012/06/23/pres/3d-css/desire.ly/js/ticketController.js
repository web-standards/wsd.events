(function(global){
	function ticketController(){
		$("body").addClass("animation-enabled");
		
		$(".wish-list-widget>article").after('<a href="#" class="add-wish-link"><b>Add a wish</b></a>');

		$(".ticket-widget .front").on("click",$.proxy(this.toggleOpen,this));
		$(".ticket-widget nav .give-up").on("click",$.proxy(this.giveUp,this));
		$(".ticket-widget nav .reserve").on("click",$.proxy(this.reserve,this));
		$(".ticket-widget nav .copy").on("click",$.proxy(this.copy,this));
		$(".ticket-widget nav .edit").on("click",$.proxy(this.edit,this));
		$(".ticket-widget nav .complete").on("click",$.proxy(this.gotIt,this));
		$(".ticket-widget nav .remove").on("click",$.proxy(this.dontNeedIt,this));
		
	}

	ticketController.prototype.toggleOpen = function(event){
		var ticket = $(event.currentTarget.parentNode);
		if(ticket.hasClass("open")){
			return;
		}
		var id = ticket.attr("id");
		if(!$('html').hasClass("csstransitions")){
			
			$('.ticket-widget.open:not([id*="'+id+'"])').css("width","600px").animate({
				height:81
			},{
				duration:250,
				complete:function(){
					$(this).css("width","462px");
				}
			});
			$('.ticket-widget.open:not([id*="'+id+'"]) .back-wrapper').animate({
				height:0
			},{
				duration:250,
				complete:function(){
					$(this).closest('.ticket-widget').removeClass("open");
				}
			});

			$('.ticket-widget.open:not([id*="'+id+'"]) .front .details').animate({
				"max-height":80
			},{
				duration:250
			});

			ticket.css("width","600px").animate({
				height:160
			},{
				duration:250,
				complete:function(){
					$(this).css("width","462px");
				}
			});
			$(".back-wrapper",ticket).animate({
				height:80
			},{
				duration:250,
				complete:$.proxy(function(){
					this.addClass("open");
				},ticket)
			});

			$(".details",ticket).animate({
				"max-height":110
			},{
				duration:250
			});
		}else{
			$('.ticket-widget.open:not([id*="'+id+'"])').removeClass("open");
			ticket.addClass("open");
		}
	};

	ticketController.prototype.giveUp = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		ticket.fadeOut(1000,$.proxy(function(){this.remove();},ticket));
		//jQuery.getJSON("/giveUp",{id:ticket.attr("id")});
	};

	ticketController.prototype.reserve = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		jQuery.getJSON("/reserve",{id:ticket.attr("id")});
	};

	ticketController.prototype.copy = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		jQuery.getJSON("/copy",{id:ticket.attr("id")});
	};

	ticketController.prototype.edit = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		//ticket.fadeOut($.proxy(function(){this.remove();},ticket));
		//jQuery.getJSON("/copy/"+ticket.attr("id"));
	};

	ticketController.prototype.gotIt = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		ticket.fadeOut($.proxy(function(){this.remove();},ticket));
		jQuery.getJSON("/complete",{id:ticket.attr("id")});
	};

	ticketController.prototype.dontNeedIt = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var ticket = link.closest(".ticket-widget");
		ticket.fadeOut($.proxy(function(){this.remove();},ticket));
		jQuery.getJSON("/remove",{id:ticket.attr("id")});
	};

	function onDOMReady(){
		global.ticketController = new ticketController();
	}
	$(document).ready(onDOMReady);
})(this);