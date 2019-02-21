// https://leetcode.com/problems/rotate-image/
// You are given an n x n 2D matrix representing an image.
// Rotate the image by 90 degrees (clockwise).
// Note:
// You have to rotate the image in-place, which means you have
//  to modify the input 2D matrix directly. DO NOT allocate another 
//  2D matrix and do the rotation.

// Example 1:
// Given input matrix = 
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
// rotate the input matrix in-place such that it becomes:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]

// Example 2:
// Given input matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ],
// rotate the input matrix in-place such that it becomes:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// dada la metriz de entrada la idea separar cada fila de la matriz 
// y trasponerla, haciendo push de la nueva columna  y luego eliminar 
// las originales para de esta manera no usar una matriz adicional
/*
Pseudo codigo
    function rotate[input]
        for cada linea en mariz
            inserte en la fila i el valor del vector
            traspuesto
             ejemplo : 
                    [1,2,3], -> [1,2,3,1]
                    [4,5,6], -> [4,5,6,2]
                    [7,8,9]  -> [7,8,9,3]

        eliminar las primeras n colunas segun el tamaño original de
        la matriz de origen

        for cada linea en matriz
            pasar el primer valor de la matriz resultado al final

*/

function Rotate(matrix){
    const size = matrix.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i].push(matrix[(size-1)-j][i]);
      }       
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i].shift();
        }       
      }    
    console.log(matrix);
}

input = [[1,2,3],[4,5,6],[7,8,9]];
Rotate(input);
input = [[ 5, 1, 9,11],[ 2, 4, 8,10],[13, 3, 6, 7],[15,14,12,16]];
Rotate(input);