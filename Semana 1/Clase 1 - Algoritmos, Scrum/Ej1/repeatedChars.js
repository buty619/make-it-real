// 1. Primero se toma los nombres del arreglo de entrada
// 2. Se guardan en variables diferentes
// 3. Se hace split de cada caracter generando dos nuevos arreglos
// 5. eliminar repetidos en cada arreglo generado
// 4. Se realiza la iteración de los arreglos buscando los que tienen el mismo caracter
// 5. los que se encuentra la coincidencia se concatena en un arreglo de salida
// 6. se retorna arreglo de salida

function repeatedChars(In1,In2){
    Out="";
    for(i=0;i<In1.length;i++){
      for(j=0;j<In2.length;j++){
        if (In1[i] === In2[j]){
            Out += In1[i]; // + In1[i].toString();
            j=In2.length;
        }
      }
    }
    return(Out); 
}

//2n+2m+(n*m)