<template>
  <div class="liked">
    <h1>Ranked Comparison Likes</h1>
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
</template>



<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return { rankedLikes: [] as [string[], number][] };
  },
  mounted() {
    fetch("http://e28-api.loc/like")
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          return null;
        }
        console.log(data);
        const comparisonNames = data.like.map(
          (aLike: { comparison_name: string }) => aLike.comparison_name
        );
        let countsObj: Record<string, number> = {};
        comparisonNames.forEach((comparisonName: string) => {
          if (countsObj[comparisonName]) {
            countsObj[comparisonName] += 1;
          } else {
            countsObj[comparisonName] = 1;
          }
        });
        console.log(countsObj);

        const ranked = Object.entries(countsObj)
          .sort((a, b) => b[1] - a[1])
          .map<[string[], number]>((item) => [item[0].split(","), item[1]]);

        console.log(ranked);

        this.rankedLikes = ranked;
      });
  },
});
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
}
</style>


