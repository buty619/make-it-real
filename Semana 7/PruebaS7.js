//Count the number of prime numbers less than a non-negative number, n.
// input = 6  output = 4 uno no es primo
// 1 -> 2 (2/1) -> 3 (3/2) (3/1) -> 4 (4/3) (4/2) (4/1)
// funcion primo(input)
//   caso trivial cuando divir es uno
//      si llegue a caso trivial y el modulo es diferente de cero siempre
//      entonces output + 1
//   if numero actual % numero actual - 1 !== 0
//      call primo(numero actual -1)
//   else
//      return output

function primo(input){
    let output = 0;
    for (let i = 1; i <= input; i++) {            
        //console.log(i)
        if(isPrimo(i)){
            //console.log(isPrimo(i));            
            output++
        }     
    }
    return output  
}

function isPrimo(primo,i=2){
    if (primo <= 2){
        if(primo === 1){
            return false
        }
        if(primo === 2){
            return true
        }
    }  
    if(primo%i === 0){
        return false
    }
    if(i*i>primo){
        return true
    }            
    return isPrimo(primo,i+1)
}

console.log(primo(10));