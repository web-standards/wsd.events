function editorController(){
	document.querySelector(".user_mode_switch").state = false;
	var menu = document.querySelectorAll(".user_mode_switch li");
	var index = menu.length;
	while(index--){
		menu[index].addEventListener( "click", this.usersModeSwitch, false);
	}
}

editorController.prototype.usersModeSwitch = function(event){
	event.preventDefault();
	event.target.blur();
	
	var menu = document.querySelector(".user_mode_switch");
	var selected = event.currentTarget.parentNode.querySelector(".selected");
	var list = document.querySelectorAll("section.articles article");
	var index = list.length;

	if(selected.classList!=null){
		selected.classList.remove("selected");
		event.currentTarget.classList.add("selected");
	}else{
		selected.removeAttribute("class");
		event.currentTarget.className='selected';
	}
		
	if(menu.state == false){
		while(index--){
			if(list[index].classList!=null){
				list[index].classList.add("marked");
			}else{
				list[index].className+=" marked";
			}
			var save = document.querySelector(".template_collector .contentEditableSave").cloneNode(true);
			
			list[index].insertBefore(save,list[index].firstChild);
			list[index].contentEditable = true;
		}
		menu.state = true;
	}else{
		while(index--){
			if(list[index].classList!=null){
				list[index].classList.remove("marked");
			}else{
				var class_list = list[index].className.split(" ");
				var class_index = class_list.length;
				while(class_index--){
					if(class_list[class_index]=="marked"){
						class_list.splice(index,1);
						list[index].className = class_list.join(" ");
					}
				}
			}
			list[index].contentEditable = false;
			
		}
		menu.state = false;	
		var save_list = document.querySelectorAll(".articles .contentEditableSave");
		var index = save_list.length;
		while(index--){
			save_list[index].parentNode.removeChild(save_list[index]);
		}
	}
}


var DOMContentLoaded = function(){
	var EC = new editorController();
}

document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false);