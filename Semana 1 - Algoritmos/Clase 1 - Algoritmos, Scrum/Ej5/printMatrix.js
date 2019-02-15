// capture erevy array individually and organize top print it 
// in the order wanted
//https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function printMatrix(Min){
    Arr = [];
    for(i=0;i<Min.length;i++){
        Arr=[];
        for(j=0;j<Min[i].length;j++){
            Arr= Arr + Min[i][j] + " | " ;            
        }
        console.log(Arr);
    }
}