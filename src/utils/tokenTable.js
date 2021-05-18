export const tokens = {
  skip: [' ', '\t', '\n', '\r', '\f'],
  reservadas: {
    BREAK: { js: 'break', alg: 'interrompa' },
    CLASS: { js: 'class', alg: '' }, // N tem
    CONSTRUCTOR: { js: 'constructor', alg: '' }, // N tem
    ELSE: { js: 'else', alg: 'senao' },
    EXTENDS: { js: 'extends', alg: '' }, // N tem
    FOR: { js: 'for', alg: 'para' },
    FUNCTION: { js: 'function', alg: 'funcao' },
    ENDFUNCTION: { js: '', alg: 'fimfuncao' },
    IF: { js: 'if', alg: 'se' },
    ENDIF: { js: '', alg: 'fimse' },
    INT: { js: 'int', alg: 'inteiro' }, // N tem
    NEW: { js: 'new', alg: '' }, // N tem
    PRINT: { js: 'print', alg: 'escreva' },
    READ: { js: 'read', alg: 'leia' },
    RETURN: { js: 'return', alg: '' },
    STRING: { js: 'string', alg: 'caractere' },
    SUPER: { js: 'super', alg: '' }, // N tem
    WHILE: { js: 'while', alg: 'enquanto' },
    ENDWHILE: { js: '', alg: 'fimenquanto' },
  },
  operadores: {
    ASSIGN: { js: '=', alg: '<-' },
    GT: { js: '>', alg: '>' },
    LT: { js: '<', alg: '<' },
    EQ: { js: '===', alg: '==' },
    LE: { js: '<==', alg: '<=' },
    GE: { js: '>==', alg: '>=' },
    NEQ: { js: '!==', alg: '!=' },
    PLUS: { js: '+', alg: '+' },
    MINUS: { js: '-', alg: '-' },
    STAR: { js: '*', alg: '*' },
    SLASH: { js: '/', alg: '/' },
    REM: { js: '%', alg: '%' },
  },
  especiais: {
    LPAREN: '(',
    RPAREN: ')',
    LBRACE: '{',
    RBRACE: '}',
    LBRACKET: '[',
    RBRACKET: ']',
    SEMICOLON: ';',
    COMMA: ',',
    DOT: '.',
  },
};
