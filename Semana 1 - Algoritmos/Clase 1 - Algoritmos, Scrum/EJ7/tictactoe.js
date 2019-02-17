//https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function tictactoe(input){
    for(i=0;i<3;i++){
        if(input[i][1] === input[i][2] && input[i][2] === input[i][3] && input[i][1] !== ''){
            return true
        }
    }
}

console.log(tictactoe([['X', 'X', 'X'],['', 'X', 'O'],['O', '', 'X']])); // true

console.log(tictactoe([
    ['X', '', 'O'],
    ['', 'X', 'O'],
    ['O', '', 'X']
  ])); // true
  
  console.log(tictactoe([
    ['O', 'X', 'O'],
    ['', 'X', 'O'],
    ['O', '', 'X']
  ])); // false