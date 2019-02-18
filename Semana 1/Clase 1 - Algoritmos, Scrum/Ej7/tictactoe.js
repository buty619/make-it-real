//https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function tictactoe(input) {
    for (i = 0; i < 3; i++) {
        if (input[i][0] === input[i][1] && input[i][1] === input[i][2] && input[i][1] !== '') {

            return true;
        }
        if (input[0][i] === input[1][i] && input[1][i] === input[2][i] && input[1][i] !== '') {

            return true;

        }
        if (input[0][0] === input[1][1] && input[1][1] === input[2][2] && input[1][1] !== '') {

            return true;
        }
        if (input[0][2] === input[1][1] && input[1][1] === input[2][0] && input[1][1] !== '') {

            return true;
        }
    }
    return false
}

console.log(tictactoe([['X', '', 'X'], ['', '', 'X'], ['O', 'X', 'X']])); // true
console.log(tictactoe([['X', '', 'O'], ['', 'X', 'O'], ['O', '', 'X']])); // true
console.log(tictactoe([['O', 'X', 'O'], ['', 'X', 'O'], ['O', '', 'X']])); // false
console.log(tictactoe([['X', '', 'X'], ['', 'X', 'O'], ['O', 'X', 'X']])); // true
console.log(tictactoe([['X', '', 'O'], ['', 'O', 'O'], ['O', 'X', 'X']])); // true