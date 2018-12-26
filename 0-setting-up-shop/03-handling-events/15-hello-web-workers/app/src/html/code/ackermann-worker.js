'use strict';

addEventListener('message', event => {
  const {m, n} = event.data;
  console.log(`Ackermann worker started for m=${ m }, n=${ n }`);
  postMessage(ackermann(m, n));
});

function ackermann(m, n) {
  if (m === 0) {
    return n + 1;
  } else if (m > 0 && n === 0) {
    return ackermann(m - 1, 1);
  } else if (m > 0 && n > 0) {
    return ackermann(m - 1, ackermann(m, n - 1));
  } else {
    console.log(`Unexpected!`);
  }
}