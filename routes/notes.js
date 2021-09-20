const express = require('express');
const router = express.Router();
const Note = require('../models/note');                  /* mongoose note model */
const { ensureAuth } = require('../middleware/auth');

/* Notes routes */

// @desc    Show all public notes
// @route   GET /notes
router.get('/', ensureAuth, async (req, res) => {
    try {
        const notes = await Note.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: -1 })
            .lean()
        res.render('notes', { title: 'Public Notes', notes: notes });
    } catch (err) {
        console.error(err)
        res.render('error/500', { title: '500' })
    }
})

// @desc    Show create new note page
// @route   GET /notes/create-new-note
router.get('/create-new-note', ensureAuth, (req, res) => {
    res.render('create-note', { title: 'Create New Note' })
})

// @desc    Process create-new-note form
// @route   POST /notes
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id;
        const note = new Note(req.body);
        note.save()
            .then((result) => {
                res.redirect(`/notes/${ result._id.toString() }`)
            })
    } catch (err) {
        console.error(err);
        res.render('error/500', { title: '500' });
    }
})

// @desc    Display single note
// @route   GET /notes/:note_id
router.get('/:id', ensureAuth, (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .populate('user')       // to populate data from the user collection
        .then((result) => {
            res.render('single-note', { title: 'Note Details', note: result, loggedUser: req.user._id})
        })
        .catch((err) => console.log(err))
})

// @desc    Load edit-note form
// @route   GET /notes/edit/:note_id
router.get('/edit/:id', ensureAuth, (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render('edit-note', { title: 'Edit Note', note: result })
        })
        .catch((err) => console.log(err))
})

// @desc    Process edit-note form
// @route   POST /notes/edit/:note_id
router.post('/edit/:id', ensureAuth, (req, res) => {
    const newNote = {};
    newNote.title = req.body.title;
    newNote.snippet = req.body.snippet;
    newNote.body = req.body.body;
    newNote.status = req.body.status;

    const filter = {_id: req.params.id};
    Note.findOneAndUpdate(filter, newNote, { new: true })
        .then(result => {
            res.redirect(`/notes/${ result._id.toString() }`)
        })
})

// @desc    Delete note
// @route   DELETE /notes/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            // send json object to front end
            res.json({ redirect: '/dashboard' });
        })
        .catch(err => console.log(err))
})

// @desc    User notes
// @route   GET /notes/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const filter = {};
        filter.user = req.params.userId;

        // only show public notes if currently logged-in user
        // is not the user we are clicking on
        if(req.user._id.toString() != req.params.userId.toString())
            filter.status = 'public'

        const notes = await Note.find( filter )
        .sort({ createdAt: -1 })
        .populate('user')
        .lean()

        res.render('notes', { title: "Notes", notes: notes })
    } catch (err) {
        console.error(err);
        res.render('error/500', { title: '500' });
    }
})

module.exports = router;