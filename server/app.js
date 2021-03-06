require('dotenv').config();

const path = require('path');
const fs = require('fs');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const projectsRoutes = require('./routes/projects-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

// --- HELMET MIDDLEWARE --- //
app.use(/* helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&display=swap'"],
    connectSrc: ["'unsafe-inline'"],
}, }) */
  /* helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], 
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'self'"],
      mediaSrc: ["'self'"],
    },
  }) */
  helmet(/* {
    contentSecurityPolicy: false,
  } */)
);

// --- BODY PARSING MIDDLEWARE --- //
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

// --- Express-static middleware to serve images when uploading image will be added ---//
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- INDEX.HTML STATIC SERVED --- //
app.use(express.static(path.join('public'))); 

// --- CORS MIDDLEWARE --- //
// This middleware will add header to every response, in order to take care of CORS issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.get('/' , (req, res, next) => {
  res.send('MAR-portfolio Server Running!!! ')
})

// --- ROUTES MIDDLEWARE --- // 
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// --- 404 MIDDLEWARE --- // 
/* app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
}) */

// --- ERROR HANDLING MIDDLEWARE --- //
app.use((err, req, res, next) => {
  // Checking if there is a file. If so, we remove this file before adding it in images folder.
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log('Picture removed because project creation failed !')
    })
  }
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status,
      message: err.message
    }
  })
})

// --- DB CONNECTION --- // 
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mar-portfolio-db.lajv0.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  )
  .then(() => {
    app.listen(port);
    console.log(`Server ON : ${port}. Connection to Database DONE!`);
  })
  .catch((err) => {
    console.log(err);
  });