const { default: axios } = require("axios");
const { response } = require("express");
const mongoose = require("mongoose");
const movieModel = require("./models/movies");
const apikey = "522d421671cf75c2cba341597d86403a";

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API
  try {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apikey
    ).data.results;
  } catch (error) {}
}
async function populateMovies(movies) {
  // TODO: populate movies into the database
  try {
    for (var movie in movies) {
      movie = await movieModel.populate(movie);
    }
  } catch (error) {}
}

async function dropDataBase() {
  // TODO: Drop the collections
  try {
  } catch (error) {}
}

async function populate() {
  // Connect mongoose client
  const client = await mongoose.connect(process.env.MONGO_DB_URL);

  const movies = await fetchMoviesFromTheMovieDatabase();

  await dropDataBase();

  await populateMovies(movies);

  // disconnect mongoose client
  await client.disconnect();
}

populate()
  .then(() => {
    console.log("All done !");
  })
  .catch((error) => {
    console.error(error);
  });
