import React, { useState } from 'react';

import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  Button,
  CodeInput,
  CodeArea,
  Container,
  Content,
  Title,
} from './styles';
import TextTransformer from './utils/textTransformer';

import { tokens } from './utils/tokenTable';

const initialInput = `algoritmo "Exemplo"

Var
    a, b : inteiro

inicio
    para a de 1 ate 10 faca
        escreva "Digite um valor:"
        leia(b)
    fimpara
fimalgoritmo

`;

const initialOutput = ` var a,b;

  for(a = 1; a < 10; a++){
    console.log("Digite um valor:");
    b = readline();
  }
`;

export default function App() {
  const [input, setInput] = useState(initialInput);
  const [output, setOutput] = useState(initialOutput);

  /**
   * Realiza a tradução do código
   *
   * VisualAlg -> JavaScript
   */
  function onPress() {
    let code = TextTransformer.textToMap(input);
    const { reservadas, operadores } = tokens;

    let result = [];
    for (let i = 0; i < code.length; i++) {
      let linha = code[i];

      for (let j = 0; j < linha.length; j++) {
        let element = linha[j];

        for (const key in reservadas) {
          if (Object.hasOwnProperty.call(reservadas, key)) {
            const { alg, js } = reservadas[key];
            if (alg === element) {
              code[i][j] = js;
            }
          }
        }

        for (const key in operadores) {
          if (Object.hasOwnProperty.call(operadores, key)) {
            const { alg, js } = operadores[key];
            if (alg === element) {
              code[i][j] = js;
            }
          }
        }
      }
      result.push(linha.join(' '));
    }

    setOutput(result.join(' \n'));
  }

  return (
    <Container>
      <Title>Tradutor de VisualALG para JavaScript</Title>
      <Content>
        <CodeInput
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <Button onClick={onPress}>Traduzir</Button>
        <CodeArea language="javascript" style={vs2015}>
          {output}
        </CodeArea>
      </Content>
    </Container>
  );
}
