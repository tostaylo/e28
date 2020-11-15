<template>
  <div class="route-main">
    <h1>frameworks</h1>
    <ul>
      <li v-for="value in frameworks" :key="value">
        <h3>{{ value.display_name }}</h3>
        <p>{{ value.definition }}</p>
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";

export default {
  props: { frameworks: Object as () => Record<string, Definition> },
};
</script>