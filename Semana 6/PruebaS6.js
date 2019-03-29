// In a string S of letters, these letters form consecutive groups of the same character.
// For example, a string like S = "abbxxxxzyy" has the groups "a", "bb", "xxxx", "z" and "yy".
// Call a group large if it has 3 or more characters.  We would like the starting and ending 
// positions of every large group.

// input string abbxxxxzyy out = [[3,7]]
// input string aaabbxxxxzzyy out = [[0,2],[3,7]]

// function  Same 
//  for each string in input  since the thirth position
//      if position 0 and 1 and actuall are the same
//          save start position  and move  one position
//      untin else 
//          save end position and move one position and save [start, end] in out

function sameInput(input){
    let start = 0;
    let end = 0;
    let out = [];
    let bandera = false;
    for (let i = 2; i < input.length; i++) {
        if(input[i] === input[i-1] && input[i-1] === input[i-2]){
            if(!bandera){
                start = i-2;
            }
            bandera = true;
        }
        else{
            if(bandera){
                end = i-1;
                out.push([start,end]);
                bandera = false;
                start = 0;
                end = 0;
            }    
        }
    }
    return out;
}

console.log(sameInput("aaabbxxxxzzyy"));