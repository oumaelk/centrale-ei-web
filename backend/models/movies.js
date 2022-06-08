const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  url: { type: String },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
});

const movieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = movieModel;
