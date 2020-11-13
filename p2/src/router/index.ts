import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { TimingResult } from '@/types/index';

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
		path: '/liked',
		name: 'Liked',
		component: () => import(/* webpackChunkName: "Comparison" */ '../views/Liked.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
