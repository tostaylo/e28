import Main from './components/Main.vue';

var app = new Vue({
	el: '#app',
	components: { 'main-component': Main },
	template: `<main-component/>`,
});
