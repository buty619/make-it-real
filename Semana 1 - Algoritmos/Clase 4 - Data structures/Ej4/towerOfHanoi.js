//https://github.com/makeitrealcamp/top/blob/master/algorithms/4-data-structures.md
// mirar con arreglo push y pop 


function towerOfHanoi(level,source, aux, dest) {
    if (level == 1) {
        dest.push(source.pop());
        console.log(source);
        console.log(aux);
        console.log(dest);
        console.log("+___________")        
    }
    else{
    console.log(source);
    console.log(aux);
    console.log(dest);
    console.log("¡___________")
    towerOfHanoi(level-1,source, dest, aux);
    console.log(source);
    console.log(aux);
    console.log(dest);
    console.log("-___________")
    dest.push(source.pop());
    console.log(source);
    console.log(aux);
    console.log(dest);
    console.log("*___________")
    towerOfHanoi(level-1,aux, source, dest);
    console.log(source);
    console.log(aux);
    console.log(dest);
    console.log("/___________")
    }
}

source = [4,3,2,1];
aux = [];
dest = [];
level=source.length

console.log(towerOfHanoi(level,source,aux,dest));