// console.log("asdasd");

var curSlideClass = ".slide.active";

// Show Shapes
// -------------------------------
var showShapeClass = "demo__view";

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

$(".demo--live").each ( function(){
    var svgCode = $(this).find(".demo__code");
    var shape_code = svgCode.val();

    var demoContent = $(this).find(".demo__content");
    var svgViewCode = "<div class='" + showShapeClass + "'>" + shape_code + "</div>";
    var svgView = $(svgViewCode).insertBefore($(demoContent));

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


// Resize Objects
// -------------------------------

$(".demo__slider").mousemove(function(){
    var targetElem = $(this).attr("data-target");
    $(targetElem).css("width",$(this).val() + "%");
});

// Switch Demos
// -------------------------------
var switchCheckedClass = "switch--checked";
$(".demo__switch dd").each( function(){
    $(this).click( function(){
        $("." + switchCheckedClass, $(this).parent()).removeClass(switchCheckedClass);
        $(this).addClass( switchCheckedClass );

        // console.log("**");
        var changeAttr = $(this).parent().attr("data-attr");
        var changeDest = $(this).parent().attr("data-dest");
        var changeCodeDest = $(this).parent().attr("data-codedest");

        if( !changeDest ){
            changeDest = "g";
            }
        var changeVal = $(this).attr("data-val");

        var svgDest = $(curSlideClass).find(changeDest);

        setAttr(changeAttr, changeVal, svgDest);

        if (changeCodeDest){
            var codeDest = $(curSlideClass).find(changeCodeDest);
            codeDest.text(changeAttr + "=\"" + changeVal + "\"");
        }

        });
    });

// Popup Images
// -------------------------------
var popupClass = "popup";
var popupImgClass = popupClass + "__img";
 $(".img-preview").click ( function(){
    var img = "<img src='" + $(this).attr("href") + "' class='" + popupImgClass + "'>";
    $( "<div class='" + popupClass + "'>" + img + "</div>" ).insertBefore( this );
    var imgWidth = $("." + popupImgClass).width();
    $(".popup img").load(function() {
        $(".popup").height( $(this).height() );
        $(".popup").width( $(this).width() );
    });

    $(".popup").click ( function(event){
        event.stopPropagation();
        $(this).remove();
    });

    return false;
 });

// Toggle Codes
// -------------------------------

$(".js-toggle-code").each(function(){
    var elemHeight = $(this).height();
    $(this).attr("data-height", elemHeight);
    $(this).height(elemHeight);
});

$(".js-toggle-code").click(function(){
    $(this).toggleClass("is--collapsed");
    if ($(this).height() == $(this).attr("data-height")){
        $(this).height("1.8em");
    }
    else {
        $(this).height($(this).attr("data-height"));
    }
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
        $(editedCode).addClass("code--two-lines");
    }

    var destination = ".demo__live-edit";
    if ( $(editedCode).attr("data-dest") ){
        destination = "." + $(editedCode).attr("data-dest");
        }
    var editedElem = $(elem).find(destination);

    var propsValues = $(editedCode).val().split("\" ");

    //console.log("propsValues");
    //console.log(propsValues);

    for (var i = 0; i < propsValues.length; i++) {
        var propNameValue = propsValues[i].split("=");
        if (propNameValue[0]) {

            var propName = propNameValue[0];
            var propValue = propNameValue[1].replace(/"/g,"");

            var svgElem = document.querySelector(".active svg");

            setAttr(propName, propValue, editedElem);
        }
    }
}

$(".demo--editproperty").each ( function(){
    var editedCode = $(this).find(".demo__code");
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
