import Cart from './cart.js';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		cartCount: 0,
		products: [],
	},
	mutations: {
		setCartCount(state, payload) {
			state.cartCount = payload;
		},
		setProducts(state, payload) {
			state.products = payload;
		},
	},
	actions: {
		fetchProducts(context) {
			fetch('http://e28-api.loc/product')
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					context.commit('setProducts', data.product);
				});
		},
	},
	getters: {
		getProductById(state) {
			return function(id) {
				return state.products.filter((product) => {
					return product.id == id;
				}, this.id)[0];
			};
		},
	},
});
export const cart = new Cart();
