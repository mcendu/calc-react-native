import Atom from "./Atom";
import { BinaryOperators } from "./Operators";
import { ReadOperator } from "./Token";

function MultiplySuffix(tokens, base) {
  // mexp_suffix ::= * atom mexp_sub | / atom mexp_sub |
  const operator =
    ReadOperator(tokens, BinaryOperators.multiply) ||
    ReadOperator(tokens, BinaryOperators.divide) ||
    ReadOperator(tokens, BinaryOperators.remainder);
  if (!operator) return base;

  const value = Atom(tokens);

  if (operator === BinaryOperators.multiply)
    return MultiplySuffix(tokens, base * value);
  else if (operator === BinaryOperators.divide)
    return MultiplySuffix(tokens, base / value);
  else if (operator === BinaryOperators.remainder)
    return MultiplySuffix(tokens, base % value);
}

export default function MultiplyExpression(tokens) {
  // mexp ::= mexp * atom | mexp / atom | number
  // mexp ::= atom mexp_sub
  const base = Atom(tokens);
  return MultiplySuffix(tokens, base);
}
