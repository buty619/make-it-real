//https://github.com/makeitrealcamp/top/blob/master/algorithms/5-data-structures-ii.md

function parse(input) {
    row = [];
    tablero = [];
    h = 0;
    split = input.split("");
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (split[h] != ".") {
                row[j] = Number(split[h]);
                h++
            }
            else {
                row[j] = split[h];
                h++
            }
        }
        tablero[i] = row;
        row = [];
    }
    return tablero;
}
function getCuadrante(x, y) {
    Cuadrantes = []
    if (0 <= x && x <= 2) {
        Cuadrantes.push(0);
        Cuadrantes.push(2);
    }
    if (3 <= x && x <= 5) {
        Cuadrantes.push(3);
        Cuadrantes.push(5);
    }
    if (6 <= x && x <= 8) {
        Cuadrantes.push(6);
        Cuadrantes.push(8);
    }
    if (0 <= y && y <= 2) {
        Cuadrantes.push(0);
        Cuadrantes.push(2);
    }
    if (3 <= y && y <= 5) {
        Cuadrantes.push(3);
        Cuadrantes.push(5);
    }
    if (6 <= y && y <= 8) {
        Cuadrantes.push(6);
        Cuadrantes.push(8);
    }
    return Cuadrantes;
}
function getOptions(x, y, boar) {
    OptArr = [];
    MatrizRef = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i++) {
        if (boar[x][i] != '.') {
            OptArr.push(boar[x][i]);
        }
        if (boar[i][y] != '.') {
            OptArr.push(boar[i][y]);
        }
    }
    cuadrante = getCuadrante(x, y);
    for (let i = cuadrante[0]; i <= cuadrante[1]; i++) {
        for (let j = cuadrante[2]; j <= cuadrante[3]; j++) {
            if (boar[i][j] != '.') {
                OptArr.push(boar[i][j]);
            }
        }
    }
    OptArr = [...new Set(OptArr)];
    for (let i = 0; i < OptArr.length; i++) {
        for (let j = 0; j < 9; j++) {
            if (OptArr[i] == MatrizRef[j]) {
                MatrizRef.splice(j, 1);
            }
        }
    }
    return MatrizRef
}
function celdaLlena(x, y, boar) {
    if (boar[x][y] != '.') {
        return true;
    }
    else {
        return false;
    }
}
function siguente(x, y) {
    salida = [];
    if (y < 8) {
        y++;
    }
    else {
        x++;
        y = 0;
    }
    salida = [x, y]
    return salida
}
function sudoku(str) {
    boar=[];
    boar = parse(str);
    sudokuSolver(0, 0, boar);

}
function copia(board){
    aux=[]
    for(let x = 0; x < board.length; x++) {
        aux[x] = board[x].slice();
    }
    return aux;
}
function sudokuSolver(i, j, board) {
    if (i > 8 && j > 8) {
        return true;
    }
    if (celdaLlena(i, j, board)) {
        next = siguente(i, j);
        return sudokuSolver(next[0], next[1], copia(board));
    }
    options = getOptions(i, j, board);
    for (let i = 0; i < options.length; i++) {
        next = siguente(i, j);
        resultado = sudokuSolver(next[0], next[1], copia(board));
        if (resultado == true) {
            return true;
        }
        else{
            return false;
        }
    }
}

// mirar lo de copiar el array


//console.log(siguente(4, 8));
var entrada = "...26.7.168..7..9.19...45..82.1...4...46.29...5...3.28..93...74.4..5..367.3.18...";
console.log(sudoku(entrada));
//console.log(parse(entrada))
//console.log(getCuadrante(0,4));
//console.log(getOptions(2,7,parse(entrada)));