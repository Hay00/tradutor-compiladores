const LETTERS = /[a-zA-Z]/;
const NEWLINE = /\n/;
const WHITESPACE = /\s/;
const NUMBERS = /[0-9]/;

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
      tokens.push({
        type: 'equal',
        value: ' = ',
      });
      current++;
      continue;
    }

    if (char === '+') {
      tokens.push({
        type: 'plus',
        value: ' + ',
      });
      current++;
      continue;
    }

    if (char === '-') {
      tokens.push({
        type: 'minus',
        value: ' - ',
      });
      current++;
      continue;
    }

    if (char === '*') {
      tokens.push({
        type: 'star',
        value: ' * ',
      });
      current++;
      continue;
    }

    if (char === '%') {
      tokens.push({
        type: 'percent',
        value: ' % ',
      });
      current++;
      continue;
    }

    if (char === '^') {
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
        tokens.push({
          type: 'attr',
          value: ' = ',
        });
      } else {
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
        tokens.push({
          type: 'attr',
          value: ' = ',
        });
      } else {
        tokens.push({
          type: 'colon',
          value: ':',
        });
      }
      continue;
    }

    if (char === '>') {
      tokens.push({
        type: 'greater',
        value: '>',
      });
      current++;
      continue;
    }

    if (char === '|') {
      tokens.push({
        type: 'pipe',
        value: '|',
      });
      current++;
      continue;
    }

    if (char === '&') {
      tokens.push({
        type: 'and',
        value: '&',
      });
      current++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '[' || char === ']') {
      tokens.push({
        type: 'bracket',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '.') {
      tokens.push({
        type: 'dot',
        value: '.',
      });
      current++;
      continue;
    }

    if (char === ',') {
      tokens.push({
        type: 'comma',
        value: ',',
      });
      current++;
      continue;
    }

    if (char === ';') {
      tokens.push({
        type: 'semi',
        value: ';',
      });
      current++;
      continue;
    }

    if (char === '/') {
      // Se for comentário de uma linha descarta...
      if (input[++current] === '/') {
        let content = '/';
        while (current < input.length && !NEWLINE.test(input[current])) {
          content += input[current];
          current++;
        }
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
        tokens.push({
          type: 'forwardslash',
          value: ' / ',
        });
      }
      continue;
    }

    if (NEWLINE.test(char)) {
      tokens.push({
        type: 'linebreak',
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
      tokens.push({
        type: 'number',
        value: value,
      });
      continue;
    }

    // Não é token
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
      tokens.push({
        type: 'string',
        value: value,
      });
      continue;
    }

    throw new TypeError('Caractere desconhecido: ' + char);
  }

  return tokens;
}
