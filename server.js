const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//register partial of the hbs, used to manage, provided by hbs
hbs.registerPartials(__dirname + '/views/partials');
//set hbs as the view engine of the webpage we serve
app.set('view engine', 'hbs');
//declare and use middle-ware, either by you or a 3rd party
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: type - ${req.method} url - ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', '\n' + log, (e) => {
        console.log('there is an issue when writing logs');
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'oops, server updateing',
        content: 'either the server is down or is in maintenance, please come back later or contact our Customer suppport'
    });
    fs.appendFile('server.log', '\t - ' + 'In maintenance when accessed', (e) => {
        console.log('there is an issue when writing logs');
    });
});

app.use
hbs.registerHelper('getCurrentYear', () => {
    return new Date();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'home page',
        owner: 'Justin'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',
        {
            pageTitle: 'About page',
        });
});





app.listen(3000);