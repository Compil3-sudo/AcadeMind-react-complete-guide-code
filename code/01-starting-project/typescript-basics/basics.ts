// Primitives: number, string, boolean
// more complex types: arrays, objects
// function types, parameters

// Primitives:

let age: number;

age = 12;

let num: number = 12.2;

let userName: string = "Test";
let isInstructor: boolean = true;

// More complex types:

// any type[] := array
let hobbies: string[];

hobbies = ["Sports", "Cooking"]; // can't hold numbers

// this is basically standard javascript, do NOT use
let person; // default type is "any"

person = {
  name: "Test",
  age: 32,
};

let personn: {}; // this is actually a type assignment
// assigned as "Object" type

// so you can not add type of boolean or whatever to this
let realPerson: {
  name: string;
  age: number;
};

// realPerson = {
//   isEmployee: true,
// };

// this means people will be an array of people
// who have a name and age
let people: {
  name: string;
  age: number;
}[];

// Type inference
// not needed to specify type, you can just assign initial value
let course = "React guide";

// even though the type was not explicitely assigned
// typescript automatically assigned it as a string
// because of type inference
// course = 1234; // does NOT work

// UNION TYPE - allows more than 1 type.
let course2: string | number = "React";
course2 = 1234; // this could be the ID of the course "React"

// TYPE ALIAS - avoid repeating types.
// so repeating types like this is not needed

// let realPerson: {
//   name: string;
//   age: number;
// };
// let people: {
//   name: string;
//   age: number;
// }[];

type Person = {
  name: string;
  age: number;
};

let human: Person;
let humans: Person[];

// Functions & types
// function name(param: type): returnType
function add(a: number, b: number) {
  return a + b; // the type of this return is inferred to number
}

// this  is not necesarry, because the type is already inferred here
function withReturnType(a: number, b: number): number {
  return a + b;
}

// this has a special return type, called "void"
// this is basically undefined
// because it only does something
function my_print(value: any) {
  console.log(value);
}

// Generics: <T> allows type inference

// function insertAtBeginning(array: any[], value: any) {
//   const newArray = [value, ...array];
//   return newArray;
// }

// const demoArray = [1, 2, 3];
// const updatedArray = insertAtBeginning(demoArray, -1);
// the problem is that this function has array of type any
// so it doesn't know that they should be number

// SOLUTION:

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1);

// with the "<T>" => typescript knows that the array and value
// have to be the same type
// updatedArray[0].split('')

// so you can't mix types in the array
