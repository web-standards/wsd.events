(function(global){
	
	function mediaPlayerController(){
		
	}
	
	$f.addPlugin("htmlControls",function(controlsID){
		new mediaPlayerController(this,controlsID);
		return this;
	});

	function mediaPlayerController(player, controlsID){
		this.controlsID  = controlsID;
		this.player = player;
		this.player.startBuffering();
		this.dragging = false;
		this.timer=null;
		this.deferedSeek=false;
		
		var container = $("#"+controlsID);
		this.player.onLoad($.proxy(this.onLoad,this));
	}

	mediaPlayerController.prototype.onLoad = function(){
		
		//ie6 показ time
		if($(".player").length==0){
			return;
		}
		$(".player").bind("mouseenter",function(event){
			$(event.currentTarget).addClass("player-hover");
		});
		$(".player").bind("mouseleave",function(event){
			$(event.currentTarget).removeClass("player-hover");
		});
		
		//Играть
		$("#"+this.controlsID+" .play,#"+this.controlsID+" .pause").bind("click",$.proxy(this.swapClip,this));

		//движение слайдера
		var volume = $("#"+this.controlsID+" .volumeControl");
		var volumeWidth = volume.width();
		var volumeOffset = volume.offset();
		var track = $("#"+this.controlsID+" .track");
		var width = track.width();
		var offset = track.offset();
		var playhead = $("#"+this.controlsID+" .playhead");
		var spot = $("#"+this.controlsID+" .spot");

		volume.bind("click",$.proxy(this.volumeOnClick,this));
		track.bind("click",$.proxy(this.trackOnClick,this));
		
		spot.draggable({
						axis: "x",  
						containment: [volumeOffset.left-spot.width()/2,0,volumeOffset.left+volumeWidth-spot.width()/2,0],
						drag: $.proxy(this.volumeOnDrag,this)
						});
		playhead.draggable({
						axis: "x", 
						containment: [offset.left-playhead.width()/2,0,offset.left+width-playhead.width()/2,0],
						start: $.proxy(this.playheadOnDragStart,this),
						stop: $.proxy(this.playheadOnDragEnd,this)
						});

		this.player.onPause($.proxy(this.onPause,this));
		this.player.onFinish($.proxy(this.onPause,this));
		this.player.onStop($.proxy(this.onPause,this));
		
		this.player.onResume($.proxy(this.onPlay,this));
		this.player.onStart($.proxy(this.onPlay,this));
		this.player.onBegin($.proxy(this.onPlay,this));
		
		this.player.onBegin($.proxy(this.onStart,this));

		this.player.onFinish($.proxy(this.onFinish,this));
		
		this.player.setVolume(100);
		
		if (typeof getStyleProperty('opacity') == 'string') {
			$("#"+this.controlsID+" .mediaPlayerController").fadeTo('normal',1);
		}
		
	}

	mediaPlayerController.prototype.onPause = function(){
		$("#"+this.controlsID+" .pause").removeClass("pause").addClass("play");
	}
	
	mediaPlayerController.prototype.onPlay = function(){
		$("#"+this.controlsID+" .play").removeClass("play").addClass("pause");
	}
	
	mediaPlayerController.prototype.onStart  = function(){
		var playhead = $("#"+this.controlsID+" .playhead");
		var track = $("#"+this.controlsID+" .track");
		
		if(!this.player.getClip().hasOwnProperty("fullDuration")){
			this.deferedSeek=true;
		}else{
			var track = $("#"+this.controlsID+" .track");
			var width = playhead.width()/2;
			var left = playhead.offset().left-track.offset().left;
			var fullWidth = track.width();
			var duration = this.player.getClip().fullDuration;
			this.player.seek(((width+left)/fullWidth)*duration);
		}
		
		if(this.timer==null){
			this.timer = window.setInterval($.proxy(this.syncControls,this),500);
		}

		this.syncControls();
	}

	mediaPlayerController.prototype.onFinish  = function(){
		
		this.player.stop();
		
		window.clearInterval(this.timer);
		this.timer = null;
		
		var playhead = $("#"+this.controlsID+" .playhead");
		playhead.css("left","-"+playhead.width()/2+"px");
		var progress = $("#"+this.controlsID+" .progress");
		progress.css("width","0px");
		var button = $("#"+this.controlsID+" .play, #"+this.controlsID+" .pause");
		button.removeClass("pause");
		button.addClass("play");
		
		this.syncControls();
	}

	mediaPlayerController.prototype.syncControls = function(){
		
		if(
			!this.player.isLoaded()||
			!this.player.isPlaying()
		){
			return;
		}
		
		var clip = this.player.getClip();
		
		if(!clip.hasOwnProperty("fullDuration")){
			return;
		}
		
		var played = this.toTime(this.player.getTime());
		var total = this.toTime(clip.fullDuration);
		var track = $("#"+this.controlsID+" .track");
		var playedHolder = $("#"+this.controlsID+" .time span");
		var totalHolder = $("#"+this.controlsID+" .time strong");
		var progress = $("#"+this.controlsID+" .progress");
		var buffer = $("#"+this.controlsID+" .buffer");
		
		playedHolder.html(played);
		totalHolder.html(total);
		
		var length = (this.player.getStatus().bufferEnd/clip.fullDuration)*track.width();
		buffer.css("width",length+"px");
		
		var percent = (this.player.getTime()/clip.fullDuration)*track.width();
		progress.css("width",percent+"px");
		
		var playhead = $("#"+this.controlsID+" .playhead");
		
		if(
			!this.dragging&&
			!this.deferedSeek
		){
			playhead.css("left",percent-playhead.width()/2 + "px");
		}
		
		if(
			this.deferedSeek&&
			this.player.getClip().hasOwnProperty("fullDuration")
		){
			var track = $("#"+this.controlsID+" .track");
			var width = playhead.width()/2;
			var left = playhead.offset().left-track.offset().left;
			var fullWidth = track.width();
			var duration = this.player.getClip().fullDuration;
			this.player.seek(((width+left)/fullWidth)*duration);
			this.deferedSeek = false;
		}
		
	}

	mediaPlayerController.prototype.swapClip = function(event){
		event = this.fixE(event);
		event.currentTarget.blur();
		this.player.toggle();
	}
	
	mediaPlayerController.prototype.volumeOnClick = function(event){
		event = this.fixE(event);
		event.currentTarget.blur();
		
		if($(event.target).hasClass("spot")===true){
			return;
		}
		
		var spot = $(".spot",event.currentTarget);
		var holderWidth = $(event.currentTarget).width();
		var spotWidth = spot.width();
		var position = event.layerX;
		var percent = Math.round((position/holderWidth)*100);
		
		spot.css("left",event.layerX - spotWidth/2);
		
		if(this.hasOwnProperty("player")){
			this.player.setVolume(percent);
		}
	}
	
	mediaPlayerController.prototype.volumeOnDrag = function(event,ui){
		event = this.fixE(event);
		var holderWidth = $(ui.helper.context.parentNode).width();
		var spotWidth = $(ui.helper.context).width();
		var position = ui.position.left + spotWidth/2;
		var percent = Math.round((position/holderWidth)*100);
		if(this.hasOwnProperty("player")){
			this.player.setVolume(percent);
		}
	};
	
	mediaPlayerController.prototype.trackOnClick = function(event){
		event = this.fixE(event);
		event.currentTarget.blur();
		
		if($(event.target).hasClass("playhead")===true){
			return;
		}
		
		var spot = $(".playhead",event.currentTarget);
		var holderWidth = $(event.currentTarget).width();
		var spotWidth = spot.width();
		var position = event.layerX;

		spot.css("left",position-spotWidth/2+"px");

		if(this.player.getClip().hasOwnProperty("fullDuration")){
			var percent = (position/holderWidth)*this.player.getClip().fullDuration;
			this.player.seek(percent);
		}else{
			this.deferedSeek=true;
		}

	};

	mediaPlayerController.prototype.playheadOnDragStart = function(event,ui){
		event = this.fixE(event);
		this.dragging = true;
	};
	
	mediaPlayerController.prototype.playheadOnDragEnd = function(event,ui){
		event = this.fixE(event);
		this.dragging = false;
		
		var holderWidth = $(ui.helper.context.parentNode).width();
		var spotWidth = $(ui.helper.context).width();
		var position = ui.position.left + spotWidth/2;
		
		if(this.player.getClip().hasOwnProperty("fullDuration")){
			var percent = (position/holderWidth)*this.player.getClip().fullDuration;
			this.player.seek(percent);
		}else{
			this.deferedSeek=true;
		}
	};
	
	mediaPlayerController.prototype.roundNumber = function(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	}
	
	mediaPlayerController.prototype.fixE = function(e) {
		if (typeof e == 'undefined') { e = window.event; }
		if (typeof e.layerX == 'undefined') { e.layerX = e.offsetX; }
		if (typeof e.layerY == 'undefined') { e.layerY = e.offsetY; }
		return e;
	}
	
	mediaPlayerController.prototype.toTime = function(sec) {
		var sec = Math.round(sec);
		if(sec==undefined){
			sec=0;
			}
		
		var h = Math.floor(sec / 3600);
		var min = Math.floor(sec / 60);
		sec = sec - (min * 60);
		
		if (h >= 1) {
			min -= h * 60;
			return h + ":" + min + ":" + sec;
		}
		
		return min + ":" + sec;
	}
	
	function onDOMReady(){
		flowplayer("player1", {	
				src : "flash/flowplayer-3.2.6.swf",
				wmode : "opaque",
				width : 470,
				height : 0
			},{
			clip : {
				autoPlay: false,
				scaling: "scale",
				autoBuffering: true
				},
			plugins: {controls: null},
			canvas:  {
				backgroundGradient: 'none',
				backgroundColor: '#ffffff'
			}
		}).htmlControls("mediaPlayerController1");
	}
	
	window.onload = onDOMReady;
})(this);