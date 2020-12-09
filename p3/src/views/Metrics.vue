<template>
  <div class="route-main">
    <h1>Metrics</h1>
    <page-list :displayObject="metrics"></page-list>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import PageList from "@/components/PageList.vue";

export default {
  components: { "page-list": PageList },
  props: { metrics: Object as () => Record<string, Definition> },
};
</script>

<style scoped>
.route-main {
  text-align: left;
}
</style>