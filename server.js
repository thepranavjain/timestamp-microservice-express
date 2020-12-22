// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", (req, res) => {
  const current = new Date();
  res.json({ unix: current.getTime(), utc: current.toUTCString() });
});

app.get("/api/timestamp/:date", (req, res) => {
  const reqDate = req.params.date;
  const reqTimestamp = Number(reqDate);
  let dateObj;
  if (reqTimestamp) dateObj = new Date(reqTimestamp);
  else dateObj = new Date(reqDate);
  const utc = dateObj.toUTCString();
  const unix = dateObj.getTime();
  if (!unix || !utc || utc === "Invalid Date")
    res.json({ error: "Invalid Date" });
  res.json({ unix, utc });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
