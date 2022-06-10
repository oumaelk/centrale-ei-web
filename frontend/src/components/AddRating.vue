<template>
  <div class="add-rating-form-container">
    <form ref="addRatingForm">
      <input
        class="add-rating-input"
        v-model="movie.rating"
        placeholder="Movie rating"
        required
      />
    </form>
    <button class="save-rating-button" @click="addRating()">Save rating</button>
    <div v-if="ratingCreationError">{{ ratingCreationError }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddRating",
  emits: ["movieRated"],
  data: function () {
    return {
      movie: {
        rating: "",
      },
      ratingCreationError: "",
    };
  },
  methods: {
    addRating: function () {
      if (!this.$refs.addRatingForm.checkValidity()) {
        this.$refs.addRatingForm.reportValidity();
        return;
      }

      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/:_id`, this.movie)
        .then(() => {
          this.$emit("ratingSaved");
          this.movie = {
            rating: "",
          };
        })
        .catch((error) => {
          this.movieCreationError = "An error occured while saving the rating.";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.add-rating-title {
  margin-bottom: 10px;
}

.add-rating-form-container {
  display: flex;
  margin-bottom: 20px;
}

.add-rating-input {
  background-color: lightgray;
  color: black;
  width: 80%;
  height: 20px;
  margin-top: 5%;
}

.add-rating-button {
  cursor: pointer;
  padding: 5px;
}
</style>
