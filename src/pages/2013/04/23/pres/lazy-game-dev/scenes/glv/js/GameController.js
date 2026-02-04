(function (global){
  function CatController(){
    //gamefield
    this.widget = $(".field");
    //protogonist
    this.cat=$(".cat");
    //protogonist engine
    this.engine = this.cat.find(".engine-wrapper");
    //when we click on protogonis game starting
    this.cat.on("click",$.proxy(this.startPlay,this));

    //restart
    $(".restart").on("click",$.proxy(this.restart,this));

    //generating clouds like this http://www.clicktorelease.com/tutorials/css3dclouds/
    /*
        objects is an array of cloud bases
        layers is an array of cloud layers
    */
    this.objects = [];
    this.layers = [];
    this.cloudTypes = ['img/explosion.png','img/explosion2.png','img/smoke.png'];
    //this.generate();
  }

  CatController.prototype.restart = function(event){
    event.preventDefault();
    window.location.reload();
  };

  CatController.prototype.startPlay = function(event){
    this.widget.addClass("playing").on('mousemove',$.proxy(this.mouseMove,this));
    this.widget.find('.hell').on("hover",$.proxy(this.fail,this));
    this.widget.find('.exit').on("hover",$.proxy(this.win,this));
    this.cat.on("click",$.proxy(this.startPlay,this));
  };

  CatController.prototype.win = function(event){
    this.widget.removeClass("playing").off("mousemove");
    this.widget.find('.hell').off("hover");
    this.cat.addClass("win");
    setTimeout($.proxy(this.afterWin,this),2000);
  };

  CatController.prototype.afterWin = function(){
    this.widget.hide();
    $(".win-screen").fadeIn();
  };

  CatController.prototype.fail = function(event){
    this.widget.removeClass("playing").off("mousemove");
    this.cat.addClass("dead");
    setTimeout($.proxy(this.afterFail,this),2000);
  };

  CatController.prototype.afterFail = function(){
    this.widget.hide();
    $(".fail-screen").fadeIn();
  };

/*
    Clears the DOM of previous clouds bases 
    and generates a new set of cloud bases
*/
 
CatController.prototype.generate = function() {
    this.objects = [];
    this.layers = [];
    if ( world.hasChildNodes() ) {
        while ( world.childNodes.length >= 1 ) {
            world.removeChild( world.firstChild );       
        } 
    }
    for( var j = 0; j < 6; j++ ) {
        this.objects.push( this.createCloud() );
    }
};
 
/*
    Creates a single cloud base: a div in world
    that is translated randomly into world space.
    Each axis goes from -256 to 256 pixels.
*/

CatController.prototype.createCloud = function () {
 
    var div = document.createElement( 'div'  );
    random_x = 500+Math.round(Math.random()*700)*(-1+2*Math.round(Math.random()));
    random_y = 300+Math.round(Math.random()*300)*(-1+2*Math.round(Math.random()));
    random_z = Math.round(Math.random()*800);
    div.className = 'cloudBase';
    var t = 'translateX( ' + random_x + 'px ) \
        translateY( ' + random_y + 'px ) \
        translateZ( -' + random_z + 'px )';
        div.style[Modernizr.prefixed('transform')] = t;
        
    world.appendChild(div);
     
    for( var j = 0; j < 4 + Math.round( Math.random() * 10 ); j++ ) {
            var cloud = document.createElement( 'img' );
            
            var name = "img/cloud.png";
/*
            var name = "img/smoke.png";
            var size = this.cloudTypes.length;
            var item = Math.round(Math.random()*(size-1));
            name = this.cloudTypes[item];
            console.log(this.cloudTypes[item]);
*/

            cloud.src= name;
            cloud.className = 'cloudLayer';
             
            var x = 256 - ( Math.random() * 512 );
            var y = 256 - ( Math.random() * 512 );
            var z = 100 - ( Math.random() * 200 );
            var a = Math.random() * 360;
            var s = .5 + 2.5*Math.random();
            x *= .2; y *= .2;

            cloud.data = { 
                x: x,
                y: y,
                z: z,
                a: a,
                s: s
            };
            var t = 'translateX( ' + x + 'px ) \
                translateY( ' + y + 'px ) \
                translateZ( ' + z + 'px ) \
                rotateZ( ' + a + 'deg ) \
                scale( ' + s + ' )';
            cloud.style[Modernizr.prefixed('transform')] =  t;
             
            div.appendChild( cloud );
            this.layers.push( cloud );
        }
         
        return div;
}


  CatController.prototype.mouseMove = function(event){
    var parentOffset = this.widget.offset(); 
    if($(event.toElement).hasClass("hell")){
    }

    var x = event.pageX - parentOffset.left;
    var y = event.pageY - parentOffset.top;
   
   //unnecessary code to turn protogonist to move direction
   if(typeof this.oldPos != 'undefined'){
      angle = 0;
      if(
        this.oldPos.x==x&&
        this.oldPos.y<y
      ){
        angle = 180;
      }

      if(
        this.oldPos.x<x&&
        this.oldPos.y<y
      ){
        angle = 45;
      }

      if(
        this.oldPos.x<x&&
        this.oldPos.y==y
      ){
        angle = 90;
      }

      if(
        this.oldPos.x<x&&
        this.oldPos.y<y
      ){
        angle = 135;
      }

      if(
        this.oldPos.x>x&&
        this.oldPos.y>y
      ){
        angle = 225;
      }

      if(
        this.oldPos.x>x&&
        this.oldPos.y==y
      ){
        angle = 270;
      }

      if(
        this.oldPos.x>x&&
        this.oldPos.y<y
      ){
        angle = 315;
      }
      this.engine[0].style[Modernizr.prefixed('transform')] = "rotateZ("+angle+"deg)";
    }

    $(".cat").css({
      left:x+"px",
      top:y+"px",
    });

  this.oldPos = {
    x:x,
    y:y
   }
  };


  function onDOMReady(){
    global.catController = new CatController();
  }

  $(document).ready(onDOMReady);

})(this)