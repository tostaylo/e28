<template>
  <div class="metrics">
    <h1>Metrics</h1>
    <ul>
      <li v-for="value in metrics.values()" :key="value">
        <router-link :to="`/metric/${value}`">{{ value }}</router-link>
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import { TimingResult } from "../types/index";

export default {
  props: { metrics: new Set() as Set<TimingResult["timing_type"]> }
};
</script>