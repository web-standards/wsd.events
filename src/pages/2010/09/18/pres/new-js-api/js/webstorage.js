
(function(global){
	
	if(!(typeof(Function.prototype.bind) == "function")){
		Function.prototype.bind = function(object) {
		    var method = this
		    return function() {
		        return method.apply(object, arguments) 
		    }
		}	
	}
	
	function DiaryController(){
		
		this.last_key=0;
		this.note_list = new Array();
		
		var say = document.querySelector(".diary_wrapper>.say");
		var post = document.querySelector(".diary_post_form .post_message");
		var cancel = document.querySelector(".diary_post_form .cancel");
		
		say.addEventListener("click", this.openForm.bind(this), false);
		cancel.addEventListener("click", this.closeForm.bind(this), false);
		post.addEventListener("click", this.newPost.bind(this), false);

		this.loadDiary();
		
		/*если в одном окне данные стореджа изменились, то изменятся и в других окнах*/
		addEventListener('storage', this.loadDiary.bind(this), false);
		
	}

	DiaryController.prototype.newMessage = function(message){
		this.last_key++;
				
		return {
			date:new Date().valueOf(),
			message: message,
			id: this.last_key
		}
		
	}
	
	DiaryController.prototype.echoMessage = function(message){
		var articles = document.querySelector("section.diary_entrys");
		var article = document.createElement("ARTICLE");
		var p = document.createElement("P");
		
		var mess = message.message;
		mess = mess.replace(/[\r\n]/gi,"<br/>");
		
		var time = document.createElement("TIME");
		var timer = document.createElement("SPAN");
		var date = new Date(message.date);
		var readDate = document.createTextNode(date.getDate()+"."+date.getMonth()+"."+date.getFullYear());
		var readTime = document.createTextNode(date.getHours() +":"+date.getMinutes());
		
		timer.appendChild(readTime);
		
		time.setAttribute("pubdate","true");
		time.setAttribute("dateTime",date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
		time.appendChild(readDate);
		time.appendChild(timer);
		
		p.className = "message";
		p.innerHTML = mess;

		article.setAttribute("id","note_"+message.id);
		article.appendChild(p);
		article.appendChild(time);
		
		if(articles.firstChild!=null){
			articles.insertBefore(article,articles.firstChild);
		}else{
			articles.appendChild(article);
		}
	}

	DiaryController.prototype.saveDiary = function(){
		localStorage.setItem('diary',JSON.stringify(this.note_list));
		localStorage.setItem('last_key',JSON.stringify(this.last_key));
	}

	DiaryController.prototype.loadDiary = function(){
		var tmp_list = JSON.parse(localStorage.getItem('diary'));
		var tmp_key = JSON.parse(localStorage.getItem('last_key'));
		
		if((tmp_list!=null)&&(tmp_key!=null)){
			this.note_list = tmp_list;
			this.last_key = tmp_key;
		}else{
			return;
		}

		
		var container = document.querySelector(".diary_entrys");
		container.parentNode.removeChild(container);
		
		var container = document.createElement("SECTION");
		container.className = "diary_entrys";
		document.querySelector(".diary_wrapper").appendChild(container);
		
		var index = this.note_list.length;
		var reverser =  this.note_list.length-1;
		while(index--){
			this.echoMessage(this.note_list[reverser-index]);
		}
		
	}

	/*работа контролов*/	
	DiaryController.prototype.openForm = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		var diary_form = document.querySelector(".diary_post_form");
		var say = document.querySelector(".diary_wrapper>.say");
		var textarea = document.querySelector(".diary_post_form textarea");
		
		this.removeClass(diary_form,"closed");
		this.addClass(say,"closed");
		textarea.focus();
	}
	
	DiaryController.prototype.closeForm = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		var diary_form = document.querySelector(".diary_post_form");
		var say = document.querySelector(".diary_wrapper>.say");
		
		this.addClass(diary_form,"closed");
		this.removeClass(say,"closed");
		
		var diary_form = document.querySelector(".diary_post_form");
		diary_form.reset();
	}
	
	DiaryController.prototype.newPost = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		var textarea = document.querySelector(".diary_post_form textarea");
		var cancel = document.querySelector(".diary_post_form .cancel");
		
		if(textarea.value.trim().length<3){
			alert("Сообщение слишком короткое");
			return;
		}
		
		var message = this.newMessage(textarea.value);
		this.note_list.push(message);
		this.echoMessage(message);
		
		this.saveDiary();
		
		cancel.click();
		
	}
	
	/* Сервисные функции */

	
	DiaryController.prototype.addClass = function(obj,className){
		if(obj.classList!=null){
			obj.classList.add(className);
			return;
		}
		obj.className+=" "+className;
	}
	
	DiaryController.prototype.removeClass = function(obj,className){
		if(obj.classList!=null){
			obj.classList.remove(className);
			return;
		}
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
	
	DiaryController.prototype.containClass = function(obj,className){
		if(obj.classList!=null){
			return obj.classList.contains(className);
		}
		var class_list = obj.className.split(" ");
		var index = class_list.length;
		while(index--){
			if(class_list[index]==className){
				return true;
			}
		}
		return false;
	}
	
	
	var DOMContentLoaded = function(){
		global.diary = new DiaryController();
	}
	
	document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false);

})(this)