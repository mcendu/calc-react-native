import { ReadNumber } from "./Token";

export default function Atom(tokens)
{
    // atom ::= number
    const value = ReadNumber(tokens);
    if (value === undefined) throw new Error("expects number");
    return value;
}
