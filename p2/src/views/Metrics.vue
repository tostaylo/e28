<template>
  <div class="metrics">
    <h1>Metrics</h1>
    <ul>
      <li v-for="value in metrics.values()" :key="value">
        {{ value }}
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import { TimingResult } from "../types/index";

export default {
  props: { metrics: new Set() as Set<TimingResult["timing_type"]> },
};
</script>