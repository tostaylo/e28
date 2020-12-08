import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/frameworks',
		name: 'Frameworks',
		component: () => import(/* webpackChunkName: "Frameworks" */ '../views/Frameworks.vue'),
	},
	{
		path: '/metrics',
		name: 'Metrics',
		component: () => import(/* webpackChunkName: "Metrics" */ '../views/Metrics.vue'),
	},
	{
		path: '/comparison',
		name: 'Comparison',
		component: () => import(/* webpackChunkName: "Comparison" */ '../views/Comparison.vue'),
	},
	{
		path: '/timings',
		name: 'Timings',
		component: () => import(/* webpackChunkName: "Timings" */ '../views/Timings.vue'),
	},
	{
		path: '/liked',
		name: 'Liked',
		component: () => import(/* webpackChunkName: "Liked" */ '../views/Liked.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
