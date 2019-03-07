const factorial = memoizer([1, 1], (recur, n) => {
  return n * recur(n-1);
});
console.log(factorial(5));