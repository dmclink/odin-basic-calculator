/** Adds a and b.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} - result of adding a and b
 */
function add(a, b) {
	return a + b;
}

/** Subtracts b from a.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} - result of subtracting b from a
 */
function subtract(a, b) {
	return a - b;
}

/** Multiplies a by b
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} - result of multiplying a by b
 */
function multiply(a, b) {
	return a * b;
}

/** Divides a by b.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number|'a black hole appears'}- result of dividing a by b
 */
function divide(a, b) {
	if (b === 0) {
		return 'a black hole appears';
	}
	return a / b;
}

class Calculator {
	constructor() {
		this.display = document.querySelector('#display');
		this.displayString = '';
		this.params = [];
		this.operator = null;
		this.input = '';
		this.dotPressed = false;
	}

	/** Calls the appropriate function or updates params depending on the button pressed.
	 * Number buttons will be concatenated with the top param.
	 * Operators will either start a new param or result in calculation if an operator already exists.
	 * Equal sign will result in calculation.
	 * mc will clear all params and operators.
	 *
	 * @param {string} val - the value of the button that was pressed
	 */
	buttonPress(val) {
		switch (val) {
			case ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'):
				//TODO:
				break;

			case ('+', '-', '*', '/'):
				//TODO:
				break;

			case '=':
				//TODO:
				break;

			case 'mc':
				//TODO:
				break;

			case '.':
				//TODO:
				break;
		}
	}
}

const calc = new Calculator();

const calcElement = document.querySelector('#calculator');
calcElement.addEventListener('click', (e) => {
	if (e.target.classList.contains('btn')) {
		calc.buttonPress(e.target.textContent);
	}
});
