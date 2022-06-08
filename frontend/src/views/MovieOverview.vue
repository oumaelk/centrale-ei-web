<template>
  <h1 v-if="movie">This is a movie page {{ movie.title }}</h1>
  <h1 v-else>No movie found</h1>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return { movie: null };
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
  },
  mounted: function () {
    this.fetchMovie();
  },
};
</script>
