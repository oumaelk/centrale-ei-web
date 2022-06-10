<template>
  <router-link :to="`/overview/${movie._id}`" class="container">
    <div class="container">
      <div class="image">
        <img :src="createURL(movie)" />
      </div>
      <div class="content">
        <div class="info">
          <h2>{{ movie.title }}</h2>
          <span>({{ movie.release_date }})</span>
        </div>
      </div>
    </div>
  </router-link>
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
/*.card {
  display: block;
  background-color: black;
  width: 150px;
  margin: 2%;
  border-radius: 10%;
  color: white;
  font-size: 15px;
}*/
.container {
  position: relative;
  height: 400px;
  width: 7cm;
  overflow: hidden;
  background: grey;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease-out;
  border-radius: 20px;
}
.container:hover {
  box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}
.container .image {
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  transition: transform 0.3s ease-out;
}
.container:hover .image {
  transform: translateY(-100px);
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-out;
}
.container:hover .image img {
  opacity: 0.7;
}
.container:hover .image {
  transform: translateY(-100px);
}

.container .content {
  position: relative;
  width: 100%;
  height: 100%;
  background: grey;
}
.info {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100%;
  color: white;
  line-height: 26px;
}
.info h2 {
  font-size: 27px;
  margin: 3px 0;
}
.info span {
  color: #1a1a1a;
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
  padding: 1%;
  border-radius: 20%;
}
</style>
