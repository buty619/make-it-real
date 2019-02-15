function BinarySearch(Input,element){
    return BinarySearchRecursive(Input,element,0,Input.length);
}

function BinarySearchRecursive(Input,element,star,end){
    if(star>end){
        return -1;
    }
    if(element==Input[0]){
        return 0;
    }
    mitad = Math.round((end-star)/2)-1;
    mitad = mitad + star;

    if(element==Input[mitad]){;
        return mitad;        
    }
    if(element>Input[mitad]){
        return BinarySearchRecursive(Input,element,mitad+1,end);        
    }
    if(element<Input[mitad]){;
        return BinarySearchRecursive(Input,element,star,mitad-1);        
    }
}
console.log(BinarySearch([11,22,33,44,55,66,77,88,99,100,101],101));

