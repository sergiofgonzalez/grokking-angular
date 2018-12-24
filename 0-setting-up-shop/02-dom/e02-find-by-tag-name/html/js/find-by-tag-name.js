'use strict';

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

function findByTagName(tag) {
  function accumulateFoundTags(node, lowerCaseTag) {
    if (node.nodeName.toLowerCase() === lowerCaseTag) {
      nodes.push(node);
    }
    for (const child of [...node.childNodes]) {
      accumulateFoundTags(child, lowerCaseTag);
    }
  }

  const nodes = [];
  const lowerCaseTag = tag.toLowerCase();
  accumulateFoundTags(document, lowerCaseTag);

  return nodes;
}

const foundTags = findByTagName('span');

const resultsContainer = document.querySelector('#results');
resultsContainer.appendChild(elt('p', foundTags.length.toString()));


console.log(`found: ${ foundTags.length }`);
console.log(`document: ${ document }`);