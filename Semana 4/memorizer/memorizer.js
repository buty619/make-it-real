const factorial = memoizer([1], (recur, n) => {
  return n * recur(n - 1);
});
console.log(factorial(5));

const fibonacci = memoizer([1, 1], (recur, n) => {
  return recur(n - 1) + recur(n - 2);
});
console.log(fibonacci(7));

function memoizer(base, fun) {
  let cache = Object.assign({},base);
  function fmemo(n) {
    if (cache[n]) {
      result = cache[n];
    }
    else {
      result = fun(fmemo, n);
      cache[n] = result;
    }
    return result;
  }
  return fmemo;
};