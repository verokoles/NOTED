const express = require('express');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes ofr API and HTML
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

//EXPRESS calls to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// only files in public folder are read in server
//having the pen image outside of 'assets' would not work for favicon to show
app.use(express.static("public"));

//https link listening on port to track link endings
app.listen(PORT, function() {
    console.log(`App is listening on PORT: ${PORT}`);
});


