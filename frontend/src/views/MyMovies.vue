<template>
  <h1>My movies</h1>
  <AddMovie @movieAdded="fetchMovie()" />
  <MovieTable v-if="movie.length" :movie="movie" @movieDeleted="fetchMovie()" />
  <div v-if="movieLoadingError">{{ movieLoadingError }}</div>
</template>

<script>
// @ is an alias to /src
import MovieTable from "@/components/MovieTable.vue";
import AddMovie from "@/components/AddMovie.vue";
import axios from "axios";

export default {
  name: "Movie",
  components: {
    AddMovie,
    MovieTable,
  },
  data: function () {
    return {
      movie: [],
      movieLoadingError: "",
    };
  },
  methods: {
    fetchMovie: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies`)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          this.movieLoadingError = "An error occured while adding the movie.";
          console.error(error);
        });
    },
  },
  mounted: function () {
    this.fetchMovie();
  },
};
</script>
<style scoped></style>
