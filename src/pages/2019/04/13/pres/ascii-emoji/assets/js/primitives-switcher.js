'use strict';

(function(){
  const classes = {
    panel: 'controls-panel',
    panelVertical: 'controls-panel--vertical',
    panelGroup: 'controls-panel__group',
    panelGroupName: 'controls-panel__group-name',
    button: 'controls__button',
    buttonSelected: 'controls__button--selected',
    buttonLastSelected: 'controls__button--last-selected',
    buttonCurrentFilter: 'controls__button--current-filter',
  };

  function PrimitivesSwitcher(elem) {
    this.filterElem = elem.querySelector('.filter-source');

    this.controls = [];
    this.primitives = [];
    this.currentPrimitiveIndex = 0;
    this.currentFilterButton = null;
    this.controlsPanel = document.createElement('div');
    this.controlsPanel.classList.add(classes.panel);

    this.handlePrimitivesList();
    elem.appendChild(this.controlsPanel);
  }

  // ------------------------------

  PrimitivesSwitcher.prototype.handlePrimitivesList = function() {
    const primitives = this.filterElem.querySelectorAll('filter > *');
    primitives.forEach((primitive, index) => this.handlePrimitive({primitive, index}));
  }

  // ------------------------------

  PrimitivesSwitcher.prototype.handlePrimitive = function({primitive, index}) {
    const result = primitive.result.baseVal;

    const primitiveData = {
      index: index,
      id: result,
      elem: primitive,
      elemType: 'primitive'
    };

    const button = this.createButton(primitiveData);
    this.controls.push(button);

    primitiveData.control = button;
    this.primitives.push(primitiveData);

    this.controlsPanel.appendChild(button);

    primitive.remove();
  }

  // ------------------------------

  PrimitivesSwitcher.prototype.createButton = function(itemData) {
    const index = itemData.index || 0;
    const elemType = itemData.elemType;
    const button = document.createElement('button');
    itemData.isSelected = false;
    let added = null;

    button.type = 'button';
    button.classList.add(classes.button);
    button.innerHTML = itemData.name || itemData.id;

    const togglePrimitive = () => {
      // click the same
      if(index === this.currentPrimitiveIndex) {
        itemData.isSelected = !itemData.isSelected;
      }
      // click next
      else if(index === this.currentPrimitiveIndex + 1) {
        itemData.isSelected = !itemData.isSelected;
      }

      if(itemData.isSelected) {
        this.currentPrimitiveIndex = index;
      }
      else {
        this.currentPrimitiveIndex = index - 1;
      }

      const lastSelectedIndex = itemData.isSelected ? index + 1 : index;
      const primitivesToAdd = this.primitives.slice(0, lastSelectedIndex);

      // Refill filter
      this.filterElem.innerHTML = '';

      primitivesToAdd.forEach(primitiveData => {
        this.filterElem.appendChild(primitiveData.elem);
      })

      // Unselect not used primitives
      const primitivesToUnselect = this.primitives.slice(lastSelectedIndex);
      primitivesToUnselect.forEach(primitiveData => {
        primitiveData.isSelected = false;
      });

      this.checkEnabledControls();
    }


    if(index > 0) {
      button.disabled = true;
    }
    button.addEventListener('click', togglePrimitive);

    return button;
  }

  // ------------------------------

  PrimitivesSwitcher.prototype.checkEnabledControls = function () {
    this.primitives.forEach((primitiveData, index) => {
      const control = primitiveData.control;

      if(primitiveData.isSelected) {
        control.classList.add(classes.buttonSelected);

        if(this.currentPrimitiveIndex === index) {
          control.classList.add(classes.buttonLastSelected);
        }
        else {
         control.classList.remove(classes.buttonLastSelected);
        }
      }
      else {
        control.classList.remove(classes.buttonSelected);
        control.classList.remove(classes.buttonLastSelected);

        if(index === this.currentPrimitiveIndex + 1) {
          control.disabled = false;
        }
        else {
          control.disabled = true;
        }
      }
    })
  }

  // ------------------------------

  const primitivesSwitchers = document.querySelectorAll('.primitives-switcher');

  primitivesSwitchers.forEach(item => {
    new PrimitivesSwitcher(item);
  })
}());
