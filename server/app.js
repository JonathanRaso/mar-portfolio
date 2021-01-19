require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const projectsRoutes = require('./routes/projects-routes');

const app = express();


// --- BODY PARSING MIDDLEWARE --- //
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

TODO://Add express-static middleware to serve images when uploading image will be added


// --- CORS MIDDLEWARE --- //
// This middleware will add header to every response, in order to take care of CORS issues
app.use((req, res, next) => {
  // '*' give access to any domain
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

// --- 404 MIDDLEWARE --- // 
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
})

// --- ERROR HANDLING MIDDLEWARE --- //
app.use((err, req, res, next) => {
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
    console.log(`Server ON. App listening at http://localhost:${port}. Connection to Database DONE!`)
  })
  .catch((err) => {
    console.log(err);
  });