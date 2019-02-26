// Write a function to find the longest common prefix string amongst an array of strings.
// input : [string]
// output: [string - common prefix]
// input: ["abcdef","abcd","ab"]
// output:["ab"]
// input: ["abcdef","abcd","fefd","ab"]
// output:[""]

//  function commonPrefixt([input])
//      for cada elemnto del array
//        for cada string dentro del elemento del array
//             if cada string del elemento  == en cada elemento del array
//                  out = out+string seleccionado
//          return out}

function commonPrefixt(input){
    let corto=100000 //existe una funcion que te da un numero virtua,mente infinito.. buscar...
    let out="";
    for (let i = 0; i < input.length; i++) {
        if(corto>input[i].length){
            corto=input[i].length
        }        
    }
    for (let i = 0; i < corto; i++) {
        for (let j = 0; j < input.length; j++) {
            if(input[0][i]!=input[j][i]){
                out="";
                return out;                               
            }
        }
        out = out + input[0][i];
    }
    return out
}

console.log(commonPrefixt(["abcdef","abcd","fefd","ab"]));
console.log(commonPrefixt(["abccdef","abccd","abcc"]));
