<template>
  <div class="home">
    <h1>My Films Recommendation</h1>
    <p>Movie Name: {{ $data.movieName }}</p>
    <input type="text" v-model="movieName" placeholder="Search movies" />
    <h2>Most Popular this week</h2>
    <div class="parent">
      <li v-for="movie in filteredMovies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";
import { booleanLiteral } from "@babel/types";

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
  /*watch: {
    movieName: function () {
      if (length(this.movieName) > 0) {
        this.search();
      }
    },
  },*/
  methods: {
    fetchMovies: function () {
      axios
        .get(`localhost:3000/movies/`)
        .then((response) => (this.movies = response));
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
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
