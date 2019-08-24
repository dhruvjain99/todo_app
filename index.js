const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('./config/mongoose');

const port = 9000;
var app = express();


// Tell express to use sass as a middleware to convert scss to css
app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}));

// Use assets folder to serach for all static data like css, js, images or scss
app.use(express.static('assets'));

// Setup the ejs view engine and tell express to use it
app.set('view engine', 'ejs');
app.set('views', './views');

// Extracting styles and scripts tags from the sub-pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the express-ejs-layouts 
app.use(expressLayouts);

//Use urlencoded middleware to decode the data sent from the browser using POST method
app.use(express.urlencoded());

//Redirect all the requests to index.js router
app.use('/', require('./routes/index'));

//Listen requests on port 9000 
app.listen(port, function(err){
    if(err){
        console.log("Error while starting the server :: ", err);
        return;
    }

    console.log("Server is up and running on port : " + port);

});