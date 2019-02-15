//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function descendingInsertionSort(Input){
    Pos = 0;
    Output = [];
     for(var i = 0; i<Input.length;i++){
        for(var j = 0; j<Input.length;j++){
            if(Input[i]<Input[j]){
                Pos ++;
            }
        }
        Output[Pos]=Input[i];
        Pos = 0;
    }
    return Output
}
console.log(descendingInsertionSort([1, 2, 3, 4])); // [4, 3, 2, 1]
console.log(descendingInsertionSort([5, 3, 8, 1])); // [8, 5, 3, 1]