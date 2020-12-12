<template>
  <div>
    <nav id="nav">
      <span :key="link.name" v-for="(link, idx) in links">
        <router-link :exact="link.exact" :to="link.url">{{
          link.name
        }}</router-link
        ><!-- eslint-disable-next-line vue/no-parsing-error-->
        {{ idx < links.length - 1 ? " | " : "" }}
      </span>
    </nav>
    <router-view
      v-if="
        timingResults.length > 0 &&
        Object.keys(frameworks).length > 0 &&
        Object.keys(metrics).length > 0 &&
        Object.keys(timings).length > 0
      "
      :frameworks="frameworks"
      :metrics="metrics"
      :timings="timings"
    />
  </div>
</template>

<script lang="ts">
import { Definition } from "@/types/index";
import { fetchData } from "@/utils/index";
import { defineComponent } from "vue";
const Component = defineComponent({
  name: "App",
  data() {
    return {
      metrics: {} as Record<string, Definition>,
      frameworks: {} as Record<string, Definition>,
      timings: {} as Record<string, Definition>,
      links: [
        { name: "Home", url: "/", exact: true },
        { name: "Frameworks", url: "/frameworks" },
        { name: "Metrics", url: "/metrics" },
        { name: "Timings", url: "/timings" },
        { name: "Comparison", url: "/comparison" },
        { name: "Liked", url: "/liked" },
        { name: "Login", url: "/login" },
      ],
    };
  },

  async mounted() {
    this.$store.dispatch("authUser");
    this.$store.dispatch("getTimingResults");
    // run these in parallel

    this.metrics = (await fetchData<Record<string, Definition>>(
      "/metric_definitions.json"
    )) as Record<string, Definition>;

    this.frameworks = (await fetchData<Record<string, Definition>>(
      "/framework_definitions.json"
    )) as Record<string, Definition>;

    this.timings = (await fetchData<Record<string, Definition>>(
      "/timing_definitions.json"
    )) as Record<string, Definition>;
  },
  computed: {
    timingResults() {
      return this.$store.state.timingResults;
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
  height: 100px;
  flex-wrap: wrap;
  width: 100%;
}

nav a {
  margin: 0 5px;
  text-underline-position: under;
  transition: all 0.2s;
}

nav a:hover {
  color: lightgray;
}

select {
  height: 30px;
  max-width: 145px;
}

label {
  text-align: left;
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
  grid-template-columns: 100%;
}
</style>
