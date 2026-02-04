// console.clear();

var curSlideClass = ".slide.active";

// Show Shapes
// -------------------------------
var showShapeClass = "live-editor__view";

function removeBackground(elem){
    // $(elem).css("background","none");
    $(elem).parent().addClass("no-highlight");
}

// Redraw
// -------------------------------
// This need to force redraw of text in Firefox
jQuery.fn.redraw = function() {
    return this.hide(0, function() {
        $(this).show();
    });
};

function setAttr(propName, propValue, editedElem) {

    if (propName == "viewbox"
        || propName == "viewBox"
        || propName == "preserveaspectratio"
        || propName == "preserveAspectRatio"){
            var svgElem = document.querySelector(".active svg");
    }

    if (propName == "viewbox"
        || propName == "viewBox"){
            svgElem.setAttribute("viewBox", propValue);
        }
    else if (propName == "preserveaspectratio"
        || propName == "preserveAspectRatio"){
            svgElem.setAttribute("preserveAspectRatio", propValue);
        }
    else if (propName == "width"
        || propName == "height"){
            $(editedElem).css(propName,propValue);
        }
    else {
        $(editedElem).attr(propName,propValue);
        if (propName == "fill" || propName == "stroke"){
            $(editedElem).redraw();
            }
        }

}

$(".live-editor--elem").each ( function(){
    var svgCode = $(this).find(".live-editor__code");
    var shape_code = svgCode.val();

    var destSelector = '.live-editor__content';
    var demoContent = $(this).find(".live-editor__content");
    var svgViewCode = "<div class='" + showShapeClass + "'>" + shape_code + "</div>";
    var svgView;

    if ( $(svgCode).data('dest') ) {
        destSelector = $(svgCode).data('dest');
        svgView = $(destSelector);
    }
    else {
        svgView = $(svgViewCode).insertAfter($(demoContent));
    }

    $(svgCode).change ( function(){
        $(svgView).html( $(this).val() );
        removeBackground(this);
    });

    svgCode.bind('keydown keyup', function(event){
        event.stopPropagation();
        $(svgView).html( $(this).val() );
        removeBackground(this);
    });

});

// Edit Property
// -------------------------------

function editProperty(elem, editedCode) {

    var svgElem = $(elem).find("svg");
    var codeVal = $(editedCode).val();
    var maxLine = 64;

    if (!codeVal) return;

    if ($(editedCode).val().length > maxLine){
        // console.log("too long");
        $(editedCode).parent().addClass("js--edited");
    }

    var destination = ".live-editor__dest";

    if ( $(editedCode).data("dest") ){
        destination = "." + $(editedCode).data("dest");
        }

    var editedElem = $(elem).find(destination);

    var propsValues = $(editedCode).val().split("\" ");

    //console.log("propsValues");
    //console.log(propsValues);

    for (var i = 0; i < propsValues.length; i++) {
        var propNameValue = propsValues[i].split("=");

        if (propNameValue[0]) {

            var propName = propNameValue[0];

            if( propNameValue.length == 1 ){
                propName = $(editedElem).data('attr') || 'style';
                propNameValue[1] = propNameValue[0];
            }

            var propValue = propNameValue[1].replace(/"/g,"");

            var svgElem = document.querySelector(".active svg");

            setAttr(propName, propValue, editedElem);
        }
    }
}

$(".live-editor--attr").each ( function(){
    var editedCode = $(this).find(".live-editor__code");
    var codeParent = this;

    editedCode.change ( function(codeParent){
        editProperty(codeParent, this);
        // console.log("change");
    });

    $(editedCode).bind("keydown keyup", function(event){
        event.stopPropagation();
        editProperty(codeParent, this);
        // console.log("keydown keyup");
    });

});
