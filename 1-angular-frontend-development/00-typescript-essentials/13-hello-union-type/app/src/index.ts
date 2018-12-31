function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
}

console.log(padLeft('Hello, world!', 5));
console.log(padLeft('Hello, world!', 'Jason says: '));
// console.log(padLeft('Hello, world!', true)); // compilation time error: 'true' is not assignable to 'string | number'
