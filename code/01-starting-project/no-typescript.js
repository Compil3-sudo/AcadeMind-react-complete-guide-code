function add(a, b) {
  // this could lead to undesired results
  // if a and b are strings
  // javascript can not force a type for these parameters
  return a + b;
}

const result = add(2, 5);

console.log(result);
