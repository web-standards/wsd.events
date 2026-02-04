(function(global){

  $(window).load(onDOMReady);

  function onDOMReady(){
    global.ModelReciverController = new  ModelReciverController;
  }

  function ModelReciverController(){
    this.model = $('#model');
    this.server = 'http://178.79.181.157:1339/';
    this.socket = null;

    this.connectToServer();

  }

  ModelReciverController.prototype.connectToServer = function(){
    this.socket = io.connect(this.server, { query: "role=reciver" });
    console.log(this.socket);
    this.socket.on('position',$.proxy(this.getPosition,this));
  };


  ModelReciverController.prototype.getPosition = function(position){
    this.model.css({
          '-webkit-transform':"rotateX("+(position.gamma-90)+"deg) rotateY("+position.beta+"deg) rotateZ("+position.alpha+"deg)",
          '-moz-transform':"rotateX("+(position.gamma-90)+"deg) rotateY("+position.beta+"deg) rotateZ("+position.alpha+"deg)",
          'transform':"rotateX("+(position.gamma-90)+"deg) rotateY("+position.beta+"deg) rotateZ("+position.alpha+"deg)"
        });
  };

})(this);