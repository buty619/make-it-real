//https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md
//
//

function anagram(In1,In2){
    Out = 0;
    In1=In1.split('');
    In2=In2.split('');
    if(In1.length == In2.length){
        for(i=0;i<In1.length;i++){
            for(j=0;j<In2.length;j++){
                if(In1[i]==In2[j]){
                    Out = Out +1;
                    j=In2.length;
                }
            }
            if(Out==0){
                Resp = false
                i=In1.length;
            }
            if(Out==In1.length){
                Resp = true
                i=In1.length;
            }
        }
    }
    else{
        Resp= false;
    }
    return Resp;
}
console.log(anagram("anagram", "nagaram"));