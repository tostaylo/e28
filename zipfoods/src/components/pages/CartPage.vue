<template>
  <div id="cart-page">
    <h1>Your Cart</h1>

    <div v-if="items.length == 0">No items</div>

    <ul class="cleanList" v-if="productsLoaded">
      <li v-for="item in items" :key="item.id">
        {{ item.quantity }} x {{ getProductDetails(item.id).name }}
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { store, cart } from "../../app.js";
console.log(store, cart);
export default {
  props: ["products"],
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = cart.getItems();
  },
  computed: {
    productsLoaded() {
      return this.products.length > 0;
    },
  },
  methods: {
    getProductDetails(id) {
      return this.products.filter((product) => {
        return product.id == id;
      }, id)[0];
    },
    removeFromCart(id) {
      cart.remove(id);
      store.cartCount = this.cart.count(); // <-- NEW
    },
  },
};
</script>