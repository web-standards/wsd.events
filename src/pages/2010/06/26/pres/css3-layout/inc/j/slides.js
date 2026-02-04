/**
 * Author: Viacheslav Oliyanchuk (http://miripiruni.org)
 * Date: Jun 20, 2010
 * Time: 2:09:10 AM
 */
var slides = document.getElementsByClassName('slide');

function switch_slide(e){
	var key;
	var current_hash = (location.hash)?location.hash.substr(1):0;
	if(window.event) key = e.keyCode; else if(e.which) key = e.which; // IE or Netscape/Firefox/Opera

	console.log(key);

	if(key==39 || key==40){ // rarr or down arr
		s = document.getElementById(current_hash).nextSibling.nextSibling.id;
		if(s!=undefined && s!='') location.hash = s;
		document.getElementById(s+'-link').focus();
	}

	if(key==37 || key==38){ // larr or up arr
		if(current_hash!=slides[0].id) s = document.getElementById(current_hash).previousSibling.previousSibling.id; else s = '';
		if(s!=undefined && s!='') location.hash = s;
		document.getElementById(s+'-link').focus();
	}
}

window.onload = function(){
	if(!location.hash) location.hash = 'nav';

	nav = document.createElement('nav');
	nav.setAttribute('id','nav');
	document.getElementsByTagName('body')[0].insertBefore(nav,document.getElementsByTagName('body')[0].childNodes[0]);
	ol = document.createElement('ol');
	ol.setAttribute('id','toc');
	document.getElementsByTagName('nav')[0].appendChild(ol);

	for(i=0;i<slides.length;i++){
		li = document.createElement('li');

		item = document.createElement('a');
		item.setAttribute('href','#'+slides[i].id);
		item.setAttribute('tabindex','100');
		item.setAttribute('id',slides[i].id+'-link');

		item_text = document.createTextNode(slides[i].id);
		item.appendChild(item_text);
		li.appendChild(item);

		document.getElementById('toc').appendChild(li);
	}

	li = document.createElement('li');

	item = document.createElement('a');
	item.setAttribute('href','#nav');
	item.setAttribute('tabindex','100');

	item_text = document.createTextNode('В начало');
	item.appendChild(item_text);
	li.appendChild(item);

	document.getElementById('toc').appendChild(li);
}

document.onkeydown = switch_slide;