import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index';
import { Pages } from '@/router/pages.ts';
const { HomePage, Frameworks, Metrics, Comparison, Timings, Liked, Account, AccessDenied, PageNotFound } = Pages;

const routes: Array<RouteRecordRaw> = [
	{
		path: HomePage.path,
		name: HomePage.name,
		component: Home,
	},
	{
		path: Frameworks.path,
		name: Frameworks.name,
		component: () => import(/* webpackChunkName: "Frameworks" */ '../views/Frameworks.vue'),
	},
	{
		path: Metrics.path,
		name: Metrics.name,
		component: () => import(/* webpackChunkName: "Metrics" */ '../views/Metrics.vue'),
	},
	{
		path: Comparison.path,
		name: Comparison.name,
		component: () => import(/* webpackChunkName: "Comparison" */ '../views/Comparison.vue'),
	},
	{
		path: Timings.path,
		name: Timings.name,
		component: () => import(/* webpackChunkName: "Timings" */ '../views/Timings.vue'),
	},
	{
		path: Liked.path,
		name: Liked.name,
		component: () => import(/* webpackChunkName: "Liked" */ '../views/Liked.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: Account.path,
		name: Account.name,
		component: () => import(/* webpackChunkName: "Account" */ '../views/Account.vue'),
	},
	{
		// This is a route we can direct the user to if they try to access a part of the site they don't have privileges for
		path: AccessDenied.path,
		name: AccessDenied.name,
		component: () => import(/* webpackChunkName: "AccessDenied" */ '@/views/AccessDenied.vue'),
	},
	{
		path: PageNotFound.path,
		name: PageNotFound.name,
		component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/PageNotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// beforeEach provides a way to execute some code before a route is resolved
// Ref: https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	await store.dispatch('authUser');

	if (requiresAuth && !store.state.user) {
		next('/denied');
	} else {
		next();
	}
});

export default router;
