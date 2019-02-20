    if (celdaLlena(i, j, board)) {
        next = siguente(i, j);
        return sudokuSolver(next[0], next[1], copia(board));