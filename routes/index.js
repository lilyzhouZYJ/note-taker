const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');                  /* mongoose note model */
const { ensureAuth, ensureGuest } = require('../middleware/auth');


// @desc    Landing/login page
// @router  GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', { title: 'Login' });
})

// @desc    About page
// @router  GET /about
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// @desc    Dashboard
// @router  GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    Note.find().sort({ createdAt: -1 })         // show most recent first
        .then((result) => {
            res.render('dashboard', { title: 'Home', notes: result });
        })
        .catch(err => console.log(err))
});


/* Notes routes */

router.get('/notes', (req, res) => {
    Note.find().sort({ createdAt: -1 })         // show most recent first
        .then((result) => {
            res.render('notes', { title: 'My Notes', notes: result });
        })
        .catch(err => console.log(err))
})

router.get('/notes/create-new-note', (req, res) => {
    res.render('create-note', { title: 'Create New Note' })
})

router.post('/notes', (req, res) => {              // post request to add notes
    const note = new Note(req.body);
    note.save()
        .then((result) => {
            res.redirect(`/notes/${ result._id.toString() }`)
        })
        .catch((err) => console.log(err));
})

router.get('/notes/:id', (req, res) => {           // display single note
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render('single-note', { title: 'Note Details', note: result })
        })
        .catch((err) => console.log(err))
})

router.delete('/notes/:id', (req, res) => {        // delete note request
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            // send json object to front end
            res.json({ redirect: '/notes' });
        })
        .catch(err => console.log(err))
})

module.exports = router;