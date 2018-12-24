'use strict';

const MOUNTAINS = [
  {name: 'Kilimanjaro', height: 5895, place: 'Tanzania'},
  {name: 'Everest', height: 8848, place: 'Nepal'},
  {name: 'Mount Fuji', height: 3776, place: 'Japan'},
  {name: 'Vaalserberg', height: 323, place: 'Netherlands'},
  {name: 'Denali', height: 6168, place: 'United States'},
  {name: 'Popocatepetl', height: 5465, place: 'Mexico'},
  {name: 'Mont Blanc', height: 4808, place: 'Italy/France'}
];

function elt(type, ...children) {
  const node = document.createElement(type);
  for (let child of children) {
    if (typeof child !== 'string') {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(child));
    }
  }
  return node;
}


function createHeaderRow(dataElements) {
  const headerFields = Object.getOwnPropertyNames(dataElements[0]);
  const tr = elt('tr');
  for (const headerField of headerFields) {
    const th = elt('th', headerField);
    tr.appendChild(th);
  }
  return tr;
}

function createDataRows(dataElements) {
  function createDataRow(row) {
    const tr = elt('tr');
    for (const property of Object.values(row)) {
      const td = elt('td', typeof property === 'string' ? property : property.toString());
      tr.appendChild(td);
    }
    return tr;
  }

  const trs = [];
  for (const dataRow of dataElements) {
    const tr = createDataRow(dataRow);
    trs.push(tr);
  }

  return trs;
}

const table = elt('table', createHeaderRow(MOUNTAINS), ...createDataRows(MOUNTAINS));

const tableDiv = document.querySelector('#table');
tableDiv.appendChild(table);

