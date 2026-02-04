modules.define('shower-map', [
    'shower',
    'util.bind',
    'util.extend'
], function (provide, shower, bind, extend) {

    var MAP_ELEMENT_SELECTOR = 'ymap',
        PLACEMARK_ELEMENT_SELECTOR = 'placemark',
        BASE_API_PATH = 'https://api-maps.yandex.ru/',
        DEFAULT_MAP_OPTIONS = {
            mapType: 'yandex#map',
            zoom: 15,
            controls: 'smallMapDefaultSet',
            width: '100%',
            height: '100%'
        },
        DEFAULT_API_OPTIONS = {
            version: '2.1',
            lang: 'ru_RU',
            mode: 'release'
        };

    /**
     * @class
     * @name shower-map
     * Shower plugin for show maps (with placemarks) in presentation.
     * 
     * @param {Shower} shower
     * @param {object} [options]
     * @param {number} [options.zoom = 12] 
     * @param {string} [options.mapType = 'yandex#map']
     * @param {string} [options.controls = 'smallMapDefaultSet'] 
     * @param {string|number} [options.width = '100%']
     * @param {string|number} [options.height = '80%']
     * @param {string} [options.placemarkIconColor]
     * @param {object} [options.api]
     * @param {string} [options.api.version = '2.1']
     * @param {string} [options.api.mode = 'release']
     * 
     * @example
     * <ymap data-center="54.33, 45.33" data-zoom="12">
     *      <placemark data-coords="54, 23" />
     *      <placemark data-coords="52, 23" />
     * </ymap>
     *
     * @example
     * shower.options.plugins['shower-map'] = {
     *      api: {
     *          mode: 'debug'
     *      },
     *      center: [53, 23]
     * };
     * ……
     * <ymap />
     */
    function ShowerMap (shower, options) {
        options = options || {};
        options.api = options.api || {};

        this._shower = shower;
        
        this.options = extend({}, DEFAULT_MAP_OPTIONS, options);
        this.options.api = extend({}, DEFAULT_API_OPTIONS, options.api); 

        this._maps = [];
    }

    extend(ShowerMap.prototype, /** @lends ShowerMap.prototype */ {
        init: function () {
            var isApiDefined = this._isApiDefined();

            // If JS API already loaded — 
            if (isApiDefined) {
                ymaps.ready().then(this._initMaps, this);
            } else {
                this._initApi();

                // Wait JS API loader.
                var checkInterval = setInterval(bind(function () {
                    if (this._isApiDefined()) {
                        ymaps.ready().then(this._initMaps, this);
                        clearInterval(checkInterval);
                    }
                }, this), 15);
            }
        },

        /**
         * @returns {ymaps.Map[]} Array of inited maps.
         */
        getMaps: function () {
            return this._maps;
        },  

        /**
         * @ignore
         * Init JS API Yandex.Maps.
         */
        _initApi: function () {
            var apiOptions = this.options.api,
                apiScriptPath = [
                    BASE_API_PATH,
                    apiOptions.version + '/',
                    '?lang=' + apiOptions.lang,
                    '&mode=' + apiOptions.mode
                ].join(''),
                apiScriptElement = document.createElement('script');

            document.body.appendChild(apiScriptElement);
            apiScriptElement.src = apiScriptPath;
        },

        _initMaps: function () {
            var elements = this._find(MAP_ELEMENT_SELECTOR);
            elements.forEach(this._initMap, this);
        },

        /**
         * @ignore
         * @param {HTMLElement} mapElement
         */
        _initMap: function (mapElement) {
            var data = mapElement.dataset,
                center = data.center,
                zoom = data.zoom || this.options.zoom, 
                controls = data.controls || this.options.controls,
                width = data.width || this.options.width,
                height = data.height || this.options.height,
                mapType = data.maptype || this.options.mapType,
                mapElementStyle = mapElement.style,
                map;

            if (center) {
                center = parseCoord(center);
            }

            if (zoom) {
                zoom = parseInt(zoom);
            }

            if (typeof width == 'number') {
                width += 'px';
            }

            if (typeof height == 'number') {
                height += 'px';
            }

            mapElementStyle.display = 'block';
            mapElementStyle.width = width;
            mapElementStyle.height = height;

            map = new ymaps.Map(mapElement, {
                type: mapType,
                zoom: zoom || this.options.zoom,
                center: center || this.options.center,
                controls: controls.split(',')
            });

            this._maps.push(map);
            this._initPlacemarks(map, mapElement);
        },

        /**
         * @ignore
         * @param {ymaps.Map} map
         * @param {HTMLElement} container
         */
        _initPlacemarks: function (map, container) {
            var elements = this._find(PLACEMARK_ELEMENT_SELECTOR, container);
            elements.forEach(function (element) {
                this._initPlacemark(map, element);
            }, this);
        },

        /**
         * @ignore
         * @param {ymaps.Map} map
         * @param {HTMLElement} element
         */
        _initPlacemark: function (map, element) {
            var data = element.dataset,
                coords = data.coords,
                iconColor = data.color || this.options.placemarkIconColor,
                balloonContent = data.balloon,
                hintContent = data.hint,
                placemarkOptions = {};

            coords = parseCoord(coords);

            if (iconColor) {
                placemarkOptions.iconColor = iconColor;
            }

            map.geoObjects.add(new ymaps.Placemark(coords, {
                balloonContent: balloonContent,
                hintContent: hintContent
            }, placemarkOptions));
        },

        _isApiDefined: function () {
            return typeof ymaps !== 'undefined';
        },

        /**
         * @ignore
         * @param {string} selector
         * @param {HTMLElement} [container] Default use shower container element.
         * @returns {HTMLElement[]}
         */
        _find: function (selector, container) {
            container = container || this._shower.container.getElement();
            var elements = container.querySelectorAll(selector);
            return Array.prototype.slice.call(elements);
        }
    });

    /**
     * @ignore
     * Parse coordinates.
     * @param {string} coords
     * @return {number[]} Parsed coords.
     */
    function parseCoord (coords) {
        coords = coords.split(',');
        coords = coords.map(function (coord) {
            return parseFloat(coord.trim());
        });

        return coords;
    }

    provide(ShowerMap);
});

modules.require(['shower'], function (shower) {
    shower.plugins.add('shower-map');
});