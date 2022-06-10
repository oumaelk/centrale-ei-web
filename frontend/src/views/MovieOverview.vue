<template>
  <div>
    <a href="/"><img src="../icons/Logo.png" style="width: 50%" /></a>
    <div v-if="movie" class="row">
      <div class="column">
        <h1>{{ movie.title }}</h1>
        <p>Release date: {{ movie.release_date }}</p>
        <p>Viewed by {{ countViewers(movie) }} viewers using our platform.</p>
        <h2>{{ movieDetails.overview }}</h2>
        <p>Rate this movie from 1 to 5</p>
      </div>
      <div class="column">
        <img :src="createURL(movie)" />
      </div>
    </div>
    <div v-else><h1>Sorry, this movie does not exist in the database.</h1></div>
  </div>
</template>

<script>
import axios from "axios";

const apiKey = "15d2ea6d0dc1d476efbca3eba2b9bbfb";

export default {
  data: function () {
    return { movie: null, movieDetails: "" };
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    },
  },
  methods: {
    fetchMovie: async function () {
      await axios
        .get(`http://localhost:3000/movies/${this.id}`)
        .then((response) => (this.movie = response.data));
    },
    createURL: function (movie) {
      return "https://image.tmdb.org/t/p/original" + movie.poster_path;
    },
    fetchMovieDetails: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.movie.tmid}?api_key=${apiKey}&language=en-US`
        )
        .then((response) => {
          this.movieDetails = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    countViewers: function (movie) {
      if (movie == null) {
        return 0;
      }
      return movie.viewers.length;
    },
  },
  mounted: async function () {
    await this.fetchMovie();
    this.fetchMovieDetails();
  },
};
</script>
<style scoped>
.row {
  display: flex;
  float: left;
}
.column {
  width: 50%;
  padding: 2%;
}
.column img {
  position: relative;
  width: 90%;
}
</style>
