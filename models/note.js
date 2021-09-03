const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* create schema */
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

/* create model */
const Note = mongoose.model('Note', noteSchema);

/* export model */
module.exports = Note;