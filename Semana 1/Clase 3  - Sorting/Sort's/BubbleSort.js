/* Este algoritmo recorre la lista varias veces comparando pares 
e intercambiándolos para que queden ordenados. El algoritmo termina 
cuando no es necesario hacer ningún intercambio.*/
//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function BubbleSort(Input){
    Flag = 0
    while(Flag == 0){
        Flag = 1;
        for(var i = 0; i<Input.length;i++){
            C1=Input[i];
            C2=Input[i+1];
            if(C1>C2){
                Input[i]=C2;
                Input[i+1]=C1;
                Flag = 0;                
            }
        }
    }
    return Input;
}
console.log(BubbleSort([8,6,9,5,4,3,2,11]));