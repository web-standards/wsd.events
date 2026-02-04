if(!window.jQuery){
  document.write(unescape('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'));
  document.write(unescape('%3Cscript src="js/jquery-ui.min.js"%3E%3C/script%3E'));
  document.write(unescape('%3Cscript src="js/jquery.mousewheel.min.js"%3E%3C/script%3E'));
}

if(typeof Modernizr == "undefined"){
  document.write(unescape('%3Cscript src="js/modernizr.min.js"%3E%3C/script%3E'));
}