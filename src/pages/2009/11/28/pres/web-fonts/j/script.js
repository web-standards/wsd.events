$(function() {

	var body = $(document.body);
	var detector = $('<div class="detector"></div>');
	var fontSizeBefore = parseInt(body.css('font-size'));
	var bodyWidthBefore = body.width();
	var bodyHeightBefore = body.height();
	var slide = $('body>section:first');

	body.append(detector);

	function updateView() {
		if(fullScreen()) {
			window.scrollTo(0,0);
			var hash = document.location.hash;
				hash = (hash.length && $(hash).length) ? hash : slide.attr('id');
			document.location.hash = hash;
			var bodyWidthAfter = body.width();
			var bodyHeightAfter = body.height();
			var fontSizeAfter = fontSizeBefore;
			while(detector.width() < bodyWidthAfter && detector.height() < bodyHeightAfter) {
				detector.css('font-size',parseInt(detector.css('font-size'))+1);
				fontSizeAfter++;
			}
			body.css('font-size',fontSizeAfter).attr('id','done');
		} else {
			body.css('font-size',fontSizeBefore).attr('id','');
			detector.css('font-size',fontSizeBefore);
		}
	}

	function turnSlide(e) {
		if(!fullScreen()) return;
		var current = $(document.location.hash);
		switch (e.which) {
			case 32: // Space
			case 34: // PgDown
			case 40: // Down
			case 39: // Right
				var target = current.next('.slide');
				break;
			case 33: // PgUp
			case 38: // Ip
			case 37: // Left
				var target = current.prev('.slide');
				break;
			default:
				return;
		}
		e.preventDefault();
		if(!target.length) return;
		document.location.hash = '#' + target.attr('id');
	}
	
	function fullScreen() {
		return body.css('background-color') != '#000000' ? false : true;
	}

	$(window).resize(updateView).load(updateView);
	$(document).keypress(turnSlide);

});