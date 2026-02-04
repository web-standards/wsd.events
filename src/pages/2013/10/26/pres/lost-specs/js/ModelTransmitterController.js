(function(global){

  $(window).load(onDOMReady);

  function onDOMReady(){
    global.ModelTransmitterController = new  ModelTransmitterController;
  }

  function ModelTransmitterController(){
    this.server = 'http://178.79.181.157:1339/';
    this.socket = null;
    this.connectToServer();
  }

  ModelTransmitterController.prototype.connectToServer = function(){
    this.socket = io.connect(this.server, { query: "role=transmitter" });
    this.socket.on("connect", $.proxy(function(){
      console.log('connected');
      window.addEventListener("deviceorientation",$.proxy(this.sendPosition,this),true);
    },this));
  };


  ModelTransmitterController.prototype.sendPosition = function(event){
    var pos = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      };
    this.socket.emit('position', pos);
  };

})(this);