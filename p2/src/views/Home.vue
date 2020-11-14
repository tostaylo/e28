<template>
  <div class="route-main">
    <Main />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Main from "@/components/Main.vue"; // @ is an alias to /src

@Options({
  components: {
    Main,
  },
})
export default class Home extends Vue {}
</script>
