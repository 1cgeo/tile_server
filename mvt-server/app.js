require('dotenv').config()
var compression = require("compression");
const express = require("express");
const path = require("path");


const apiRouter = require("./src/routers/");
const app = express();

app.use(compression());
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use('/lib', express.static(path.join(__dirname, "lib")));

app.use(apiRouter);

app.use(function (req, res, next) {
  res.status(404).send('Not Found')
});




module.exports = app;
