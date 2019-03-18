const app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const path = require("path");
const mongoose = require("mongoose");

//  ----------
mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/NotesApp?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.urlencoded());
app.use("/static", express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//  ----------

var notesSchema = mongoose.Schema({
  title: String,
  body:String
});

const Notes = mongoose.model("Notes", notesSchema);

app.get('/', function(req, res){
  Notes.find(function(err, notes) {
    if (err) return console.error(err);
    console.log(notes);
    res.render("index",{notes});    
  });
});

app.post('/post', function(req,res){
  Notes.create({title:req.body.title,body:req.body.text}, err => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    console.log("documento generado");
  });
});




app.listen(3000, () => console.log("Inició en puerto 3000 ..."));