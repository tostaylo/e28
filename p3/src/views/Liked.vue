<template>
  <div class="route-main">
    <h1>Ranked Comparison Likes</h1>
    <div class="list-container">
      <ul>
        <li v-for="like in rankedLikes" :key="like">
          <span>
            <span v-for="(item, index) in like[0]" :key="item">
              {{ item }}
              <!-- eslint-disable-next-line vue/no-parsing-error-->
              {{ index < like[0].length - 1 ? " vs " : null }}
            </span></span
          ><span>{{ like[1] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent } from "vue";
import { fetchData } from "@/utils/index";
import { User } from "../types/index";

export default defineComponent({
  data() {
    return { rankedLikes: [] as [string[], number][] };
  },
  async mounted() {
    const data = await fetchData<{
      success: boolean;
      errors: boolean;
      like: { comparison_name: string }[];
    }>(`${process.env.VUE_APP_API_URL}like`);

    const comparisonNames = data?.like.map(
      (aLike: { comparison_name: string }) => aLike.comparison_name
    );
    let countsObj: Record<string, number> = {};
    comparisonNames?.forEach((comparisonName: string) => {
      if (countsObj[comparisonName]) {
        countsObj[comparisonName] += 1;
      } else {
        countsObj[comparisonName] = 1;
      }
    });

    const ranked = Object.entries(countsObj)
      .sort((a, b) => b[1] - a[1])
      .map<[string[], number]>((item) => [item[0].split(","), item[1]]);

    this.rankedLikes = ranked;
  },
  computed: {
    user(): User {
      return this.$store.state.user;
    },
  },
});
</script>

<style scoped>
.list-container {
  width: 100%;
  overflow: auto;
}

ul {
  min-width: 600px;
}

li {
  display: flex;
  justify-content: space-between;
}
</style>


