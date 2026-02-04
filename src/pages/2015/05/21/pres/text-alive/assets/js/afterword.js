var afterwords = (function(){

// console.clear();

var s = Snap();
var sWidth = 1024;
var sHeight = 640;
s.attr({
    viewBox: [0,0,sWidth,sHeight].join(' ')
});

var g = s.g();
var pi = 3;
var max = 10;
var shapeR = 1500;
var strokeWidth = shapeR * 2;
var strokeWidthHalf = strokeWidth / 2;
var d = (shapeR + strokeWidthHalf) * 2;
var dashOffsetStep = 2 * pi * shapeR / max;
var colorStep = 360 / max;
var dur = 10000;
var patt;

var shapeObj = function() {
    var shape = s.circle(0, 0, 0);
    var dashOffset = 0;
    var dasharrayFirst = dashOffsetStep / 10 + (dashOffsetStep / 10) * Math.random();
    var strokeDasharray = [dasharrayFirst, dashOffsetStep].join(' ');
    var steps = [];
    var currentStep = 0;
    var cx = 0;
    var cy = 0;
    var thisDur = dur + Math.random() * dur;

    this.init = function(params) {
        cx = shapeR + strokeWidthHalf;
        cy = shapeR + strokeWidthHalf;
        var pos = params.pos;
        var color = getHSL(pos);
        dashOffset = dashOffsetStep * pos;

        shape.attr({
            cx: cx,
            cy: cy,
            r: shapeR,
            fill: 'none',
            stroke: color,
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeDasharray,
            'stroke-dashoffset': dashOffset
        });

        g.add(shape);

        myAnim();
    }; // init

    function myAnim() {

            var rotateList = [360, cx, cy].join(',');
            var rotateListInit = [0, cx, cy].join(',');

            shape.attr({
                transform: 'rotate(' + rotateListInit + ')'
            });

            shape.animate({
                    transform: 'rotate(' + rotateList + ')'
                },
                thisDur,
                myAnim
            );

            currentStep = currentStep < (steps.length - 1) ? currentStep + 1 : 0;

        } // end myAnim
};

function getHSL(pos) {
    var colorPos = max - pos;
    var color = [colorStep * colorPos, 100, 50].join(',');
    return 'hsl(' + color + ')';
}

function createShapes() {

    for (var i = 0; i < max; i++) {
        var shape = new shapeObj;
        shape.init({
            pos: i
        });
    }
}

function createPattern() {
    console.log(d);

    patt = g.toPattern(0, 0, d, d);
    patt.attr({
        width: 7,
        height: 7,
        x: -3,
        y: -3,
        patternUnits: 'objectBoundingBox'
    });
}

function createDemo() {

    var text = s.text('50%','50%','Fin');

    text.attr({
        fill: patt,
        // stroke: '#000',
        'text-anchor': 'middle',
        dy: '.25em',
        'font': 'bold 6em/1 Arial'
    });

}

createShapes();
createPattern();

createDemo();

// var afterwordSlide = document.querySelector('.afterword');
// afterwordSlide.appendChild(s.node);

})();