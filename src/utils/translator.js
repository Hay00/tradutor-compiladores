import { tokens } from './tokenTable';

export default class TextTransformer {
  chaves = 0;
  vars = new Map();

  /**
   * Separar texto pra array com array
   *
   * Antigo
   */
  static translate(code) {
    code = code.split('\n');

    let result = '';
    for (const line of code) {
      result += this.findWord(line) + '\n';
    }
    result = result.replace(/:=|<-/g, ' = ');
    return (result += '}');
  }

  /**
   * Encontra a função para traduzir o texto
   *
   * @param {String} text texto a ser traduzido
   */
  static findWord(line) {
    let text = line.toLowerCase();

    const palavra = this.word(text);

    let result;

    switch (palavra) {
      case 'algoritmo':
        result = '';
        // result = this.begin(text.trim());
        console.log('alg\n\n');
        console.log(result);
        break;

      case 'se':
        result = this.if(text.trim());
        break;

      case 'senao':
        result = this.elseNot(text.trim());
        break;

      case 'para':
        result = this.for(text.trim());
        break;

      case 'inicio':
        result = this.begin(text);
        break;

      case 'var':
        result = this.var(text);

        break;

      case 'leia':
        result = this.read(text);
        break;

      case 'escreva':
        result = this.write(line);
        break;

      case 'escreval':
        result = this.write(line);
        break;

      case 'fimalgoritmo':
        result = '';
        break;

      case 'fimse':
        result = '';
        break;

      case 'fimpara':
        result = '';
        break;

      case '//':
        break;

      case 'real':
        break;

      case 'inteiro':
        break;

      case 'caracter':
        result = this.var(text, 'string');
        break;

      case '<-':
        result = (text + ';').replace('<-', '=');
        break;

      case ':=':
        result = (text + ';').replace(':=', '=');
        break;

      default:
        result = text;
        break;
    }
    return result;
  }

  static begin(word) {
    return `class ${word} {`;
  }

  static keys() {
    if (this.chaves > 0) {
      this.chaves--;
      return '';
    } else {
      return '}';
    }
  }

  static if(value) {
    let vle = value.substring(2, value.indexOf('entao') - 1).trim();
    return 'if (' + vle.replace(' =', ' == ') + ' ) {';
  }

  static var(text, type) {
    let rtn,
      word,
      aux = '';
    console.log('-var-' + text);
    text = text.trim();
    for (let carac = 0; carac < text.length; carac++) {
      aux = '' + text.charAt(carac);
      for (const key in tokens.especiais) {
        if (key.includes(aux)) {
          if (
            !word === 'var' &&
            !word === 'real' &&
            !word === 'inteiro' &&
            !word === 'caracter'
          ) {
            this.vars.put(word, type);
            rtn += word + (aux === ',' ? ',' : '');
          }
          word = '';
        } else word += aux;
      }
    }
    return type + ' ' + rtn + ';';
  }

  static write(text, string) {
    console.log(text);
    let start = text.indexOf('"');
    return `console.log(${text.substring(start, text.length)});`;
  }

  static read(text) {
    let rtn,
      aux = '';
    let ini = text.indexOf('(');
    aux = text.substring(ini + 1, text.length - 1).trim();
    return `${aux} = window.prompt();`;
  }

  static elseNot(text) {
    this.chaves++;
    return text.replace('senao', '}else{');
  }

  static for(text) {
    let result;
    let para,
      de,
      ate,
      passo,
      aux,
      vlr = '';
    let stage = 0;
    console.log('-for-' + text);
    for (let i = 4; i < text.length; i++) {
      aux = '' + text.charAt(i);

      switch (stage) {
        case 0:
          if ((aux + ('' + text.charAt(i + 1))).includes('de')) {
            para = vlr.trim();
            vlr = '';
            stage++;
            i++;
          } else {
            vlr += aux;
          }
          break;

        case 1:
          if (text.substring(i, i + 3).includes('ate')) {
            de = vlr.trim();
            vlr = '';
            stage++;
            i = i + 2;
          } else {
            vlr += aux;
          }
          break;

        default:
          if (
            text.substring(i, i + 4).includes('faca') ||
            text.substring(i, i + 5).includes('passo')
          ) {
            ate = vlr.trim();
            if (text.substring(i, i + 4) === 'faca') {
              break;
            } else {
              i = i + 2;
              passo = text.substring(i + 3, text.length - 4).trim();
              break;
            }
          } else {
            vlr += aux;
          }
          break;
      }
    }
    result = `for (${para} = ${de}; ${para} <= ${ate};`;

    if (!passo) {
      result += ` ${para}++){`;
    } else {
      let p = parseInt(passo);
      for (let i = 0; i < p; i++) {
        result += `${para}++,`;
      }
      result = `${result.substring(0, result.length - 1)}){`;
    }

    return result;
  }

  /**
   * Faz a transformação do código
   *
   * @param {String} text texto a ser convertido
   */
  static word(text) {
    let palavra = '';
    let aux = '';
    text = text.trim();

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      aux += char;
      let result = false;

      for (const key in tokens.especiais) {
        if (tokens.especiais[key] === char) {
          result = true;
          palavra = aux;
          break;
        }
        if (tokens.especiais[key] === aux) {
          result = true;
          palavra = aux;
          break;
        }
      }
      if (result) {
        break;
      }
      palavra += char;
    }
    return palavra;
  }
}
