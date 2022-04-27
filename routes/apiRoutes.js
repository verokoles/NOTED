
const fs = require("fs");
const path = require("path");
const getNotes = require("../db/db.json");

console.log(process.pid);


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
            const lastItemIndex = getNotes.length - 1;
            const lastItem = getNotes[lastItemIndex];
            const newId = JSON.parse(lastItem.id) +  1;
            req.body.id = JSON.stringify(newId);
        }
        console.log("req.body.id: " + req.body.id);
        // add "id" option to database
        // push json to the body and write into database
        getNotes.push(req.body);
        writeToDB();
        console.log(getNotes);
        // response.json shows new note
        res.json(req.body);
    });

    function writeToDB() {
        //bring in path when writing to file
        //windeows path.join
        fs.writeFile(path.join(__dirname, "..", "db/db.json"), JSON.stringify(getNotes, '\t'), err => {
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