const express = require("express");

const router = express.Router();
const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => res.status(200).json({ actions }))
    .catch(err => {
      res.status(500).json({
        message: "cant get the data!"
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(action => res.status(200).json({ message: action }))
    .catch(err =>
      res.status(500).json({ message: "cant get individual data!" })
    );
});

router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => res.status(200).json({ message: "action removed" }))
    .catch(err =>
      res.status(500).json({ message: "couldn't delete the post" })
    );
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json({ message: "action has been updated!" });
    })
    .catch(err => res.status(500).json({ message: "couldnt edit action" }));
});

router.post("/", validateProjectId, validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(action => res.status(201).json({ action }))
    .catch(err => res.status(500).json({ message: "couldn't add new action" }));
});

// my middleware for actions
function validateProjectId(req, res, next) {
  Projects.get(req.body.project_id).then(project => {
    if (!project) {
      res.status(400).json({ message: "This project doesn't exist!" });
    } else {
      next();
    }
  });
}
function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: "Your missing project id, description or the notes!" });
  } else {
    next();
  }
}
function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(400).json({ message: "This action doesn't exist!" });
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({ message: "Error getting this ID" }));
}

module.exports = router;
