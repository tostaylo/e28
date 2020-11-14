<template>
  <div>
    <nav id="nav">
      <router-link exact to="/">Home</router-link> |
      <router-link to="/frameworks">Frameworks</router-link> |
      <router-link to="/metrics">Metrics</router-link> |
      <router-link to="/comparison">Comparison</router-link> |
      <router-link to="/liked">Liked</router-link>
    </nav>
    <router-view
      v-if="timingResults.length > 0"
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
    fetch("http://e28-api.loc/timingResult")
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log(data.errors);
          throw new Error("Problem fetching data");
        }
        this.timingResults = data.timingResult;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    frameworks(): Set<string> {
      return new Set(this.timingResults.map((item) => item.timing_framework));
    },
    metrics(): Set<string> {
      return new Set(this.timingResults.map((item) => item.timing_type));
    },
  },
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

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

nav a {
  margin: 0 5px;
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
}

.route-main {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  width: 100%;
  padding: 30px;
}
</style>
