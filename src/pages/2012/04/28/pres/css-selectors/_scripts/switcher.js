// Number of slides or ID of the last slide. ID of the first slide must be '1',
// ID of the second slide must be '2', and so on
var $lastSlide = document.querySelectorAll('article.slide').length;

// Other global variables
var $currentSlide, $prevSlide, $nextSlide;

document.onkeydown = switchSlide;
getCurrentSlide();

function switchSlide(event) {
	getCurrentSlide();

	switch(event.which) {
		case 32: // spacebar
		case 34: // PgDn
		case 39: // right arrow
		case 40: // down arrow
			document.location.hash = '#' + $nextSlide;
			getCurrentSlide();
			break;
		case 33: // PgUp
		case 37: // left arrow
		case 38: // up arrow
			document.location.hash = '#' + $prevSlide;
			getCurrentSlide();
			break;
		case 35: // end
			document.location.hash = '#' + $lastSlide;
			getCurrentSlide();
			break;
		case 36: // home
			document.location = '#1';
			getCurrentSlide();
			break;
		}
	}

function getCurrentSlide() {
	$currentSlide = document.location.hash.replace(/#/, '');

	$currentSlide = parseInt($currentSlide);

	if(isNaN($currentSlide)) {
		$currentSlide = 1;
		}

	$prevSlide = $currentSlide - 1;
	$nextSlide = $currentSlide + 1;

	if($prevSlide <= 1) {
		$prevSlide = 1;
		}

	if($nextSlide >= $lastSlide) {
		$nextSlide = $lastSlide;
		}

	document.getElementById('slide-number').innerHTML = $currentSlide + ' / ' + $lastSlide;
	}
