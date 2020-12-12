<template>
  <div class="route-main">
    <h1>Comparison</h1>
    <div class="form-container">
      <div class="form">
        <div class="throttle-container">
          <sort-select
            v-on:select-change="handleSelect"
            :name="throttledSelect.name"
            :label="throttledSelect.label"
            :options="throttledSelect.options"
            :sortType="throttledSelect.sortType"
          ></sort-select>
        </div>
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
          <button v-if="!isLiked" @click="addLike">Like</button>
          <router-link class="liked-link" v-else to="/liked"
            >Check out the ranked comparisons.</router-link
          >
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
import { fetchData } from "@/utils/index";
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
      defaultTimingResults4x: [] as TimingResult[],
      tableColumnNames: [] as string[],
      sort1Options: [] as string[],
      sort2Options: [] as string[],
      sortType1: "",
      sortType2: "",
      throttledSelectType: "No throttle",
      isLiked: false,
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

  async mounted() {
    const names = Object.values(this.timings).map((item) => item.display_name);
    const sort1Options = names.slice(0, 2);
    const sort2Options = names.slice(2);

    this.tableColumnNames = names;
    this.sort1Options = sort1Options;
    this.sort2Options = sort2Options;
    this.sortType1 = sort1Options[0];
    this.sortType2 = sort2Options[0];

    this.defaultTimingResults4x = (await fetchData<TimingResult[]>(
      "/trace_results.4x_slowdown.json"
    )) as TimingResult[];
  },
  methods: {
    handleSelect(e: { value: string; sortType: string }) {
      (this as any)[e.sortType] = e.value;
    },

    addLike() {
      this.isLiked = true;

      // Keep in alphabetical order for string comparison and consistency
      const likedComparison = Object.keys(this.frameworks)
        .filter(
          (framework: string) => !this.filteredFrameworks.includes(framework)
        )
        .sort((a, b) => a.localeCompare(b))
        .join(",");

      fetch(`${process.env.VUE_APP_API_URL}like`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ comparison_name: likedComparison }),
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    },

    handleCheckbox(e: { target: { name: string } }, checkboxType: string) {
      const data =
        checkboxType === "framework" ? "filteredFrameworks" : "filteredMetrics";

      // Display names differ from data name.
      // For display we use display_name, for sorting and filtering we use the raw data name.
      if (this[data].includes(e.target.name)) {
        this[data] = this[data].filter(
          (framework) => framework !== e.target.name
        );
      } else {
        this[data] = [...this[data], e.target.name] as string[];
      }
    },
    getSortType(
      k_v_Arr: [k: string, v: { display_name: string }][],
      sortType: string
    ): string {
      return k_v_Arr.filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_k, v]) => v.display_name === sortType
      )[0][0] as ColumnType;
    },

    getSortMap(
      filteredTimings: TimingResult[],
      sortType: string
    ): Map<string, TimingResult[]> {
      let sortMap: Map<string, TimingResult[]> = new Map();

      filteredTimings.forEach((item) => {
        const groupingName = item[sortType as "timing_framework"] as string;

        if (sortMap.get(groupingName)) {
          // Why is typescript making me use ? when we are already in this if block?
          sortMap.get(groupingName)?.push(item);
        } else {
          sortMap.set(groupingName, [item]);
        }
      });

      return sortMap;
    },

    getSortedResults(sortMap: Map<string, TimingResult[]>, sortType: string) {
      return [...sortMap.values()]
        .map((item) => {
          item.sort(
            (a, b) =>
              (a[sortType as "total_dur"] as number) -
              (b[sortType as "total_dur"] as number)
          );
          return item;
        })
        .reduce((acc, x) => {
          return acc.concat(x);
        }, []);
    },

    getFilteredTimings(timingResults: TimingResult[]): TimingResult[] {
      const filteredFrameworks = this.filteredFrameworks as string[];
      const filteredMetrics = this.filteredMetrics as string[];

      return timingResults
        .filter(
          (timing) => !filteredFrameworks.includes(timing.timing_framework)
        )
        .filter((timing) => !filteredMetrics.includes(timing.timing_type));
    },

    // Handles all the filtering from checkboxes and selects
    processResults() {
      // Display names differ from data name.
      // For display we use display_name, for sorting and filtering we use the raw data name.
      // Can these sort types be computed?
      const timingsArr = Object.entries(this.timings);
      const sortType1 = this.getSortType(timingsArr, this.sortType1);
      const sortType2 = this.getSortType(timingsArr, this.sortType2);

      const timingResults =
        this.throttledSelectType === "No throttle"
          ? this.timingResults
          : this.defaultTimingResults4x;

      this.processedTimingResults = this.getSortedResults(
        this.getSortMap(this.getFilteredTimings(timingResults), sortType1),
        sortType2
      );
    },
  },

  watch: {
    throttledSelectType() {
      this.processResults();
    },
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
    checkboxes(): { name: string; filteredArr: string[]; typeArr: string[] }[] {
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
    sortSelects(): {
      name: string;
      options: string[];
      label: string;
      sortType: string;
    }[] {
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

    throttledSelect(): {
      name: string;
      options: string[];
      label: string;
      sortType: string;
    } {
      return {
        name: "throttledSelectType",
        options: ["No throttle", "4x slowdown"],
        label: "Throttled CPU",
        sortType: this.throttledSelectType,
      };
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
  grid-template-columns: 20% 20% 20% 20% 20%;
  margin-bottom: 20px;
  min-width: 1200px;
  width: 100%;
}

.throttle-container {
  justify-content: flex-start;
  display: flex;
}

.sort-container {
  display: grid;
  grid-template-columns: 100%;
}

.like-button-container {
  visibility: hidden;
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

.liked-link {
  text-underline-position: under;
}
</style>
