(function(global){
  
  function onDOMReady(){
    $(".slide-1 mark").css({
      borderRight:"2px solid #000"
    });
    $(".slide-1 mark").data("edit",true);
    window.setInterval(function(){
      var mark = $(".slide-1 mark");
      switch(mark.data("edit")){
        case true:
          mark.css({
            borderRight:"2px solid #fff"
          });
          mark.data("edit",false);
        break;
        case false:
          mark.css({
            borderRight:"2px solid #000"
          });
          mark.data("edit",true);
        break;
      }
    },500);
  }
  
  
  $(document).ready(onDOMReady);

})(this);