import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import About from "../views/About.vue";
import MovieOverview from "../views/MovieOverview.vue";
import MyMovies from "../views/MyMovies.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/overview/:id",
    component: MovieOverview,
  },
  {
    path: "/movies/add",
    name: "My movies",
    component: MyMovies,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
