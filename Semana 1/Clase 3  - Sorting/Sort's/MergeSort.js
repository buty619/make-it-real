//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function MergeSort(Input){

    if(Input.length == 1){
        return Input
    }
    var Input1 = [];
    var Input2 = [];
    Input1 = Input.slice(0, Math.round((Input.length/2)));    
    Input2 = Input.slice(Math.round((Input.length/2)),(Input.length));
    Input1 = MergeSort(Input1);
    Input2 = MergeSort(Input2);
    i = 0 ;
    j = 0;
    Out=[];
   pos = 0;
    while(i<Input1.length && j<Input2.length){      
      if(Input1[i]<=Input2[j]){

        Out[pos]=Input1[i];
        pos++

        i++
      }
      else{

        Out[pos]=Input2[j];
        pos++

        j++
      }
     
    }
    while(i < Input1.length) {
        Out.push(Input1[i]);
        i++;
    }
    while(j < Input2.length) {
        Out.push(Input2[j]);
        j++;
    }

   return Out;   

}

console.log(MergeSort([75,56,85,90,49,26,12,48,40,47]));