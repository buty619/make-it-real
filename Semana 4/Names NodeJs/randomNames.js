var fs = require('fs');
var readline = require('readline');
var faker = require('faker');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese Nombre del Archivo : ', (answer1) => {
    rl.question('Ingrese numero de Nombres falsos : ', (answer2) => {
        randomName = "";
        console.log(answer1 + " " + answer2);
        for (let i = 0; i < answer2; i++) {
            randomName = randomName + faker.name.findName() + "\r\n";            
        }
        console.log(randomName);
        fs.appendFile(answer1 + '.txt', randomName, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        rl.close();
    });
});
