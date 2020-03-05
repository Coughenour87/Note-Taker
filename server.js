const express = require("express");
const path = require("path");
const app = express();
const data = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(data);
});

app.post("/api/notes", function(req, res) {
    const newData = req.body;
    console.log(newData);

    let id = 1;

    if (data.length !==0) {
        id = data[data.length-1].id +1 
    }

    newData.id = id
    data.push(newData)
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err => {
    if (err) return console.log(err)
    res.json(newData);

    })
});

app.delete("/api/notes/:id", function(req, res) {
    var deleted = req.params.id;

    for(let i = 0; i < data.length; i++){
    if(deleted === data[i].id);
    console.log("Before Data:", data)
    data.splice(i, 1);
    console.log("After:", data)
    }

    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err => {
        if (err) return console.log(err)
        res.json(Data);
    })
});

app.listen(PORT, () => {
    console.log("Server listening at: " + PORT, `http://localhost:${PORT} `);
});