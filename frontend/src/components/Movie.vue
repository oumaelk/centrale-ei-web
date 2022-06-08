<template>
  <div class="card">
    <img :src="createURL(movie)" />
    <div class="title">{{ movie.title }}</div>
    <div class="date">({{ movie.release_date }})</div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
  methods: {
    createURL: function (movie) {
      return "https://image.tmdb.org/t/p/original" + movie.poster_path;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: black;
  width: 150px;
  margin: 10px;
  border-radius: 10%;
  color: white;
  font-size: 15px;
}
.title {
  text-transform: uppercase;
  padding: 10px;
  padding-bottom: 0;
  text-align: left;
}
.date {
  font-size: small;
  font-style: italic;
  text-align: center;
  padding: 5px;
}
img {
  width: inherit;
  border-radius: 10%;
}
.card button {
  position: relative;
  background-color: white;
  padding: 5px;
  border-radius: 20%;
}
</style>
