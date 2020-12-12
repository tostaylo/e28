import { createStore } from 'vuex';
import { TimingResult } from '@/types/index';

export default createStore({
	state: { user: null, timingResults: [] as TimingResult[] },
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},

		setTimingResult(state, payload) {
			state.timingResults = payload;
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
