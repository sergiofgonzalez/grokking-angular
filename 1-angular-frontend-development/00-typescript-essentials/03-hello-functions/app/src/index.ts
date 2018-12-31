
// Note that there is no need to include parameter types if you don't want to
// but type errors will occur just as in JavaScript
function calcTax(state, income, dependents) {
  if (state === 'NY') {
    return income * 0.06 - dependents * 500;
  } else if (state === 'NJ') {
    return income * 0.05 - dependents * 300;
  }
}

// Correct invocation
let tax = calcTax('NJ', 50000, 2);
console.log(`tax=${ tax }`);

// Incorrect invocation
tax = calcTax('NJ', 50000, 'two');
console.log(`tax=${ tax }`); // -> NaN but compiles and executes

function betterCalcTax(state: string, income: number, dependents: number): number {
  if (state === 'NY') {
    return income * 0.06 - dependents * 500;
  } else if (state === 'NJ') {
    return income * 0.05 - dependents * 300;
  }
}

// Correct invocation
tax = betterCalcTax('NJ', 50000, 2);
console.log(`tax=${ tax }`);

// Incorrect invocation
// tax = betterCalcTax('NJ', 50000, 'two'); // Compilation error: 'two' is unassignable to a number

// const result: string = betterCalcTax('NJ', 50000, 3); // Compilation error: number unassignable to string

function evenBetterCalcTax(income: number, dependents: number, state: string = 'NY'): number {
  if (state === 'NY') {
    return income * 0.06 - dependents * 500;
  } else if (state === 'NJ') {
    return income * 0.05 - dependents * 300;
  }
}

tax = evenBetterCalcTax(50000, 3);
console.log(`tax=${ tax }`);

// using optional params
function someOtherCalcTax(income: number, state: string = 'NY', dependents?: number): number {
  let deduction = 0;
  if (dependents) {
    deduction = dependents * 500;
  }

  if (state === 'NY') {
    return income * 0.06 - deduction;
  } else if (state === 'NJ') {
    return income * 0.05 - deduction;
  }
}

tax = someOtherCalcTax(50000);
console.log(`tax=${ tax }`);
