function onDOMReady(){
	$.webshims.polyfill('forms');
}

$(document).ready(onDOMReady);