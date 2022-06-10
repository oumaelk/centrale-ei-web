const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "RatingModel" },
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "MovieModel" },
    note: Number
  }
);

const RatingModel = mongoose.model("RatingModel", RatingSchema, "ratings");

module.exports = RatingModel;
