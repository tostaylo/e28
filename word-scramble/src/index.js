import GuessMessage from './components/GuessMessage.vue';

var app = new Vue({
	el: '#app',
	data: function () {
		return this.initialState();
	},
	components: { 'guess-message': GuessMessage },
	methods: {
		startGame() {
			this.name = this.inputVal;
			this.inputVal = '';
		},
		submitGuess() {
			this.guesses.push(this.inputVal);

			if (this.inputVal == this.mysteryWords[0][0]) {
				this.gameState = { won: true, lost: false };
			} else {
				if (this.guesses.length > 2) {
					this.gameState = { won: false, lost: true };
				}
			}

			this.inputVal = '';
		},

		initialState() {
			return {
				inputVal: '',
				name: '',
				mysteryWords: [['howdy', 'this is a howdy hint']],
				gameState: { won: null, lost: null },
				guesses: [],
			};
		},

		resetState() {
			Object.assign(this.$data, this.initialState());
		},
	},
	computed: {
		label: function () {
			return this.name ? 'Guess Word' : 'Name';
		},
		submitFn: function () {
			return this.name ? this.submitGuess : this.startGame;
		},
		guessMessage: function () {
			return this.gameState.won ? 'You Won' : 'Please Try Again';
		},
	},
	template: `
					<div class="main">
					  <h1>Word Scramble</h1>
					  <div v-if="name">
					      <p> Welcome {{name}}</p>
					      <div><strong>{{mysteryWords[0][0]}}</strong></div>
					      <p>{{mysteryWords[0][1]}}</p>
					  </div>
					      <label>{{label}}
					        <input v-show="gameState.won === null || gameState.lost === null" type="text" v-on:keyup.enter="submitFn" v-model="inputVal"/>
					      </label>
			      <guess-message
              v-on:reset-state='resetState' 
              v-bind:gameState='gameState' 
              v-bind:guesses='guesses'
            >
            {{guessMessage}}
            </guess-message>
					</div>`,
});
