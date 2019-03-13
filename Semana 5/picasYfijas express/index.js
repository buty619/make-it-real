const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use("/static", express.static(path.join(__dirname, "assets")));

app.get("/",(req,res) =>{
    res.render("index");
})

app.post("/try", (req, res) => {
    app.locals.inputVar = req.body.input;
    res.render("index", app.locals.inputVar );
    //console.log(req.body);
    //arr.push(req.body.input);
    //res.send(req.body.input);
});

app.listen(3000, () => console.log("Inició en puerto 3000 ..."));