<template>
  <div class="route-main">
    <h1>Frameworks</h1>
    <ul>
      <li v-for="value in frameworks.values()" :key="value">
        {{ value }}
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { TimingResult } from "../types/index";
export default {
  props: { frameworks: new Set() as Set<TimingResult["timing_framework"]> },
};
</script>