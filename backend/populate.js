const mongoose = require("mongoose");
const MovieModel = require("./models/movie");

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API
  try {
  } catch (error) {}
}

async function populateMovies() {
  // TODO: populate movies into the database
  try {
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
