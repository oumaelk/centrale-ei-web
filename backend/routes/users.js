const express = require("express");
const UserModel = require("../models/user");
const RatingModel = require("../models/ratings");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({}).then(function (users) {
    res.json({ users: users });
  });
});

router.post("/like/:userId", async function (req, res) {
  const userId = req.params.userId;
  const movieId = req.body.movieId;
  const note = req.body.note;

  await RatingModel.findOneAndUpdate(
    { movie_id: movieId, user_id: userId },
    {
      movie_id: movieId,
      user_id: userId,
      note: note,
    },
    { upsert: true }
  );

  res.send("ok");
});

router.post("/new", function (req, res) {
  const newUser = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  newUser
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === 11000) {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

router.delete("/:userId", function (req, res) {
  UserModel.deleteOne({ _id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: "User successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the user" });
    });
});
router.get("/:id/movies", async function (req, res) {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id }).populate("watchedMovies");
    res.json(user.watchedMovies);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
