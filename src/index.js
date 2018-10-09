require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(require('body-parser').json());

app.use(function(req, res) {
  res.status(404).send('Undefined route');
});

console.log("success");
app.listen(process.env.PORT);