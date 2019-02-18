//not me
//https://github.com/makeitrealcamp/top/blob/master/algorithms/2-recursion.md
//
//

function pascal(n) {
    if (n == 1) {
        return '1' + '\n';
    }
    var pascalPrevStr = pascal(n-1);
    var pascalPrev = pascalPrevStr.split('\n')[n-2].split(' ');
    var generateRow = [];
    
    for (var i = 0; i < n; i++) {
        generateRow[i] = (typeof pascalPrev[i-1] == 'undefined' ? 0:parseInt(pascalPrev[i-1])) 
        + (typeof pascalPrev[i] == 'undefined' ? 0:parseInt(pascalPrev[i]));
    }
    return pascalPrevStr + generateRow.join(' ') + '\n';
}
console.log(pascal(6));