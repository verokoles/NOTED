const path = require("path");

module.exports = function(app) {

    //get request for notes.html
    app.get("/notes", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/notes.html")
        );
    }); 
    //get request for index.html
    app.get("/", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/index.html")
        );
    });
}