// const factorial = memoizer([1, 1], (recur, n) => {
//   return n * recur(n-1);
// });
// console.log(factorial(5));

const fibonacci = memoizer([0, 1], (recur, n) => {
  return recur(n-1) + recur(n-2);
});
fibonacci(7); // 13

function memoizer(arg, f) {
  
  var Input = JSON.stringify(arg);
  let cache = {};
  if (cache[Input]) {
    result = cache[Input];
  }
  else {
    result = f(Input);
    cache[Input] = result;
  }
  return result;
};



