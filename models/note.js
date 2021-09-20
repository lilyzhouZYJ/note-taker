const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* create schema */
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

/* create model */
const Note = mongoose.model('Note', noteSchema);

/* export model */
module.exports = Note;