const path = require("path");
const express = require("express");
const session = require('express-session')
const cookieParser = require('cookie-parser');
const app = express();
const cookieSession = require('cookie-session')

//  --- setting --- //
app.set("view engine", "ejs");
app.set("views", "views");
//  --- use of --- //
app.use(express.urlencoded());
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use(cookieParser());
app.use(cookieSession({secret:"Shh! It's a secret"}))

app.get("/",(req,res) =>{
  req.session.inputVar=[];
  req.session.picas=[];
  req.session.fijas=[];
  req.session.newGame  = req.session.newGame || gRandom();
  console.log(req.session);
  res.render("index",{inputVar:"",picas:"",fijas:""});
})

app.post("/try", (req, res) => {
  var out = picasFijas(req.body.input, req.session.newGame)
  req.session.inputVar.push(req.body.input);
  req.session.picas.push(out[0]);
  req.session.fijas.push(out[1]);
  if(out[1] === 4){
    res.redirect("/won")
  }else{
    res.render("index", req.session);
  }
  console.log(req.session);
});


app.get("/won",(req,res) =>{
  req.session.newGame = gRandom();
  console.log(req.session.newGame);
  res.render("won");
})

app.post("/reset",(req,res) =>{
  res.redirect("/");
})


app.listen(3000, () => console.log("Inició en puerto 3000 ..."));

function gRandom() {
    let nRandom1 = Math.floor(Math.random() * 10);
    let nRandom2 = Math.floor(Math.random() * 10);
    let nRandom3 = Math.floor(Math.random() * 10);
    let nRandom4 = Math.floor(Math.random() * 10);
    let nRandom = '' + nRandom1 + nRandom2 + nRandom3 + nRandom4;
    if (nRandom.match(/.*(.).*\1+.*/)) {
      return gRandom();
    }
    return nRandom
}
function picasFijas(input, random) {
    let fijas = 0;
    let picas = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] == random[i]) {
        fijas++;
      }
    }
  
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (input[i] == random[j]) {
          picas++;
        }
      }
    }
    picas = picas-fijas;
    return [picas, fijas];
}