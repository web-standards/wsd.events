P = {
	init: function() {
		P.hotkeys();
	},
	hotkeys: function() {
		window.onkeypress = function(e) {
			//console.log(e.keyCode, e.charCode);
			switch (e.keyCode) {
				case 37:
					P.slideLeft();
					break;
				case 39:
					P.slideRight();
					break;
			}
			switch (e.charCode) {
				case 32:
					P.slideRight();
					break;
			}
		}
	},
	slideLeft: function() {
		var slideNum = P.getCurrentSlide() - 1;
		if (slideNum) {
			location.hash = 'slide' + slideNum;
		}
	},
	slideRight: function() {
		var slideNum = P.getCurrentSlide() + 1;
		var slideLength = document.getElementsByTagName('nav')[0].getElementsByTagName('li').length;
		if (slideNum && slideNum <= slideLength) {
			location.hash = 'slide' + slideNum;
		}
	},
	getCurrentSlide: function() {
		var slideNum = location.hash.split('#slide')[1];
		return parseInt(slideNum);
	}
}
window.onload = function() {
	P.init();
	}

