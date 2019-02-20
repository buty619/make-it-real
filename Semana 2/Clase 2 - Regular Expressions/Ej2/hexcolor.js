//https://github.com/makeitrealcamp/top/blob/master/algorithms/regular-expressions.md

const r = /#[a-f0-9]{3}([a-f0-9]{3})?$/i;
console.log(r.test("#abc")); // true
console.log(r.test("#f00")); // true
console.log(r.test("#BADA55")); // true
console.log(r.test("#C0FFEE")); // true
console.log(r.test("#gac")); // false
console.log(r.test("#f005")); // false*/