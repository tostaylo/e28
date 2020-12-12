import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index';

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
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import(/* webpackChunkName: "Account" */ '../views/Account.vue'),
	},
	{
		// This is a route we can direct the user to if they try to access a part of the site they don't have privileges for
		path: '/denied',
		component: () => import(/* webpackChunkName: "AccessDeniedPage" */ '@/views/AccessDeniedPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// beforeEach provides a way to execute some code before a route is resolved
// Ref: https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(async (to, from, next) => {
	// Exact the meta information from our routes
	// Ref: https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !store.state.user) {
		// If they’re trying to access a requiresAuth route and they're not logged in, they get sent to "Access Denied" page
		next('/denied');
	} else {
		// In all other circumstances, send them to the route they requested
		next();
	}
});

export default router;
