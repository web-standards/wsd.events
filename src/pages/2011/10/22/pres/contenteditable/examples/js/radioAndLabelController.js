(function(global){
	function radioAndLabelController(){
	  $(".radio-line input[type='radio']").change($.proxy(this.changeInputState,this));
	  $(".radio-line input[type='radio']:checked+label").addClass("afterSelectedRadio");
	  $(".radio-line input[type='radio']+label:not('.afterSelectedRadio')").addClass("afterRadio");
  }
  
	radioAndLabelController.prototype.changeInputState = function(event){
//    event.preventDefault();
//		event.currentTarget.blur();
    
    var label = $(event.currentTarget).next();
    var name = event.currentTarget.getAttribute("name");
    
    $(".radio-line  input[type='radio'][name='"+name+"']+label").removeClass("afterSelectedRadio").addClass("afterRadio");
    
	  if(event.currentTarget.checked){
	    label.addClass("afterSelectedRadio");
	    label.removeClass("afterRadio");
	  }else{
	    label.removeClass("afterSelectedRadio");
	    label.addClass("afterRadio");
	  }	  
	};
	
	function onDOMReady(){
	  global.radioAndLabelController = new radioAndLabelController();
	}
	$(document).ready(onDOMReady);
})(this);