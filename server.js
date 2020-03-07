// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,"public")));

var dbDir = path.resolve(__dirname,"db");
//console.log(dbDir);
var dbPath = path.join(dbDir,"db.json");
var dbJSON = fs.readFileSync(dbPath,"utf8");
var dbObj = JSON.parse(dbJSON);
console.log(dbJSON);
var obj = [
    {
        title : "Test title",
        text : "Test text"
    }
];
var jsonEx = JSON.stringify(obj);
console.log(jsonEx);
var indexPath = path.join(__dirname,"public","index.html");
//console.log(indexPath);
var notesPath = path.join(__dirname,"public","notes.html");

app.get("/", function(req, res) {
    res.sendFile(indexPath);
});
app.get("/notes", function(req, res){
    res.sendFile(notesPath);
});
app.get("/api/notes",function(req,res){
    //res.json(dbJSON);
     dbJSON = fs.readFileSync(dbPath,"utf8");
     dbObj = JSON.parse(dbJSON);
    res.json(dbObj);
  });
app.post("/api/notes",function(req,res){
    
    var currentNotes = JSON.parse(dbJSON);
    console.log(currentNotes);
    var newNote = req.body;
    console.log(newNote);
    newNote.id = currentNotes.length;
    currentNotes.push(newNote);
    fs.writeFile(dbPath,JSON.stringify(currentNotes), (err) => {
        if (err) console.log(err);
        console.log('The file has been saved!');
      });
    res.json(newNote);

  
  
 });
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});