$(function(){
  window.timeUpdateInterval = false;
  $('.play').on('click', function(){
    window.playButtonClick();
    $('body').addClass('playing');
    var playStartTime = new Date().getTime();
    $('.pause').html('0 s');
    if(timeUpdateInterval) clearInterval(timeUpdateInterval);
    window.timeUpdateInterval = setInterval(function(){
      var currentTime = new Date().getTime();
      var val = Math.round((currentTime -playStartTime )/100)/10;
      $('.pause').html( val+ (val==Math.ceil(val)?'.0':'') + ' s');
    },100);
  });
  $('.pause').on('click', function(){
    window.stopButtonClick();
    $('body').removeClass('playing');
  });


  //38 will go to the next slide and 40 to the previous.

  $(window).on('keyup', function(e){
    console.log(e);
    if(e.keyCode == '37'){
      window.parent.impress().prev();
    } else if(e.keyCode == '39'){
      window.parent.impress().next();
    }
  });



});
