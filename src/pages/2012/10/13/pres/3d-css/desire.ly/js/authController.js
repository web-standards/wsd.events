(function(global){
	
	function authController(){
		this.loginWidget = $(".login-form");
		this.recoverWidget = $(".recover-form");

		if(this.loginWidget.length===0||this.recoverWidget.length===0){
			return;
		}
		this.lightbox = $("body>.lightbox");
		this.ready = true;

		$("header nav .login").on("click",$.proxy(this.openLogin,this));
		$(".cancel",this.loginWidget).on("click",$.proxy(this.closeLogin,this));
		$(".forgot",this.loginWidget).on("click",$.proxy(this.openRecover,this));
		$(".cancel",this.recoverWidget).on("click",$.proxy(this.closeRecover,this));
		$(this.recoverWidget).on("submit",$.proxy(this.recover,this));
		$(this.loginWidget).on("submit",$.proxy(this.login,this));
	}

	authController.prototype.openRecover = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		if(!this.ready){return;}
		
		this.recoverWidget.fadeIn();
		this.loginWidget.fadeOut($.proxy(function(){
			this.loginWidget[0].reset();
		},this));

		this.lightbox.off().one("click",$.proxy(this.closeRecover,this));
	};
	
	authController.prototype.openLogin = function(event){
		event.preventDefault();
		event.currentTarget.blur();
		
		this.loginWidget.fadeIn();
		this.lightbox.fadeIn();

		this.lightbox.one("click",$.proxy(this.closeLogin,this));
	};

	authController.prototype.closeRecover = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.recoverWidget.fadeOut($.proxy(function(){
			this.recoverWidget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};

	authController.prototype.closeLogin = function(event){
		event.preventDefault();
		event.currentTarget.blur();

		this.loginWidget.fadeOut($.proxy(function(){
			this.loginWidget[0].reset();
		},this));
		this.lightbox.fadeOut();
	};

	authController.prototype.login = function(event){
		event.preventDefault();
		if(!this.ready){return;}
		this.ready = false;
		$("input,textarea,select,button,.button-type-1,.input-type-1",this.loginWidget).attr("disabled","disabled");
		$("fieldset",this.loginWidget).fadeTo("fast",.3).wrapAll('<div class="loading"></div>');

		jQuery.getJSON("/login",{
			email:$("input.email",this.loginWidget).val(),
			password:$("input.password",this.loginWidget).val()
		})
		.complete($.proxy(this.loginComplete,this))
		.success($.proxy(this.loginSuccess,this));

	};

	authController.prototype.loginComplete = function(){
		$("[disabled]",this.loginWidget).removeAttr("disabled");
		$("fieldset",this.loginWidget).fadeTo("fast",1).unwrap();
		this.ready = true;
	};

	authController.prototype.loginSuccess = function(responce){
		if(responce.auth==true){
			$.pjax({
				url: $('.send-gift-widget .send').attr('href'),
				container: 'div[data-pjax-container]'
			})
			this.lightbox.trigger("click");
		}
	};

	authController.prototype.recover = function(event){
		event.preventDefault();
		if(!this.ready){return;}
		this.ready = false;

		jQuery.getJSON("/recover",{
			email:$(".email",this.recoverWidget).val()
		}).complete($.proxy(this.recoverComplete,this));
	};

	authController.prototype.recoverComplete = function(responce){
		if(typeof responce === "undefined"){
			return;
		}
		this.recoverWidget.fadeOut($.proxy(function(){
			this.recoverWidget[0].reset();
		},this));
		if(responce.recovery==true){
			new messageController("Message has been send");
			return;
		}
		new messageController("Случилась какая то фигня");
	};
		
	function onDOMReady(){
   		global.authController = new authController();
	}
	
	$(document).ready(onDOMReady);
	
})(this);