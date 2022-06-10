<template>
  <table>
    <thead>
      <th>Title</th>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.title">
        <td>{{ movie.title }}</td>
        <td>
          <button class="delete-button" @click="deleteMovie(movie._id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieTable",
  props: {
    movie: Array,
  },
  emits: ["movieDeleted"],
  methods: {
    deleteMovie: function (movieId) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/add/${movieId}`)
        .then(() => {
          this.$emit("movieDeleted");
        })
        .catch((error) => {
          alert("An error occured while deleting the movie.");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000000;
  padding: 10px;
  background-color: #fffcf9;
  color: #6d435a;
}

.delete-button {
  cursor: pointer;
  border-radius: 5%;
}
</style>
