//https://github.com/makeitrealcamp/top/blob/master/algorithms/1-complexity.md

function toRoman(input) {
    out = "";
    miles = 0;
    cientos = 0;
    decenas = 0;
    while (input != 0) {
        if (input >= 1000) {
            miles = Math.floor(input / 1000);            
            for (i = 0; i < miles; i++) {
                out = out + "M";
                input = input - 1000;
            }
        }

        if (input >= 900) {
            input = input - 900;
            out = out + "CM";
        }

        if (1000 > input && input >= 500) {
            input = input - 500;
            out = out + "D";
        }

        if (input >= 400) {
            input = input - 400;
            out = out + "CD";
        }

        if (input >= 100) {
            cientos = Math.floor(input / 100);            
            for (i = 0; i < cientos; i++) {
                out = out + "C";
                input = input - 100;
            }
        }

        if (input >= 90) {
            input = input - 90;
            out = out + "XC";
        }

        if (100 > input && input >= 50) {
            input = input - 50;
            out = out + "L";
        }

        if (input >= 40) {
            input = input - 40;
            out = out + "XL";
        }

        if (input >= 10) {
            decenas = Math.floor(input / 10);            
            for (i = 0; i < decenas; i++) {
                out = out + "X";
                input = input - 10;
            }
        }

        if (input >= 9) {
            input = input - 9;
            out = out + "IX";
        }

        if (10 > input && input>= 5) {
            input = input - 5;
            out = out + "V";
        }

        if (input >= 4) {
            input = input - 4;
            out = out + "IV";
        }

        if (input >= 1) {
            unidades = input;            
            for (i = 0; i < unidades; i++) {
                out = out + "I";
                input = input - 1;
            }
        }

    }
    return out;
}

console.log(toRoman(1)); // I
console.log(toRoman(4)); // IV
console.log(toRoman(10)); // X
console.log(toRoman(50)); // L
console.log(toRoman(100)); // C
console.log(toRoman(500)); // D
console.log(toRoman(476)); // CDLXXVI