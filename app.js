const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/config.js');           /* configuration */

// passport config
require('./config/passport')(passport);

// express server
const app = express();

/* connect to MongoDB */
mongoose.connect(config.MONGO_URI)
    .then(() => app.listen(config.PORT, () => console.log("Now listening at port 3000")))
    .catch((err) => console.log(err));


/* static files in ./public */
app.use(express.static(path.join(__dirname, 'public')));


/* middleware */
app.use(express.urlencoded({ extended: true }));        // attach form submission data to request body
                                                        // for create-new-note form
// express-session middleware
app.use(session({
    secret: 'this is secret',
    resave: false,
    saveUninitialized: false,
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());


/* template engine */
app.set('views', path.join(__dirname, 'views'));        // set directory for templates
app.set('view engine', 'ejs');                          // set EJS as template engine to use


/* Routes */

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//     Note.find().sort({ createdAt: -1 })         // show most recent first
//         .then((result) => {
//             res.render('index', { title: 'Home', notes: result });
//         })
//         .catch(err => console.log(err))
// });

// app.get('/about', (req, res) => {
//     res.render('about', { title: 'About' })
// })

/* Google Auth routes */

// app.get('/login', (req, res) => {
//     res.render('login', { title: 'Login' });
// })

/* Note routes */

// app.get('/notes', (req, res) => {
//     Note.find().sort({ createdAt: -1 })         // show most recent first
//         .then((result) => {
//             res.render('notes', { title: 'My Notes', notes: result });
//         })
//         .catch(err => console.log(err))
// })

// app.get('/notes/create-new-note', (req, res) => {
//     res.render('create-note', { title: 'Create New Note' })
// })

// app.post('/notes', (req, res) => {              // post request to add notes
//     const note = new Note(req.body);
//     note.save()
//         .then((result) => {
//             res.redirect(`/notes/${ result._id.toString() }`)
//         })
//         .catch((err) => console.log(err));
// })

// app.get('/notes/:id', (req, res) => {           // display single note
//     const id = req.params.id;
//     Note.findById(id)
//         .then((result) => {
//             res.render('single-note', { title: 'Note Details', note: result })
//         })
//         .catch((err) => console.log(err))
// })

// app.delete('/notes/:id', (req, res) => {        // delete note request
//     const id = req.params.id;
//     Note.findByIdAndDelete(id)
//         .then(result => {
//             // send json object to front end
//             res.json({ redirect: '/notes' });
//         })
//         .catch(err => console.log(err))
// })