var container = document.getElementById("container"),
    $engine = $("#engine"),
    $quantity = $("#quantity"),
    $what = $("#what"),
    $top = $("#top"),
    $start = $("#start"),
    lines = document.getElementById("lines"),
    fps = document.getElementById("fps"),
    frame = 0,
    inProgress = false,
    divs, startTime;

TweenLite.defaultEase = Linear.easeNone;

function createDiv(parent, className) {
    var div = document.createElement("div");
    parent.appendChild(div);
    div.className = className;
    return div;
}

function start() {
    var quantity = parseInt($quantity.val(), 10),
        top = $top.prop("checked"),
        scaleAndRotation = $("#scaleAndRotation").prop("checked"),
        xMovement = $("input[name=xMovement]:radio:checked").val(),
        engine = $engine.val(),
        what = $what.val(),
        box, moveX, moveY, rotate, scale, i, tl, vars;

    divs = [];
    if (engine === "gsap") {
        for (i = 0; i < quantity; i++) {
            box = createDiv(container, "box");
            tl = new TimelineMax({repeat:-1, yoyo:true});
            vars = {}; //{backgroundColor:"blue"};
            vars[xMovement] = 500;
            if (top) {
                vars.top = 200;
            }
            tl.to(box, 10, vars);
            if (scaleAndRotation) {
                tl.to(box, 6, {rotation:180}, 2)
                    .to(box, 4, {scale:2}, 5);
            }
            tl.progress(1).progress(0);
            divs.push(box);
        }
    } else {
        for (i = 0; i < quantity; i++) {
            //in order to get independent control of transform components, we have to nest <div>s like this (not necessary with GSAP):
            moveX = createDiv(container, xMovement === 'left' ? "move-x-left box-css" : "move-x-transforms box-css");
            divs.push(moveX);
        }
    }
}

function stop() {
    var i = divs.length;
    while (--i > -1) {
        container.removeChild(divs[i]);
        divs[i].className = "";
        TweenLite.killTweensOf(divs[i]);
    }
    $("#line").css("visibility", "hidden");
}

$start.click(function() {
    inProgress = !inProgress;
    if (inProgress) {
        $start.html(" СТОП ").css({background:"#C00"});
        start();
    } else {
        $start.html(" СТАРТ ").css({backgroundColor:"#9af600", background: "linear-gradient(to bottom, #9af600 0%,#71B200 100%"});
        stop();
    }
});


startTime = Date.now();

function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        startTime = time;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
}
tick();
