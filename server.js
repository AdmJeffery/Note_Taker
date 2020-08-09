const express = require("express");
const path = require("path");
const fs = require("fs")


let app = express();


let PORT = 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//route(s) to notes

app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", function (error, data){
        if (error){
            console.log(error)
        }

        const newData = JSON.parse(data);

        res.json(newData);
    })
    
})



// Routes
//-----------------------



app.get("/assets/js/index.js", function (req,res) {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"))
});

app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "./assets/css/styles.css"))
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html" ))
})


//listen function
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
})