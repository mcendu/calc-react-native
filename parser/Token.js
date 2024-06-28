export function ReadNumber(tokens) {
    const token = tokens[0];
    if (typeof token !== "number")
        return undefined;
    tokens.shift();
    return token;
}

export function ReadOperator(tokens, operator) {
    const token = tokens[0];
    if (token !== operator)
        return undefined;
    tokens.shift();
    return token;
}
