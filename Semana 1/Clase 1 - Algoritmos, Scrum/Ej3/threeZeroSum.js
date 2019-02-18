// iterate every position of the triplete looking for a combination
// that makes the sum cero and is if the condicion is OK organize ascending
// past the new array to string
// organize all strings all delete the repet ones
// https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md



function threeZeroSum(Input){
    Input = Input.sort(function(a, b){return a-b});
    Out=[];
    Total=[];
    f=0;
    for(i=0;i<Input.length;i++){
        for(j=0;j<Input.length;j++){
            for(h=0;h<Input.length;h++){
                Total = Input[i]+Input[j]+Input[h];           
                if(i==j || i==h || j== h){
                }
                else{
                    if(Total == 0){                        
                        Arr = [Input[i],Input[j],Input[h]].sort(function(a, b){return a-b});                       
                        Out[f] = Arr[0].toString()+" "+Arr[1].toString()+" "+Arr[2].toString();
                        f=f+1;
                    }
                }
                
            }
        } 
    }
    Out = Out.sort(function(a, b){return a-b});
    Out = [...new Set(Out)];
    return Out
}