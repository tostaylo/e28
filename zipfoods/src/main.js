import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import ProductsPage from '@/components/pages/ProductsPage.vue';
import CategoriesPage from '@/components/pages/CategoriesPage.vue';
import CartPage from '@/components/pages/CartPage.vue';
import ProductPage from '@/components/pages/ProductPage.vue';
import { products } from '@/products.js';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
	routes: [
		{ path: '/', component: HomePage, props: { products } },
		{ path: '/products', component: ProductsPage, props: { products } },
		{ path: '/categories', component: CategoriesPage, props: { products } },
		{
			path: '/products/:id',
			component: ProductPage,
			props: (route) => ({ id: route.params.id, products }),
		},
		{ path: '/cart', component: CartPage, props: { products } },
	],
	mode: 'history',
});

new Vue({
	render: (h) => h(App),
	router,
}).$mount('#app');
