const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const api = require("../api");
require("dotenv").config();

/**
 * connect to mongodb
 */

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.mongoURL;
const databaseName = "PersonalWebsite";
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName: databaseName,
};

mongoose
  .connect(uri, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

/**
 * create a new express server
 */
const app = express();
app.use(express.json());
app.use("/api", api);
// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }
  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// hardcode port to 3000 for now
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
