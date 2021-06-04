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
// Disciplina   : [Linguagem e Lógica de Programação]
// Professor   : Antonio Carlos Nicolodi
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Vinicios Dutra Schulze
// Data atual  : 6/2/2021
Var
   a, b : inteiro
   d, c : real
   input: inteiro

funcao func(valor1,valor2 :inteiro; operacao:caracter):real
var resultado: inteiro
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
    let code = translate(input);
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
