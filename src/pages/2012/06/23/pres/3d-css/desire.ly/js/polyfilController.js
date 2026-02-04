function onDOMReady() {
	$.webshims.polyfill('forms');
	$('form').bind('firstinvalid', function(e) {
		$.webshims.validityAlert.showFor(e.target);
		return false;
	});
}
$(document).ready(onDOMReady);