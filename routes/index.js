const express = require('express');
const router = express.Router();
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
router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            notes: notes,
            title: 'Dashboard'
        });
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

module.exports = router;