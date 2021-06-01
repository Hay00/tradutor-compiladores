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
import TextTransformer from './utils/translator';

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
    let code = TextTransformer.translate(input);
    setOutput(code);
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
