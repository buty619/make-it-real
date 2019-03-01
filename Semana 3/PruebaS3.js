// Given an array A of non-negative integers, return an array consisting of all the 
//even elements of A,followed by all the odd elements of A.
// input = [1,2,3,4,5,6,7,8];
// out = [2,4,6,8,1,3,7];
// funtion organice(input array)
//  for cada elemento de matriz de antrada
//     if elemento is even
//          asignelo en matriz salida
//          borrelo de amtriz entrada
//  for cada elemento de matriz de antrada
//     if elemento is odd
//          asignelo en matriz salida
//          borrelo de amtriz entrada

function firstEven(input){
    let out=[];
    for (let i = 0; i < input.length; i++) {        
        if(input[i]%2 === 0){
            out.unshift(input[i]);
        }
        else{
            out.push(input[i]);
        }
    }
    return out;
}

console.log(firstEven([6,9,1,3,5,5,9,8]));