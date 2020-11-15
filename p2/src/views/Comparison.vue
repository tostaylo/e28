<template>
  <div class="route-main">
    <h1>Comparison</h1>
    <div class="form-container">
      <div class="form">
        <check-boxes
          :key="item.name"
          :name="item.name"
          v-for="item in checkboxes"
          :typeArr="item.typeArr"
          :filteredArr="item.filteredArr"
          :handleCheckbox="handleCheckbox"
        ></check-boxes>

        <div class="sort-container">
          <sort-select
            v-on:select-change="handleSelect"
            v-for="item in sortSelects"
            :key="item.name"
            :name="item.name"
            :label="item.label"
            :options="item.options"
            :sortType="item.sortType"
          ></sort-select>
        </div>
        <div class="like-button-container">
          <button @click="addLike">Like</button>
        </div>
      </div>
    </div>
    <results-table
      :processedTimingResults="processedTimingResults"
      :tableColumnNames="tableColumnNames"
    ></results-table>
  </div>
</template>


<script lang="ts">
import { TimingResult, Definition } from "../types/index";
import Table from "@/components/Table.vue";
import Checkboxes from "@/components/Checkboxes.vue";
import SortSelect from "@/components/SortSelect.vue";
import { defineComponent } from "vue";

type ColumnType =
  | "total_dur"
  | "render_during_click"
  | "timing_framework"
  | "render_after_click"
  | "click_dur"
  | "timing_type";

const Component = defineComponent({
  components: {
    "results-table": Table,
    "check-boxes": Checkboxes,
    "sort-select": SortSelect,
  },

  data() {
    return {
      filteredFrameworks: [] as string[],
      filteredMetrics: [] as string[],
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
    timingResults: { type: Array as () => TimingResult[], default: [] },
    frameworks: {
      type: Object as () => Record<string, Definition>,
      default: {},
    },
    metrics: { type: Object as () => Record<string, Definition>, default: {} },
    timings: { type: Object as () => Record<string, Definition>, default: {} },
  },

  mounted() {
    const sort1Options = ["timing_type", "timing_framework"];

    const tableColumnNames = Object.keys(this.timingResults[0]).filter(
      (item) => !["id", "created_at", "updated_at"].includes(item)
    );
    const sort2Options = tableColumnNames.filter(
      (item) => !sort1Options.includes(item)
    );
    this.tableColumnNames = tableColumnNames;
    this.sort1Options = sort1Options;
    this.sort2Options = sort2Options;
    this.sortType1 = sort1Options[0];
    this.sortType2 = sort2Options[0];
  },
  methods: {
    handleSelect(e: { value: string; sortType: string }) {
      (this as any)[e.sortType] = e.value;
    },

    addLike() {
      const likedComparison = Object.keys(this.frameworks)
        .filter(
          (framework: string) => !this.filteredFrameworks.includes(framework)
        )
        .sort((a, b) => a.localeCompare(b))
        .join(",");

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

    handleCheckbox(e: any, checkboxType: string) {
      const data =
        checkboxType === "framework" ? "filteredFrameworks" : "filteredMetrics";

      if (this[data].includes(e.target.name)) {
        this[data] = this[data].filter(
          (framework) => framework !== e.target.name
        );
      } else {
        this[data] = [...this[data], e.target.name] as string[];
      }
    },
    processResults() {
      const sortType1 = this.sortType1 as ColumnType;
      const sortType2 = this.sortType2 as ColumnType;
      const filteredFrameworks = this.filteredFrameworks as string[];
      const filteredMetrics = this.filteredMetrics as string[];

      const filteredTimings = this.timingResults
        .filter(
          (timing) => !filteredFrameworks.includes(timing.timing_framework)
        )
        .filter((timing) => !filteredMetrics.includes(timing.timing_type));

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
    filteredMetrics() {
      this.processResults();
    },
    timingResults() {
      this.processResults();
    },
  },

  computed: {
    checkboxes(): any {
      return [
        {
          name: "metric",
          filteredArr: this.filteredMetrics,
          typeArr: Object.keys(this.metrics),
        },
        {
          name: "framework",
          filteredArr: this.filteredFrameworks,
          typeArr: Object.keys(this.frameworks),
        },
      ];
    },
    sortSelects(): any {
      return [
        {
          name: "sortType1",
          options: this.sort1Options,
          label: "Sort By",
          sortType: this.sortType1,
        },
        {
          name: "sortType2",
          options: this.sort2Options,
          label: "Then",
          sortType: this.sortType2,
        },
      ];
    },
  },
});
export default Component;
</script>



<style scoped>
.form-container {
  width: 100%;
  overflow: auto;
}
.form {
  display: inline-grid;
  grid-template-columns: 20% 20% 45% 15%;
  margin-bottom: 20px;
  min-width: 1200px;
  width: 100%;
}

.sort-container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 20px;
}

.like-button-container {
  display: flex;
  justify-content: flex-end;
}

button {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  font-weight: 300;
  color: black;
  background-color: lightgray;
  text-align: center;
  transition: all 0.2s;
  width: 70%;
  height: 40px;
}

button:hover {
  background-color: darkgray;
}
</style>
