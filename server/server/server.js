import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './env';
//import { connect } from './db';
import db from './db/postgres';

import authRoutes from './routes/auth-routes';
import todosRoutes from './routes/todos-routes';
//import passportSetup from './config/passport-setup';

const app = express ();
//3000 used by webpack dev server
app.set ('port', process.env.PORT || 3001);
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */

//connect();

app.use (morgan ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));

//set up vidw engine
app.set ('view engine', 'ejs');
app.use (express.static (path.join (__dirname, 'static')));

//same port as client use http://localhost:3000
app.use ('*', cors ({origin: 'http://localhost:3000'}));
//set up routes
// All routes in the end
// app.use('/auth', authRoutes);
// app.use('/todos', todosRoutes);
app.get ('/todos', function (req, res) {
  db.select ().from ('todo').then (function (data) {
    res.send (data);
  });
});

app.post ('/todos', function (req, res) {
  db.insert (req.body).returning ('*').into ('todo').then (function (data) {
    res.send (data);
  });
});

app.patch ('/todos/:id', function (req, res) {
  db ('todo')
    .where ({id: req.params.id})
    .update (req.body)
    .returning ('*')
    .then (function (data) {
      res.send (data);
    });
});

app.delete ('/todos/:id', function (req, res) {
  db ('todo').where ({id: req.params.id}).del ().then (function () {
    res.json ({success: true});
  });
});

// app.get('/todos', (req, res) => {
//   res.send('hello');
// });

//create home route
app.get ('/', function (req, res) {
  res.render ('home');
});

app.listen (app.get ('port'), () =>
  console.log (`Server is now running on http://localhost:${app.get ('port')}`)
);
