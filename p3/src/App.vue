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
      :timingResults="timingResults"
      :frameworks="frameworks"
      :metrics="metrics"
      :timings="timings"
    />
  </div>
</template>

<script lang="ts">
import { TimingResult, Definition } from "./types/index";
import { defineComponent } from "vue";
const Component = defineComponent({
  name: "App",
  data() {
    return {
      timingResults: [] as TimingResult[],
      metrics: {} as Record<string, Definition>,
      frameworks: {} as Record<string, Definition>,
      timings: {} as Record<string, Definition>,
      links: [
        { name: "Home", url: "/", exact: true },
        { name: "Frameworks", url: "/frameworks" },
        { name: "Metrics", url: "/metrics" },
        { name: "Timings", url: "/timings" },
        { name: "Comparison", url: "/comparison" },
        // { name: "Liked", url: "/liked" },
        // { name: "Login", url: "/login" },
      ],
    };
  },

  methods: {
    async fetchData(url: string): Promise<any> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log(response);
          throw new Error(`Data fetch unsuccessful for ${url}`);
        }

        const json = await response.json();
        const data = await json;

        if (data.success === false) {
          console.log(data.errors);
          throw new Error(`Data fetch unsuccessful for ${url}`);
        }

        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  async mounted() {
    this.$store.dispatch("authUser");
    // run these in parallel
    this.timingResults = ((await this.fetchData(
      `${process.env.VUE_APP_API_URL}timingResult`
    )) as any).timingResult as TimingResult[];

    this.metrics = (await this.fetchData("/metric_definitions.json")) as Record<
      string,
      Definition
    >;

    this.frameworks = (await this.fetchData(
      "/framework_definitions.json"
    )) as Record<string, Definition>;

    this.timings = (await this.fetchData("/timing_definitions.json")) as Record<
      string,
      Definition
    >;
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
