interface IComparable<T> {
  compareTo(value: T): number;
}

class Rectangle implements IComparable<Rectangle> {

  constructor(private width: number, private height: number) {}

  compareTo(that: Rectangle): number {
    if (this.width * this.height >= that.width * that.height) {
      return 1;
    } else {
      return -1;
    }
  }
}

const rect1: Rectangle = new Rectangle(2, 5);
const rect2: Rectangle = new Rectangle(2, 3);

rect1.compareTo(rect2) === 1 ? console.log(`rect1 is bigger`) : console.log(`rect2 is bigger`);

class Employee implements IComparable<Employee> {

  constructor(public name: string, public salary: number) {}

  compareTo(that: Employee): number {
    if (this.salary < that.salary) {
      return 1;
    } else {
      return -1;
    }
  }
}

const employee1 = new Employee('employee1', 21000);
const employee2 = new Employee('employee2', 55000);

employee1.compareTo(employee2) === 1 ? console.log(`employee1 is richer`) : console.log(`employee1 is poorer`);
