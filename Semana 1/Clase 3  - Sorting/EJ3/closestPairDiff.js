//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function closestPairDiff(Input){
    Input = SelectionSort(Input);
    Rest=0;
    win=Math.max.apply(null, Input);
    for(var i = 0 ; i < Input.length ; i++){
        Rest = Input[i+1]-Input[i]
        if(Rest<win){
            win=Rest;
        }
    }
    return win;
}

function SelectionSort(arr){
    var num = 0;
    var pos = 0;
    var newArr = [];
    var t = arr.length;
  
    for (var i = 0; i < t; i++) {
      num = arr[i];
      for (var j = 0; j < t; j++) {
        if (num >= arr[j]){
          pos=pos+1;
        }
      }
      newArr[pos-1]=num;
      pos=0;
    }
    return newArr
  }

console.log(closestPairDiff([11113, 11111114, 1114, 888888, 200, 100]));