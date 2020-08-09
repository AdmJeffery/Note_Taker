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
    fs.readFile("db/db.json", "utf8", function (error, data){
        if (error){
          return  console.log(error)
        }

        const newData = JSON.parse(data);

        res.json(newData);
    })
    
})

//post function
app.post("/api/notes", (req, res) => {
    fs.readFile('db/db.json', "utf8", function(error, data){
        if (error){
            return console.log(error)
        }

        let parsedNotes = JSON.parse(data);

        parsedNotes.push(req.body)

        fs.writeFile("db/db.json", JSON.stringify(parsedNotes), function (error, res){
            if (error){
               return console.log(error)
            } 

            res.json(parsedNotes)
        })
    })
})

//delete function whichs pulls notes by select ids
app.delete("/api/notes/:id", function (req, res){
    const id = req.params.id
    console.log(id)

    fs.readFile('db/db.json', "utf8", function (error, data){
        if (error) {
          return  console.log(error)
        }

        let jsonNotes = JSON.parse(data);

        jsonNotes = jsonNotes.filter(note => note.id !== id)

        fs.writeFile('db/db.json', JSON.stringify(jsonNotes), function (error, result){
            if (error) {
              return  console.log(error)
            }

            res.json(jsonNotes)
        } )
    })
} )







//root route
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html" ))
})


//listener function
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
})