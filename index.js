const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const port = 9000;
var app = express();

const homeController = require('./controllers/home_controller');

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


app.get('/home', homeController.home);

app.listen(port, function(err){
    if(err){
        console.log("Error while starting the server :: ", err);
        return;
    }

    console.log("Server is up and running on port : " + port);

});