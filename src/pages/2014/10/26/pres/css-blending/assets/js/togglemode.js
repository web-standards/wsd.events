var togglemode = function (argument) {
    var doc = document;
    var togglemodeItems = doc.querySelectorAll(".js-togglemode");

    var toggleButton = doc.createElement("button");
    toggleButton.innerHTML = "<span class=\"text-on\">ON</span><span class=\"text-off\">OFF</span>";
    toggleButton.classList.add("js-blendmode-control");


    for (var i = 0; i < togglemodeItems.length; i++) {
        var item = togglemodeItems[i];
        var itemStyle = getComputedStyle(item, '');

        var clonedButton = toggleButton.cloneNode(true);

        var switchButton = item.appendChild(clonedButton);

        switchButton.onclick = function(){
            this.parentNode.classList.toggle("js-blendmode--off");
        };

    };
};

togglemode();

