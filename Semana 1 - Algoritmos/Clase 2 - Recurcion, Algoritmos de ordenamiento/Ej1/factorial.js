// gets the input number
// decrece by one the number of the input
// call the function until the input is cero
// print result until get the trivial case
// https://github.com/makeitrealcamp/top/blob/master/algorithms/2-recursion.md

function factorial(Input){
    if(Input==1){
        return 1;
    }
    return Input*factorial(Input-1)
}
console.log(factorial(2));