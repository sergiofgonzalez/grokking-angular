class MyClass {
  readonly name = 'Jason Isaacs';

  greet() {
    console.log(`Hello to ${ this.name }`);
  }

  changeName(name) {
    // this.name = name; // cannot assign because it's a readonly property
  }
}

const myObj = new MyClass();
myObj.greet();
console.log(`Hello,  ${ myObj.name }`);

// myObj.name = 'Idris Elba'; // same err: cannot assign because it's a readonly property

