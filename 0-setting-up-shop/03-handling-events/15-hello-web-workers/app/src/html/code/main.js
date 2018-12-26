'use strict';
const m = 3;
const n = 9;
const mPlaceholder = document.querySelector('#m');
mPlaceholder.textContent = m.toString();
const nPlaceholder = document.querySelector('#n');
nPlaceholder.textContent = n.toString();

const start = new Date();
console.log(`starting @ ${ start.toISOString() }`);
const ackermannWorker = new Worker('code/ackermann-worker.js');
ackermannWorker.addEventListener('message', event => {
  const result = event.data;
  const end = new Date();
  console.log(`finished: execution took ${ end - start } ms`);

  const resultPlaceholder = document.querySelector('#result');
  resultPlaceholder.textContent = `${ result.toString() } (execution took ${ (end - start).toString() } ms)`;
});

ackermannWorker.postMessage({m, n});