<template>
  <div class="route-main">
    <h1>Frameworks</h1>
    <page-list :displayObject="frameworks"></page-list>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import PageList from "@/components/PageList.vue";

export default {
  components: { "page-list": PageList },
  props: { frameworks: Object as () => Record<string, Definition> },
};
</script>

<style scoped>
.route-main {
  text-align: left;
}
</style>