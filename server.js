// server.js

const path = require("path")
const port = 3000;
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();

app.set( "views", path.join( __dirname, "views" ) )
app.set( "view engine", "pug" )
app.use( cors() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended:true } ) )
app.use( express.static( path.join( __dirname, "public" ) ) )

app.locals.pretty = true

app.get("/", function(req, res) {
  res.render("index")
})

module.exports = app;
