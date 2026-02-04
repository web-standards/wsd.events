var audioURL;

window.onload = function () {

    document.getElementById('file_select').addEventListener('change', function (event) {

        audioURL = URL.createObjectURL(event.target.files[0]);

        var buttons = document.querySelectorAll('.button');
        buttons.forEach(function (button) {
            button.addEventListener('mouseenter', createHandler(
                Number(button.attributes.getNamedItem('data-value').value)
            ));
        });

    })
};

function createHandler(value) {
    var audio = createAudio(value);
    return function () {
        audio.play();
    };
}

function createAudio(value) {
    var audio = new Audio(audioURL);
    var audioCtx = new AudioContext();
    var source = audioCtx.createMediaElementSource(audio);
    var panner = audioCtx.createStereoPanner();
    panner.pan.value = value;
    source.connect(panner);
    panner.connect(audioCtx.destination);
    return audio;
}
