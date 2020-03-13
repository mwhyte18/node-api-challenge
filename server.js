const express = require("express");
const actionsRouter = require("./actions/actionRouter");
const projectsRouter = require("./projects/projectRouter");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Welcome to marco's sprint api!</h2>`);
});

module.exports = server;
