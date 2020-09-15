/* eslint-disable no-tabs */
/* eslint-disable indent */
const words = ['antelope', 'avenger'];
const guessed = [];
let secretWord = '';

function handleGuess() {
	const guessInput = document.getElementById('guess');
	if (guessed.length < 6) {
		if (guessInput.value && guessInput.value === secretWord) {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('You Won! Play Again?')) {
				window.location.reload();
			}
		} else {
			guessed.push(guessInput.value);
			document.getElementById('strikes').innerText = (6 - guessed.length).toString();
		}
	}

	guessInput.value = '';
}

function start() {
	console.log('we good');

	const submitButton = document.getElementById('submit');
	const [pickedWord] = words;
	secretWord = pickedWord;
	const splitWord = words[0].split('');
	const letterMap = splitWord.map((letter) => [letter, false]);
	const wordDiv = document.getElementById('secretWord');
	const letterSpans = letterMap.map(([letter, isGuessed]) => `<span>${isGuessed ? letter : '_'}</span>`).join('');
	wordDiv.innerHTML = letterSpans;

	submitButton.addEventListener('click', () => handleGuess());
}
start();
