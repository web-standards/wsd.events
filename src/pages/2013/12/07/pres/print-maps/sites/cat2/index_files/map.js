(function() {
    var e = document.getElementById(_clustrmaps.id);
    e.style.width='160px';
    e.style.height='106px';

    var host = _clustrmaps.host ? _clustrmaps.host 
	: "http://www" + (_clustrmaps.server == 1 ? "" : _clustrmaps.server) 
	+ ".clustrmaps.com";

    var click_url = host + "/counter/maps.php?url=" + _clustrmaps.url;
    var image_url = host + "/stats/maps-no_clusters/" 
	+ cleanurl(_clustrmaps.url) + "-thumb.jpg";


    if (_clustrmaps.version == 'htmlbasic') {
	e.innerHTML = '<a href="' + click_url + '">' 
	    + '<img border=0 src="' + image_url + '"></a>';
    } else if (!navigator.userAgent.match(/MSIE 6\./)) {
	display_layered();
    } else {
	var link = document.createElement('a');
	link.href = click_url;
	link.style.position = 'relative';

	var i = document.createElement('img');
	i.style.border='none';
	i.src = image_url;
	
	link.appendChild(i);
	e.appendChild(link);
    };

    function cleanurl (url) {
	return url.replace(/^[hH][tT][tT][pP]:\/\//,"").replace(/%[0-9a-f][0-9a-f]/,"-").replace(/[\\\/:\*\?\<\>\|\;\&]/g,"-");
    };

    function subdir (i) {
	return Math.floor(i/1000)*1000 + "/" + i;
    };

    function display_layered () {
	var file = cleanurl(_clustrmaps.url);
        var dir = subdir(_clustrmaps.user);
	var base = host + "/stats/maps-layer/" + dir;
	var dots = base + "/" + file + "-thumb-dots.png";
	var text = base + "/" + file + "-thumb-text.png";
	var dynamic = host + "/stats/maps-dynamic/" + dir + "/dynamic.js";
	
	var link = document.createElement('a');
	link.href = click_url;
	link.style.border = 'none';
	if ('target' in _clustrmaps) {
            link.target = _clustrmaps.target;
        }

	var i = document.createElement('img');
        var image;
        if ('corners' in _clustrmaps) {
            image = _clustrmaps.corners == 'rounded' ? '/images/nasa_classic.png' : '/images/nasa_classic.jpg';
        } else {
            image = '/images/nasa_classic.jpg';
        };

	i.style.background = 'url(' + host + image + ')';
	i.src = text;
	i.style.border = 'none';
	i.style.position = 'absolute';
	i.style.left = '0px';
	i.style.top = '0px';
        i.style.padding = '0px';
	
	var j = document.createElement('img');
	j.src = dots;
	j.style.position = 'absolute';
	j.style.border = 'none';
	j.style.zIndex = 1;
	j.style.left = '0px';
	j.style.top = '0px';
        j.style.padding = '0px';

	link.appendChild(i);
	link.appendChild(j);

	e.style.position = 'relative';
	e.appendChild(link);

	display_dynamic(link,dynamic);
    };

    function display_dynamic(elt,dynamic) {
	
	var dots = [] ;
        var tweets = [] ;
	var timer = null;
        var tweet_sectors = {};
        var now = new Date();

	function highlight (x) {
	    var n = x.length;
	    if (!n) { return; } ;

            for (var i = 0; i < n; i++) {
                x[i].style.display = 'inline';
            }

	    function flashon (t) { 
		x[t%n].src = host + '/images/ydot_large.png';
		x[t%n].style.zIndex = 99;
		x[t%n].style.display = 'inline';
		setTimeout(function () { flashoff(t); }, 500);
	    }

	    function flashoff (t) {
		x[t%n].src = host + '/images/smallyellow.png';
		x[t%n].style.zIndex = 1;
		if (t < 5 * n) {
		  setTimeout(function () { flashon(t+1); }, 1000+Math.random()*2500);	
		}
	    }

	    setTimeout(function () { flashon(0); } , 500);
	}

        function rotate (x) {
	    var n = x.length;

	    if (!n) { return; } ;

	    function on (t) { 
		x[t%n].style.zIndex = 99;
		x[t%n].style.display = 'inline';
		setTimeout(function () { off(t); }, 4000);
	    }

	    function off (t) {
                x[t%n].style.display = 'none';
                x[t%n].style.zIndex = 1;
		if (t < 5 * n) {
                    setTimeout(function () { on(t+1); }, 500);	
		} else {
                    for (var i = 0; i < n; i++) {
                        x[i].style.zIndex = 99;
                        x[i].style.display = 'inline';
                    }
                }
	    }

	    setTimeout(function () { on(0); } , 500);
	}

	function draw_dot (lat, lon, loc, image) {
	    if (lat == undefined || lon == undefined) { return ; } ; // spurious geoip points
            if (lat == 0 && lon == 0) { return ; } ; // spurious geoip points
            if (lat > 90 || lat < -90 || lon > 180 || lon < -180) { return; } ;
	    var i = document.createElement("img");
            var x = 160.0*(Number(lon)+180.0)/360.0 - image.width/2 + image.x_offset;
            var y = (106-22)*(90-Number(lat))/180 + 22 - image.height/2 + image.y_offset;
	    i.style.left = Math.round(x) + "px";
	    i.style.top = Math.round(y) + "px";
	    i.style.position = 'absolute';
	    i.style.width =  image.width + 'px';
	    i.style.height = image.height + 'px';
	    i.style.border = 'none';
	    i.style.display = 'none';
	    i.style.zIndex = 2;
            i.style.padding = '0px';
	    i.src = image.src;
	    elt.appendChild(i);
            return i;
	}

	function drawClustrMapLayer (type, data) {
            var pts = data.points;
            var timestamp = data.timestamp;
            var yyyy = timestamp.substr(0,4);
            var mm = timestamp.substr(4,2);
            var dd = timestamp.substr(6,2);
            var date = new Date(yyyy, mm-1, dd);
            var age = (now - date)/(24*3600*1000);

            if (type == 'recent') {
                var img = { src: host + '/images/smallyellow.png',
                            width: 9, height: 9, x_offset: 0, y_offset: 0 } ;
                for(var k=0; k<pts.length; k++){
                    var p = pts[k];
                    var i = draw_dot(p[0],p[1],p[2],img);
                    if (i) { dots.push(i); };
                }
            } else if (type == 'tweets' && age < 30) {
                var imgl = { src: host + '/images/clustr-bubble-left.png',
                             width: 32, height: 32, x_offset: 1, y_offset: -1} ;
                var imgr = { src: host + '/images/clustr-bubble-right.png',
                             width: 32, height: 32, x_offset: 1, y_offset: -1} ;
                for(var k=0; k<pts.length; k++){
                    var p = pts[k];
                    var cell = Math.floor(((p[0]+90)/180)*2) + "," + Math.floor(((p[1]+180)/360)*3);
                    if (!tweet_sectors[cell]) {
                        var t = draw_dot(p[0],p[1],p[2],(p[1] >= 150) ? imgr : imgl);
                        tweet_sectors[cell] = 1;
                        if (t) { tweets.push(t); } ;
                    }
                }
            } else {
                return;
            };

	    if (timer) {
		clearTimeout(timer);
	    };
	    timer = setTimeout(function () { highlight(dots); rotate(tweets); }, 500);
	}
	
	_clustrmaps.layer = drawClustrMapLayer;
	
	var jsonp = document.createElement('script');
	jsonp.src = dynamic;
	elt.appendChild(jsonp);
    }


    var jQuery;
    
    function loadJQuery () {
	var Version = '1.6';
	if (window.jQuery === undefined 
	    || window.jQuery.fn.jquery !== Version) {
	    var s = document.createElement('script');
	    s.type = "text/javascript";
	    s.onload = loaded;
	    s.onreadystatechange = function () { 
		if (this.readyState == 'complete' 
		    || this.readyState == 'loaded') {
		    loaded();
		}
	    };
	    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' 
		+ Version + '/jquery.min.js';
	    var x = document.getElementsByTagName('script')[0];
	    x.parentNode.insertBefore(s, x);
	} else {
	    jQuery = window.jQuery;
	    main();
	}
    };
    
    function loaded() {
	jQuery = window.jQuery.noConflict(true);
	main(); 
    };
    
    function main() { 
	jQuery(document).ready();
    };
})();



