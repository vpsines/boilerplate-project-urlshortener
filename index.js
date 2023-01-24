require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var urls = {};

// post shorturl endpoint
app.post("/api/shorturl", function (req, res) {
  // get original and short url
  var originalUrl = req.body.url;
  var shortUrl = Math.floor(Math.random() * 100) + 1;

  // check if key already exists, if so generate new key
  while (!(shortUrl.toString() in urls)) {
    shortUrl = Math.floor(Math.random() * 100) + 1;
  }

  let data = { original_url: originalUrl, short_url: shortUrl };
  urls[shortUrl] = originalUrl;
  // send data
  res.json(data);
});

app.get("/api/shorturl/:short_url", (req, res) => {
  let key = req.params.short_url;
  var originalUrl = urls[key];

  // redirect to original url
  res.redirect(originalUrl);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
