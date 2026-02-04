function createBrushstroke (pageX, pageY, color) {
    var divElem = document.createElement('div');
    divElem.className = 'brushstroke';
    divElem.style.left = pageX + 'px';
    divElem.style.top = pageY + 'px';
	divElem.style.backgroundColor = color;
    document.documentElement.appendChild(divElem);
	divElem.addEventListener('animationend', onAnimationEnd);
}
                             
function onAnimationEnd (event) {
    var divElem = event.target;
	divElem.removeEventListener('animationend', onAnimationEnd);
    divElem.parentNode.removeChild(divElem);
}