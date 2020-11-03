<script>
export default {
  name: "ShowProduct",
  props: ["product", "showDetails"],
};
</script>


<template>
  <div class="product">
    <router-link :to="`/products/${product.id}`">
      <div class="product-name">{{ product.name }}</div>
      <img
        class="product-thumb"
        :src="require(`@/assets/images/products/${product.id}.jpg`)"
      />
      <div v-if="showDetails">
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">${{ product.price }}</div>
      </div>
    </router-link>
  </div>
</template>