const db = require("../data/dbConfig");

module.exports = {
  find,
  add,
  findById,
  addTask,
  findAllTasks
};

function find() {
  return db("projects");
}
function findById(id) {
  return db("projects").where({ id });
}

async function add(info) {
  const [id] = await db("projects").insert(info);
  return db("projects").where({ id });
}

function findByIdTask(id) {
  return db("tasks")
    .where({ id })
    .first();
}

async function addTask(info, project_id) {
  console.log(info);
  const [id] = await db("tasks").insert({ ...info, project_id });
  return findByIdTask(id);
}

function findAllTasks(id) {
  return db("tasks as t")
    .join("projects as p", "project_id", "p.id")
    .select("t.*");
}
