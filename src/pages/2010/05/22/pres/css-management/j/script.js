$(function() {

	var slides = $( 'section.slide' );

	function fullScreen() {
		return ( $( document.body ).css( 'background-color' ) == '#000000' );
	}

	function turnSlide( e ) {
		if( !fullScreen() ) return;
		var current = $( document.location.hash );
		switch ( e.which ) {
			case 33 : // PgUp
			case 38 : // Up
			case 37 : // Left
				var target = current.prev( slides );
				break;
			case 32 : // Space
			case 34 : // PgDown
			case 40 : // Down
			case 39 : // Right
				var target = current.next( slides );
				break;
			default:
				return;
		}
		e.preventDefault();
		if( !target.length ) return;		
		else document.location.hash = '#' + target.attr( 'id' );
	}

	function updateView() {
		if( !fullScreen() || $( document.location.hash ).length ) return;
		else document.location.hash = '#' + slides.first().attr( 'id' );
	}

	$( document ).keyup( turnSlide );
	$( window ).resize( updateView ).load( updateView );

});