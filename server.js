const express = require("express");
const path = require("path");
const fs = require("fs")

let app = express();
let PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Routes
//-----------------------