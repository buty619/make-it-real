// A self-dividing number is a number that is divisible by every digit it contains.
// Also, a self-dividing number is not allowed to contain the digit zero.
// Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.
// uper = Numeber bound = number
// out = [todos los posibles selft diciding numbers]
//  13 no es self divider por que no es divisible por sus digitos 235
// function sefl divider(upper, bound)
//  for bound to upper
//     if tiene cero no es selfdivider
//      for cada en evalcuion
//          if modulo del digito != 0
//              ya no es selfdivider
//          else entonces agreguelo al selft divider
//          retorne self divider

function selfDivider(bound,upper){
    let h=0;
    let bandera = false;
    let out=[];
    for (let i = bound; i <= upper; i++){
        bandera = false;
        let apoyo =i.toString();
        if(! apoyo.match(/[0]/)){       
            bandera = div(i,apoyo);
        }
        if(bandera){
            out[h] = i;
            h++;
        }            
    }
    return out
}

function div(i,apoyo){
    for (let j = 0; j < apoyo.length; j++) {
        let comparar = parseInt(apoyo[j]);
        if(i % comparar == 0){
            bandera = true;
        }
        else{
            return
        }                
    }
    return bandera
}

console.log(selfDivider(1,22))