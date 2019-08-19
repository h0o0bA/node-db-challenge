const express = require("express");
const helmet = require("helmet");
const ProjectRouter = require("./project/project-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/api/projects", ProjectRouter);

server.get("/", (req, res) => {
  res.send("<h2>Node DB Sprint Challenge!</h2>");
});

module.exports = server;
