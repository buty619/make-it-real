var readline = require('readline');
function gRandom() {
  nRandom1 = Math.floor(Math.random() * 10);
  nRandom2 = Math.floor(Math.random() * 10);
  nRandom3 = Math.floor(Math.random() * 10);
  nRandom4 = Math.floor(Math.random() * 10);
  nRandom = '' + nRandom1 + nRandom2 + nRandom3 + nRandom4;
  if (nRandom.match(/.*(.).*\1+.*/)) {
    gRandom();
  }
  return nRandom
}  
NRandom = gRandom()
console.log("{respuesta = "+NRandom+"}");
console.log("BIENVENIDO A PICAS Y FIJAS");
console.log("--> preciona enter para empezar");

function picasFijas(input, random) {
  //se tiene un input de 4 numeros "xxxx"
  // la salida seran dos numeros la cantidad de concidencias
  //  y si se tienen coincidencias en posicion
  // function picas y fijas (input)
  //    for cada input se compara con numero random
  //       si se tiene coincidencia primer salida +1
  let fijas = 0;
  let picas = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == random[i]) {
      fijas++;
    }
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i] == random[j]) {
        picas++;
      }
    }
  }
  picas = picas-fijas;
  return [picas, fijas];
}

function numberValidation(number){
  let error = false;
  if (! number.match(/^[0-9]{4}$/)) {
    error = true;
    console.error("ingrese un numero de 4 cifras");
    return error;        
  }
  else if (number.match(/.*(.).*\1+.*/)) {
    error = true;
    console.error("ingrese un numero sin cifras repetidas");
    return error;        
  }
  else {
    return error;       
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', () => {
  rl.question('Ingrese un numero y preciona enter: ', (answer) => {
    let error = numberValidation(answer);
    if(error){
      rl.close();
    }
    else{
      response = picasFijas(answer, NRandom);
      console.log("---> tienes "+ response[0] +" pica(s) y "+ response[1] +" fija(s)");
      console.log("preciona enter");
      if(response[1]===4){
        console.log("!! GANASTE ¡¡")
        rl.close();
      }
    }
  });
});



