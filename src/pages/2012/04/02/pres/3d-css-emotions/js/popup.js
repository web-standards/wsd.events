function Popup(g, d) {
	
	var	graphic = g,
		master = g.parent().parent(),
		depth = d,
		fold = 1,
		zRot = g.parent().hasClass('page-left') ? 15 : -15,
		timer,
		POPUP_WIDTH = 300;
	
	init();
	
	function init() {		
		master.bind('pageFolding', function(e) {
			fold = e.originalEvent.per >= 0 ? e.originalEvent.per : 0;
			//console.log(fold);
			setFold();
		});
		
		setFold();
	}
	
	function setFold() {
		var points = [];
		
		// origin
		points[0] = [0, 0, 0];
		
		// left piece: bottom outside
		points[1] = [-POPUP_WIDTH * Math.cos(degToRad(-180 * fold)), POPUP_WIDTH * Math.sin(degToRad(-180 * fold)), POPUP_WIDTH * Math.sin(degToRad(-15))];
		
		// right piece: bottom outside
		points[2] = [POPUP_WIDTH * Math.cos(degToRad(-180 * 0)), POPUP_WIDTH * Math.sin(degToRad(-180 * 0)), POPUP_WIDTH * Math.sin(degToRad(-15))];
		
		// left piece: top inside
		points[3] = [-POPUP_WIDTH * Math.cos(degToRad((-180 * fold) - 90)), POPUP_WIDTH * Math.sin(degToRad((-180 * fold) - 90)), 0];
		
		
		
		var adj = Math.sqrt(Math.pow(POPUP_WIDTH, 2) - Math.pow(POPUP_WIDTH * Math.sin(degToRad(-15)), 2));
		points[1] = [-adj * Math.cos(degToRad(-180 * fold)), adj * Math.sin(degToRad(-180 * fold)), POPUP_WIDTH * Math.sin(degToRad(-15))];
		points[2] = [adj * Math.cos(degToRad(-180 * 0)), POPUP_WIDTH * Math.sin(degToRad(-180 * 0)), POPUP_WIDTH * Math.sin(degToRad(-15))];
		var len = Math.sqrt(Math.pow(points[1][0], 2) + Math.pow(points[1][1], 2) + Math.pow(points[1][2], 2));
		
		// normalize the vectors
		var normV1 = $V([points[1][0] / len, points[1][1] / len, points[1][2] / len]);
		var normV2 = $V([points[2][0] / len, points[2][1] / len, points[2][2] / len]);
		var normV3 = $V([points[3][0] / len, points[3][1] / len, points[3][2] / len]);
		
		// calculate the cross vector
		var cross = normV1.cross(normV2);
		
		// calculate the cross vector's angle from vector 3
		var crossAngle = -radToDeg(cross.angleFrom(normV3)) - 90;
		
		// transform the shape		
		graphic.css('-webkit-transform', 'translateY(' + depth + 'px) rotateZ(' + zRot + 'deg) rotateX(' + crossAngle + 'deg)');
		graphic.css('-moz-transform', 'translateY(' + depth + 'px) rotateZ(' + zRot + 'deg) rotateX(' + crossAngle + 'deg)');
		graphic.css('transform', 'translateY(' + depth + 'px) rotateZ(' + zRot + 'deg) rotateX(' + crossAngle + 'deg)');
	}
	
	function degToRad(deg) {
		return deg * Math.PI / 180;
	}
	
	function radToDeg(rad) {
		return rad * 180 / Math.PI;
	}
}