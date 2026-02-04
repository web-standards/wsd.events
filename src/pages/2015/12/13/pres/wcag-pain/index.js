document.addEventListener('DOMContentLoaded', function () {
	// your code goes here

	var v = document.getElementById('oops');
	console.log(v);
	v.addEventListener('play', function () {
		v.play();
	}, false);
	v.onclick = function () {
		if (v.paused) {
			v.play();
		} else {
			v.pause();
		}
		return false;
	};
	var v1 = document.getElementById('point');
	console.log(v);
	v1.addEventListener('play', function () {
		v1.play();
	}, false);
	v1.onclick = function () {
		if (v1.paused) {
			v1.play();
		} else {
			v1.pause();
		}
		return false;
	};
}, false);