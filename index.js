require = require("esm")(module /*, options*/);
module.exports = require("./src/server.js");

// using esm to allow Node.js to use import statements
// No need to use babel