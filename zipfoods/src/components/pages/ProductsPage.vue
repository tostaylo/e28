<script>
import ShowProduct from "../ShowProduct.vue";
export default {
  name: "ShowProductsPage",
  components: { "show-product": ShowProduct },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>


<template>
  <div id="products">
    <h2>Products</h2>
    <show-product
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></show-product>
  </div>
</template>