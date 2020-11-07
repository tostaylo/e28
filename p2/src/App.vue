<template>
  <div>
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view :stats="stats" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return { stats: null };
  },

  mounted() {
    fetch("/trace_results.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.stats = data;
      });
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #98a3ad;
  background: hsl(200, 7%, 8%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
}
</style>
