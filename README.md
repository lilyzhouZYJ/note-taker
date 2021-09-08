# note-taker

A node.js project: a website for taking notes!

## Description

On the back end, I'm using Express to build my server (in `app.js`). I'm also using the EJS template engine to render templates that would be sent to the front end.

For the database, I'm using MongoDB. I'm using the mongoose package to help interact with MongoDB. The schema and model for mongoose are built in [./models/note.js](./models/note.js).

## Usage

Run `npm start` to start the server.

## Dependencies

- [Express](https://expressjs.com/): web framework for Node.js.
- [EJS](https://ejs.co/): template engine.
- [Mongoose](https://mongoosejs.com/): an Object Document Mapping library, to make interaction with MongoDB easier.
- [Passport](http://www.passportjs.org/): authentication middleware; using the `passport-google-oauth20` strategy for Google authentication.

I'm also using [nodemon](https://nodemon.io/) for development.

## Files

- [config](./config): configuration for the server and for passport.
- [middleware](./middleware): 
- []