<template>
  <div>
    <nav id="nav">
      <router-link exact to="/">Home</router-link> |
      <router-link to="/frameworks">Frameworks</router-link> |
      <router-link to="/metrics">Metrics</router-link> |
      <router-link to="/comparison">Comparison</router-link>
    </nav>
    <router-view :timings="timings" :frameworks="frameworks" />
  </div>
</template>

<script lang="ts">
import TimingResult from "@/types/index";
export default {
  name: "App",
  data(): { timings: TimingResult } {
    return { timings: [] as TimingResult[] };
  },

  mounted() {
    fetch("/trace_results.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.timings = data;
      });
  },
  computed: {
    frameworks() {
      if (this.timings.length) {
        return new Set(this.timings.map(item => item.timing_framework));
      }
      return [];
    }
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
a {
  color: white;
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
