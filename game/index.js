/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-tabs */
/* eslint-disable indent */

const guessed = [];
let counter = 0;
let secretWord = [];

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderWord(letterMap) {
	const wordDiv = document.getElementById('secretWord');
	const letterSpans = letterMap.map(([letter, isGuessed]) => `<span>${isGuessed ? letter : '_'}</span>`).join('');
	wordDiv.innerHTML = letterSpans;
}

function calculateGuess(word) {
	const letterMap = word.map((letter) => [letter, guessed.includes(letter)]);

	// eslint-disable-next-line no-unused-vars
	return [letterMap.every(([_letter, isGuessed]) => isGuessed), letterMap];
}

async function handleGuess() {
	const guessInput = document.getElementById('guess');

	// This condition handles repeat guesses.
	if (!guessed.includes(guessInput.value) && secretWord.includes(guessInput.value)) {
		guessed.push(guessInput.value);
		guessInput.value = '';

		const [isWordGuessed, letterMap] = calculateGuess(secretWord);
		renderWord(letterMap);

		if (isWordGuessed) {
			await timeout(500);

			if (confirm('You Won! Play Again?')) {
				window.location.reload();
			}
		}
	} else {
		counter += 1;
		document.getElementById('strikes').innerText = (6 - counter).toString();
		guessInput.value = '';

		if (counter >= 6) {
			await timeout(500);

			if (confirm('You Lost. Play Again?')) {
				window.location.reload();
			}
		}
	}
}

function start() {
	const words = [
		'bats',
		'barbells',
		'antelope',
		'avenger',
		'snack',
		'session',
		'frostbite',
		'purple',
		'detroit',
		'catacomb',
		'invisible',
	];
	const submitButton = document.getElementById('submit');
	secretWord = words[Math.floor(Math.random() * words.length + 0)].split('');

	// eslint-disable-next-line no-unused-vars
	const [_isWordGuessed, letterMap] = calculateGuess(secretWord);
	renderWord(letterMap);
	submitButton.addEventListener('click', () => handleGuess());
}
start();
