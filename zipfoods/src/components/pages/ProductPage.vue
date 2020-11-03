<template>
  <div id="product-page">
    <h1>Product {{ id }}</h1>
    <show-product
      :key="product.id"
      :product="product"
      :showDetails="true"
    ></show-product>
  </div>
</template>

<script>
import ShowProduct from "../ShowProduct.vue";
export default {
  name: "ProductPage",
  components: { "show-product": ShowProduct },
  props: ["id", "products"], // comes from our dynamic segment
  computed: {
    product() {
      return this.products[this.id - 1];
    },
  },
};
</script>