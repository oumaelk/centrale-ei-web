<template>
  <div class="add-movie-title">Add a movie:</div>
  <div class="add-movie-form-container">
    <form ref="addMovieForm">
      <input
        class="add-movie-input"
        v-model="movie.title"
        placeholder="Movie title"
        required
      />
    </form>
    <button class="add-movie-button" @click="addMovie()">Add movie</button>
    <div v-if="movieCreationError">{{ movieCreationError }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddMovie",
  emits: ["movieAdded"],
  data: function () {
    return {
      movie: {
        title: "",
      },
      movieCreationError: "",
    };
  },
  methods: {
    addMovie: function () {
      if (!this.$refs.addMovieForm.checkValidity()) {
        this.$refs.addMovieForm.reportValidity();
        return;
      }

      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/add`, this.movie)
        .then(() => {
          this.$emit("movieAdded");
          this.movie = {
            title: "",
          };
        })
        .catch((error) => {
          this.movieCreationError = "An error occured while adding the movie.";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.add-movie-title {
  margin-bottom: 10px;
}

.add-movie-form-container {
  display: flex;
  margin-bottom: 20px;
}

.add-movie-input {
  background-color: lightgray;
  color: black;
  width: 80%;
  height: 20px;
  margin-top: 5%;
}

.add-movie-button {
  cursor: pointer;
  padding: 5px;
}
</style>
