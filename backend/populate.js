const { default: axios } = require("axios");
const mongoose = require("mongoose");
const movieModel = require("./models/movies");
const apikey = "522d421671cf75c2cba341597d86403a";

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API

  let movies = [];

<<<<<<< HEAD
  for (let page = 1; page < 20; page++) {
=======
  for (let page = 1; page < 10; page++) {
>>>>>>> master
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&page=${page}`
    );

    movies = movies.concat(results.data.results);
  }

  return movies;
}
async function populateMovies(movies) {
  // TODO: populate movies into the database
  for (var movie of movies) {
    const newMovie = new movieModel({
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    });
    await newMovie.save();
  }
}

async function dropDataBase() {
  // TODO: Drop the collections
  const connection = mongoose.connection;

  await connection.dropCollection("movies");
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
