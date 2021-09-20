# note-taker

A node.js project: a website for taking notes!

Features include:
- Creating, editing, and deleting notes.
- Support both public and private notes. A user can view other users' public notes, but not their private ones.
- User authentication using Google.

## Description

This is mostly a server-side/Node.js practice project, so I focused on building the backend mechanisms and tried to keep the frontend as simple as possible.

On the back end, I'm using Express to build my server (in [`app.js`](./app.js)). I'm also using the EJS template engine to render templates that would be sent to the front end. For the database, I'm using [MongoDB](https://www.mongodb.com/), and I'm using the mongoose package to help interact with MongoDB. The schema and model for mongoose are built in [./models/note.js](./models/note.js).

## Usage

Run `npm start` to start the server.

## Dependencies

- [Express](https://expressjs.com/): web framework for Node.js.
- [EJS](https://ejs.co/): template engine.
- [Mongoose](https://mongoosejs.com/): an Object Document Mapping library, to make interaction with MongoDB easier.
- [Passport](http://www.passportjs.org/): authentication middleware; using the `passport-google-oauth20` strategy for Google authentication.
- [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session): storing session data into MongoDB
- [moment](https://momentjs.com/): to format dates

I'm also using [nodemon](https://nodemon.io/) for development.

## Files

- [`app.js`](./app.js): where the backend server runs.
- [views](./views): views for the EJS template engine.
- [routes](./routes): routes for the Express server.
- [public](./public): static files, for the css stylesheets.
- [models](./models): models for mongoose.
  - There are two models, [`note`](./models/note.js) and [`user`](./models/user.js).
- [middleware](./middleware): middleware for the server.
  - [auth.js](./middleware/auth.js): authentication middleware with functions that check whether a user is already logged in and adjust the server response accordingly.
- [config](./config): configuration for the server and for the passport module.