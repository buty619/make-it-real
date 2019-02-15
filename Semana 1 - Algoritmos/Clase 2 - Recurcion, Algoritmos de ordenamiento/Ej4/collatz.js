//https://github.com/makeitrealcamp/top/blob/master/algorithms/2-recursion.md
//
//

function collatz(Input){
    if(Input == 1){
        return 0
    }
    Out = 0;
    if(Input%2 == 0){
        collatz(Input/2);
        Out ++
    }
    if(Input%2 !== 0){
        collatz(3*Input+1);
        Out ++
    }
    return Out
}
console.log(collatz(19));