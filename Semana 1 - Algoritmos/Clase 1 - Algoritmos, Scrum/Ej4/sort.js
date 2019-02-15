// get every objet in the array and compare whit the array 
// determining his position depeding of the value of the objet taken
// https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function sort(arr){
    var num = 0;
    var pos = 0;
    var newArr = [];
  
    for (var i = 0; i < arr.length; i++) {
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