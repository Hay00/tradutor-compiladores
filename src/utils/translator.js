import { parser } from './parser';
import { tokenizer } from './tokenizer';

export default function translate(code) {
  const tokensList = tokenizer(code);
  console.log('Tokens:\n');
  console.log(tokensList);
  const parsedTokens = parser(tokensList);
  return parsedTokens;
}
