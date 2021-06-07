import { parser } from './parser';
import { tokenizer } from './tokenizer';

export default function translate(code) {
  const { tokens, tokenCount } = tokenizer(code);
  // console.log(tokensList);
  const parsedTokens = parser(tokens);
  return { parsedTokens, tokenCount };
}
