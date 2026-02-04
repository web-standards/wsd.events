(function(){
  data.sort(sortByYearStart)

  const dataWidgetTmpl = document.querySelector('#data-widget-tmpl');
  const sectionByDate = document.querySelector('.section--by-date');
  const sectionByGroup = document.querySelector('.section--by-group');
  const navGroups = document.querySelectorAll('.nav-group');
  const classes = {
    dataItem: 'list-data__item',
    dataContent: 'list-data__content',
    dataItemDisabled: 'list-data__item--disabled',
    dataItemGroupName: 'list-data__group-name',
    dataItemTitle: 'list-data__title',

    navControl: 'nav__control',
    navControlCurrent: 'nav__control--current',
    sectionHidden: 'section--hidden',

    navGroupControl: 'nav-group__control',
    navGroupControlActive: 'nav-group__control--active',

    listYearsItem: 'list-years__item',
    listYearsControl: 'list-years__control',
    listYearsControlActive: 'list-years__control--active',
    listYearsContainer: 'list-years__container',
  };
  const lists = {
    'by-date': [],
    'groups-nav': [],
    'years-nav': []
  };

  const years = {
    start: 2003,
    end: 2019,
  };

  const cols = years.end - years.start + 1;
  document.documentElement.style.setProperty('--cols', cols );

  fillListByDate({data, listId: 'by-date'});
  fillListByGroup({data});

  navGroups.forEach(navGroup => {
    let isShown = true;
    fillNavGroup(navGroup);
  });

  addSectionNavActions();

  //----------------------------------------

  function sortByYearStart(a, b) {
    if(!a.years) {
      return 0;
    }

    return a.years.start - b.years.start;
  }

  function sortByName(a, b) {
    if(a.name > b.name) {
      return 1;
    }
    if(a.name < b.name) {
      return -1;
    }
    return 0;
  }

  //----------------------------------------

  function fillYears({listYearsElem, listId}) {
    for(let i = years.start; i <= years.end; i++ ) {
      const liElem = document.createElement('li');
      liElem.classList.add(classes.listYearsItem);

      if(listId !== 'by-date') {
        const spanElem = document.createElement('span');
        spanElem.classList.add(classes.listYearsContainer);
        spanElem.innerHTML = i;
        liElem.appendChild(spanElem);
        listYearsElem.appendChild(liElem);
        continue;
      }

      const buttonElem = document.createElement('button');
      buttonElem.classList.add('button', classes.listYearsControl);
      buttonElem.innerHTML = i;
      buttonElem.dataset.year = i;
      buttonElem.type = 'button';
      liElem.appendChild(buttonElem);
      listYearsElem.appendChild(liElem);

      lists['years-nav'].push(buttonElem);

      buttonElem.addEventListener('click',() => {
        removeClasses({
          list: lists['groups-nav'],
          className: classes.navGroupControlActive
        });

        removeClasses({
          list: lists['years-nav'],
          className: classes.listYearsControlActive
        });

        addClasses({
          list: lists['by-date'],
          className: classes.dataItemDisabled
        });

        const itemsToSelect = lists['by-date'].filter(item => {
          const year = +item.dataset.year;
          return year <= i;
        });

        removeClasses({
          list: itemsToSelect,
          className: classes.dataItemDisabled
        });

        const yearsToSelect = lists['years-nav'].filter(item => {
          const year = +item.dataset.year;
          return year <= i;
        });

        addClasses({
          list: yearsToSelect,
          className: classes.listYearsControlActive
        });
      });
    }
  }

  //----------------------------------------

  function addDataWidget({widgetData, widgetName, widgetId, sectionElem, listId}) {
    const widgetElem = dataWidgetTmpl.content.cloneNode(true);
    const listYearsElem = widgetElem.querySelector('.list-years');
    const listDataElem = widgetElem.querySelector('.list-data');
    fillYears({listYearsElem, listId});

    if(widgetName) {
      const titleElem = document.createElement('h3');
      titleElem.classList.add('data-widget__title');
      titleElem.innerHTML = widgetName;
      listYearsElem.parentNode.insertBefore(titleElem, listYearsElem);

      // Need to add it to wodgetElem but it doesn't work
      titleElem.parentNode.id = widgetId;
    }

    fillList({
      widgetData,
      listDataElem,
      listId
    });

    const widgetAdded = sectionElem.appendChild(widgetElem);
  }

  //----------------------------------------

  function fillListByDate({data, listId}) {
    addDataWidget({
      widgetData: data,
      sectionElem: sectionByDate,
      listId
    });
  }

  //----------------------------------------

  function fillListByGroup({data}) {
    const groups = getGroupsList(data);

    groups.forEach(item => {
      addDataWidget({
        widgetId: item.id,
        widgetName: item.name,
        widgetData: item.data,
        sectionElem: sectionByGroup
      });
    });
  }

  //----------------------------------------

  function fillList({widgetData, listDataElem, listId}) {
    if(!lists[listId]) {
      lists[listId] = [];
    }

    widgetData.forEach((item, index) => {
      const yearEnd = item.years.end || years.end;
      const liElem = document.createElement('li');
      const liElemClasses = [
        classes.dataItem,
        `${classes.dataItem}--type-${item.group}`,
        `${classes.dataItem}--lehgth-${yearEnd - item.years.start + 1}`
      ];
      liElem.classList.add(...liElemClasses);

      const contentElem = document.createElement('div');
      contentElem.classList.add(
        classes.dataContent
      );
      liElem.dataset.year = item.years.start;
      const liElemTitle = document.createElement('h3');
      liElemTitle.classList.add(classes.dataItemTitle);
      const itemYears = item.years ? item.years.start : '';

      liElemTitle.innerHTML = `${item.name} ${itemYears}`;

      const itemLinksList = getItemLinksList(item.links);

      const groupElem = document.createElement('span');
      groupElem.classList.add(classes.dataItemGroupName);
      groupElem.innerHTML = groupsData[item.group].name;

      contentElem.appendChild(liElemTitle);
      contentElem.appendChild(itemLinksList);
      contentElem.appendChild(groupElem);

      liElem.appendChild(contentElem);

      listDataElem.appendChild(liElem);

      listDataElem.style.setProperty('--rows', widgetData.length);

      if(item.years) {
        let colEnd = cols + 1;

        liElem.style.setProperty('--col-start', item.years.start - years.start + 1);

        if(item.years.end) {
          colEnd = item.years.end - years.start + 2;
        }

        liElem.style.setProperty('--col-end', colEnd);
      }

      liElem.style.setProperty('--row-start', index + 1);

      lists[listId].push(liElem);
    });
  }

  //----------------------------------------

  function getGroupsList(data) {
    const groups = data.reduce((prev, item) => {
      if(!prev[item.group]) {
        prev[item.group] = {
          id: item.group,
          name: groupsData[item.group].name,
          data: []
        };
      }

      prev[item.group].data.push(item);

      return prev;
    }, {});

    const groupsList = Object.values(groups);
    groupsList.sort(sortByName);

    return groupsList;
  }

  //----------------------------------------

  function getItemLinksList(linksList){
    const listElem = document.createElement('ul');
    listElem.classList.add('list-links');

    linksList.forEach(item => {
      const liElem = document.createElement('li');
      liElem.classList.add('list-links__item');
      const linkElem = document.createElement('a');
      linkElem.href = item.url;
      linkElem.innerHTML = item.name;

      liElem.appendChild(linkElem);
      listElem.appendChild(liElem);
    });

    return listElem;
  }
  //----------------------------------------

  function addSectionNavActions(){
    const navControls = document.querySelectorAll(`.${classes.navControl}`);

    currentControl = navControls[0];
    currentControl.classList.add(classes.navControlCurrent);

    navControls.forEach(item => {
      const targetClass = item.dataset.target;
      const sections = document.querySelectorAll('.section');
      sections[1].classList.add(classes.sectionHidden);

      item.addEventListener('click', () => {
        currentControl.classList.remove(classes.navControlCurrent);
        currentControl = item;
        currentControl.classList.add(classes.navControlCurrent);

        sections.forEach(section => {
          if (section.classList.contains(targetClass)) {
            section.classList.remove(classes.sectionHidden);
          }
          else {
            section.classList.add(classes.sectionHidden);
          }
        })
      })
    })
  }

  //----------------------------------------

  function addClasses({list, className}) {
    list.forEach(item => {
      item.classList.add(className);
    })
  }

  //----------------------------------------

  function removeClasses({list, className}) {
    list.forEach(item => {
      item.classList.remove(className);
    })
  }

  //----------------------------------------

  function toggleClasses({list, className, force}) {
    list.forEach(item => {
      item.classList.toggle(className, force);
    })
  }

  //----------------------------------------

  function fillNavGroup(navGroup) {
    const map = new Map(Object.entries(groupsData));

    const extendedMap = new Map(map);
    extendedMap.set('select-all', {
      name: 'Select all'
    });
    extendedMap.set('unselect-all', {
      name: 'Unselect all'
    });

    extendedMap.forEach((val, key, index) => {
      const controlElem = createControl({val, key});
      let isDisabled = false;

      controlElem.addEventListener('click', () => {
        if(map.has(key)) {
          controlElem.classList.toggle(classes.navGroupControlActive);

          const itemsToToggle = lists['by-date'].filter(item => {
            return item.classList.contains(`${classes.dataItem}--type-${key}`);
          });
          const isActive = controlElem.classList.contains(classes.navGroupControlActive);

          toggleClasses({
            list: itemsToToggle,
            className: classes.dataItemDisabled,
            force: !isActive
          });
        }
        else if (key === 'select-all') {
          addClasses({
            list: lists['groups-nav'],
            className: classes.navGroupControlActive
          });
          removeClasses({
            list: lists['by-date'],
            className: classes.dataItemDisabled
          });
        }
        else if (key === 'unselect-all') {
          removeClasses({
            list: lists['groups-nav'],
            className: classes.navGroupControlActive
          });
          addClasses({
            list: lists['by-date'],
            className: classes.dataItemDisabled
          });
        }
      })

      navGroup.appendChild(controlElem);

      if (key !== 'select-all' && key !== 'unselect-all') {
        lists['groups-nav'].push(controlElem);
      }
    });
  }

  //----------------------------------------

  function createControl({val, key}) {
    const controlElem = document.createElement('button');
    controlElem.dataset.target = key;
    const controlClasses = [
      classes.navGroupControl,
      `${classes.navGroupControl}--type-${key}`,
      'button',
    ];

    if(key !== 'select-all' && key !== 'unselect-all') {
      controlClasses.push(classes.navGroupControlActive);
    }

    controlElem.classList.add(...controlClasses);
    controlElem.innerHTML = val.name;
    controlElem.type = 'button';

    return controlElem;
  }

  //----------------------------------------

})();
