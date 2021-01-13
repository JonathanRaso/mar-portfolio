require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

const piecesRoutes = require('./routes/pieces-routes');

app.get('/' , (req, res, next) => {
  res.send('Server Running!!! ')
})

app.use('/api/home', piecesRoutes);

app.listen(port, () => {
  console.log(`Server ON. App listening at http://localhost:${port}. Node env variable : ${process.env.TEST}`);
})