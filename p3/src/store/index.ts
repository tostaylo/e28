import { createStore } from 'vuex';

export default createStore({
	state: { user: null },
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
	},
	actions: {
		async authUser(context) {
			fetch(`${process.env.VUE_APP_API_URL}auth`, { method: 'POST', credentials: 'include' }).then(async (response) => {
				if (response.ok) {
					const data = await response.json();
					if (data.success && data.authenticated) {
						context.commit('setUser', data.user);
					}
				}
			});
		},
	},
	modules: {},
});
