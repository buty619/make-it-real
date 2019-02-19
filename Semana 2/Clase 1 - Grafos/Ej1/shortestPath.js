// https://github.com/makeitrealcamp/top/blob/master/algorithms/5-data-structures-ii.md
/*  se tiene una matriz de entrada, un nodo de salida y un nodo de llegada
el algoritmo debe buscar el camino menos pesado y debolverlo, la salida sera un arreglo con
el camino de nodos menos pesado o el path de pesos 

psheudocodigo:

 funcion shortesPath(matriz, salida, llegada)
    encontrar la posivion de los nodos en la matriz
    mirar los caminos que tiene entrada y pasar al siguiente nodo
    
    Recursivo hasta llegar al nodo final
    se obtienen tolos posibles caminos y se escoge el menos pesado

    while(input!=salida)
        if(comun entrada = comun salida){
            sume los pesos 
        }
        else{
            return -1
        }
        
*/


function shortestPath(matrix, source, dest) {
    return shortestPathHelper(matrix, source, dest, [])
}

function shortestPathHelper(matrix, source, dest, history) {
    if (source == dest) { //trivial case
        return 0;
    }
    history.push(source); //incluir fila en el historial

    let min = Number.MAX_SAFE_INTEGER; //El mayor número entero empieza siendo el mínimo

    for (let i = 0; i < matrix.length; i++) {
        if (!history.includes(i)) { //si esa fila ya se recorrió
            let historyCopy = history.slice(); //array copy
            //  Suma el movimiento actual con el siguiente
            let sum = matrix[source][i] + shortestPathHelper(matrix, i, dest, historyCopy)

            if (min > sum) { //Si la suma es menor que el mínimo actual
                min = sum;  //Asignar como nuevo mínimo
            }
        }
    }
    return min;
}

const mat = [
    [0, 10, 15, 20],//0
    [5, 0, 9, 10],//1
    [6, 13, 0, 12],//2
    [8, 8, 9, 0],//3
]
console.log(shortestPath(mat, 0, 3)); //20
console.log(shortestPath(mat, 3, 1)); //8
console.log(shortestPath(mat, 1, 0)); //5

//Accediendo directamente de 0 a 3 = 20
//En cambio, si la ruta es 0,1,3 = 12
const mat2 = [
    [0, 2, 15, 20],//0
    [5, 0, 9, 10],//1
    [6, 13, 0, 12],//2
    [8, 8, 9, 0],//3
]
console.log(shortestPath(mat2, 0, 3)); //12