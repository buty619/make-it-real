// generar la permutacion de todos los camino posibles
//darle peso a cada camino dado matriz[i,j]
// dejar al que tiene menor peso

function perm(matriz) {
  let out = [];
  for (let i = 0; i < matriz.length; i++) {
    let aux = perm(matriz.slice(0, i).concat(matriz.slice(i + 1)));
    if (!aux.length) {
      out.push([matriz[i]])
    } else {
      for (let j = 0; j < aux.length; j++) {
        out.push([matriz[i]].concat(aux[j]))
      }
    }
  }
  return out;
}

function travelSalesman(matriz, nodo) {
  M = [];
  out = [];
  peso = 0;
  fullM = [];
  outM=[];
  // se genera numero de nodos
  for (i = 0; i < matriz.length; i++) {
    M[i] = i;
  }
  //se elimina el nodo raiz
  M.splice(nodo, 1);
  //se realiza la permutación de los nodos encontrando todos los caminos
  M = perm(M)
  // se inserta el nodo raiz al principio y al final del arreglo
  for (i = 0; i < M.length; i++) {
    fullM[0] = nodo;
    for (j = 0; j < M[0].length; j++) {
      fullM[j + 1] = M[i][j];
    }
    fullM[fullM.length] = nodo;
    outM[i] = fullM;
    fullM = [];
  }
  // se calcula el peso de todos los caminos encontrados y guardarn en un array
  for (j = 0; j < outM.length; j++) {
    for (i = 0; i < matriz.length; i++) {
      x = outM[j][i];
      y = outM[j][i + 1];
      // si no existe el camino se le asigna el maximo valor para que este no gane 
      // y se descarte al momento de seleccionar el camino ganador
      if (matriz[x][y] > 0) {
        peso = peso + matriz[x][y];
      }
      else {
        peso = Number.MAX_SAFE_INTEGER;
      }
    }
    out[j] = peso;
    peso = 0;
  }
  // se seleccione el menor y se rettorna
  win=Math.min(...out);
  return win;
}

const mat = [
  [0, 10, 15, 20],
  [5, 0, 9, 10],
  [6, 13, 0, 12],
  [8, 8, 9, 0]
];

console.log(travelSalesman(mat, 2));
//console.log(perm([1, 2, 3]));