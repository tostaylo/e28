<template>
  <div class="frameworks">
    <h1>Frameworks</h1>
    <ul>
      <li v-for="value in frameworks.values()" :key="value">
        <router-link :to="`/framework/${value}`">{{ value }}</router-link>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { TimingResult } from "../types/index";
export default {
  props: { frameworks: new Set() as Set<TimingResult["timing_framework"]> }
};
</script>