const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const controllers = require("./controllers");

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import App from '../src/App';
// https://expressjs.com/en/resources/middleware/cors.html

const PORT = process.env.PORT || 3006;

async function boot() {
  const app = express();

  app.set("view engine", "ejs");

  app.use(cors());

  app.use("/api", controllers);
  app.use(express.static("./client/build"));
  app.get("/*", (req, res) => {
    const indexFile = path.resolve("./client/build/index.html");
    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        // console.error('Something went wrong:', err); // eslint-disable-line no-console
        return res.status(500).send("Oops, better luck next time!");
      }
      return res.send(data);
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); // eslint-disable-line no-console
  });
}

boot();
