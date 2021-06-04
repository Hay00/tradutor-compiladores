export function parser(code) {
  let mainFunc = 'main';
  let hasFunc = false;

  let current = 0;
  let tokens = code;

  let lines = [];
  let result = '';

  /**
   * Encontra o tipo adequado para o token word
   *
   * @returns uma linha de código
   */
  function word() {
    const tokenValue = tokens[current].value.toLowerCase();

    if (tokenValue === 'algoritmo') {
      const funcName = tokens[++current].value.replace(/-/g, '_');
      mainFunc = funcName;
      return `// ${funcName}\n`;
    }

    if (tokenValue === 'var') {
      let numVars = 0;
      let varEnd = tokens.length;
      let i = current;
      while (++i < tokens.length) {
        const nextValue = tokens[i + 1].value.toLowerCase();
        // Conta a quantidade de tipos de vars
        if (nextValue === ':') numVars++;
        // Encontra o fim da declaração das vars
        if (nextValue === 'inicio' || nextValue === 'funcao') {
          varEnd = i;
          break;
        }
      }

      let vars = '';
      // Var declarada só em 1 linha?
      if (tokens[current + 1].type === 'word') vars += 'let ';

      let varCount = 0;
      while (++current <= varEnd) {
        const value = tokens[current].value.toLowerCase();
        if (current === varEnd) {
          vars += '\n';
          current--;
          break;
        }
        if (value === ':') {
          if (tokens[++current].value === 'vetor') {
            vars += ' = []';
          }
          vars += ';';
          varCount++;
          continue;
        }
        if (tokens[current].type === 'linebreak') {
          if (tokens[current + 1].type === 'linebreak') {
            continue;
          }
          if (varCount < numVars) {
            vars += '\nlet ';
            continue;
          }
          vars += '\n';
        }
        vars += tokens[current].value;
      }
      return `${vars}`;
    }

    if (tokenValue === 'inicio') {
      if (hasFunc) {
        return '// inicio';
      }
      return `function ${mainFunc}(){`;
    }

    if (tokenValue === 'fimalgoritmo') return '}\n';

    if (tokenValue === 'se') {
      let content = '';
      while (tokens[++current].value !== 'entao') {
        if (tokens[current].value.toLowerCase() === 'e') {
          content += ' && ';
          continue;
        }
        if (tokens[current].value.toLowerCase() === 'ou') {
          content += ' || ';
          continue;
        }

        content += word();
      }
      return `if(${content}){`;
    }

    if (tokenValue === 'senao') return '}else{';

    if (tokenValue === 'fimse') return '}';

    if (tokenValue === 'funcao') {
      const name = tokens[++current].value.replace(/-/g, '_');
      let args = '';
      while (tokens[++current].type !== 'linebreak') {
        if (tokens[current].type === 'colon') {
          current++;
          continue;
        }
        if (tokens[current].type === 'semi') {
          args += ',';
          continue;
        }
        args += tokens[current].value;
      }
      hasFunc = true;
      return `function ${name}${args}{\n`;
    }

    if (tokenValue === 'fimfuncao') {
      hasFunc = false;
      return '}';
    }

    if (tokenValue === 'retorne') {
      let returnVal = '';
      while (tokens[++current].type !== 'linebreak') {
        returnVal += tokens[current].value;
      }
      return `return ${returnVal};\n`;
    }

    if (tokenValue === 'escolha') {
      let args = '';
      while (tokens[++current].type !== 'linebreak') {
        args += tokens[current].value;
      }
      return `switch(${args}){\n`;
    }

    if (tokenValue === 'caso') {
      let values = 'case ';

      function formatArgs(type, value) {
        if (type === 'string') return `'${value}'`;
        return `${value}`;
      }

      // Parâmetros do case
      while (tokens[++current].type !== 'linebreak') {
        if (tokens[current + 1].type === 'comma') {
          values += `${formatArgs(
            tokens[current].type,
            tokens[current].value
          )}:`;

          current++;
          const { value, type } = tokens[++current];
          values += `\ncase ${formatArgs(type, value)}:\n`;
          continue;
        }

        const { value, type } = tokens[current];
        values += `${formatArgs(type, value)}:\n`;
      }

      // //Conteúdo do case

      return values;
    }

    if (tokenValue === 'outrocaso') return `default:`;

    if (tokenValue === 'fimescolha') return '}';

    if (tokenValue === 'repita') return 'do{';

    if (tokenValue === 'ate') {
      let args = '';
      while (tokens[++current].type !== 'linebreak') {
        if (tokens[current].value.toLowerCase() === 'e') {
          args += ' && ';
          continue;
        }
        if (tokens[current].value.toLowerCase() === 'ou') {
          args += ' || ';
          continue;
        }
        args += word();
      }
      return `}while(${args});\n`;
    }

    if (tokenValue === 'enquanto') {
      let args = '';
      while (tokens[++current].value.toLowerCase() !== 'faca') {
        if (tokens[current].value.toLowerCase() === 'e') {
          args += ' && ';
          continue;
        }
        if (tokens[current].value.toLowerCase() === 'ou') {
          args += ' || ';
          continue;
        }
        args += word();
      }
      return `while${args}{\n`;
    }

    if (tokenValue === 'fimenquanto') return '}';

    if (tokenValue === 'escreva' || tokenValue === 'escreval') {
      let log = 'console.log';
      while (tokens[++current].type !== 'linebreak') {
        if (tokens[current].type === 'string') {
          log += `"${tokens[current].value}"`;
        } else {
          log += tokens[current].value;
        }
      }
      return log + ';\n';
    }

    if (tokenValue === 'leia') {
      let readValue = '';
      current++;
      while (tokens[++current].type !== 'paren') {
        readValue += tokens[current].value;
      }
      return `${readValue} = window.prompt();\n`;
    }

    if (tokenValue === 'mod') {
      return ' % ';
    }

    return tokenValue;
  }

  /**
   * Percorre os tokens
   *
   * @returns retorna uma linha de código
   */
  function walk() {
    var token = tokens[current];

    if (token.type === 'string') {
      return `"${token.value}"`;
    }

    if (token.type === 'word') {
      return word();
    }

    return token.value;

    // throw new TypeError(token.type);
  }

  while (current < tokens.length) {
    const a = walk();
    result += a;
    lines.push(a);
    current++;
  }

  result += `\n${mainFunc}();\n`;
  return result;
}
