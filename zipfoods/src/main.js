import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import ProductsPage from '@/components/pages/ProductsPage.vue';
import CategoriesPage from '@/components/pages/CategoriesPage.vue';
import CartPage from '@/components/pages/CartPage.vue';
import ProductPage from '@/components/pages/ProductPage.vue';
import { store } from './app.js';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
	routes: [
		{ path: '/', component: HomePage },
		{ path: '/products', component: ProductsPage },
		{ path: '/categories', component: CategoriesPage },
		{
			path: '/products/:id',
			component: ProductPage,
			props: (route) => ({ id: route.params.id }),
		},
		{ path: '/cart', component: CartPage },
	],
	mode: 'history',
});

new Vue({
	store,
	render: (h) => h(App),
	router,
}).$mount('#app');
