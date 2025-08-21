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

/** Removes all child nodes from HTML element.
 *
 * @param {HTMLElement} parent - the element that will have all its child nodes removed
 */
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/** Creates and returns a span with class .sup and textcontent "-"
 *
 * @returns {HTMLElement} - the newly created span
 */
function createSupMinus() {
	const newSpan = document.createElement('span');
	newSpan.classList.add('sup');
	newSpan.textContent = '-';
	return newSpan;
}

/** Returns string with trimmed sign '-' from front of string if present.
 * Otherwise returns original string.
 *
 * @param {string} s - the string to trim
 * @returns the trimmed string
 */
function trimSign(s) {
	if (s === '') {
		return s;
	}

	if (s[0] === '-') {
		return s.slice(1);
	}

	return s;
}

class Calculator {
	constructor() {
		this.display = document.querySelector('#display');
		this.dotBtn = document.querySelector('#btn--dot');

		// an array of strings
		// represents the 0-2 parameters the user inputted. maximum length is 2
		// if "empty" (0 parameters), will have an empty string. if an operator has been
		// inputted, will have at least an empty string at index 1
		this.params = [''];

		// the operator the user has inputted
		this.operator = null;

		// represents whether the decimal has been pressed once for the current param.
		// if pressed, dot button disabled until cleared, backspaced, or calculated.
		// flips back to false if in any way the decimal is removed from the current param
		this.dotBtn.disabled = false;
	}

	/** Appends the incoming val to the top index in params.
	 * Overwrites or otherwise prevents leading zeroes.
	 *
	 * @param {'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'} val - the user inputted number as a string
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

	/** Updates the display with a string of the currently inputted params and operator. */
	updateDisplay() {
		removeAllChildNodes(this.display);
		if (this.params[0] === '') {
			// keep display style from collapsing on empty
			this.display.textContent = '\u00A0';
			return;
		}

		if (this.params[0][0] === '-') {
			this.display.appendChild(createSupMinus());
		}
		this.display.appendChild(document.createTextNode(trimSign(this.params[0])));

		if (this.operator === null) {
			return;
		}
		this.display.appendChild(document.createTextNode(` ${this.operator}`));

		if (this.params[1] === '') {
			return;
		}

		if (this.params[1][0] === '-') {
			this.display.appendChild(createSupMinus());
		}
		this.display.appendChild(
			document.createTextNode(` ${trimSign(this.params[1])}`)
		);
	}

	/** Updates the current operator if at least one param has been entered.
	 * If no params entered it does nothing. If two params entered it calls calculate.
	 *
	 * @param {'+'|'-'|'*'|'/'} val - the user inputted operator
	 * @returns
	 */
	updateOperator(val) {
		if (this.params.length === 1 && this.params[0] === '') {
			// param hasn't been entered yet, ignore this button press
			return;
		}

		if (this.params.length === 1) {
			this.operator = val;
			this.params.push('');

			this.dotBtn.disabled = false;

			// clear trailing . and 0s
			this.params[0] = String(Number(this.params[0]));
		} else if (this.params[1] === '') {
			// overwrites the current operator
			this.operator = val;
		} else {
			this.calculate();
			this.params.push('');
			this.operator = val;
		}
	}

	/** Clears all input from memory. Does not clear display on its own */
	clear() {
		this.params = [''];
		this.operator = null;
		this.dotBtn.disabled = false;
	}

	/** Adds a decimal point to the top param and disables dot button. */
	dotPress() {
		// need to filter for key commands
		if (this.dotBtn.disabled) {
			return;
		}
		this.dotBtn.disabled = true;
		const idx = this.params.length - 1;
		this.params[idx] = `${this.params[idx]}.`;
	}

	/** Calls the appropriate calculate function based on the stored operator. */
	calculate() {
		if (
			this.operator === null ||
			this.params.length !== 2 ||
			this.params[1] === ''
		) {
			return;
		}
		const a = Number(this.params[0]);
		const b = Number(this.params[1]);
		let res;
		switch (this.operator) {
			case '+':
				res = add(a, b);
				break;

			case '-':
				res = subtract(a, b);
				break;

			case '*':
				res = multiply(a, b);
				break;

			case '/':
				res = divide(a, b);
				break;
		}

		this.params = [String(res)];
		this.operator = null;
	}

	/** Deletes the last input. Deletes digits, decimals, and operators. If no input, does nothing. */
	backspace() {
		if (this.params.length === 1 && this.params[0] === '') {
			return;
		}

		if (this.params.length === 2 && this.params[1] === '') {
			this.operator = null;
			this.params.pop();
		} else {
			const idx = this.params.length - 1;
			const paramCopy = this.params[idx];
			const len = this.params[idx].length;

			// full remove "Infinity" on backspace to prevent string values left in params
			// calculations such as a partial "Infinit"
			if (paramCopy[len - 1] === 'y') {
				this.params[idx] = '';
				return;
			}

			if (paramCopy[len - 1] === '.') {
				this.dotBtn.disabled = false;
			}

			this.params[idx] = paramCopy.slice(0, len - 1);

			if (this.params[idx] === '-') {
				this.params[idx] = '';
			}
		}
	}

	/** Toggles the sign of the top param between negative and positive.
	 * Positive numbers don't show sign. Does nothing when applied on empty or 0 params.
	 */
	changeSign() {
		const idx = this.params.length - 1;
		if (this.params[idx] === '' || this.params[idx] === '0') {
			// don't let users apply sign without a number
			return;
		}

		if (this.params[idx][0] === '-') {
			this.params[idx] = this.params[idx].slice(1);
		} else {
			this.params[idx] = `-${this.params[idx]}`;
		}
	}

	/** Calls the appropriate function or updates params depending on the UI button pressed.
	 * Number buttons will be concatenated with the top param.
	 * Operators will either start a new param or result in calculation if an operator already exists.
	 * Equal sign will result in calculation.
	 * mc will clear all params and operators.
	 *
	 * @param {string} val - the value of the button that was pressed
	 */
	buttonPress(val) {
		console.log(val, this.params);
		switch (val) {
			case '+/-':
			case 's':
				this.changeSign();
				break;

			case '←':
			case 'Backspace':
				this.backspace();
				break;

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

			case '+':
			case '-':
			case '*':
			case '/':
				this.updateOperator(val);
				break;

			case '=':
			case 'Enter':
				this.calculate();
				break;

			case 'mc':
			case 'c':
				this.clear();
				break;

			case '.':
				this.dotPress();
				break;
		}

		this.updateDisplay();
	}
}

const calc = new Calculator();

const calcElement = document.querySelector('#calculator');
calcElement.addEventListener('click', (e) => {
	if (e.target.classList.contains('btn')) {
		calc.buttonPress(e.target.textContent);
	}
});

document.addEventListener('keyup', (e) => {
	calc.buttonPress(e.key);
});
