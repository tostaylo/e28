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
		props: { frameworks: new Set() },
	},
	{
		path: '/metrics',
		name: 'Metrics',
		component: () => import(/* webpackChunkName: "Metrics" */ '../views/Metrics.vue'),
		props: { metrics: new Set() },
	},
	{
		path: '/comparison',
		name: 'Comparison',
		component: () => import(/* webpackChunkName: "Comparison" */ '../views/Comparison.vue'),
		props: { timingResults: [] as TimingResult[] },
	},
	{
		path: '/metric/:id',
		name: 'Metric',
		component: () => import(/* webpackChunkName: "Metric" */ '../views/Metric.vue'),
		props: true,
	},
	{
		path: '/framework/:id',
		name: 'Framework',
		component: () => import(/* webpackChunkName: "Framework" */ '../views/Framework.vue'),
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
