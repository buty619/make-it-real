//https://leetcode.com/problems/minesweeper/

// Let's play the minesweeper game (Wikipedia, online game)!

// You are given a 2D char matrix representing the game board. 'M' represents an unrevealed mine,
// 'E' represents an unrevealed empty square, 'B' represents a revealed blank square that has no 
// adjacent (above, below, left, right, and all 4 diagonals) mines, digit ('1' to '8') represents 
// how many mines are adjacent to this revealed square, and finally 'X' represents a revealed mine.

// Now given the next click position (row and column indices) among all the unrevealed squares 
// ('M' or 'E'), return the board after revealing this position according to the following rules:

// 1.If a mine ('M') is revealed, then the game is over - change it to 'X'.
// 2.If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B') 
//     and all of its adjacent unrevealed squares should be revealed recursively.
// 3.If an empty square ('E') with at least one adjacent mine is revealed, then change it 
//     to a digit ('1' to '8') representing the number of adjacent mines.
// 4.Return the board when no more squares will be revealed.

// Note:

// 1.The range of the input matrix's height and width is [1,50].
// 2.The click position will only be an unrevealed square ('M' or 'E'), which also means the 
//     input board contains at least one clickable square.
// 3.The input board won't be a stage when game is over (some mines have been revealed).
// 4.For simplicity, not mentioned rules should be ignored in this problem. For example, 
//     you don't need to reveal all the unrevealed mines when the game is over, consider any 
//     cases that you will win the game or flag any squares.

/*
    Se deben generar dos funciones o el codigo debe tenr dos partes
    1. la primera busca las modificaciones del tablero alrededor del click
    2. y hacer el llamado recursivo para el alasis de cada celda alrededor del click
        function getCuadrante(click)
            return los 4 limites del cuadrando a analizar (L1,L2,L3,L4)

        function unCover(tablero, click, L1, L2, L3, L4)
            for L1 to L2 
                for L3 to L4
                    si click es una mina vacia E
                        si click esta al lado de mina 
                            celda ++

                        si  click no tiene minas adjacentes
                            recursive black arount

                    si click es una mina M
                        celda = X
*/

function getCuadrante(click,matriz){
    let cuadrante = [];
    cuadrante[0] = [click[0]-1,click[1]-1];
    cuadrante[1] = [click[0]-1,click[1]+1];
    cuadrante[2] = [click[0]+1,click[1]-1];
    cuadrante[3] = [click[0]+1,click[1]+1];
    if(cuadrante[0][0]<0){
        cuadrante[0][0]=0;
    }
    if(cuadrante[0][1]<0){
        cuadrante[0][1]=0;
    }
    if(cuadrante[1][0]<0){
        cuadrante[1][0]=0;
    }
    if(cuadrante[1][1]>=matriz[0].length){
        cuadrante[1][1]=cuadrante[1][1]-1;
    }
    if(cuadrante[2][0]>=matriz.length){
        cuadrante[2][0]=cuadrante[2][0]-1;
    }
    if(cuadrante[2][1]<0){
        cuadrante[2][1]=0;
    }
    if(cuadrante[3][0]>=matriz.length){
        cuadrante[3][0]=cuadrante[3][0]-1;
    }
    if(cuadrante[3][1]>=matriz[0].length){
        cuadrante[3][1]=cuadrante[3][1]-1;
    }

    return cuadrante
}

function minesweeper(click,matriz){
    unCover(click,matriz,0);
    return matriz;
}   

function unCover(click,matriz,cuadrante){
    if (click[0] > matriz.length && click[1] > matriz[0].length) {
        return matriz;
    }
    if(matriz[click[0]][click[1]] == "E"){
        cuadrante=getCuadrante(click,matriz);
        for (let i = cuadrante[0][1]; i <= cuadrante[1][1]; i++) {
            for (let j = cuadrante[2][1]; j <= cuadrante[3][1]; j++) {
                if(matriz[i][j]=="E"){
                    matriz[i][j] == "B";
                    //antes de mirar recurción mirar que se cumplan todas las condiciones del tablero
                    console.log(matriz);
                    unCover([i,j],matriz,getCuadrante([i,j],matriz));
                }
            }
        }
    }
    if(matriz[click[0]][click[1]] == "M"){
        matriz[click[0]][click[1]] = "X";
        return matriz;
    }

}

board = [['E', 'E', 'E', 'E', 'E'],
['E', 'E', 'M', 'E', 'E'],
['E', 'E', 'E', 'E', 'E'],
['E', 'E', 'E', 'E', 'E']];

console.log(minesweeper([2,3],board));