const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

/* Static files in ./public */
/* (with virtual path prefix /static/) */
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Template engine */
app.set('views', path.join(__dirname, 'views'));        // set directory for templates
app.set('view engine', 'ejs');                          // set EJS as template engine to use

const notes = [
    {title: '09-01 Notes', snippet: 'These are some notes on my 09/01 classes.'},
    {title: 'HIST 271 Notes', snippet: 'Class notes on HIST 271.'}
];

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        notes: notes
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    })
})

app.get('/notes', (req, res) => {
    res.render('notes', {
        title: 'My Notes',
        notes: notes
    })
})

app.listen(port, () => {
    console.log("Now listening at port 3000");
})