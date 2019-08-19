const express = require("express");
const ProjectDb = require("./project-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await ProjectDb.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to load all projects", err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [project] = await ProjectDb.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get this project", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await ProjectDb.add(req.body);
    res.status(201).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to post the project", err: err.message });
  }
});

router.post("/:id/tasks", async (req, res) => {
  console.log(req.params.id);
  try {
    const task = await ProjectDb.addTask(req.body, req.params.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to add this task", err });
  }
});

router.get("/:id/tasks", async (req, res) => {
  try {
    const tasks = await ProjectDb.findAllTasks(req.params.id);
    if (tasks) {
      if (tasks.length > 0) {
        res.status(201).json(tasks);
      } else {
        res.status(200).json({ message: "There are no any tasks" });
      }
    } else {
      // doesn't hit this else statement
      res.status(404).json({ message: "This id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get tasks", err });
  }
});

module.exports = router;
