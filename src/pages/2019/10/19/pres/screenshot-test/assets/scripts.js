Reveal.addEventListener('creevey', function(a) {
	const video = document.querySelector('[data-state="creevey"] video');
  video.currentTime = 0;
  video.play();
}, false );
