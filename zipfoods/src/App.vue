


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
            <span v-if="link == 'cart'">({{ store.cartCount }})</span
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
import { store, cart } from "./app.js";

export default {
  name: "App",

  mounted() {
    store.cartCount = cart.count(); // <-- NEW
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
      store: store,
    };
  },
};
</script>


<style lang='scss'>
@import "@/assets/scss/zipfoods.scss";
</style>
