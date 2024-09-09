const setTimeoutPromise = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(time);
      resolve(time);
    }, time);
  });
};

console.log("Before setTimeoutPromise");
//setTimeoutPromise(1000).then((a, b) => console.log(`after one second!!! ${a}`));

// Promise.all([
//   setTimeoutPromise(1000),
//   setTimeoutPromise(3000),
//   setTimeoutPromise(1500),
//   setTimeoutPromise(2000)
// ]).then((results) => {
//   console.log("results: ", results)
// });

// Promise.race([
//   setTimeoutPromise(1000),
//   setTimeoutPromise(500)
// ]).then(result => console.log('result: ', result));

const generatePromise = (shouldFail) => {
  return new Promise((resolve, reject) => {
    if (shouldFail) return reject(new Error("Rejected!"));
    console.log("After error");
    resolve("Success!");
  });
};

generatePromise(true)
  .then((value) => console.log("Success: ", value))
  .catch((err) => console.log("Error message: ", err));

(async () => {
  const response = await fetch("https://api.demo.foo/v1/todo");
  const json = await response.json();
  console.log(json);
})();
