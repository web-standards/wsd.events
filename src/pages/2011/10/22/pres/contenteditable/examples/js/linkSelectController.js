(function(global){
	
	function linkSelectController(){
	  this.select = $("select.link-select");
	  
		if(this.select.length===0){
		  delete this.select;
			return;
		}
	  
	  var index = this.select.length;
	  while(index--){
	    $(this.select[index]).hide();
	    
    	var selected =$("option[selected]",this.select[index]);
      if(selected.length==0){
        selected = $("option:eq(0)",this.select[index]);
      }
    
      $(this.select[index]).after("<a class='"+this.select[index].className+"' href='#' data-value='"+$('option:eq(0)',this.select[index])[0].value+"'><span>"+selected.html()+"</span></a>");
	  }
	  
	  $("a.link-select").click($.proxy(this.open,this));
	  
	}
	
	linkSelectController.prototype.close = function(event){
	  event.preventDefault();
		event.currentTarget.blur();
		$(event.currentTarget).parents(".link-select-wrapper").remove();
  }
	
	linkSelectController.prototype.select_it = function(event){
	  event.preventDefault();
		event.currentTarget.blur();
		var wrapper = $(event.currentTarget).parents(".link-select-wrapper");

		var data = $(event.currentTarget).attr("data-value");
		var text = event.currentTarget.innerHTML;
		
		$("span",wrapper[0].linker).html(text);
		
		var select = $(wrapper[0].linker).prev();
		var selected =$("option[selected]",select);
		if(selected.length>0){
      selected[0].removeAttribute("selected","selected");
    }
    
    select.val($("option[value='"+data+"']",select)[0].value).change();
    
		wrapper.remove();
  };

	
	linkSelectController.prototype.open = function(event){
		event.preventDefault();
		event.currentTarget.blur();
	
	  var select = $(event.currentTarget).prev();
	  var options = $("option",select);
	  var index = options.length;
	  
	  
	  var wrapper = document.createElement("div");
	  
    wrapper.className = "link-select-wrapper";
	  
		var optionsSelected =$("option[selected]",select);
		if(optionsSelected.length===0){
      optionsSelected = $(options[0]);
	  }
	  
	  while(index--){
	    if(optionsSelected[0].value==options[index].value){
	      continue;
	    }
	    wrapper.innerHTML+='<a data-value="'+options[index].value+'" href="#">'+options[index].innerHTML+'</a>';
	  }
	  
    $(wrapper).prepend('<p data-value="'+optionsSelected[0].value+'" class="current"><a href="#" class="close">'+optionsSelected.html()+'</a></p>');
	  
	  $(".close",wrapper).click($.proxy(this.close,this));
	  $(">a",wrapper).click($.proxy(this.select_it,this));
	  
	  $(wrapper).css("font-style",$(event.currentTarget).css("font-style"));
	  $(wrapper).css("font-size",$(event.currentTarget).css("font-size"));
	  $(wrapper).css("font-weight",$(event.currentTarget).css("font-weight"));
	  $(wrapper).css("font-family",$(event.currentTarget).css("font-family"));
	  $(wrapper).css("line-height",$(event.currentTarget).css("line-height"));
//	$(wrapper).css("text-decoration",$(event.currentTarget).css("text-decoration"));
//	$(wrapper).css("text-transform",$(event.currentTarget).css("text-transform"));
	  $("a",wrapper).css("color",$(event.currentTarget).css("color"));
	  
	  $(wrapper).css("left",$(event.currentTarget).offset().left-10);
	  

    num=10;
	  
	  $(wrapper).css("top",$(event.currentTarget).offset().top-num);
	  
	  $("body").append(wrapper);
	  wrapper.linker = event.currentTarget;
	  
	};
	
	function onDOMReady(){
		global.linkSelectController = new linkSelectController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);