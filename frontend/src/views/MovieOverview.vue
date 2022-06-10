<template>
  <div class="row">
    <div class="column">
      <h1 v-if="movie">{{ movie.title }}</h1>
      <h1 v-else>Sorry, this movie does not exist in the database.</h1>
      <p>Release date: {{ movie.release_date }}</p>
      <p>Viewed by {{ countViewers(movie) }} viewers using our platform.</p>
    </div>
    <div class="column">
      <img :src="createURL(movie)" />
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return { movie: Object };
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    },
  },
  methods: {
    fetchMovie: function () {
      axios
        .get(`http://localhost:3000/movies/${this.id}`)
        .then((response) => (this.movie = response.data));
    },
    createURL: function (movie) {
      return "https://image.tmdb.org/t/p/original" + movie.poster_path;
    },
    countViewers: function (movie) {
      return length(movie.viewers);
    },
  },
  mounted: function () {
    this.fetchMovie();
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
