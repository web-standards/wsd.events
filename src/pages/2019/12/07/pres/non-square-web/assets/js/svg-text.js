(function() {
  const svgTextDemoElem = document.querySelectorAll('.svg-text-demo');
  const svgTextDemoText = document.getElementById('mask-text__text');

  svgTextDemoElem.forEach(item => {
    const inputElem = item.querySelector('.svg-text-demo__input');

    inputElem.addEventListener('input', () => {
      svgTextDemoText.innerHTML = inputElem.value;
     });
  });
})();
