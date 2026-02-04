var colorize = function () {
    var doc = document;
    var head = doc.querySelector("head");
    var demo = doc.querySelector(".demo--colorize");
    var rangeColor = demo.querySelector(".inp-range");

    var myCss = doc.createElement("style");
    head.appendChild(myCss);

    function changeColor(elem){
     var val = elem.value;
     var newColor = "hsl(" + val +", 55%, 55%)";
     var newLightColor = "hsl(" + val +", 70%, 70%)";

      myCss.innerHTML = ".colorize-demo,  .colorize-demo .nav__item{background-color: " + newColor + "}";
     myCss.innerHTML += ".colorize-demo H1{ border-color: " + newLightColor + "}";

    }

    rangeColor.onmousemove = function(){
      changeColor(this);
    }
    rangeColor.onchange = function(){
      changeColor(this);
    }
}

colorize();