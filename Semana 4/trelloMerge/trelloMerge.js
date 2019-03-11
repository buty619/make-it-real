const fs = require('fs');
const path = require('path');
const readline = require('readline');
const babel = require("@babel/core");
const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

//C:\Users\cm-pu\Documents\make it real\Semana 4\trelloMerge\SaveState.js
//C:\Users\cm-pu\Documents\make it real\Semana 4\trelloMerge\DomManage.js
const obj = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

var algo = null;

//rl.question('Ingrese path: ', (answer) => {
//  rl.question('Ingrese path 2: ', (answer2) =>{
    const file1 = bufferFile("C:\/Users\/cm-pu\/Documents\/make it real\/Semana 4\/trelloMerge\/SaveState.js");
    const file2 = bufferFile("C:\/Users\/cm-pu\/Documents\/make it real\/Semana 4\/trelloMerge\/DomManage.js");
    const finalfile = file1+"\n"+file2;
    var result = babel.transformSync(finalfile, obj);
    //result.code;
    fs.appendFile('finalfile.js', result.code, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });    
//    rl.close();    
//  });  
//});

function bufferFile(relPath) {
  let file = fs.readFileSync(relPath,{ encoding: 'utf8' });
  return file;
}

// minify({
//   compressor: uglifyJS,
//   input: '',
//   output: 'finalfile.js',
//   callback: function(err, min) {
//     if (err) throw err;
//   }
// });



