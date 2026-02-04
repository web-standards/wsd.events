(function(global){
	function sceneController(){
    
    this.scene = $(".scene");
    this.scene.attr("rotate-x",0);
    this.scene.attr("rotate-y",0);
    this.scene.attr("rotate-z",0);
    this.scene.attr("perspective",1500);
    this.scale = 0.75;
    
    $.keyboard("aup",{event: 'keydown'},$.proxy(this.startRotateXPlus,this));
    $.keyboard("adown",{event: 'keydown'},$.proxy(this.stopRotateXMinus,this));
    
    $.keyboard("aleft",{event: 'keydown'},$.proxy(this.startRotateYPlus,this));
    $.keyboard("aright",{event: 'keydown'},$.proxy(this.stopRotateYMinus,this));
    
    $.keyboard("sbopen",{event: 'keydown'},$.proxy(this.startRotateZPlus,this));
    $.keyboard("sbclose",{event: 'keydown'},$.proxy(this.stopRotateZMinus,this));
    
    $.keyboard("z",{event: 'keydown'},$.proxy(this.increasePerspective,this));
    $.keyboard("x",{event: 'keydown'},$.proxy(this.decreasePerspective,this));
    
  }

  sceneController.prototype.increasePerspective = function(event){
    var perspective = parseInt(this.scene.attr("perspective"),10);
    perspective+=10;
    this.scene.css({
      "-webkit-perspective":perspective
    });
    this.scene.attr("perspective",perspective);
    console.log("-webkit-perspective:",perspective);
  };
  
  sceneController.prototype.decreasePerspective = function(event){
    var perspective = parseInt(this.scene.attr("perspective"),10);
    perspective-=10;
    this.scene.css({
      "-webkit-perspective":perspective
    });
    this.scene.attr("perspective",perspective);
    console.log("-webkit-perspective:",perspective);
  };

  sceneController.prototype.startRotateZPlus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleZ+=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-z",angleZ);
    
    console.log(angleZ,'left start');
    
  };

  sceneController.prototype.stopRotateZMinus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleZ-=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-z",angleZ);
    
    console.log('right start',angleZ);
    
  };

  sceneController.prototype.startRotateYPlus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleY+=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-y",angleY);
    
    console.log(angleY,'left start');
    
  };

  sceneController.prototype.stopRotateYMinus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleY-=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-y",angleY);
    
    console.log('right start',angleY);
    
  };

  sceneController.prototype.startRotateXPlus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleX+=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-x",angleX);
    
    console.log(angleX,'up start');
    
  };

  sceneController.prototype.stopRotateXMinus = function(event){
    
    var angleX = parseInt(this.scene.attr("rotate-x"),10);
    var angleY = parseInt(this.scene.attr("rotate-y"),10);
    var angleZ = parseInt(this.scene.attr("rotate-z"),10);
    angleX-=2;
    this.scene.css({
      "-webkit-transform":"rotateX("+angleX+"deg) rotateY("+angleY+"deg) rotateZ("+angleZ+"deg) scale("+this.scale+")"
    })
    this.scene.attr("rotate-x",angleX);
    
    console.log('down start',angleX);
    
  };
  
	function onDOMReady(){
	  global.sceneController = new sceneController();
	}
	
	if(document.getElementsByTagName("FOOTER").length==0){
	  $(document).ready(onDOMReady);  
	}else{
	  onDOMReady();
	}
})(this);