const express = require("express");
const movieModel = require("../models/movies");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const movies = await movieModel.find({}).populate("viewers");
    res.json(movies);
  } catch (error) {}
});

router.get("/:id", async function (req, res) {
  try {
    const movie = await movieModel.findById(req.params.id).populate("viewers");
    if (movie === null) {
      res
        .status(404)
        .json({ error: `Movie with id '${req.params.id}' does not exist` });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: `Unable to retrive the movie` });
  }
});

router.post("/new", async function (req, res) {
  const newMovie = new movieModel({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    viewers: req.body.viewers,
  });

  try {
    const createdMovie = await newMovie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `Movie with title "${newMovie.title}" already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while adding the movie" });
    }
  }
});
router.put("/:id", async function (req, res) {
  const id = req.params.id;
  const update = req.body;
  try {
    await movieModel.findOneAndUpdate({ _id: id }, update);
    res.json();
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `Can't update.`,
      });
    } else {
      res
        .status(500)
        .json({ message: "Error while updateing the movie characteritics" });
    }
  }
});
module.exports = router;
