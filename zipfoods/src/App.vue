


<template>
  <div class="app" id="app">
    <nav>
      <ul>
        <li>
          <router-link
            v-for="link in links"
            v-bind:key="link"
            v-bind:to="paths[link]"
            exact
          >
            <span v-if="link == 'cart'">({{ cartCount }})</span
            >{{ link }}</router-link
          >
        </li>
      </ul>
    </nav>
    <img id="logo" alt="Vue logo" src="./assets/images/zipfoods-logo.png" />
    <router-view></router-view>
  </div>
</template>

<script>
import { cart } from "./app.js";

export default {
  name: "App",

  mounted() {
    this.$store.dispatch("fetchProducts");
    this.$store.commit("setCartCount", cart.count());
  },
  data() {
    return {
      links: ["home", "products", "categories", "cart"],
      paths: {
        home: "/",
        products: "/products",
        categories: "/categories",
        cart: "/cart",
      },
    };
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
};
</script>


<style lang='scss'>
@import "@/assets/scss/zipfoods.scss";
</style>
