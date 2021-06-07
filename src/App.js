import React, { useState } from 'react';

import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  Button,
  CodeArea,
  CodeInput,
  Container,
  Content,
  Title,
} from './styles';

import translate from './utils/translator';

const initialInput = `Algoritmo "testeDebug"
// Disciplina   : [Compiladores]
// Professor   : Cavalheiro
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Vinicios Dutra Schulze
// Data atual  : 6/6/2021
Var
   a, b : inteiro
   d, c : real
   input: inteiro

funcao func(valor1,valor2 :inteiro; operacao:caracter):real
var resultado: real
inicio
   escolha operacao
   caso "+"
      retorne valor1+valor2
   caso "-"
      retorne valor1-valor2
   caso "/"
      retorne valor1/valor2
   caso "^"
      retorne valor1^valor2
   outrocaso
      retorne 0
   fimescolha
fimfuncao

Inicio
   a <- 50
   b := 60
   se a > b entao
      escreval("A é maior: ", a)
   senao
      escreval("B é maior: ", b)
   fimse

   escreva("Informe um valor inteiro: ")
   leia(input)
   escreva("Soma: ")
   escreval(a+input)
   escreva("Subtração: ")
   escreval(a-input)
   escreva("Divisão: ")
   escreval(a/input)
   escreva("Multiplicação: ")
   escreval(a*input)

   escreval(func(2,2,"+"))
   escreval(func(2,2,"-"))
   escreval(func(2,2,"*"))
   escreval(func(2,2,"/"))
   escreval(func(2,2,"?"))

Fimalgoritmo
`;

export default function App() {
  const [input, setInput] = useState(initialInput);
  const [output, setOutput] = useState('');
  const [tokenList, setTokenList] = useState(null);

  /**
   * Realiza a tradução do código
   *
   * VisualAlg -> JavaScript
   */
  function onPress() {
    try {
      const { parsedTokens, tokenCount } = translate(input);
      setOutput(parsedTokens);
      setTokenList(tokenCount);
    } catch (e) {
      console.log(e.message);
    }
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
      {tokenList && (
        <table style={{ margin: '1em' }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokenList).map(([title, content], key) => (
              <tr key={key}>
                <td>
                  <b>{title}</b>
                </td>
                <td>{content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}
