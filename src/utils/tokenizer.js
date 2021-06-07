const LETTERS = /[a-zA-Z]/;
const NEWLINE = /\n/;
const WHITESPACE = /\s/;
const NUMBERS = /[0-9]/;

let tokenCount = {
  equal: 0,
  plus: 0,
  minus: 0,
  star: 0,
  percent: 0,
  caret: 0,
  less: 0,
  attr: 0,
  colon: 0,
  greater: 0,
  pipe: 0,
  and: 0,
  paren: 0,
  bracket: 0,
  dot: 0,
  comma: 0,
  semi: 0,
  comment: 0,
  forwardslash: 0,
  newline: 0,
  number: 0,
  word: 0,
  string: 0,
};

/**
 * Transforma o código em tokens
 *
 * @param {String} input código
 */
export function tokenizer(input) {
  let current = 0;

  let tokens = [];
  while (current < input.length) {
    let char = input[current];

    if (char === '=') {
      tokenCount.equal += 1;
      tokens.push({
        type: 'equal',
        value: '===',
      });
      current++;
      continue;
    }

    if (char === '+') {
      tokenCount.plus += 1;
      tokens.push({
        type: 'plus',
        value: ' + ',
      });
      current++;
      continue;
    }

    if (char === '-') {
      tokenCount.minus += 1;
      tokens.push({
        type: 'minus',
        value: ' - ',
      });
      current++;
      continue;
    }

    if (char === '*') {
      tokenCount.star += 1;
      tokens.push({
        type: 'star',
        value: ' * ',
      });
      current++;
      continue;
    }

    if (char === '%') {
      tokenCount.percent += 1;
      tokens.push({
        type: 'percent',
        value: ' % ',
      });
      current++;
      continue;
    }

    if (char === '^') {
      tokenCount.caret += 1;
      tokens.push({
        type: 'caret',
        value: ' ^ ',
      });
      current++;
      continue;
    }

    if (char === '<') {
      const next = input[++current];
      if (next === '-') {
        current++;
        tokenCount.attr += 1;
        tokens.push({
          type: 'attr',
          value: ' = ',
        });
      } else {
        tokenCount.less += 1;
        tokens.push({
          type: 'less',
          value: '<',
        });
      }
      continue;
    }

    if (char === ':') {
      const next = input[++current];
      if (next === '=') {
        current++;
        tokenCount.attr += 1;
        tokens.push({
          type: 'attr',
          value: ' = ',
        });
      } else {
        tokenCount.colon += 1;
        tokens.push({
          type: 'colon',
          value: ':',
        });
      }
      continue;
    }

    if (char === '>') {
      tokenCount.greater += 1;
      tokens.push({
        type: 'greater',
        value: '>',
      });
      current++;
      continue;
    }

    if (char === '|') {
      tokenCount.pipe += 1;
      tokens.push({
        type: 'pipe',
        value: '|',
      });
      current++;
      continue;
    }

    if (char === '&') {
      tokenCount.and += 1;
      tokens.push({
        type: 'and',
        value: '&',
      });
      current++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokenCount.paren += 1;
      tokens.push({
        type: 'paren',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '[' || char === ']') {
      tokenCount.bracket += 1;
      tokens.push({
        type: 'bracket',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '.') {
      tokenCount.dot += 1;
      tokens.push({
        type: 'dot',
        value: '.',
      });
      current++;
      continue;
    }

    if (char === ',') {
      tokenCount.comma += 1;
      tokens.push({
        type: 'comma',
        value: ',',
      });
      current++;
      continue;
    }

    if (char === ';') {
      tokenCount.semi += 1;
      tokens.push({
        type: 'semi',
        value: ';',
      });
      current++;
      continue;
    }

    if (char === '/') {
      // Se for comentário de uma linha
      if (input[++current] === '/') {
        let content = '/';
        while (current < input.length && !NEWLINE.test(input[current])) {
          content += input[current];
          current++;
        }
        tokenCount.comment += 1;
        tokens.push({
          type: 'comment',
          value: content,
        });
      }
      // Se for comentário de múltipla linhas descarta...
      else if (input[current] === '*') {
        current++;
        while (current < input.length) {
          if (input[current] === '*' && input[++current] === '/') {
            current++;
            break;
          }
          current++;
        }
      }
      // Divisão
      else {
        tokenCount.forwardslash += 1;
        tokens.push({
          type: 'forwardslash',
          value: ' / ',
        });
      }
      continue;
    }

    if (NEWLINE.test(char)) {
      tokenCount.newline += 1;
      tokens.push({
        type: 'newline',
        value: '\n',
      });
      current++;
      continue;
    }

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokenCount.number += 1;
      tokens.push({
        type: 'number',
        value: value,
      });
      continue;
    }

    // Não é token especial
    if (LETTERS.test(char) || char === '_') {
      var value = char;
      if (++current < input.length) {
        char = input[current];
        while (
          (LETTERS.test(char) || NUMBERS.test(char) || char === '_') &&
          current + 1 <= input.length
        ) {
          value += char;
          char = input[++current];
        }
      }
      tokenCount.word += 1;
      tokens.push({
        type: 'word',
        value: value,
      });
      continue;
    }

    if (char === '"') {
      let value = '';
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokenCount.string += 1;
      tokens.push({
        type: 'string',
        value: value,
      });
      continue;
    }

    if (char === "'") {
      let value = '';
      char = input[++current];

      while (char !== "'") {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokenCount.string += 1;
      tokens.push({
        type: 'string',
        value: value,
      });
      continue;
    }

    throw new TypeError('Caractere desconhecido: ' + char);
  }

  return { tokens, tokenCount };
}
