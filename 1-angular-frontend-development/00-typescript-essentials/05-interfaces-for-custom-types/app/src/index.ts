interface IPerson {
  firstName: string;
  lastName: string;
  age: number;
  ssn?: string;
}

class Person {
  constructor(public config: IPerson) {}
}

const aPerson: IPerson = {
  firstName: 'Jason',
  lastName: 'Isaacs',
  age: 55
};

const p = new Person(aPerson);
console.log(`Last name: ${ p.config.lastName }`);

// This also works
const idris = {
  firstName: 'Idris',
  lastName: 'Elba',
  age: 48
};

const idrisAsPerson = new Person(idris);
console.log(`Last name: ${ idrisAsPerson.config.lastName }`);
