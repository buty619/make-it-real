/*Intuitivamente, una forma de ordenar una lista sería la siguiente:
Recorrer la lista y encontrar el menor.
Insertar el elemento en otra lista y eliminar el elemento de la lista original.
Volver al paso 1 hasta que la lista original esté vacía.
Este algoritmo que acabamos de describir se le conoce como selection sort y 
su complejidad es O(n^2). Este algoritmo tiene la ventaja de ser simple pero la 
desventaja de que siempre tenemos que recorrer la lista original así el menor esté 
en la primera posición que comparemos (porque no sabemos que va a ser el menor hasta
que terminemos de recorrer toda la lista).*/
//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function SelectionSort(a){
    var aux = a.slice();
    var result = [];
    var lowest = 0;
    var indexLowest = 0;
    while(aux.length > 0) {
        lowest = aux[0];
        for(var i = 1; i < aux.length; i++) {
            if (aux[i] < lowest) {
                lowest = aux[i];
                indexLowest = i;
            }
        }
        aux.splice(indexLowest,1);
        indexLowest = 0;
        result.push(lowest);
    }

    return result;
}

console.log(SelectionSort([75,56,85,90,49,26,12,48,40,47]));