// import express module
// think of it as a blueprint for an Application
const express = require("express");
// import path module
const path = require("path");

// create instance of express module (create an application)
const app = express();

// middleware will run before the response is sent
// makes public folder the root folder (all /.../... will be considered with public folder
// as the starting point)
// enables app to serve static files from the public folder
app.use(express.static(path.join(__dirname, "./public")));

// set up ejs as view engine (override the default)
app.set("view engine", "ejs");

// create inventory for my menu
const inventory = [
  { name: "sirloin", type: "beef", amount: 25 },
  { name: "ribs", type: "pork", amount: 0 },
  { name: "wings", type: "chicken", amount: 10 },
  { name: "breast", type: "chicken", amount: 5 },
  { name: "cod", type: "fish", amount: 22 },
  { name: "haddock", type: "fish", amount: 2 },
  { name: "chops", type: "pork", amount: 0 },
];

// create routes (paths) (handle get requests to different urls)
app.get("/", (req, res) => {
  // loads of code will go in here!!
  let username = "Andrew";
  res.render("landing", { data: username, stock: inventory }); // automatically looks inside views folder as that's the standard
});

app.get("/playlist", (req, res) => {
  res.send("my playlist");
});

app.get("/playlist:playId", (req, res) => {
  let id = req.params.playId;
  res.send(`SELECT * FROM playlists WHERE ID = ${id}`);
});

app.get("/products", (req, res) => {
  let queryp = req.query.q;
  res.send(`SELECT * FROM products WHERE name LIKE (${queryp})`);
});

// the express method 'listen(3000)' automatically sets up the html server with port 3000
app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`listening port 3000`);
});

// use port 3000 for web app and 4000 for the API
