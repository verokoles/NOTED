
const fs = require("fs");
const getNotes = require("../db/db.json");


module.exports = function (app) {
    //database takes json array to db.json
    function writeData(notes) {
        notes = JSON.stringify(notes);
        console.log(notes);
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    //GET request 
    app.get("/api/notes", function (req, res) {
        res.json(getNotes);
    });

    // POST to add new notes
    app.post("/api/notes", function (req, res) {
        if (getNotes.length == 0) {
            req.body.id = "0";
        } else {
            req.body.id = JSON.stringify(JSON.parse(getNotes[getNotes.length - 1].id) + 1);
        }
        console.log("req.body.id: " + req.body.id);
        // push json to the body and write into database
        getNotes.push(req.body);
        writeToDB();
        console.log(getNotes);
        // response.json shows new note
        res.json(req.body);
    });

    function writeToDB() {
        fs.writeFile("../db/db.json", JSON.stringify(getNotes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }


    // DELETE  request to delte note
    app.delete("/api/notes/:id", function (req, res) {
        let id = req.params.id.toString();
        // math for noteArray to go through for loop
        for (i = 0; i < getNotes.length; i++) {
            if (getNotes[i].id == id) {
                console.log("Success!");
                // then res deleted note
                res.send(getNotes[i]);
                // splice removes the note
                getNotes.splice(i, 1);
                break;
            }
        }
        //final call to write notes in database
        writeData(getNotes);
    });

};