<script>
import ShowProduct from "./ShowProduct.vue";
export default {
  name: "ShowProducts",
  components: { "show-product": ShowProduct },
  props: ["products"],
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