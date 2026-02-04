(function(global){
	function projectDetailsController(){
		this.widget = $(".project-details-widget");
		if(this.widget.length==0){
			return;
		}
		var copy = $(".code .copy",this.widget);
		if(copy.length>0){
			this.clipboard = new ZeroClipboard.Client();
			this.clipboard.setText(copy.attr("data-code"));
			this.clipboard.glue('copy-project-code');
		}
	}

	function onDOMReady(){
		global.projectDetailsController = new projectDetailsController();
	}
	$(document).ready(onDOMReady);
})(this);