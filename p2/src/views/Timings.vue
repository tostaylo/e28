<template>
  <div class="route-main">
    <h1>Timings</h1>
    <page-list :displayObject="timings"></page-list>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import PageList from "@/components/PageList.vue";

export default {
  components: { "page-list": PageList },
  props: { timings: Object as () => Record<string, Definition> },
};
</script>