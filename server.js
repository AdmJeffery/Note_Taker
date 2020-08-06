const express = require("express");
const path = require("path");
const fs = require("fs")
const util = require("util")

let app = express();


let PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//functions to make things go

// Routes
//-----------------------
app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/assets/js/index.js", function (req,res) {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"))
});

app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "./assets/css/styles.css"))
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html" ))
})
