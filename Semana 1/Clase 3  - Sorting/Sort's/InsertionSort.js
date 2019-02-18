/*Este algoritmo recorre cada elemento de la lista y va creando una nueva lista 
ordenada insertando el elemento en la posición correcta.
A diferencia del selection sort es muy eficiente si la lista ya 
está ordenada (o casi ordenada) pero su complejidad sigue siendo O(n^2).*/
//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function InsertionSort(Input){
    Pos = 0;
    Output = [];
     for(var i = 0; i<Input.length;i++){
        for(var j = 0; j<Input.length;j++){
            if(Input[i]>Input[j]){
                Pos ++;
            }
        }
        Output[Pos]=Input[i];
        Pos = 0;
    }
    return Output
}
console.log(InsertionSort([8,6,9,5,4,3,2,11]));