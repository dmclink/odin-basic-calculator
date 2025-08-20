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

		// an array of strings
		// represents the 0-2 parameters the user inputted. maximum length is 2
		// if "empty" (0 parameters), will have an empty string. if an operator has been
		// inputted, will have at least an empty string at index 1
		this.params = [''];

		// the operator the user has inputted
		this.operator = null;

		// represents whether the decimal has been pressed once for the current param.
		// if pressed, coincides with a disabled dot button until cleared or calculated
		// flips back to false if in any way the decimal is removed from the current param
		this.dotPressed = false;
	}

	/** Appends the incoming val to the top index in params.
	 * Overwrites or otherwise prevents leading zeroes.
	 *
	 * @param {string} val - the user inputted number as a string
	 * @returns
	 */
	updateParams(val) {
		const idx = this.params.length - 1;
		if (this.params[idx] === '0' && val === '0') {
			// don't allow leading zeroes
			return;
		}
		if (this.params[idx] === '0') {
			this.params[idx] = val;
			return;
		}

		this.params[idx] = `${this.params[idx]}${val}`;
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
		console.log(val);
		switch (val) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.updateParams(val);
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
