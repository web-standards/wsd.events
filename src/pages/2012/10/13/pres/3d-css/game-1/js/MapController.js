(function (global) {
  function MapsController (){
    this.map = null;
    this.place = [52.369563,4.893759];
    this.map = new ymaps.Map("map-wrapper",{
                    center: this.place,
                    zoom: 17,
                    lang: "ru"
                });
    this.map.setType('yandex#satellite');
  }

  function OnDOMReady () {
    ymaps.ready(MapInit);
  }

  function MapInit(){
    global.mapsController = new MapsController();
  }

  $(document).ready(OnDOMReady);

})(this)
