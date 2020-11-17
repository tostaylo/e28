<template>
  <div class="main">
    <h1>Front-End Framework Bench</h1>
    <p>
      Welcome to the project landing page for Front-End Framework Bench, an
      automated performance testing suite focused on comparing performance of
      client-side frameworks. The project utilizes Puppeteer to simulate user
      input (mouse clicks for example) and Google Chrome Developer Tools
      Performance Traces to analyze and record timings of the interaction.
    </p>
    <h3>Methodology</h3>
    <p>
      I'll be the first to admit these tests will not hold up to scientific
      scrutiny. For one, I am the one who wrote the app for each framework being
      tested, and I'm no expert with any of them. There is also the concerns of
      utilizing each framework to maximize performance vs. being the most
      desired idiomatic representation of the specific framework's code. I
      addressed neither of those concerns. Instead, I built each app to be as
      similar as possible with the fewest components.
    </p>
    <p>
      Each framework was built to output identical HTML structure and request
      the same CSS file.
    </p>
    <p>
      The apps are all built to simply create, update, or delete table rows. I
      acknowledge these actions are far from what most robust client-side
      applications require. However, the simplicity of the functionality
    </p>
    <h3>All tests were consistently run on</h3>
    <ul>
      <li>MacBook Pro (Retina, 15-inch, Mid 2015)</li>
      <li>2.5GHz Quad-Core Intel Core i7 Processor</li>
      <li>16GB 1600 MHz DDR3 Memory</li>
      <li>Chrome version - HeadlessChrome/86.0.4240.0</li>
    </ul>
    <h3>Example Test</h3>
    <div class="gif-container">
      <img
        loading="lazy"
        alt="example test"
        width="900"
        height="600"
        src="../assets/example-test.gif"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class Main extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  text-align: left;
}
.gif-container {
  width: 100%;
  overflow: auto;
}
</style>
