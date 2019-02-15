// Input = a sentece
// 1. get the input sentence
// 2. split the imput for each word's in the sentence
// 4. iterate and count the numbers of the strings in every word
// 5. save the biggest number of the string's
// https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function findLongestWordLength(Sentence){
    NumString = 0;
    Sentence = Sentence.split(" ");
    for(i=0;i<Sentence.length;i++){
        if(NumString < Sentence[i].length){
            NumString = Sentence[i].length;
        }
    }    
    return NumString;
}