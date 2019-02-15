//Given an array of stock prices, 
//find the minimum buy price and the maximum sell price that produce the greatest profit.
//[1,2,3,4,5] R: [1,5]

function profit(input) {
    let lost=input[0];
    let win=input[1];
    for (i = 0; i < input.length; i++) {
        if (input[i] < lost) {
            lost = input[i];
        }
        if (input[i] > win) {
            win = input[i];
        }
    }
    return [lost, win]
}

console.log(profit([2, 1, 3, 4, 5]));