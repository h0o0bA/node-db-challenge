const db = require("../data/dbConfig");

module.exports = {
  find,
  add
};

function find() {
  return db("projects");
}

function add(info) {
  return db("projects").insert(info);
}
