const outerFunction = function () {
  console.log("This is the outer function");
  const innerFunction = function () {
    console.log("This is the inner function");
  };

  return innerFunction;
};

const innerFunction = outerFunction(); // This is the outer function
innerFunction(); // this is the inner function
// execute two functions at once
outerFunction()();
