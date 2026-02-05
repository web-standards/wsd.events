// Expand Speakers

(function(document){

	var more = document.getElementById('more');

	if (more) {
		more.addEventListener('click', function() {
			var speakers = more.parentNode.querySelectorAll('.speakers__speaker--hidden');
			var group = 20;

			if (speakers.length) {
				for (var i = 0, l = Math.min(speakers.length, group); i < l; i++) {
					var speaker = speakers[i];
					var picture = speaker.querySelector('.speakers__picture');

					if (picture.dataset.src) {
						picture.src = picture.dataset.src;
					}

					if (picture.dataset.srcset) {
						picture.srcset = picture.dataset.srcset;
					}

					speaker.classList.remove('speakers__speaker--hidden');
				}

				if (speakers.length <= group) {
					more.parentNode.removeChild(more);
				}
			}
		});

	}

})(document);

// Maps

function getMapData(allowedHostname) {
	var map = document.getElementById('map');

	if (!allowedHostname || !map) return;

	var rawSrc = map.firstChild.src;

	if (typeof rawSrc !== 'string') return;

	var srcPrefix = rawSrc.split('?')[0];
	var srcSuffix = rawSrc.split('?')[1];
	var srcParams = srcSuffix.split('&');

	if (srcPrefix.indexOf(allowedHostname) === -1) return;

	var data = {
		map: map
	};

	for (var i = 0; i < srcParams.length; i++) {
		var item = srcParams[i].split('=');
		data[item[0]] = item[1];
	}

	return data;
}

function yandexMap() {
	var data = getMapData('maps.yandex.ru');

	if (!data) return;

	data.ll = data.ll.split(',');
	data.latitude = parseFloat(data.ll[0]);
	data.longitude = parseFloat(data.ll[1]);
	data.zoom = parseFloat(data.z);

	var coordinates = [
		data.longitude,
		data.latitude
	];

	var map = new ymaps.Map('map', {
		center: coordinates,
		zoom: data.zoom
	});

	map.behaviors.disable('scrollZoom');
	map.geoObjects.add(
		new ymaps.Placemark(coordinates, {}, {
		iconLayout: 'default#image',
		iconImageHref: '/images/icon.svg',
		iconImageSize: [80, 87],
		iconImageOffset: [-40, -95]
	}));

	data.map.classList.add('map--yandex');
	data.map.removeChild(data.map.firstChild);
}

function googleMap() {
	var data = getMapData('maps.googleapis.com');

	if (!data) return;

	data.center = data.center.split(',');
	data.latitude = parseFloat(data.center[0]);
	data.longitude = parseFloat(data.center[1]);
	data.scale = parseFloat(data.scale);
	data.zoom = parseFloat(data.zoom);

	var coordinates = {
		lat: data.latitude,
		lng: data.longitude
	};

	var map = new google.maps.Map(data.map, {
		zoom: data.zoom,
		center: coordinates
	});

	new google.maps.Marker({
		position: coordinates,
		icon: {
			url: '/images/icon.svg',
			size: new google.maps.Size(80, 87),
			scaledSize: new google.maps.Size(80, 87),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(40, 87)
		},
		map: map
	});

	data.map.classList.add('map--google');
}

// Iframe lazy loading

(function(document) {
	setupVideoPreload();

	function setupVideoPreload() {
		var videoElements = document.querySelectorAll('.video');

		for (var i = 0; i < videoElements.length; i++) {
			preloadVideo(videoElements[i]);
		}
	}

	function preloadVideo(videoElement) {
		var playButton = videoElement.querySelector('.video__button');
		var cover = videoElement.querySelector('.video__media');
		var videoId = parseCoverURL(cover);
		var videoWrapper = videoElement.querySelector('.video__wrapper');

		playButton.addEventListener('click', function() {
			var iframe = makeIframe(videoId);

			videoWrapper.innerHTML = '';
			videoWrapper.appendChild(iframe);
		});
	}

	function parseCoverURL(coverElement) {
		var urlRegExp = /https:\/\/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\/mqdefault\.jpg/i;
		var url = coverElement.src;
		var match = url.match(urlRegExp);

		return match[1];
	}

	function makeIframe(videoId) {
		var iframe = document.createElement('iframe');

		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('src', generateIframeUrl(videoId));
		iframe.classList.add('video__media');

		return iframe;
	}

	function generateIframeUrl(videoId) {
		var query = '?rel=0&showinfo=0&autoplay=1';

		return 'https://www.youtube.com/embed/' + videoId + query;
	}
})(document);
