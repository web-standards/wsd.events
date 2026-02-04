let multiplyColorsElms = document.querySelectorAll('.multiply-colors')

let mutationObserver = new MutationObserver(onClassChange)

function onClassChange(mutationList, observer) {
  mutationList.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (mutation.target.classList.contains('active')) {
        let multiplyColorsDemoElms = document.querySelectorAll('.multiply-colors-demo')

        for(let elm of multiplyColorsDemoElms) {
          if (elm.contains(mutation.target)) {
            elm.style[ 'background-color' ] = `rgba(${mutation.target.innerText})`
          }
        }
      }
    }
  })
}

for(let el of multiplyColorsElms) {
  let codeElms = el.querySelectorAll('code'),
      colorsElms = el.querySelectorAll('.color')

  for(let codeEl of codeElms) {
    codeEl.parentElement.style[ 'background-color' ] = `rgb(${codeEl.innerText})`
  }

  for(let colorElm of colorsElms) {
    mutationObserver.observe(colorElm, {
      childList: false,
      attributes: true,
      subtree: false
    })
  }
}

let gradient = document.querySelector('.gradient'),
		bgColor        = null;

if ( window.CSS && CSS.number ) {
	bgColor = '#00e640';
} else {
	bgColor = '#D91E18';
}

gradient.style.setProperty('--bg-color', bgColor);