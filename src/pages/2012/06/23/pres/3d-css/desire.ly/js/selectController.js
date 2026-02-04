(function(global){
	
	function selectController(){
		var select = $(".select-type-1 select");
		var index = select.length;
		if(index==0){
			return;
		}
		var wrapper = null;
		var sel = null;
		while(index--){
			sel = $(select[index]);
			wrapper = sel.parents(".select-type-1")[0];
			$(".front",wrapper).html($("option:contains('"+sel.val()+"')",sel).text());
		}
    	select.on("change",$.proxy(this.onSelectChange,this));
	}
	
	selectController.prototype.onSelectChange = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		var wrapper = $(event.currentTarget).parents(".select-type-1")[0];
		$(".front",wrapper).html($("option:contains('"+$(event.currentTarget).val()+"')",event.currentTarget).text());
	};
		
	function onDOMReady(){
   		global.selectController = new selectController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}