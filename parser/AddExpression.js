import MultiplyExpression from "./MultiplyExpression";
import { BinaryOperators } from "./Operators";
import { ReadOperator } from "./Token";

function AddSuffix(tokens, base) {
  // aexp_suffix ::= + mexp aexp_sub | - mexp aexp_sub |
  const operator =
    ReadOperator(tokens, BinaryOperators.add) ||
    ReadOperator(tokens, BinaryOperators.subtract);
  if (!operator) return base;

  const value = MultiplyExpression(tokens);

  if (operator === BinaryOperators.add)
    return AddSuffix(tokens, base + value);
  else if (operator === BinaryOperators.subtract)
    return AddSuffix(tokens, base - value);
}

export default function AddExpression(tokens) {
  // aexp ::= aexp + mexp | aexp - mexp | mexp
  // aexp ::= mexp aexp_suffix
  const base = MultiplyExpression(tokens);
  return AddSuffix(tokens, base);
}
