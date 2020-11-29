<template>
  <div>
    <p>
      ZipFoods is your one-stop-shop for convenient online grocery shopping in
      the greater Boston area.
    </p>
    <show-featured :products="products" :category="'snacks'"></show-featured>
  </div>
</template>

<script>
import ShowFeatured from "../ShowFeatured.vue";
export default {
  name: "HomePage",
  components: { "show-featured": ShowFeatured },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style>
</style>