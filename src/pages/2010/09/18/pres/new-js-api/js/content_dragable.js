(function(global){
	
	if(!('bind' in Function.prototype)){
		Function.prototype.bind = function(object) {
		    var method = this
		    return function() {
		        return method.apply(object, arguments) 
		    }
		}	
	}
	
	function dragController(){
		var draggable = document.querySelectorAll("[draggable]");
		var index = draggable.length;
		
		
		while(index--){
			draggable[index].addEventListener("dragstart", this.startDrag.bind(this), false);
			draggable[index].addEventListener("dragend", this.stopDrag.bind(this), false);
		}
		
		var placeHolder = document.querySelectorAll(".drag_and_drop_place_holder");
		var index = placeHolder.length;
		
		while(index--){
			placeHolder[index].addEventListener("dragenter", this.enterPlaceHolder.bind(this), false);
			placeHolder[index].addEventListener("dragover", this.overPlaceHolder.bind(this), false);
			placeHolder[index].addEventListener("dragleave", this.leavePlaceHolder.bind(this), false);
			placeHolder[index].addEventListener("drop", this.dropOnPlaceHolder.bind(this), false);		
		}
		
	}
	
	/* События перетягиваемого объекта */
	dragController.prototype.startDrag = function(event){
	
		event.dataTransfer.effectAllowed = "all";
		event.dataTransfer.dropEffect = "copy";
		event.dataTransfer.setDragImage(event.currentTarget,15,15);
		
		var os = this.getClass(event.currentTarget.parentNode.parentNode.parentNode.className);
		event.dataTransfer.setData("os",os);
		event.dataTransfer.setData("browser",event.currentTarget.className);
		
		var version = event.currentTarget.innerHTML.split(" ");
		if(version.length==2){
			event.dataTransfer.setData("version",version[1]);
		}else{
			event.dataTransfer.setData("version","");
		}
	
		var holder = document.querySelectorAll("."+os+"_placeHolder");
		var index = holder.length;
		
		while(index--){
			if(holder[index].classList!=null){
				holder[index].classList.add("markedPlaceHolder");
			}else{
				this.addClass(holder[index],"markedPlaceHolder");
			}
		}
	
	}
	
	dragController.prototype.stopDrag = function(event){
		this.clearHolder();
		event.preventDefault();
	}
	
	/* События целевых площадок */
	dragController.prototype.enterPlaceHolder = function(event){
		
		if(!this.containClass(event.currentTarget,event.dataTransfer.getData("os")+"_placeHolder")){
			event.preventDefault();
			return;
		}
		
		if(event.target.classList!=null){
			event.currentTarget.classList.remove("markedPlaceHolder");
			event.currentTarget.classList.add("enteredPlaceHolder");
		}else{
			this.removeClass(event.currentTarget,"markedPlaceHolder");
			this.addClass(event.currentTarget,"enteredPlaceHolder");
		}
		event.preventDefault();
	}
	
	dragController.prototype.overPlaceHolder = function(event){
		event.preventDefault();
	}
	
	dragController.prototype.leavePlaceHolder = function(event){
	
		if(!this.containClass(event.currentTarget,event.dataTransfer.getData("os")+"_placeHolder")){
			event.preventDefault();
			return;
		}
	
		if(event.target.classList!=null){
			event.currentTarget.classList.remove("enteredPlaceHolder");
			event.currentTarget.classList.add("markedPlaceHolder");
		}else{
			this.removeClass(event.currentTarget,"enteredPlaceHolder");
			this.addClass(event.currentTarget,"markedPlaceHolder");
		}
		event.preventDefault();
	}
	
	dragController.prototype.dropOnPlaceHolder = function(event){	
	
		if(!this.containClass(event.currentTarget,event.dataTransfer.getData("os")+"_placeHolder")){
			event.preventDefault();
			return;
		}	
	
		if(event.currentTarget.list==null){
			event.currentTarget.list = new Array();
		}
		
		var index = event.currentTarget.list.length;
		while(index--){
			if(event.currentTarget.list[index]==event.dataTransfer.getData("os")+" "+event.dataTransfer.getData("browser")+" "+event.dataTransfer.getData("version")){
				event.preventDefault();
				return false;
			}
		}
	
		var anchor = document.createElement("span");
		anchor.innerHTML = (event.dataTransfer.getData("browser")+" "+event.dataTransfer.getData("version")).trim();
		anchor.className = event.dataTransfer.getData("browser");
		anchor.addEventListener("click", function(event){
			event.currentTarget.parentNode.list.splice(event.currentTarget.index,1);
			event.currentTarget.parentNode.removeChild(event.currentTarget);
		}, false);
		event.currentTarget.appendChild(anchor);
		
		event.currentTarget.list.push(event.dataTransfer.getData("os")+" "+event.dataTransfer.getData("browser")+" "+event.dataTransfer.getData("version"));
		anchor.index = event.currentTarget.list.length-1;
		
		this.clearHolder();
		event.preventDefault();
	}
	
	/* Сервисные функции */
	
	dragController.prototype.clearHolder = function(){
		var placeHolder = document.querySelectorAll(".drag_and_drop_place_holder");
		var index = placeHolder.length;
		
		while(index--){
			if(placeHolder[index].classList!=null){
				placeHolder[index].classList.remove("markedPlaceHolder");
				placeHolder[index].classList.remove("enteredPlaceHolder");
			}else{
				this.removeClass(placeHolder[index],"enteredPlaceHolder");
				this.removeClass(placeHolder[index],"markedPlaceHolder");
			}
		}	
	}
	
	dragController.prototype.addClass = function(obj,className){
		obj.className+=" "+className;
	}
	
	dragController.prototype.removeClass = function(obj,className){
		var class_list = obj.className.split(" ");
		var index = class_list.length;
		while(index--){
			if(class_list[index]==className){
				class_list.splice(index,1);
				obj.className = class_list.join(" ");
				return;
			}
		}
	}
	
	dragController.prototype.containClass = function(obj,className){
		var class_list = obj.className.split(" ");
		var index = class_list.length;
		while(index--){
			if(class_list[index]==className){
				return true;
			}
		}
		return false;
	}
	
	
	dragController.prototype.getClass = function(classNameList){
		var class_list = classNameList.split(" ");
		var index = class_list.length;
		while(index--){
			if(class_list[index].indexOf("drag_class_")>-1){
				break;
			}
		}
		return class_list[index].slice("drag_class_".length);
	}
	
	var DOMContentLoaded = function(){
		global.DC = new dragController();
	}
	
	document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false);

})(this)