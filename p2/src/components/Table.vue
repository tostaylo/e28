<template>
  <div class="table-container">
    <table>
      <caption>
        All timings are in milliseconds
      </caption>
      <thead>
        <tr>
          <th scope="col" v-for="name in tableColumnNames" :key="name">
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in processedTimingResults" :key="result">
          <td>{{ result.timing_type }}</td>
          <td>{{ result.timing_framework }}</td>
          <td>{{ Number(result.total_dur).toFixed(2) }}</td>
          <td>{{ Number(result.click_dur).toFixed(2) }}</td>
          <td>{{ Number(result.render_during_click).toFixed(2) }}</td>
          <td>{{ Number(result.render_after_click).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { TimingResult } from "../types/index";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    processedTimingResults: Array as () => TimingResult[],
    tableColumnNames: Array as () => string[],
  },
});
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow: auto;
}

table {
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  table-layout: fixed;
}

caption {
  text-align: right;
}

th {
  font-size: 1em;
}

td {
  font-size: 0.9em;
}

th,
td {
  border: 1px solid gray;
  padding: 5px;
  width: 16.5%;
}

tbody tr:nth-child(odd) {
  background-color: gray;
  color: black;
}

tbody tr:nth-child(even) {
  background-color: black;
}
</style>