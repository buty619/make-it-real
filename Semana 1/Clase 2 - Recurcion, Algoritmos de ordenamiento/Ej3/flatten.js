// look if the input is an array call the function again
// but if it's a number save it 
// and return the final array
//https://github.com/makeitrealcamp/top/blob/master/algorithms/2-recursion.md

function flatten(Input){
    if(typeof Input == 'number'){
        return [Input];
    }
    var flattenedArray = [];
    for(var i = 0; i < Input.length; i++){
        flattenedArray = flattenedArray.concat(flatten(Input[i]));
    }
    return flattenedArray;
}
console.log(flatten([[1, 2, 3], [4, 5]]));

