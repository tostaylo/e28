<template>
  <div>
    <nav id="nav">
      <router-link exact to="/">Home</router-link> |
      <router-link to="/frameworks">Frameworks</router-link> |
      <router-link to="/metrics">Metrics</router-link> |
      <router-link to="/comparison">Comparison</router-link>
    </nav>
    <router-view
      :timingResults="timingResults"
      :frameworks="frameworks"
      :metrics="metrics"
    />
  </div>
</template>

<script lang="ts">
import { TimingResult } from "./types/index";
import { defineComponent } from "vue";
const Component = defineComponent({
  name: "App",
  data() {
    return { timingResults: [] as TimingResult[] };
  },

  mounted() {
    fetch("/trace_results.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.timingResults = data;
      });
  },
  computed: {
    frameworks(): Set<string> {
      return new Set(this.timingResults.map(item => item.timing_framework));
    },
    metrics(): Set<string> {
      return new Set(this.timingResults.map(item => item.timing_type));
    }
  }
});
export default Component;
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
a {
  color: white;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #98a3ad;
  background: hsl(200, 7%, 8%);
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
  min-height: 100vh;
}
</style>
