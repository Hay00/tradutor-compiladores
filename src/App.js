import React from "react";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
    Button,
    CodeInput,
    CodeOutput,
    Container,
    Content,
    Title,
} from "./styles";

const vsCode = `algoritmo "Exemplo"

Var
    a, b : inteiro

inicio
    para a de 1 ate 10 faca
        escreva "Digite um valor:"
        leia(b)
    fimpara
fimalgoritmo

`;

const jsCode = ` var a,b;

  for(a = 1; a < 10; a++){
    console.log("Digite um valor:");
    b = readline();
  }
`;

export default function App() {
    return (
        <Container>
            <Title>Tradutor de VisualALG para JavaScript</Title>
            <Content>
                <CodeInput>{vsCode}</CodeInput>
                <Button>Traduzir ></Button>
                <CodeOutput language='javascript' style={vs2015}>
                    {jsCode}
                </CodeOutput>
            </Content>
        </Container>
    );
}
