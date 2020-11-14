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
        <label for="sort1">Sort By:</label>
        <select v-model="sortType1" name="sort1" id="sort1">
          <option v-for="name in sort1Options" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
        <label for="sort2">Then:</label>
        <select v-model="sortType2" name="sort2" id="sort2">
          <option v-for="name in sort2Options" :key="name" :value="name">
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
      filteredFrameworks: [] as string[],
      processedTimingResults: this.timingResults,
      defaultTimingResults: this.timingResults,
      tableColumnNames: [] as string[],
      sort1Options: [] as string[],
      sort2Options: [] as string[],
      sortType1: "",
      sortType2: "",
    };
  },
  props: {
    timingResults: Array as () => TimingResult[],
    frameworks: Set,
    metrics: Set,
  },

  mounted() {
    const timings: TimingResult[] = (this as any).timingResults ?? [];
    if (timings.length <= 0) {
      return [];
    }

    const tableColumnNames = Object.keys(timings[0]).filter(
      (columnName) => !["id", "created_at", "updated_at"].includes(columnName)
    );
    const sort1Options = tableColumnNames.filter((columnName) =>
      ["timing_type", "timing_framework"].includes(columnName)
    );
    const sort2Options = tableColumnNames.filter(
      (columnName) => !["timing_type", "timing_framework"].includes(columnName)
    );

    this.tableColumnNames = tableColumnNames;
    this.sort1Options = sort1Options;
    this.sort2Options = sort2Options;
    this.sortType1 = sort1Options[0];
    this.sortType2 = sort2Options[0];
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
      const sortType1 = this.sortType1 as ColumnType;
      const sortType2 = this.sortType2 as ColumnType;
      const filteredFrameworks = this.filteredFrameworks as string[];

      const filteredTimings = timings.filter(
        (timing) => !filteredFrameworks.includes(timing.timing_framework)
      );

      let sortMap: Map<string, TimingResult[]> = new Map();
      filteredTimings.forEach((item) => {
        const groupingName = item[sortType1] as string;

        if (sortMap.get(groupingName)) {
          // Why is typescript making me use ?
          sortMap.get(groupingName)?.push(item);
        } else {
          sortMap.set(groupingName, [item]);
        }
      });

      this.processedTimingResults = [...sortMap.values()]
        .map((item) => {
          item.sort(
            (a, b) => (a[sortType2] as number) - (b[sortType2] as number)
          );
          return item;
        })
        .reduce((acc, x) => {
          return acc.concat(x);
        }, []);
    },
  },

  watch: {
    sortType1() {
      this.processResults();
    },
    sortType2() {
      this.processResults();
    },
    filteredFrameworks() {
      this.processResults();
    },
    timingResults() {
      this.processResults();
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
