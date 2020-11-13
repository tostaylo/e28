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
        <select v-model="sortType" name="sort" id="sort">
          <option value="default">default</option>
          <option v-for="name in tableColumnNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
      <div>
        <button @click="addLike">Like</button>
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
      defaultTimingResults: this.timingResults,
    };
  },
  props: {
    timingResults: Array as () => TimingResult[],
    frameworks: Set,
    metrics: Set,
  },

  methods: {
    addLike() {
      const likedComparison = [
        ...((this.frameworks?.values() as unknown) as any),
      ]
        .filter(
          (framework: string) => !this.filteredFrameworks.includes(framework)
        )
        .sort((a, b) => a.localeCompare(b))
        .join(",");

      console.log(likedComparison);
      fetch("http://e28-api.loc/like", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ comparison_name: likedComparison }),
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    },

    handleCheckbox(e: any) {
      if (this.filteredFrameworks.includes(e.target.name)) {
        this.filteredFrameworks = this.filteredFrameworks.filter(
          (framework) => framework !== e.target.name
        );
      } else {
        this.filteredFrameworks = [
          ...this.filteredFrameworks,
          e.target.name,
        ] as string[];
      }
    },
    processResults() {
      const timings: TimingResult[] = (this as any).timingResults ?? [];
      const sortType = this.sortType as ColumnType;
      const filteredFrameworks = this.filteredFrameworks as string[];

      const filteredTimings = timings.filter(
        (timing) => !filteredFrameworks.includes(timing.timing_framework)
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
          filteredTimings.sort((a, b) => a[sortType] - b[sortType]);
          break;
      }
      this.processedTimingResults = filteredTimings;
    },
  },

  watch: {
    sortType() {
      this.processResults();
    },
    filteredFrameworks() {
      this.processResults();
    },
    timingResults() {
      this.processResults();
    },
  },

  computed: {
    tableColumnNames(): Array<string> {
      const timings: TimingResult[] = (this as any).timingResults ?? [];
      if (timings.length <= 0) {
        return [];
      }

      return Object.keys(timings[0]).filter(
        (columnName) => !["id", "created_at", "updated_at"].includes(columnName)
      );
    },
  },
});
export default Component;
</script>



<style scoped>
.comparison {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  width: 100%;
}
.form {
  display: inline-grid;
  grid-template-columns: 33% 33% 33%;
  margin-bottom: 20px;
}
.checkboxes {
  display: grid;
}
.checkboxes span {
  display: inline-grid;
  grid-template-columns: 50% 50%;
  text-align: left;
}

table {
  box-sizing: border-box;
  table-layout: fixed;
  width: 100%;
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
