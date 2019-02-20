//https://github.com/makeitrealcamp/top/blob/master/algorithms/regular-expressions.md

const r = /[A-Z]{3}[0-9]{3}$/;
console.log(r.test("hello")); // false
console.log(r.test("MVV387")); // true
console.log(r.test("mvv387")); // false
console.log(r.test("M1V387")); //false

