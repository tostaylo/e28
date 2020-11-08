<template>
  <div class="comparison">
    <h1>Comparison</h1>
    <!-- <div v-for="result in finalTimings.values()" :key="result">
      {{ result }}
    </div> -->
    <table>
      <thead>
        <tr>
          <th scope="col" v-for="name in tableColumnNames" :key="name">
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in timingResults" :key="result">
          <th scope="row">{{ result.timing_framework }}</th>
          <td>{{ result.timing_type }}</td>
          <td>{{ result.final_timing.total_dur }}</td>
          <td>{{ result.final_timing.click_dur }}</td>
          <td>{{ result.final_timing.render_during_click }}</td>
          <td>{{ result.final_timing.render_after_click }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts">
import { TimingResult } from "../types/index";
import { defineComponent } from "vue";

const Component = defineComponent({
  props: { timingResults: Array as () => TimingResult[] },

  computed: {
    tableColumnNames(): Array<string> {
      const timings: TimingResult[] = (this as any).timingResults ?? [];
      if (timings.length <= 0) {
        return [];
      }
      const firstTwo = Object.keys(timings[0]);
      firstTwo.pop();
      const finalTimings = Object.keys(timings[0].final_timing);
      return firstTwo.concat(finalTimings);
    }
  }
});
export default Component;
</script>



<style scoped>
.comparison {
  display: grid;
  justify-content: center;
}
table,
th,
td {
  border: 1px solid;
}

tbody tr:nth-child(odd) {
  background-color: gray;
  color: black;
}

tbody tr:nth-child(even) {
  background-color: black;
}
</style>
