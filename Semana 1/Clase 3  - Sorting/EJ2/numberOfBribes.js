//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function numberOfBribes(Input){
    bribe = 0;
        for(var i = 0; i<Input.length;i++){
            C1=Input[i];
            C2=Input[i+1];
            C3=Input[i+2];
            C4=Input[i+3];
            if(C1>C2 && C1>C4){
                return -1
            }
            else{
                if(C1>C2){
                    bribe ++;              
                }
                if(C1>C3){
                  bribe ++;
                }
            }

        }
    
    return bribe;
}

console.log(numberOfBribes([1,2,5,3,4,7,6,10,9,8]));