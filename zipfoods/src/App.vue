


<template>
  <div class="app" id="app">
    <img id="logo" alt="Vue logo" src="./assets/images/zipfoods-logo.png" />
    <p>
      ZipFoods is your one-stop-shop for convenient online grocery shopping in
      the greater Boston area.
    </p>
    <show-products></show-products>
  </div>
</template>

<script>
import ShowProducts from "./components/ShowProducts.vue";
export default {
  name: "App",
  components: { "show-products": ShowProducts },
};
</script>


<style lang='scss'>
@import "@/assets/scss/zipfoods.scss";
</style>
