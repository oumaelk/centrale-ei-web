<template>
  <div class="home">
    <h1>My Films Recommendation</h1>
    <p>Movie Name: {{ $data.movieName }}</p>
    <input type="text" v-model="movieName" />
    <h2>Most Popular this week</h2>
    <div class="parent">
      <li v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
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
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1"
        )
        .then((response) => {
          this.movies = response.data.results;
        });
    },
    /*fetchRecommentations: function (movieId) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/recommendations?api_key=522d421671cf75c2cba341597d86403a&language=en-US&page=1"
        )
        .then((response) => {
          console.log(response);
          this.recommanded[movieId] = response.data.results;
        });
    },
    search: function () {
      for (const movie in this.movies) {
        if (movie.title.includes(this.movieName)) {
          this.match_search.push(movie);
        }
      }
    },*/
  },
  mounted: function () {
    this.fetchMovies();
    for (const movie in this.movies) {
      this.fetchRecommentations(movie.id);
    }
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
