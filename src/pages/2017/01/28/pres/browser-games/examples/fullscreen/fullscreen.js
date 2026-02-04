


window.onload = function () {
    
    var elem = document.getElementById('example');

    elem.addEventListener('click', function (event) {
        example.requestFullScreen && example.requestFullScreen ();
        example.mozRequestFullScreen && example.mozRequestFullScreen ();
        example.webkitRequestFullScreen && example.webkitRequestFullScreen ();
    });
};