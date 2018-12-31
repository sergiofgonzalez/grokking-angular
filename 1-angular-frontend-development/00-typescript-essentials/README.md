# Grokking Angular: Frontend Development with Angular: TypeScript Essentials   
> First steps into TypeScript

---
+ Introducing *TypeScript* programming language
+ Installing and using `tsc` &mdash; the TypeScript compiler
+ A simple project structure to bootstrap your vanilla *TypeScript* projects
+ Basic Types
+ Functions
+ Classes
+ Interfaces: typical uses cases
+ Generics
+ The `readonly` modifier: TypeScript immutable objects
+ Intro to TypeScript *decorators*
+ The *union type*
+ Using Type Definition Files
---


## Intro
*TypeScript* is an open-source programming language developed in 2012 by Microsoft. This language can be turned into JavaScript so that it can be executed by any web browser or standalone JavaScript engine.

TypeScript is pure object oriented, with classes, interfaces, and module statements just like Java. TypeScript suppors static typing.

The language reference site is http://www.typescriptlang.org/ and the documentation can be found in http://www.typescriptlang.org/docs/home.html.

The proces of turning TypeScript into JavaScript is known as *transpiling*. Thanks to the static typing TypeScript support, the compilation process will be able to catch errors early during development.

The first feature that will caught yout eye is that in *TypeScript* variables have a type:

```typescript
let foo: string;
```

Using a statically typed language simplifies the development of web application. With a good set of tools and a static type analyzer, the number or runtime errors and consequently the time to market will shorten.

TypeScript is a *superset* of JavaScript: any JavaScript file whose extension is changed from `*.js` to `*.ts` will become a valid TypeScript program.

## Installing and using the TypeScript compiler
The *TypeScript compiler* can be installed using *NPM*, the Node Package Manager.

```bash
$ npm install -g tsc
+ tsc@1.20150623.0
added 1 package from 1 contributor in 1.69s

$ tsc --version
message TS6029: Version 1.5.3
```

Any given file can be transpiled using `tsc`. It is also possible to generate *source map files* that map lines in the TypeScript program to the corresponding lines in the generated JavaScript so that you can set breakpoints and debug more comfortably when running in the browser.

```bash
# transpiles and generates source map
$ tsc --sourcemap main.ts
```

You can also force a particular *ESx* language compatibility using `--t`:
```bash
$ tsc --t ES5 main.ts
```

The `-w` argument can be used to *watch* all the files in the current directory, so that files are automatically transpiled when changed:

```bash
$ tsc -w *.ts
```

The TypeScript compiler allows you to configure a `tsconfig.json` file in the project directory and `tsc` will read that information and apply it to the compilation process:

```json
{
  "compilerOptions": {
    "baseUrl": "src",               // -> transpile .ts files located in this directory
    "outDir": "./dist",             // -> save the generated .js files in this directory
    "sourceMap": true,              // -> generate source maps
    "moduleResolution": "node",     // -> looks for modules following Node.js rules
    "noEmitOnError": true,          // -> do not emit outputs if any type-checking errors were reported
    "target": "es5",                // -> use ES5 language specs for the resulting files
    "experimentalDecorators": true  // -> required to support decorators
  },
  "exclude": ["node_modules"]     // -> exclude the given directories from compilation
}
```

TypeScript apps use *decorators* with classes and class members (e.g. @Component(), @Input). 

## Hello, TypeScript: Bootstrapping TypeScript Development
See the details and an example in [01 &mdash; Hello, TypeScript](./01-hello.typescript).

## Basic Types

Specifying a variable type when declaring variables is optional in TypeScript. If you use types, TypeScript's transpiler will be able to detect mismatches.

```typescript
const name: string = 'Jason Isaacs';
const age: number = 45;
const isAlive: boolean = true;
```

In all of the previous examples, giving a type to the constant is unnecessary, as it can be inferred from the literal value assigned to it. Thus, it can be written as:
```typescript
const name = 'Jason Isaacs';
const age = 45;
const isAlive = true;
```

and TypeScript will still do the type checking.

There are four keywords for declaring basic types:
+ `number`
+ `boolean`
+ `string`
+ `void` (indicates absence of a return value in a function declaration)
+ `any` (all previous types are subtypes of `any`)

Variables can be assigned values of type `null` or `undefined` just as in JavaScript.

TypeScript allows some other types that are used in interactions with the browser, such as `HTMLElement` and `Document`. Also, if you define a *class* or an *interface*, it can be used as a custom type in variable declarations.

See [02 &mdash; Basic Types](./02-basic-types) for an example.

## Functions
TypeScript functions are pretty much like JavaScript ones, but you have to explicitly declare parameter types and return values.

```typescript
function betterCalcTax(state: string, income: number, dependents: number): number {
  if (state === 'NY') {
    return income * 0.06 - dependents * 500;
  } else {
    return income * 0.05 - dependents * 300;
  }
}
```

You can also use default parameter values just as in *ES6*:

```typescript
function calcTax(income: number, dependents: number, state: string = 'NY'): number {
  if (state === 'NY') {
    return income * 0.06 - dependents * 500;
  } else if (state === 'NJ') {
    return income * 0.05 - dependents * 300;
  }
}
```

In TypeScript, function parameters can be marked as optional by appending a `?` to the parameter name. Those parameters must come at the end of the function declaration:

```typescript
function calcTax(income: number, state = 'NY', dependents?: number): number {
...
}
```

JavaScript does not support function overloading. TypeScript supports it, but the mechanism is not very elegant, as you're forced to declare the various signatures of the function and just one body that checks what was the actual signature that was used

```typescript
function attr(name: string): string;
function attr(name: string, value: string): void;
function attr(map: any): void;
function attr(nameOrMap: any, value?: string): any {
  if (nameOrMap && typeof nameOrMap === 'string') {
    ...
  } else {
    ...
  }
  ...
}
```

See [03 &mdash; Hello, Functions!](./03-hello-functions) for an example.

## Classes
TypeScript supports declaring classes and instantiate them with the `new` keyword, pretty much like JavaScript does. A class can include a constructor, fields (properties), and methods.

```typescript
class Person {
  public firstName: string;
  public lastName: string;
  public age: number;
  private _ssn: string;

  constructor(firstName: string, lastName: string, age: number, ssn: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this._ssn = ssn;
  }
}
```

TypeScript supports `public`, `protected` and `private` keyword to help you control access to object members. By default, all class members are `public` and therefore visible from outside the class. The members tagged as `private` will only be visible within the class, and `protected` will be visible only in the same class and subclasses.


The class definition can be greatly simplified by declaring the properties in the constructor:

```typescript
class Person {
  constructor(public firstname: string, public lastName: string, public age: number, private _ssn: string) {    
  }
}
```

Methods in a class follow the same syntax as in modern JavaScript:

```typescript
class MyClass {
  doSomething(howManyTimes: number): void {
    ...
  }

  static doSomeOtherThing(arg: string): void {
    ...
  }
}

MyClass.doSomeOtherThing('hello');
const myClass = new MyClass();
mc.doSomething(5);
```

It is also similar with respect to inheritance: the syntax follows the same syntax as in *ES6*.

```typescript
class Employee extends Person {
  department: string;

  constructor(firstName: string, lastName: string, age: number, _ssn: string, department: string) {
    super(firstName, lastName, age, _ssn);
    this.department = department;
  }
}
```

See [04 &mdash; Hello, Classes!](./04-hello-classes) for an example.

## Interfaces
JavaScript does not support interfaces &mdash; used in other object oriented languages to introduce a code contract that an API has to abide to.

Conversely, TypeScript includes the keywords `interface` and `implements` to support interfaces, but those concepts aren't transpiled into JavaScript code, those are just used during the compilation process to detect mistakes.

Interfaces in TypeScript are used for the following use cases:
+ Declare an interface that defines a custom type containing a number of properties. Then declare a method that has an argument of such a type. The compiler will check that the object given includes all the properties declared in the interface.
+ Declare an interface that includes *abstract* methods. When a class declares that it implements this interface, the class must provide an implementation of those abstract methods.

### Use Case 1: Declaring custom types with interfaces
The following example shows how to:
+ declare an interface for a custom type
+ declare a class that takes that custom type in the constructor specification
+ instantiates a literal with members compatible with the interface
+ instantiates an instance of the class using the previous literal

```typescript
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
```

Note that TypeScript will also allow you to do:
```typescript
const idris = {
  firstName: 'Idris',
  lastName: 'Elba',
  age: 48
};

const idrisAsPerson = new Person(idris);
console.log(`Last name: ${ idrisAsPerson.config.lastName }`);
```

That is, as long as the *object literal* used in the constructor invocation is compatible with the interface, the call will succeed.

See [05 &mdash; Interfaces for Custom Types](./05-interfaces-for-custom-types) for an example.

### Use case 2: Implementing interfaces
The `implements` keyword is used in a class declaration to announce that the class will implement a particular interface:

```typescript
interface IPayable {
  increaseCap: number;

  increasePay(percent: number): boolean
}

class Employee implements IPayable {
  // The implementation goes here
}
```

*Programming to interfaces* instead of to *actual implementations* is as recommended as in other object oriented languages. In particular, it lets you create collections of instances of the interfaces:

```typescript
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
```

See [06 &mdash; Interfaces for Implementation](./06-interfaces-for-implementation) for an example.

## Generics
TypeScript supports parameterized types (aka generics). This feature can be used to create a function that is programmed to take values of any type, but during the invocation that type can be set of a concrete type.

```typescript
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
// workers[2] = new Animal(); // -> Property 'name' is missing in type 'Animal'
```

Note that the last line does not compile (as expected), but the error is confusing &mdash; instead of reporting trying to place in the array an instance of the incorrect type, it is complaining that `Animal` lacks a `name` property.

This happens because TypeScript uses a *structural type system*. This means that as long as the types are compatible it will work, even in the actual concrete type is different (i.e. you'd be able to place an intance of `Animal` in the array if it would have a `name` property).

In order to use *generics*, the implementor of the class or function has to allow for it, by specifying the generic type:

```typescript
interface Array<T> {
  ...
  push(...items: T[]): number;
  pop(): T
  ...  
}
```

See [07 &mdash; Hello, Generics](./07-hello-generics) and [08 &mdash; Hello, Generic Comparator](./08-hello-generic-comparator) as examples.

## The `readonly` modifier
TypeScript introduces the `readonly` qualifier that can be applied to class properties, in the same way that `const` can be applied to regular variables in JavaScript:

```typescript
class Person {
  readonly name = 'Mary';
}
```

The class properties tagged as `readonly` can only be initialized during declaration, or in the class constructor. Trying to modify a `readonly` property will result in an error.

Another interesting use case for the `readonly` qualifier is the creation of *immutable* objects.

```typescript
class Person {
  readonly bestFriend: { name: string } = { name: 'Idris'};

  changeFriend() {
    // this.bestFriend = { name: 'Jason' }; // Err: cannot assign to readonly property
  }

  changeFriendName() {
    this.bestFriend.name = 'Jason'; // OK: object ref stays the same, the value has changed though
  }
}

class ImmutablePerson {
  readonly bestFriend: { readonly name: string } = { name: 'Jason' };

  changeFriend() {
    // this.bestFriend = { name: 'Jason' }; // Err: cannot assign to readonly property
  }

  changeFriendName() {
    // this.bestFriend.name = 'Jason'; // Err: neither the object, nor its internal state can be changed
  }
}
```

See [09 &mdash; Hello, `readonly`](./09-hello-readonly) for an example.

This becomes especially important in frameworks, as you would want to store the application state in an immutable object, and enforce the creation of a new instance whenever the properties are changed.

When an object has multiple properties, you can use the *read-only mapped type* instead as seen in the following example.

```typescript
type Friend = Readonly<{ name: string, lastName: string }>;

class Person {
  readonly bestFriend: Friend = { name: 'Jason', lastName: 'Isaacs' };

  changeFriend() {
    // this.bestFriend = { name: 'Idris', lastName: 'Elba' }; // Err: cannot assign because it is a read-only property
  }

  changeFriendName() {
    // this.bestFriend.name = 'Idris';    // Err: cannot assign to readonly property
    // this.bestFriend.lastName = 'Elba'; // Err: cannot assign to readonly property
  }
}
```

The line `type Friend = ...` defines a new type. This is also known as a *type alias*, as it creates a new name for a type.

See [10 &mdash; Hello, immutable objects](./10-hello-readonly-immutable-objects) and [11 &mdash; Hello, read-only mapped type](./11-hello-readonly-mapped-type) for examples.

## Decorators
TypeScript decorators are special functions that add metadata enhancing functionality of a class, property, method or parameter. TypeScript decorators start with a `@` sign.

In order to transpile them, you have to enable them in the `tsconfig.json`:

```json
...
  "experimentalDecorators": true,
...    
```

The following code sample creates  decorator that will print information about the class it is attached to.

```typescript
function UIComponent(html: string) {
  console.log(`The decorator received ${ html }`);
  return (target) => {
    console.log(`Creating UI component from \n ${ target }`);
  };
}

@UIComponent('<h1>Hello, Shopper!</h1>')
class Shopper {
  constructor(private name: string) {}
}
```

The `UIComponent()` function receives one string parameter and returns another function that prints the contents of the implicit variable target, which is the element the decorator is attached to.

If we run it, it will print:
```bash
$ npm start
The decorator received <h1>Hello, Shopper!</h1>
Creating UI component from
 class Shopper {
    constructor(name) {
        this.name = name;
    }
}
```

So the decorator has access to the argument and to the class it is attached to.

Under the hood, TypeScript uses the `reflect-metadata` library to query the structure of the artifact the decorator is attached to. 

This technique is extensively used in TypeScript frameworks such as *Angular* to turn classes into Angular components using `@Component`, or class variables into component properties that can receive values such as `@Input()`:

```typescript
// This is Angular
@Component({
  selector: 'order-processor',
  template: `
    Buying {{quantity}} shares}
  `
})
export class OrderComponent {
  @Input() quantity: number;
}
```

See [12 &mdash; Creating Decorators](./12-creating-decorators) for an example.

## The Union Type
TypeScript allows you to declare new types based on two or more existing types:

```typescript
let padding: string | number;
```

This type definition have some advantages over the use of `any` as the compiler will be able to pick type errors early:

```typescript
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
console.log(padLeft('Hello, world!', true)); // compilation time error!
```

See [13 &mdash; Hello, Union Type](./13-hello-union-type) for an example.

## Using Type Definition Files
The purpose of *type definition files* is to describe an API of a JavaScript library so that you know what types are expected and editors and IDE can provide powerful autocomplete capabilities.

In 2016, Microsoft created an organization *@types* at npmjs.org which now has more than 5000 type definition files for various JavaScript libraries.

The suffix for any type definition filename is `d.ts` and these definition files can be installed using `npm`:

```bash
npm install --save-dev @types/lodash
```

Some other frameworks, such as *Angular* come with the definition files already packaged &mdash; when installing Angular, the definition files will be automatically downloaded into the `node_modules/@angular` folder along with the framework itself.

In order to explicitly tell the TypeScript compiler to use the type definition files located in the `node_modules/@types` directory, you have to include them in the `tsconfig.json`:

```typescript
{
  "compilerOptions": {
 ...
    "types": ["es6-shim", "jasmine"]
  },
  "exclude": ["node_modules"],
}
```

---
## You know you've mastered this section when...

+ You know how to configure your editor to use TypeScript.
+ You know how to use an *NPM* based template to write, run and debug *vanilla* TypeScript projects.
+ You're comfortable making modifications to `tsconfig.json` and `tslint.json`.
+ You're comfortable using the basic type definitions in variables, function arguments, arrays and class members.
+ You know how to properly define TypeScript functions
+ You know how to use TypeScript classes: visibility modifiers, constructors, inheritance...
+ You understand the concept of a TypeScript interface, and understand the common use cases: declaring custom types and providing method-based contracts.
+ You're aware that TypeScript supports *generics* and understand that they're based in structure rather than actual types.
+ You understand the use of the `readonly` modifier for class members and understand how it can be used to create immutable objects in TypeScript.
+ You understand the *decorators* basic concepts.
+ You're comfortable with the concept of *union types* and understand its advantages over the `any` type.
+ You're aware of the concept of the *type definition files*.
---

## Code Samples

### [01 &mdash; Hello, TypeScript](./01-hello.typescript)
Simplest TypeScript program illustrating the project structure and basic config for TypeScript development.

### [02 &mdash; Basic Types](./02-basic-types)
Illustrates the simplest concepts on TypeScript types.

### [03 &mdash; Hello, Functions!](./03-hello-functions)
Illustrates some basic concepts about TypeScript functions.

### [04 &mdash; Hello, Classes!](./04-hello-classes)
Illustrates some basic concepts about TypeScript classes.

### [05 &mdash; Interfaces for Custom Types](./05-interfaces-for-custom-types)
Introduces how to use TypeScript interfaces for defining custom types.

### [06 &mdash; Interfaces for Implementation](./06-interfaces-for-implementation)
Introduces how to use TypeScript interfaces for defining implementation contracts for classes.

### [07 &mdash; Hello, Generics](./07-hello-generics)
Illustrates basic concepts of TypeScript generics.

### [08 &mdash; Hello, Generic Comparator](./08-hello-generic-comparator)
Illustrates how to create a generic comparator in TypeScript.

### [09 &mdash; Hello, `readonly`](./09-hello-readonly)
Illustrates the basics of the `readonly` modifier.

### [10 &mdash; Hello, immutable objects](./10-hello-readonly-immutable-objects)
Illustrates using the `readonly` modifier to create immutable objects.

### [11 &mdash; Hello, read-only mapped type](./11-hello-readonly-mapped-type)
Illustrates how to use the *read-only mapped type* for objects with many properties that must be tagged as `readonly`.

### [12 &mdash; Creating Decorators](./12-creating-decorators)
Illustrates how to create a TypeScript decorator.

### [13 &mdash; Hello, Union Type](./13-hello-union-type)
Illustrates union types and its advantages.