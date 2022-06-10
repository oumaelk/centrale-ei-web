<template>
  <div class="nav">
    <router-link class="nav-link" to="/">Home</router-link> |
    <router-link class="nav-link" to="/users">Users</router-link> |
    <router-link class="nav-link" to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
* {
  background-color: #484d6d;
  color: white;
  font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
}
.nav {
  text-align: center;
  padding: 30px;
}

.nav-link {
  font-weight: bold;
  color: #fffcf9;
}

.nav-link.router-link-exact-active {
  color: #ff6878;
}
</style>
