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
			return new Promise((resolve: (value: unknown) => void) => {
				fetch(`${process.env.VUE_APP_API_URL}auth`, { method: 'POST', credentials: 'include' }).then(
					async (response) => {
						const data = await response.json();

						if (data.authenticated) {
							context.commit('setUser', data.user);
						} else {
							context.commit('setUser', null);
						}

						resolve(null);
					}
				);
			});
		},
	},
	modules: {},
});
