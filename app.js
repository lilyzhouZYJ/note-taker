const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./config/config.js');           /* configuration */

/* passport config */
require('./config/passport')(passport);


/* express server */
const app = express();


/* template engine */
app.set('views', path.join(__dirname, 'views'));        // set directory for templates
app.set('view engine', 'ejs');                          // set EJS as template engine to use
app.locals.moment = require('moment');                  // using momentJS to format dates


/* static files in ./public */
app.use(express.static(path.join(__dirname, 'public')));


/* connect to MongoDB */
mongoose.connect(config.MONGO_URI)
    .then(() => app.listen(config.PORT, () => console.log("Now listening at port 3000")))
    .catch((err) => console.log(err));


/* Middleware */

// body parser:
// attach create-new-note form submission data to the request body for POST request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session middleware
const store = new MongoDBStore({                // store session to mongodb
    uri: config.MONGO_URI,
    collection: 'sessions'
});

// catch errors on mongoDBstore
store.on('error', function(error) {
    console.log(error);
});

app.use(session({                               // express session
    secret: 'this is secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7         // 1 week
    }
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


/* Routes */

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

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