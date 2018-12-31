/* Long definition */
// class Person {
//   public firstName: string;
//   public lastName: string;
//   public age: number;
//   private _ssn: string;

//   constructor(firstName: string, lastName: string, age: number, ssn: string) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this._ssn = ssn;
//   }
// }

/* succinct */
class Person {
  public static sayHello(name: string): void {
    console.log(`Hello to ${ name }`);
  }

  constructor(public firstName: string, public lastName: string, public age: number, private _ssn: string) {
  }

  public show(): void {
    console.log(`lastName=${ this.lastName } (SSN: ${ this._ssn })`);
  }
}

Person.sayHello('Jason');

const p = new Person('Jason', 'Isaacs', 55, '123-45-6789');
p.show();

// console.log(`Last name: ${ p.lastName } SSN: ${ p._ssn }`); // Err: _ssn is private and only accesible within class

class Employee extends Person {
  public department: string;

  constructor(firstName: string, lastName: string, age: number, _ssn: string, department: string) {
    super(firstName, lastName, age, _ssn);
    this.department = department;
  }
}
