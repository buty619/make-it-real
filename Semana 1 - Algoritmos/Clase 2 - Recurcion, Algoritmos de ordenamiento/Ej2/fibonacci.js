// get number postion of the fibonacci secuence
// calculate the fibonacci secuence until reach the position number
// return the fibonacci result on the position given
// https://github.com/makeitrealcamp/top/blob/master/algorithms/2-recursion.md

function fibonacci(Input){
    if(Input <= 1 ){
        return 1 
    }
    return fibonacci(Input-1)+fibonacci(Input-2);    
}
console.log(fibonacci(4));
//1 1 2 3 5 8 13