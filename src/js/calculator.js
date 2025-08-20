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
		this.param1 = null;
		this.param2 = null;
		this.operator = null;
		this.input = '';
	}
}

const calc = new Calculator();
