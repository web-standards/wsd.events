var selectmode = function(){

  var doc = document;
  var modePrefix = "mode";
  var modeCurrent = modePrefix + "--current";

  var modeDefault = "normal";

  var modes = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];

  var demo = doc.querySelector(".demo-selectmode");
  var demoContent = doc.querySelector(".demo-selectmode__content");
  var rangeColor = demo.querySelector(".inp-range");

  var elemList = doc.createElement( "ul" );
  elemList.classList.add( "list--modes" );
  var listModes = demoContent.appendChild( elemList );

  var defaultColor = "hsl(180,100%,30%)";
  demo.style.color = defaultColor;
  demoContent.style.backgroundColor = defaultColor;

  function changeMode(elem){
      var currentMode = elem.getAttribute("data-mode");
      demoContent.style.backgroundBlendMode = currentMode;

      var currentElem = doc.querySelector("." + modeCurrent);
      currentElem.classList.remove(modeCurrent);

      elem.classList.add( modeCurrent);
  }

  function changeColor(elem){
     var val = elem.value;
     var newColor = "hsl(" + val +",100%,30%)";

     demo.style.color = newColor;
     demoContent.style.backgroundColor = newColor;
  }

  for (var i = 0; i < modes.length; i++){
    var elemLi = doc.createElement( "li" );
    elemLi.classList.add( modePrefix, modePrefix + "--" + modes[i] );

    if (modes[i] == modeDefault) {
      elemLi.classList.add( modeCurrent);
      }

    elemLi.setAttribute( "data-mode", modes[i] );
    elemLi.innerHTML = modes[i];
    var listItem = listModes.appendChild( elemLi );

    listItem.onclick = function(){
     changeMode(this);
    }
  }

  rangeColor.onmousemove = function(){
   changeColor(this);
  }
  rangeColor.onchange = function(){
   changeColor(this);
  }

};

selectmode();