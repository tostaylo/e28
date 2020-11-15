<template>
  <ul>
    <li v-for="value in displayObject" :key="value">
      <h3>{{ value.display_name }}</h3>
      <p>{{ value.definition }}</p>
    </li>
  </ul>
</template>



<script lang="ts">
import { Definition } from "../types/index";

export default {
  props: { displayObject: Object as () => Record<string, Definition> },
};
</script>