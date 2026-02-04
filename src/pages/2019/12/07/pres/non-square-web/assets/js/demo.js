function Demo (config) {
  const targetElem = document.querySelector(config.targetClass);
  const {setExample, additionalProps} = config;

  if(!targetElem) {
    return;
  }

  const rangeContainer = targetElem.querySelector('.demo-range__container');
  const rangeMin = targetElem.querySelector('.demo-range__min');
  const rangeMax = targetElem.querySelector('.demo-range__max');
  const example = targetElem.querySelector('.demo__example');
  const codeValue = targetElem.querySelector('.demo__code-value');

  if(!example.innerHTML) {
    example.innerHTML = config.fullName;
  }

  const rangeInput = document.createElement('input');
  rangeInput.classList.add('demo-range__input');
  rangeInput.type = 'range';
  rangeInput.min = config.min;
  rangeInput.max = config.max;
  rangeInput.step = config.step;
  rangeInput.value = rangeInput.max;

  setVariation(rangeInput.value);

  rangeMin.innerHTML = rangeInput.min;
  rangeMax.innerHTML = rangeInput.max;
  rangeContainer.appendChild(rangeInput);

  rangeInput.addEventListener('input', function() {
    setVariation(this.value);
  });

  function setVariation(val) {
    let styleValues = [`"${config.name}" ${val}`];

    if(additionalProps) {
      additionalProps
        .forEach(prop => {
          styleValues.push(`"${prop.name}" ${prop.value}`);
        });
    }

    const strValues = styleValues.join(', ');
    example.style['font-variation-settings'] = strValues;

    if(codeValue) {
     codeValue.innerHTML = strValues;
    }
  }
}
