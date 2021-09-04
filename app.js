const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Note = require('./models/note');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');
const { notStrictEqual } = require('assert');

const app = express();
const port = 3000;


/* connect to MongoDB */
const dbURI = "mongodb+srv://lzhou:lzhou0929@cluster0.2g72s.mongodb.net/note-taker?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log("Now listening at port 3000")))
    .catch((err) => console.log(err));


/* static files in ./public */
app.use(express.static(path.join(__dirname, 'public')));


/* middleware */
app.use(express.urlencoded({ extended: true }));          // attach submission data to request body


/* template engine */
app.set('views', path.join(__dirname, 'views'));        // set directory for templates
app.set('view engine', 'ejs');                          // set EJS as template engine to use


/* Routes */

app.get('/', (req, res) => {
    Note.find().sort({ createdAt: -1 })         // show most recent first
        .then((result) => {
            res.render('index', { title: 'Home', notes: result });
        })
        .catch(err => console.log(err))
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

/* Note routes */

app.get('/notes', (req, res) => {
    Note.find().sort({ createdAt: -1 })         // show most recent first
        .then((result) => {
            res.render('notes', { title: 'My Notes', notes: result });
        })
        .catch(err => console.log(err))
})

app.get('/notes/create-new-note', (req, res) => {
    res.render('create-note', { title: 'Create New Note' })
})

app.post('/notes', (req, res) => {              // post request to add notes
    const note = new Note(req.body);
    note.save()
        .then((result) => {
            res.redirect(`/notes/${ result._id.toString() }`)
        })
        .catch((err) => console.log(err));
})

app.get('/notes/:id', (req, res) => {           // display single note
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render('single-note', { title: 'Note Details', note: result })
        })
        .catch((err) => console.log(err))
})

app.delete('/notes/:id', (req, res) => {        // delete note request
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            // send json object to front end
            res.json({ redirect: '/notes' });
        })
        .catch(err => console.log(err))
})