(function(global){
	function projectListController(){
		this.widget = $(".project-list-widget");
		if(this.widget.length==0){
			return;
		}
		$("section .project-details nav a.unresolved",this.widget).bind("click",$.proxy(this.loadUnresolved,this));
		$("section .project-details nav a.resolved",this.widget).bind("click",$.proxy(this.loadResolved,this));
	}

	projectListController.prototype.loadUnresolved = function(event){
		event.preventDefault();

		var link = $(event.currentTarget);

		if($(".unresolved",link.parent()).hasClass("selected")){
			return;
		}

		$(".selected",link.parent()).removeClass("selected");
		link.addClass("selected");
	};

	projectListController.prototype.loadResolved = function(event){
		event.preventDefault();

		var link = $(event.currentTarget);

		if($(".resolved",link.parent()).hasClass("selected")){
			return;
		}

		$(".selected",link.parent()).removeClass("selected");
		link.addClass("selected");
	};

	function onDOMReady(){
		global.projectListController = new projectListController();
	}
	$(document).ready(onDOMReady);
})(this);