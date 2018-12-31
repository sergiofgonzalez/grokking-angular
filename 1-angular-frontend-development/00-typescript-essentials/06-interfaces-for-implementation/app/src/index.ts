interface IPayable {
  increasePay(percent: number): boolean;
}

class Person {
  constructor(public firstName: string, public lastName: string, age: number) {}
}

class Employee extends Person implements IPayable {

  constructor(firstName: string, lastName: string, age: number, public salary: number) {
    super(firstName, lastName, age);
    this.salary = salary;
  }

  public increasePay(percent: number): boolean {
    console.log(`Increasing salary by ${ percent }`);
    this.salary += this.salary * (percent / 100);
    return true;
  }
}

class Contractor extends Person implements IPayable {
  public increasePay(percent: number): boolean {
    console.log(`Increasing hourly rate for contractor by ${ percent }`);
    return true;
  }
}

const workers: IPayable[] = [];
workers[0] = new Employee('first', 'last', 45, 50000);
workers[1] = new Contractor('cFirst', 'cLast', 32);

workers.forEach(worker => worker.increasePay(10));
