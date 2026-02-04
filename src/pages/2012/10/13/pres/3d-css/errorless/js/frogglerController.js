(function(global){
	function frogglerController(){
		$("header .statistic .projects").on("click",$.proxy(this.projectToggle,this));
		$(".projects-widget .add-project").on("click",$.proxy(this.addProjectFormOpen,this));
		$(".add-project-form .cancel").on("click",$.proxy(this.addProjectFormClose,this));
	}

	frogglerController.prototype.addProjectFormOpen = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		$(".add-project-form").slideDown();
		link.addClass("active");
		};

	frogglerController.prototype.addProjectFormClose = function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		$(".add-project-form").slideUp();
		$(".projects-widget .add-project").removeClass("active");
		};

	frogglerController.prototype.projectToggle = function(event){
		event.preventDefault();
		$(".projects-widget").slideToggle();
		};

	function onDOMReady(){
		global.frogglerController = new frogglerController();
	}
	$(document).ready(onDOMReady);
})(this);