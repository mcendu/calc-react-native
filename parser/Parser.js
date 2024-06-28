import AddExpression from "./AddExpression";
import { BinaryOperators } from "./Operators";

export default class Parser {
  constructor() {
    this.integer = "0";
    this.fractional = "0";
    this.sign = 1;
    this.state = "integer";
    this.tokens = [];

    this.lastEquation = undefined;
    this.result = undefined;
  }

  #startNumber() {
    this.integer = "0";
    this.fractional = "0";
    this.sign = 1;
    this.state = "integer";
  }

  #pushNumber() {
    this.tokens.push(this.sign * Number(`${this.integer}.${this.fractional}`));
  }

  #pushDigit(token) {
    if (this.state === "fractional") {
      if (this.fractional === "0") this.fractional = token;
      else this.fractional = String(this.fractional).concat(token);
    } else {
      if (this.state !== "integer") this.#startNumber();

      if (this.integer === "0") this.integer = token;
      else this.integer = String(this.integer).concat(token);
    }
  }

  #pushDecimalPoint() {
    if (this.state === "fractional") {
      this.integer = String(this.integer).concat(this.fractional);
      this.fractional = "0";
    } else {
      if (this.state !== "integer") this.#startNumber;

      this.state = "fractional";
    }
  }

  #pushNegation() {
    this.sign = -this.sign;
  }

  #pushBinary(token) {
    if (this.state === "binary") {
      this.tokens.pop();
    } else if (this.state === "result") {
      this.tokens.push(this.result);
      this.#startNumber();
    } else if (this.state === "integer" || this.state == "fractional") {
      this.#pushNumber();
    }

    this.state = "binary";
    this.tokens.push(BinaryOperators[token]);
  }

  push(token) {
    // when anything else is pushed, the calculator builds up the statement
    // without calculating. Only when the calculate (=) button is hit will
    // the calculator start calculating with proper operator precedence.
    if (/^[0-9]$/.test(token)) {
      this.#pushDigit(token);
    } else if (token === ".") {
      this.#pushDecimalPoint();
    } else if (token === "negate") {
      this.#pushNegation();
    } else if (BinaryOperators[token] !== undefined) {
      this.#pushBinary(token);
    } else if (token === "clear") {
      this.clear();
    } else if (token === "calculate") {
      this.calculate();
    }
  }

  clear(ac = undefined) {
    if (ac === undefined)
      ac = !(
        (this.state === "integer" && this.integer !== "0") ||
        this.state === "fractional"
      );

    this.#startNumber();
    if (ac) this.tokens = [];
  }

  calculate() {
    if (this.state === "integer" || this.state === "fractional")
      this.#pushNumber();
    else if (this.state === "binary") this.tokens.pop();
    else if (this.state === "result") return;

    const tokens = this.tokens;
    this.lastEquation = this.tokens.join(" ");
    this.result = AddExpression(tokens);
    this.state = "result";
  }

  get number() {
    if (this.state === "result") return String(this.result);
    return String(this.sign * Number(`${this.integer}.${this.fractional}`));
  }

  get equation() {
    if (this.state === "result") return `${this.lastEquation} =`;
    return this.tokens.join(" ");
  }
}
