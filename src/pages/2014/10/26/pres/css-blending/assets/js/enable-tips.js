var enableTips = function () {
    var doc = document;
    var head = doc.querySelector("head");
    var body = doc.querySelector("body");

    var myCss = doc.createElement("style");
    head.appendChild(myCss);

    myCss.innerHTML = ".js-enable-tips { position: fixed; top: 0; left: 0; width: 70px; height: 70px; background: transparent; border: 0; outline: none; cursor: pointer; }"
    myCss.innerHTML += ".show-tips .slide footer { bottom: 0; }";


    var tipsButton = doc.createElement("button");
    tipsButton.classList.add("js-enable-tips");

    body.appendChild(tipsButton);

    tipsButton.onclick = function(){
        body.classList.toggle("show-tips");
    };
}

enableTips();