require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.get('/' , (req, res, next) => {
  res.send('Server Running!!! ')
})

app.listen(port, () => {
  console.log(`Server ON. App listening at http://localhost:${port}. Node env variable : ${process.env.TEST}`);
})