const express = require("express");

const router = express.Router();
const Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json({ projects }))
    .catch(err => {
      res.status(500).json({
        message: "cant get the data!"
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => res.status(200).json({ project }))
    .catch(err =>
      res.status(500).json({ message: "cant get individual data!" })
    );
});

router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => res.status(200).json({ message: "project removed" }))
    .catch(err =>
      res.status(500).json({ message: "couldn't delete the post" })
    );
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json({ message: "project has been updated!", project });
    })
    .catch(err => res.status(500).json({ message: "couldnt edit project" }));
});

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => res.status(201).json({ project }))
    .catch(err =>
      res.status(500).json({ message: "couldn't add new project" })
    );
});
function validateProjectId(req, res, next) {
  Projects.get(req.params.id).then(project => {
    if (!project) {
      res.status(400).json({ message: "This project doesn't exist!" });
    } else {
      next();
    }
  });
}
function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Your missing your project name or description!" });
  } else {
    next();
  }
}

module.exports = router;
