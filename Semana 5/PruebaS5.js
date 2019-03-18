// At a lemonade stand, each lemonade costs $5.
// Customers are standing in a queue to buy from you, and order one 
//at a time (in the order specified by bills).
// Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. 
// You must provide the correct change to each customer, so that the net transaction is 
// that the customer pays $5.
// Note that you don't have any change in hand at first.
// Return true if and only if you can provide every customer with correct change.

//input [{5,10,20},{5,10,20},{5,10,20},{5,10,20},{5,10,20},{5,10,20}]
//output true / false
// function change(input[])
//  let monedero = []
//  for cada compra
//      evaluo el pago y si el pago necesita bueltas busco en el monedero si tengo
//      else si el billete es de 5 entonces OK bandera true
//      si bandera es true almaceno en monedero
//      si bandera es false salga y returne false

function change(input){
    let monedero = [];
    let bandera = false;
    for (let i = 0; i < input.length; i++) {
        if(input[0]>5){
            return bandera;
        }
        if(input[i] === 5){
            bandera = true;
            monedero[0] =monedero[0]+5 
        }
        if(input[i] === 10){
            if(monedero[0]>0){
                monedero[1] =monedero[1]+10;
                monedero[0] =monedero[0]-5
                bandera = true; 
            }else{
                return bandera;
            }            
        }
        if(input[i] === 20){
            if(monedero[1]>0){
                monedero[1] =monedero[1]-10;
            }else if(monedero[0]>=10){
                monedero[0] =monedero[0]-10;
            }
            else{
                return bandera;
            }
            if(monedero[0]>0){
                monedero[0] =monedero[0]-5 
            }else{
                return bandera;
            }
        }        
    }
    return bandera;
}

function call(input){
    return change(input);
}

console.log(call([10]));