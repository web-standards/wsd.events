(function(global){

  function FieldController(){
    $(document).on('keydown',$.proxy(this.keyController,this));

    this.base_height = 121;
    this.base_width = 140;
    this.base_delta = 0;
    this.field = $('body>.field');
    this.yard = $('#yard');
    this.createRoundField(1);
     // this.createBase('',0,0,1);
  }

  FieldController.prototype.keyController = function(event){
    switch(event.keyCode) {
      case 37:
      case 39:
      case 40:
      case 38:
        event.preventDefault();
        break;
    }
  };

  FieldController.prototype.createRoundField = function(size){
    var rows = size;
    var cols = size;

    // cмещение столбца
    var cols_iterations = (cols-1)/2;
    var dx = 0;

    for(var i=0; i<cols_iterations; i++){
      dx = i*this.base_width*.75 + i*this.base_delta;
      this.createRoundFieldColumn(rows,dx);
      this.createRoundFieldColumn(rows,-dx);
      rows--
    }
    dx = cols_iterations*this.base_width*.75 + cols_iterations*this.base_delta;
    this.createRoundFieldColumn(rows,dx,'sea-2');
    this.createRoundFieldColumn(rows,-dx,'sea-2');

  };

  FieldController.prototype.createRoundFieldColumn = function(rows,dx,ptype){
      // cмещение столбца
      var row_iterations = rows;
      // cмещение строки
      var dy = -(this.base_height*rows+this.base_delta*rows)/2;
      var zi = 0;
      // строки
      for(var i=0; i<row_iterations; i++){
        zi = i+1;
        if(typeof ptype == 'undefined'){
          type ='';
          if(i==0||i==row_iterations-1){
            type = 'sea-2';
            zi=0;
          }
        }else{
          if(ptype=='sea-2'){
            zi=0;
          }
          type = ptype;
        }
        this.createBase(type,dy,dx,zi);
        dy+=this.base_height;
      }
  };

  FieldController.prototype.createBase = function(type,top,left,zi){
    var base = Handlebars.compile(document.getElementById('base-template').innerHTML);
    this.yard.append(base({}));
    var element = this.yard.find('>.base');
    var transform = '';

    element.addClass(type).css('z-index',zi);

    var transform = this.getTransform(element[0]);
    element[0].style[Modernizr.prefixed('transform')] = transform+' translateX('+left+'px) '+'translateY('+top+'px) ';

    this.field.append(this.yard.html());
    this.yard.html('');
  };

  FieldController.prototype.getTransform = function(element){
    var st = window.getComputedStyle(element, null);
    var transform = st.getPropertyValue("-webkit-transform") ||
                    st.getPropertyValue("-moz-transform") ||
                    st.getPropertyValue("-ms-transform") ||
                    st.getPropertyValue("-o-transform") ||
                    st.getPropertyValue("transform");
    if(transform == 'none'){
      transform ='';
    }
    return transform;
  };

  function onDomReady(){
    new FieldController;
  }

  $(document).ready(onDomReady);

})(this)

if (!window.getComputedStyle) {
  window.getComputedStyle = function(el, pseudo) {
    this.el = el;
    this.getPropertyValue = function(prop) {
    var re = /(\-([a-z]){1})/g;
    if (prop == 'float') prop = 'styleFloat';
    if (re.test(prop)) {
      prop = prop.replace(re, function () {
        return arguments[2].toUpperCase();
      });
    }
    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
  }
}