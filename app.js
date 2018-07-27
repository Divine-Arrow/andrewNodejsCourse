const express = require('express');
const hbs = require('hbs');
var fs = require('fs');
var app = express();

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middlewares


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `saving log at "${now}" for the route of : "${req.url}".. \n`;
    fs.appendFile('server.log', log, (err)=> {
        if(err) {
            console.log('something went wrong..!');
        }
    });
    next();
});

// Maintenance mode
/* app.use((req, res, next)=> {
    res.render('maintenance');
});
 */
app.use(express.static(__dirname + '/public'));
// app.use(express.static('./public'));
 
// hbs helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Register a handler
app.get('/', (req, res) => {
    res.render('home', {
        welcomeMessage: 'Welcome to the HOME PAGE'
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        data: 'about page',
        time: new Date().toLocaleTimeString()
    });
})


// Listen for requests
app.listen(port, () => {
    console.log(`server is up on port : ${port}`);
});