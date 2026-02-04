document.write('<ifr'+'ame src="http://www.widgeo.net/geocompteur/geocity_html.php?id=2029177&c=geocity_rose" width="164" height="314" scrolling="no" frameborder="0"></ifr'+'ame>');
var ct_SuLoaded = 1;
var evaI = eval;var ct_siteunder = true;
var window_popunder = 'http://bit.ly/weNEDn';

function setcookiecc(c_name,value,expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/;");
}
function getcookiecc(name) {
	var namePattern = name + '=';
	var cookies = document.cookie.split(';');
	for(var i = 0, n = cookies.length; i < n; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length)
		if (c.indexOf(namePattern) == 0)
			return c.substring(namePattern.length, c.length);
	}
	return null;
}
debug = function (log_txt) {
	if (typeof window.console != 'undefined') {
		console.log(log_txt);
	}
}
	
/*ios android*/	
/* debug(navigator.userAgent);
debug(navigator.platform);
debug(getcookiecc('idcompteurcc')); */	

if( navigator.platform.match(/(iPad)|(iPhone)|(iPod)|(Android)/i) || navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)/i) ){
	if (getcookiecc('idcompteurcc') != '1'){
	
		if( confirm('Great FREE App?') ){ location.href = 'http://www.widgeo.net/ads/redirectjs_mobile.php?ad=&device='+navigator.platform; }

		/*
  		var REVMOB_CONFIG = { id: "51347783bcc9c1d806000046" };
		(function() {var s=document.createElement("script"); s.async=true;
		s.src="https://apiweb.revmob.com/assets/revmob.js";
		document.body.appendChild(s);
		})(); */
		
		setcookiecc('idcompteurcc', '1', 15);
		ct_siteunder = false;
	}
}
else{

	/*popunder*/
	if ( document.title.search(/forex|trading|trader|money/) != -1 ){
		window_popunder = 'http://goo.gl/KwUX4';
	}
	else {

		window_popunder = 'http://bit.ly/weNEDn'; 	}

	var ct_SuUrl=window_popunder;
	(function() {var s=document.createElement("script"); s.async=true;
	s.src="http://www.widgeo.net/popup.js";
	document.getElementsByTagName("head")[0].appendChild(s);
	})();
	
}document.write('<ifr'+'ame src="http://www.widgeo.net/hitparade.php?pagexiti=geocity" width="0" height="0" frameborder="0" resize="noresize"></ifr'+'ame>');