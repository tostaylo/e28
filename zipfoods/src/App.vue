


<template>
  <div class="app" id="app">
    <img id="logo" alt="Vue logo" src="./assets/images/zipfoods-logo.png" />
    <p>
      ZipFoods is your one-stop-shop for convenient online grocery shopping in
      the greater Boston area.
    </p>
    <show-featured :products="products" :category="'snacks'"></show-featured>
    <show-products :products="products"></show-products>
  </div>
</template>

<script>
import ShowProducts from "./components/ShowProducts.vue";
import ShowFeatured from "./components/ShowFeatured.vue";
import { products } from "@/products.js";

export default {
  name: "App",
  components: { "show-products": ShowProducts, "show-featured": ShowFeatured },
  data() {
    return {
      products,
    };
  },
};
</script>


<style lang='scss'>
@import "@/assets/scss/zipfoods.scss";
</style>
