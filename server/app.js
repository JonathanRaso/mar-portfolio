require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const piecesRoutes = require('./routes/pieces-routes');

const app = express();

app.get('/' , (req, res, next) => {
  res.send('Server Running!!! ')
})

app.use('/api/home', piecesRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mar-portfolio-db.lajv0.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port);
    console.log(`Server ON. App listening at http://localhost:${port}. Connection to Database DONE!`)
  })
  .catch((err) => {
    console.log(err);
  });