// define routes for server
const express = require("express");

const Like = require("./models/like");
const Project = require("./models/project");

// api end point: prefiexed with "/api/"
const router = express.Router();

router.post("/like", (req, res) => {
  let parent = { parent: req.body.parent };
  Like.findOneAndUpdate(parent, { $inc: { like_nums: 1 } })
    .then((updatedLike) => {
      if (updatedLike) {
        res.status(200).json(updatedLike); // Send the updated document back to the client
      } else {
        console.log("Like not found!");
        res.status(404).json({ error: "Like not found" }); // Send a 404 error if the like is not found
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      res.status(500).json({ error: "Internal server error" }); // Send a 500 error if an error occurs
    });
});

router.get("/like", (req, res) => {
  Like.findOne({ parent: req.query.parent }).then((like) => {
    res.send(like);
  });
});

router.get("/project", (req, res) => {
  Project.find({}).then((projects) => {
    res.send(projects);
  });
});
// catch default not found
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
