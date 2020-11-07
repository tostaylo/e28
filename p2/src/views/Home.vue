<template>
  <div class="home">
    {{ stats }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  props: ["stats"],
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
