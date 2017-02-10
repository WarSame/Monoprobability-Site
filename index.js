// index.js

const port = 3000;
const express = require("express");
const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")

app.get("/", function(req, res) {
  res.render("index", {title:"This title", message:"Hello!"})
})

app.listen(port, function(err) {
  if (err){
    return console.log("Error: ", err)
  }

  console.log("Server is listening on "+port)
})
