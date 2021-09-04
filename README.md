# note-taker

A node.js project: a website for taking notes!

## Dependencies

- [Express](https://expressjs.com/): web framework for Node.js.
- [EJS](https://ejs.co/): view engine.
- [Mongoose](https://mongoosejs.com/): an Object Document Mapping library, to make interaction with MongoDB easier.

I'm also using [nodemon](https://nodemon.io/) for development.

## Usage

Run `npm start` to start the server.

## Description

On the back end, I'm using Express to build my server (in `app.js`). I'm also using the EJS template engine to render templates that would be sent to the front end.

For the database, I'm using MongoDB. I'm using the mongoose package to help interact with MongoDB. The schema and model for mongoose are built in [./models/note.js](./models/note.js).