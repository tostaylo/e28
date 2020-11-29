<template>
  <div id="product-page">
    <h1>Product {{ id }}</h1>
    <show-product
      :key="product.id"
      :product="product"
      :showDetails="true"
    ></show-product>
    <button @click="addToCart">Add to Cart</button>
    <transition name="fade">
      <div class="alert" v-if="addAlert">Your cart has been updated!</div>
    </transition>
  </div>
</template>

<script>
import ShowProduct from "../ShowProduct.vue";
import { cart } from "@/app.js";

export default {
  name: "ProductPage",
  components: { "show-product": ShowProduct },
  props: ["id"], // comes from our dynamic segment
  data() {
    return { addAlert: false };
  },

  computed: {
    product() {
      return this.$store.getters.getProductById(this.id);
    },
  },
  methods: {
    addToCart() {
      cart.add(this.product.id);
      this.$store.commit("setCartCount", cart.count());
      // Confirmation
      this.addAlert = true;
      setTimeout(() => (this.addAlert = false), 2000);
    },
  },
};
</script>