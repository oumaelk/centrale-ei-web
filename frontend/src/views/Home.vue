<template>
  <div class="home">
    <div class="row">
      <div class="column">
        <a href="/">
          <div class="logo">
            <img src="../icons/Logo.png" style="width: 80%" />
          </div>
        </a>
      </div>
      <div class="column">
        <img class="icon" src="../icons/3669253_ic_search_icon.png" />
        <input
          type="text"
          v-model="movieName"
          class="searchbar"
          placeholder="Search movies"
        />
      </div>
    </div>
    <div class="parent">
      <li v-for="movie in filteredMovies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
    </div>
    <div class="row">
      <router-link class="nav-link" to="/movies/add">
        <h3>Take a look at my Movies</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";

export default {
  name: "Home",
  components: {
    Movie,
  },
  data: function () {
    return {
      movieName: "",
      movies: [],
      match_search: [],
      recommanded: {},
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(`http://localhost:3000/movies/`)
        .then((response) => (this.movies = response.data));
    },
  },
  mounted: function () {
    this.fetchMovies();
  },
  computed: {
    filteredMovies: function () {
      return this.movies.filter((movie) => {
        return movie.title
          .toLowerCase()
          .match(this.movieName.toLocaleLowerCase());
      });
    },
  },
  createURL: function (movie) {
    return "/" + movie.id;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  color: white;
}
.icon {
  height: 30px;
}
.searchbar {
  background-color: lightgray;
  color: black;
  width: 80%;
  height: 20px;
  margin-top: 5%;
}
h1 {
  size: 40px;
}
.row {
  display: flex;
  align-items: center;
  text-align: center;
}
.column {
  width: 50%;
  align-items: center;
}

h2 {
  text-align: left;
  margin: 5%;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  list-style: none;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.parent {
  display: flex;
  padding: 10px;
  flex-flow: row nowrap;
  overflow: scroll;
}
</style>
