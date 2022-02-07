const fs = require("fs");
// relative to root
const CONTROLLERS_PATH = "./server/controllers";

module.exports = fs
  .readdirSync(CONTROLLERS_PATH)
  .filter((f) => f !== "index.js")
  .map((file) => require(`./${file}`)); // eslint-disable-line import/no-dynamic-require, global-require
