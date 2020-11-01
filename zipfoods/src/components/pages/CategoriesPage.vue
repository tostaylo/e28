<template>
  <div>
    <h2>Categories</h2>
    <ul class="cleanList">
      <li v-for="(category, id) in categories" :key="id">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Categories",
  props: ["products"],
  computed: {
    categories() {
      let categories = this.products.map((product) => product.categories);
      let mergedCategories = [].concat.apply([], categories);

      // Return unique, sorted categories
      return [...new Set(mergedCategories)].sort();
    },
  },
};
</script>

