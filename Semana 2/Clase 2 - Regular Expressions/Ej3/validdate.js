//https://github.com/makeitrealcamp/top/blob/master/algorithms/regular-expressions.md


var r = /(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
const r = // your solution here
r.test("12/12/2012"); // true
r.test("24/08/1982"); // true
r.test("99/11/2019"); // false
r.test("hello"); // false