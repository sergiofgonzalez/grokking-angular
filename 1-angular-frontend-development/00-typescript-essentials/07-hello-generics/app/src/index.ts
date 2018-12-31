class Person {
  public name: string;
}

class Employee extends Person {
  public department: number;
}

class Animal {
  public breed: string;
}

const workers: Array<Person> =  [];

workers[0] = new Person();
workers[1] = new Employee();
// workers[2] = new Animal(); // -> can't compile!
