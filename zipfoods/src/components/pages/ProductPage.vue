<template>
  <div id="product-page">
    <h1>Product {{ id }}</h1>
  </div>
</template>

<script>
export default {
  props: ["id"], // comes from our dynamic segment
  data() {
    return {};
  },
};
</script>