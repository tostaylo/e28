<template>
  <div class="comparison">
    <h1>Comparison</h1>
    <div class="form">
      <div class="checkboxes">
        <span :key="framework" v-for="framework in frameworks">
          <label :value="framework" :for="framework">
            {{ framework }}
          </label>
          <input
            :id="framework"
            v-on:change="handleCheckbox"
            :name="framework"
            :checked="!filteredFrameworks.includes(framework)"
            type="checkbox"
          />
        </span>
      </div>
      <div>
        <label for="sort">Sort:</label>
        <select v-model="sortType" name="sort" id="sort"
          ><option value="default">default</option
          ><option v-for="name in tableColumnNames" :key="name" :value="name">{{
            name
          }}</option></select
        >
      </div>
    </div>

    <table>
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
          <th>{{ result.timing_framework }}</th>
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

type ColumnType =
  | "total_dur"
  | "render_during_click"
  | "timing_framework"
  | "render_after_click"
  | "click_dur"
  | "timing_type";

const Component = defineComponent({
  data() {
    return {
      sortType: "default",
      filteredFrameworks: [] as string[],
      processedTimingResults: this.timingResults,
      defaultTimingResults: this.timingResults
    };
  },
  props: {
    timingResults: Array as () => TimingResult[],
    frameworks: Set,
    metrics: Set
  },

  methods: {
    handleCheckbox(e: any) {
      console.log(this.filteredFrameworks);
      if (this.filteredFrameworks.includes(e.target.name)) {
        this.filteredFrameworks = this.filteredFrameworks.filter(
          framework => framework !== e.target.name
        );
        console.log(this.filteredFrameworks);
      } else {
        this.filteredFrameworks = [
          ...this.filteredFrameworks,
          e.target.name
        ] as string[];
        console.log(this.filteredFrameworks);
      }
    },
    processResults() {
      const timings: TimingResult[] = (this as any).timingResults ?? [];
      const sortType = this.sortType as ColumnType;
      const filteredFrameworks = this.filteredFrameworks as string[];

      console.log(sortType);

      const filteredTimings = timings.filter(
        timing => !filteredFrameworks.includes(timing.timing_framework)
      );

      if ((sortType as string) === "default") {
        this.processedTimingResults = this.defaultTimingResults;
      }
      switch (sortType) {
        case "timing_framework":
        case "timing_type":
          filteredTimings.sort((a, b) =>
            a[sortType].localeCompare(b[sortType])
          );
          break;

        default:
          filteredTimings.sort(
            (a, b) => a.final_timing[sortType] - b.final_timing[sortType]
          );
          break;
      }
      this.processedTimingResults = filteredTimings;
    }
  },

  watch: {
    sortType() {
      this.processResults();
    },
    filteredFrameworks() {
      this.processResults();
    }
  },

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
.form {
  display: inline-grid;
  grid-template-columns: 50% 50%;
}
.checkboxes {
  display: grid;
}
.checkboxes span {
  display: inline-grid;
  grid-template-columns: 50% 50%;
  text-align: left;
}

th,
td {
  border: 1px solid gray;
  padding: 5px;
}

tbody tr:nth-child(odd) {
  background-color: gray;
  color: black;
}

tbody tr:nth-child(even) {
  background-color: black;
}
</style>
